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
        <title>免责声明</title>
        <link rel="icon" type="image/png" href="/images/icon/A.png" />
      </Head>
      <div className="nav">
        <h1 style={{ color: 'var(--theme-color)' }}>
          免责声明
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
      <h3>⚠️敏感信息</h3> 
本网站仅提供文化分享、娱乐资讯等，所有内容均不涉及任何政治议题、敏感信息或违反所在地区法律法规的讨论。用户不得利用本平台传播或发表任何与政治、宗教、种族等相关的争议性内容。 <br/>

<h3>⚠️内容来源</h3> 
本网站所收录的艺术家相关信息（包括但不限于作品、国籍、性别、年龄等）均来源于互联网公开渠道，包括但不限于： <br/>
🔹 艺术家本人公开发布的帖子、访谈或社交媒体内容 <br/>
🔹 艺术界同行、评论家或相关机构提及的公开信息 <br/>
🔹 已获授权的第三方资料库或新闻报道 <br/>

我们仅对信息进行整理归类，不保证其绝对准确性、时效性或完整性。 <br/>

<h3>⚠️隐私保护</h3> 
🔹 我们严格遵循最小必要原则，不主动收集艺术家的非公开敏感信息（如住址、联系方式等）。 <br/>
🔹 若涉及争议性内容（如未经证实的轶事），将标注来源并开放反馈渠道。 <br/>
🔹 如艺术家本人提出合理删除请求（需验证身份），我们将在15个工作日内处理。 <br/>

<h3>⚠️用户责任与版权提示</h3> 
🔹 本站内容仅供艺术研究与文化交流，禁止用于商业牟利或恶意人肉搜索。 <br/>
🔹 引用本站内容时，须注明原始出处及本声明链接。 <br/>
🔹 艺术家作品的版权归属原作者，本站展示不意味着获得商业使用授权。 <br/>

<h3>⚠️免责条款</h3> 
本网站不承担以下责任： <br/>
🔹 因信息过时、来源偏差导致的认知误差 <br/>
🔹 第三方未经许可转载、篡改本站内容引发的纠纷 <br/>
🔹 用户滥用信息导致的法律后果 <br/>

<h3>⚠️反馈更正</h3> 
若您发现信息错误、侵权或希望补充内容，请联系：rothlittlechild468@gmail.com <br/>
（附：需提供证明材料及具体修改建议） <br/>

（最后更新日期：2025年07月12日）
      </div>
    </>
  )
}