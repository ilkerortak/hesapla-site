const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 1. Statik Dosya Sunumu (CSS, JS ve Mevcut HTML'ler için)
app.use(express.static(path.join(__dirname, '.')));

// 2. Finans Veri API (Dashboard Üst Bant)
app.get('/api/finans', async (req, res) => {
    try {
        const response = await axios.get('https://open.er-api.com/v6/latest/USD');
        const data = response.data;
        
        const usdTry = parseFloat(data.rates.TRY) || 34.62;
        const eurUsd = parseFloat(data.rates.EUR) || 0.92;
        const xauUsd = parseFloat(data.rates.XAU) || 2712;

        // Investing seviyesine yakınsar katsayı
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
        console.error("Finans API Hatası:", error.message);
        res.status(500).json({ error: "Veri çekilemedi" });
    }
});

// 3. Akıllı Sayfa Yönlendirme (12 Modül İçin)
app.get('/:page', (req, res, next) => {
    const pageName = req.params.page;
    
    // Geçerli olan tüm modül isimleri
    const validPages = [
        'netmaas', 'tazminat', 'issizlik', 'kredi', 
        'yas', 'doviz', 'kdv', 'mesai', 'cv', 
        'faiz', 'yakit', 'enflasyon'
    ];

    // Eğer istek bir API çağrısı değilse ve geçerli bir sayfaysa
    if (pageName !== 'api' && validPages.includes(pageName)) {
        res.sendFile(path.join(__dirname, `${pageName}.html`), (err) => {
            if (err) {
                // Dosya fiziksel olarak yoksa ana sayfaya yönlendir
                res.redirect('/');
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

// 5. 404 Hata Yönetimi (Bilinmeyen yollarda ana sayfaya güvenli dönüş)
app.use((req, res) => {
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`H360 Finansal Analiz Merkezi ${PORT} portunda aktif.`);
});
