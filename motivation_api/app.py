import json
import random
import os
from flask import Flask, render_template, jsonify

app = Flask(__name__)

# 1. DOSYA YOLU AYARI
BASE_PATH = os.path.dirname(os.path.abspath(__file__))
JSON_PATH = os.path.join(BASE_PATH, 'quotes.json')

# 2. VERİYİ BELLEĞE YÜKLEME (Hızın Anahtarı)
# Uygulama başlarken bir kez çalışır, siteyi çok hızlandırır.
def get_all_quotes():
    try:
        with open(JSON_PATH, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        # Dosya yoksa veya bozuksa uygulamanın çökmesini önler
        return [{"text": "Veri dosyası bulunamadı!", "author": "Sistem", "category": "Hata"}]

# Tüm sözleri global bir değişkene atıyoruz
ALL_QUOTES = get_all_quotes()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/random-quote')
def get_quote():
    # Artık load_quotes() çağırıp diske gitmiyoruz, RAM'deki listeden seçiyoruz
    random_selection = random.choice(ALL_QUOTES)
    return jsonify(random_selection)

if __name__ == '__main__':
    # Threaded=True eklemek birden fazla isteği daha rahat yönetmesini sağlar
    app.run(debug=True, threaded=True)