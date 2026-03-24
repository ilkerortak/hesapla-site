const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Dosyaların ana dizinde olduğunu kesinleştirelim
app.use(express.static(path.join(__dirname, '.')));

app.get('/api/finans', async (req, res) => {
    try {
        const response = await axios.get('https://open.er-api.com/v6/latest/USD');
        const data = response.data;
        const tryRate = data.rates.TRY;
        const xauRate = data.rates.XAU; 
        const eurRate = data.rates.EUR;

        res.json({
            usd: tryRate.toFixed(2),
            eur: (tryRate / eurRate).toFixed(2),
            gold: ((xauRate / 31.10347) * tryRate).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        });
    } catch (e) {
        console.error("API Hatası:", e.message);
        res.status(500).json({ error: "Veri çekilemedi" });
    }
});

// index.html'i ana sayfa olarak ayarla
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => console.log(`H360 Sunucusu ${PORT} portunda aktif.`));
