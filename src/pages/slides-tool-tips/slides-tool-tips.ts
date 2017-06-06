import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { HomePage } from "../home/home";

@Component({
  selector: "page-slides-tool-tips",
  templateUrl: "slides-tool-tips.html"
})
export class SlidesToolTipsPage {

  //region ATTRIBUTES
  private _slides;
  //endregion

  //region CONSTRUCTOR
  constructor(public navController: NavController) {
    this._slides = [
      {
        title: "Bienvenido a <b><span class='title_re_life'>Re Life</span></b>!",
        description: "<b class='title_re_life'>Re Life</b> es una novedosa aplicación de venta de productos de segunda mano," +
        " aquí tienes unos consejos de cómo se usa.",
        image: "../assets/tool-tips/ica-slidebox-img-1.png"
      },
      {
        title: "¿Cómo funciona?",
        description: "<b>Muy fácil</b> tú quieres vender algo, " +
        "pero no tienes ni idea de economía así que subes una foto de lo que quieres vender y la gente pujará por él 💖 <br>" +
        "Puedes hablar con cualquiera y vender lo que deseés.",
        image: "../assets/tool-tips/ica-slidebox-img-2.png"
      },
      {
        title: "¿Tan solo eso?",
        description: "Tienes muchas más cosas que hacer <br>" +
        "Puedes ir a editar tu cuenta <br>" +
        "Añadir productos a favoritos 💛 <br>" +
        " o <br>" +
        "Hablar con personas 💞",
        image: "../assets/tool-tips/ica-slidebox-img-3.png"
      }
    ];
  }

  //endregion

  //region GETTER AND SETTER
  get slides() {
    return this._slides;
  }

  set slides(value) {
    this._slides = value;
  }

  //endregion

  //region COMPONENTS
  public changeSetRoot() {
    this.navController.setRoot(HomePage);
  }

  //endregion

  //region DEBUG
  static ionViewDidLoad() {
    console.log("ionViewDidLoad SlidesToolTipsPage");
  }

  //endregion
}
