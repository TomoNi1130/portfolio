# ポートフォリオ

React + TypeScript + Vite + Tailwind CSS。React CompilerとESLintを使用。

## 開発

```bash
npm install
npm run dev
```

## 編集するファイル

- `src/App.tsx`：名前・所属、開発記録、連絡先。仮の文章を自分の内容に置き換える。
- `src/App.tsx`の`className`：Tailwind CSSでレイアウトや見た目を指定。
- `src/index.css`：Tailwind CSSの読み込みと全体の基本スタイル。
- `index.html`：ページタイトル、検索結果とOGPの説明。
- `public/`：写真など。例えば`public/robot.jpg`は`/robot.jpg`で参照できる。

開発記録を増やす場合は、`src/App.tsx`の`article`を複製する。
記入用の文章は公開前に置き換えるか、不要な項目ごと削除する。

## スタイルの編集

Tailwind CSSのクラスを`className`に記入する。

```tsx
<h2 className="text-xl font-bold">開発記録</h2>
```

`text-xl`は文字サイズ、`font-bold`は太字。追加の設定ファイルは不要。

## 確認・ビルド

```bash
npm run lint
npm run build
npm run preview
```

公開用ファイルは`dist/`に生成される。
