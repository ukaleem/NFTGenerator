import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
        <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="COLLECTION OF 3,333 GUCCiTROLL NFTS" />
          <link rel="apple-touch-icon" href="/logo192.png" />
          <link rel="manifest" href="/manifest.json" />

          <link href="main.css" rel="stylesheet"/>
        </Head>
        <body style={{overflow:"hidden"}}>
          <Main />
          <NextScript />
        
        </body>
      </Html>
    )
  }
}

export default MyDocument