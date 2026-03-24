/**
 * H360 ELITE - CORE ENGINE v3.0 (Branding & High-End UI)
 * Tam sürüm - Eksiksiz ve Hataları Giderilmiş Mod
 */
document.addEventListener("DOMContentLoaded", () => {
    // 1. ESKİ KALINTILARI TEMİZLE
    const oldMenus = document.querySelectorAll('.glass-nav, .dropdown-menu, nav, .menu-container, .h360-header, .h360-menu-overlay');
    oldMenus.forEach(el => el.remove());

    // 2. PREMIUM CSS
    const style = document.createElement('style');
    style.textContent = `
        :root { 
            --accent: #3b82f6; 
            --accent-glow: rgba(59, 130, 246, 0.5);
            --dark-bg: #0b0f19; 
            --glass-border: rgba(255, 255, 255, 0.08);
        }
        
        .h3-header {
            position: fixed; top: 0; left: 0; right: 0; height: 100px;
            display: flex; align-items: center; justify-content: space-between;
            padding: 0 6%; z-index: 10000;
            background: linear-gradient(180deg, rgba(11, 15, 25, 1) 0%, rgba(11, 15, 25, 0) 100%);
            pointer-events: none;
        }
        .h3-header * { pointer-events: auto; }

        .h3-logo { 
            display: flex; align-items: center; gap: 15px; text-decoration: none; 
            transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .h3-logo:hover { transform: scale(1.05); }
        
        .logo-icon {
            width: 45px; height: 45px; background: var(--accent);
            border-radius: 12px; display: flex; align-items: center; justify-content: center;
            box-shadow: 0 0 20px var(--accent-glow);
            font-weight: 900; color: #fff; font-size: 1.2rem;
            position: relative; overflow: hidden;
        }
        .logo-icon::after {
            content: ''; position: absolute; inset: 0;
            background: linear-gradient(45deg, transparent, rgba(255,255,255,0.4), transparent);
            transform: translateX(-100%); transition: 0.6s;
        }
        .h3-logo:hover .logo-icon::after { transform: translateX(100%); }

        .logo-text { color: #fff; font-weight: 800; font-size: 1.4rem; letter-spacing: -1px; }
        .logo-text span { color: var(--accent); font-weight: 300; }

        .h3-trigger {
            background: rgba(255, 255, 255, 0.03); border: 1px solid var(--glass-border);
            padding: 10px 22px; border-radius: 14px; cursor: pointer;
            backdrop-filter: blur(10px); display: flex; align-items: center; gap: 12px;
            transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .h3-trigger:hover { background: rgba(255, 255, 255, 0.08); border-color: var(--accent); }
        .h3-trigger span { color: #fff; font-size: 0.75rem; font-weight: 700; letter-spacing: 1.5px; opacity: 0.8; }
        
        .h3-burger { width: 18px; height: 12px; position: relative; }
        .h3-burger div { position: absolute; height: 2px; background: #fff; border-radius: 10px; transition: 0.4s; }
        .b-1 { top: 0; width: 100%; } .b-2 { bottom: 0; width: 60%; right: 0; }
        .h3-trigger.active .b-1 { transform: translateY(5px) rotate(45deg); width: 100%; }
        .h3-trigger.active .b-2 { transform: translateY(-5px) rotate(-45deg); width: 100%; }

        .h3-overlay {
            position: fixed; inset: 0; background: rgba(8, 12, 21, 0.8);
            backdrop-filter: blur(0px); z-index: 9999;
            display: flex; align-items: center; justify-content: center;
            opacity: 0; visibility: hidden; transition: 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .h3-overlay.open { opacity: 1; visibility: visible; backdrop-filter: blur(40px); }

        .h3-grid {
            display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px;
            width: 85%; max-width: 1000px; transform: scale(0.9); transition: 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .h3-overlay.open .h3-grid { transform: scale(1); }

        .h3-item {
            background: rgba(255,255,255,0.02); border: 1px solid var(--glass-border);
            padding: 35px 20px; border-radius: 28px; text-decoration: none;
            display: flex; flex-direction: column; align-items: center; gap: 18px;
            transition: 0.3s; opacity: 0; transform: translateY(20px);
        }
        .h3-overlay.open .h3-item { opacity: 1; transform: translateY(0); }
        .h3-item:hover { background: rgba(59, 130, 246, 0.1); border-color: var(--accent); transform: translateY(-10px); }
        .h3-item i { font-size: 1.8rem; color: var(--accent); filter: drop-shadow(0 0 10px var(--accent-glow)); }
        .h3-item b { color: #fff; font-size: 0.75rem; font-weight: 700; letter-spacing: 1px; }

        @media (max-width: 900px) { .h3-grid { grid-template-columns: repeat(2, 1fr); } }
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

    // 4. FUNCTIONALITY
    const btn = document.getElementById('h3Btn');
    const overlay = document.getElementById('h3Overlay');
    
    btn.onclick = (e) => {
        e.stopPropagation();
        btn.classList.toggle('active');
        overlay.classList.toggle('open');
        document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
    };

    // Staggered Animation
    document.querySelectorAll('.h3-item').forEach((item, i) => {
        item.style.transitionDelay = (0.05 + (i * 0.03)) + 's';
    });
});
