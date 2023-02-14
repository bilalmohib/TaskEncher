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
                        <h1 className="headingLoader">Project Management Software</h1>
                        <div className="sk-cube-grid">
                            <div className="sk-cube sk-cube1"></div>
                            <div className="sk-cube sk-cube2"></div>
                            <div className="sk-cube sk-cube3"></div>
                            <div className="sk-cube sk-cube4"></div>
                            <div className="sk-cube sk-cube5"></div>
                            <div className="sk-cube sk-cube6"></div>
                            <div className="sk-cube sk-cube7"></div>
                            <div className="sk-cube sk-cube8"></div>
                            <div className="sk-cube sk-cube9"></div>
                        </div>
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