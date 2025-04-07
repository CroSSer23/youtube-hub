import '../styles/globals.css';
import LocaleProvider from '../components/LocaleProvider';

function MyApp({ Component, pageProps }) {
  return (
    <LocaleProvider>
      <Component {...pageProps} />
    </LocaleProvider>
  );
}

export default MyApp; 