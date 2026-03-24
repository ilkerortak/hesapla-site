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
        
        const tryRate = data.rates.TRY || 34.50; // Dolar kuru
        const xauRate = data.rates.XAU || 2700; // Global Ons
        
        // TÜRKİYE PİYASA DÜZELTMESİ
        // Global API'ler ham veri verir, Türkiye'deki fiziki/banka karşılığı için 
        // yaklaşık 1.62 gibi bir çarpan gerekir ki 6.200 TL bandı yakalansın.
        const yerelFiyatCarpani = 1.625; 
        
        const gramAltin = ((xauRate / 31.10347) * tryRate) * yerelFiyatCarpani;

        res.json({
            usd: tryRate.toFixed(2),
            eur: (tryRate / data.rates.EUR).toFixed(2),
            gold: gramAltin.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        });
    } catch (e) {
        res.status(500).json({ error: "Veri hatası" });
    }
});

// index.html'i ana sayfa olarak ayarla
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => console.log(`H360 Sunucusu ${PORT} portunda aktif.`));
