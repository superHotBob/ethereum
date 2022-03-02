import "../styles/globals.css";
import Layout from "../components/layout";
import { Provider } from "react-redux";
import store from "../store";
import Web3 from 'web3';
import { Web3ReactProvider } from '@web3-react/core';
import { MetaMaskProvider } from "../hooks/metamask";

function getLibrary(provider, connector) {
  return new Web3(provider)
};
function MyApp({ Component, pageProps }) {

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <MetaMaskProvider>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </MetaMaskProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
