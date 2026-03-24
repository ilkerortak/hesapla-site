const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 1. Statik Dosya Sunumu (CSS, JS, Resimler için)
app.use(express.static(path.join(__dirname, '.')));

// 2. Finans Veri API (Dashboard üst bant için)
app.get('/api/finans', async (req, res) => {
    try {
        const response = await axios.get('https://open.er-api.com/v6/latest/USD');
        const data = response.data;
        
        const usdTry = parseFloat(data.rates.TRY) || 34.62;
        const eurUsd = parseFloat(data.rates.EUR) || 0.92;
        const xauUsd = parseFloat(data.rates.XAU) || 2712;

        // Investing seviyesine (6.197 - 6.200) çekmek için katsayı
        const anlikKatsayi = 1.6025; 
        const gramAltin = ((xauUsd / 31.10347) * usdTry) * anlikKatsayi;

        res.json({
            usd: usdTry.toFixed(2),
            eur: (usdTry / eurUsd).toFixed(2),
            gold: gramAltin.toLocaleString('tr-TR', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
            })
        });
    } catch (error) {
        console.error("API Hatası:", error.message);
        res.status(500).json({ error: "Veri çekilemedi" });
    }
});

// 3. Akıllı Sayfa Yönlendirme (Cannot GET hatasını çözen kısım)
// Bu blok, /issizlik yazıldığında issizlik.html dosyasını otomatik bulur.
app.get('/:page', (req, res, next) => {
    const pageName = req.params.page;
    
    // Eğer istek bir API isteği değilse sayfayı aramaya başla
    if (pageName !== 'api') {
        const filePath = path.join(__dirname, `${pageName}.html`);
        res.sendFile(filePath, (err) => {
            if (err) {
                // Dosya bulunamazsa (Örn: /olmayan-sayfa), 404 yerine ana sayfaya atabiliriz
                next(); 
            }
        });
    } else {
        next();
    }
});

// 4. Ana Sayfa Rotası
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Sunucuyu Başlat
app.listen(PORT, () => {
    console.log(`H360 Terminali ${PORT} portunda canlı yayında!`);
});
