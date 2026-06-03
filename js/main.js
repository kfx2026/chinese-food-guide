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
      status: 'live',   // now live!
      dishes: [
        { name: 'Mapo Tofu', desc: 'Silken tofu in fiery chili-bean sauce — Sichuan\'s most iconic dish' },
        { name: 'Kung Pao Chicken', desc: 'Tender chicken with peanuts and dried chilies, sweet-savory-spicy' },
        { name: 'Sichuan Hotpot', desc: 'Boiling chili oil broth with endless dipping ingredients' },
        { name: 'Dan Dan Noodles', desc: 'Chengdu street noodles with spicy numbing sauce and minced pork' },
        { name: 'Husband and Wife Lung Slice', desc: 'Classic cold offal platter — brave hearts only' },
        { name: 'Rabbit Head', desc: 'Sichuan\'s most controversial street snack — dare to try?' },
      ],
      eta: '',
    },
    {
      id: 'chongqing',
      province: 'Chongqing Municipality',
      status: 'live',
      dishes: [
        { name: 'Chongqing Hotpot', desc: 'Extra-fiery beef tallow broth — the original hotpot experience' },
        { name: 'Mao Xue Wang', desc: 'Duck blood curd, tripe, and offal simmered in crimson chili broth' },
        { name: 'Chongqing Xiao Mian', desc: 'Soul-warming spicy noodles — the city\'s favorite breakfast' },
        { name: 'Hechuan Peach Slice', desc: 'Paper-thin sweet rice pastry — national intangible heritage' },
        { name: 'Rongchang Braised Goose', desc: 'Century-old braised goose with aromatic spice blend' },
        { name: 'Wanzhou Grilled Fish', desc: 'Fire-grilled fish braised in chili broth — crispy outside, tender inside' },
      ],
      eta: '',
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
        { name: '担担面', desc: '成都街头细面条，麻辣酱汁配芽菜肉臊' },
        { name: '夫妻肺片', desc: '经典冷盘牛杂片——胆大的再来！' },
        { name: '兔头', desc: '四川最具争议的街头小吃——你敢吗？' },
      ],
      eta: '',
    },
    {
      id: 'chongqing',
      province: '重庆市',
      status: 'live',
      dishes: [
        { name: '重庆火锅', desc: '牛油超辣锅底——火锅的发源地体验' },
        { name: '毛血旺', desc: '鸭血毛肚牛百叶，红油翻滚码头江湖味' },
        { name: '重庆小面', desc: '街边风味面条，花椒芝麻酱香扑鼻' },
        { name: '合川桃片', desc: '薄如纸的非遗甜点，糯米核桃层层叠叠' },
        { name: '荣昌卤鹅', desc: '百年老卤浸透的整鹅，咸香入骨' },
        { name: '万州烤鱼', desc: '先烤后炖，外焦里嫩的江湖硬菜' },
      ],
      eta: '',
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
/* ========== Food Data — Dynamic Loading (v4.0 Modular) ========== */
// Data stored in data/provinces/*.json — one file per province
// Add a province = add a JSON file. No full-site redeploy needed.

let FOOD_DATA = { en: [], zh: [] };
let DATA_READY = false;
const dataReadyCallbacks = [];

function onDataReady(fn) {
  if (DATA_READY) { fn(); return; }
  dataReadyCallbacks.push(fn);
}

async function loadFoodData() {
  if (DATA_READY) return;
  try {
    const idxResp = await fetch('data/index.json');
    const index = await idxResp.json();
    const promises = index.provinces
      .filter(p => p.status === 'live')
      .map(p => fetch('data/provinces/' + p.id + '.json').then(r => r.json()));
    const provinces = await Promise.all(promises);
    for (const p of provinces) {
      if (p.en) FOOD_DATA.en.push(...p.en);
      if (p.zh) FOOD_DATA.zh.push(...p.zh);
    }
    DATA_READY = true;
    console.log('Food data loaded: ' + FOOD_DATA.en.length + ' EN, ' + FOOD_DATA.zh.length + ' ZH');
    for (const fn of dataReadyCallbacks) fn();
  } catch (e) {
    console.error('Failed to load food data:', e);
  }
}
loadFoodData();


/* ========== Render Preview Carousel + Tag Bar ========== */
let previewIndex = 0;

function initRender() {
  renderPreviewCarousel();
  renderUpdates();
}
onDataReady(initRender);

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

  const allData = FOOD_DATA[PAGE_LANG] || FOOD_DATA.en;
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
        d.tags.some(t => t.toLowerCase().includes(searchQ)) ||
        (d.eatingGuide && d.eatingGuide.toLowerCase().includes(searchQ)) ||
        (d.culturalCode && d.culturalCode.toLowerCase().includes(searchQ)) ||
        (d.honestTalk && d.honestTalk.toLowerCase().includes(searchQ))
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
    const labelGuide = PAGE_LANG === 'zh' ? '🥢 吃法指南' : '🥢 Eating Guide';
    const labelCode = PAGE_LANG === 'zh' ? '🔍 文化密码' : '🔍 Cultural Code';
    const labelHonest = PAGE_LANG === 'zh' ? '💬 实话实说' : '💬 Honest Truth';
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
        ${d.eatingGuide ? `
        <div class="food-field food-field--special">
          <div class="food-field__label">${labelGuide}</div>
          <div class="food-field__value">${d.eatingGuide}</div>
        </div>` : ''}
        ${d.culturalCode ? `
        <div class="food-field food-field--special">
          <div class="food-field__label">${labelCode}</div>
          <div class="food-field__value">${d.culturalCode}</div>
        </div>` : ''}
        ${d.honestTalk ? `
        <div class="food-field food-field--special">
          <div class="food-field__label">${labelHonest}</div>
          <div class="food-field__value">${d.honestTalk}</div>
        </div>` : ''}
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
  const allData = FOOD_DATA[PAGE_LANG] || FOOD_DATA.en;
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
  const list = FOOD_DATA[PAGE_LANG] || FOOD_DATA.en;
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
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); }});
    }, { threshold: 0.1 });
    obs.observe(el);
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
