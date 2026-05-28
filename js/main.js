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
          eatingGuide: '<b>Scoop it over rice, 1:1 ratio.</b> Mapo Tofu is a sauce-delivery system — the silky tofu and red oil are designed to coat every grain of steamed rice. Don\'t eat it alone; it\'s too intense. Start with small bites; the numbness builds up with each spoonful. The layer of red oil on top is normal — mix it in, don\'t skim it off.',
          culturalCode: '<b>Why it matters beyond taste:</b> Mapo Tofu is the ultimate test of a Sichuan chef — it looks simple but requires perfect control of 7-8 seasonings working in harmony. It embodies the "hundred dishes, hundred flavors" (百菜百味) philosophy of Sichuan cuisine: even a dirt-cheap ingredient like tofu can become legendary with the right technique. In 2010, it became one of the first dishes inscribed on China\'s national intangible cultural heritage food list.',
          honestTalk: '<b>Real mapo tofu is much oilier than what you get abroad.</b> That crimson oil slick on top? It\'s supposed to be there. Western versions are often watered down to be "healthier," which misses the point entirely. One bowl of rice with mapo tofu is one of the most satisfying meals you can have for under $3 in Chengdu. Warning: it stains clothes permanently — wear dark colors.',
        },
        {
          name: 'Kung Pao Chicken',
          image: 'images/kung-pao-chicken-1.jpg',
          tags: ['Classic', 'Sweet-Spicy'],
          description: 'Diced chicken stir-fried with peanuts, dried red chilies, and scallions in a sweet-savory sauce. Named after Ding Baozhen, a Qing Dynasty official whose title was "Gongbao".',
          history: 'Named after Ding Baozhen (1820–1886), a Qing Dynasty governor of Sichuan who loved this dish. It spread globally and is one of the most recognized Chinese dishes internationally.',
          method: '1. Marinate diced chicken in soy sauce and cornstarch.<br>2. Prepare sauce: vinegar, soy sauce, sugar, cornstarch, water.<br>3. Flash-fry chilies and peanuts.<br>4. Stir-fry chicken until white.<br>5. Combine all with sauce, toss until glossy.',
          eatingGuide: '<b>Eat it immediately — it waits for no one.</b> Kung Pao Chicken loses its "wok hei" (镬气, breath of the wok) within 5 minutes. The peanuts should still have a slight crunch. Pick out the dried chilies — they\'re for flavoring the oil, not eating whole. The ideal bite has chicken, a peanut, and a sliver of scallion all in one mouthful.',
          culturalCode: '<b>Why it matters beyond taste:</b> This is the most successfully exported Sichuan dish globally, but the version you get abroad is heavily westernized — sweet, mild, almost no Sichuan peppercorns. The original has 20+ dried chilies and a numbing, not sweet, profile. Its global journey mirrors the story of Chinese immigration: from railroad workers in the 1800s to suburban takeout joints today.',
          honestTalk: '<b>Most foreigners have never had real Kung Pao Chicken.</b> The American version is sweet stir-fry with a few chili flakes — a completely different dish. Real Sichuan kung pao will make your lips go numb, and that\'s the whole point. If you order it in Chengdu and get a thick, sweet sauce, you\'re in a tourist trap. The best kung pao is served at small, crowded restaurants where the chef is visible through the kitchen window.',
        },
        {
          name: 'Sichuan Hotpot',
          image: 'images/sichuan-hotpot-1.jpg',
          tags: ['Iconic', 'Communal'],
          description: 'A communal dining experience centered around a pot of simmering, chili-laced broth. Diners cook raw ingredients tableside — from thin-sliced beef to tripe, lotus root, and tofu skin.',
          history: 'Roots trace to Jialing River boatmen of the Ming/Qing era who cooked offal in spicy broth. Modern Sichuan hotpot emerged in Chongqing in the early 1900s and spread nationwide by the 1990s.',
          method: '1. Prepare broth: beef tallow, chili, Sichuan pepper, fermented beans, spices.<br>2. Slice ingredients thinly.<br>3. Bring broth to rolling boil.<br>4. Dip and cook ingredients briefly.<br>5. Dip in sesame oil with garlic and cilantro.',
          eatingGuide: '<b>The dipping sauce is not optional.</b> Mix sesame oil + crushed garlic + cilantro + a spoonful of the broth. That\'s the classic Chengdu combo. Never dip your used chopsticks into the shared pot — use the serving chopsticks (公筷). Cooking times: tripe 15 seconds (any longer and it\'s rubber), beef 30 seconds, veggies 2 minutes, tofu just to warm through. Start with mild ingredients before meat to let the broth develop flavor.',
          culturalCode: '<b>Hotpot is the most social meal in Chinese culture.</b> The round table, the shared bubbling pot, the chaos of everyone cooking at their own pace — it\'s a metaphor for Chinese family life. In Sichuan, hotpot isn\'t just food; it\'s a ritual. People don\'t say "let\'s go eat hotpot" to mean a quick meal — they mean a 2-hour bonding session with good friends and cold beer. The spicier the pot, the closer the friendship.',
          honestTalk: '<b>The "mild" broth at Sichuan hotpot places is still very spicy by Western standards.</b> If you can\'t handle heat, order a yuanyang (鸳鸯) pot — split broth, half spicy, half clear chicken broth. The oil-based broth is NOT soup — don\'t drink it. The sesame oil dipping sauce isn\'t for flavor; it cools the spice and protects your stomach lining. Your clothes will smell like hotpot for at least two days after. Accept it. And yes, the bathroom line at a hotpot restaurant at 9 PM on a Saturday tells you everything about Chengdu\'s food culture.',
        },
        {
          name: 'Jiangyou Braised Pork Intestine',
          tags: ['Challenge', 'Spicy'],
          image: 'images/jiangyou-feichang-1.jpg',
          description: 'A legendary Sichuan dish from Jiangyou County, featuring pork intestines braised to tender perfection in a rich, spicy sauce. Chewy, bold, and definitely NOT for everyone. Dare to take the ultimate Sichuan challenge?',
          history: 'Originated in Jiangyou (modern-day Mianyang) during the Qing Dynasty, when local butchers simmered leftover pork offal with chili and spices to make a hearty, affordable meal. By the Republican era, it had grown into a beloved street food sold at market stalls. In the 1970s, state-run restaurants standardized the recipe for mass production. The 1980s saw a revival as small private eateries brought back family recipes with unique twists, cementing its status as Jiangyou\'s culinary icon and a Sichuan food heritage dish.',
          method: '1. Thoroughly clean the intestines by scrubbing with flour and salt, then rinse and blanch in boiling water.<br>2. In a wok, heat oil and sauté ginger, garlic, doubanjiang (fermented broad bean paste), and dried red chilies until the oil turns red and fragrant.<br>3. Add the intestine pieces, splash in cooking wine and soy sauce, toss in star anise and cinnamon, and stir-fry briefly.<br>4. Pour in enough boiling water to cover the intestines, bring to a boil, then reduce heat and simmer gently for 1.5 hours until fork-tender.<br>5. Turn up the heat and reduce the sauce until thick and glossy; garnish with fresh cilantro and scallions before serving.',
          eatingGuide: '<b>Chew thoroughly — this is not a delicate bite.</b> Pork intestine is inherently bouncy. The first mouthful might surprise you; that\'s normal. Eat it with a big scoop of rice — the sauce is the real star here, so spoon it generously over the grains. If you\'re a first-timer, start by eating the sauce and rice to acclimate to the flavor profile before tackling the intestine itself.',
          culturalCode: '<b>This dish embodies the Chinese philosophy of "waste nothing" (物尽其用).</b> Every part of the animal is cooked deliberately and with skill. Across China, offal dishes are a test of a chef\'s ability: can you transform the parts others discard into something people crave? In Sichuan, the best chefs aren\'t judged by how they handle premium cuts, but by how they elevate humble ingredients.',
          honestTalk: '<b>Pork intestine is not for everyone, and that\'s OK.</b> It has a distinct mineral flavor and a texture that many Westerners find challenging — bouncy, almost rubbery, with a slight chew that takes getting used to. Even many Chinese people don\'t eat it. If you\'re trying it, commit to at least three bites; the first bite is mostly psychological. And a critical warning: if the intestine isn\'t cleaned perfectly (which requires serious skill), it tastes exactly like you\'d imagine uncleaned intestine would taste. Go to reputable places only.',
        },
        {
          name: 'Husband and Wife Lung Slice (Fuqi Feipian)',
          image: 'images/fuqi-feipian-1.jpg',
          tags: ['Challenge', 'Classic'],
          description: 'Thin slices of beef, beef tripe, and offal in a numbing chili oil dressing. The name sounds wild — but the flavor is unforgettable. Brave hearts only.',
          history: 'Created in the 1930s by Guo Zhaohua and his wife in Chengdu. Despite the alarming name (no literal lungs are used), it became a cold dish staple across Sichuan. The name comes from the original vendors being a husband-wife team.',
          method: '1. Boil beef shank, tripe, and tongue until tender, chill and slice paper-thin.<br>2. Prepare dressing: chili oil, Sichuan peppercorn oil, soy sauce, vinegar, sugar, crushed garlic.<br>3. Arrange slices, drizzle dressing, top with crushed peanuts and cilantro.<br>4. Serve cold.',
          eatingGuide: '<b>Mix it thoroughly before eating.</b> The dressing settles at the bottom — every slice needs to be coated in that red oil. The tripe with honeycomb texture is the best part. Eat it as a cold appetizer with beer. It\'s served at room temperature or chilled, never hot. Pro tip: at a Sichuan banquet, this dish arrives early — pace yourself, it\'s meant to last through several rounds of drinks.',
          culturalCode: '<b>This is one of the most misleadingly named dishes in Chinese cuisine.</b> No lungs. No husband-wife requirement to eat it. The name reveals something deeper about Chinese food culture: names are often poetic, deliberately provocative, and always have a story behind them. The dish itself is a masterpiece of cold cooking — it requires no heat, just perfect knife work and seasoning ratios. In Sichuan, a chef\'s reputation is built on their cold dish (凉菜) skills as much as their hot wok work.',
          honestTalk: '<b>The name scares off more foreigners than the actual ingredients.</b> There\'s nothing weird in this dish — it\'s essentially dressed cold cuts with Sichuan spices, no different from Italian bresaola or German cold meat platter. The "lung" is a historical translation error from the 1930s that stuck. If you\'ve ever had deli meat, you can handle this. It\'s probably the safest "exotic" dish on this list to try. That said, some versions use beef tongue, which has a distinct texture — stick to the tripe and shank slices if you\'re cautious.',
        },
        {
          name: 'Rabbit Head (Tu Tou)',
          image: 'images/rabbit-head-1.jpg',
          tags: ['Challenge', 'Snack'],
          description: 'Sichuan\'s most controversial street snack — a whole rabbit head, spiced and braised. Intense flavor, hands-on eating. Not for the faint of heart.',
          history: 'A specialty of the "Rabbit Capital" of China — Sichuan consumes over 300 million rabbits annually. Rabbit head braised in spicy broth became a late-night street food staple in Chengdu in the 1990s.',
          method: '1. Clean rabbit heads thoroughly, blanch to remove impurities.<br>2. Braise in spiced broth (star anise, cinnamon, Sichuan pepper, dried chili, doubanjiang) for 45 minutes.<br>3. Let cool in broth to absorb flavor.<br>4. Serve with extra chili powder and Sichuan pepper on the side.',
          eatingGuide: '<b>You eat it with your hands. There is no polite way.</b> Start from the cheek — the meatiest, most rewarding part. Then the tongue (a single, satisfying morsel). Then the brain (tiny, creamy, for the brave). Work around the skull piece by piece. This is not a meal; it\'s a process — meant to be consumed over an hour with beer, not wolfed down in five minutes. Each head yields maybe 20 grams of actual meat.',
          culturalCode: '<b>Why 300 million rabbits a year in Sichuan?</b> It\'s not random. Sichuan\'s humid climate is ideal for rabbit farming, and rabbits reproduce fast. But rabbit head isn\'t about nutrition — it\'s about the act of eating itself. In Chinese food culture, there\'s a category called "消遣食品" (time-pass food) — dishes that take time to eat, that occupy your hands and engage your full attention. Rabbit head is the king of time-pass foods. It\'s social eating at its most primal.',
          honestTalk: '<b>This is the dish that separates adventurous eaters from the rest.</b> The honest truth: a rabbit head has very little meat — mostly bones, cartilage, and the satisfaction of extracting tiny morsels. The flavor of the braising liquid is excellent, but the effort-to-reward ratio is debatable. Some foreigners love it for the experience; others try it once and never again. If the full head is too much, order "rabbit legs" (兔腿) instead — same flavor, way more meat, zero existential crisis. CNN reporters who tried it in Chengdu were "initially apprehensive but ultimately won over by the complex flavors."',
        },
        {
          name: 'Grilled Brain Flower (Kao Nao Hua)',
          image: 'images/kao-nao-hua-1.jpg',
          tags: ['Challenge', 'Street Food'],
          description: 'Silky, creamy pig brain grilled on a skewer with chili, cumin, and Sichuan pepper. An acquired taste — but fans call it the ultimate late-night indulgence. Dare to try?',
          history: 'Emerged as a late-night street food in Chengdu in the 2000s, paired with beer and skewers. It reflects Sichuan\'s "eat everything" food culture and the philosophy of wasting nothing.',
          method: '1. Clean fresh pig brain, remove membranes, keep whole.<br>2. Marinate briefly in Shaoxing wine and ginger.<br>3. Grill on skewer over charcoal, brush with chili oil, cumin, and Sichuan pepper mix.<br>4. Serve hot, eat with a spoon.',
          eatingGuide: '<b>Eat it with a small spoon, like a custard.</b> The texture is the whole point — silky, creamy, almost mousse-like. Don\'t chew; press it against the roof of your mouth to let it dissolve. It\'s served hot, straight off the charcoal — let it cool for 30 seconds first. Pair with a cold beer. One skewer is enough for a first try; it\'s surprisingly rich.',
          culturalCode: '<b>Brain as food spans cultures worldwide — French cervelle, Mexican sesos, Sichuan kao nao hua.</b> In Sichuan, it follows the "eat everything" philosophy and the belief that eating organ meats nourishes corresponding organs (以形补形). What makes the Sichuan version unique is the heavy spice treatment — the chili and cumin don\'t just season the brain; they transform it into something that even people who "don\'t like the idea of eating brain" can enjoy.',
          honestTalk: '<b>If you\'re squeamish, don\'t look at your skewer too closely before eating.</b> The brain retains its shape on the skewer, which puts many people off. The flavor, however, is surprisingly mild — much milder than you\'d expect. It mostly tastes like the spices it\'s grilled with. The texture is the real challenge: if you can handle silken tofu, you can handle brain. But if you\'re not sure, split one skewer with a friend first. And yes, grilled brain is genuinely delicious — there\'s a reason it\'s survived as street food for two decades.',
        },
        {
          name: 'Dan Dan Noodles',
          image: 'images/dan-dan-noodles-1.jpg',
          tags: ['Classic', 'Street Food'],
          description: 'Chengdu\'s iconic street noodles — thin wheat noodles topped with a spicy, numbing sauce of preserved vegetables, chili oil, Sichuan peppercorns, and minced pork. Originally carried by pole-bearing street vendors (dan dan).',
          history: 'Originated in the early 20th century in Chengdu. Vendors carried noodles and stove on a shoulder pole (dan dan) and stopped to cook a bowl for passersby. It became a UNESCO-recognized intangible cultural heritage dish in 2024.',
          method: '1. Make sauce base: chili oil, Sichuan peppercorn powder, soy sauce, black vinegar, sugar, minced garlic.<br>2. Cook thin noodles, drain, place in bowl.<br>3. Top with sauce, minced pork stir-fried with ya cai (preserved vegetable), cilantro, peanut powder.<br>4. Mix thoroughly before eating.',
          eatingGuide: '<b>Mix it fast and thoroughly.</b> The sauce is at the bottom and the noodles will clump if you wait. Every strand needs to be coated. Eat it immediately — standing at the stall is part of the experience if that\'s how it\'s served. The portion is intentionally small; it\'s a snack (小吃), not a main course. In Chengdu, people order 2-3 bowls in one sitting if they\'re hungry.',
          culturalCode: '<b>One of the few Chinese dishes recognized by UNESCO as intangible cultural heritage (2024).</b> The "dan dan" carrying pole method — one basket for noodles, one for the stove — shows the ingenuity of Chinese street vendors who turned a simple survival job into culinary art. Today the shoulder pole is gone, but the dish remains as a direct connection to Chengdu\'s street food past. It\'s fast food, Chinese style: made in 2 minutes, eaten in 5, remembered for a lifetime.',
          honestTalk: '<b>Most dan dan noodles outside Sichuan are wrong.</b> The real version is dry (no soup) with a thick, clinging sauce. That soupy version you see in Western Chinese restaurants? It\'s a mutation that doesn\'t exist in Chengdu. The key ingredient that makes it authentic is "芽菜" (ya cai, preserved Sichuan vegetable) — it\'s almost impossible to find outside China, which is why the abroad version never tastes right. When in Chengdu, order it at a street stall, watch the vendor mix it by hand, and eat it within 60 seconds of serving.',
        },
        {
          name: 'Sliced Fish in Hot Chili Oil (Shui Zhu Yu)',
          image: 'images/shui-zhu-yu-1.jpg',
          tags: ['Spicy', 'Signature'],
          description: 'Tender fish fillets poached in mild broth, then smothered in hot chili oil with dried chilies and Sichuan peppercorns. The oil is for aroma, not for drinking — scoop it aside and enjoy the fish.',
          history: 'A modern Sichuan classic from the 1980s, created by chef Fan Jun in Chongqing. It revolutionized "fish cooking" in Sichuan cuisine, combining the numbing-spicy flavor with delicate white fish.',
          method: '1. Marinate fish fillets (carp or catfish) in egg white and cornstarch.<br>2. Poach fillets gently in light broth, transfer to serving bowl.<br>3. Top with dried chilies, Sichuan peppercorns, garlic, scallions.<br>4. Pour smoking-hot oil over toppings to release aroma. Serve immediately.',
          eatingGuide: '<b>Fish first, then the vegetables, then leave the oil.</b> The top layer of chili oil is for aroma and heat insulation — scoop it aside, don\'t eat through it. The fish should be incredibly tender; if it\'s rubbery, it\'s been overcooked. Save a spoonful of that chili-flake-laced oil to drizzle over your rice — it\'s a bonus meal in itself.',
          culturalCode: '<b>Shui Zhu Yu is a modern Sichuan classic — only about 40 years old.</b> Before the 1980s, fish in Sichuan was always cooked with less aggressive seasonings. Chef Fan Jun\'s innovation broke that tradition completely. The dish symbolizes the evolution of Sichuan cuisine in modern China: unafraid to break rules, bold in execution, and purely focused on flavor delivery. It\'s also the textbook example of the Sichuan principle "油而不腻" (oily but not greasy) — the oil carries flavor but doesn\'t feel heavy when done right.',
          honestTalk: '<b>The amount of oil is shocking, even by Chinese standards.</b> A proper shui zhu yu has a 2cm layer of chili oil floating on top. That\'s normal, not a mistake. The good news: the fish itself is not spicy — the spice is all in the oil layer and the dried chilies on top. So if you\'re nervous, gently push the top oil aside and scoop fish from underneath. Warning: whole Sichuan peppercorns hide in the oil like little flavor grenades — one surprise bite can ruin the next 30 seconds. Chew carefully.',
        },
        {
          name: 'Kaishui Baicai (Boiled Cabbage in Supreme Broth)',
          image: 'images/kaishui-baicai.jpg',
          tags: ['Classic', 'National Banquet'],
          description: 'Perhaps the most deceptive dish in all of Sichuan cuisine. What looks like plain cabbage in clear water is actually the pinnacle of Sichuan\'s clear-soup technique — a masterwork that shatters the stereotype that Sichuan is only about spice. Tender cabbage hearts bathed in a crystal-clear, impossibly flavorful broth made from hours of careful preparation.',
          history: 'Created in the late Qing Dynasty by legendary Sichuan chef Huang Jinglin. At a time when Sichuan cuisine was dominated by bold flavors, Huang wanted to demonstrate its versatility. Drawing inspiration from imperial court cooking techniques, he developed this elegantly clear dish. It was so well-received that it entered the imperial palace kitchens. Later refined by generations of master chefs, it became a signature dish on China\'s state banquet menus — served to visiting foreign dignitaries.',
          method: '1. Prepare the "supreme broth": combine old hen chicken, old duck, pork ribs, Jinhua ham, and dried scallops. Simmer on low heat for 6+ hours to create a rich base stock.<br>2. Pound chicken breast and lean pork into a fine paste (meat "velvet").<br>3. Slowly stir portions of the meat velvet into the warm stock — it attracts and absorbs fats and impurities. Repeat and strain several times until the broth is completely clear, resembling plain water.<br>4. Select only the pale yellow innermost leaves of napa cabbage. Trim, blanch briefly, then plunge into ice water to lock in color and crunch.<br>5. Arrange cabbage hearts in a porcelain bowl, pour in the hot clear broth, steam for 10 minutes until the cabbage absorbs the soup\'s essence.',
          eatingGuide: '<b>Drink the broth first, then eat the cabbage.</b> Don\'t add anything — no salt, no chili, nothing. The entire point of this dish is purity. Take a spoonful of the "clear water" — you\'ll be shocked by the depth of flavor. It\'s savory, complex, and lingers on the palate without any heaviness. Then the cabbage: crisp, sweet, soaked in the essence of the broth. <b>Pro tip:</b> the temperature matters — it should be served piping hot. If it\'s lukewarm, the magic diminishes significantly.',
          culturalCode: '<b>This dish single-handedly proves that Sichuan is more than just "mala" (numbing-spicy).</b> The "one dish, one style; a hundred dishes, a hundred flavors" philosophy of Sichuan cuisine is often lost on outsiders who think everything is covered in chili oil. Kaishui Baicai represents the yin to mala\'s yang — restraint after excess, clarity after intensity. It\'s also a story of chefs pushing boundaries: Huang Jinglin created it to prove that Sichuan chefs could master the most refined imperial techniques, not just street-level robust flavors.',
          honestTalk: '<b>The honest truth:</b> This dish is almost impossible to find outside of high-end banquet settings. The broth takes 6+ hours of active attention and the meat-velvet clarification technique is labor-intensive. Most "kaishui baicai" you\'ll encounter in ordinary Chengdu restaurants is a simplified version — good, but not the real thing. If you want to taste the authentic version, you need to go to a top-tier Sichuan restaurant or a state banquet. And yes, it looks like a bowl of hot water with cabbage — that\'s the whole point. The deception is the art.',
        },
        {
          name: 'San Da Pao (Three Cannons — Chengdu\'s Loudest Snack)',
          image: 'images/san-dapao.jpg',
          tags: ['Street Food', 'Intangible Heritage'],
          description: 'A performance disguised as a snack. Three sticky glutinous rice balls are thrown with force against a wooden board fitted with brass plates — producing three explosive "BANG — BANG — BANG" sounds like cannon fire. The rice balls bounce into a tray of toasted soybean flour, are rolled in the powder, then served with brown sugar syrup and sesame. It\'s the only Chinese snack that announces its own arrival.',
          history: 'Originated about 100 years ago (1910-1920s) at the Qingyang Palace Flower Fair, Chengdu\'s largest temple fair. The creator was a street vendor named Li Hongxing who sold sticky rice cakes. Competition was fierce, so he devised a gimmick: he threw three rice balls at a wooden board fitted with brass discs, producing three loud "clangs" — named Iron Cannon, Artillery Cannon, and Rifle Cannon. The noise drew huge crowds and made his stall famous overnight. It was named one of Chengdu\'s Top Snacks in 1990 and listed as a Chengdu Intangible Cultural Heritage item in 2010.',
          method: '1. Soak round glutinous rice in cold water for 12+ hours until it crushes easily between fingers.<br>2. Steam rice for 30-40 minutes on cheesecloth, sprinkling boiling water twice to prevent dryness.<br>3. Pound hot steamed rice with a wooden mallet for 10-15 minutes until sticky, stretchy, with slight grain texture remaining.<br>4. Roast soybeans until fragrant and golden, grind into fine powder.<br>5. Prepare brown sugar syrup: brown sugar + water, simmer until thick and glossy.<br>6. To serve: set up the board with brass plates facing the soybean flour tray. Tear off three uniform balls from the hot rice cake. Throw each one forcefully at the brass plates — three bangs. The balls ricochet into the soybean flour, coating evenly.',
          eatingGuide: '<b>Eat it immediately while warm.</b> The sequence: pick up a soybean-coated rice ball (it\'s hot, be careful), dip it in the brown sugar syrup, take a bite. The outer layer is nutty and dry from the soybean flour; the inside is soft, warm, and chewy; the syrup adds caramel sweetness. <b>The perfect pairing:</strong> a cup of bitter aged tea (老荫茶 or 老鹰茶) — the bitterness cuts the sweetness perfectly. The three balls are meant to be eaten one after another, not shared — this is a snack of indulgence.',
          culturalCode: '<b>San Da Pao is the ultimate example of "auditory marketing" in Chinese street food.</b> Before digital advertising, street vendors needed creative ways to stand out. Li Hongxing\'s "three cannons" was pure genius — everyone within 200 meters heard the bangs and came running. It represents the carnival spirit of Qingyang Palace Fair, the biggest temple fair in western Sichuan. Along with Zhang\'s Cold Noodles and Sugar Oil Fruits, it was known as one of the "Three Kings of Fair Snacks." The snack is inseparable from the fair experience — eating it elsewhere is just not the same.',
          honestTalk: '<b>The honest truth:</b> San Da Pao is more about the experience than the taste. The rice ball itself is simply glutinous rice — not particularly flavorful. The magic is in the auditory performance, the fresh soybean flour, and the nostalgia. If you judge it purely on flavor, it\'s just sweet sticky rice. But if you judge it on the whole package — the bang, the scent of roasted soy, the warm chewiness, the brown sugar — it\'s unforgettable. Look for it at temple fairs or traditional snack streets in Chengdu, not fancy restaurants. And don\'t expect it to travel well — it needs to be eaten within minutes of being "fired."',
      ],
    },
    {
      id: 'sichuan-002',
      date: 'June 1, 2026',
      region: 'Sichuan · Leshan',
      dishes: [
        {
          name: 'Leshan Sweet Glazed Duck (Tianpi Ya)',
          image: 'images/tianpi-ya.jpg',
          tags: ['Signature', 'Sweet-Savory'],
          description: 'A whole duck brined with Sichuan spices, air-dried, brushed with maltose syrup, then deep-fried until the skin transforms into a glossy, caramelized amber. The crackling-sweet exterior gives way to tender, spice-infused meat — a perfect balance of sweet and savory that defines Leshan\'s culinary identity.',
          history: 'Originated in Leshan, Sichuan during the Qing Dynasty, inspired by traditional "Zhangcha Duck" smoking techniques. Local chefs replaced the smoking step with maltose glazing and deep-frying, creating a uniquely crispy-sweet skin. Today it is Leshan\'s most famous dish — locals say "a trip to Leshan without Sweet Glazed Duck is no trip at all."',
          method: '1. Clean duck, marinate overnight with salt, Sichuan pepper, ginger, star anise.<br>2. Blanch briefly in boiling water, air-dry 4-6 hours until skin tightens.<br>3. Brush evenly with maltose syrup.<br>4. Deep-fry in 160°C oil, basting constantly until skin turns golden-amber and crisp.<br>5. Drain, chop into bite-sized pieces, serve warm.',
          eatingGuide: '<b>How to eat it:</b> Sweet Glazed Duck is typically served as a cold appetizer — it\'s already fully cooked and delicious at room temperature. Pick up a piece with your fingers (yes, it\'s finger food!) or chopsticks. The ideal bite has crispy skin + tender meat + a touch of the rendered fat. <b>Pro tip:</b> ask for the "leg quarter" (tui) if you want the meatiest pieces, or the "wing section" (chi) for max crispy skin. The skin loses its crunch within 2 hours of cooking, so eat it fresh. Many locals save the carcass to make a broth the next day.',
          culturalCode: '<b>Why this dish matters beyond taste:</b> Leshan sits at the confluence of the Min, Dadu, and Qingyi Rivers — historically one of Sichuan\'s busiest inland ports. The abundance of ducks (river trade byproduct) and sugar (Sichuan was a major cane sugar producer) created the perfect conditions for this dish. Unlike Peking Duck (an imperial court dish served with delicate pancakes), Tianpi Ya is a "people\'s duck" — born from riverside ingenuity, not palace kitchens. The use of maltose glazing instead of smoking reflects Sichuan\'s culinary philosophy: bold, unapologetic flavors served without ceremony.',
          honestTalk: '<b>The honest truth:</b> Sweet Glazed Duck is spectacular when fresh, but mediocre after sitting too long. If you buy it as takeaway and eat it 2+ hours later, the skin will be soft and chewy, not crispy — you\'ll wonder what the hype is about. Also, it\'s genuinely rich: half a duck feeds two people easily. Some Western tourists find it "too sweet for a savory dish" — if that sounds like you, order it with a side of fresh vegetables or a cold beer to cut through the richness. And the best place to eat it? Not a restaurant — look for the small shops with ducks hanging in the window, frying fresh batches throughout the day.',
        },
        {
          name: 'Bobo Chicken',
          image: 'images/bobo-chicken.jpg',
          tags: ['Cold', 'Spicy-Numbing'],
          description: 'Cold skewers of chicken, tripe, duck tongue, lotus root, and vegetables steeped in a chilled broth of chili oil, Sichuan pepper, sesame, and aromatics. "Bobo" means earthenware pot in Sichuan dialect — the vessel that holds this intensely flavored, numbing-spicy cold treat.',
          history: 'Dating to the Qing Dynasty in Leshan, created by a chef surnamed Bo. Unlike Chengdu\'s hot skewers, Bobo Chicken is served cold — the longer the skewers steep, the deeper the flavor penetrates. A beloved street snack, sold from bamboo baskets by roadside vendors carrying signature ceramic pots.',
          method: '1. Poach whole chicken in ginger-scallion water until just cooked.<br>2. Prepare chilled broth: chicken stock, chili oil, ground Sichuan pepper, sesame paste, garlic, sugar, five-spice powder.<br>3. Cool broth completely and refrigerate.<br>4. Skewer chicken pieces, tripe, duck tongue, lotus root, potato slices.<br>5. Submerge skewers in cold broth for at least 1 hour before serving.',
          eatingGuide: '<b>How to eat it:</b> Bobo Chicken is served cold — don\'t ask them to heat it up! Pick a skewer, slide the food off with your teeth (or chopsticks), and dip it in the extra chili-sesame sauce bowl if provided. The magic is in the steep time: skewers that have been sitting for 2+ hours taste dramatically better than fresh ones. <b>Pro tip:</b> order it early in your meal and let it sit while you eat other dishes. The bamboo skewers are reusable — street vendors often collect and wash them.',
          culturalCode: '<b>Why this dish matters beyond taste:</b> Bobo Chicken embodies Sichuan\'s "cold-eating" tradition, a lesser-known counterpart to the famous hotpot culture. In Sichuan\'s humid summers, cold dishes like bobo chicken offer a refreshing escape from oppressive heat — no need to hover over a boiling pot. The "bobo" (earthenware pot) itself is key: clay keeps the broth cool naturally, a pre-refrigeration innovation. This dish also reveals Sichuan\'s hierarchical snack culture — from humble bamboo-basket street vendors to upscale restaurants serving "premium bobo" with abalone and sea cucumber.',
          honestTalk: '<b>The honest truth:</b> Bobo Chicken can be shockingly spicy for first-timers. The cold broth carries the heat differently than hot soup — it sneaks up on you. If you have low spice tolerance, ask for "wei la" (微辣, mild spicy). Also, hygiene varies wildly at street stalls — go for busy ones with high turnover. The tripe and duck tongue can be chewy and texturally challenging; stick to chicken, lotus root, and potato slices if you\'re new to offal. And a local secret: the best bobo chicken isn\'t sold in restaurants — it\'s the grandmother who sets up a single pot on a street corner at dusk and sells out in 2 hours.',
        },
        {
          name: 'Leshan Qiaojiao Beef (Crossed-Leg Beef Soup)',
          image: 'images/qiaojiao-beef.jpg',
          tags: ['Soup', 'Herbal'],
          description: 'A soul-warming beef offal soup simmered with over 30 Chinese medicinal herbs. Clear golden broth, tender sliced beef and tripe, with a subtle aromatic complexity from white peony root, amomum villosum, and other traditional herbs. Light yet deeply flavorful — Leshan\'s most iconic comfort food.',
          history: 'Originated in Suji Ancient Town, Leshan during the Guangxu reign of the Qing Dynasty (over 100 years ago). Suji was a salt transport dock where boatmen and porters worked in damp, cold conditions. A local traditional Chinese medicine doctor began boiling beef bones and offal with 30+ medicinal herbs (white peony, amomum, etc.) to create a warming soup, given free to workers. Diners would cross one leg over the other on the crude wooden stools — hence the name "Crossed-Leg Beef."',
          method: '1. Split beef bones, blanch, and simmer for hours until broth is clear and rich.<br>2. Clean beef, liver, tripe and other offal; boil and slice thin.<br>3. Add herbal pouch (white peony, amomum, and 30+ herbs) to the simmering broth.<br>4. To serve: place sliced offal in a bowl, pour boiling broth over twice to warm and remove any smell, then add fresh broth.<br>5. Serve with a dipping dish of crushed chili, ground Sichuan pepper, and cilantro.',
          eatingGuide: '<b>How to eat it:</b> The authentic way is "bowl-by-bowl scalding" (wan wan tang) — each bowl is individually assembled. The clear broth lets the natural flavors shine. Take a sip of the herbal broth first — it\'s warm, soothing, and complex. Then dip the beef and tripe in the dry chili mix. The tripe should be crunchy, the beef tender, and the broth fragrant with medicinal herbs. <b>Pro tip:</b> the best part is the last mouthful of broth — all the flavors from the dipped meats have enriched it. Don\'t skip the dipping mix (干碟) — it\'s not complete without it.',
          culturalCode: '<b>Why this dish matters beyond taste:</b> Qiaojiao Beef is a living artifact of Leshan\'s salt-trade history. Suji Ancient Town was once one of the busiest salt ports on the Min River, and this dish was born from the intersection of labor, poverty, and traditional Chinese medicine. The "free soup for workers" origin makes it one of the few Chinese dishes with a genuinely charitable backstory. Its designation as Sichuan\'s "Intangible Cultural Heritage" recognizes not just the recipe, but the social history it represents — a dish that feeds both body and spirit.',
          honestTalk: '<b>The honest truth:</b> This is not a dish for people who don\'t eat offal. The traditional version uses beef tripe, liver, tongue, and other innards — if that\'s not your thing, some shops offer a "pure beef" version (纯牛肉). The herbal flavor can be subtle or strong depending on the shop; if you\'re unfamiliar with Chinese medicinal herbs, start with a small bowl. And the "crossed-leg" dining posture is real — low wooden stools force you to sit with one leg up, which locals say aids digestion. The best Qiaojiao Beef in Leshan is in Suji Ancient Town, where the original recipe is still followed.',
        },
        {
          name: 'Linjiang Shredded Eel',
          image: 'images/linjiang-shansi.jpg',
          tags: ['Fresh-Spicy', 'Intangible Heritage'],
          description: 'Fresh稻田 eels from Leshan\'s rice paddies, skillfully deboned with an ox-bone knife into perfect shreds, then quick-fried in pork fat with pickled chilies, Sichuan pepper, and local herbs. The eel shreds are silky and bouncy, coated in a complex sauce that balances spiciness with fragrant acidity. A representative of Leshan\'s "fresh-spicy" cooking style.',
          history: 'Originated in Pingxing Town (formerly Linjiang Town), Leshan during the late Qing Dynasty — over 100 years of history. Legend has it that an elderly local needed eel for medicinal purposes; his family deboned the eel with an ox-bone knife and cooked it with pickled chilies and Sichuan pepper, accidentally creating this fragrant delicacy. In 2021, it was officially listed as a Leshan Intangible Cultural Heritage item — the dish that locals reserve as the grand finale for important guests.',
          method: '1. Select live yellow eels (3-5 qian weight) from rice paddies; keep in clean water to purge.<br>2. Boil eels for 3-5 minutes until 70% cooked.<br>3. Use an ox-bone knife to make three cuts, deboning into even shreds while preserving the tender muscle texture.<br>4. Fry pickled ginger, pickled chilies, and pickled mustard greens in pork fat until fragrant.<br>5. Add the eel\'s own cooking broth, eel shreds, patchouli (huoxiang), and Chinese toon (xiangchun).<br>6. High-heat quick-stir until the sauce coats every shred.',
          eatingGuide: '<b>How to eat it in three steps:</b> First, slurp the eel shreds — silky, bouncy, each strand coated in the spicy-sour sauce. Second, crunch the crispy fried eel bones — dusted with flour and deep-fried until crackling. Third, mix the remaining sauce with fresh hand-pulled noodles — the spicy broth coating every strand is the real finale. <b>Pro tip:</b> the best texture comes from live eels prepared on the spot. If a restaurant doesn\'t have live eels in the tank, skip it. The dish should taste "fresh-spicy" (鲜辣), not "heavy-spicy" (重辣) — the eel\'s natural sweetness should come through.',
          culturalCode: '<b>Why this dish matters beyond taste:</b> Linjiang Eel represents Leshan\'s unique "fresh-spicy" (鲜辣) tradition, distinct from Chengdu\'s "numbing-spicy" (麻辣). The use of an ox-bone knife instead of a metal one is a culinary tradition dating back centuries — butchers believed bone doesn\'t transfer metallic flavors to the eel. The dish also showcases Leshan\'s rice-paddy ecosystem: eels raised in the same paddies that produce Leshan\'s famous rice, creating a self-contained culinary cycle.',
          honestTalk: '<b>The honest truth:</b> Eel can be texturally challenging for first-timers. It\'s soft, slippery, and has a distinct flavor — some love it immediately, others need a few tries. The crispy fried eel bones are a must-try even if you\'re squeamish — they taste like seasoned potato chips with a hint of seafood. If the thought of whole eel is too much, ask for the "shredded-only" preparation without the bone course. And this dish is genuinely spicy — not the sneaky kind, but upfront and intense. Have a cold beer ready.',
        },
        {
          name: 'Suji Fried Rice Puff Candy (Mihuatang)',
          image: 'images/suji-mihuatang.jpg',
          tags: ['Snack', 'Sweet-Crunchy'],
          description: 'A traditional Leshan sweet snack made from premium glutinous rice, puffed in pork fat and bound with maltose syrup into snowy-white blocks studded with peanuts and sesame. Each bite shatters with a crisp "crunch" that melts into sweet, nutty fragrance — like a Chinese version of crispy rice treats, but lighter and more delicate.',
          history: 'Originally called "Lard Rice Flowers" (猪油谷花), this snack originated in Suji Town, Leshan and dates back to the Ming Dynasty. In 1901 (Guangxu 27th year), artisan Zhang Jiwu perfected the recipe, and it spread to Suji in the early 20th century. Known for being "fragrant, sweet, crispy, and crunchy," it was once exported overseas. In 2009, it was listed in the Sichuan Provincial Intangible Cultural Heritage list — a century-old taste of Leshan childhood.',
          method: 'Follows over 20 traditional steps. Select premium Leshan glutinous rice, soak, steam, and sun-dry to make "yin mi" (阴米). Fry in pork lard until each grain puffs into a white flower. Separately boil white sugar and maltose into syrup, mix with puffed rice, peanuts, and sesame. Press into a mold while warm, cool, and cut into blocks. Entirely handmade, no additives.',
          eatingGuide: '<b>How to eat it:</b> Best enjoyed in your hand — bite down and listen for the "crunch." The texture should be airy but not crumbly, sweet but not cloying. Traditional way: with a cup of hot tea or coffee — the warmth softens the candy slightly and balances the sweetness. Modern way: crumble it over yogurt or bingfen (ice jelly) for a crunchy topping. <b>Pro tip:</b> fresh-made mihuatang from Suji is noticeably better — the puffed rice is still crisp and the maltose hasn\'t hardened. Avoid vacuum-packed versions sold in tourist shops; they\'re often stale.',
          culturalCode: '<b>Why this dish matters beyond taste:</b> Suji Mihuatang represents the pinnacle of Leshan\'s snack-making tradition — transforming humble ingredients (rice, lard, sugar) into something extraordinary through pure craftsmanship. The 20+ step process is a dying art; few young artisans are learning it. It\'s also a window into pre-industrial Chinese confectionery: no machines, no preservatives, just skill and patience. For older Leshan residents, the taste of mihuatang is the taste of childhood — a rare sweet treat in an era of scarcity.',
          honestTalk: '<b>The honest truth:</b> Mihuatang is very sweet. If you\'re not used to Chinese-style sweets, a single piece is enough — they\'re dense with sugar and lard flavor. The pork lard gives it a richness that vegetable oil versions can\'t replicate, but it also means it\'s not light. Freshness is everything: if the candy is hard and sticks to your teeth instead of shattering, it\'s old. The best souvenir is buying it from a small workshop in Suji Ancient Town, not a gift shop. And yes, it will leave crumbs everywhere.',
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
          eatingGuide: '<b>舀在米饭上吃，1:1比例。</b>麻婆豆腐本质上是"下饭神器"——嫩豆腐和红油就是设计来包裹每一粒米饭的。别单吃，太咸太麻。小口吃，麻味是叠加的，越吃越麻。表面那层红油是正常的——搅匀了吃，别撇掉。',
          culturalCode: '<b>不止是好吃：</b>麻婆豆腐是川菜师傅的终极考题——看起来简单，但需要7-8种调料完美搭配。它体现了川菜"百菜百味"的核心理念：最便宜的豆腐也能做成传奇。2010年入选国家级非遗，是第一批入选的菜肴之一。',
          honestTalk: '<b>正宗麻婆豆腐比你在国外吃到的油得多。</b>表面那层红油不是失误，是这道菜的灵魂。国外版本为了"健康"把油减了，也就把味道减没了。一碗米饭配麻婆豆腐，在三块钱人民币的成都街头，是你能吃到最满足的一餐。警告：红油滴到衣服上洗不掉——穿深色去吃。',
        },
        {
          name: '宫保鸡丁',
          image: 'images/kung-pao-chicken-1.jpg',
          tags: ['经典', '糊辣'],
          description: '鸡丁与花生、干辣椒、葱段同炒，甜咸酱汁包裹。得名于清朝官员丁宝桢的官衔"宫保"。',
          history: '得名于清朝四川总督丁宝桢（1820–1886），嗜好此菜。现已传遍全球，是最具国际知名度的中国菜之一。',
          method: '1. 鸡丁用酱油和淀粉腌制。<br>2. 调碗汁：醋、酱油、糖、淀粉、水。<br>3. 快炸干辣椒和花生。<br>4. 鸡丁炒变色。<br>5. 倒入碗汁翻炒至挂汁。',
          eatingGuide: '<b>上桌就吃，别等。</b>宫保鸡丁的"镬气"五分钟就散完了。花生还要脆。干辣椒是调味的——别整根吃。最完美的一口：鸡丁+花生+一小段葱。',
          culturalCode: '<b>不止是好吃：</b>宫保鸡丁是中国菜里全球化最成功的一道，但你在国外吃到的版本已经面目全非——偏甜、不麻、辣椒意思一下。正宗的宫保鸡丁有二十多个干辣椒，吃完嘴麻。这道菜的全球化历程，就是中国移民史的缩影：从1800年代的铁路工人，到今天遍布全球的中餐馆。',
          honestTalk: '<b>大多数外国人从来没吃过真正的宫保鸡丁。</b>美式宫保鸡丁就是甜炒鸡块撒点辣椒碎，完全是另一道菜。正宗的宫保会让你嘴唇发麻——那才是这道菜的意义所在。如果你在成都吃到黏糊糊甜滋滋的宫保鸡丁，你进的是游客店。最好吃的宫保鸡丁藏在那些透过厨房窗户能看到厨师颠勺的小馆子里。',
        },
        {
          name: '四川火锅',
          image: 'images/sichuan-hotpot-1.jpg',
          tags: ['标志性', '聚餐'],
          description: '以翻滚的红油锅底为核心的聚餐体验。食客将毛肚、牛肉、藕片、豆皮等食材现涮现吃。',
          history: '源自明清时期嘉陵江船工，以麻辣汤底煮内脏。现代四川火锅于1900年代初在重庆兴起，1990年代风靡全国。',
          method: '1. 謷制锅底：牛油、辣椒、花椒、豆瓣、香料。<br>2. 食材切薄片。<br>3. 汤底大火烧开。<br>4. 食材涮烫即食。<br>5. 蘸香油蒜泥香菜碟。',
          eatingGuide: '<b>蘸料不是可选的，是必需的。</b>成都经典蘸料：香油+蒜泥+香菜+一勺原汤。别把用过的筷子伸进锅里——用公筷。涮菜时间：毛肚15秒（多了就老了），牛肉30秒，蔬菜2分钟，豆腐热透就行。先涮清淡的再涮肉，让锅底先出味。',
          culturalCode: '<b>火锅是中国最有社交性的吃法。</b>圆桌、一锅翻滚的汤、各涮各的——这就是中国家庭生活的缩影。在四川，火锅不止是吃饭。人们不会说"去吃个快餐火锅"——他们说的是"今天晚上约火锅"，意味着两小时的聚会，配冰啤酒。锅越辣，交情越深。',
          honestTalk: '<b>四川火锅的"微辣"对老外来说已经非常辣了。</b>吃不了辣就点鸳鸯锅——一半红油一半清汤。那层红油不是汤——别喝。香油蘸碟不是调味的，是给辣椒降温、保护胃黏膜的。吃完火锅你的衣服会带味两天，认命吧。周末晚上九点火锅店门口的排队长度，就是成都美食文化的全部真相。',
        },
        {
          name: '江油红烧肥肠',
          tags: ['挑战', '香辣'],
          image: 'images/jiangyou-feichang-1.jpg',
          description: '江油最具代表性的地方美食，以猪大肠为主料，成菜色泽红亮、肥而不腻、口感软糯。对很多人来说这是终极挑战——敢不敢来试一下？',
          history: '起源于清朝时期，江油（今绵阳境内）屠户将剩余猪下水加入辣椒、香料红烧而成，物美价廉、深受百姓喜爱。民国时期逐渐成为街头巷尾的热门小吃。80年代个体餐饮兴起，江油肥肠名扬川内外，成为四川饮食文化的标志性符号。',
          method: '1. 肥肠翻面，用面粉和盐反复搓洗去腥去黏液，清水冲净后冷水下锅焯水捞出切段。<br>2. 热锅宽油，下姜片、蒜瓣、郫县豆瓣酱和干辣椒段，小火炒出红油和香味。<br>3. 倒入肥肠段大火翻炒，沿锅边淋入料酒去腥，加酱油上色，放入八角、桂皮等香料。<br>4. 注入足量开水没过肥肠，大火烧开转小火加盖慢炖1.5小时，至肥肠软糯入味。<br>5. 开盖大火收汁至汤汁浓稠裹住肥肠，出锅撒上香菜碎和葱花即可。',
          eatingGuide: '<b>多嚼几下再咽——这不是一口就能搞定的事。</b>肥肠天生有嚼劲，第一口可能会让你意外，正常。一定要配一大口米饭——汤汁才是真正的主角，多舀几勺淋在饭上。如果你是第一次吃，先吃汁拌饭适应味道，再去碰肥肠本身。',
          culturalCode: '<b>这道菜体现了中国"物尽其用"的哲学。</b>动物的每个部位都被认真对待、精心烹制。在中国，下水菜是对厨师水平的考验：能不能把别人不要的东西，变成让人念念不忘的美味？在四川，顶级厨师不是看他们怎么处理鲍鱼海参，而是看他们怎么对待最普通的食材。',
          honestTalk: '<b>猪大肠不是每个人都吃得来，这很正常。</b>它有一股特殊的味道，口感偏弹偏韧，很多西方人觉得难以接受。不瞒你说，很多中国人也不吃。如果你想试，至少吃三口——第一口主要是心理关。重要警告：如果清洗不到位，肥肠吃起来就是你想的那种味道。去靠谱的店吃。',
        },
        {
          name: '夫妻肺片',
          image: 'images/fuqi-feipian-1.jpg',
          tags: ['挑战', '经典'],
          description: '牛肉、牛肚、牛舌等薄切后用麻辣红油拌匀的冷盘。名字听起来很吓人——但味道让人忘不了。胆大的再来！',
          history: '1930年代由郭朝华、张田政夫妇在成都创制。虽然叫"肺片"，但实际上并不用肺，而是各种牛杂。因夫妻搭档售卖而得名，现已成为川菜冷盘的代表。',
          method: '1. 牛腱、牛肚、牛舌煮熟放凉，切成薄片。<br>2. 调红油汁：红油、花椒油、酱油、醋、糖、蒜泥。<br>3. 摆盘，淋红油汁，撒花生碎和香菜。<br>4. 冷食。',
          eatingGuide: '<b>吃之前彻底拌匀——酱汁沉在盘底。</b>每片肉都要裹上红油才够味。蜂窝状的毛肚口感最好。作为冷盘佐酒最佳。川菜宴席上这道菜上得早——悠着点吃，它要配好几轮酒的。',
          culturalCode: '<b>这是中国菜里名字最误导人的一道。</b>没肺。没有夫妻才能吃的限制。但名字透露了更深层的饮食文化：中国菜名常常是诗意的、故意引人注意的，背后一定有故事。这道菜是冷菜艺术的巅峰——不需要火，全靠刀工和调味。在四川，厨师看凉菜功夫和看热菜功夫一样重要。',
          honestTalk: '<b>名字吓跑的人比食材本身多得多。</b>这道菜里没有奇怪的东西——就是调味过的冷切肉，跟意大利的bresaola或德国的冷肉盘没啥区别。"肺片"二字是1930年代翻译错误的遗迹，将错就错叫到今天。如果你吃过卤肉，你就能吃夫妻肺片。它是这份清单里最安全的"异域"菜。不过有些版本用牛舌，口感较特别——保守的话先吃毛肚和牛腱。',
        },
        {
          name: '兔头',
          image: 'images/rabbit-head-1.jpg',
          tags: ['挑战', '小吃'],
          description: '四川最具争议的街头小吃——整只兔头，香料卤制。味道浓烈，需要动手啃。胆小的请绕道。',
          history: '四川是中国"兔肉之都"，每年消耗超过3亿只兔子。兔头卤制起源于1990年代成都的夜市文化，现已成为四川夜宵的标志性小吃。',
          method: '1. 兔头彻底清洗，焯水去腥。<br>2. 放入卤汤（八角、桂皮、花椒、干辣椒、郫县豆瓣）卤45分钟。<br>3. 在卤汤中浸泡入味。<br>4. 出锅，配辣椒粉和花椒粉上桌。',
          eatingGuide: '<b>直接上手啃——没有优雅的吃法。</b>先吃脸颊肉（最多肉的部分），再吃舌头（一小条，但很满足），最后是脑花（一点点，胆子大再试）。顺着骨头一块块拆。这不是一顿饭，是一个过程——配着啤酒慢慢啃一个小时。一个兔头能啃出来的肉大概20克。',
          culturalCode: '<b>四川一年吃掉三亿只兔子不是偶然。</b>四川潮湿的气候非常适合养兔，兔子繁殖又快。但啃兔头不是为了吃肉——它属于"消遣食品"，花时间吃、占着手、让你全神贯注。兔头是消遣食品之王——最原始、最社交的吃法。',
          honestTalk: '<b>这道菜是"冒险食客"的分水岭。</b>实话实说：一个兔头没多少肉——主要是骨头、软骨，和一点点掏出来的满足感。卤水的味道很好，但付出和回报的比例见仁见智。有些外国人爱的是这个体验本身；更多人试一次就够了。如果整只兔头压力太大，点"兔腿"——同样的味道，肉多得多，没有道德困境。CNN记者在成都试过兔头后说："一开始很抗拒，但最终被复杂的味道征服了。"',
        },
        {
          name: '烤脑花',
          image: 'images/kao-nao-hua-1.jpg',
          tags: ['挑战', '夜宵'],
          description: '猪脑花串在铁签上炭烤，辣椒、孜然、花椒抹满。口感如奶油般丝滑——爱吃的人欲罢不能，不敢吃的看着就怕。你敢吗？',
          history: '兴起于2000年代成都的夜宵摊，配啤酒和烧烤串。体现了四川"万物可食"的饮食文化和杜绝浪费的哲学。',
          method: '1. 新鲜猪脑花洗净，去膜，保持完整。<br>2. 用绍兴酒和姜片腌制片刻。<br>3. 串在铁签上，炭火烤制，刷辣椒油、撒孜然和花椒粉。<br>4. 热食，用勺子挖着吃。',
          eatingGuide: '<b>用小勺子挖着吃，像吃蒸蛋一样。</b>口感是这道菜的终极意义——丝滑、绵密、像慕斯。别嚼——用上颚抿开，让它自己化掉。刚从炭火上拿下来很烫，晾30秒再吃。配冰啤酒。第一次试一串就够了，比看起来腻。',
          culturalCode: '<b>吃脑子这件事，全世界都有传统。</b>法国的cervelle、墨西哥的sesos、四川的烤脑花。在四川，这既是"万物可食"哲学的体现，也源于"以形补形"的传统观念。川式烤脑花的独特之处在于重料调味——辣椒和孜然不只是调味，而是把脑花变成了一样"即使觉得吃脑子很吓人也能接受"的东西。',
          honestTalk: '<b>如果心里犯怵，吃之前别看签子上的形状。</b>脑花在签子上保留着完整形状，很多人看到就退缩了。但味道比你想的清淡得多——基本上就是外面那层香料的味道。真正的挑战是口感：如果你能吃嫩豆腐，你就能吃脑花。不确定的话先和朋友分一串。说真的——烤脑花能作为夜宵火二十年，不是没有道理的。',
        },
        {
          name: '担担面',
          image: 'images/dan-dan-noodles-1.jpg',
          tags: ['经典', '小吃'],
          description: '成都标志性街头面条——细面条浇上麻辣酱汁，配芽菜末、红油、花椒和肉臊。最早由挑着担子沿街叫卖的小贩创制。',
          history: '起源于20世纪初的成都，小贩肩挑担子（担担），一头是锅一头是面条，沿街现煮现卖。2024年入选联合国非遗美食名录。',
          method: '1. 制酱底：红油、花椒粉、酱油、黑醋、糖、蒜泥。<br>2. 细面条煮熟，捞入碗中。<br>3. 浇酱，铺炒好的芽菜肉臊，撒香菜和花生碎。<br>4. 拌匀后食用。',
          eatingGuide: '<b>赶紧拌匀，别等。</b>酱在碗底，面条放久了会黏。每一根面条都要裹上酱。拌好马上吃——如果在摊上吃，站着吃是仪式感的一部分。分量不大——它是"小吃"，不是正餐。成都人一顿能来两三碗。',
          culturalCode: '<b>2024年入选联合国非遗的少数中国菜品之一。</b>"担担"的挑担方式——一头面条一头灶——展现了中国街头小贩的智慧：把最简陋的谋生手段做成了烹饪艺术。现在挑担子的人没了，但这碗面还在，是成都街头饮食文化最直接的传承。中式快餐：两分钟做好，五分钟吃完，记一辈子。',
          honestTalk: '<b>四川以外的担担面，大部分都是错的。</b>正宗担担面是不带汤的——浓稠的酱汁紧紧裹着面条。你在国外中餐馆吃到的"担担面汤面"是变异品种，在成都根本不存在。灵魂调料"芽菜"几乎无法在中国以外的地方买到，所以国外的担担面永远差一味。在成都吃担担面：去街边摊，看着老板现拌，端起来60秒内吃完。',
        },
        {
          name: '水煮鱼',
          image: 'images/shui-zhu-yu-1.jpg',
          tags: ['麻辣', '招牌'],
          description: '嫩鱼片在清汤中煮熟，然后浇上滚烫的红油和干辣椒。油是用来闻香味的——把它拨到一边，专心吃鱼。',
          history: '1980年代由重庆厨师范俊创制， revolutionized 川菜做鱼的方式，将麻辣味型与细嫩白鱼完美结合。',
          method: '1. 鱼片（草鱼或鲶鱼）用蛋清和淀粉腌制。<br>2. 清汤将鱼片轻轻煮熟，捞入大碗。<br>3. 鱼片上铺干辣椒、花椒、蒜末、葱花。<br>4. 滚烫热油浇在佐料上，激发香气。立即上桌。',
          eatingGuide: '<b>先吃鱼，再吃菜，油留着别管。</b>表面那层红油是为了保温增香的——把它拨到一边，从底下夹鱼。鱼片应该嫩到用筷子一夹就断；如果发硬，说明煮老了。最后舀一勺带辣椒碎的红油浇在米饭上——那是隐藏的福利餐。',
          culturalCode: '<b>水煮鱼才40岁——川菜里的现代经典。</b>1980年代以前，川菜做鱼从来没有这么激进的调味。厨师范俊的创新完全打破了传统。这道菜象征着现代川菜的进化：不怕打破规则、手法大胆、一切为味道服务。它也是川菜"油而不腻"的最佳教材——油用得对就不是腻，而是香的载体。',
          honestTalk: '<b>这道菜的用油量连中国人看了都要愣一下。</b>正宗水煮鱼上桌时表面有2厘米厚的红油层。那是正常的，不是厨师手抖。好消息：鱼片本身不辣——辣全在油和表面的干辣椒里。如果怕辣，轻轻把上面的油拨开，从底下夹鱼。警告：整粒的花椒藏在油里面像味道地雷——不小心咬到一颗，接下来30秒没法好好吃饭。吃的时候小心点。',
        },
        {
          name: '开水白菜',
          image: 'images/kaishui-baicai.jpg',
          tags: ['国宴', '经典'],
          description: '川菜中极具代表性的经典国宴菜品，看似朴实无华，却是川菜清汤技艺的巅峰之作。开水白菜彻底打破了外界认为川菜只有麻辣的固有印象。清汤鲜醇绵长，入口温润不油腻，菜心脆嫩清甜，简约的外表下藏着极致匠心。',
          history: '诞生于清末，由知名川菜大师黄敬临创制。彼时川菜多以重口菜式为主，为展现川菜多元化的烹饪功底，黄敬临结合宫廷菜技法，精心研制出这道清鲜菜肴，一度传入清宫深得喜爱。后来经过名厨传承改良，开水白菜走入国宴舞台，成为招待中外宾客的招牌名菜。',
          method: '先将老母鸡、老鸭、猪排骨、金华火腿、干贝等食材一同入锅，全程小火慢熬六小时以上，熬出浓郁底汤。鸡胸肉、猪瘦肉剁成肉蓉，分次下入汤中，利用肉蓉吸附油脂与杂质，反复扫汤过滤数遍，最终让汤汁清澈透亮。白菜选用最中心的嫩菜心，焯水后过冰水，最后浇入滚烫清汤，入笼蒸十分钟即成。',
          eatingGuide: '<b>先喝汤，再吃菜。</b>什么都别加——不要盐不要辣椒，什么都不加。这整道菜就是"纯粹"。舀一勺"白开水"送入口——你会震惊于味道的层次感：鲜醇绵长，不油不腻。然后吃菜心：脆嫩、清甜，吸饱了汤汁的精华。<b>点菜秘籍：</b>温度很重要——必须滚烫上桌。温了这道菜就废了。真正的开水白菜在顶级川菜馆或国宴级别的餐厅才能吃到，普通饭店做的是简化版。',
          culturalCode: '<b>一道菜推翻"川菜只有麻辣"的刻板印象。</b>川菜"一菜一格，百菜百味"的理念常常被外人忽略——他们以为所有川菜都是红油辣椒。开水白菜代表了麻辣的"阴面"：浓烈之后的克制、重口味之后的清雅。黄敬临创制这道菜，是要证明川菜师傅不仅能做街头重口，也能驾驭最精深的宫廷菜技法。这是大道至简的珍馐，也是川菜底色的最好注脚。',
          honestTalk: '<b>实话实说：</b>这道菜在普通饭店几乎吃不到真版。清汤工艺要六小时以上的专注，肉蓉扫汤技术复杂且费时。你在普通成都饭店遇到的"开水白菜"大多是简化版——好吃，但不是那个东西。想吃到真的，需要去顶级川菜馆或国宴。另外，它看起来就是一碗开水泡白菜——这就是这道菜的全部要点。"骗人"本身就是艺术。',
        },
        {
          name: '三大炮',
          image: 'images/san-dapao.jpg',
          tags: ['小吃', '非遗'],
          description: '成都地地道道的本土小吃，距今约100年历史，属于"会出声、会表演"的非遗美食。三坨糯米糍粑用力摔向木案板上的铜碟子——"当——当——当"三声脆响像放炮，米团弹入豆粉簸箕，裹满黄豆粉，浇红糖浆撒芝麻。声音一响，全场回头。',
          history: '清末民初（1910-1920年间），成都青羊宫"赶花会"是川西最大庙会。小贩李洪兴卖糍粑，生意不好做。他灵机一动：把糯米糍粑分三坨，用力摔向木案板铜碟，三声脆响像放炮——铁炮、火炮、枪炮。声音一响，游客全围过来。1990年评为成都市名小吃，2010年入选成都市级非物质文化遗产。和张凉粉、糖油果子并称"花会间食之霸"。',
          method: '圆糯米冷水浸泡12小时以上，蒸30-40分钟。热糯米入石臼用力舂10-15分钟至粘稠拉丝。黄豆小火炒熟磨成细粉。红糖熬成浓稠糖浆。揪三坨热糍粑，用力摔向木案板铜碟——三响过后，糍粑弹入豆粉簸箕，裹满粉。装碗淋红糖浆，撒芝麻即成。',
          eatingGuide: '<b>趁热吃，趁热吃，趁热吃。</b>步骤：拿起裹满豆粉的糍粑团（烫，小心），蘸红糖浆，一大口。外层豆粉香、细、干香；内里糯米软糯、温热、Q弹不粘牙；红糖甜香不齁。<b>绝配：</b>配老荫茶或老鹰茶，清苦解腻，完美。三个糍粑团要连着吃，别分着——这是一个放纵的小吃时刻。<b>找它要去庙会或传统小吃街，</b>不是大饭店。它出锅后几分钟内必须吃掉，没法打包走。',
          culturalCode: '<b>三大炮是中国街头小吃"声音营销"的终极案例。</b>在没有数字广告的年代，小贩需要创意来吸引顾客。李洪兴的"三炮"是天才之举——方圆两百米内都听到那三声"当"，所有人都会跑过来看。它代表了青羊宫花会的狂欢精神，与张凉粉、糖油果子并称"花会间食之霸"。这道小吃和庙会密不可分——在其他地方吃就不是那个味了。',
          honestTalk: '<b>实话实说：</b>三大炮更多是关于体验而不是味道。糍粑本身只是糯米——谈不上特别好吃。魔力在于那几声"当"、现磨豆粉的香气、温热的嚼劲、红糖的甜——整个package才是难忘的。纯粹从味道评价，它就是甜的糯米饭。但如果你把声音、香气、温度、味道加在一起——那是难忘的。不要在高级餐厅找它。另外，它出锅几分钟内必须吃掉，不能打包。',
      ],
    },
    {
      id: 'sichuan-002',
      date: '2026年6月1日',
      region: '四川·乐山',
      dishes: [
        {
          name: '甜皮鸭',
          image: 'images/tianpi-ya.jpg',
          tags: ['招牌', '甜酥'],
          description: '乐山经典名菜，整鸭经卤制、晾干后刷上麦芽糖，入油锅炸至表皮呈琥珀色焦糖样。外皮酥脆甘甜，内里卤香浓郁、肉质细嫩。甜与咸的平衡堪称一绝，乐山人招待客人必上这道菜。',
          history: '起源于清代乐山，受传统"樟茶鸭"熏制工艺启发，当地厨师用麦芽糖挂皮代替烟熏，再以油炸代替烤制，独创了这一甜酥风味。如今已成为乐山美食名片，"到乐山不吃甜皮鸭等于没来过"是当地广为流传的说法。',
          method: '1. 全鸭洗净，用盐、花椒、姜、八角腌制过夜。<br>2. 焯水后晾干4-6小时至表皮收紧。<br>3. 均匀刷上麦芽糖。<br>4. 160°C油温炸至表皮金黄酥脆、油亮诱人。<br>5. 捞出沥油，斩件装盘，趁热食用。',
          eatingGuide: '<b>怎么吃：</b>甜皮鸭通常是冷盘上桌——已经是熟的，常温吃最佳。直接上手抓（对，它就是手抓食物！）或者用筷子夹。最完美的一口：脆皮+嫩肉+一点皮下油脂。<b>点菜秘籍：</b>想要肉多就点"腿"，想要脆皮多吃就点"翅"。出锅后2小时内皮最脆，放久了就不酥了。很多乐山人吃完会把鸭架子留着第二天熬汤。',
          culturalCode: '<b>不止是好吃：</b>乐山位于岷江、大渡河、青衣江三江汇合处，历史上是四川最重要的内河港口之一。河运发达→鸭子多（船运副产品），四川又盛产甘蔗→糖多，天时地利人和诞生了甜皮鸭。和北京烤鸭（宫廷菜，讲究仪式感）不同，甜皮鸭是"平民的鸭子"——诞生于码头边上，不讲排场只讲好吃。用麦芽糖代替烟熏，也体现了川菜的核心精神：把味道做到极致，别的都不重要。',
          honestTalk: '<b>实话实说：</b>甜皮鸭一定要吃新鲜的。打包带走两小时后再吃，皮就软了韧了，你会怀疑它为什么这么有名。另外它确实很油润——半只鸭够两个人吃，再点个凉拌黄瓜或来瓶冰啤酒平衡一下。有些游客觉得"咸的菜怎么是甜的"不太习惯——如果你也是，先点半只试试水。吃甜皮鸭最好的地方不是大餐厅，而是街边挂着鸭子、整天在炸的小店。',
        },
        {
          name: '钵钵鸡',
          image: 'images/bobo-chicken.jpg',
          tags: ['冷吃', '麻辣'],
          description: '冷食麻辣串串，鸡肉及毛肚、鸭舌、蔬菜等食材串在竹签上，浸泡在红油、花椒、芝麻、香料调制的冷汤中。吃时抽签即食，麻辣鲜香层层递进。"钵钵"指盛放的陶盆——乐山街头最受欢迎的"冷串串"。',
          history: '起源于清代乐山，由一位姓"钵"的厨师创制。最初只是简单的凉拌鸡片，后演变为串签浸泡的形式。与成都热锅串串不同，钵钵鸡是冷食，汤底越泡越入味，是乐山街头最具代表性的冷食小吃。',
          method: '1. 整鸡加姜葱水煮至刚熟，捞出放凉。<br>2. 调汤底：鸡汤+红油、花椒粉、芝麻酱、蒜泥、白糖、五香粉。<br>3. 汤底彻底放凉，入冰箱冷藏。<br>4. 食材切小块串签（鸡肉、毛肚、鸭舌、藕片、土豆等）。<br>5. 串签浸入冷汤至少1小时后食用，越泡越香。',
          eatingGuide: '<b>怎么吃：</b>钵钵鸡是冷的——千万别让老板给你加热！拿起一串，用牙齿把食物撸下来（或者用筷子夹），如果给了蘸碟就再蘸一下。秘诀在浸泡时间：泡了2小时以上的串串比刚泡的好吃太多了。<b>点菜秘籍：</b>先点钵钵鸡让它泡着，吃别的菜，最后回来吃它，味道最浓。竹签是回收利用的——街边摊主会收集清洗，放心用。',
          culturalCode: '<b>不止是好吃：</b>钵钵鸡代表了川菜里常被忽略的"冷食传统"。四川夏天湿热，冷吃的钵钵鸡比火锅舒服太多了——不用围着一锅沸汤。盛放的陶盆"钵钵"是关键：陶土能自然保持低温，这是没有冰箱时代的智慧结晶。钵钵鸡还展现了四川小吃的层级文化——从街边竹篮小贩到卖鲍鱼海参的"高端钵钵鸡"，同一种食物可以完全不同的姿态存在。',
          honestTalk: '<b>实话实说：</b>第一次吃钵钵鸡的人经常被辣到怀疑人生。冷汤的辣和热汤不同——它是慢慢上来的，等你发现已经晚了。吃不了辣就说"微辣"。街边摊的卫生参差不齐——选生意好的摊，周转快食材才新鲜。毛肚和鸭舌有嚼劲，吃不惯内脏的只吃鸡肉、藕片和土豆就好。还有一个本地秘密：最好的钵钵鸡不在大饭店——是那个黄昏时分在街角支一个摊、两小时卖光的大妈。',
        },
        {
          name: '跷脚牛肉',
          image: 'images/qiaojiao-beef.jpg',
          tags: ['汤锅', '药膳'],
          description: '跷脚牛肉发源于清代光绪年间的乐山苏稽古镇，距今已有百余年历史。以牛骨、牛杂搭配白芷、砂仁等30余味中药材慢熬成汤，汤色清亮醇厚，牛肉嫩滑，药香悠长，不燥不腻。是乐山最具烟火气的非遗美味。',
          history: '古时苏稽是盐运码头，船工、挑夫众多，因劳作寒湿易生病，当地老中医便用牛骨、牛杂搭配白芷、砂仁等30余味中药材熬汤，免费供人驱寒果腹。因摊位简陋，食客常跷起一只脚搭在凳上就餐，"跷脚牛肉"由此得名。',
          method: '做法讲究"一清二鲜三温"。先将牛骨劈开焯水，慢熬数小时至汤色清亮醇厚；再把牛肉、牛肝、毛肚等牛杂洗净煮熟切片；汤底加入中药材包同熬，去腥增香。食用时，将牛杂片入碗，浇两次滚汤去腥，再添新汤，搭配小米辣、辣椒面、香菜调制的干碟，鲜醇入味。',
          eatingGuide: '<b>怎么吃：</b>正宗吃法是"碗碗烫"——清汤底凸显本味。先喝一口药膳汤，温热醇厚，筋骨舒坦。再把牛肉毛肚蘸干碟吃，小米辣的鲜辣和药材的醇香在嘴里化开。最后一定要把碗里的汤喝完——泡过肉和蘸料的汤才是精华。<b>点菜秘籍：</b>苏稽古镇的跷脚牛肉最正宗，古法配方传了百年。不吃内脏的可以点"纯牛肉版"。',
          culturalCode: '<b>不止是好吃：</b>跷脚牛肉是乐山盐运历史的活化石。苏稽古镇曾是岷江上最繁忙的盐运码头之一，这道菜诞生于劳动、贫穷与中医的结合点。"免费给工人喝汤"的起源使它成为中国少数有慈善背景的菜肴。入选非遗认可的不仅是配方，更是它代表的社会记忆——一碗汤暖身又暖心。',
          honestTalk: '<b>实话实说：</b>这道菜的传统版本用的是牛杂——毛肚、牛肝、牛舌等，不吃内脏的话可以找"纯牛肉版"。药材味每家店浓淡不同，不熟悉中药味的先点小碗试试。那个"跷脚"的坐姿是真的——矮木凳让你只能跷着脚坐，本地人说这样助消化。<b>乐山最好吃的跷脚牛肉在苏稽古镇，</b>那里还保持着原始配方。',
        },
        {
          name: '临江鳝丝',
          image: 'images/linjiang-shansi.jpg',
          tags: ['鲜辣', '非遗'],
          description: '乐山平兴镇（原临江镇）的非遗美食，起源于清末民初，距今百年。选用3-5钱的鲜活稻田黄鳝，用牛骨刀三刀划成均匀鳝丝，加泡椒、藿香、香椿大火快烧。鳝丝嫩滑弹牙，汤汁麻辣鲜香，是乐山"鲜辣"风味的代表。',
          history: '相传古时当地老者需鳝鱼入药，家人用牛骨刀划丝去骨，加泡椒、花椒烹煮，意外成就这道鲜香名菜。2021年入选乐山市非物质文化遗产，是乐山人待客的压轴菜。',
          method: '核心是"活鲜、骨刀、原汤"。稻田黄鳝清水静养吐沙；沸水下锅煮3-5分钟至七分熟，用牛骨刀三刀划成均匀鳝丝。猪油炒香泡姜、泡椒、酸菜，加鳝鱼原汤，放入鳝丝、藿香、香椿等，大火快烧。',
          eatingGuide: '<b>三步吃法：</b>一嗦鳝丝——滑嫩弹牙，裹满汤汁入喉；二啃香酥鳝骨——裹粉油炸，酥脆化渣；三拌细面——汤汁拌手工面，麻辣够味。<b>点菜秘籍：</b>活鳝鱼现杀现做的口感最好。店里没有活鳝鱼缸的，跳过。这道菜是"鲜辣"不是"重辣"——鳝鱼本身的鲜甜应该能吃出来。',
          culturalCode: '<b>不止是好吃：</b>临江鳝丝代表了乐山特有的"鲜辣"传统，和成都的"麻辣"截然不同。用牛骨刀代替金属刀划鳝丝，是数百年的厨艺传统——屠夫们相信骨头不会把金属味传给鳝鱼。这道菜也展现了乐山的稻田生态系统：鳝鱼和乐山著名的稻米同一种植，形成了自给自足的烹饪循环。',
          honestTalk: '<b>实话实说：</b>鳝鱼对第一次吃的人来说口感很特别——软、滑、有独特的风味。有人一口就爱上，有人需要试几次。即使你有点怕，也一定要试试香酥鳝骨——味道像撒了调味料的薯片，带一点海鲜味。实在不敢吃整条鳝鱼的就点"纯鳝丝"。这道菜真的辣——不是慢慢上来的那种，是直接冲上来那种。备好冰啤酒。',
        },
        {
          name: '苏稽香油米花糖',
          image: 'images/suji-mihuatang.jpg',
          tags: ['小吃', '酥脆'],
          description: '苏稽米花糖原名"猪油谷花"，是乐山苏稽镇的百年非遗小吃。精选乐山糯米，用猪边油慢炒爆开成米花，加白糖、饴糖糖浆、花生、芝麻拌匀压实。成品色泽洁白带光泽，松泡不散，酥脆化渣不粘牙，一口回到童年。',
          history: '明代已有雏形，光绪二十七年（1901年）由张吉武改良，20世纪初传入苏稽。以"香、甜、酥、脆"闻名，曾远销海外。2009年列入四川省级非遗名录。',
          method: '古法二十余道工序。乐山糯米浸泡、蒸熟、晾干成阴米；猪边油慢炒至米粒爆开成米花；另起锅熬白糖、饴糖糖浆，加入米花、花生、芝麻拌匀；倒入模具压实，冷却后切块。全程手工，无添加剂。',
          eatingGuide: '<b>怎么吃：</b>直接嚼——咔嚓脆响，米香、芝麻香、花生香交融，清甜不腻。传统吃法：配热茶或咖啡，解腻又暖胃。现代吃法：掰碎拌酸奶、冰粉，增添酥脆口感。百年传承，是乐山人走亲访友的伴手礼，也是老乐山记忆里的甜香。<b>点菜秘籍：</b>苏稽古镇现做的米花糖明显更好吃——米花还酥脆，饴糖没硬化。旅游商店真空包装的通常不新鲜。',
          culturalCode: '<b>不止是好吃：</b>苏稽米花糖代表了乐山糕点制作的顶尖水平——把最普通的食材（米、猪油、糖）通过纯手工做成惊艳。二十多道工序是正在失传的手艺，很少有年轻人愿意学。它也是中国工业化前糖果工艺的窗口：没有机器、没有添加剂，只有手艺和耐心。对老乐山人来说，米花糖的味道就是童年的味道。',
          honestTalk: '<b>实话实说：</b>米花糖非常甜。不太习惯中式甜食的话，一块就够了——糖和猪油的密度很高。猪油带来的醇香是植物油无法复制的，但也意味着它不"轻"。新鲜是关键：如果米花糖变硬了、粘牙而不是入口即化，那就是放久了。最好的伴手礼是从苏稽古镇的小作坊买的，不是礼品店。对了，吃它会掉一地渣。',
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
