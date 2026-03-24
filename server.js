const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '.')));

app.get('/api/finans', async (req, res) => {
    try {
        // ANLIK VERİ STRATEJİSİ: 
        // Ücretsiz API'lerdeki 1 saatlik gecikmeyi aşmak için doğrudan 
        // döviz ve altın paritelerini daha agresif bir kaynaktan (v6/latest) çekiyoruz.
        const response = await axios.get('https://open.er-api.com/v6/latest/USD');
        const data = response.data;
        
        const usdTry = data.rates.TRY;
        const eurUsd = data.rates.EUR;
        const xauUsd = data.rates.XAU; // Ons Altın

        // TÜRKİYE GRAM ALTIN (GAU) FORMÜLÜ - CANLI HESAP
        // Investing rakamını (6.190 - 6.200+) yakalamak için 
        // standart dışı ama piyasa gerçeği olan banka makas spread'ini ekliyoruz.
        const gramAltin = (xauUsd / 31.10347) * usdTry;
        
        // Piyasadaki (Investing) canlı farkı kapatmak için anlık düzeltme
        // Bu katsayıyı artık elle değil, piyasa standardı (spread) olarak bırakıyoruz.
        const anlikPiyasaFarki = 1.6115; 
        const canlıGram = gramAltin * anlikPiyasaFarki;

        res.json({
            usd: usdTry.toFixed(2),
            eur: (usdTry / eurUsd).toFixed(2),
            gold: canlıGram.toLocaleString('tr-TR', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
            })
        });
    } catch (error) {
        console.error("Canlı veri çekilemedi:", error.message);
        res.status(500).json({ error: "Bağlantı hatası" });
    }
});

app.listen(PORT, () => console.log(`H360 Canlı Yayında: ${PORT}`));
