import '../styles/global.css';
import { ThemeColorProvider } from '../context/ThemeColorContext';
import Head from 'next/head';
export default function App({ Component, pageProps }) {
  return (
  <>
  <Head>
        {/* 预加载表情图片 */}
        <link rel="preload" href="/images/itha/me.png" as="image" />
        <link rel="preload" href="/images/itha/oooo.png" as="image" />
        <link rel="preload" href="/images/itha/enjoy.png" as="image" />
        <link rel="preload" href="/images/itha/happy.png" as="image" />
        <link rel="preload" href="/images/itha/stare.png" as="image" />
      </Head>
    <ThemeColorProvider>
      <Component {...pageProps} />
    </ThemeColorProvider>
  </>
    );
}