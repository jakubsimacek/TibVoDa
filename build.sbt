enablePlugins(ScalaJSPlugin)

name := "TibVoDa"

version := "0.1"

scalaVersion := "2.12.6"

//everything from previous here
scalaJSUseMainModuleInitializer := true

libraryDependencies += "org.scala-js" %%% "scalajs-dom" % "0.9.6"