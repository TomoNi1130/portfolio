import './App.css'

function App() {
  return (
    <div className="page">
      <header>
        <h1>名前</h1>
        <p>所属・学年</p>
        <p>取り組んでいることを簡潔に記入。</p>
      </header>

      <main>
        <section aria-labelledby="projects-heading">
          <h2 id="projects-heading">開発記録</h2>

          {/* 制作物が増えたら article を複製する。 */}
          <article>
            <h3>制作物・活動の名前</h3>
            <dl>
              <div>
                <dt>期間</dt>
                <dd>年月〜年月</dd>
              </div>
              <div>
                <dt>担当</dt>
                <dd>自分が担当した範囲</dd>
              </div>
              <div>
                <dt>使用技術</dt>
                <dd>言語・マイコン・ツールなど</dd>
              </div>
            </dl>
            <p>何を作り、どのように実装したかを記入。</p>
          </article>
        </section>
      </main>

      <footer>
        <h2>連絡先・リンク</h2>
        <p>公開したい連絡先やGitHubのリンクを記入。</p>
      </footer>
    </div>
  )
}

export default App
