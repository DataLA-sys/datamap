import org.apache.spark.sql.catalyst.analysis.{UnresolvedAttribute, UnresolvedRelation, UnresolvedSubqueryColumnAliases}
import org.apache.spark.sql.catalyst.expressions.{Alias, CaseWhen, ScalarSubquery}
import org.apache.spark.sql.catalyst.parser.CatalystSqlParser
import org.apache.spark.sql.catalyst.plans.logical.{InsertIntoStatement, Join, LogicalPlan, Project, SubqueryAlias, With}

import scala.collection.mutable.ListBuffer
import scala.io.Codec
import org.json4s._
import ru.neoflex.datalog.engine.dto.Field

implicit val formats = DefaultFormats

implicit val codec = Codec("UTF-8")

var joinScriptsFolder = "C:/projects/temp/rosbank/odpp/legacy/config/test/mr/acc/join_scripts"
var project = ""
var sourceFile = ""
/*val sql =
  """with w(w1)
    |as (select t.f1 from table1 t)
    |select w1 as w1_2,
    |(select sum(bbb.nn) as summm from bbb where bbb.a = b.a) as saaaa
    |from w
    |""".stripMargin*/
val alpha1 =
  """
    |insert into MART_TMP_DATABASE.RECOVERYWOIFRS_P2P_TMP
    |	SELECT  P2P.PRODUCTGROUP_UK AS PRODUCTGROUP_UK,
    |			P2P.PRODUCT_UK AS PRODUCT_UK
    |	 FROM environment_dmfr.PRODUCT2PRODUCTGROUP_SHIST p2p
    |	 JOIN (SELECT  pg.UK
    |		   FROM environment_DMFR.PRODUCTGROUPTYPE_SDIM pgt
    |		   JOIN environment_DMFR.PRODUCTGROUP_SDIM pg
    |		   ON PG.PRODUCTGROUPTYPE_UK = PGT.UK AND NVL (PG.DELETED_FLAG, 'N') !='Y'
    |		   WHERE  NVL (pgt.DELETED_FLAG, 'N') != 'Y' AND pgt.CCODE = 'CREDITGROUP') pp
    |	 ON P2P.PRODUCTGROUP_UK = pp.UK
    |	 WHERE  NVL (P2P.DELETED_FLAG, 'N') != 'Y'
    |		   AND p2p.EFFECTIVE_FROM <= '${LOAD_DATE_TO}'
    |		   AND p2p.EFFECTIVE_TO > '${LOAD_DATE_TO}';
    |
    |""".stripMargin
