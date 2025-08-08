// pages/search.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import { useDarkMode } from '../context/ThemeColorContext';
/**
 * 搜索页面组件
 * @param {Object} props - 组件props
 * @param {Array} props.allArticles - 所有文章数据
 * @returns {JSX.Element} 搜索页面的JSX元素
 */
export default function SearchPage({ allArticles }) {
  const router = useRouter();
  const { q } = router.query; // 获取查询参数
  const [results, setResults] = useState([]); // 搜索结果状态
  const [loading, setLoading] = useState(false); // 加载状态


  // 初始化时确保主题与localStorage同步
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
  }, []);

  // 当查询参数或文章变化时执行搜索
  useEffect(() => {
    if (!q) {
      setResults(allArticles); // 无查询时显示所有文章
      return;
    }

    setLoading(true); // 开始加载
    
    // 设置延迟搜索(防抖)
    const timer = setTimeout(() => {
      const searchResults = allArticles.filter(article => {
        const query = q.toLowerCase();
        // 检查标题、摘要和标签是否匹配
        const titleMatch = article.title?.toLowerCase().includes(query);
        const excerptMatch = article.excerpt?.toLowerCase().includes(query);
        const tagsMatch = article.tags?.some(tag => tag.toLowerCase().includes(query));
        
        return titleMatch || excerptMatch || tagsMatch;
      });
      
      setResults(searchResults);
      setLoading(false); // 结束加载
    }, 300);

    return () => clearTimeout(timer); // 清理定时器
  }, [q, allArticles]);

  return (
    <>
      <Head>
        <title>{q ? `搜索: ${q} | Artisthalic` : '搜索 | Artisthalic'}</title>
        <link rel="icon" type="image/png" href="/images/icon/A.png" />
      </Head>
      <div className="nav">
            <h1 className="search-title">
              搜索内容
              
            </h1>
            
            <div className="nav-right">
            <button 
                onClick={() => router.push('/')}
                className="home-button"
                style={{color:'var(--text-color);'}}
              >
                返回首页
              </button>
              <SearchBar initialValue={q} />
            </div>
          </div>
      <div className={`search-page`}>
          <div className="main-content">
            {loading ? (
              <div className="loading-indicator">
                <div className="spinner"></div>
                <p>正在搜索...</p>
              </div>
            ) : (
              <>
                <h2 className="results-title">
                  {q ? `"${q}" 的搜索结果` : '所有文章'}
                  <span className="results-count">({results.length}条)</span>
                </h2>
                
                {results.length > 0 ? (
                  <div className="articles-grid">
                    {results.map(article => (
                      <article key={article.slug} className="article-card">
                        <Link href={`/artists/${article.slug}`} className="article-link">
                            <div className="article-content">
                            <div className="article-text">
                              <h3 className="article-title">{article.title}</h3>
                              <span className="article-date">
                                  {new Date(article.date).toLocaleDateString()}
                                </span>
                              <p className="article-excerpt">{article.excerpt}</p>
                              <div className="articles-meta">
                                
                                <div className="article-tags">
                                  {article.tags?.map(tag => (
                                    <span key={tag} className="tag">{tag}</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            {article.coverImage && (
                              <div className="article-image">
                                <img 
                                  src={article.coverImage} 
                                  alt={article.title}
                                  className="cover-image"
                                  style={{ width: '100px', height: '100px' }}
                                />
                              </div>
                            )}
                            </div>
                        </Link>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="no-results">
                    <p>{q ? `没有找到与"${q}"相关的内容` : '暂无文章'}</p>
                    <button 
                      onClick={() => router.push('/')}
                      className="home-button"
                    >
                      返回首页
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
      </div>
    </>
  );
}

/**
 * 获取静态props - 在构建时获取所有文章数据
 * @returns {Object} 包含所有文章的props对象
 */
export async function getStaticProps() {
  const articlesDirectory = path.join(process.cwd(), 'pages/artists');
  const filenames = fs.readdirSync(articlesDirectory);
  
  const articles = filenames
    .filter(filename => filename.endsWith('.md') || filename.endsWith('.mdx'))
    .map(filename => {
      const filePath = path.join(articlesDirectory, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      
      return {
        slug: filename.replace(/\.mdx?$/, ''),
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || '',
        tags: data.tags || [],
        coverImage: data.coverImage || null
      };
    });

  return {
    props: {
      allArticles: articles
    }
  };
}