import { Html, Head, Main, NextScript } from 'next/document'

import i18nextConfig from '../next-i18next.config'


export default function Document(props) {
  const currentLocale =
    props.__NEXT_DATA__.locale ??
    i18nextConfig.i18n.defaultLocale
  return (
    <Html lang={currentLocale}>
      <Head>
        <link href="/css/style.css" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}