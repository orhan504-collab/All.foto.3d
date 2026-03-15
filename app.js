const fileInput = document.getElementById('fileInput');
const generateBtn = document.getElementById('generateBtn');
const modelViewer = document.getElementById('modelViewer');
const imgPreview = document.getElementById('imgPreview');

// Fotoğraf seçilince önizle
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        imgPreview.src = URL.createObjectURL(file);
        imgPreview.parentElement.classList.remove('hidden');
    }
});

// API ile model oluştur
generateBtn.addEventListener('click', async () => {
    const file = fileInput.files[0];
    if (!file) return alert("Lütfen önce bir fotoğraf seçin!");

    generateBtn.innerText = "⏳ İşleniyor...";
    generateBtn.disabled = true;

    try {
        const response = await fetch("https://api-inference.huggingface.co/models/stabilityai/TripoSR", {
            method: 'POST',
            headers: { 
                "Authorization": "Bearer Hf_OAiIasPlHBTwZQizYPXjmBeQtcXCIYhTma",
                "Content-Type": "application/octet-stream"
            },
            body: file
        });

        if (!response.ok) throw new Error("API hatası: " + response.status);

        const blob = await response.blob();
        modelViewer.src = URL.createObjectURL(blob);
        generateBtn.innerText = "✅ Model Hazır!";
    } catch (e) {
        alert("Hata oluştu, konsolu (F12) kontrol edin: " + e.message);
        generateBtn.innerText = "🧠 3D Model Oluştur";
    }
    generateBtn.disabled = false;
});
