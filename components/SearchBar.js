// components/SearchBar.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 * 搜索栏组件
 * @param {Object} props - 组件props
 * @param {string} [props.initialValue=''] - 初始搜索值
 * @returns {JSX.Element} 搜索栏组件的JSX元素
 */
export default function SearchBar({ initialValue = '' }) {
  const [query, setQuery] = useState(initialValue); // 搜索查询状态
  const router = useRouter(); // 使用Next.js路由

  // 当initialValue变化时更新查询状态
  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // 有查询内容时跳转到搜索页
      router.push(`/search?q=${encodeURIComponent(query)}`);
    } else {
      // 无查询内容时跳转到搜索页(不带参数)
      router.push('/search');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="🔍 搜索艺术家、标签..."
        className="search-input"
        style={{ 
            width: '250px', 
            borderColor: 'var(--theme-color)', // 使用主题颜色
            borderRadius: '10px',
            height: '40px',
            backgroundColor: '#00000000',
            marginRight: '10px',
            fontSize: '15px',
            color: '#505050'
          }}
      />
      <button
        type="submit"
        className="search-button"
        style={{ 
            backgroundColor: 'var(--theme-color)', // 使用主题颜色
            color: 'white',
            fontSize: '12px',
            borderRadius: '10px',
            height: '43px'
          }}
      >
        搜索
      </button>
    </form>
  );
}