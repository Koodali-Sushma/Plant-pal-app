import "@/styles/globals.css";
import Navigation from "@/components/navigation";

import { SWRConfig } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function App({ Component, pageProps }) {
  return ( 
    <SWRConfig value= {{ fetcher }}>
    <>
  <Component {...pageProps}/>
<Navigation />
    </>
  </SWRConfig>
);
}
