// pages/column/BH/[slug].js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function BHColumn({ content, frontmatter, markdownFiles }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <div className="nav">
        <h1 style={{ color: 'var(--theme-color)' }}>
        
          {frontmatter.title || '闪客画师奇传'}
          <div className="nav-right-2">
          <button className="home-button" onClick={toggleSidebar} style={{ color: 'var(--text-color)' }}>
            {isSidebarVisible ? '隐藏' : '显示'}目录
          </button>
          <button 
            onClick={() => router.push('/')}
            className="home-button"
            style={{ color: 'var(--text-color)' }}
          >
            返回首页
          </button>
          </div>
        </h1>
      </div>
      <div className={`column-container ${!isSidebarVisible ? 'sidebar-hidden' : ''}`}>
        <Head>
          <title>{frontmatter.title || '闪客画师奇传'}</title>
        <link rel="icon" type="image/png" href="/images/icon/B.png" />
        </Head>
        
        <div className="content">
          <div className="markdown-content">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
        
        {isSidebarVisible && (
          <div className="sidebar">
            <h3>目录</h3>
            <ul className="toc">
              {markdownFiles.map((file) => (
                <li key={file.slug}>
                  <Link href={`/column/BH/${file.slug}`} className="column-card">
                    <div className="column-content">
                      {file.title}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  // 当前文章路径
  const filePath = path.join(process.cwd(), 'pages/column/BH', `${params.slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter, content } = matter(fileContent);
  
  // 获取同目录下所有 Markdown 文件
  const directoryPath = path.join(process.cwd(), 'pages/column/BH');
  const filenames = fs.readdirSync(directoryPath);
  
  const markdownFiles = filenames
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '');
      const filePath = path.join(directoryPath, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      
      return {
        slug,
        title: data.title || slug,
      };
    });
  
  return {
    props: {
      content,
      frontmatter,
      markdownFiles,
    },
  };
}

export async function getStaticPaths() {
  // 获取同目录下所有 Markdown 文件
  const directoryPath = path.join(process.cwd(), 'pages/column/BH');
  const filenames = fs.readdirSync(directoryPath);
  
  const paths = filenames
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => ({
      params: { slug: filename.replace(/\.md$/, '') },
    }));
  
  return {
    paths,
    fallback: false,
  };
}