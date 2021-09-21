import sys
import json
from pyspark.sql import HiveContext
from pyspark.sql import SQLContext
from pyspark.sql import SparkSession
from pyspark import SparkContext, SparkConf
from datetime import datetime, timedelta, date
from string import Template

appName = "convertTableToExternal"

spark = SparkSession.builder \
  .enableHiveSupport() \
  .appName(appName) \
  .getOrCreate()

sc = spark.sparkContext
hc = HiveContext(sc)
hc.setConf("hive.exec.dynamic.partition", "true")
hc.setConf("hive.exec.dynamic.partition.mode", "nonstrict")
      

tnames = sys.argv[1].split(",")
path = sys.argv[2]

for tname in tnames:
  print(tname)

  dbName = tname.split(".")[0]
  tableName = tname.split(".")[1]
  newTableName  = tableName + "_external"

  df = spark.sql(Template("show create table $dbName.$tableName").substitute(dbName=dbName, tableName = tableName, newTableName = newTableName))
  s = df.collect()[0][0]
  if(s.find("CREATE EXTERNAL ") == -1):
    s = s.replace("CREATE TABLE", "CREATE EXTERNAL TABLE")
    s = s.replace("CLUSTERED BY ", "--CLUSTERED BY ")
    s = s.replace("SORTED BY ", "--SORTED BY ")
    s = s.replace("INTO ", "--INTO ")
    s = s.replace("'transactional'='true'", "'transactional'='false'")
    s = s.replace("'transactional' = 'true'", "'transactional' = 'false'")
    sExt = s.replace(Template("`$dbName`.`$tableName`").substitute(dbName=dbName, tableName = tableName), Template("`$dbName`.`$newTableName`").substitute(dbName=dbName, newTableName = newTableName)) + Template(" location '$path$dbName/$tableName'").substitute(dbName=dbName, tableName = tableName, path = path)
    print(sExt)

    hc.sql(Template("drop table if exists `$dbName`.`$newTableName`").substitute(dbName=dbName, tableName = tableName, newTableName = newTableName))
    hc.sql(sExt)
    hc.sql(Template("insert into `$dbName`.`$newTableName` select * from `$dbName`.`$tableName`").substitute(dbName=dbName, tableName = tableName, newTableName = newTableName))

    hc.sql(Template("drop table if exists `$dbName`.`$tableName`").substitute(dbName=dbName, tableName = tableName))
    hc.sql(Template("ALTER TABLE `$dbName`.`$newTableName` RENAME TO `$dbName`.`$tableName`").substitute(dbName=dbName, tableName = tableName, newTableName = newTableName))
    hc.sql(Template("drop table if exists `$dbName`.`$newTableName`").substitute(dbName=dbName, newTableName = newTableName))
  else:
    print(tname + " already external! skipped.")