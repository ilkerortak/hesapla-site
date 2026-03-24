/**
 * H360 ELITE - CORE ENGINE v3.2 (The Scroll Fix)
 */
document.addEventListener("DOMContentLoaded", () => {
    // 1. ESKİLERİ TEMİZLE
    const old = document.querySelectorAll('.h3-header, .h3-overlay, nav, .glass-nav');
    old.forEach(el => el.remove());

    // 2. CSS (SCROLL & MOBİL FİX)
    const style = document.createElement('style');
    style.textContent = `
        :root { 
            --accent: #3b82f6; 
            --accent-glow: rgba(59, 130, 246, 0.4);
            --dark-bg: #0b0f19; 
            --glass: rgba(15, 23, 42, 0.98);
            --border: rgba(255, 255, 255, 0.08);
        }
        
        /* Sabit Header */
        .h3-header {
            position: fixed; top: 0; left: 0; right: 0; height: 80px;
            display: flex; align-items: center; justify-content: space-between;
            padding: 0 6%; z-index: 10001;
            background: linear-gradient(180deg, rgba(11, 15, 25, 1) 0%, rgba(11, 15, 25, 0) 100%);
            backdrop-filter: blur(10px);
        }

        .h3-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; }
        .logo-icon {
            width: 40px; height: 40px; background: var(--accent);
            border-radius: 10px; display: flex; align-items: center; justify-content: center;
            box-shadow: 0 0 20px var(--accent-glow);
            font-weight: 900; color: #fff; font-size: 1.1rem;
        }
        .logo-text { color: #fff; font-weight: 800; font-size: 1.2rem; letter-spacing: -1px; }
        .logo-text span { color: var(--accent); font-weight: 300; }

        /* Trigger */
        .h3-trigger {
            background: rgba(255, 255, 255, 0.05); border: 1px solid var(--border);
            padding: 10px 18px; border-radius: 12px; cursor: pointer;
            display: flex; align-items: center; gap: 10px; z-index: 10002;
        }
        .h3-trigger span { color: #fff; font-size: 0.75rem; font-weight: 700; letter-spacing: 1px; }
        .h3-burger { width: 18px; height: 10px; position: relative; }
        .h3-burger div { position: absolute; height: 2px; background: #fff; border-radius: 10px; transition: 0.3s; width: 100%; }
        .b-1 { top: 0; } .b-2 { bottom: 0; width: 60%; right: 0; }
        .h3-trigger.active .b-1 { transform: translateY(4px) rotate(45deg); }
        .h3-trigger.active .b-2 { transform: translateY(-4px) rotate(-45deg); width: 100%; }

        /* Overlay & Scroll Fix */
        .h3-overlay {
            position: fixed; inset: 0; background: var(--glass);
            backdrop-filter: blur(40px); z-index: 10000;
            opacity: 0; visibility: hidden; transition: 0.4s ease;
            display: block; /* Flex yerine block kullanarak kaydırmayı kolaylaştırıyoruz */
            overflow-y: auto; /* İçerik taşarsa kaydır */
            -webkit-overflow-scrolling: touch; /* iOS için akıcı kaydırma */
            padding-top: 100px; /* Header'ın altında başlasın */
            padding-bottom: 50px;
        }
        .h3-overlay.open { opacity: 1; visibility: visible; }

        /* Grid */
        .h3-grid {
            display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;
            width: 90%; margin: 0 auto;
            transform: translateY(20px); transition: 0.5s ease;
        }
        .h3-overlay.open .h3-grid { transform: translateY(0); }

        .h3-item {
            background: rgba(255,255,255,0.03); border: 1px solid var(--border);
            padding: 25px 10px; border-radius: 24px; text-decoration: none;
            display: flex; flex-direction: column; align-items: center; gap: 15px;
            transition: 0.3s;
        }
        .h3-item i { font-size: 1.6rem; color: var(--accent); }
        .h3-item b { color: #fff; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.5px; }

        /* MOBİL AYARLAR */
        @media (max-width: 600px) {
            .h3-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
            .logo-text { display: none; }
            .h3-item { padding: 30px 10px; }
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
    
    btn.onclick = (e) => {
        e.stopPropagation();
        btn.classList.toggle('active');
        overlay.classList.toggle('open');
        
        // Menü açıkken arka plan kaymasın ama menü kendi içinde kaysın
        if(overlay.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };
});
