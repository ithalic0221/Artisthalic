// components/SearchResults.js
import Link from 'next/link';

/**
 * 搜索结果展示组件
 * @param {Object} props - 组件props
 * @param {Array} props.results - 搜索结果数组
 * @returns {JSX.Element} 搜索结果组件的JSX元素
 */
export default function SearchResults({ results }) {
  // 如果没有结果，显示提示信息
  if (results.length === 0) {
    return <p className="mt-4 text-gray-500">未找到匹配结果</p>;
  }

  return (
    <div className="mt-4 space-y-4">
      {/* 遍历显示所有搜索结果 */}
      {results.map((article) => (
        <Link 
          key={article.slug} 
          href={`/artists/${article.slug}`}
          className="block p-4 border rounded hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-medium">{article.title}</h3>
          <p className="text-gray-600 mt-1">{article.excerpt}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {/* 显示文章标签 */}
            {article.tags.map(tag => (
              <span 
                key={tag} 
                className="px-2 py-1 text-xs rounded bg-gray-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
}