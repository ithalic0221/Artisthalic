// pages/api/search.js
import { getArticles } from '../../lib/articles';
import { searchItems } from '../../lib/search';

/**
 * 搜索API路由处理函数
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
export default async function handler(req, res) {
  const { q } = req.query; // 获取查询参数q
  
  try {
    const articles = await getArticles(); // 获取所有文章
    const results = searchItems(q, articles); // 执行搜索
    res.status(200).json({ results }); // 返回搜索结果
  } catch (error) {
    res.status(500).json({ error: '搜索失败' }); // 错误处理
  }
}