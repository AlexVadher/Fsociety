function toggleMenu() {
    const menu = document.getElementById('navbarNav');
    menu.classList.toggle('hidden');
}

// Inicializar Alpine.js con la imagen actual
function imageUpload(initialUrl) {
    return {
        modal: false,
        previewUrl: initialUrl,
        fileName: '',

        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.fileName = file.name;
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.previewUrl = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
    };
}
