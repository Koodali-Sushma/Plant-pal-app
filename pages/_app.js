import "@/styles/globals.css";
import Navigation from "@/components/navigation";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Navigation />
    </>
  );
}
