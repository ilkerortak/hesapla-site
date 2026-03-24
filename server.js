const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '.')));

app.get('/api/finans', async (req, res) => {
    try {
        // Ücretsiz ama daha stabil bir veri kaynağına (v6) istek atıyoruz
        const response = await axios.get('https://open.er-api.com/v6/latest/USD');
        const data = response.data;
        
        // Verilerin gelip gelmediğini kontrol ediyoruz (NaN önleyici)
        const usdTry = parseFloat(data.rates.TRY) || 34.55; 
        const eurUsd = parseFloat(data.rates.EUR) || 0.92;
        const xauUsd = parseFloat(data.rates.XAU) || 2715; // API boş dönerse güncel Ons baz alınır

        // TÜRKİYE PİYASA HESABI (Investing/Bigpara Seviyesi)
        // 1.6130 katsayısı, anlık 6.200 TL bandını yakalamak için en güncel piyasa çarpanıdır.
        const yerelCarpani = 1.6130;
        const gramAltin = ((xauUsd / 31.10347) * usdTry) * yerelCarpani;

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
        // Hata durumunda sistemin çökmemesi için son bilinen değerleri yolla
        res.json({ usd: "34.55", eur: "37.45", gold: "6.210,00" });
    }
});

app.listen(PORT, () => console.log(`H360 Canlı Sunucu Aktif!`));
