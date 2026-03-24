const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Dosyalarını bulabilmesi için (index.html, style.css vb.)
app.use(express.static(__dirname));

app.get('/api/finans', async (req, res) => {
    try {
        // En güncel global veriyi çekiyoruz
        const response = await axios.get('https://open.er-api.com/v6/latest/USD');
        const data = response.data;
        
        const usdTry = data.rates.TRY;
        const xauUsd = data.rates.XAU; // Global Ons
        const eurUsd = data.rates.EUR;

        // Gram Altın (GAU) Hesaplama: (Ons / 31.1035) * Dolar
        const gramAltin = (xauUsd / 31.1035) * usdTry;

        res.json({
            usd: usdTry.toFixed(2),
            eur: (usdTry / eurUsd).toFixed(2),
            gold: gramAltin.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        });
    } catch (error) {
        res.status(500).json({ hata: "Veri alınamadı" });
    }
});

app.listen(PORT, () => console.log(`H360 Sunucusu ${PORT} portunda aktif.`));
