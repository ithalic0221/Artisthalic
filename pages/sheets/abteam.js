import { useRouter } from 'next/router';
import { useEffect, useState, useRef, forwardRef } from 'react';
import Head from 'next/head';
import Image from 'next/image'
import { useDarkMode } from '../../context/ThemeColorContext';
import ABFFData, { allRoles } from '../../data/ABFFData';
import styles from '../../styles/Sheets.module.css';
import Link from 'next/link'


// (详见<Link href="/sheets/adjustment">名单对照</Link>和<Link href="/sheets/OriginalEdition">官方原版</Link>)
export default function Sheets() {
  const router = useRouter();
  const { isDarkMode } = useDarkMode();
  const worksListRef = useRef(null);
  const infoPanelRef = useRef(null);

  // 提取所有可能的筛选选项
  const allSeries = Array.from(new Set(ABFFData.map(work => work.series)));
  
  // 按职位分类的人员数据
  const allStaffByRole = {};
  allRoles.forEach(role => {
    allStaffByRole[role] = Array.from(
      new Set(ABFFData.flatMap(work => work.staff[role] || []))
    ).sort();
  });
  
  // 所有人员数据
  const allStaff = Array.from(
    new Set(ABFFData.flatMap(work => Object.values(work.staff).flat()))
  ).sort();

  // 筛选状态
  const [filters, setFilters] = useState({
    series: null,
    title: null,
    role: null,
    person: null,
    staffRole: null
  });
  const [showScrollTop, setShowScrollTop] = useState(false);
  // 筛选后的作品标题
  const [filteredTitles, setFilteredTitles] = useState([]);
  
  // 筛选后的作品列表
  const [filteredWorks, setFilteredWorks] = useState(ABFFData);
  
  // 当系列筛选变化时更新作品选项
  useEffect(() => {
    if (filters.series) {
      const seriesWorks = ABFFData.filter(work => work.series === filters.series);
      setFilteredTitles(Array.from(new Set(seriesWorks.map(work => work.title)))); 
      
      if (filters.title && !seriesWorks.some(work => work.title === filters.title)) {
        setFilters(prev => ({ ...prev, title: null }));
      }
    } else {
      setFilteredTitles(Array.from(new Set(ABFFData.map(work => work.title)))); 
    }
  }, [filters.series]);
  
  // 应用筛选条件
  useEffect(() => {
    let result = [...ABFFData];
    
    if (filters.series) {
      result = result.filter(work => work.series === filters.series);
    }
    
    if (filters.title && filters.title !== 'all') {
      result = result.filter(work => work.title === filters.title);
    }
    
    if (filters.role) {
      result = result.filter(work => Object.keys(work.staff).includes(filters.role));
    }
    
    if (filters.person) {
      result = result.filter(work => Object.values(work.staff).flat().includes(filters.person));
    }
    
    if (filters.staffRole) {
      const [role, person] = filters.staffRole.split('|');
      result = result.filter(work => work.staff[role]?.includes(person));
    }
    
    setFilteredWorks(result);
  }, [filters]);
  
  // 重置筛选条件
  const resetFilters = () => {
    setFilters({
      series: null,
      title: null,
      role: null,
      person: null,
      staffRole: null
    });
  };

  useEffect(() => {
  const handleScroll = () => {
    setShowScrollTop(window.scrollY > 300);
  };

  
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
  // 获取相关信息
  const getRelatedInfo = () => {
    const info = {
      series: new Set(),
      roles: new Set(),
      staff: new Set(),
      staffByRole: {}
    };
    
    allRoles.forEach(role => {
      info.staffByRole[role] = new Set();
    });
    
    filteredWorks.forEach(work => {
      info.series.add(work.series);
      
      Object.entries(work.staff).forEach(([role, people]) => {
        info.roles.add(role);
        people.forEach(person => {
          info.staff.add(person);
          info.staffByRole[role]?.add(person);
        });
      });
    });
    
    return {
      series: Array.from(info.series).sort(),
      roles: Array.from(info.roles).sort(),
      staff: Array.from(info.staff).sort(),
      staffByRole: Object.fromEntries(
        Object.entries(info.staffByRole).map(([role, people]) => 
          [role, Array.from(people).sort()]
        )
      )
    };
  };
  
  const relatedInfo = getRelatedInfo();
  
  // 跳转到作品列表
  const scrollToWorks = () => {
    worksListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // 跳转到相关信息
  const scrollToInfo = () => {
    infoPanelRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <>
      <Head>
        <title>AlanBecker制作人员表格</title>
        <link rel="icon" type="image/png" href="/images/icon/C.png" />
        <meta name="description" content="AlanBecker作品及制作人员信息查询系统" />
      </Head>
      
      <div className={styles.nav}>
{showScrollTop && (
  <button 
    className={styles.scrollTopButton}
    onClick={scrollToTop}
    title="回到顶部"
  >
    ↑
  </button>
)}
        <h1 style={{ color: 'var(--theme-color)' }}>
          AB正片制作人员表格
          
        </h1>
        <div className={styles.pageNav}><button 
            onClick={() => router.push('/')}
            className={styles.homeButton}
          >
            返回首页
          </button><button
                onClick={resetFilters}
                className={styles.resetButton}
              >
                重置筛选
              </button>
              
          <button 
            onClick={scrollToWorks}
            className={styles.navButton}
          >
            (跳转)作品列表
          </button>
          {filteredWorks.length > 0 && (
            <button 
              onClick={scrollToInfo}
              className={styles.navButton}
            >
              (跳转)相关信息
            </button>
          )}
        </div>
      </div>
      
      <div className={styles.mainContent}>
        <i style={{color:'#ff2167'}}>未提及默认每个作品里都有Alan!对各职位进行了调整合并!影响者中Green的账号视频放在了短片里</i>
        <i>作品时间使用utc-8!以各网站记载最早发布时间为准!参考链接:<Link href="https://animatorvsanimation.fandom.com/wiki/Animator_vs._Animation_Franchise "><Image src="/images/link/AvAWiki.png" width={20}height={20}/></Link></i>
        <i style={{color:'#40e0d0'}}>由于时差原因时间可能出错,欢迎指出错误和提供建议</i>
        <div className={styles.filterPanel}>
          <h2 style={{ color: 'var(--theme-color)' }}>筛选条件</h2>
          
          <div className={styles.filterContainer}>
            <div className={styles.filterGroup}>
              <label>系列</label>
              <select
                value={filters.series || ''}
                onChange={(e) => setFilters({...filters, series: e.target.value || null})}
                className={styles.select}
              >
                <option value="">全部系列</option>
                {allSeries.map(series => (
                  <option key={series} value={series}>{series}</option>
                ))}
              </select>
            </div>
            
            <div className={styles.filterGroup}>
              <label>作品</label>
              <select
                value={filters.title || ''}
                onChange={(e) => setFilters({...filters, title: e.target.value || null})}
                className={styles.select}
                disabled={!filters.series && filteredTitles.length === 0}
              >
                <option value="">请选择作品</option>
                {filters.series && <option value="all">选择全部</option>}
                {filteredTitles.map(title => (
                  <option key={title} value={title}>{title}</option>
                ))}
              </select>
            </div>
            
            <div className={styles.filterGroup}>
              <label>职位类型</label>
              <select
                value={filters.role || ''}
                onChange={(e) => setFilters({...filters, role: e.target.value || null})}
                className={styles.select}
              >
                <option value="">全部职位</option>
                {allRoles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            
            <div className={styles.filterGroup}>
              <label>具体人员</label>
              <select
                value={filters.person || ''}
                onChange={(e) => setFilters({...filters, person: e.target.value || null})}
                className={styles.select}
              >
                <option value="">全部人员</option>
                {allStaff.map(person => (
                  <option key={person} value={person}>{person}</option>
                ))}
              </select>
            </div>
            
            
          </div>
        </div>
        
        <div className={styles.resultsCount}>
          找到 {filteredWorks.length} 个作品
        </div>
        
        <div className={styles.worksList} ref={worksListRef}>
          {filteredWorks.length > 0 ? (
            filteredWorks.map((work, index) => (
              <WorkCard 
                key={index} 
                work={work} 
                isDarkMode={isDarkMode}
                filters={filters}
              />
            ))
          ) : (
            <div className={styles.noResults}>
              没有找到匹配的作品
            </div>
          )}
        </div>
        
        {filteredWorks.length > 0 && (
          <RelatedInfoPanel 
            relatedInfo={relatedInfo} 
            isDarkMode={isDarkMode}
            setFilters={setFilters}
            ref={infoPanelRef}
          />
        )}
      </div>
    </>
  );
}

// 作品卡片组件
function WorkCard({ work, isDarkMode, filters }) {
  const highlightColor = isDarkMode ? '#40e0d0' : '#ff2167';
  const isHighlighted = shouldHighlight(work, filters);
  
  return (
    <div 
      className={`${styles.workCard} ${isHighlighted ? styles.highlight : ''}`}
      style={{
        borderLeftColor: isHighlighted ? highlightColor : undefined
      }}
    >
      <h3 style={{ 
        color: isHighlighted ? highlightColor : 'inherit'
      }}>
        {work.title} <span className={styles.workDate}>({work.date})</span>
      </h3>
      <p><strong>系列:</strong> {work.series}</p>
      {work.description && <p className={styles.description}>{work.description}</p>}
      
      <div className={styles.staffContainer}>
        {Object.entries(work.staff).map(([role, people]) => (
          <div key={role} className={styles.staffGroup}>
            <h4 style={{
              color: isRoleHighlighted(role, filters) ? highlightColor : 'inherit'
            }}>
              {role}
            </h4>
            <ul className={styles.staffList}>
              {people.map((person, i) => (
                <li 
                  key={i}
                  style={{
                    color: isPersonHighlighted(person, role, filters) ? highlightColor : 'inherit'
                  }}
                >
                  {person}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// 相关信息面板组件
const RelatedInfoPanel = forwardRef(({ relatedInfo, isDarkMode, setFilters }, ref) => {
  const linkColor = isDarkMode ? '#90CAF9' : '#1565C0';
  
  return (
    <div className={styles.infoPanel} ref={ref}>
      <h3>筛选结果相关信息</h3>
      <div className={styles.infoContainer}>
        <InfoBox 
          title="相关系列" 
          items={relatedInfo.series} 
          onItemClick={(series) => setFilters(prev => ({ ...prev, series }))}
          linkColor={linkColor}
        />
        
        <InfoBox 
          title="相关职位" 
          items={relatedInfo.roles} 
          onItemClick={(role) => setFilters(prev => ({ ...prev, role }))}
          linkColor={linkColor}
        />
        
        <InfoBox 
          title="相关人员" 
          items={relatedInfo.staff} 
          onItemClick={(person) => setFilters(prev => ({ ...prev, person }))}
          linkColor={linkColor}
        />
        
        {relatedInfo.roles.map(role => (
          <InfoBox 
            key={role}
            title={`${role}`}
            items={relatedInfo.staffByRole[role] || []}
            onItemClick={(person) => setFilters(prev => ({
              ...prev,
              staffRole: `${role}|${person}`
            }))}
            linkColor={linkColor}
          />
        ))}
      </div>
    </div>
  );
});

// 信息盒子组件
function InfoBox({ title, items, onItemClick, linkColor }) {
  return (
    <div className={styles.infoBox}>
      <h4>{title} ({items.length})</h4>
      <ul className={styles.infoList}>
        {items.map((item, i) => (
          <li 
            key={i} 
            className={styles.infoItem}
            style={{ color: linkColor }}
            // onClick={() => onItemClick?.(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// 判断是否应该高亮作品
function shouldHighlight(work, filters) {
  if (!filters.staffRole && !filters.person && !filters.role) return false;
  
  if (filters.staffRole) {
    const [role, person] = filters.staffRole.split('|');
    return work.staff[role]?.includes(person);
  }
  
  if (filters.person) {
    return Object.values(work.staff).flat().includes(filters.person);
  }
  
  if (filters.role) {
    return Object.keys(work.staff).includes(filters.role);
  }
  
  return false;
}

// 判断是否应该高亮职位
function isRoleHighlighted(role, filters) {
  return filters.role === role || 
    (filters.staffRole && filters.staffRole.startsWith(`${role}|`));
}

// 判断是否应该高亮人员
function isPersonHighlighted(person, role, filters) {
  return (
    (filters.person === person) ||
    (filters.staffRole === `${role}|${person}`)
  );
}