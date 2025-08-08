// pages/index.js
import Head from 'next/head'
import React from 'react';
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useDarkMode, useLogoStyle } from '../context/ThemeColorContext'
import ThemeSwitcher from '../components/ThemeSwitcher'
import ThemeColorPicker from '../components/ThemeColorPicker'
import ChatDialog from '../components/ChatDialog'
import SearchBar from '../components/SearchBar'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import { getEmotionImage } from '../components/ChatDialog';
/**
 * 获取静态props - 在构建时获取所有文章数据
 * @returns {Object} 包含所有文章和标签的props对象
 */
 
export async function getStaticProps() {
  // 设置文章目录路径
  const articlesDirectory = path.join(process.cwd(), 'pages/artists')
  // 读取目录下所有文件名
  const filenames = fs.readdirSync(articlesDirectory)
  
  // 处理所有文章文件
  const articles = filenames
    // 过滤出.md和.mdx文件
    .filter(filename => filename.endsWith('.md') || filename.endsWith('.mdx'))
    .map(filename => {
      // 获取文件完整路径
      const filePath = path.join(articlesDirectory, filename)
      // 读取文件内容
      const fileContent = fs.readFileSync(filePath, 'utf8')
      // 使用gray-matter解析markdown元数据
      const { data } = matter(fileContent)
      
      // 返回文章数据对象
      return {
        slug: filename.replace(/\.mdx?$/, ''), // 去除扩展名作为slug
        title: data.title || 'Untitled',       // 标题，默认为"Untitled"
        date: data.date || new Date().toISOString(), // 日期，默认为当前时间
        excerpt: data.excerpt || '',           // 摘要，默认为空
        tags: data.tags || [],                // 标签，默认为空数组
        coverImage: data.coverImage || null   // 封面图，默认为null
      }
    })

  // 获取FA专栏目录下的最新Markdown文件
const faColumnDirectory = path.join(process.cwd(), 'pages/column/FA')
let latestFASlug = '';

try {
  const faFiles = fs.readdirSync(faColumnDirectory)
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const slug = filename.replace(/\.md$/, '')
      const filePath = path.join(faColumnDirectory, filename)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContent)
      
      return {
        slug,
        date: data.date || new Date(0).toISOString()
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
  
  if (faFiles.length > 0) {
    latestFASlug = faFiles[0].slug
  }
} catch (err) {
  console.error('Error reading FA column directory:', err)
}

// 获取HD专栏目录下的最新Markdown文件
const hdColumnDirectory = path.join(process.cwd(), 'pages/column/HD')
let latestHDSlug = '';

try {
  const hdFiles = fs.readdirSync(hdColumnDirectory)
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const slug = filename.replace(/\.md$/, '')
      const filePath = path.join(hdColumnDirectory, filename)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContent)
      
      return {
        slug,
        date: data.date || new Date(0).toISOString()
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
  
  if (hdFiles.length > 0) {
    latestHDSlug = hdFiles[0].slug
  }
} catch (err) {
  console.error('Error reading HD column directory:', err)
}
// 获取BH专栏目录下的最新Markdown文件
const bhColumnDirectory = path.join(process.cwd(), 'pages/column/BH')
let latestBHSlug = '';

try {
  const bhFiles = fs.readdirSync(bhColumnDirectory)
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const slug = filename.replace(/\.md$/, '')
      const filePath = path.join(bhColumnDirectory, filename)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContent)
      
      return {
        slug,
        date: data.date || new Date(0).toISOString()
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
  
  if (bhFiles.length > 0) {
    latestBHSlug = bhFiles[0].slug
  }
} catch (err) {
  console.error('Error reading BH column directory:', err)
}
// 获取AB专栏目录下的最新Markdown文件
const abColumnDirectory = path.join(process.cwd(), 'pages/column/AB')
let latestABSlug = '';

try {
  const abFiles = fs.readdirSync(abColumnDirectory)
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const slug = filename.replace(/\.md$/, '')
      const filePath = path.join(abColumnDirectory, filename)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContent)
      
      return {
        slug,
        date: data.date || new Date(0).toISOString()
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
  
  if (abFiles.length > 0) {
    latestABSlug = abFiles[0].slug
  }
} catch (err) {
  console.error('Error reading AB column directory:', err)
}
  // 获取所有不重复的标签并排序
  const allTags = Array.from(
    new Set(articles.flatMap(article => article.tags))
  ).sort()
  
  // 返回props供页面组件使用
  return {
    props: {
      allArticles: articles, // 所有文章数据
      allTags,              // 所有标签
      latestFASlug,         // FA专栏最新文章slug
      latestHDSlug,          // HD专栏最新文章slug
      latestBHSlug,          // BH专栏最新文章slug
      latestABSlug          // AB专栏最新文章slug
    }
  }
}

