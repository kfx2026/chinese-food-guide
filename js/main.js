/* ============================================================
   Oriental Food Site — main.js v3.0
  面向全球用户，EN为主语言。
   数据按页面语言独立存储，杜绝跨语言串显。
   ============================================================ */

const PAGE_LANG = (document.documentElement.lang || '').startsWith('zh') ? 'zh' : 'en';
/* ========== Async Data Loading ========== */
let PREVIEW_QUEUE = null;
let UPDATES = null;

function loadData() {
  return Promise.all([
    fetch('data/preview-' + PAGE_LANG + '.json').then(function(r) { return r.json(); }),
    fetch('data/updates-' + PAGE_LANG + '.json').then(function(r) { return r.json(); })
  ]).then(function(results) {
    PREVIEW_QUEUE = results[0];
    UPDATES = { en: results[1], zh: results[1] };
    return true;
  }).catch(function(err) {
    console.error("Data load failed:", err);
    return false;
  });
}



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
document.addEventListener('DOMContentLoaded', function() {
  loadData().then(function() {
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
});
