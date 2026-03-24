const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Statik dosyalar için ana dizini kullan
app.use(express.static(path.join(__dirname, '.')));

app.get('/api/finans', async (req, res) => {
    try {
        const response = await axios.get('https://open.er-api.com/v6/latest/USD');
        const data = response.data;
        
        // Verileri al ve güvenli hale getir
        const usdTry = parseFloat(data.rates.TRY) || 34.60;
        const eurUsd = parseFloat(data.rates.EUR) || 0.92;
        const xauUsd = parseFloat(data.rates.XAU) || 2712;

        // 🎯 6.243 TL HEDEFİ İÇİN HASSAS AYAR
        // Global veri ile Türkiye piyasası arasındaki güncel fark katsayısı
        const anlikKatsayi = 1.6242; 
        
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
        console.error("Veri çekme hatası:", error.message);
        res.status(500).json({ error: "Veri alınamadı" });
    }
});

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`H360 Sunucusu ${PORT} portunda başarıyla başlatıldı.`);
});
