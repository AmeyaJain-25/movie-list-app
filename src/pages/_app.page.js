import Head from 'next/head';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import theme from '~/styles/theme';

import '@fontsource/poppins/latin.css';
import '@fontsource/inter/latin.css';
import '@fontsource/roboto-mono/latin.css';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: ${theme.fontFamilies.base};
    font-size: 16px;
  }

  button,
  input,
  textarea {
    font-family: ${theme.fontFamilies.base};
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  p {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        ></meta>
        <link rel="alternate icon" href="/assets/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
