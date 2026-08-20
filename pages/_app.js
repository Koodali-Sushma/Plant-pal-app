import "@/styles/globals.css";
import Navigation from "@/components/navigation";
import { Oswald, Lato } from "next/font/google";
import { SWRConfig } from "swr";

const heading = Oswald({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-heading",
});

const body = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-body",
});


const fetcher = (url) => fetch(url).then((res) => res.json());

export default function App({ Component, pageProps }) {

  return (
    <SWRConfig value={{ fetcher }}>
      <>
        <div className={`${heading.variable} ${body.variable} font-body`}>
          <Component {...pageProps} />
          <Navigation />
        </div>
      </>
    </SWRConfig>
  );
}
