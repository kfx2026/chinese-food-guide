/* ============================================================
   Oriental Food Site — main.js v3.0
  面向全球用户，EN为主语言。
   数据按页面语言独立存储，杜绝跨语言串显。
   ============================================================ */

const PAGE_LANG = (document.documentElement.lang || '').startsWith('zh') ? 'zh' : 'en';

/* ========== Preview Carousel Data (per-language) ========== */
const PREVIEW_QUEUE = {
  en: [
    {
      id: 'sichuan',
      province: 'Sichuan Province',
      status: 'coming',   // coming | live | past
      dishes: [
        { name: 'Mapo Tofu', desc: 'Silken tofu in fiery chili-bean sauce — Sichuan\'s most iconic dish' },
        { name: 'Kung Pao Chicken', desc: 'Tender chicken with peanuts and dried chilies, sweet-savory-spicy' },
        { name: 'Sichuan Hotpot', desc: 'Boiling chili oil broth with endless dipping ingredients' },
        { name: 'Jiangyou Braised Pork Intestine', desc: 'Tender braised intestines in rich spicy sauce — a Jiangyou heritage dish' },
      ],
      eta: 'Coming June 2026',
    },
    {
      id: 'chongqing',
      province: 'Chongqing Municipality',
      status: 'scheduled',
      dishes: [
        { name: 'Chongqing Hotpot', desc: 'Extra-fiery beef tallow broth — the original hotpot experience' },
        { name: 'Xiao Mian (Spicy Noodles)', desc: 'Street-style noodles with peppery sesame paste topping' },
        { name: 'Sour Soup Fish', desc: 'Tomato-sour broth with fresh fish slices and pickled veggies' },
      ],
      eta: 'Coming July 2026',
    },
    {
      id: 'yunnan',
      province: 'Yunnan Province',
      status: 'scheduled',
      dishes: [
        { name: 'Crossing-the-Bridge Noodles', desc: 'Broth kept hot with a layer of chicken fat, ingredients added tableside' },
        { name: 'Steamed Pot Chicken', desc: 'Clay pot steamed with medicinal herbs and flowers' },
        { name: 'Er Kuai (Rice Cakes)', desc: 'Grilled or stir-fried rice cakes with savory toppings' },
      ],
      eta: 'Coming August 2026',
    },
    {
      id: 'guangdong',
      province: 'Guangdong Province',
      status: 'planned',
      dishes: [
        { name: 'Dim Sum Platter', desc: 'Bite-sized steamed delicacies — har gow, siu mai, char siu bao' },
        { name: 'Cantonese Roast Goose', desc: 'Crispy golden skin with succulent meat, served with plum sauce' },
        { name: 'White Cut Chicken', desc: 'Poached chicken with ginger-scallion oil dip, texture is everything' },
      ],
      eta: 'Coming September 2026',
    },
  ],
  zh: [
    {
      id: 'sichuan',
      province: '四川省',
      status: 'coming',
      dishes: [
        { name: '麻婆豆腐', desc: '嫩豆腐配麻辣豆瓣酱——川菜第一代表' },
        { name: '宫保鸡丁', desc: '嫩鸡丁配花生和干辣椒，甜咸麻辣四味交融' },
        { name: '四川火锅', desc: '翻滚的红油汤底，涮遍天下食材' },
        { name: '江油红烧肥肠', desc: '软糯入味的红烧肥肠——江油饮食文化的标志性符号' },
      ],
      eta: '预计 2026 年 6 月上线',
    },
    {
      id: 'chongqing',
      province: '重庆市',
      status: 'scheduled',
      dishes: [
        { name: '重庆火锅', desc: '牛油超辣锅底——火锅的发源地体验' },
        { name: '重庆小面', desc: '街边风味面条，花椒芝麻酱香扑鼻' },
        { name: '酸汤鱼', desc: '番茄酸汤配鲜鱼片，开胃爽口' },
      ],
      eta: '预计 2026 年 7 月上线',
    },
    {
      id: 'yunnan',
      province: '云南省',
      status: 'scheduled',
      dishes: [
        { name: '过桥米线', desc: '滚油封汤，食材现烫入碗' },
        { name: '汽锅鸡', desc: '建水紫汽锅蒸制，药膳花香' },
        { name: '饵块', desc: '烤或炒的年糕片，咸香软糯' },
      ],
      eta: '预计 2026 年 8 月上线',
    },
    {
      id: 'guangdong',
      province: '广东省',
      status: 'planned',
      dishes: [
        { name: '广式早茶', desc: '虾饺、烧卖、叉烧包——蒸笼里的精致艺术' },
        { name: '深井烧鹅', desc: '脆皮金黄肉质鲜嫩，配酸梅酱一绝' },
        { name: '白切鸡', desc: '白斩鸡蘸姜葱油，口感即灵魂' },
      ],
      eta: '预计 2026 年 9 月上线',
    },
  ],
};

