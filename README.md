# ポートフォリオ

React + TypeScript + Vite。React CompilerとESLintを使用。

## 開発

```bash
npm install
npm run dev
```

## 編集するファイル

- `src/App.tsx`：名前・所属、開発記録、連絡先。仮の文章を自分の内容に置き換える。
- `src/App.css`：ページのレイアウト。
- `src/index.css`：全体の文字や色。
- `index.html`：ページタイトル、検索結果とOGPの説明。
- `public/`：写真など。例えば`public/robot.jpg`は`/robot.jpg`で参照できる。

開発記録を増やす場合は、`src/App.tsx`の`article`を複製する。
記入用の文章は公開前に置き換えるか、不要な項目ごと削除する。

## 確認・ビルド

```bash
npm run lint
npm run build
npm run preview
```

公開用ファイルは`dist/`に生成される。
