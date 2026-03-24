/**
 * H360 ELITE - CORE ENGINE v5.8
 * [AdSense ID Integrated + Live Dashboard + Clean UI]
 */

// 1. GOOGLE ADSENSE KİMLİĞİ (Script Enjeksiyonu)
const adSenseScript = document.createElement('script');
adSenseScript.async = true;
adSenseScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1894587939365426";
adSenseScript.crossOrigin = "anonymous";
document.head.appendChild(adSenseScript);

document.addEventListener("DOMContentLoaded", () => {
    // 2. TEMİZLİK (Eski kalıntıları siler, çift görünmeyi engeller)
    const oldElements = document.querySelectorAll('.h3-header, .h3-overlay, .hero, .container, .hero-box, .grid-main, header');
    oldElements.forEach(el => el.remove());

    // 3. CSS TASARIM SİSTEMİ
    const style = document.createElement('style');
    style.textContent = `
        :root { 
            --accent: #3b82f6; 
            --accent-glow: rgba(59, 130, 246, 0.4);
            --dark-bg: #0b0f19; 
            --glass: rgba(255, 255, 255, 0.03);
            --border: rgba(255, 255, 255, 0.08);
        }
        body { background-color: var(--dark-bg); margin: 0; font-family: 'Inter', sans-serif; color: #fff; overflow-x: hidden; }
        
        .h3-header {
            position: fixed; top: 0; left: 0; right: 0; height: 80px;
            display: flex; align-items: center; justify-content: space-between;
            padding: 0 6%; background: rgba(11, 15, 25, 0.8); backdrop-filter: blur(15px);
            border-bottom: 1px solid var(--border); z-index: 10001;
        }
        .h3-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; color: #fff; }
        .h3-logo img { height: 45px; filter: drop-shadow(0 0 8px var(--accent-glow)); }
        .logo-text { font-weight: 800; font-size: 1.2rem; letter-spacing: -1px; }
        .logo-text span { color: var(--accent); font-weight: 300; }

        .h3-trigger {
            background: var(--glass); border: 1px solid var(--border);
            padding: 10px 20px; border-radius: 12px; cursor: pointer;
            display: flex; align-items: center; gap: 8px; transition: 0.3s;
        }
        .h3-trigger span { font-size: 0.75rem; font-weight: 700; color: #fff; }

        .hero-box { text-align: center; padding: 140px 20px 40px; animation: fadeIn 0.8s ease; }
        .hero-title { font-size: 2.4rem; font-weight: 900; letter-spacing: 2px; margin-bottom: 10px; }
        .hero-sub { color: rgba(255,255,255,0.5); font-size: 1rem; max-width: 600px; margin: 0 auto 25px; line-height: 1.6; }
        
        .status-bar { 
            display: flex; justify-content: center; align-items: center; gap: 15px; 
            font-size: 0.75rem; font-weight: 700; color: var(--accent); 
        }
        .pulse { width: 8px; height: 8px; background: #10b981; border-radius: 50%; box-shadow: 0 0 8px #10b981; animation: blink 2s infinite; }

        .grid-main { 
            display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
            gap: 20px; max-width: 1100px; margin: 0 auto; padding: 0 20px 60px; 
        }
        .card { 
            background: var(--glass); border: 1px solid var(--border); 
            padding: 25px; border-radius: 20px; text-decoration: none; 
            display: flex; align-items: center; gap: 15px; transition: 0.3s; 
        }
        .card:hover { 
            border-color: var(--accent); transform: translateY(-5px); 
            background: rgba(59, 130, 246, 0.05);
        }
        .card .icon { font-size: 1.6rem; background: rgba(255,255,255,0.03); width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; border-radius: 12px; }
        .card h3 { color: #fff; margin: 0; font-size: 1.1rem; }
        .card p { color: rgba(255,255,255,0.4); margin: 4px 0 0; font-size: 0.85rem; }

        .h3-overlay { 
            position: fixed; inset: 0; background: rgba(8, 12, 21, 0.98); 
            z-index: 10000; opacity: 0; visibility: hidden; transition: 0.4s; 
            display: flex; align-items: center; justify-content: center;
        }
        .h3-overlay.open { opacity: 1; visibility: visible; backdrop-filter: blur(20px); }

        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
    `;
    document.head.appendChild(style);

    // 4. HTML İÇERİĞİ
    const layout = `
        <header class="h3-header">
            <a href="index.html" class="h3-logo">
                <img src="logo.png" alt="H360">
                <div class="logo-text">HESAPLA<span>360</span></div>
            </a>
            <button class="h3-trigger" id="h3Btn">
                <span>MENÜ</span>
            </button>
        </header>

        <div id="h3-main-content">
            <div class="hero-box">
                <h1 class="hero-title">FİNANSAL ANALİZ MERKEZİ</h1>
                <p class="hero-sub">Türkiye'nin dijital hesaplama portali. Maaş, tazminat ve yatırım analizlerinizi <b>H360</b> altyapısıyla güvenle gerçekleştirin.</p>
                <div class="status-bar">
                    <span style="display:flex; align-items:center; gap:5px;"><span class="pulse"></span> SİSTEM ONLINE</span>
                    <span style="opacity:0.2;">|</span>
                    <span id="live-clock">YÜKLENİYOR...</span>
                </div>
            </div>

            <div class="grid-main">
                <a href="netmaas.html" class="card"><div class="icon">💰</div><div class="info"><h3>Maaş</h3><p>Bordro & Net Analizi</p></div></a>
                <a href="tazminat.html" class="card"><div class="icon">💼</div><div class="info"><h3>Tazminat</h3><p>Kıdem & İhbar Hesabı</p></div></a>
                <a href="issizlik.html" class="card"><div class="icon">📅</div><div class="info"><h3>İşsizlik</h3><p>Süre & Ödenek Planı</p></div></a>
                <a href="faiz.html" class="card"><div class="icon">📈</div><div class="info"><h3>Faiz</h3><p>Bileşik Getiri Analizi</p></div></a>
                <a href="yakit.html" class="card"><div class="icon">⛽</div><div class="info"><h3>Yakıt</h3><p>Yol Maliyeti & Tüketim</p></div></a>
                <a href="enflasyon.html" class="card"><div class="icon">📉</div><div class="info"><h3>Enflasyon</h3><p>Alım Gücü Kaybı</p></div></a>
                <a href="kredi.html" class="card"><div class="icon">🏦</div><div class="info"><h3>Kredi</h3><p>Banka Ödeme Planı</p></div></a>
                <a href="yas.html" class="card"><div class="icon">🎂</div><div class="info"><h3>Yaş</h3><p>Kronolojik Analiz</p></div></a>
                <a href="doviz.html" class="card"><div class="icon">💱</div><div class="info"><h3>Döviz</h3><p>Global Kur Çeviri</p></div></a>
                <a href="kdv.html" class="card"><div class="icon">🧾</div><div class="info"><h3>KDV</h3><p>Vergi Matrah Hesabı</p></div></a>
                <a href="mesai.html" class="card"><div class="icon">🕒</div><div class="info"><h3>Mesai</h3><p>Ek Kazanç Tablosu</p></div></a>
                <a href="cv.html" class="card"><div class="icon">📄</div><div class="info"><h3>CV</h3><p>Hızlı PDF Oluşturucu</p></div></a>
            </div>
        </div>

        <div class="h3-overlay" id="h3Overlay">
            <div style="text-align:center; display:flex; flex-direction:column; gap:20px;">
                <a href="hakkimizda.html" style="color:#fff; text-decoration:none; font-size:1.5rem; font-weight:700;">Hakkımızda</a>
                <a href="gizlilik-politikasi.html" style="color:#fff; text-decoration:none; font-size:1.5rem; font-weight:700;">Gizlilik</a>
                <a href="iletisim.html" style="color:#fff; text-decoration:none; font-size:1.5rem; font-weight:700;">İletişim</a>
                <button id="closeBtn" style="background:none; border:1px solid #fff; color:#fff; padding:10px 30px; border-radius:30px; margin-top:40px; cursor:pointer;">KAPAT</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', layout);

    // 5. CANLI SAAT & MENÜ MANTIĞI
    function updateClock() {
        const now = new Date();
        const options = { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' };
        const clockEl = document.getElementById('live-clock');
        if(clockEl) clockEl.innerText = now.toLocaleDateString('tr-TR', options).toUpperCase();
    }
    setInterval(updateClock, 1000); updateClock();

    const btn = document.getElementById('h3Btn');
    const overlay = document.getElementById('h3Overlay');
    const close = document.getElementById('closeBtn');

    if(btn) btn.onclick = () => overlay.classList.add('open');
    if(close) close.onclick = () => overlay.classList.remove('open');
});