/* ========== Published Updates (per-language) ========== */
const UPDATES = {
  en: [
    {
      id: 'sichuan-001',
      date: 'June 1, 2026',
      region: 'Sichuan · Chengdu',
      dishes: [
        {
          name: 'Mapo Tofu',
          tags: ['Spicy', 'Signature'],
          description: 'Silken tofu simmered in a rich, fiery sauce of fermented broad beans, chili oil, and Sichuan peppercorns. Invented in the late Qing Dynasty by Chen Mapo, a restaurateur in Chengdu. The dish balances the signature "mala" (numbing-spicy) flavor with the delicate softness of tofu.',
          history: 'Originated in the late Qing Dynasty (c. 1860s) at Chen Xingsheng Restaurant in Chengdu. The owner\'s wife, Chen Mapo, created this dish. It was inscribed as a national intangible cultural heritage dish in 2010.',
          method: '1. Cube silken tofu, blanch briefly.<br>2. Fry ground beef in chili oil until crisp.<br>3. Add doubanjiang (fermented bean paste), garlic, ginger.<br>4. Add tofu and stock, simmer gently.<br>5. Thicken with cornstarch slurry.<br>6. Finish with ground Sichuan peppercorn oil.',
        },
        {
          name: 'Kung Pao Chicken',
          tags: ['Classic', 'Sweet-Spicy'],
          description: 'Diced chicken stir-fried with peanuts, dried red chilies, and scallions in a sweet-savory sauce. Named after Ding Baozhen, a Qing Dynasty official whose title was "Gongbao".',
          history: 'Named after Ding Baozhen (1820–1886), a Qing Dynasty governor of Sichuan who loved this dish. It spread globally and is one of the most recognized Chinese dishes internationally.',
          method: '1. Marinate diced chicken in soy sauce and cornstarch.<br>2. Prepare sauce: vinegar, soy sauce, sugar, cornstarch, water.<br>3. Flash-fry chilies and peanuts.<br>4. Stir-fry chicken until white.<br>5. Combine all with sauce, toss until glossy.',
        },
        {
          name: 'Sichuan Hotpot',
          tags: ['Iconic', 'Communal'],
          description: 'A communal dining experience centered around a pot of simmering, chili-laced broth. Diners cook raw ingredients tableside — from thin-sliced beef to tripe, lotus root, and tofu skin.',
          history: 'Roots trace to Jialing River boatmen of the Ming/Qing era who cooked offal in spicy broth. Modern Sichuan hotpot emerged in Chongqing in the early 1900s and spread nationwide by the 1990s.',
          method: '1. Prepare broth: beef tallow, chili, Sichuan pepper, fermented beans, spices.<br>2. Slice ingredients thinly.<br>3. Bring broth to rolling boil.<br>4. Dip and cook ingredients briefly.<br>5. Dip in sesame oil with garlic and cilantro.',
        },
        {
          name: 'Jiangyou Braised Pork Intestine',
          tags: ['Signature', 'Spicy'],
          image: 'images/jiangyou-feichang-1.jpg',
          description: 'A legendary Sichuan dish from Jiangyou County, featuring pork intestines braised to tender perfection in a rich, spicy sauce. Beloved for its bold flavor and silky texture. A must-try for offal enthusiasts and Sichuan food lovers alike.',
          history: 'Originated in Jiangyou (modern-day Mianyang) during the Qing Dynasty, when local butchers simmered leftover pork offal with chili and spices to make a hearty, affordable meal. By the Republican era, it had grown into a beloved street food sold at market stalls. In the 1970s, state-run restaurants standardized the recipe for mass production. The 1980s saw a revival as small private eateries brought back family recipes with unique twists, cementing its status as Jiangyou\'s culinary icon and a Sichuan food heritage dish.',
          method: '1. Thoroughly clean the intestines by scrubbing with flour and salt, then rinse and blanch in boiling water.<br>2. In a wok, heat oil and sauté ginger, garlic, doubanjiang (fermented broad bean paste), and dried red chilies until the oil turns red and fragrant.<br>3. Add the intestine pieces, splash in cooking wine and soy sauce, toss in star anise and cinnamon, and stir-fry briefly.<br>4. Pour in enough boiling water to cover the intestines, bring to a boil, then reduce heat and simmer gently for 1.5 hours until fork-tender.<br>5. Turn up the heat and reduce the sauce until thick and glossy; garnish with fresh cilantro and scallions before serving.',
        },
      ],
    },
  ],
  zh: [
    {
      id: 'sichuan-001',
      date: '2026年6月1日',
      region: '四川·成都',
      dishes: [
        {
          name: '麻婆豆腐',
          tags: ['麻辣', '招牌'],
          description: '嫩豆腐在发酵豆瓣、红油和花椒调制的浓郁麻辣酱汁中慢炖而成。清晚期成都陈麻婆所创，麻辣与豆腐的细嫩形成绝妙平衡。',
          history: '起源于清晚期（约1860年代）成都陈兴盛饭铺，老板娘陈麻婆创制。2010年入选国家级非物质文化遗产名录。',
          method: '1. 嫩豆腐切块焯水备用。<br>2. 牛肉末在红油中炒至酥脆。<br>3. 加入郫县豆瓣酱、蒜末、姜末炒香。<br>4. 放入豆腐和鲜汤，小火慢烧。<br>5. 水淀粉勾芡。<br>6. 淋花椒油出锅。',
        },
        {
          name: '宫保鸡丁',
          tags: ['经典', '糊辣'],
          description: '鸡丁与花生、干辣椒、葱段同炒，甜咸酱汁包裹。得名于清朝官员丁宝桢的官衔"宫保"。',
          history: '得名于清朝四川总督丁宝桢（1820–1886），嗜好此菜。现已传遍全球，是最具国际知名度的中国菜之一。',
          method: '1. 鸡丁用酱油和淀粉腌制。<br>2. 调碗汁：醋、酱油、糖、淀粉、水。<br>3. 快炸干辣椒和花生。<br>4. 鸡丁炒变色。<br>5. 倒入碗汁翻炒至挂汁。',
        },
        {
          name: '四川火锅',
          tags: ['标志性', '聚餐'],
          description: '以翻滚的红油锅底为核心的聚餐体验。食客将毛肚、牛肉、藕片、豆皮等食材现涮现吃。',
          history: '源自明清时期嘉陵江船工，以麻辣汤底煮内脏。现代四川火锅于1900年代初在重庆兴起，1990年代风靡全国。',
          method: '1. 謷制锅底：牛油、辣椒、花椒、豆瓣、香料。<br>2. 食材切薄片。<br>3. 汤底大火烧开。<br>4. 食材涮烫即食。<br>5. 蘸香油蒜泥香菜碟。',
        },
        {
          name: '江油红烧肥肠',
          tags: ['招牌', '香辣'],
          image: 'images/jiangyou-feichang-1.jpg',
          description: '江油最具代表性的地方美食，以猪大肠为主料，经过精心清洗和长时间红烧，成菜色泽红亮、肥而不腻、口感软糯香辣。是江油人日常饮食和宴客的必备硬菜，也是四川饮食文化的一张名片。',
          history: '起源于清朝时期，江油（今绵阳境内）屠户将剩余猪下水加入辣椒、香料红烧而成，物美价廉、深受百姓喜爱。民国时期逐渐成为街头巷尾的热门小吃，赶集的乡民无不以一碗红烧肥肠配米饭为快事。70年代国营饭店将其纳入正式菜单，配方趋于标准化。80年代个体餐饮兴起，各家以祖传秘方改良发扬，江油肥肠自此名扬川内外，成为江油饮食文化的标志性符号。',
          method: '1. 肥肠翻面，用面粉和盐反复搓洗去腥去黏液，清水冲净后冷水下锅焯水捞出切段。<br>2. 热锅宽油，下姜片、蒜瓣、郫县豆瓣酱和干辣椒段，小火炒出红油和香味。<br>3. 倒入肥肠段大火翻炒，沿锅边淋入料酒去腥，加酱油上色，放入八角、桂皮等香料。<br>4. 注入足量开水没过肥肠，大火烧开转小火加盖慢炖1.5小时，至肥肠软糯入味。<br>5. 开盖大火收汁至汤汁浓稠裹住肥肠，出锅撒上香菜碎和葱花即可。',
        },
      ],
    },
  ],
};

