/**
 * Focus Carousel
 */

import { Uuid } from "./uuid.js"

export class Carousel{
  selector = ".carousel"
  areas = []

  constructor(){
    this.promise = new Promise((resolve, reject)=>{
      this.resolve = resolve
      this.reject  = reject
      this.init()
      this.set_event()
      this.finish()
    })
  }

  // 1ページ内のカルーセル領域の取得（エリア一覧）
  get elements(){
    return document.querySelectorAll(this.selector)
  }

  // カルーセル内のアイテム一覧の取得
  get_items(carousel_area){
    if(!carousel_area){return []}
    return carousel_area.querySelectorAll(`:scope figure > *`)
  }

  // 各種設定データの取得（登録）
  init(){
    for(const area of this.elements){
      const uuid = new Uuid().make()
      area.setAttribute("data-uuid" , uuid)
      // center position
      const rect = area.getBoundingClientRect()
      this.areas.push({
        uuid   : area.getAttribute("data-uuid"),
        elm    : area,
        rect   : rect,
        center : rect.width / 2,
        items  : this.get_items(area),
      })

      // Write coordinates to item
      const figure = area.querySelector("figure")
      this.set_status(figure)
      this.set_loop(figure)
    }
  }

  // 登録済のデータから、対象エリアのデータを取得
  get_area_data(area){
    return this.areas.find(e => e.uuid === area.getAttribute("data-uuid"))
  }

  // イベント登録
  set_event(){
    for(const area of this.elements){
      const figure = area.querySelector(":scope > *")
      figure.addEventListener("scroll" , this.scroll.bind(this))
      figure.addEventListener("scrollend" , this.scroll_end.bind(this))
    }
    window.addEventListener("resize" , this.resize.bind(this))
  }

  // [イベント] カルーセルのスクリール処理
  scroll(e){
    this.set_status(e.target)
  }

  // フォーカスアイテムの選択（中心のアイテム）
  set_status(figure){
    if(!figure){return}
    const area = figure.closest(this.selector)
    const data  = this.get_area_data(area)
    if(!data){return}
    const items = data.items
    for(const item of items){
      const center = Math.abs(~~(item.offsetLeft - figure.scrollLeft + (item.offsetWidth / 2)) - data.center)
      if(center < item.offsetWidth/2){
        item.setAttribute("data-status" , "active")
      }
      else if(item.hasAttribute("data-status")){
        item.removeAttribute("data-status")
      }
    }
  }

  // スクロール終了イベント
  scroll_end(e){
    this.set_loop(e.target)
  }

  // 無限ループ処理
  set_loop(figure){
    if(!figure){return}
    const elms = figure.querySelectorAll(":scope > *")

    // left
    if(figure.scrollLeft < elms[0].offsetWidth){
      this.item_end2start(figure, elms[elms.length-1], elms[0])
    }

    // right
    else if(elms[elms.length-1].offsetLeft < figure.scrollLeft + figure.offsetWidth){
      this.item_start2end(figure, elms[0])
    }
  }

  // 左（先頭）に、最後尾からアイテムを移動
  item_end2start(figure, end_elm, start_elm){
    figure.insertBefore(end_elm, start_elm)
    figure.scrollLeft += end_elm.offsetWidth / 2
  }

  // 最後尾に、先頭からアイテムを移動
  item_start2end(figure, start_elm){
    figure.appendChild(start_elm)
  }

  // 画面リサイズ時の処理
  resize(){
    this.init()
  }

  // 設定完了処理(.promise.then()で処理追加が可能)
  finish(){
    this.resolve()
  }
}
