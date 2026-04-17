import Head from 'next/head'
import { useState, useEffect } from 'react'

export default function Home({ jobs, stats }) {
  const [search, setSearch] = useState('')
  const [activeCity, setActiveCity] = useState('全部')
  const [activeDirection, setActiveDirection] = useState('全部')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2800)
    return () => clearTimeout(timer)
  }, [])

  const directions = ['全部', 'AI算法-大模型', 'AIGC内容创作', 'AI产品经理', 'AI运营', '智能驾驶', 'AI芯片-硬件', 'AI视频生成', 'AI机器人', 'AI医疗']
  const cities = ['全部', ...Object.keys(stats.cities)]
  
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = !search || 
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.direction.toLowerCase().includes(search.toLowerCase())
    const matchesCity = activeCity === '全部' || job.city === activeCity
    const matchesDirection = activeDirection === '全部' || job.direction === activeDirection
    return matchesSearch && matchesCity && matchesDirection
  })

  return (
    <>
      <Head>
        <title>赏金之路 - AI求职情报</title>
        <meta name="description" content="AI驱动的求职情报平台，发现最适合你的AI时代岗位" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>

      {/* Preloader - Cappen Style */}
      <div className={`preloader ${loading ? '' : 'preloader--hidden'}`}>
        <div className="preloader-content">
          <div className="preloader-line">
            <span className="word">NEW</span>
            <span className="word">TIMES</span>
          </div>
          <div className="preloader-line preloader-line--indent">
            <span className="word">AI</span>
            <span className="word">ROAD</span>
          </div>
        </div>
        <div className="preloader-progress">
          <div className="preloader-progress-bar"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`main-content ${loading ? '' : 'main-content--visible'}`}>
        {/* Header */}
        <header className="header">
          <div className="container header-content">
            <div className="logo">
              <div className="logo-icon">赏</div>
              <span>赏金之路</span>
            </div>
            <nav className="nav">
              <a href="#" className="nav-link">情报库</a>
              <a href="#" className="nav-link">关于</a>
            </nav>
            <div className="stats">
              <span className="stats-count">{stats.total}</span> 条情报
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <p className="hero-eyebrow">
                AI驱动 · 精准匹配 · 实时更新
              </p>
              <h1>
                找到你的下一个机会
              </h1>
              <p className="hero-subtitle">
                覆盖北京、上海、深圳、杭州、广州等10+核心城市，精选AI时代最优质的求职情报
              </p>
              <div className="search-box">
                <input 
                  type="text" 
                  className="search-input"
                  placeholder="搜索岗位、公司、技能方向..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* City Filters */}
        <section className="filters-section">
          <div className="container">
            <div className="filters-header">
              <span className="filters-label">城市</span>
            </div>
            <div className="filters">
              {cities.map(city => (
                <button
                  key={city}
                  className={`filter-tag ${activeCity === city ? 'active' : ''}`}
                  onClick={() => setActiveCity(city)}
                >
                  {city}
                  {city !== '全部' && <span className="filter-count"> {stats.cities[city]}</span>}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Direction Filters */}
        <section className="filters-section">
          <div className="container">
            <div className="filters-header">
              <span className="filters-label">方向</span>
            </div>
            <div className="filters">
              {directions.map(dir => (
                <button
                  key={dir}
                  className={`filter-tag ${activeDirection === dir ? 'active' : ''}`}
                  onClick={() => setActiveDirection(dir)}
                >
                  {dir}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Jobs Grid */}
        <section className="jobs-section">
          <div className="container">
            <div className="section-header">
              <span className="section-title">
                {filteredJobs.length} 个职位
              </span>
              <span className="section-count">
                找到 {filteredJobs.length > 50 ? '50+' : filteredJobs.length} 条相关职位
              </span>
            </div>
            
            <div className="jobs-grid">
              {filteredJobs.slice(0, 50).map((job, i) => (
                <div key={i} className="job-card">
                  <div className="job-header">
                    <h3 className="job-title">{job.title}</h3>
                  </div>
                  <p className="job-company">{job.company}</p>
                  <div className="job-meta">
                    <span className="job-meta-item">📍 {job.city}</span>
                    {job.salary && job.salary !== '面议' && (
                      <span className="job-meta-item">💰 {job.salary}</span>
                    )}
                  </div>
                  <div className="job-tags">
                    <span className="job-tag">{job.direction}</span>
                    <span className="job-tag city">{job.city}</span>
                  </div>
                  {job.source ? (
                    <a 
                      href={job.source.startsWith('http') ? job.source : `https://${job.source}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="job-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      查看详情 →
                    </a>
                  ) : (
                    <span className="job-link" style={{ opacity: 0.5, cursor: 'default' }}>
                      来源收集中
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <p className="footer-text">
              赏金之路 · <span>AI求职情报</span> · 由 kakasi & 卡卡 构建
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const fs = require('fs')
  const path = require('path')
  
  const jobs = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public/data/jobs.json'), 'utf8'))
  const stats = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public/data/stats.json'), 'utf8'))

  return {
    props: {
      jobs,
      stats,
    },
  }
}
