// pages/_error.js
import Head from 'next/head'

function Error({ statusCode }) {
  return (
  <>
  <Head>
        <title>出错了</title>
        <link rel="icon" type="image/png" href="/images/icon/A.png" />
      </Head>
    <div style={{ textAlign: 'center', padding: '50px 50px 0 50px' }}>
      {statusCode === 404 ? (
        <>
          <h1>404 - 页面未找到</h1>
          <p>抱歉，您访问的页面不存在</p>
          <img src="/images/logo/404.png" width="400px" alt="404" />
        </>
      ) : (
        <>
          <h1>{statusCode} - 服务器错误</h1>
          <p>抱歉，服务器发生了错误</p>
        </>
      )}
      <a href="/">返回首页</a>
    </div>
  </>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
  
}

export default Error