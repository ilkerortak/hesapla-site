/**
 * H360 ELITE - CORE ENGINE v6.0
 * [Perfect Menu + Multi-Page Fix + AdSense ID]
 */

// 1. GOOGLE ADSENSE (Global)
if (!document.querySelector('script[src*="adsbygoogle"]')) {
    const ads = document.createElement('script');
    ads.async = true;
    ads.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1894587939365426";
    ads.crossOrigin = "anonymous";
    document.head.appendChild(ads);
}

document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
    const isHome = path === '/' || path.includes('index.html') || path.endsWith('/');

    // 2. AKILLI TEMİZLİK (Sadece çakışan öğeleri siler)
    const cleanOld = () => {
        const targets = isHome 
            ? '.h3-header, .h3-overlay, .hero, .container, .premium-header' 
            : '.h3-header, .premium-header, nav, .h3-overlay';
        document.querySelectorAll(targets).forEach(el => el.remove());
    };
    cleanOld();

    // 3. CSS (Menü ve Tasarım)
    const style = document.createElement('style');
    style.textContent = `
        :root { --accent: #3b82f6; --dark: #0b0f19; --border: rgba(255,255,255,0.1); }
        body { background: var(--dark); margin: 0; font-family: 'Inter', sans-serif; color: #fff; }
        
        .h3-header { position: fixed; top: 0; left: 0; right: 0; height: 70px; display: flex; align-items: center; justify-content: space-between; padding: 0 5%; background: rgba(11,15,25,0.95); backdrop-filter: blur(10px); border-bottom: 1px solid var(--border); z-index: 99999; }
        .h3-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; color: #fff; font-weight: 800; font-size: 1.1rem; }
        .h3-logo img { height: 35px; }
        
        #h3Btn { background: rgba(255,255,255,0.05); border: 1px solid var(--border); color: #fff; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-weight: 700; font-size: 0.7rem; z-index: 100000; }

        /* Ana Sayfa Özel Bölümleri */
        .hero-section { text-align: center; padding: 130px 20px 40px; }
        .grid-layout { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px; max-width: 1100px; margin: 0 auto; padding: 20px 20px 80px; }
        .h3-card { background: rgba(255,255,255,0.03); border: 1px solid var(--border); padding: 20px; border-radius: 12px; text-decoration: none; display: flex; align-items: center; gap: 15px; transition: 0.2s; }
        .h3-card:hover { border-color: var(--accent); background: rgba(59,130,246,0.05); transform: translateY(-3px); }
        .h3-card b { color: #fff; display: block; font-size: 1rem; }
        .h3-card span { color: rgba(255,255,255,0.4); font-size: 0.8rem; }

        /* Fullscreen Menu Overlay */
        .h3-menu-view { position: fixed; inset: 0; background: #080c15; z-index: 99998; display: none; flex-direction: column; align-items: center; justify-content: center; gap: 25px; }
        .h3-menu-view.active { display: flex; }
        .h3-menu-view a { color: #fff; text-decoration: none; font-size: 1.8rem; font-weight: 800; transition: 0.2s; }
        .h3-menu-view a:hover { color: var(--accent); }
    `;
    document.head.appendChild(style);

    // 4. HEADER VE MENÜ ENJEKSİYONU
    const ui = `
        <header class="h3-header">
            <a href="index.html" class="h3-logo"><img src="logo.png" alt="H360"> HESAPLA<span style="color:var(--accent)">360</span></a>
            <button id="h3Btn">MENÜ</button>
        </header>
        <div class="h3-menu-view" id="h3Menu">
            <a href="index.html">ANA SAYFA</a>
            <a href="netmaas.html">MAAŞ</a>
            <a href="tazminat.html">TAZMİNAT</a>
            <a href="kredi.html">KREDİ</a>
            <a href="hakkimizda.html">HAKKIMIZDA</a>
            <a href="iletisim.html">İLETİŞİM</a>
            <button id="closeM" style="margin-top:30px; background:none; border:1px solid #fff; color:#fff; padding:10px 40px; border-radius:20px; cursor:pointer;">KAPAT</button>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', ui);

    // 5. ANA SAYFA İÇERİĞİ (Sadece index.html'de çalışır)
    if (isHome) {
        const homeHTML = `
            <div class="hero-section">
                <h1 style="font-size:2.2rem; margin:0;">FİNANSAL ANALİZ MERKEZİ</h1>
                <p style="color:rgba(255,255,255,0.5); margin:10px 0;">Sistem Online | <span id="clock">...</span></p>
            </div>
            <div class="grid-layout">
                <a href="netmaas.html" class="h3-card"><div>💰</div><div><b>Maaş</b><span>Bordro Analizi</span></div></a>
                <a href="tazminat.html" class="h3-card"><div>💼</div><div><b>Tazminat</b><span>Kıdem Hesabı</span></div></a>
                <a href="faiz.html" class="h3-card"><div>📈</div><div><b>Faiz</b><span>Getiri Analizi</span></div></a>
                <a href="kredi.html" class="h3-card"><div>🏦</div><div><b>Kredi</b><span>Ödeme Planı</span></div></a>
                <a href="doviz.html" class="h3-card"><div>💱</div><div><b>Döviz</b><span>Kur Çeviri</span></div></a>
                <a href="yakit.html" class="h3-card"><div>⛽</div><div><b>Yakıt</b><span>Maliyet Hesabı</span></div></a>
                <a href="issizlik.html" class="h3-card"><div>📅</div><div><b>İşsizlik</b><span>Ödenek Planı</span></div></a>
                <a href="enflasyon.html" class="h3-card"><div>📉</div><div><b>Enflasyon</b><span>Alım Gücü</span></div></a>
            </div>
        `;
        const container = document.getElementById('h3-main-content');
        if (container) container.innerHTML = homeHTML;
    }

    // 6. MENÜ VE SAAT FONKSİYONLARI
    const mBtn = document.getElementById('h3Btn');
    const mMenu = document.getElementById('h3Menu');
    const mClose = document.getElementById('closeM');

    if(mBtn) mBtn.onclick = () => mMenu.classList.add('active');
    if(mClose) mClose.onclick = () => mMenu.classList.remove('active');

    function updateClock() {
        const el = document.getElementById('clock');
        if(el) el.innerText = new Date().toLocaleTimeString('tr-TR');
    }
    setInterval(updateClock, 1000); updateClock();
});
