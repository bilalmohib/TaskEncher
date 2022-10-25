// File Relative Path: pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
    return (
        <Html>
            <Head>
                {/* Font Awesome */}
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" rel="stylesheet" />
                {/* Google Fonts */}
                <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
                {/* MDB */}
                <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.5.0/mdb.min.css" rel="stylesheet" />
                {/* <!-- MDB --> */}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
export default Document;