/* ========== Render Preview Carousel + Tag Bar ========== */
let previewIndex = 0;

function renderPreviewCarousel() {
  const el = document.getElementById('nextPreview');
  if (!el) return;
  const queue = PREVIEW_QUEUE[PAGE_LANG] || PREVIEW_QUEUE.en;
  if (!queue.length) return;

  const badge = PAGE_LANG === 'zh' ? '下期预告' : 'Coming Next';

  // Build carousel track (all cards side by side)
  const cardsHtml = queue.map((item, i) => {
    const statusLabel = {
      coming: PAGE_LANG === 'zh' ? '即将上线' : 'Coming Soon',
      scheduled: PAGE_LANG === 'zh' ? '排期中' : 'Scheduled',
      planned: PAGE_LANG === 'zh' ? '规划中' : 'Planned',
    }[item.status] || '';
    const statusClass = item.status === 'coming' ? 'preview-status--live' :
                           item.status === 'scheduled' ? 'preview-status--next' : 'preview-status--later';
    return `
      <div class="preview-slide" data-preview-idx="${i}">
        <div class="preview-card page-reveal">
          <div class="preview-card__badge">${badge}</div>
          <div class="preview-card__status ${statusClass}">${statusLabel}</div>
          <h3 class="preview-card__region">${item.province}</h3>
          <ul class="preview-card__list">
            ${item.dishes.map(d => `<li>${d.name} — ${d.desc}</li>`).join('')}
          </ul>
          <div class="preview-card__eta">${item.eta}</div>
        </div>
      </div>`;
  }).join('');

  // Tag bar (all provinces as clickable pills)
  const tagsHtml = queue.map((item, i) => {
    const activeClass = i === previewIndex ? 'preview-tag--active' : '';
    const statusDot = item.status === 'coming' ? '<span class="preview-tag__dot" style="background:var(--mint)"></span>' :
                        item.status === 'scheduled' ? '<span class="preview-tag__dot" style="background:var(--amber)"></span>' : '';
    return `<button class="preview-tag ${activeClass}" data-goto="${i}" onclick="goPreviewSlide(${i})">${statusDot}${item.province}</button>`;
  }).join('');

  // Arrow buttons (only show if >1 slide)
  const arrowsHtml = queue.length > 1 ? `
    <button class="preview-arrow preview-arrow--left" onclick="shiftPreview(-1)" aria-label="Previous">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
    </button>
    <button class="preview-arrow preview-arrow--right" onclick="shiftPreview(1)" aria-label="Next">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
    </button>` : '';

  el.innerHTML = `
    <div class="preview-carousel">
      ${arrowsHtml}
      <div class="preview-track" id="previewTrack">
        ${cardsHtml}
      </div>
    </div>
    <div class="preview-tags" id="previewTags">
      ${tagsHtml}
    </div>`;

  // Position to current index
  updatePreviewPosition();
}

