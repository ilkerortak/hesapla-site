/**
 * H360 ELITE - CORE ENGINE v4.0 (Harmonized Desktop & Mobile)
 */
document.addEventListener("DOMContentLoaded", () => {
    // 1. ESKİ KALINTILARI TEMİZLE
    const old = document.querySelectorAll('.h3-header, .h3-overlay, nav, .glass-nav');
    old.forEach(el => el.remove());

    // 2. CSS (MASAÜSTÜ ŞIKLIĞI + MOBİL SCROLL HARMANI)
    const style = document.createElement('style');
    style.textContent = `
        :root { 
            --accent: #3b82f6; 
            --accent-glow: rgba(59, 130, 246, 0.4);
            --dark-bg: #0b0f19; 
            --glass-menu: rgba(8, 12, 21, 0.96);
            --glass-header: rgba(11, 15, 25, 0.8);
            --border: rgba(255, 255, 255, 0.08);
        }
        
        /* Sabit Header (Cam Efektli) */
        .h3-header {
            position: fixed; top: 0; left: 0; right: 0; height: 90px;
            display: flex; align-items: center; justify-content: space-between;
            padding: 0 6%; z-index: 10001;
            background: var(--glass-header);
            backdrop-filter: blur(15px);
            border-bottom: 1px solid var(--border);
        }

        .h3-logo { display: flex; align-items: center; gap: 15px; text-decoration: none; transition: 0.3s; }
        .h3-logo:hover { transform: scale(1.03); }
        .logo-icon {
            width: 42px; height: 42px; background: var(--accent);
            border-radius: 11px; display: flex; align-items: center; justify-content: center;
            box-shadow: 0 0 20px var(--accent-glow);
            font-weight: 900; color: #fff; font-size: 1.1rem;
        }
        .logo-text { color: #fff; font-weight: 800; font-size: 1.3rem; letter-spacing: -1px; }
        .logo-text span { color: var(--accent); font-weight: 300; }

        /* Modern Trigger */
        .h3-trigger {
            background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border);
            padding: 12px 24px; border-radius: 14px; cursor: pointer;
            backdrop-filter: blur(5px); display: flex; align-items: center; gap: 10px; z-index: 10002;
            transition: 0.3s;
        }
        .h3-trigger:hover { background: rgba(255, 255, 255, 0.08); border-color: var(--accent); }
        .h3-trigger span { color: #fff; font-size: 0.75rem; font-weight: 700; letter-spacing: 1px; }
        .h3-burger { width: 18px; height: 12px; position: relative; }
        .h3-burger div { position: absolute; height: 2px; background: #fff; border-radius: 10px; transition: 0.3s; width: 100%; }
        .b-1 { top: 0; } .b-2 { bottom: 0; width: 60%; right: 0; }
        .h3-trigger.active .b-1 { transform: translateY(5px) rotate(45deg); }
        .h3-trigger.active .b-2 { transform: translateY(-5px) rotate(-45deg); width: 100%; }

        /* Full Screen Elite Overlay (Kademeli Blur) */
        .h3-overlay {
            position: fixed; inset: 0; background: var(--glass-menu);
            z-index: 10000;
            opacity: 0; visibility: hidden; transition: 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex; align-items: center; justify-content: center; /* Desktopta ortala */
            overflow-y: auto; /* İçerik taşarsa kaydır */
            -webkit-overflow-scrolling: touch; /* iOS Scroll Fix */
        }
        .h3-overlay.open { opacity: 1; visibility: visible; backdrop-filter: blur(40px); }

        /* Harmonized Grid (Masaüstü: 4'lü, Mobil: 2'li) */
        .h3-grid {
            display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px;
            width: 90%; max-width: 1100px;
            transform: scale(0.9) translateY(20px); transition: 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
            margin: auto; /* Ortalamayı garanti et */
            padding: 120px 0 50px; /* Header ve footer boşluğu */
        }
        .h3-overlay.open .h3-grid { transform: scale(1) translateY(0); }

        .h3-item {
            background: rgba(255,255,255,0.02); border: 1px solid var(--border);
            padding: 35px 20px; border-radius: 28px; text-decoration: none;
            display: flex; flex-direction: column; align-items: center; gap: 18px;
            transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 0; transform: translateY(15px);
        }
        .h3-overlay.open .h3-item { opacity: 1; transform: translateY(0); }
        .h3-item:hover { background: rgba(59, 130, 246, 0.1); border-color: var(--accent); transform: translateY(-8px); box-shadow: 0 15px 30px rgba(59, 130, 246, 0.2); }
        .h3-item i { font-size: 1.8rem; color: var(--accent); transition: 0.3s; filter: drop-shadow(0 0 10px var(--accent-glow)); }
        .h3-item:hover i { color: #fff; transform: scale(1.1); }
        .h3-item b { color: #fff; font-size: 0.75rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; text-align: center; }

        /* --- HARMONIZED RESPONSIVE --- */
        
        /* Tablet: 3'lü Grid */
        @media (max-width: 950px) {
            .h3-grid { grid-template-columns: repeat(3, 1fr); width: 95%; }
        }

        /* Mobil: 2'li Grid + Scroll Özgürlüğü */
        @media (max-width: 600px) {
            .h3-header { height: 75px; }
            .logo-text { display: none; } /* Alan kazanalım */
            .h3-trigger { padding: 10px 16px; border-radius: 12px; }
            
            .h3-overlay { 
                display: block; /* Mobilde Flex'i kapat, Scroll rahatlasın */
                padding-top: 100px; /* Header boşluğu */
            }
            .h3-grid { 
                grid-template-columns: repeat(2, 1fr); 
                gap: 10px; 
                width: 92%;
                padding: 0 0 40px; /* Alt boşluk */
            }
            .h3-item { padding: 30px 10px; border-radius: 20px; }
            .h3-item i { font-size: 1.5rem; }
            .h3-item b { font-size: 0.65rem; }
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

    const btn = document.getElementById('h3Btn');
    const overlay = document.getElementById('h3Overlay');
    
    // Tıklama Logic
    btn.onclick = (e) => {
        e.stopPropagation();
        btn.classList.toggle('active');
        overlay.classList.toggle('open');
        
        // Arka plan kilidi
        if(overlay.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    // Staggered Animation (Sıralı Giriş)
    document.querySelectorAll('.h3-item').forEach((item, i) => {
        item.style.transitionDelay = (0.05 + (i * 0.03)) + 's';
    });
});
