function generateRandomCode(length = 16) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
function generateCode() {
    const docId = document.getElementById('docId').value.trim();
    const docDate = document.getElementById('docDate').value.trim();
    if (!docId || !docDate) {
        alert('يرجى إدخال رقم الوثيقة وتاريخ الإصدار');
        return;
    }
    const code = generateRandomCode(16);
    const jsonEntry = '  {\n    "code": "' + code + '",\n    "id": "' + docId + '",\n    "date": "' + docDate + '"\n  }';
    const resultBox = document.getElementById('resultBox');
    const codeBlock = document.getElementById('codeBlock');
    codeBlock.textContent = jsonEntry;
    resultBox.classList.add('show');
    resultBox.dataset.json = jsonEntry;
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
function copyCode() {
    const codeBlock = document.getElementById('codeBlock');
    const text = codeBlock.textContent;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            const btn = document.querySelector('.btn-copy');
            const originalText = btn.textContent;
            btn.textContent = '✅ تم النسخ!';
            setTimeout(() => { btn.textContent = originalText; }, 2000);
        }).catch(() => { fallbackCopy(text); });
    } else {
        fallbackCopy(text);
    }
}
function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        alert('تم نسخ الكود!');
    } catch (e) {
        alert('حدث خطأ أثناء النسخ، يرجى نسخ الكود يدويًا');
    }
    document.body.removeChild(textarea);
}
function resetForm() {
    document.getElementById('docId').value = '';
    document.getElementById('docDate').value = '';
    document.getElementById('resultBox').classList.remove('show');
    document.getElementById('resultBox').dataset.json = '';
    document.getElementById('docId').focus();
}