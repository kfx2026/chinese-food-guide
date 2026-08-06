#!/usr/bin/env python3
"""Build food.eastculture.top as single-file HTML following cnhospitalmap.help pattern"""
import json, os

BASE = os.path.dirname(os.path.abspath(__file__))
PROVINCES_DIR = os.path.join(BASE, 'data', 'provinces')

# Load all province data
all_data = []
for fname in sorted(os.listdir(PROVINCES_DIR)):
    if not fname.endswith('.json'):
        continue
    with open(os.path.join(PROVINCES_DIR, fname), 'r', encoding='utf-8') as f:
        data = json.load(f)
    all_data.append(data)

# Collect all dishes
provinces = []
for prov in all_data:
    dishes = []
    for entry in prov.get('en', []):
        for d in entry.get('dishes', []):
            dishes.append(d)
    if dishes:
        provinces.append({
            'id': prov['id'],
            'name_zh': prov['name_zh'],
            'name_en': prov['name_en'],
            'dishes': dishes
        })

total_dishes = sum(len(p['dishes']) for p in provinces)

def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')

# Generate HTML
html = '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Great Chinese Food Charm — 48 Traditional Dishes Across 5 Culinary Regions</title>
<meta name="description" content="Explore ''' + str(total_dishes) + ''' authentic Chinese dishes from Sichuan, Chongqing, Shanghai, Jiangsu, and Hunan. History, cooking methods, eating guide, and cultural stories behind every dish.">
<meta name="keywords" content="Chinese food, Sichuan cuisine, Chongqing food, Shanghai dishes, Jiangsu cuisine, Hunan food, Chinese recipes, 中华美食, 川菜, 湘菜">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
<link rel="canonical" href="https://food.eastculture.top/">
<meta property="og:title" content="Great Chinese Food Charm — ''' + str(total_dishes) + ''' Traditional Dishes Across 5 Culinary Regions">
<meta property="og:description" content="Explore authentic Chinese dishes — history, cooking methods, and cultural stories behind every dish.">
<meta property="og:url" content="https://food.eastculture.top/">
<meta property="og:type" content="website">
'''

html += '''<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Great Chinese Food Charm",
  "url": "https://food.eastculture.top/",
  "description": "Explore ''' + str(total_dishes) + ''' authentic Chinese dishes from 5 major culinary regions. History, cooking methods, eating guide, and cultural stories behind every dish.",
  "inLanguage": ["en", "zh"],
  "about": {
    "@type": "Thing",
    "name": "Chinese Cuisine",
    "description": "Traditional Chinese dishes from Sichuan, Chongqing, Shanghai, Jiangsu, and Hunan regions"
  }
}
</script>
'''

html += '''<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;color:#1a1a1a;background:#faf8f5;line-height:1.7}
.container{max-width:1200px;margin:0 auto;padding:0 24px}
.nav{position:sticky;top:0;z-index:100;background:rgba(255,255,255,.95);backdrop-filter:blur(12px);border-bottom:1px solid #e8e0d5;padding:16px 0}
.nav-inner{max-width:1200px;margin:0 auto;padding:0 24px;display:flex;justify-content:space-between;align-items:center}
.nav-logo{font-size:20px;font-weight:700;text-decoration:none;color:#1a1a1a;letter-spacing:-.3px}
.nav-links{display:flex;gap:24px;list-style:none;flex-wrap:wrap}
.nav-links a{text-decoration:none;color:#666;font-size:14px;transition:color .2s}
.nav-links a:hover{color:#1a1a1a}
.hero{padding:80px 24px 60px;text-align:center;background:linear-gradient(180deg,#f5efe6 0%,#faf8f5 100%)}
.hero-badge{display:inline-block;background:#c0392b;color:#fff;font-size:12px;font-weight:600;letter-spacing:1px;padding:6px 18px;border-radius:100px;margin-bottom:20px;text-transform:uppercase}
.hero h1{font-size:38px;font-weight:800;color:#1a1a1a;max-width:700px;margin:0 auto 16px;line-height:1.25;letter-spacing:-.5px}
.hero p{font-size:17px;color:#666;max-width:550px;margin:0 auto;line-height:1.7}
.hero-stats{display:flex;justify-content:center;gap:48px;margin-top:36px;flex-wrap:wrap}
.hero-stat{text-align:center}
.hero-stat-num{font-size:30px;font-weight:800;color:#1a1a1a}
.hero-stat-label{font-size:13px;color:#888;margin-top:4px}
.section{padding:48px 0}
.section-title{font-size:24px;font-weight:700;color:#1a1a1a;margin-bottom:24px;padding-bottom:12px;border-bottom:2px solid #e8e0d5;display:flex;align-items:center;gap:12px}
.section-title .flag{font-size:28px}
.card-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:20px}
.card{background:#fff;border:1px solid #e8e0d5;border-radius:12px;padding:24px;transition:all .15s;text-decoration:none;color:inherit;display:block}
.card:hover{border-color:#c0392b;transform:translateY(-2px);box-shadow:0 4px 16px rgba(0,0,0,.06)}
.card-tags{display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap}
.card-tag{font-size:11px;font-weight:600;padding:3px 10px;border-radius:100px;background:#f5efe6;color:#8b7355}
.card-name{font-size:17px;font-weight:700;color:#1a1a1a;margin-bottom:8px}
.card-desc{font-size:13px;color:#666;line-height:1.7;margin-bottom:12px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.card-more{font-size:12px;font-weight:600;color:#c0392b}
.footer{background:#1a1a1a;color:rgba(255,255,255,.7);padding:48px 24px;margin-top:48px}
.footer-inner{max-width:1200px;margin:0 auto;text-align:center}
.footer p{font-size:13px;line-height:1.8}
.footer a{color:rgba(255,255,255,.9)}
.footer-divider{border:0;border-top:1px solid rgba(255,255,255,.15);margin:20px 0}
@media(max-width:768px){
  .hero h1{font-size:26px}
  .hero-stats{gap:24px}
  .card-grid{grid-template-columns:1fr}
}
</style>
</head>
<body>
<nav class="nav"><div class="nav-inner">
<a class="nav-logo" href="/">Great Chinese Food Charm</a>
<ul class="nav-links">
'''

for prov in provinces:
    html += f'<a href="#{prov["id"]}">{prov["name_zh"]} ({prov["name_en"]})</a>\n'

html += '''</ul></div></nav>

<header class="hero">
<div class="hero-badge">Chinese Culinary Heritage</div>
<h1>''' + str(total_dishes) + ''' Traditional Chinese Dishes — 5 Culinary Regions</h1>
<p>From the numbing-spicy street food of Chongqing to the delicate sweet-savory flavors of Shanghai — discover the authentic taste of China through its most iconic regional dishes.</p>
<div class="hero-stats">
'''

for prov in provinces:
    html += f'<div class="hero-stat"><div class="hero-stat-num">{len(prov["dishes"])}</div><div class="hero-stat-label">{prov["name_en"]}</div></div>\n'

html += '</div></header>\n'

# Generate content sections for each province
for prov in provinces:
    html += f'<section id="{prov["id"]}" class="section"><div class="container">\n'
    html += f'<h2 class="section-title"><span class="flag">{prov["name_zh"][0]}</span> {prov["name_zh"]} · {prov["name_en"]} — {len(prov["dishes"])} Dishes</h2>\n'
    html += '<div class="card-grid">\n'
    
    for dish in prov['dishes']:
        name = dish.get('name', '')
        desc = dish.get('description', '')
        tags = ', '.join(dish.get('tags', [])[:3])
        history = dish.get('history', '')
        # Combine description and history for card preview
        preview = desc[:200] + '...' if len(desc) > 200 else desc
        
        html += f'''<div class="card">
<div class="card-tags"><span class="card-tag">{tags}</span></div>
<div class="card-name">{esc(name)}</div>
<div class="card-desc">{esc(desc)}</div>
<div class="card-more">Read full story & recipe →</div>
</div>
'''
    html += '</div></div></section>\n'

html += '''
<footer class="footer"><div class="footer-inner">
<p><strong>Great Chinese Food Charm</strong> — Documenting authentic Chinese regional cuisine</p>
<hr class="footer-divider">
<p>Content is for educational and cultural appreciation purposes. Recipes and descriptions are curated from traditional sources.</p>
<p>© 2026 · <a href="https://food.eastculture.top/">food.eastculture.top</a></p>
</div></footer>
</body></html>'''

# Write output
out_path = os.path.join(BASE, 'index_single.html')
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(html)

size_kb = os.path.getsize(out_path) / 1024
print(f"Generated: {out_path}")
print(f"Size: {size_kb:.1f} KB")
print(f"Provinces: {len(provinces)}")
print(f"Total dishes: {total_dishes}")
