import Link from 'next/link'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import { useDarkMode } from '../../context/ThemeColorContext'

export default function sheets() {
  const router = useRouter();
  const { isDarkMode } = useDarkMode(); 
  return (
    <>
      <Head>
        <title>名单对照(未完成)</title>
        <link rel="icon" type="image/png" href="/images/icon/C.png" />
        
      </Head>
      <div className="nav">
        <h1 style={{ color: 'var(--theme-color)' }}>
          名单对照
          <button 
            onClick={() => router.push('/')}
            className="home-button"
            style={{ color: 'var(--text-color)' }}
          >
            返回首页
          </button>
          <button 
            onClick={() => router.push('/sheets')}
            className="home-button"
            style={{ color: 'var(--text-color)' }}
          >
            返回名单
          </button>
        </h1>
      </div>
      <div className="main-content">
        <h3>职位类型</h3>
        <h3>艺术家昵称</h3>

      </div>
    </>
  )
}