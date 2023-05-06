import Footer from "~/components/Footer";
import Heading from "~/components/Heading";
import LinkButton from "~/components/LinkButton";

export default function About() {
  return (
    <div className="h-screen flex flex-col items-center">
      <div className="mt-32">
        <Heading text="About us" />
      </div>
      <main className="container px-4 sm:px-20 flex items-center flex-col grow">
        <ul className="mt-6 mb-12 text-gray-900 font-normal">
          <li className="mb-6">
            <h3 className="text-lg font-medium">
              Pokemon Rental Teams Search について
            </h3>
            <p>
              Pokemon Rental Teams Search（以下、「本サービス」といいます。）は
              Twitter に公開されているレンタルチームを検索できるサービスです。
            </p>
          </li>
          <li className="mb-6">
            <h3 className="text-lg font-medium">管理者について</h3>
            <p>
              管理者のもやし丸と申します。本サービスは私個人で開発、運用しております。
            </p>
            <p>
              本サービスに関する質問や改善要望があれば、
              <a
                className="text-blue-800 hover:underline font-normal"
                href="https://twitter.com/kuroppe1819"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>{" "}
              の DM でご連絡ください。。
            </p>
          </li>
          <li className="mb-6">
            <h3 className="text-lg font-medium">権利帰属</h3>
            <p>
              ポケットモンスター・ポケモン・Pokémonは任天堂・クリーチャーズ・ゲームフリークの登録商標です。
            </p>
            <p>本サービスは、上記の企業様とは一切関連性はありません。</p>
            <p>
              当サイトが提供する独自の文章やプログラムの所有権及び知的財産権は当方に帰属します。
            </p>
          </li>
        </ul>
        <div>
          <LinkButton text="トップに戻る" href="/" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