/**
 * 主页面组件
 * @param {Object} props - 组件props
 * @param {Array} props.allArticles - 所有文章数据
 * @param {Array} props.allTags - 所有标签数据
 * @param {string} props.latest**Slug -**专栏最新文章slug
 * @returns {JSX.Element} 主页面的JSX元素
 */
export default function Home({ allArticles, allTags, latestFASlug,latestHDSlug,latestBHSlug,latestABSlug }) {
  const [mounted, setMounted] = useState(false)
  const { isDarkMode } = useDarkMode() 
  const { logoStyle, changeLogoStyle } = useLogoStyle();
  const [selectedTags, setSelectedTags] = useState([])
  const [showAll, setShowAll] = useState(false)
  const [isExpand, setIsExpand] = useState(false);  
  const [currentEmotion, setCurrentEmotion] = useState('me');
  const [showChatDialog, setShowChatDialog] = useState(false);

  
  // 表情图片映射函数
  const getEmotionImage = (emotion) => {
    switch(emotion) {
      case 'me': return '/images/itha/me.png';
      case 'oooo': return '/images/itha/oooo.png';
      case 'enjoy': return '/images/itha/enjoy.png';
      case 'happy': return '/images/itha/happy.png';
      case 'stare': return '/images/itha/stare.png';
      default: return '/images/itha/me.png';
    }
  };
    /**
   * 获取默认封面图片 - 根据主题返回不同的默认图片
   * @returns {string} 默认封面图片路径
   */
  const getDefaultCoverImage = () => {
    return isDarkMode
      ? '/images/logo/default-cover-dark.png'
      : '/images/logo/default-cover-light.png';
  };

  /**
   * 根据标签筛选文章 - 返回符合选中标签的文章
   * @type {Array}
   */
  const filteredArticles = allArticles.filter(article => (
    selectedTags.length === 0 || // 如果没有选中任何标签，返回所有文章
    selectedTags.some(tag => article.tags.includes(tag)) // 否则返回包含任一选中标签的文章
  ));

  /**
   * 获取要显示的文章 - 根据是否筛选和showAll状态决定显示数量
   * @type {Array}
   */
  const displayedArticles = selectedTags.length > 0 || showAll 
    ? filteredArticles // 如果筛选了标签或点击了"显示全部"，显示所有匹配的文章
    : filteredArticles.slice(0, 5); // 否则只显示前6篇文章

  // 副作用钩子 - 组件挂载时执行
  useEffect(() => {
    setMounted(true)
    document.documentElement.style.overflowX = 'hidden'
    document.body.style.overflowX = 'hidden'
  }, [isDarkMode]) // 依赖

  /**
   * 切换标签选择 - 添加或移除标签
   * @param {string} tag - 要切换的标签
   */
  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag) // 如果标签已选中，则移除
        : [...prev, tag]              // 否则添加标签
    )
    setShowAll(true); // 当选择标签时自动显示所有匹配结果
  }

  const [isExpanded, setIsExpanded] = useState(false); // 控制高度状态
  
  return (
    <>
      {/* 页面头部设置 */}
      <Head>
        <title>Artisthalic倾斜艺术家百科</title>
        <link rel="icon" type="image/png" href="/images/icon/A.png" />
      </Head>
<div
  className={`ichat ${isExpand ? 'expanded' : ''} ${isDarkMode ? 'dark' : ''}`}
  style={{
    backgroundImage: `url(${isDarkMode ? "/images/logo/home2.png" : "/images/logo/home.png"})`
  }}
>
  <div className="ichat-header" onClick={() => setIsExpand(!isExpand)}>
    ichat
  </div>

  {isExpand && (
        <>
          {!showChatDialog && (
            <div className="start-image-container" onClick={() => setShowChatDialog(true)}></div>
          )}
          
          {showChatDialog && (
  <div className="chat-dialog-wrapper">
    {/* 使用 div 预加载所有表情图片 */}
    <div style={{ display: 'none' }}>
      {['me', 'oooo', 'enjoy', 'happy', 'stare'].map(emotion => (
        <img 
          key={emotion} 
          src={`/images/itha/${emotion}.png`} 
          alt="" 
          onLoad={() => console.log(`${emotion} loaded`)}
        />
      ))}
    </div>
    
    <div 
      className="me-image-container" 
      style={{ 
        backgroundImage: `url(${getEmotionImage(currentEmotion)})`,
        backgroundRepeat: 'no-repeat',
      }}
      onClick={() => setShowChatDialog(false)}
    ></div>
    <ChatDialog onEmotionChange={setCurrentEmotion} />
  </div>
)}
        </>
      )}

</div>
        {/* 导航栏 */}
        <div className="nav">
  <div className="logo-container" onClick={() => changeLogoStyle(logoStyle === 0 ? 1 : 0)}>
  {mounted ? (
    <>
      {logoStyle === 0 && (
        <Image 
          priority
          src={isDarkMode ? "/images/logo/title-dark.png" : "/images/logo/title-light.png"}
          alt="logo"
          width={360}
          height={80}
          className="logo-style-1"
        />
      )}
      {logoStyle === 1 && (
        <Image 
          priority
          src={isDarkMode ? "/images/logo/title-dark-alt1.png" : "/images/logo/title-light-alt1.png"}
          alt="logo"
          width={360}
          height={80}
          className="logo-style-2"
        />
      )}
    </>
  ) : (
    <div style={{ width: 360, height: 80 }} />
  )}
</div>
  
  {/* 导航栏右侧功能区域 */}
  <div className="nav-right">
    <ThemeSwitcher />
    <SearchBar />
  </div>
</div>

        {/* 主内容区域 */}
        <main className="main-content">
          <div className="other"> 
            <Link href="/about" target="_blank" rel="noopener noreferrer">关于Artisthalic</Link>
            <Link href="/ithalicandfriends" target="_blank" rel="noopener noreferrer">ithalic和她的朋友们</Link>
            <Link href="/sheets" target="_blank" rel="noopener noreferrer">表格大全</Link>
            <Link href="/tags" target="_blank" rel="noopener noreferrer">标签解释</Link>
            <Link href="/disclaimer" target="_blank" rel="noopener noreferrer">免责声明</Link>
            <Link href="/contact" target="_blank" rel="noopener noreferrer">联系我们</Link>
          </div>
          <div className="areas"> 
          <h2 style={{margin:'0 0 20px 0'}}>最近更新‼️</h2>
          <div className="update-grid"> 
          <Link href={`/sheets/abteam`}>
          <div className="Links">🔹Alan团队正片制作人员名单(表格大全)</div>
          </Link>
          <Link href={`/sheets/abteamAS`}>
          <div className="Links">🔹Alan团队短片制作人员名单(表格大全)</div>
          </Link>
          </div>
          </div>
          <div className="areas"> 
          <h2 style={{margin:'0 0 20px 0'}}>艺术家列表(持续更新){/* 显示更多/更少按钮 - 仅在未筛选标签时显示 */}
          {selectedTags.length === 0 && (
              <button 
                className="show-more-button" 
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? '显示较少' : '显示更多'}
              </button>
          )}</h2>
          {/* 标签筛选区域 */}
          <div className="tags-filter">
            {allTags.map(tag => (
              <button
                key={tag}
                className={`tag-button ${selectedTags.includes(tag) ? 'active' : ''}`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* 文章网格布局 */}
          <div 
            className="articles-grid" 
            style={{ 
              // 缩放后调整位置居中
              margin: selectedTags.length === 0 && !showAll ? '0 auto' : '0',
              // 添加平滑过渡效果
              transition: 'transform 0.3s ease, margin 0.3s ease'
            }}
          >
            {displayedArticles.map(article => (
              <Link key={article.slug} href={`/artists/${article.slug}`} className="article-card">
                <div className="article-content">
                  {/* 文章文本内容 */}
                  <div className="article-text">
          <h2 className="article-title">{article.title}</h2>
          <div className="article-date">
            {new Date(article.date).toLocaleDateString()}
          </div>
          <p className="article-excerpt">{article.excerpt}</p>
          <div className="article-tags">
            {article.tags.map(tag => (
              <span 
                key={tag} 
                className="tag"
                onClick={(e) => {
                  e.preventDefault(); // 阻止链接跳转
                  toggleTag(tag);    // 点击标签时切换选中状态
                }}
              >
                {tag}
              </span>
            ))}
          </div>
                  </div>
                  {/* 文章封面图片 */}
                  <div className="article-image">
          <Image
                  src={article.coverImage || getDefaultCoverImage()}
                  alt={article.title}
                  width={100}
                  height={100}
                  className="cover-image"
                />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          </div>
          <div className="areas"> 
          <h2 style={{margin:'0 0 20px 0'}}>各类专栏</h2>
          <div className="column-grid"> 
          <Link href={`/column/FA/${latestFASlug || 'default'}`} target="_blank" className="column-cards">
                <div className="column-content">
                  🔹FA考古堆叠
                </div>
          </Link>
          <Link href={`/column/HD/${latestHDSlug || 'default'}`} target="_blank" className="column-cards">
                <div className="column-content">
                  🔹dojo古今杂谈
                </div>
          </Link>
          <Link href={`/column/BH/${latestBHSlug || 'default'}`} target="_blank" className="column-cards">
                <div className="column-content">
                  🔹闪客画师奇传
                </div>
          </Link>
          <Link href={`/column/AB/${latestABSlug || 'default'}`} target="_blank" className="column-cards">
                <div className="column-content">
                  🔹Alan团队互动
                </div>
          </Link>
          </div>
          </div>
        </main>
      
    </>
  )
}