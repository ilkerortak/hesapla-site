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
        
        const tryRate = data.rates.TRY || 0;
        const eurRate = data.rates.EUR || 1;
        // Eğer API'den XAU gelmezse NaN olmaması için varsayılan bir ONS fiyatı koyuyoruz
        const xauRate = data.rates.XAU || 2680; 

        // Hesaplamayı kontrol altına alıyoruz
        const gauPrice = (parseFloat(xauRate) / 31.10347) * parseFloat(tryRate);

        res.json({
            usd: tryRate.toFixed(2),
            eur: (tryRate / eurRate).toFixed(2),
            gold: gauPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        });
    } catch (e) {
        console.error("Hata oluştu:", e.message);
        res.status(500).json({ error: "Veri çekilemedi" });
    }
});

// index.html'i ana sayfa olarak ayarla
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => console.log(`H360 Sunucusu ${PORT} portunda aktif.`));
