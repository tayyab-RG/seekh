import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../components/authContext';
import { CookiesProvider } from 'react-cookie';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </CookiesProvider>
  );
}

export default MyApp
