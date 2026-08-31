import "@/styles/globals.css";
import Navigation from "@/components/Navigation";
import { Oswald, Lato } from "next/font/google";
import { SWRConfig } from "swr";
import { Toaster } from "react-hot-toast";


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

const fetcher = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error("API request failed");

    error.status = response.status;

    throw error;
  }

  return response.json();
};

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      
        <div className={`${heading.variable} ${body.variable} font-body pb-28`}>
          <Component {...pageProps} />
          <Navigation />
        </div>

        <Toaster position="top-right" />
      
    </SWRConfig>
  );
}
