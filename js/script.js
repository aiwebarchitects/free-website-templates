const templateItems = [
    { name: "Modern Bold Portfolio", image: "templates/Bold-Portfolio.png", description: "A sleek and responsive Bold-Portfolio template", downloadLink: "data:application/zip;base64,aHR0cHM6Ly9mcmVlLXdlYnNpdGUtdGVtcGxhdGVzLm9uLWZsZWVrLmFwcC90ZW1wbGF0ZXMvQm9sZC1Qb3J0Zm9saW8uemlw" },
    { name: "Cannabis Club Html Template", image: "templates/Hanf-Freunde e.V. - Cannabis Sozialverein.png", description: "Professional and clean Cannabis Club website template", downloadLink: "data:application/zip;base64,aHR0cHM6Ly9mcmVlLXdlYnNpdGUtdGVtcGxhdGVzLm9uLWZsZWVrLmFwcC90ZW1wbGF0ZXMvQ2FubmFiaXMtQ2x1Yi1IdG1sLVRlbXBsYXRlLnppcA==" },
    { name: "Travel Blog", image: "templates/free-travel-blog-template.png", description: "Inspiring travel blog template", downloadLink: "data:application/zip;base64,aHR0cHM6Ly9mcmVlLXdlYnNpdGUtdGVtcGxhdGVzLm9uLWZsZWVrLmFwcC90ZW1wbGF0ZXMvZnJlZS10cmF2ZWwtYmxvZy10ZW1wbGF0ZS56aXA=" },
];

function renderTemplates(items) {
    const templateGrid = document.getElementById('templateGrid');
    templateGrid.innerHTML = '';
    items.forEach(item => {
        const templateCard = document.createElement('div');
        templateCard.className = 'col';
        templateCard.innerHTML = `
            <div class="portfolio-card h-100">
                <div class="portfolio-image-wrapper">
                    <img src="${item.image}" alt="${item.name} template" class="portfolio-image">
                </div>
                <div class="portfolio-overlay">
                    <div class="portfolio-overlay-content">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <button class="btn btn-primary btn-sm download-btn">
                            <i class="fas fa-download me-1"></i> Download
                        </button>
                    </div>
                </div>
            </div>
        `;
        templateCard.querySelector('.download-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            showDownloadModal(item);
        });
        templateGrid.appendChild(templateCard);
    });
}

function showDownloadModal(item) {
    const modal = new bootstrap.Modal(document.getElementById('downloadModal'));
    document.getElementById('downloadModalLabel').textContent = `Download ${item.name}`;
    generateCaptcha();
    modal.show();

    // Store the current item for download
    document.getElementById('verifyCaptcha').dataset.downloadLink = item.downloadLink;
}

let captchaText = '';

function generateCaptcha() {
    const canvas = document.getElementById('captchaCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '30px Arial';
    ctx.fillStyle = '#333';
    captchaText = Math.random().toString(36).substring(2, 8).toUpperCase();
    ctx.fillText(captchaText, 40, 40);
}

document.getElementById('verifyCaptcha').addEventListener('click', () => {
    const userInput = document.getElementById('captchaInput').value.toUpperCase();
    if (userInput === captchaText) {
        const downloadLink = document.getElementById('verifyCaptcha').dataset.downloadLink;
        if (downloadLink) {
            // Decode the base64 URL
            const actualUrl = atob(downloadLink.split(',')[1]);
            
            // Create and click a download link
            const link = document.createElement('a');
            link.href = actualUrl;
            link.target = '_blank'; // Open in a new tab
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert('Download link not available for this template.');
        }
        bootstrap.Modal.getInstance(document.getElementById('downloadModal')).hide();
    } else {
        alert('Incorrect captcha. Please try again.');
        generateCaptcha();
    }
});

document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredItems = templateItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm) || 
        item.description.toLowerCase().includes(searchTerm)
    );
    renderTemplates(filteredItems);
});

const backToTopButton = document.getElementById('backToTop');
const header = document.getElementById('siteHeader');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

renderTemplates(templateItems);

window.addEventListener('load', () => {
    setTimeout(() => {
        header.classList.add('visible');
    }, 300);
});
