import { Carousel } from "./carousel.js"

export class Main{
  constructor(){
    new Carousel()
  }
}

switch(document.readyState){
  case "complete":
  case "interactive":
    new Main()
    break
  default:
    window.addEventListener("DOMContentLoaded" , (()=> new Main()))
}