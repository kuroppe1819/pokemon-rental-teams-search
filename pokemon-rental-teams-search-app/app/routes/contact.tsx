import Footer from "~/components/Footer";
import Heading from "~/components/Heading";
import LinkButton from "~/components/LinkButton";

export default function Contact() {
  return (
    <div className="h-screen flex flex-col items-center">
      <div className="mt-32">
        <Heading text="Contact" />
      </div>
      <main className="container px-4 sm:px-20 flex items-center flex-col grow">
        <div className="mt-6 mb-12 text-gray-900 font-normal">
          <p className="text-gray-900 font-normal">
            お問い合わせは{" "}
            <a
              className="text-blue-800 hover:underline font-normal"
              href="https://twitter.com/mys_x101"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>{" "}
            の DM にて承っております。
          </p>
          <p className="text-gray-900 font-normal">
            サービスの改善についてのご意見、ご要望をお聞かせください！
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
