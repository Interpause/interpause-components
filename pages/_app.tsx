import { AppProps } from 'next/app';
import { GlobalStyles } from 'twin.macro';
import { Global } from '@emotion/react';
import { baseStyle } from '../src/theme/baseTheme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Global styles={baseStyle} />
      <Component {...pageProps} />
    </>
  );
}
