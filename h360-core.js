/**
 * H360 ELITE - CORE ENGINE v3.1 (Mobile & Branding Edition)
 */
document.addEventListener("DOMContentLoaded", () => {
    // 1. ESKİLERİ TEMİZLE
    const old = document.querySelectorAll('.glass-nav, .dropdown-menu, nav, .menu-container, .h3-header, .h3-overlay');
    old.forEach(el => el.remove());

    // 2. MOBİL UYUMLU PREMIUM CSS
    const style = document.createElement('style');
    style.textContent = `
        :root { 
            --accent: #3b82f6; 
            --accent-glow: rgba(59, 130, 246, 0.5);
            --dark-bg: #0b0f19; 
            --glass-border: rgba(255, 255, 255, 0.08);
        }
        
        .h3-header {
            position: fixed; top: 0; left: 0; right: 0; height: 80px;
            display: flex; align-items: center; justify-content: space-between;
            padding: 0 5%; z-index: 10000;
            background: linear-gradient(180deg, rgba(11, 15, 25, 1) 0%, rgba(11, 15, 25, 0) 100%);
            backdrop-filter: blur(10px);
        }

        .h3-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .logo-icon {
            width: 38px; height: 38px; background: var(--accent);
            border-radius: 10px; display: flex; align-items: center; justify-content: center;
            box-shadow: 0 0 15px var(--accent-glow);
            font-weight: 900; color: #fff; font-size: 1rem;
        }
        .logo-text { color: #fff; font-weight: 800; font-size: 1.1rem; letter-spacing: -1px; }
        .logo-text span { color: var(--accent); font-weight: 300; }

        .h3-trigger {
            background: rgba(255, 255, 255, 0.05); border: 1px solid var(--glass-border);
            padding: 8px 16px; border-radius: 12px; cursor: pointer;
            display: flex; align-items: center; gap: 8px; z-index: 10001;
        }
        .h3-trigger span { color: #fff; font-size: 0.7rem; font-weight: 700; letter-spacing: 1px; }
        
        .h3-burger { width: 18px; height: 10px; position: relative; }
        .h3-burger div { position: absolute; height: 2px; background: #fff; border-radius: 10px; transition: 0.3s; width: 100%; }
        .b-1 { top: 0; } .b-2 { bottom: 0; width: 60%; right: 0; }
        .h3-trigger.active .b-1 { transform: translateY(4px) rotate(45deg); }
        .h3-trigger.active .b-2 { transform: translateY(-4px) rotate(-45deg); width: 100%; }

        .h3-overlay {
            position: fixed; inset: 0; background: rgba(8, 12, 21, 0.95);
            backdrop-filter: blur(30px); z-index: 9999;
            display: flex; align-items: center; justify-content: center;
            opacity: 0; visibility: hidden; transition: 0.4s ease;
        }
        .h3-overlay.open { opacity: 1; visibility: visible; }

        .h3-grid {
            display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
            width: 90%; max-height: 80vh; overflow-y: auto; padding: 20px 0;
        }

        .h3-item {
            background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border);
            padding: 20px 10px; border-radius: 20px; text-decoration: none;
            display: flex; flex-direction: column; align-items: center; gap: 12px;
            transition: 0.3s;
        }
        .h3-item i { font-size: 1.4rem; color: var(--accent); }
        .h3-item b { color: #fff; font-size: 0.65rem; font-weight: 700; text-align: center; }

        /* MOBİL ÖZEL AYARLAR */
        @media (max-width: 600px) {
            .h3-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
            .h3-header { height: 70px; }
            .logo-text { display: none; } /* Mobilde sadece H ikon kalsın, alan kazanalım */
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

        <div class="h3-overlay" id="h3Overlay">
            <div class="h3-grid">
                <a href="netmaas.html" class="h3-item"><i class="fa-solid fa-money-bill-wave"></i><b>MAAŞ</b></a>
                <a href="tazminat.html" class="h3-item"><i class="fa-solid fa-briefcase"></i><b>TAZMINAT</b></a>
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

    const btn = document.getElementById('h3Btn');
    const overlay = document.getElementById('h3Overlay');
    
    // Tıklama ve Dokunma Desteği
    const toggle = (e) => {
        e.preventDefault();
        btn.classList.toggle('active');
        overlay.classList.toggle('open');
        document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
    };

    btn.addEventListener('click', toggle);
    btn.addEventListener('touchstart', toggle, {passive: false});
});
