import "@/styles/globals.css";
import Navigation from "@/components/navigation";
import CreatePlantForm from "@/components/createPlantForm";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      
      <Navigation />
    </>
  );
}
