Focus Carousel
===
```
Create : 2024-08-20
Author : Yugeta.Koji
```

# Summary
- カルーセルの少しグレードアップした機能版
- CSSとJavascriptでHTMLに記載した素材を簡単にセットできる仕様
- 他のライブラリなどは使わない簡易コード
- 横スライドを無限にループできる仕様


# Issue
- スライドITEMの個数制限は？
  - 数が少ない個数の場合のカルーセル
- 無限ループのON/OFF
- ページネーションの追加（予定）
- 横移動ボタンの設置（予定）


# Howto Build
- HTML
> 以下を記述するだけ。figure直下の.itemを複数追加すると、横スライドする仕様。
```
<div class="carousel">
	<figure>
    <div class="item">
      <img src="img/sample.jpg" alt="">
    </div>
  </figure>
</div>
```

- 各種設定
  - カルーセル内のitemサイズ
  - 無限ループのON/OFF
  - Focus以外のボカシ強度 : filter:blur(**)
  


# Update
- 2024-08-20 : First-commit
