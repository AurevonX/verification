async function loadData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('ملف البيانات غير موجود');
        }
        return await response.json();
    } catch (error) {
        console.error('خطأ في تحميل البيانات:', error);
        return [];
    }
}

function getVerificationCode() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('v') || urlParams.get('code');
}

function displayDocument(doc) {
    const docNumberEl = document.getElementById('docNumber');
    if (docNumberEl) {
        docNumberEl.textContent = doc.id || 'غير متوفر';
    }

    const issueDateEl = document.getElementById('issueDate');
    if (issueDateEl) {
        issueDateEl.textContent = doc.date || 'غير متوفر';
    }

    const statusBadge = document.querySelector('.status-badge');
    if (statusBadge) {
        statusBadge.textContent = '✓ صالحة';
        statusBadge.style.background = '#1a8d4c';
    }
}

function showInvalidPage() {
    window.location.href = 'invalid.html';
}

(async function init() {
    const code = getVerificationCode();

    if (!code) {
        displayDocument({
            id: '2026-001254',
            date: '05 July 2026'
        });
        return;
    }

    const data = await loadData();
    const doc = data.find(item => item.code === code);

    if (doc) {
        displayDocument(doc);
    } else {
        showInvalidPage();
    }
})();

function updateDocumentData(id, date) {
    document.getElementById('docNumber').textContent = id;
    document.getElementById('issueDate').textContent = date;
}
