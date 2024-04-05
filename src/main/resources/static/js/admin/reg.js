window.addEventListener('load', function() {

    // 최신 연도가 자동 입력 됨
    const inputYear = document.getElementById('input-year');
    const currentYear = new Date().getFullYear();

    inputYear.value = currentYear;
});
