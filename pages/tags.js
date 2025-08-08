import Link from 'next/link'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import { useDarkMode } from '../context/ThemeColorContext';

export default function sheets() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>标签解释</title>
        <link rel="icon" type="image/png" href="/images/icon/A.png" />
      </Head>
      <div className="nav">
        <h1 style={{ color: 'var(--theme-color)' }}>
          标签解释
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
          <p><span style={{color: 'var(--theme-color)'}}>Alan Becker Team:</span>Alan的团队(在团队中制作超过5期正片或短片)</p>
          <p><span style={{color: 'var(--theme-color)'}}>AvG:</span>Animator vs. Games crew成员或三期以上嘉宾</p>
          <p><span style={{color: 'var(--theme-color)'}}>FluidAnims:</span>在此网站拥有账号/页面/文件</p>
          <p><span style={{color: 'var(--theme-color)'}}>Hyun's Dojo:</span>在此网站拥有账号/页面/文件</p>
          <p><span style={{color: 'var(--theme-color)'}}>ShiftLimits:</span>在此网站拥有账号/页面/文件</p>
          <p><span style={{color: 'var(--theme-color)'}}>StickPage:</span>在此网站拥有账号/页面/文件</p>
          <p><span style={{color: 'var(--theme-color)'}}>备注:FluidAnims,Hyun's Dojo,ShiftLimits,StickPage的所属较难界定,艺术家发布作品多的网站容易标到该艺术家,具体以艺术家描述为准</span></p>
      </div>
      
    </>
  )
}