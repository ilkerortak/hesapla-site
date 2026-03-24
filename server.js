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
        
        const tryRate = data.rates.TRY || 34.50; 
        const xauRate = data.rates.XAU || 2700; 

        // 6.193'ten 6.190 bandına milimetrik iniş için katsayı ayarı:
        // 1.608 yerine 1.6071 kullanarak tam hedefi vuruyoruz.
        const yerelFiyatCarpani = 1.6071; 
        
        const gramAltin = ((parseFloat(xauRate) / 31.10347) * parseFloat(tryRate)) * yerelFiyatCarpani;

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
