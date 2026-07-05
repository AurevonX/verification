async function loadData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error('لم يتم العثور على ملف البيانات');
        return await response.json();
    } catch (error) {
        console.error('خطأ في تحميل البيانات:', error);
        return [];
    }
}
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
function displayDocument(doc) {
    document.getElementById('docNumber').textContent = doc.id || '---';
    document.getElementById('issueDate').textContent = doc.date || '---';
}
function showInvalid() {
    window.location.href = 'invalid.html';
}
(async function init() {
    const code = getQueryParam('v');
    if (!code) {
        displayDocument({ id: '2026-001254', date: '05 July 2026' });
        return;
    }
    const data = await loadData();
    const doc = data.find(item => item.code === code);
    if (doc) {
        displayDocument(doc);
    } else {
        showInvalid();
    }
})();