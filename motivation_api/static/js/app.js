// Elementleri bir kez seçip hafızaya (RAM) alıyoruz (Hız için kritik)
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const categoryName = document.getElementById('category-name');
const quoteBox = document.querySelector('.quote-content');
const authorBox = document.querySelector('.author-section');
const nextBtn = document.getElementById('next-btn');

nextBtn.addEventListener('click', getNewQuote);

function getNewQuote() {
    // 1. Gecikme hissini yok etmek için butonu geçici olarak kilitle (Çoklu basımı engeller)
    nextBtn.disabled = true;

    // 2. Animasyonu başlat (Hafif bir fade-out)
    quoteBox.style.opacity = 0.3;
    authorBox.style.opacity = 0.3;

    // 3. Veriyi çek (Bekletme -setTimeout- olmadan direkt fetch)
    fetch('/api/random-quote')
        .then(response => response.json())
        .then(data => {
            // 4. Veriyi ekrana bas (En hızlı işlem)
            quoteText.innerText = data.text;
            quoteAuthor.innerText = data.author;
            categoryName.innerText = data.category;

            // 5. Opaklığı anında geri getir
            quoteBox.style.opacity = 1;
            authorBox.style.opacity = 1;
            
            // Butonu tekrar aç
            nextBtn.disabled = false;
        })
        .catch(err => {
            console.error("Hız hatası:", err);
            nextBtn.disabled = false;
        });
}