import "../styles/globals.css";

import { NavBar } from "../Components/index";

const MyApp = ({ Component, pageProps }) => (
  <div>
    <NavBar /> 
    <Component {...pageProps} />
  </div>
);

export default MyApp;