function updatePreviewPosition() {
  const track = document.getElementById('previewTrack');
  if (!track) return;
  const slideWidth = track.querySelector('.preview-slide')?.offsetWidth || track.offsetWidth;
  track.style.transform = `translateX(-${previewIndex * slideWidth}px)`;
  // Update tag active state
  document.querySelectorAll('.preview-tag').forEach((tag, i) => {
    tag.classList.toggle('preview-tag--active', i === previewIndex);
  });
}

function shiftPreview(dir) {
  const queue = PREVIEW_QUEUE[PAGE_LANG] || PREVIEW_QUEUE.en;
  previewIndex = Math.max(0, Math.min(queue.length - 1, previewIndex + dir));
  updatePreviewPosition();
}

function goPreviewSlide(idx) {
  previewIndex = idx;
  updatePreviewPosition();
}

// Touch/swipe support for carousel
function initPreviewSwipe() {
  const track = document.getElementById('previewTrack');
  if (!track) return;
  let startX = 0, isDragging = false;
  track.addEventListener('pointerdown', e => { startX = e.pageX; isDragging = true; track.setPointerCapture(e.pointerId); }, { passive: true });
  track.addEventListener('pointerup', e => {
    if (!isDragging) return; isDragging = false;
    const diff = startX - e.pageX;
    if (Math.abs(diff) > 50) shiftPreview(diff > 0 ? 1 : -1);
  }, { passive: true });
}

