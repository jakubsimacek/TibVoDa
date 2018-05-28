package tibvoda

import org.scalajs.dom
import org.scalajs.dom._

import scala.scalajs.js
import scala.scalajs.js.Any._
import scala.scalajs.js.Dynamic.{literal, global => g}
import scala.scalajs.js.{Dynamic, JSApp}
import scala.scalajs.js.annotation.JSExport
import scalajs.vuejs.Vue


object TibVoDa {
  //defines the type for the data in the main Vue instance
  @js.native
  trait Data extends Vue {
    var count: Int = js.native
  }

  //set type for Vue methods in main instance with no parameters
  type VueMethod = js.ThisFunction0[Data,Unit]

  //Counter as component
  val counterComp = Vue.component("textField", literal(
    data = () => {
      literal(
        count = 0
      )
    },
    methods = literal(
      increment = ((data:Data) =>
        data.count += 1
        ):VueMethod
    ),
    template = "<div> {{count}} " +
      "<button @click='increment'>Increment</button> " +
      "</div>"
  ))

  @JSExport
  def main(args: Array[String]): Unit = {
    //println("Hello Scala.js")
    //appendHello(document.body, "Hello Scala.js")
    val app: Vue = new Vue(
      literal(
        el = "#main",
        compontents = literal(
          counter = counterComp
        )/*,
        data = literal(
          count = 0
        ),
        methods = literal(
          increment = ((data: Data) => {
            println("Clicked")
            data.count += 1
          } ): VueMethod
        )*/
      )
    )
  }

  /*
  def appendHello(targetNode: dom.Node, text: String): Unit = {
    val titleNode = document.createElement("h1")
    val textNode = document.createTextNode(text)
    titleNode.appendChild(textNode)
    targetNode.appendChild(titleNode)
  } */

}
