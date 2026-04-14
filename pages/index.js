import Head from 'next/head'
import { useState } from 'react'
export default function Home({ jobs, stats }) {
  const [search, setSearch] = useState('')
  const [activeCity, setActiveCity] = useState('全部')

  const cities = ['全部', ...Object.keys(stats.cities).slice(0, 6)]
  
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = !search || 
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.direction.toLowerCase().includes(search.toLowerCase())
    
    const matchesCity = activeCity === '全部' || job.city === activeCity
    
    return matchesSearch && matchesCity
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

      {/* Filters */}
      <section className="container">
        <div className="filters">
          {cities.map(city => (
            <button
              key={city}
              className={`filter-tag ${activeCity === city ? 'active' : ''}`}
              onClick={() => setActiveCity(city)}
            >
              {city}
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
            {filteredJobs.slice(0, 30).map((job, i) => (
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
  // Sample data for demo - will be replaced with actual export
  const sampleJobs = [
    { title: 'AIGC算法工程师', company: '杭州星纪元科技', city: '杭州', direction: 'AI算法-大模型', salary: '30-50K', source: 'https://zhipin.com' },
    { title: 'Prompt工程师', company: '华晟互娱', city: '杭州', direction: 'AI算法-大模型', salary: '15-25K', source: 'https://zhipin.com' },
    { title: 'AI产品经理', company: '字节跳动', city: '北京', direction: 'AI产品经理', salary: '35-60K', source: 'https://zhipin.com' },
    { title: '大模型算法工程师', company: '百川智能', city: '北京', direction: 'AI算法-大模型', salary: '40-80K', source: 'https://zhipin.com' },
    { title: 'AI运营专员', company: '网易游戏', city: '杭州', direction: 'AI运营', salary: '12-20K', source: 'https://zhipin.com' },
    { title: '智能驾驶算法工程师', company: '小马智行', city: '广州', direction: '智能驾驶', salary: '35-70K', source: 'https://zhipin.com' },
    { title: 'AI视频生成工程师', company: '生数科技', city: '北京', direction: 'AI视频生成', salary: '30-55K', source: 'https://zhipin.com' },
    { title: 'AI医疗产品经理', company: '医联科技', city: '成都', direction: 'AI医疗', salary: '20-35K', source: 'https://zhipin.com' },
  ]

  const stats = {
    total: 8681,
    cities: {
      '杭州': 326,
      '北京': 506,
      '上海': 297,
      '深圳': 396,
      '广州': 514,
      '成都': 522,
    }
  }

  return {
    props: {
      jobs: sampleJobs,
      stats,
    },
  }
}