/* ========== Pagination Config ========== */
const PER_PAGE = 6; // dishes per page (not articles)
let currentPage = 1;
let filteredUpdates = null; // null = show all

/* ========== Render Updates (Paginated + Filterable + Searchable) ========== */
function renderUpdates() {
  const container = document.getElementById('updatesContainer');
  const countEl = document.getElementById('resultsCount');
  const paginationEl = document.getElementById('paginationWrap');
  if (!container) return;

  const allData = UPDATES[PAGE_LANG] || UPDATES.en;
  if (!allData.length) {
    container.innerHTML = `<p style="text-align:center;color:var(--text-muted);padding:40px 0;font-size:.92rem">
      ${PAGE_LANG === 'zh' ? '暂无更新内容，敬请期待！' : 'No updates yet — stay tuned!'}
    </p>`;
    if (countEl) countEl.textContent = '';
    if (paginationEl) paginationEl.innerHTML = '';
    return;
  }

  // --- Flatten all dishes with article context for pagination ---
  let items = []; // { dish, region, date, articleId }
  allData.forEach(article => {
    article.dishes.forEach(dish => {
      items.push({ dish, region: article.region, date: article.date, articleId: article.id });
    });
  });

  // --- Apply filters ---
  const searchQ = (document.getElementById('updateSearch')?.value || '').trim().toLowerCase();
  const provinceVal = document.getElementById('provinceFilter')?.value || '';
  const sortVal = document.getElementById('sortFilter')?.value || 'newest';

  if (searchQ || provinceVal) {
    items = items.filter(it => {
      const d = it.dish;
      const matchSearch = !searchQ || (
        d.name.toLowerCase().includes(searchQ) ||
        d.description.toLowerCase().includes(searchQ) ||
        d.history.toLowerCase().includes(searchQ) ||
        d.tags.some(t => t.toLowerCase().includes(searchQ))
      );
      const matchProv = !provinceVal || it.region.toLowerCase().includes(provinceVal.toLowerCase());
      return matchSearch && matchProv;
    });
  }

  // --- Sort ---
  if (sortVal === 'az') {
    items.sort((a, b) => a.dish.name.localeCompare(b.dish.name));
  } else if (sortVal === 'oldest') {
    items.reverse(); // default order is newest-first in data
  }
  // newest = default (keep as-is)

  // --- Count display ---
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / PER_PAGE);
  if (currentPage > totalPages) currentPage = totalPages || 1;
  if (countEl) {
    const txt = PAGE_LANG === 'zh'
      ? `共 ${totalItems} 道美食${searchQ ? '（已筛选）' : ''}`
      : `${totalItems} dish${totalItems !== 1 ? 'es' : ''}${searchQ ? ' (filtered)' : ''}`;
    countEl.textContent = txt;
  }

  // --- Paginate ---
  const start = (currentPage - 1) * PER_PAGE;
  const pageItems = items.slice(start, start + PER_PAGE);

  // Group consecutive dishes from same article under one header
  let html = '';
  let lastRegion = null;
  pageItems.forEach((it, idx) => {
    if (it.region !== lastRegion) {
      lastRegion = it.region;
      html += `
        <div class="update-article__header page-reveal" style="margin-top:${idx > 0 ? '36px' : '0'}">
          <span class="update-article__date">${it.date}</span>
          <h2 class="update-article__title">${it.region}</h2>
        </div>`;
    }
    const d = it.dish;
    const labelDesc = PAGE_LANG === 'zh' ? '简介' : 'Description';
    const labelHistory = PAGE_LANG === 'zh' ? '历史渊源' : 'History';
    const labelMethod = PAGE_LANG === 'zh' ? '做法' : 'Method';
    html += `
      <div class="food-card page-reveal" style="animation-delay:${idx * 60}ms">
        <div class="food-card__header">
          ${d.image ? `<img class="food-card__img" src="${d.image}" alt="${d.name}" loading="lazy">` : ''}
          <div class="food-card__info">
            <h3 class="food-card__title">${d.name}</h3>
            <div class="food-card__tag-row">
              ${d.tags.map(t => `<span class="food-tag food-tag--taste">${t}</span>`).join('')}
            </div>
          </div>
        </div>
        <div class="food-field">
          <div class="food-field__label">${labelDesc}</div>
          <div class="food-field__value">${d.description}</div>
        </div>
        <div class="food-field">
          <div class="food-field__label">${labelHistory}</div>
          <div class="food-field__value">${d.history}</div>
        </div>
        <div class="food-field">
          <div class="food-field__label">${labelMethod}</div>
          <div class="food-field__value">${d.method}</div>
        </div>
      </div>`;
  });
  container.innerHTML = html || `<p style="text-align:center;color:var(--text-muted);padding:40px 0;font-size:.92rem">
    ${PAGE_LANG === 'zh' ? '没有匹配的美食，试试其他关键词？' : 'No matching dishes — try a different search.'}
  </p>`;

  // --- Pagination controls ---
  renderPagination(paginationEl, totalPages);

  // Re-trigger scroll reveal for new elements
  initScrollReveal();
}

