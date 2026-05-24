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
        { name: 'Dan Dan Noodles', desc: 'Chengdu street noodles with spicy numbing sauce and minced pork' },
        { name: 'Husband and Wife Lung Slice', desc: 'Classic cold offal platter — brave hearts only' },
        { name: 'Rabbit Head', desc: 'Sichuan\'s most controversial street snack — dare to try?' },
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
        { name: '担担面', desc: '成都街头细面条，麻辣酱汁配芽菜肉臊' },
        { name: '夫妻肺片', desc: '经典冷盘牛杂片——胆大的再来！' },
        { name: '兔头', desc: '四川最具争议的街头小吃——你敢吗？' },
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
          image: 'images/mapo-tofu-2.jpg',
          tags: ['Spicy', 'Signature'],
          description: 'Silken tofu simmered in a rich, fiery sauce of fermented broad beans, chili oil, and Sichuan peppercorns. Invented in the late Qing Dynasty by Chen Mapo, a restaurateur in Chengdu. The dish balances the signature "mala" (numbing-spicy) flavor with the delicate softness of tofu.',
          history: 'Originated in the late Qing Dynasty (c. 1860s) at Chen Xingsheng Restaurant in Chengdu. The owner\'s wife, Chen Mapo, created this dish. It was inscribed as a national intangible cultural heritage dish in 2010.',
          method: '1. Cube silken tofu, blanch briefly.<br>2. Fry ground beef in chili oil until crisp.<br>3. Add doubanjiang (fermented bean paste), garlic, ginger.<br>4. Add tofu and stock, simmer gently.<br>5. Thicken with cornstarch slurry.<br>6. Finish with ground Sichuan peppercorn oil.',
        },
        {
          name: 'Kung Pao Chicken',
          image: 'images/kung-pao-chicken-1.jpg',
          tags: ['Classic', 'Sweet-Spicy'],
          description: 'Diced chicken stir-fried with peanuts, dried red chilies, and scallions in a sweet-savory sauce. Named after Ding Baozhen, a Qing Dynasty official whose title was "Gongbao".',
          history: 'Named after Ding Baozhen (1820–1886), a Qing Dynasty governor of Sichuan who loved this dish. It spread globally and is one of the most recognized Chinese dishes internationally.',
          method: '1. Marinate diced chicken in soy sauce and cornstarch.<br>2. Prepare sauce: vinegar, soy sauce, sugar, cornstarch, water.<br>3. Flash-fry chilies and peanuts.<br>4. Stir-fry chicken until white.<br>5. Combine all with sauce, toss until glossy.',
        },
        {
          name: 'Sichuan Hotpot',
          image: 'images/sichuan-hotpot-1.jpg',
          tags: ['Iconic', 'Communal'],
          description: 'A communal dining experience centered around a pot of simmering, chili-laced broth. Diners cook raw ingredients tableside — from thin-sliced beef to tripe, lotus root, and tofu skin.',
          history: 'Roots trace to Jialing River boatmen of the Ming/Qing era who cooked offal in spicy broth. Modern Sichuan hotpot emerged in Chongqing in the early 1900s and spread nationwide by the 1990s.',
          method: '1. Prepare broth: beef tallow, chili, Sichuan pepper, fermented beans, spices.<br>2. Slice ingredients thinly.<br>3. Bring broth to rolling boil.<br>4. Dip and cook ingredients briefly.<br>5. Dip in sesame oil with garlic and cilantro.',
        },
        {
          name: 'Jiangyou Braised Pork Intestine',
          tags: ['Challenge', 'Spicy'],
          image: 'images/jiangyou-feichang-1.jpg',
          description: 'A legendary Sichuan dish from Jiangyou County, featuring pork intestines braised to tender perfection in a rich, spicy sauce. Chewy, bold, and definitely NOT for everyone. Dare to take the ultimate Sichuan challenge?',
          history: 'Originated in Jiangyou (modern-day Mianyang) during the Qing Dynasty, when local butchers simmered leftover pork offal with chili and spices to make a hearty, affordable meal. By the Republican era, it had grown into a beloved street food sold at market stalls. In the 1970s, state-run restaurants standardized the recipe for mass production. The 1980s saw a revival as small private eateries brought back family recipes with unique twists, cementing its status as Jiangyou\'s culinary icon and a Sichuan food heritage dish.',
          method: '1. Thoroughly clean the intestines by scrubbing with flour and salt, then rinse and blanch in boiling water.<br>2. In a wok, heat oil and sauté ginger, garlic, doubanjiang (fermented broad bean paste), and dried red chilies until the oil turns red and fragrant.<br>3. Add the intestine pieces, splash in cooking wine and soy sauce, toss in star anise and cinnamon, and stir-fry briefly.<br>4. Pour in enough boiling water to cover the intestines, bring to a boil, then reduce heat and simmer gently for 1.5 hours until fork-tender.<br>5. Turn up the heat and reduce the sauce until thick and glossy; garnish with fresh cilantro and scallions before serving.',
        },
        {
          name: 'Husband and Wife Lung Slice (Fuqi Feipian)',
          image: 'images/fuqi-feipian-1.jpg',
          tags: ['Challenge', 'Classic'],
          description: 'Thin slices of beef, beef tripe, and offal in a numbing chili oil dressing. The name sounds wild — but the flavor is unforgettable. Brave hearts only.',
          history: 'Created in the 1930s by Guo Zhaohua and his wife in Chengdu. Despite the alarming name (no literal lungs are used), it became a cold dish staple across Sichuan. The name comes from the original vendors being a husband-wife team.',
          method: '1. Boil beef shank, tripe, and tongue until tender, chill and slice paper-thin.<br>2. Prepare dressing: chili oil, Sichuan peppercorn oil, soy sauce, vinegar, sugar, crushed garlic.<br>3. Arrange slices, drizzle dressing, top with crushed peanuts and cilantro.<br>4. Serve cold.',
        },
        {
          name: 'Rabbit Head (Tu Tou)',
          image: 'images/rabbit-head-1.jpg',
          tags: ['Challenge', 'Snack'],
          description: 'Sichuan\'s most controversial street snack — a whole rabbit head, spiced and braised. Intense flavor, hands-on eating. Not for the faint of heart.',
          history: 'A specialty of the "Rabbit Capital" of China — Sichuan consumes over 300 million rabbits annually. Rabbit head braised in spicy broth became a late-night street food staple in Chengdu in the 1990s.',
          method: '1. Clean rabbit heads thoroughly, blanch to remove impurities.<br>2. Braise in spiced broth (star anise, cinnamon, Sichuan pepper, dried chili, doubanjiang) for 45 minutes.<br>3. Let cool in broth to absorb flavor.<br>4. Serve with extra chili powder and Sichuan pepper on the side.',
        },
        {
          name: 'Grilled Brain Flower (Kao Nao Hua)',
          image: 'images/kao-nao-hua-1.jpg',
          tags: ['Challenge', 'Street Food'],
          description: 'Silky, creamy pig brain grilled on a skewer with chili, cumin, and Sichuan pepper. An acquired taste — but fans call it the ultimate late-night indulgence. Dare to try?',
          history: 'Emerged as a late-night street food in Chengdu in the 2000s, paired with beer and skewers. It reflects Sichuan\'s "eat everything" food culture and the philosophy of wasting nothing.',
          method: '1. Clean fresh pig brain, remove membranes, keep whole.<br>2. Marinate briefly in Shaoxing wine and ginger.<br>3. Grill on skewer over charcoal, brush with chili oil, cumin, and Sichuan pepper mix.<br>4. Serve hot, eat with a spoon.',
        },
        {
          name: 'Dan Dan Noodles',
          image: 'images/dan-dan-noodles-1.jpg',
          tags: ['Classic', 'Street Food'],
          description: 'Chengdu\'s iconic street noodles — thin wheat noodles topped with a spicy, numbing sauce of preserved vegetables, chili oil, Sichuan peppercorns, and minced pork. Originally carried by pole-bearing street vendors (dan dan).',
          history: 'Originated in the early 20th century in Chengdu. Vendors carried noodles and stove on a shoulder pole (dan dan) and stopped to cook a bowl for passersby. It became a UNESCO-recognized intangible cultural heritage dish in 2024.',
          method: '1. Make sauce base: chili oil, Sichuan peppercorn powder, soy sauce, black vinegar, sugar, minced garlic.<br>2. Cook thin noodles, drain, place in bowl.<br>3. Top with sauce, minced pork stir-fried with ya cai (preserved vegetable), cilantro, peanut powder.<br>4. Mix thoroughly before eating.',
        },
        {
          name: 'Sliced Fish in Hot Chili Oil (Shui Zhu Yu)',
          image: 'images/shui-zhu-yu-1.jpg',
          tags: ['Spicy', 'Signature'],
          description: 'Tender fish fillets poached in mild broth, then smothered in hot chili oil with dried chilies and Sichuan peppercorns. The oil is for aroma, not for drinking — scoop it aside and enjoy the fish.',
          history: 'A modern Sichuan classic from the 1980s, created by chef Fan Jun in Chongqing. It revolutionized "fish cooking" in Sichuan cuisine, combining the numbing-spicy flavor with delicate white fish.',
          method: '1. Marinate fish fillets (carp or catfish) in egg white and cornstarch.<br>2. Poach fillets gently in light broth, transfer to serving bowl.<br>3. Top with dried chilies, Sichuan peppercorns, garlic, scallions.<br>4. Pour smoking-hot oil over toppings to release aroma. Serve immediately.',
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
          image: 'images/mapo-tofu-2.jpg',
          tags: ['麻辣', '招牌'],
          description: '嫩豆腐在发酵豆瓣、红油和花椒调制的浓郁麻辣酱汁中慢炖而成。清晚期成都陈麻婆所创，麻辣与豆腐的细嫩形成绝妙平衡。',
          history: '起源于清晚期（约1860年代）成都陈兴盛饭铺，老板娘陈麻婆创制。2010年入选国家级非物质文化遗产名录。',
          method: '1. 嫩豆腐切块焯水备用。<br>2. 牛肉末在红油中炒至酥脆。<br>3. 加入郫县豆瓣酱、蒜末、姜末炒香。<br>4. 放入豆腐和鲜汤，小火慢烧。<br>5. 水淀粉勾芡。<br>6. 淋花椒油出锅。',
        },
        {
          name: '宫保鸡丁',
          image: 'images/kung-pao-chicken-1.jpg',
          tags: ['经典', '糊辣'],
          description: '鸡丁与花生、干辣椒、葱段同炒，甜咸酱汁包裹。得名于清朝官员丁宝桢的官衔"宫保"。',
          history: '得名于清朝四川总督丁宝桢（1820–1886），嗜好此菜。现已传遍全球，是最具国际知名度的中国菜之一。',
          method: '1. 鸡丁用酱油和淀粉腌制。<br>2. 调碗汁：醋、酱油、糖、淀粉、水。<br>3. 快炸干辣椒和花生。<br>4. 鸡丁炒变色。<br>5. 倒入碗汁翻炒至挂汁。',
        },
        {
          name: '四川火锅',
          image: 'images/sichuan-hotpot-1.jpg',
          tags: ['标志性', '聚餐'],
          description: '以翻滚的红油锅底为核心的聚餐体验。食客将毛肚、牛肉、藕片、豆皮等食材现涮现吃。',
          history: '源自明清时期嘉陵江船工，以麻辣汤底煮内脏。现代四川火锅于1900年代初在重庆兴起，1990年代风靡全国。',
          method: '1. 謷制锅底：牛油、辣椒、花椒、豆瓣、香料。<br>2. 食材切薄片。<br>3. 汤底大火烧开。<br>4. 食材涮烫即食。<br>5. 蘸香油蒜泥香菜碟。',
        },
        {
          name: '江油红烧肥肠',
          tags: ['挑战', '香辣'],
          image: 'images/jiangyou-feichang-1.jpg',
          description: '江油最具代表性的地方美食，以猪大肠为主料，成菜色泽红亮、肥而不腻、口感软糯。对很多人来说这是终极挑战——敢不敢来试一下？',
          history: '起源于清朝时期，江油（今绵阳境内）屠户将剩余猪下水加入辣椒、香料红烧而成，物美价廉、深受百姓喜爱。民国时期逐渐成为街头巷尾的热门小吃。80年代个体餐饮兴起，江油肥肠名扬川内外，成为四川饮食文化的标志性符号。',
          method: '1. 肥肠翻面，用面粉和盐反复搓洗去腥去黏液，清水冲净后冷水下锅焯水捞出切段。<br>2. 热锅宽油，下姜片、蒜瓣、郫县豆瓣酱和干辣椒段，小火炒出红油和香味。<br>3. 倒入肥肠段大火翻炒，沿锅边淋入料酒去腥，加酱油上色，放入八角、桂皮等香料。<br>4. 注入足量开水没过肥肠，大火烧开转小火加盖慢炖1.5小时，至肥肠软糯入味。<br>5. 开盖大火收汁至汤汁浓稠裹住肥肠，出锅撒上香菜碎和葱花即可。',
        },
        {
          name: '夫妻肺片',
          image: 'images/fuqi-feipian-1.jpg',
          tags: ['挑战', '经典'],
          description: '牛肉、牛肚、牛舌等薄切后用麻辣红油拌匀的冷盘。名字听起来很吓人——但味道让人忘不了。胆大的再来！',
          history: '1930年代由郭朝华、张田政夫妇在成都创制。虽然叫"肺片"，但实际上并不用肺，而是各种牛杂。因夫妻搭档售卖而得名，现已成为川菜冷盘的代表。',
          method: '1. 牛腱、牛肚、牛舌煮熟放凉，切成薄片。<br>2. 调红油汁：红油、花椒油、酱油、醋、糖、蒜泥。<br>3. 摆盘，淋红油汁，撒花生碎和香菜。<br>4. 冷食。',
        },
        {
          name: '兔头',
          image: 'images/rabbit-head-1.jpg',
          tags: ['挑战', '小吃'],
          description: '四川最具争议的街头小吃——整只兔头，香料卤制。味道浓烈，需要动手啃。胆小的请绕道。',
          history: '四川是中国"兔肉之都"，每年消耗超过3亿只兔子。兔头卤制起源于1990年代成都的夜市文化，现已成为四川夜宵的标志性小吃。',
          method: '1. 兔头彻底清洗，焯水去腥。<br>2. 放入卤汤（八角、桂皮、花椒、干辣椒、郫县豆瓣）卤45分钟。<br>3. 在卤汤中浸泡入味。<br>4. 出锅，配辣椒粉和花椒粉上桌。',
        },
        {
          name: '烤脑花',
          image: 'images/kao-nao-hua-1.jpg',
          tags: ['挑战', '夜宵'],
          description: '猪脑花串在铁签上炭烤，辣椒、孜然、花椒抹满。口感如奶油般丝滑——爱吃的人欲罢不能，不敢吃的看着就怕。你敢吗？',
          history: '兴起于2000年代成都的夜宵摊，配啤酒和烧烤串。体现了四川"万物可食"的饮食文化和杜绝浪费的哲学。',
          method: '1. 新鲜猪脑花洗净，去膜，保持完整。<br>2. 用绍兴酒和姜片腌制片刻。<br>3. 串在铁签上，炭火烤制，刷辣椒油、撒孜然和花椒粉。<br>4. 热食，用勺子挖着吃。',
        },
        {
          name: '担担面',
          image: 'images/dan-dan-noodles-1.jpg',
          tags: ['经典', '小吃'],
          description: '成都标志性街头面条——细面条浇上麻辣酱汁，配芽菜末、红油、花椒和肉臊。最早由挑着担子沿街叫卖的小贩创制。',
          history: '起源于20世纪初的成都，小贩肩挑担子（担担），一头是锅一头是面条，沿街现煮现卖。2024年入选联合国非遗美食名录。',
          method: '1. 制酱底：红油、花椒粉、酱油、黑醋、糖、蒜泥。<br>2. 细面条煮熟，捞入碗中。<br>3. 浇酱，铺炒好的芽菜肉臊，撒香菜和花生碎。<br>4. 拌匀后食用。',
        },
        {
          name: '水煮鱼',
          image: 'images/shui-zhu-yu-1.jpg',
          tags: ['麻辣', '招牌'],
          description: '嫩鱼片在清汤中煮熟，然后浇上滚烫的红油和干辣椒。油是用来闻香味的——把它拨到一边，专心吃鱼。',
          history: '1980年代由重庆厨师范俊创制， revolutionized 川菜做鱼的方式，将麻辣味型与细嫩白鱼完美结合。',
          method: '1. 鱼片（草鱼或鲶鱼）用蛋清和淀粉腌制。<br>2. 清汤将鱼片轻轻煮熟，捞入大碗。<br>3. 鱼片上铺干辣椒、花椒、蒜末、葱花。<br>4. 滚烫热油浇在佐料上，激发香气。立即上桌。',
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
