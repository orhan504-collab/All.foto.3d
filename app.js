// app.js
const fileInput = document.getElementById('fileInput');
const generateBtn = document.getElementById('generateBtn');
const modelViewer = document.getElementById('modelViewer');

generateBtn.addEventListener('click', async () => {
    const file = fileInput.files[0];
    if (!file) return alert("Lütfen fotoğraf seç!");

    generateBtn.innerText = "⏳ İşleniyor...";
    generateBtn.disabled = true;

    try {
        // Yeni yaklaşım: İstek başlıklarını ve modunu düzeltelim
        const response = await fetch("https://api-inference.huggingface.co/models/stabilityai/TripoSR", {
            method: 'POST',
            headers: {
                "Authorization": "Bearer Hf_OAiIasPlHBTwZQizYPXjmBeQtcXCIYhTma",
                "Content-Type": "application/octet-stream"
            },
            body: file,
            mode: 'cors' // CORS isteğini açıkça belirtelim
        });

        if (response.status === 503) {
            throw new Error("Model şu an yükleniyor, lütfen 10 saniye bekleyip tekrar dene.");
        }
        
        if (!response.ok) throw new Error("Sunucu hatası: " + response.status);

        const blob = await response.blob();
        const modelUrl = URL.createObjectURL(blob);
        modelViewer.src = modelUrl;
        generateBtn.innerText = "✅ Model Hazır!";
    } catch (e) {
        console.error(e);
        alert("Hata: " + e.message);
        generateBtn.innerText = "🧠 3D Model Oluştur";
    } finally {
        generateBtn.disabled = false;
    }
});
