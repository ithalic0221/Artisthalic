import Link from 'next/link'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import { useDarkMode } from '../context/ThemeColorContext';

export default function sheets() {
  const router = useRouter();
 const { isDarkMode } = useDarkMode(); 
  return (
    <>
      <Head>
        <title>关于Artisthalic</title>
        <link rel="icon" type="image/png" href="/images/icon/A.png" />
      </Head>
      <div className="nav">
        <h1 style={{ color: 'var(--theme-color)' }}>
          关于Artisthalic
          <button 
            onClick={() => router.push('/')}
            className="home-button"
            style={{ color: 'var(--text-color)' }}
          >
            返回首页
          </button>
        </h1>
      </div>
      <div className="main-content">
        <i style={{color:'#ff2167'}}>我想记录讲故事的人的故事--ithalic</i>
        <h1><span style={{color: 'var(--theme-color)'}}>Artisthalic</span>是一个提供艺术家基本信息及作品信息的百科网站</h1>
        <h4>站长:ithalic</h4>
        <p>
          网站展开了一张以火柴人动画师圈子为中心的艺术家关系网，这里的艺术家们包括动画师、插画师、音乐制作人、游戏设计与制作者等，适用于想要快速了解艺术家们的人
        </p>
        <h3>网站性质</h3>
        无盈利网站,出于对各位艺术家的热爱而建
        <h3>网站起源</h3>
        <p><span style={{color: 'var(--theme-color)'}}>2024年9月9日  </span>ithalic急需一种快速介绍各种动画师的方式，究其原因是动画师之间的互动十分散乱，无法系统地向感兴趣的人介绍，于是产生制作网站的想法<br/>
        <span style={{color: 'var(--theme-color)'}}>2024年9月10日  </span>开始从0学习制作网站<br/>
        <span style={{color: 'var(--theme-color)'}}>2024年11月2日  </span>确定网站名称<br/>
        期间有四版网站雏形被废弃<br/>
        <span style={{color: 'var(--theme-color)'}}>2025年6月14日  </span>开始最新版制作<br/>
        网站名和站长名的发音:/'ɑrtɪsθalɪk/ & /ɪ'θa:lɪk/<br/>
        站长名来源:italic(斜体字)的变形ithalic，译为<span style={{color: '#ff2167'}}><i>斜倾</i></span><br/>
        网站名来源:Artist(艺术家)与ithalic(斜倾)的组合词，译为<i>倾斜<span style={{color: '#ff2167'}}>艺</span>术<span style={{color: '#40e0d0'}}>家</span></i></p>
        <h3>网站提供:</h3>
        <span style={{color: 'var(--theme-color)'}}>1.  </span>艺术家基本信息及代表作品<br/>
        <span style={{color: 'var(--theme-color)'}}>2.  </span>多人作品的制作人员表格<br/>
        <span style={{color: 'var(--theme-color)'}}>3.  </span>艺术家有趣互动<br/>
        <h3>网站求助:</h3>
        <span style={{color: 'var(--theme-color)'}}>1.  </span>足够专业的动画,音乐,游戏点评,作为"作品风格"模块的内容填写<br/>
        <span style={{color: 'var(--theme-color)'}}>2.  </span>更多的有关信息补充<br/>
        如有意愿请前往[联系我们]
        
      </div>
    </>
  )
}