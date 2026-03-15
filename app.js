// HTML elementlerini seçiyoruz
const fileInput = document.getElementById('fileInput');
const generateBtn = document.getElementById('generateBtn');
const modelViewer = document.querySelector('model-viewer');

// 1. Fotoğraf seçildiğinde önizleme yapalım
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        console.log("Dosya seçildi:", file.name);
    }
});

// 2. 3D Model Oluşturma Butonu
generateBtn.addEventListener('click', async () => {
    const file = fileInput.files[0];
    
    // Hata Kontrolü
    if (!file) {
        alert("Lütfen önce bir fotoğraf yükleyin!");
        return;
    }

    // Butonu güncelle
    generateBtn.innerText = "⏳ 3D Model Oluşturuluyor...";
    generateBtn.disabled = true;

    try {
        // TOKEN GÜVENLİĞİ: Gerçek projede bunu .env veya secret'ta saklamalısın
        const HF_TOKEN = "Hf_OAiIasPlHBTwZQizYPXjmBeQtcXCIYhTma"; 
        const API_URL = "https://api-inference.huggingface.co/models/stabilityai/TripoSR";

        // API'ye fotoğrafı gönderiyoruz
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${HF_TOKEN}`,
                "Content-Type": "application/octet-stream"
            },
            body: file
        });

        if (!response.ok) {
            throw new Error(`API Hatası (${response.status}): Model oluşturulamadı.`);
        }

        // Gelen veriyi 3D modele çevir
        const blob = await response.blob();
        const modelUrl = URL.createObjectURL(blob);

        // ModelViewer'a yükle
        modelViewer.src = modelUrl;
        
        // Kullanıcıya bilgi ver
        generateBtn.innerText = "✅ Model Hazır!";
        generateBtn.disabled = false;

    } catch (e) {
        console.error("HATA:", e);
        alert("Bir hata oluştu: " + e.message);
        generateBtn.innerText = "🧠 3D Model Oluştur";
        generateBtn.disabled = false;
    }
});
