import Link from 'next/link'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import { useTheme } from '../../context/ThemeColorContext';

export default function sheets() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>FA/Dojo联合(部分)动画师整理表格</title>
        <link rel="icon" type="image/png" href="/images/icon/C.png" />
      </Head>
      <div className="nav">
        <h1 style={{ color: 'var(--theme-color)' }}>
          FA/Dojo联合(部分)动画师整理表格
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
      </div>
    </>
  )
}