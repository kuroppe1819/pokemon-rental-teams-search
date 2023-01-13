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
        <div className="mt-6 mb-12 text-gray-900 font-normal">
          <p className="font-normal mb-2">
            Pokemon Rental Teams Searchに関する質問や改善要望があれば、{" "}
            <a
              className="text-blue-800 hover:underline font-normal"
              href="https://twitter.com/mys_x101"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>{" "}
            の DM にご連絡ください。。
          </p>
        </div>
        <div>
          <LinkButton text="トップに戻る" href="/" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
