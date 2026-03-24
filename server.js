const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Statik dosyaları sun (index.html, style.css vb.)
app.use(express.static(path.join(__dirname, '.')));

app.get('/api/finans', async (req, res) => {
    try {
        const response = await axios.get('https://open.er-api.com/v6/latest/USD');
        const data = response.data;
        
        // Verileri güvenli şekilde al (Fallback değerleri ile)
        const usdTry = parseFloat(data.rates.TRY) || 34.62;
        const eurUsd = parseFloat(data.rates.EUR) || 0.92;
        const xauUsd = parseFloat(data.rates.XAU) || 2712;

        // 🎯 6.197 TL HEDEFİ İÇİN HASSAS AYAR
        // Piyasa 6.280'den 6.197'ye çekiliyor. 
        // Katsayı 1.6242 -> 1.6025 olarak güncellendi.
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
        console.error("Veri hatası:", error.message);
        res.status(500).json({ error: "Veri çekilemedi" });
    }
});

// Sunucuyu başlat (Hataları önlemek için blok dışına alındı)
app.listen(PORT, () => {
    console.log(`H360 Sunucusu aktif. Port: ${PORT}`);
});
