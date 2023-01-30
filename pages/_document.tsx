// File Relative Path: pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import loader from '../loader';

const Document = () => {
    return (
        <Html>
            <Head>
                {/* Font Awesome */}
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
                {/* Google Fonts */}
                <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
                {/* MDB */}
                <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.1.0/mdb.min.css" rel="stylesheet" />
                <style>
                    {loader}
                </style>
            </Head>
            <body>
                <div id={'globalLoader'}>
                    <div className="loader">
                        <div />
                        <div />
                    </div>
                </div>
                <Main />
                <NextScript />
                {/* <!-- MDB --> */}
                <Script
                    type="text/javascript"
                    src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.1.0/mdb.min.js"
                ></Script>
            </body>
        </Html>
    )
}
export default Document;