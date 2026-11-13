function App() {
  return (
    <div className="mx-auto w-[calc(100%_-_2rem)] max-w-3xl py-12">
      <header className="pb-6">
        <h1 className="my-[0.67em] text-[2rem] leading-[1.4] font-bold">
          名前
        </h1>
        <p className="my-4">所属・学年</p>
        <p className="my-4">取り組んでいることを簡潔に記入。</p>
      </header>

      <main className="mt-8 border-t border-[#ddd] pt-6">
        <section aria-labelledby="projects-heading">
          <h2
            id="projects-heading"
            className="my-[0.83em] text-xl leading-[1.4] font-bold"
          >
            開発記録
          </h2>

          {/* 制作物が増えたら article を複製する。 */}
          <article className="[&+article]:mt-8">
            <h3 className="my-[1em] text-[1.1rem] leading-[1.4] font-bold">
              制作物・活動の名前
            </h3>
            <dl className="my-4">
              <div className="my-2 grid grid-cols-[5em_minmax(0,1fr)] gap-4">
                <dt className="text-[#555]">期間</dt>
                <dd>年月〜年月</dd>
              </div>
              <div className="my-2 grid grid-cols-[5em_minmax(0,1fr)] gap-4">
                <dt className="text-[#555]">担当</dt>
                <dd>自分が担当した範囲</dd>
              </div>
              <div className="my-2 grid grid-cols-[5em_minmax(0,1fr)] gap-4">
                <dt className="text-[#555]">使用技術</dt>
                <dd>言語・マイコン・ツールなど</dd>
              </div>
            </dl>
            <p className="my-4">何を作り、どのように実装したかを記入。</p>
          </article>
        </section>
      </main>

      <footer className="mt-8 border-t border-[#ddd] pt-6 pb-6">
        <h2 className="my-[0.83em] text-xl leading-[1.4] font-bold">
          連絡先・リンク
        </h2>
        <p className="my-4">公開したい連絡先やGitHubのリンクを記入。</p>
      </footer>
    </div>
  );
}

export default App;
