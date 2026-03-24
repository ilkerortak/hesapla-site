/**
 * H360 ELITE - CORE ENGINE v4.5
 * [Menü + Logo + Mobil Fix + Sağ/Sol Reklam Alanları]
 */
document.addEventListener("DOMContentLoaded", () => {
    // 1. ESKİ KALINTILARI TEMİZLE
    const old = document.querySelectorAll('.h3-header, .h3-overlay, .ad-sidebar, nav, .glass-nav');
    old.forEach(el => el.remove());

    // 2. CSS - FULL INTERFACE & ADS
    const style = document.createElement('style');
    style.textContent = `
        :root { 
            --accent: #3b82f6; 
            --accent-glow: rgba(59, 130, 246, 0.4);
            --dark-bg: #0b0f19; 
            --glass-menu: rgba(8, 12, 21, 0.98);
            --border: rgba(255, 255, 255, 0.08);
        }
        
        /* Header */
        .h3-header {
            position: fixed; top: 0; left: 0; right: 0; height: 90px;
            display: flex; align-items: center; justify-content: space-between;
            padding: 0 6%; z-index: 10001;
            background: rgba(11, 15, 25, 0.8); backdrop-filter: blur(15px);
            border-bottom: 1px solid var(--border);
        }

        .h3-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; }
        .logo-icon {
            width: 42px; height: 42px; background: var(--accent);
            border-radius: 11px; display: flex; align-items: center; justify-content: center;
            box-shadow: 0 0 20px var(--accent-glow);
            font-weight: 900; color: #fff; font-size: 1.1rem;
        }
        .logo-text { color: #fff; font-weight: 800; font-size: 1.3rem; letter-spacing: -1px; }
        .logo-text span { color: var(--accent); font-weight: 300; }

        .h3-trigger {
            background: rgba(255, 255, 255, 0.05); border: 1px solid var(--border);
            padding: 12px 22px; border-radius: 14px; cursor: pointer;
            display: flex; align-items: center; gap: 10px; z-index: 10002; transition: 0.3s;
        }
        .h3-trigger:hover { background: rgba(255, 255, 255, 0.1); border-color: var(--accent); }
        .h3-trigger span { color: #fff; font-size: 0.75rem; font-weight: 700; letter-spacing: 1px; }

        .h3-burger { width: 18px; height: 12px; position: relative; }
        .h3-burger div { position: absolute; height: 2px; background: #fff; border-radius: 10px; transition: 0.3s; width: 100%; }
        .b-1 { top: 0; } .b-2 { bottom: 0; width: 60%; right: 0; }
        .h3-trigger.active .b-1 { transform: translateY(5px) rotate(45deg); }
        .h3-trigger.active .b-2 { transform: translateY(-5px) rotate(-45deg); width: 100%; }

        /* REKLAM ALANLARI (Sticky Banner) */
        .ad-sidebar {
            position: fixed; top: 120px; width: 160px; height: 600px;
            background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border);
            display: flex; align-items: center; justify-content: center;
            z-index: 9000; border-radius: 12px; overflow: hidden;
            transition: opacity 0.4s ease;
        }
        .ad-left { left: 20px; }
        .ad-right { right: 20px; }
        .ad-label { position: absolute; top: 5px; font-size: 9px; color: #444; letter-spacing: 1px; }

        /* Menü Overlay */
        .h3-overlay {
            position: fixed; inset: 0; background: var(--glass-menu);
            z-index: 10000; opacity: 0; visibility: hidden; transition: 0.5s ease;
            overflow-y: auto; -webkit-overflow-scrolling: touch;
        }
        .h3-overlay.open { opacity: 1; visibility: visible; backdrop-filter: blur(40px); }

        .h3-grid {
            display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px;
            width: 90%; max-width: 1100px; margin: 0 auto; padding: 120px 0 60px;
            transform: scale(0.95); transition: 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .h3-overlay.open .h3-grid { transform: scale(1); }

        .h3-item {
            background: rgba(255,255,255,0.02); border: 1px solid var(--border);
            padding: 35px 15px; border-radius: 28px; text-decoration: none;
            display: flex; flex-direction: column; align-items: center; gap: 15px;
            transition: 0.3s; opacity: 0;
        }
        .h3-overlay.open .h3-item { opacity: 1; }
        .h3-item:hover { background: rgba(59, 130, 246, 0.1); border-color: var(--accent); transform: translateY(-8px); }
        .h3-item i { font-size: 1.8rem; color: var(--accent); filter: drop-shadow(0 0 10px var(--accent-glow)); }
        .h3-item b { color: #fff; font-size: 0.75rem; font-weight: 700; text-align: center; }

        /* RESPONSIVE & AD-LOGIC */
        @media (max-width: 1400px) {
            .ad-sidebar { display: none; } /* Reklamlar tablet ve mobilde gizlenir */
        }

        @media (max-width: 900px) {
            .h3-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 600px) {
            .h3-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
            .logo-text { display: none; }
            .h3-item { padding: 25px 10px; }
        }
    `;
    document.head.appendChild(style);

    // 3. HTML INJECTION
    const uiHTML = `
        <header class="h3-header">
            <a href="index.html" class="h3-logo">
                <div class="logo-icon">H</div>
                <div class="logo-text">HESAPLA<span>360</span></div>
            </a>
            <button class="h3-trigger" id="h3Btn">
                <span>MENÜ</span>
                <div class="h3-burger"><div class="b-1"></div><div class="b-2"></div></div>
            </button>
        </header>

        <div class="ad-sidebar ad-left"><span class="ad-label">REKLAM</span></div>
        <div class="ad-sidebar ad-right"><span class="ad-label">REKLAM</span></div>

        <div class="h3-overlay" id="h3Overlay">
            <div class="h3-grid">
                <a href="netmaas.html" class="h3-item"><i class="fa-solid fa-money-bill-wave"></i><b>MAAŞ</b></a>
                <a href="tazminat.html" class="h3-item"><i class="fa-solid fa-briefcase"></i><b>TAZMİNAT</b></a>
                <a href="issizlik.html" class="h3-item"><i class="fa-solid fa-calendar-day"></i><b>İŞSİZLİK</b></a>
                <a href="faiz.html" class="h3-item"><i class="fa-solid fa-chart-line"></i><b>FAİZ</b></a>
                <a href="yakit.html" class="h3-item"><i class="fa-solid fa-gas-pump"></i><b>YAKIT</b></a>
                <a href="enflasyon.html" class="h3-item"><i class="fa-solid fa-chart-area"></i><b>ENFLASYON</b></a>
                <a href="kredi.html" class="h3-item"><i class="fa-solid fa-building-columns"></i><b>KREDİ</b></a>
                <a href="yas.html" class="h3-item"><i class="fa-solid fa-cake-candles"></i><b>YAŞ</b></a>
                <a href="doviz.html" class="h3-item"><i class="fa-solid fa-money-bill-transfer"></i><b>DÖVİZ</b></a>
                <a href="kdv.html" class="h3-item"><i class="fa-solid fa-file-invoice-dollar"></i><b>KDV</b></a>
                <a href="mesai.html" class="h3-item"><i class="fa-solid fa-clock"></i><b>MESAİ</b></a>
                <a href="cv.html" class="h3-item"><i class="fa-solid fa-file-pdf"></i><b>CV</b></a>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', uiHTML);

    // 4. LOGIC
    const btn = document.getElementById('h3Btn');
    const overlay = document.getElementById('h3Overlay');
    const ads = document.querySelectorAll('.ad-sidebar');
    
    btn.onclick = (e) => {
        e.stopPropagation();
        btn.classList.toggle('active');
        overlay.classList.toggle('open');
        
        if(overlay.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
            ads.forEach(ad => ad.style.opacity = '0'); // Menü varken reklam gizle
        } else {
            document.body.style.overflow = '';
            ads.forEach(ad => ad.style.opacity = '1');
        }
    };

    // Staggered Delay
    document.querySelectorAll('.h3-item').forEach((item, i) => {
        item.style.transitionDelay = (0.05 + (i * 0.03)) + 's';
    });
});
