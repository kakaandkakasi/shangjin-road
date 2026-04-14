#!/usr/bin/env python3
"""
赏金之路 - 数据导出脚本
将Obsidian情报库导出为JSON，供Next.js使用
"""
import os
import json
import re
from pathlib import Path
from datetime import datetime

# 路径配置
OBSIDIAN_PATH = "/Users/a0000/Desktop/赏金之路/1-赏金之路计划书/赏金之路-情报库"
OUTPUT_PATH = "/Users/a0000/Developer/shangjin-road/public/data/jobs.json"
STATS_OUTPUT = "/Users/a0000/Developer/shangjin-road/public/data/stats.json"

def parse_job_file(file_path):
    """解析单个情报文件"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 提取frontmatter
        frontmatter_match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
        if not frontmatter_match:
            return None
        
        frontmatter_text = frontmatter_match.group(1)
        
        # 解析YAML frontmatter
        frontmatter = {}
        current_key = None
        current_value = []
        
        for line in frontmatter_text.split('\n'):
            line_stripped = line.strip()
            if not line_stripped or line_stripped == '---':
                continue
            
            # 检查是否是列表项
            if line_stripped.startswith('- '):
                if current_key and isinstance(frontmatter.get(current_key), list):
                    frontmatter[current_key].append(line_stripped[2:].strip())
                elif current_key:
                    frontmatter[current_key] = [line_stripped[2:].strip()]
                continue
            
            # 检查是否是键值对
            if ':' in line_stripped and not line_stripped.startswith('#'):
                # 保存前一个键值对
                if current_key:
                    value_str = '\n'.join(current_value).strip()
                    if value_str:
                        if value_str.startswith('"') and value_str.endswith('"'):
                            value_str = value_str[1:-1]
                        frontmatter[current_key] = value_str
                
                # 解析新的键
                parts = line_stripped.split(':', 1)
                current_key = parts[0].strip()
                current_value = [parts[1].strip()] if len(parts) > 1 and parts[1].strip() else []
        
        # 保存最后一个键值对
        if current_key:
            value_str = '\n'.join(current_value).strip()
            if value_str:
                if value_str.startswith('"') and value_str.endswith('"'):
                    value_str = value_str[1:-1]
                frontmatter[current_key] = value_str
        
        # 提取标题
        title_match = re.search(r'^# (.+)$', content, re.MULTILINE)
        title = title_match.group(1) if title_match else frontmatter.get('标题', '未知')
        title = title.strip().replace('"', '')
        
        # 提取链接
        link_match = re.search(r'\[查看原始招聘信息\]\((.*?)\)', content)
        source = link_match.group(1) if link_match else None
        
        # 提取城市和方向
        city = extract_city(file_path)
        direction = frontmatter.get('方向', '')
        if isinstance(direction, list) and direction:
            direction = direction[0]
        if not direction:
            tags = frontmatter.get('tags', [])
            if isinstance(tags, list) and tags:
                direction = tags[0]
            else:
                direction = ''
        
        return {
            'title': title,
            'company': frontmatter.get('来源', '').replace('https://', '').split('/')[0] if frontmatter.get('来源') else '未知',
            'city': city,
            'direction': direction,
            'salary': frontmatter.get('薪资', '面议'),
            'source': source,
            'collected': frontmatter.get('收录', datetime.now().strftime('%Y-%m-%d')),
        }
    except Exception as e:
        print(f"Error parsing {file_path}: {e}")
        return None

def extract_city(file_path):
    """从文件路径提取城市"""
    parts = Path(file_path).parts
    # 找到赏金之路-情报库的位置
    base_idx = -1
    for i, part in enumerate(parts):
        if '赏金之路-情报库' in part:
            base_idx = i
            break
    
    if base_idx == -1:
        return '未知'
    
    # 找到下一个不是AI生态链的目录
    for i in range(base_idx + 1, len(parts)):
        part = parts[i]
        if 'AI生态链' not in part and not part.endswith('.md'):
            return part
    
    return '未知'

def scan_jobs():
    """扫描所有情报文件"""
    jobs = []
    cities = {}
    
    for root, dirs, files in os.walk(OBSIDIAN_PATH):
        # 跳过总控文件
        if '总控' in root:
            continue
        
        for file in files:
            if file.endswith('.md') and '赏金之路-情报总控' not in file:
                file_path = os.path.join(root, file)
                job = parse_job_file(file_path)
                if job:
                    jobs.append(job)
                    
                    # 统计城市
                    city = job['city']
                    if city and city != '未知':
                        cities[city] = cities.get(city, 0) + 1
    
    return jobs, {'total': len(jobs), 'cities': cities}

def main():
    print("🎯 赏金之路数据导出开始...")
    
    # 确保输出目录存在
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    
    # 扫描情报
    jobs, stats = scan_jobs()
    
    # 写入JSON
    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(jobs, f, ensure_ascii=False, indent=2)
    
    with open(STATS_OUTPUT, 'w', encoding='utf-8') as f:
        json.dump(stats, f, ensure_ascii=False, indent=2)
    
    print(f"✅ 导出完成！")
    print(f"   - 总职位: {stats['total']}")
    print(f"   - 城市数: {len(stats['cities'])}")
    for city, count in sorted(stats['cities'].items(), key=lambda x: -x[1])[:10]:
        print(f"   - {city}: {count}")
    print(f"   - 输出: {OUTPUT_PATH}")

if __name__ == '__main__':
    main()
