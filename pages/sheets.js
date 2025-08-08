import Link from 'next/link'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import { useTheme } from '../context/ThemeColorContext';

export default function sheets() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>表格大全</title>
        <link rel="icon" type="image/png" href="/images/icon/A.png" />
      </Head>
      <div className="nav">
        <h1 style={{ color: 'var(--theme-color)' }}>
          表格大全
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
      <div className="ab-a">
      <Link href="/sheets/abteam" target="_blank" rel="noopener noreferrer">Alan团队正片
      </Link>
      <div className="ab-b">
      <Link href="/sheets/abteamAS" target="_blank" rel="noopener noreferrer">Alan团队短片
      </Link>
      </div>
      </div>
      
      </div>
    </>
  )
}