/* ========== Pagination Controls ========== */
function renderPagination(el, totalPages) {
  if (!el) return;
  if (totalPages <= 1) { el.innerHTML = ''; return; }

  const prevLabel = PAGE_LANG === 'zh' ? '上一页' : 'Prev';
  const nextLabel = PAGE_LANG === 'zh' ? '下一页' : 'Next';

  let btns = '';
  // Prev
  btns += `<button class="page-btn ${currentPage === 1 ? 'disabled' : ''}" 
    ${currentPage === 1 ? 'disabled' : ''} onclick="goPage(${currentPage - 1})">&laquo; ${prevLabel}</button>`;

  // Page numbers (show max 7, with ellipsis)
  const pages = getPageNumbers(totalPages);
  pages.forEach(p => {
    if (p === '...') {
      btns += `<span class="page-ellipsis">...</span>`;
    } else {
      btns += `<button class="page-btn ${p === currentPage ? 'active' : ''}" onclick="goPage(${p})">${p}</button>`;
    }
  });

  // Next
  btns += `<button class="page-btn ${currentPage === totalPages ? 'disabled' : ''}" 
    ${currentPage === totalPages ? 'disabled' : ''} onclick="goPage(${currentPage + 1})">${nextLabel} &raquo;</button>`;

  el.innerHTML = `<div class="pagination">${btns}</div>`;
}

