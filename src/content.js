import QRCode from 'qrcode';
import scanner from './scanner.svg';

document.querySelectorAll('iframe').forEach(iframe => {
    const url = iframe.src;
    if (url) {
        const icon = document.createElement('img');
        icon.src = scanner;
        icon.style.position = 'absolute';
        icon.style.top = '5px';
        icon.style.right = '5px';
        icon.style.width = '20px';
        icon.style.height = '20px';
        icon.style.cursor = 'pointer';
        icon.title = 'Hover to see QR code';

        const qrContainer = document.createElement('div');
        qrContainer.style.display = 'none';
        qrContainer.style.position = 'absolute';
        qrContainer.style.top = '30px';
        qrContainer.style.right = '5px';
        qrContainer.style.zIndex = '9999';

        QRCode.toDataURL(url).then(url => {
            const img = document.createElement('img');
            img.src = url;
            img.style.width = '150px';
            qrContainer.appendChild(img);
        });

        icon.addEventListener('mouseenter', () => {
            qrContainer.style.display = 'block';
        });
        icon.addEventListener('mouseleave', () => {
            qrContainer.style.display = 'none';
        });

        // iframe.parentElement.style.position = 'relative';
        iframe.parentElement.appendChild(icon);
        iframe.parentElement.appendChild(qrContainer);
    }
});