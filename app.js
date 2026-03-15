// app.js - Tam Kod
const fileInput = document.getElementById('fileInput'); // HTML'indeki dosya inputunun ID'si
const generateBtn = document.getElementById('generateBtn');
const modelViewer = document.querySelector('model-viewer');
const downloadBtn = document.getElementById('downloadBtn');

generateBtn.addEventListener('click', async () => {
    const file = fileInput.files[0];
    if (!file) return alert("Lütfen bir fotoğraf yükleyin!");

    generateBtn.innerText = "⏳ İşleniyor...";
    generateBtn.disabled = true;

    try {
        // TOKEN GÜVENLİĞİ: Eğer bu bir web uygulamasıysa, 
        // güvenlik için token'ı burada değil, backend'de saklaman gerekir.
        // Ancak hızlı deneme için aşağıya ekliyoruz:
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

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Hatası: ${response.status} - ${errorText}`);
        }

        const blob = await response.blob();
        const modelUrl = URL.createObjectURL(blob);

        // Modeli görüntüleyiciye aktar
        modelViewer.src = modelUrl;
        generateBtn.innerText = "✅ Model Hazır!";
        downloadBtn.disabled = false;

        downloadBtn.onclick = () => {
            const a = document.createElement('a');
            a.href = modelUrl;
            a.download = 'model.obj';
            a.click();
        };

    } catch (e) {
        console.error(e);
        alert("Hata oluştu, konsolu (F12) kontrol edin: " + e.message);
        generateBtn.innerText = "🧠 3D Model Oluştur";
        generateBtn.disabled = false;
    }
});
