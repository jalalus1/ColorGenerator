const colorBox = document.getElementById('color-box');
const colorCodeElement = document.getElementById('color-code');
const generateButton = document.getElementById('generate-button');

const hexCharacters = "0123456789ABCDEF";

function generateRandomHexColor() {
    let color = '#';
    
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * hexCharacters.length);
        color += hexCharacters[randomIndex];
    }
    
    return color;
}

function isColorDark(hexColor) {
    const hex = hexColor.replace('#', '');
    
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    const luminosity = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    return luminosity < 0.5;
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = colorCodeElement.textContent;
        colorCodeElement.textContent = "COPIED!";
        
        setTimeout(() => {
            colorCodeElement.textContent = originalText;
        }, 1000);

    }).catch(err => {
        console.error('Copy failed:', err);
    });
}

function updateColorPalette() {
    const newColor = generateRandomHexColor();
    
    colorBox.style.backgroundColor = newColor;
    colorCodeElement.textContent = newColor;
    
    if (isColorDark(newColor)) {
        colorCodeElement.style.color = '#FFFFFF';
        colorCodeElement.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    } else {
        colorCodeElement.style.color = '#333333';
        colorCodeElement.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    }
}

// --- Event Listeners ---

generateButton.addEventListener('click', updateColorPalette);

colorCodeElement.addEventListener('click', () => {
    const colorCode = colorCodeElement.textContent;
    
    if (colorCode.startsWith('#')) {
        copyToClipboard(colorCode);
    }
});

updateColorPalette();