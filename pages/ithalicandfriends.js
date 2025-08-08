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
        <title>ithalic和她的朋友们</title>
        <link rel="icon" type="image/png" href="/images/icon/D.png" />
      </Head>
      <div className="nav">
        <h1 style={{ color: 'var(--theme-color)' }}>
          ithalic和她的朋友们
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
        <i style={{color:'#ff2167'}}>感谢以下人员的付出与陪伴!没有他们就没有Artisthalic</i>
        <div className="frienddd">


        <div className="friends">
        <div className="fr">
        <p>岸坭码头香香</p>
        ithalic:
        </div>
        <div className="frr">哈喽我是ithalic!!啥都沾点的学生!!emoji爱好者!!用感叹号是因为要干的事太多我好急!!最喜欢的事是咀嚼信息和学习!!对不起我来晚了!!!!!!!
         <div className="frrr">*全部的网站建设,从编程到绘图加文字/大量文稿画作
         </div>
        </div>
        </div>

        <div className="friends">
        <div className="fr">
        <p>海忆饭饭香香</p>
        海忆睡不醒: 
        </div>
        <div className="frr">米娜桑好我是海忆，因为只会画火柴人所以缓慢磨动画师同人中（扭曲）（吱哇乱叫）（爬行）（张嘴讨饭）（飞宇宙）（回来了）（爬行）（吱哇乱叫）你们也快来看动画师吧！！来看动画师呀~~~（夹）（咳嗽）（死）
        <div className="frrr">*提供了许多动画师画作
        </div>
        </div>
        </div>

        <div className="friends">
        <div className="fr">
        <p>袄师搬运香香</p>
        虚构悦宇宙-vorien
        </div>
        <div className="frr">暂无简介
        <div className="frrr">*提供了很多关键近期消息
        </div>
        </div>
        </div>

        <div className="friends">
        <div className="fr">
        <p>背景烤肉香香</p>
        backgroud
        </div>
        <div className="frr">暂无简介
        <div className="frrr">*将大量dojo视频作品翻译成中文
        </div>
        </div>
        </div>

        <div className="friends">
        <div className="fr">
        <p>苏师带饭香香</p>
        黯夜苏yesu
        </div>
        <div className="frr">暂无简介
        <div className="frrr">*提供了很多关键iris氏族动画师消息
        </div>
        </div>
        </div>

        <div className="friends">
        <div className="fr">
        <p>鲸师烤肉香香</p>
        鲸仔WhaleStella
        </div>
        <div className="frr">暂无简介(ithalic的入坑引路人)
        <div className="frrr">*将大量dojo视频作品翻译成中文
        </div>
        </div>
        </div>

        <div className="friends">
        <div className="fr">
        <p>阎王口嗨香香</p>
        五仁月饼/阎王
        </div>
        <div className="frr">暂无简介
        <div className="frrr">*提供大量动画师故事构想
        </div>
        </div>
        </div>

        <div className="friends">
        <div className="fr">
        <p>咕鸽饭饭香香</p>
        灵感贩卖机
        </div>
        <div className="frr">暂无简介
        <div className="frrr">*提供了一些动画师画作
        </div>
        </div>
        </div>

        <div className="friends">
        <div className="fr">
        <p>v师考古香香</p>
        vops
        </div>
        <div className="frr">暂无简介
        <div className="frrr">*提供了很多关键早期消息
        </div>
        </div>
        </div>

        <div className="friends">
        <div className="fr">
        <p>雪辞搬运香香</p>
        雪辞
        </div>
        <div className="frr">暂无简介
        <div className="frrr">*将大量AvG作品搬运到b站
        </div>
        </div>
        </div>

        <div className="friends">
        <div className="fr">
        <p>D师饭饭香香</p>
        D
        </div>
        <div className="frr">暂无简介
        <div className="frrr">*提供了一些动画师画作
        </div>
        </div>
        </div>    

        <div className="friends">
        <div className="fr">
        <p>符鸽搬运香香</p>
        符号Symbol/鸽子
        </div>
        <div className="frr">对的 我就是各种地方到处窜的透明，随便画点动画师oc，其次就是 古顾咕
        <div className="frrr">*提供了很多关键近期消息
        </div>
        </div>
        </div>

        <div className="friends">
        <div className="fr">
        <p>f师饭饭香香</p>
        fia
        </div>
        <div className="frr">暂无简介
        <div className="frrr">*提供了一些动画师画作
        </div>
        </div>
        </div>
      </div>
      <div className="friends">其他群友们❤️
      (还没有人报名登台o_o)
      </div>
      </div>
    </>
  )
}