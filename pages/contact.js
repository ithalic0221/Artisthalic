import Link from 'next/link'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image'
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
        <title>联系我们</title>
        <link rel="icon" type="image/png" href="/images/icon/A.png" />
      </Head>
      <div className="nav">
        <h1 style={{ color: 'var(--theme-color)' }}>
          联系我们
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
      <h3 style={{display:'flex',margin:'50px 0 0 0'}}><Image 
              priority
              src={"/images/link/discord.png"}
              alt="logo"
              width={30}
              height={30}
            />discord</h3>
      ithalic用户id:1192113795011711086
      <h3 style={{display:'flex',margin:'50px 0 0 0'}}><Image 
              priority
              src={"/images/link/Email.png"}
              alt="logo"
              width={30}
              height={30}
            />电子邮件</h3>
      rothlittlechild468@gmail.com
      <h3 style={{display:'flex',margin:'50px 0 0 0'}}><Image 
              priority
              src={"/images/link/QQ.png"}
              alt="logo"
              width={30}
              height={30}
            />qq</h3>
      1055074597
      <h3 style={{display:'flex',margin:'50px 0 0 0'}}><Image 
              priority
              src={"/images/link/wechat.png"}
              alt="logo"
              width={30}
              height={30}
            />微信</h3>
      ithalicff2167
      </div>
    </>
  )
}