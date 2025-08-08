// lib/search.js
/**
 * 搜索功能实现
 * @param {string} query - 搜索查询字符串
 * @param {Array} items - 要搜索的项目数组
 * @returns {Array} 匹配的搜索结果数组
 */
export function searchItems(query, items) {
  // 如果查询为空，返回所有项目
  if (!query || query.trim() === '') {
    return items;
  }

  const lowerQuery = query.toLowerCase(); // 转换为小写方便比较
  
  // 筛选匹配的项目
  return items.filter(item => {
    // 检查标题、摘要和标签是否匹配查询
    const titleMatch = item.title?.toLowerCase().includes(lowerQuery) || false;
    const excerptMatch = item.excerpt?.toLowerCase().includes(lowerQuery) || false;
    const tagsMatch = item.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) || false;
    
    // 任意一项匹配即返回true
    return titleMatch || excerptMatch || tagsMatch;
  });
}