package ru.neoflex.datalog.domain

trait Node {
 def name: String
 def in: List[Node] = List()
 def out: List[Node] = List()
 def project: String = ""
 def layer: String = ""
}