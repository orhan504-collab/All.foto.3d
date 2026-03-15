// HTML elementlerini seçiyoruz
const fileInput = document.getElementById('fileInput');
const generateBtn = document.getElementById('generateBtn');
const modelViewer = document.getElementById('modelViewer');
const dropZone = document.getElementById('drop-zone');
const imgPreview = document.getElementById('imgPreview');

// 1. Drop Zone'a tıklandığında fileInput'u tetikle
dropZone.addEventListener('click', () => {
    fileInput.click();
});

// 2. Dosya seçildiğinde önizleme yap
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imgPreview.src = e.target.result;
            imgPreview.parentElement.classList.remove('hidden'); // Önizlemeyi göster
        };
        reader.readAsDataURL(file);
    }
});

// 3. 3D Model Oluşturma Butonu
generateBtn.addEventListener('click', async () => {
    const file = fileInput.files[0];
    if (!file) return alert("Lütfen önce bir fotoğraf yükleyin!");

    generateBtn.innerText = "⏳ 3D Model Oluşturuluyor...";
    generateBtn.disabled = true;

    try {
        const HF_TOKEN = "Hf_OAiIasPlHBTwZQizYPXjmBeQtcXCIYhTma"; 
        const API_URL = "https://api-inference.huggingface.co/models/stabilityai/TripoSR";

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${HF_TOKEN}`,
                "Content-Type": "application/octet-stream"
            },
            body: file
        });

        if (!response.ok) throw new Error("API yanıt vermedi: " + response.status);

        const blob = await response.blob();
        const modelUrl = URL.createObjectURL(blob);

        modelViewer.src = modelUrl;
        generateBtn.innerText = "✅ Model Hazır!";
        generateBtn.disabled = false;
        
    } catch (e) {
        console.error(e);
        alert("Hata: " + e.message);
        generateBtn.innerText = "🧠 3D Model Oluştur";
        generateBtn.disabled = false;
    }
});