val alpha2 =
  """
    |/*
    |d
    |f
    |*/
    |insert into MART_TMP_DATABASE.RECOVERYWOIFRS_D2A2_TMP
    |SELECT
    | Q2.DEAL_UK,
    | Q2.PROFITCENTER_UK,
    | Q2.PRODUCT_UK,
    | Q2.CLIENT_UK,
    | Q2.CURRENCY_UK,
    | Q2.ACCOUNT_UK,
    | Q2.DEAL2ACCTTYPE_UK,
    | Q2.ACCOUNT_LOAN_UK,
    | Q2.ACCOUNT_COVER_UK,
    | MAX (NVL (PC.BLOCK_UK, 0)) as BLOCK_UK,
    | MAX (NVL (P2P.PRODUCTGROUP_UK, 0)) as PRODUCTGROUP_UK
    | /*
    | j
    | k
    | l
    | p
    | */
    |FROM (  SELECT DEAL_UK,
    |		   PROFITCENTER_UK,
    |		   PRODUCT_UK,
    |		   CLIENT_UK,
    |		   CURRENCY_UK,
    |		   ACCOUNT_UK,
    |		   DEAL2ACCTTYPE_UK,
    |		   MAX (ACCOUNT_LOAN_UK) OVER (PARTITION BY DEAL_UK) as  ACCOUNT_LOAN_UK,
    |		   MAX (ACCOUNT_COVER_UK) OVER (PARTITION BY DEAL_UK) as ACCOUNT_COVER_UK
    |		FROM (SELECT DRT.DEAL_UK,
    |				NVL (DRT.PROFITCENTER_UK, 0) AS PROFITCENTER_UK,
    |				NVL (DRT.PRODUCT_UK, 0) AS PRODUCT_UK,
    |				NVL (DH.CLIENT_UK, 0) AS CLIENT_UK,
    |				NVL (DH.CURRENCY_UK, 0) AS CURRENCY_UK,
    |				D2A.ACCOUNT_UK,
    |				D2A.DEAL2ACCTTYPE_UK,
    |				CASE WHEN D2A.DEAL2ACCTTYPE_UK = 1 THEN D2A.ACCOUNT_UK ELSE 0 END AS ACCOUNT_LOAN_UK,
    |				CASE WHEN D2A.DEAL2ACCTTYPE_UK = 9 THEN D2A.ACCOUNT_UK ELSE 0 END AS ACCOUNT_COVER_UK
    |			  FROM (SELECT DV.UK AS DEAL_UK,
    |						   DV.PROFITCENTER_UK,
    |						   DV.PRODUCT_UK
    |					FROM ${environment}_DWH.DEAL_HDIM DV
    |					WHERE DV.dealtable_uk = 1 AND DV.VALIDTO = '5999-12-31'
    |						AND DV.MODULE_BACK_UK IN (5203973777,5203973832,5203973817)  ) DRT
    |			  INNER JOIN ${MART_TMP_DATABASE}.RECOVERYWOIFRS_D2A1_TMP D2A
    |			  ON DRT.DEAL_UK = D2A.DEAL_UK
    |			  LEFT JOIN ${environment}_DWH.DEALLOAN_HDIM DH
    |			  ON DH.UK = DRT.DEAL_UK AND DH.VALIDTO = '5999-12-31') Q
    |		WHERE NOT EXISTS
    |			  (SELECT 1
    |				 FROM ${environment}_dmfr.dealcessionparam_shist ds
    |				WHERE ds.dealloan_uk = Q.deal_uk
    |				 AND NVL (ds.DELETED_FLAG, 'N') != 'Y'
    |				 AND DS.SALE_DATE <= '${LOAD_DATE_TO}' )) Q2
    |LEFT JOIN ${environment}_DMFR.PROFITCENTER_VHIST PC
    |ON PC.PROFITCENTER_UK = Q2.PROFITCENTER_UK
    |	   AND NVL (PC.DELETED_FLAG, 'N') <> 'Y'
    |	   AND '${LOAD_DATE_TO}' < PC.EFFECTIVE_TO
    |	   AND '${LOAD_DATE_TO}' >=PC.EFFECTIVE_FROM
    |LEFT JOIN ${MART_TMP_DATABASE}.RECOVERYWOIFRS_P2P_TMP P2P
    |	ON P2P.PRODUCT_UK = Q2.PRODUCT_UK
    |GROUP BY Q2.DEAL_UK,
    |		 Q2.PROFITCENTER_UK,
    |		 Q2.PRODUCT_UK,
    |		 Q2.CLIENT_UK,
    |		 Q2.CURRENCY_UK,
    |		 Q2.ACCOUNT_UK,
    |		 Q2.DEAL2ACCTTYPE_UK,
    |		 Q2.ACCOUNT_LOAN_UK,
    |		 Q2.ACCOUNT_COVER_UK;
    |
    |"""//.stripMargin
