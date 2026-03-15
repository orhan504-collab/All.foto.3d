// Elementleri seçelim
const fileInput = document.getElementById('fileInput');
const dropZone = document.getElementById('drop-zone');
const previewContainer = document.getElementById('preview-container');
const imgPreview = document.getElementById('imgPreview');
const generateBtn = document.getElementById('generateBtn');
const modelViewer = document.getElementById('modelViewer');
const downloadBtn = document.getElementById('downloadBtn');

// 1. Tıklama ile Dosya Seçme
dropZone.addEventListener('click', () => fileInput.click());

// 2. Dosya Seçildiğinde Önizleme Göster
fileInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imgPreview.src = e.target.result;
            previewContainer.classList.remove('hidden');
            dropZone.classList.add('hidden');
        }
        reader.readAsDataURL(file);
    }
});

// 3. 🧠 Yapay Zeka İşlemini Başlat (Simülasyon)
generateBtn.addEventListener('click', async () => {
    if (!fileInput.files[0]) {
        alert("Lütfen önce bir fotoğraf yükleyin!");
        return;
    }

    // Butonu devre dışı bırak ve yükleniyor de
    generateBtn.innerText = "⏳ Yapay Zeka İşliyor...";
    generateBtn.disabled = true;

    try {
        // BURASI ÖNEMLİ: Gerçek bir projede burada AI API'sine (Meshy, CSM vb.) fetch isteği atılır.
        // Şimdilik bir gecikme ekleyerek süreci simüle ediyoruz.
        console.log("AI API'sine istek gönderiliyor...");
        
        await new Promise(resolve => setTimeout(resolve, 3000)); // 3 saniye bekle

        // 🧊 Test amaçlı bir 3D model yolu (Kendi .glb dosyanı buraya koyabilirsin)
        const demoModelUrl = "https://modelviewer.dev/shared-assets/models/Astronaut.glb";
        
        // Modeli görüntüleyiciye aktar
        modelViewer.src = demoModelUrl;
        
        // Başarılı mesajı ve İndirme butonunu aktif et
        generateBtn.innerText = "✅ Model Hazır!";
        downloadBtn.disabled = false;
        
        console.log("3D Model başarıyla oluşturuldu.");

    } catch (error) {
        alert("Bir hata oluştu: " + error);
        generateBtn.innerText = "🧠 3D Model Oluştur";
        generateBtn.disabled = false;
    }
});

// 4. ⬇ STL/GLB İndirme Fonksiyonu
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = modelViewer.src;
    link.download = 'ai_model_3d.glb'; // İleride STL'e çevrilebilir
    link.click();
});
