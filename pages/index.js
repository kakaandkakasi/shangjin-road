import Head from 'next/head'
import { useState } from 'react'
export default function Home({ jobs, stats }) {
  const [search, setSearch] = useState('')
  const [activeCity, setActiveCity] = useState('全部')
  const [activeDirection, setActiveDirection] = useState('全部')

  // 所有方向（从数据中提取，去重排序）
  const directions = ['全部', 'AI算法-大模型', 'AIGC内容创作', 'AI产品经理', 'AI运营', '智能驾驶', 'AI芯片-硬件', 'AI视频生成', 'AI机器人', 'AI医疗']
  
  // 城市列表
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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="header">
        <div className="container header-content">
          <div className="logo">
            <div className="logo-icon">赏</div>
            赏金之路
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
          <h1>找到你的下一个机会</h1>
          <p>AI驱动的求职情报，帮你发现AI时代的最佳岗位</p>
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
      </section>

      {/* City Filters */}
      <section className="container">
        <div className="filters-label">城市</div>
        <div className="filters">
          {cities.map(city => (
            <button
              key={city}
              className={`filter-tag ${activeCity === city ? 'active' : ''}`}
              onClick={() => setActiveCity(city)}
            >
              {city}
              {city !== '全部' && <span className="filter-count">{stats.cities[city] || 0}</span>}
            </button>
          ))}
        </div>
      </section>

      {/* Direction Filters */}
      <section className="container">
        <div className="filters-label">方向</div>
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
      </section>

      {/* Jobs Grid */}
      <section className="jobs-section">
        <div className="container">
          <div className="section-header">
            <span className="section-title">
              {filteredJobs.length} 个职位
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
                  <span className="job-meta-item">
                    📍 {job.city}
                  </span>
                  {job.salary && job.salary !== '面议' && (
                    <span className="job-meta-item">
                      💰 {job.salary}
                    </span>
                  )}
                </div>
                <div className="job-tags">
                  <span className="job-tag">{job.direction}</span>
                  <span className="job-tag city">{job.city}</span>
                </div>
                {job.source && (
                  <a href={job.source} target="_blank" rel="noopener noreferrer" className="job-link">
                    查看详情 →
                  </a>
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
            赏金之路 · AI求职情报 · 由 kakasi & 卡卡 构建
          </p>
        </div>
      </footer>
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
