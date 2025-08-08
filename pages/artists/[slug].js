// pages/artists/[slug].js
import { getArticles } from '../../lib/articles';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDarkMode } from '../../context/ThemeColorContext'; 

export default function ArtistDetail({ artist }) {
  const { isDarkMode } = useDarkMode(); 
  const isTerkoiz = artist.slug === 'Terkoiz';
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{artist.title}</title>        
        <link rel="icon" type="image/png" href="/images/icon/E.png" />

      </Head>
      <div className="nav">
        <h1 style={{ color: ' var(--theme-color)' }}> 
          艺术家详情
          <button 
            onClick={() => router.push('/')}
            className="home-button"
            style={{ color: isDarkMode ? '#f0f0f0' : '#333333' }} 
          >
            返回首页
          </button>
        </h1>
      </div>
      
      <div 
        className={`artist-detail ${isTerkoiz ? 'terkoiz-special' : ''}`}
        style={{
          padding: '20px 40px',
          maxWidth: '100%',
          margin: '0 auto',
          transition: 'all 0.3s ease',
          backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff', 
          color: isDarkMode ? '#f0f0f0' : '#333333'
        }}
      >
        
        <div className="artist-first">
        {artist.coverImage && (
          <img 
            src={artist.coverImage} 
            alt={artist.title}
            style={{ 
              width: '100px', 
              height: 'auto',
              maxHeight: '400px',
              objectFit: 'cover',
              marginBottom: '2rem'
            }}
          />
        )}
        <div className="artist-right">
        <h1 style={{ 
          margin: 0,
          color: isTerkoiz ? '#40e0d0' : ' var(--theme-color)'
        }}>
          {artist.title}
        </h1>
        <div className="artist-meta">
          <span>编写于{new Date(artist.date).toLocaleDateString()}</span>
          {artist.tags.length > 0 && (
            <div className="artist-tags">
              {artist.tags.map(tag => (
                <span 
                  key={tag} 
                  style={{
                    padding: '2px 4px',
                    background: isDarkMode ? '#444' : '#f0f0f0',
                    color: isDarkMode ? '#eee' : '#333',
                    borderRadius: '4px',
                    fontSize: '0.5rem',
                    fontWeight: '600',
                    marginRight: '5px'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        </div>
        </div>
        <div><i>⚠️这个页面的信息不完整</i></div>
        <div className="artist-content">
          <ReactMarkdown>{artist.content}</ReactMarkdown>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'pages/artists', `${params.slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  
  return {
    props: {
      artist: {
        slug: params.slug,
        title: data.title || 'Untitled',
        content,
        date: data.date || new Date().toISOString(),
        tags: data.tags || [],
        coverImage: data.coverImage || null
      }
    }
  };
}

export async function getStaticPaths() {
  const artists = await getArticles();
  const paths = artists.map(artist => ({
    params: { slug: artist.slug }
  }));
  
  return {
    paths,
    fallback: false
  };
}