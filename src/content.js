import QRCode from 'qrcode';
import scanner from './scanner.svg';

document.querySelectorAll('iframe').forEach(iframe => {
    const url = iframe.src;
    if (url) {
        const wrapper = document.createElement('div');
        wrapper.style.position = 'absolute';
        wrapper.style.top = '5px';
        wrapper.style.right = '5px';

        const icon = document.createElement('img');
        icon.src = scanner;
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
        qrContainer.style.backgroundColor = 'white';
        qrContainer.style.borderRadius = '4px';
        qrContainer.style.overflow = 'hidden';
        qrContainer.style.boxShadow = '0px 0px 2px 0px #aaa';
        qrContainer.style.width = 'max-content'
        QRCode.toDataURL(url).then(url => {
            const img = document.createElement('img');
            img.src = url;
            img.style.width = '150px';
            qrContainer.appendChild(img);

            // Add "Open in new tab" link
            const link = document.createElement('a');
            link.href = iframe.src;
            link.target = '_blank';
            link.textContent = 'Open in new tab';
            link.style.display = 'block';
            link.style.textAlign = 'center';
            link.style.color = '#666';
            link.style.textDecoration = 'none';
            link.style.padding = '5px';
            qrContainer.appendChild(link);
        });

        let isOverIcon = false;
        let isOverQR = false;

        wrapper.addEventListener('mouseenter', () => {
            isOverIcon = true;
            qrContainer.style.display = 'block';
        });
        wrapper.addEventListener('mouseleave', () => {
            isOverIcon = false;
            setTimeout(() => {
                if (!isOverQR) {
                    qrContainer.style.display = 'none';
                }
            }, 100);
        });

        qrContainer.addEventListener('mouseenter', () => {
            isOverQR = true;
        });
        qrContainer.addEventListener('mouseleave', () => {
            isOverQR = false;
            if (!isOverIcon) {
                qrContainer.style.display = 'none';
            }
        });

        wrapper.appendChild(icon);
        wrapper.appendChild(qrContainer);

        // iframe.parentElement.style.position = 'relative';
        iframe.parentElement.appendChild(wrapper);
    }
});
