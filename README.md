# ポートフォリオ

Astro＋Markdownで管理する静的なポートフォリオ。
作品ごとにMarkdownを追加すると、トップページの作品一覧と詳細ページを生成する。
`main`の自己紹介・作品・画像を引き継いでいる。

## 開発環境

推奨：Node.js 24.22.2（`.nvmrc`）、npm 9.6.5以上。
Astroの必須条件はNode.js 22.23.4以上の対応する偶数メジャーバージョン。

```bash
# nvmを使用している場合
nvm install
nvm use

npm ci
npm run dev
```

開発サーバーは通常 `http://localhost:4321/`。実際のURLは起動時の表示を確認する。
Markdownやレイアウトを保存すると開発画面に反映される。

## 作品を追加する

```bash
cp templates/project.md src/content/projects/my-project.md
```

1. ファイル名を英小文字・数字・ハイフンにする。例：`robot-control.md`。
2. ファイル冒頭の`---`で囲んだ項目と、本文の`［ ］`を埋める。
3. 画像を`public/images/`に追加し、Markdownには`/images/画像名`と書く。
4. 掲載するときに`draft: false`にする。

`my-project.md`なら詳細ページは `/works/my-project/`。
下書き（`draft: true`）は、開発時も一覧・詳細の両方に表示されない。
プレビューしたいときはローカルで`false`に変更して確認する。
`order`の小さい順に一覧へ表示する。同じ値の場合はファイル名順。

冒頭の項目：

| 項目 | 内容 |
| --- | --- |
| `title` | 作品名。必須 |
| `description` | 短い概要。必須 |
| `period` | 制作期間。省略可 |
| `role` | 自分の担当。省略可 |
| `technologies` | 使用技術の配列。省略可 |
| `cover` / `coverAlt` | 表紙画像のパスと説明。省略可 |
| `url` | ソースコードやデモのURL。省略可。使わない場合は行ごと削除 |
| `order` | 一覧の表示順。省略時は100 |
| `draft` | 下書きかどうか。省略時は`true` |

これらは`src/content.config.ts`で形式を検証する。
本文の見出しは自由に編集でき、不要な項目は削除してよい。
既存3作品は`main`に記載されていた内容のみ移している。担当や成果は本人の内容を追記する。

## 構成

```text
src/
├── content.config.ts        # 作品の項目と入力チェック
├── content/projects/*.md    # 作品ごとの文章
├── layouts/BaseLayout.astro # 共通のHTML・ナビゲーション
├── pages/index.astro        # 自己紹介・作品一覧・連絡先
├── pages/works/[id].astro   # 作品詳細の共通テンプレート
└── styles/global.css        # 全体の見た目
public/
├── images/                  # 画像（URLは /images/...）
└── js/script.js             # メニューなど既存の画面操作
templates/project.md         # 作品追加用テンプレート
```

文章は`src/content/projects/`、デザインはレイアウト・CSSで編集する。
自己紹介や連絡先は`src/pages/index.astro`、共通の名前・ページ情報は`src/layouts/BaseLayout.astro`。

## 確認・ビルド

```bash
npm run check
npm run build
npm run preview
```

`build`は型・コンテンツの検証後に静的HTMLを`dist/`へ生成する。
`preview`はビルド済みの内容を確認するためのサーバー。
公開時は`dist/`を静的ホスティングへ配置する。
サブディレクトリ（例：GitHub Pagesの`/portfolio/`）へ公開する場合は、
Astroの`base`設定と、本文・画像・ナビゲーションのURLを公開先に合わせて調整する。

## 参考

- [Astroのインストール](https://docs.astro.build/en/install-and-setup/)
- [Markdown](https://docs.astro.build/en/guides/markdown-content/)
- [Content Collections](https://docs.astro.build/en/guides/content-collections/)
