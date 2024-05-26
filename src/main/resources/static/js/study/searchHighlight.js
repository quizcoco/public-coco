$(document).ready(function() {
    // URL에서 검색어(q 파라미터)를 가져옴
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('q');
    
    // 검색어가 있는 경우 하이라이트 처리
    if (searchTerm) {
        highlightSearchTerm(searchTerm, '.list-shape');
    }
});

// 검색어를 하이라이트하는 함수
function highlightSearchTerm(searchTerm, containerSelector) {
    const regex = new RegExp(searchTerm, 'gi');
    $(containerSelector).each(function() {
        const htmlContent = $(this).html();
        const highlightedContent = htmlContent.replace(regex, match => `<span class="highlight">${match}</span>`);
        $(this).html(highlightedContent);
    });
}
