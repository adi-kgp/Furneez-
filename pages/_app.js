import Layout from '../components/_App/Layout';
import App from "next/app";

class MyApp extends App {
  static async getInitialProps({Component, ctx}){
    let pageProps = {};
    if (Component.getInitialProps){
      pageProps = await Component.getInitialProps(ctx)
    }
    return {pageProps} // es6 shorthand for creating property pageProps: pageProps
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout>
        <Component {...pageProps}/>;
      </Layout>
    );
  }
}

export default MyApp;
