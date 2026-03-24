// H360 Elite - Modern Flow Menu Engine
document.addEventListener("DOMContentLoaded", () => {
    // 1. Modern & Şık CSS Enjeksiyonu
    const style = document.createElement('style');
    style.textContent = `
        :root { 
            --accent: #3b82f6; 
            --dark-bg: #0b0f19;
            --glass: rgba(15, 23, 42, 0.8);
            --border: rgba(255, 255, 255, 0.08);
        }

        /* Navigasyon Bar */
        .h360-nav {
            position: fixed; top: 0; left: 0; right: 0; height: 90px;
            display: flex; align-items: center; justify-content: space-between;
            padding: 0 5%; z-index: 9999;
            background: linear-gradient(180deg, rgba(11, 15, 25, 0.9) 0%, rgba(11, 15, 25, 0) 100%);
            backdrop-filter: blur(10px); border-bottom: 1px solid var(--border);
        }

        .h360-logo { color: #fff; text-decoration: none; font-weight: 900; font-size: 1.4rem; letter-spacing: -1px; }
        .h360-logo span { color: var(--accent); }

        /* Modern Menü Butonu */
        .h360-menu-trigger {
            background: none; border: none; cursor: pointer;
            display: flex; align-items: center; gap: 12px;
            padding: 10px 20px; border-radius: 50px;
            background: rgba(255,255,255,0.03); border: 1px solid var(--border);
            transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .h360-menu-trigger:hover { background: var(--accent); border-color: var(--accent); }
        .h360-menu-trigger span { color: #fff; font-size: 0.8rem; font-weight: 800; letter-spacing: 1px; }

        /* Hamburger İkonu Animasyonu */
        .h360-icon { width: 24px; height: 14px; position: relative; }
        .h360-icon div { 
            position: absolute; height: 2px; width: 100%; background: #fff; border-radius: 2px; 
            transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .h360-icon .line-1 { top: 0; }
        .h360-icon .line-2 { bottom: 0; width: 60%; right: 0; }
        
        .active .h360-icon .line-1 { transform: translateY(6px) rotate(45deg); }
        .active .h360-icon .line-2 { width: 100%; transform: translateY(-6px) rotate(-45deg); }

        /* Full-Screen Modern Menü Overlay */
        .h360-overlay {
            position: fixed; inset: 0; background: var(--glass);
            backdrop-filter: blur(40px); z-index: 9998;
            display: flex; align-items: center; justify-content: center;
            opacity: 0; visibility: hidden;
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .h360-overlay.active { opacity: 1; visibility: visible; }

        .h360-grid {
            display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
            max-width: 900px; width: 90%; transform: scale(0.9) translateY(30px);
            transition: 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .h360-overlay.active .h360-grid { transform: scale(1) translateY(0); }

        .h360-link {
            background: rgba(255,255,255,0.02); border: 1px solid var(--border);
            padding: 25px; border-radius: 24px; text-decoration: none;
            display: flex; flex-direction: column; align-items: center; gap: 15px;
            transition: 0.3s; opacity: 0; transform: translateY(20px);
        }
        .h360-overlay.active .h360-link { opacity: 1; transform: translateY(0); }

        /* Staggered Delay */
        ${Array.from({length: 12}).map((_, i) => `.h360-link:nth-child(${i+1}) { transition-delay: ${0.1 + (i*0.05)}s; }`).join('\n')}

        .h360-link:hover { background: var(--accent); border-color: var(--accent); transform: translateY(-10px); }
        .h360-link i { font-size: 1.5rem; color: var(--accent); transition: 0.3s; }
        .h360-link:hover i { color: #fff; }
        .h360-link span { color: #fff; font-size: 0.75rem; font-weight: 800; letter-spacing: 1px; }

        /* Responsive */
        @media (max-width: 768px) { .h360-grid { grid-template-columns: repeat(2, 1fr); } }
    `;
    document.head.appendChild(style);

    // 2. HTML Yapısı
    const navHTML = `
        <nav class="h360-nav">
            <a href="index.html" class="h360-logo">H360<span>.</span></a>
            <button class="h360-menu-trigger" id="h360Btn">
                <span>MENÜ</span>
                <div class="h360-icon"><div class="line-1"></div><div class="line-2"></div></div>
            </button>
        </nav>
        <div class="h360-overlay" id="h360Overlay">
            <div class="h360-grid">
                <a href="netmaas.html" class="h360-link"><i class="fa-solid fa-money-bill-wave"></i><span>MAAŞ</span></a>
                <a href="tazminat.html" class="h360-link"><i class="fa-solid fa-briefcase"></i><span>TAZMİNAT</span></a>
                <a href="issizlik.html" class="h360-link"><i class="fa-solid fa-calendar-day"></i><span>İŞSİZLİK</span></a>
                <a href="faiz.html" class="h360-link"><i class="fa-solid fa-chart-line"></i><span>FAİZ</span></a>
                <a href="yakit.html" class="h360-link"><i class="fa-solid fa-gas-pump"></i><span>YAKIT</span></a>
                <a href="enflasyon.html" class="h360-link"><i class="fa-solid fa-chart-area"></i><span>ENFLASYON</span></a>
                <a href="kredi.html" class="h360-link"><i class="fa-solid fa-building-columns"></i><span>KREDİ</span></a>
                <a href="yas.html" class="h360-link"><i class="fa-solid fa-cake-candles"></i><span>YAŞ</span></a>
                <a href="doviz.html" class="h360-link"><i class="fa-solid fa-money-bill-transfer"></i><span>DÖVİZ</span></a>
                <a href="kdv.html" class="h360-link"><i class="fa-solid fa-file-invoice-dollar"></i><span>KDV</span></a>
                <a href="mesai.html" class="h360-link"><i class="fa-solid fa-clock"></i><span>MESAİ</span></a>
                <a href="cv.html" class="h360-link"><i class="fa-solid fa-file-pdf"></i><span>CV</span></a>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // 3. Logic
    const btn = document.getElementById('h360Btn');
    const overlay = document.getElementById('h360Overlay');
    
    btn.onclick = () => {
        btn.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
    };
});
