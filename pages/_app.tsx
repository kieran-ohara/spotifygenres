import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';
import React from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
      <Provider session={pageProps.session}>
          <React.Fragment>
              <Head>
                  <title>My page</title>
                  <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
              </Head>
              <CssBaseline />
              <Component {...pageProps} />
          </React.Fragment>
      </Provider>
  );
}
