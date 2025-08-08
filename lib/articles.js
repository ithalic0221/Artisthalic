// lib/articles.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * 获取所有文章数据
 * @returns {Promise<Array>} 包含所有文章数据的数组
 */
export async function getArticles() {
  const articlesDirectory = path.join(process.cwd(), 'pages/artists');
  const filenames = fs.readdirSync(articlesDirectory);
  
  // 处理所有文章文件
  return filenames
    .filter(filename => filename.endsWith('.md') || filename.endsWith('.mdx'))
    .map(filename => {
      const filePath = path.join(articlesDirectory, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      
      // 返回文章数据对象
      return {
        slug: filename.replace(/\.mdx?$/, ''),
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || '',
        tags: data.tags || [],
        coverImage: data.coverImage || null
      };
    });
}