val alpha3 = """insert into ${MART_TMP_DATABASE}.RECOVERYWOIFRS_BSVN_TMP
               |SELECT a.*
               |FROM ( SELECT
               |		   vn.date_part,
               |		   vn.VALUE_DAY,
               |		   NVL (vn.ACC_CUR_AMT, 0) AS ACC_CUR_AMT,
               |		   NVL (vn.USD_AMT, 0) AS USD_AMT,
               |		   NVL (vn.RUR_AMT, 0) AS RUR_AMT,
               |		   vn.ACCOUNT_DEBIT_UK,
               |		   vn.ACCOUNT_CREDIT_UK,
               |		   vn.DEAL_UK,
               |		   vn.GL2ACCOUNT_DEBIT_UK,
               |		   vn.GL2ACCOUNT_CREDIT_UK,
               |		   VN.CURRENCY_UK
               |		FROM ${environment}_dmfr.vnebaltransaction_tran vn
               |		JOIN (SELECT DISTINCT GL2ACCOUNT_UK FROM ${environment}_dmfr.dmsfr_accountfilter_bridge WHERE ACCOUNTFILTERTYPE_UK = 5 AND NVL (DELETED_FLAG, 'N') != 'Y') afl1
               |		ON vn.GL2ACCOUNT_CREDIT_UK = afl1.GL2ACCOUNT_UK
               |		JOIN (SELECT DISTINCT GL2ACCOUNT_UK FROM ${environment}_dmfr.dmsfr_accountfilter_bridge WHERE ACCOUNTFILTERTYPE_UK = 4 AND NVL (DELETED_FLAG, 'N') != 'Y') afl2
               |		ON vn.GL2ACCOUNT_DEBIT_UK =	afl2.GL2ACCOUNT_UK
               |		WHERE date_part >= ${LOAD_DATE_FROM_DATE_PART} AND date_part <=${LOAD_DATE_TO_DATE_PART}
               |
               |		UNION ALL
               |
               |		SELECT
               |		   date_part,
               |		   value_day,
               |		   NVL (cast(bs.ACC_CUR_AMT as double), 0) AS ACC_CUR_AMT,
               |		   NVL (cast(bs.USD_AMT as double), 0) AS USD_AMT,
               |		   NVL (cast(bs.RUR_AMT as double), 0) AS RUR_AMT,
               |		   cast (bs.ACCOUNT_DEBIT_UK as double) ACCOUNT_DEBIT_UK,
               |		   cast(bs.ACCOUNT_CREDIT_UK as double) ACCOUNT_CREDIT_UK,
               |		   cast(bs.DEAL_UK as double) DEAL_UK,
               |		   cast(bs.GL2ACCOUNT_DEBIT_UK as double) GL2ACCOUNT_DEBIT_UK,
               |		   cast(bs.GL2ACCOUNT_CREDIT_UK as double) GL2ACCOUNT_CREDIT_UK,
               |		   cast(BS.CURRENCY_UK as double) CURRENCY_UK
               |		FROM ${environment}_dmfr.BSTRANSACTION_TRAN bs
               |		JOIN (SELECT DISTINCT GL2ACCOUNT_UK FROM ${environment}_dmfr.dmsfr_accountfilter_bridge WHERE ACCOUNTFILTERTYPE_UK = 5 AND NVL (DELETED_FLAG, 'N') != 'Y') afl1
               |		ON cast (bs.GL2ACCOUNT_CREDIT_UK as double) = afl1.GL2ACCOUNT_UK
               |		JOIN (SELECT DISTINCT GL2ACCOUNT_UK FROM ${environment}_dmfr.dmsfr_accountfilter_bridge WHERE ACCOUNTFILTERTYPE_UK = 4 AND NVL (DELETED_FLAG, 'N') != 'Y') afl2
               |		ON cast (bs.GL2ACCOUNT_DEBIT_UK as double)= afl2.GL2ACCOUNT_UK
               |		WHERE
               |		date_part >=${LOAD_DATE_FROM_DATE_PART} AND date_part <=${LOAD_DATE_TO_DATE_PART}
               |		) a
               |inner join ${MART_TMP_DATABASE}.RECOVERYWOIFRS_D2A2_TMP t1
               |on a.ACCOUNT_CREDIT_UK=t1.ACCOUNT_UK;
               |""".stripMargin
val sql =
  """
    |with w1(w1_1, w1_2)
    |as (select f1, f2 from f)
    |insert into m
    |select * from (
    |select
    | b.b_a_1 + b.b_a_2 as b_a,
    | b.b_b,
    | b.b_d_1 + 1 as b_d,
    | bb.bb_1,
    | w1.w1_2,
    | case when b.a = 1 then 0 else b.b end as ca,
    | (select sum(bbb.nn) as summm from bbb where bbb.a = b.a) as saaaa,
    | subf2
    |from
    |b left join bb on b.id = bb.id
    |left join w1 on bb.id = w1.w1_1,
    |(select subf, subf2 from subt) as subq(subf)
    |where sugq.subf = b.id)
    |""".stripMargin

val s: CatalystSqlParser = CatalystSqlParser

val logical: LogicalPlan = s.parsePlan(alpha2
  .replace("${", "")
  .replace("}", ""))

logical
println(logical.toJSON)