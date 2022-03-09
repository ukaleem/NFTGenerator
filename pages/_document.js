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
          <link href="tailwind.min.css" rel="stylesheet" />
          <link href="fontawesome.min.css" rel="stylesheet" />
          <link rel="stylesheet" href="animate.min.css" />

          <link rel="stylesheet" href="style.css" />
          
        </Head>
        <body>
          

          {/* <!-- Modal 2 --> */}
          <Main />
          <NextScript />
          <div className="fire-bg">
            <script src="lottie.js"></script>
            <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_no9qrf5p.json" background="transparent" speed="1"
              loop autoplay></lottie-player>
          </div>
          <script src="script.js"></script>
          <script src="modal.js"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument