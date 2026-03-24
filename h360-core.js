/**
 * H360 ELITE - CORE ENGINE v5.5
 * [Dynamic Hero + Live Clock + Logo + Ads]
 */

// 1. Favicon (Sekme İkonu)
const favicon = document.createElement('link');
favicon.rel = 'icon'; favicon.type = 'image/png'; favicon.href = './logo.png?v=1.2';
document.head.appendChild(favicon);

// 2. Google Adsense
const adScript = document.createElement('script');
adScript.async = true;
adScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1894587939365426";
adScript.crossOrigin = "anonymous";
document.head.appendChild(adScript);

document.addEventListener("DOMContentLoaded", () => {
    // 3. TEMİZLİK
    const old = document.querySelectorAll('.h3-header, .h3-overlay, .ad-sidebar, nav, .glass-nav');
    old.forEach(el => el.remove());

    // 4. CSS (Yeni Dinamik Efektler Eklendi)
    const style = document.createElement('style');
    style.textContent = `
        :root { 
            --accent: #3b82f6; 
            --accent-glow: rgba(59, 130, 246, 0.4);
            --dark-bg: #0b0f19; 
            --glass-menu: rgba(8, 12, 21, 0.98);
            --border: rgba(255, 255, 255, 0.08);
        }
        
        .h3-header {
            position: fixed; top: 0; left: 0; right: 0; height: 90px;
            display: flex; align-items: center; justify-content: space-between;
            padding: 0 6%; z-index: 10001;
            background: rgba(11, 15, 25, 0.8); backdrop-filter: blur(15px);
            border-bottom: 1px solid var(--border);
        }

        .h3-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; }
        .h3-logo img { height: 50px; width: auto; filter: drop-shadow(0 0 10px var(--accent-glow)); transition: 0.3s; }

        .logo-text { color: #fff; font-weight: 800; font-size: 1.3rem; letter-spacing: -1px; }
        .logo-text span { color: var(--accent); font-weight: 300; }

        /* Dinamik Orta Panel Stilleri */
        .hero-section { text-align: center; margin-bottom: 50px; animation: fadeIn 1s ease; }
        .hero-title { font-size: 2.5rem; color: #f3f4f6; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; }
        .hero-subtext { color: rgba(255,255,255,0.6); font-size: 0.95rem; max-width: 650px; margin: 0 auto 20px; line-height: 1.6; }
        
        .status-bar { display: flex; align-items: center; justify-content: center; gap: 15px; font-size: 0.75rem; color: var(--accent); font-weight: 600; }
        .status-pulse { display: inline-block; width: 8px; height: 8px; background: #10b981; border-radius: 50%; margin-right: 5px; box-shadow: 0 0 8px #10b981; animation: pulse 2s infinite; }
        
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

        /* Menu & Layout */
        .h3-trigger { background: rgba(255, 255, 255, 0.05); border: 1px solid var(--border); padding: 12px 22px; border-radius: 14px; cursor: pointer; display: flex; align-items: center; gap: 10px; z-index: 10002; }
        .h3-burger { width: 18px; height: 12px; position: relative; }
        .h3-burger div { position: absolute; height: 2px; background: #fff; border-radius: 10px; width: 100%; }
        .b-1 { top: 0; } .b-2 { bottom: 0; width: 60%; right: 0; }

        #h3-main-content { max-width: 1000px !important; margin: 0 auto !important; padding-top: 140px !important; }

        .h3-overlay { position: fixed; inset: 0; background: var(--glass-menu); z-index: 10000; opacity: 0; visibility: hidden; transition: 0.5s; overflow-y: auto; }
        .h3-overlay.open { opacity: 1; visibility: visible; backdrop-filter: blur(40px); }

        .h3-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; width: 90%; max-width: 1100px; margin: 0 auto; padding: 120px 0 60px; }
        .h3-item { background: rgba(255,255,255,0.02); border: 1px solid var(--border); padding: 30px 10px; border-radius: 24px; text-decoration: none; display: flex; flex-direction: column; align-items: center; gap: 12px; transition: 0.3s; }
        .h3-item i { font-size: 1.6rem; color: var(--accent); }
        .h3-item b { color: #fff; font-size: 0.7rem; font-weight: 700; text-align: center; text-transform: uppercase; }
        .h3-item:hover { background: rgba(59, 130, 246, 0.1); border-color: var(--accent); transform: translateY(-3px); }

        @media (max-width: 768px) { .h3-grid { grid-template-columns: repeat(2, 1fr); } .logo-text { display: none; } .hero-title { font-size: 1.6rem; } }
    `;
    document.head.appendChild(style);

    // 5. HTML INJECTION
    const uiHTML = `
        <header class="h3-header">
            <a href="index.html" class="h3-logo">
                <img src="./logo.png" alt="H360 Logo">
                <div class="logo-text">HESAPLA<span>360</span></div>
            </a>
            <button class="h3-trigger" id="h3Btn">
                <span style="color:#fff; font-size:0.75rem; font-weight:700;">MENÜ</span>
                <div class="h3-burger"><div class="b-1"></div><div class="b-2"></div></div>
            </button>
        </header>

        <div id="h3-main-content">
            <div class="hero-section">
                <div class="hero-title">FİNANSAL ANALİZ MERKEZİ</div>
                <div class="hero-subtext">
                    Türkiye'nin dijital hesaplama portali. Maaş, tazminat ve vergi analizlerinizi <b>H360</b> altyapısıyla güvenle gerçekleştirin.
                </div>
                <div class="status-bar">
                    <span><span class="status-pulse"></span> SİSTEM ONLINE</span>
                    <span style="color: rgba(255,255,255,0.1)">|</span>
                    <span id="live-clock">YÜKLENİYOR...</span>
                    <span style="color: rgba(255,255,255,0.1)">|</span>
                    <span>VERİSETİ v2026.1</span>
                </div>
            </div>
        </div>

        <div class="h3-overlay" id="h3Overlay">
            <div class="h3-grid">
                <a href="netmaas.html" class="h3-item"><i class="fa-solid fa-money-bill-wave"></i><b>Maaş</b></a>
                <a href="tazminat.html" class="h3-item"><i class="fa-solid fa-briefcase"></i><b>Tazminat</b></a>
                <a href="issizlik.html" class="h3-item"><i class="fa-solid fa-calendar-day"></i><b>İşsizlik</b></a>
                <a href="faiz.html" class="h3-item"><i class="fa-solid fa-chart-line"></i><b>Faiz</b></a>
                <a href="yakit.html" class="h3-item"><i class="fa-solid fa-gas-pump"></i><b>Yakit</b></a>
                <a href="enflasyon.html" class="h3-item"><i class="fa-solid fa-chart-area"></i><b>Enflasyon</b></a>
                <a href="kredi.html" class="h3-item"><i class="fa-solid fa-building-columns"></i><b>Kredi</b></a>
                <a href="yas.html" class="h3-item"><i class="fa-solid fa-cake-candles"></i><b>Yaş</b></a>
                <a href="doviz.html" class="h3-item"><i class="fa-solid fa-money-bill-transfer"></i><b>Döviz</b></a>
                <a href="kdv.html" class="h3-item"><i class="fa-solid fa-file-invoice-dollar"></i><b>KDV</b></a>
                <a href="mesai.html" class="h3-item"><i class="fa-solid fa-clock"></i><b>Mesai</b></a>
                <a href="cv.html" class="h3-item"><i class="fa-solid fa-file-pdf"></i><b>CV Oluştur</b></a>
                <a href="hakkimizda.html" class="h3-item" style="border-color:rgba(59,130,246,0.3)"><i class="fa-solid fa-circle-info"></i><b>Hakkımızda</b></a>
                <a href="gizlilik-politikasi.html" class="h3-item" style="border-color:rgba(59,130,246,0.3)"><i class="fa-solid fa-shield-halved"></i><b>Gizlilik</b></a>
                <a href="iletisim.html" class="h3-item" style="border-color:rgba(59,130,246,0.3)"><i class="fa-solid fa-envelope"></i><b>İletişim</b></a>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', uiHTML);

    // 6. CANLI SAAT MANTIĞI
    function updateClock() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const clockEl = document.getElementById('live-clock');
        if(clockEl) clockEl.innerText = now.toLocaleDateString('tr-TR', options).toUpperCase();
    }
    setInterval(updateClock, 1000);
    updateClock();

    // 7. MENÜ MANTIĞI
    const btn = document.getElementById('h3Btn');
    const overlay = document.getElementById('h3Overlay');
    btn.onclick = (e) => {
        btn.classList.toggle('active');
        overlay.classList.toggle('open');
        document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
    };
});