function getPageNumbers(total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [1, 2];
  if (currentPage > 4) pages.push('...');
  const start = Math.max(3, currentPage - 1);
  const end = Math.min(total - 2, currentPage + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (currentPage < total - 3) pages.push('...');
  pages.push(total - 1, total);
  return pages;
}

function goPage(p) {
  currentPage = p;
  renderUpdates();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ========== Populate Province Filter ========== */
function populateProvinceFilter() {
  const sel = document.getElementById('provinceFilter');
  if (!sel) return;
  const allData = UPDATES[PAGE_LANG] || UPDATES.en;
  const provinces = [...new Set(allData.map(a => a.region))].sort();
  const placeholder = sel.options[0]?.text || '';
  sel.innerHTML = `<option value="">${placeholder}</option>` +
    provinces.map(p => `<option value="${p}">${p}</option>`).join('');
}

/* ========== Bind Filter Events ========== */
function bindFilterEvents() {
  const searchInput = document.getElementById('updateSearch');
  const provSel = document.getElementById('provinceFilter');
  const sortSel = document.getElementById('sortFilter');

  // Search with debounce (300ms)
  let searchTimer = null;
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => { currentPage = 1; renderUpdates(); }, 300);
    });
  }
  // Province / Sort change → reset to page 1
  [provSel, sortSel].forEach(el => {
    if (el) el.addEventListener('change', () => { currentPage = 1; renderUpdates(); });
  });
}

/* ========== Search (searches current language data only) ========== */
function searchDish() {
  const q = document.getElementById('heroSearch')?.value.trim().toLowerCase();
  if (!q) return;
  const list = UPDATES[PAGE_LANG] || UPDATES.en;
  const results = [];
  list.forEach(u => u.dishes.forEach(d => {
    if ((d.name + ' ' + d.description + ' ' + d.history).toLowerCase().includes(q)) results.push(d.name);
  }));
  if (results.length) {
    alert((PAGE_LANG === 'zh' ? '找到：' : 'Found: ') + results.join(', '));
  } else {
    alert(PAGE_LANG === 'zh' ? '未找到匹配的美食' : 'No matching dishes found.');
  }
}

/* ========== Scroll Reveal ========== */
function initScrollReveal() {
  document.querySelectorAll('.page-reveal').forEach(el => {
    new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); }});
    }, { threshold: 0.1 }).observe(el);
  });
}

/* ========== Nav Scroll ========== */
function initNavScroll() {
  const nav = document.querySelector('.top-nav');
  if (!nav) return;
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40), { passive: true });
}

/* ========== Mobile Menu ========== */
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.textContent = open ? '\u2715' : '\u2630';
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '\u2630';
  }));
}

/* ========== Refresh & Back-to-top ========== */
function initRefreshBtn() {
  const btn = document.getElementById('refreshBtn');
  if (!btn) return;
  btn.addEventListener('click', () => { btn.classList.add('spinning'); location.reload(); });
}
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ========== Init ========== */
document.addEventListener('DOMContentLoaded', () => {
  renderPreviewCarousel();
  initPreviewSwipe();
  populateProvinceFilter();
  bindFilterEvents();
  renderUpdates();
  initScrollReveal();
  initNavScroll();
  initMobileMenu();
  initRefreshBtn();
  initBackToTop();
});
