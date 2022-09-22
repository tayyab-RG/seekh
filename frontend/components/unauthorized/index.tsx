import Head from "next/head";
import Navbar from "../navbar";

const Unauthorized = () => {

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black">
            <Head>
                <title>Unauthorized</title>
                <meta name="description" content="Unauthorized" />
                <link rel="icon" href="/seekh.ico" />
            </Head>
            <Navbar active='' />
            <div className="min-h-screen w-full">
                <div className="text-center pt-96">
                    403 | Unauthorized
                </div>
            </div>
        </div>
        // <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif', height: '100vh', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        //     <div>
        //         <style dangerouslySetInnerHTML={{ __html: "\n                body { margin: 0; color: #000; background: #fff; }\n                .next-error-h1 {\n                  border-right: 1px solid rgba(0, 0, 0, .3);\n                }\n\n                @media (prefers-color-scheme: dark) {\n                  body { color: #fff; background: #000; }\n                  .next-error-h1 {\n                    border-right: 1px solid rgba(255, 255, 255, .3);\n                  }\n                }" }} />
        //         <h1 className="next-error-h1" style={{ display: 'inline-block', margin: 0, marginRight: '20px', padding: '0 23px 0 0', fontSize: '24px', fontWeight: 500, verticalAlign: 'top', lineHeight: '49px' }}>
        //             404
        //         </h1>
        //         <div style={{ display: 'inline-block', textAlign: 'left', lineHeight: '49px', height: '49px', verticalAlign: 'middle' }}>
        //             <h2 style={{ fontSize: '14px', fontWeight: 'normal', lineHeight: '49px', margin: 0, padding: 0 }}>This page could not be found.</h2>
        //         </div>
        //     </div>
        // </div>
    );
}

export default Unauthorized;