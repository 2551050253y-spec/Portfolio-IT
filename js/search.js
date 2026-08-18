// js/search.js
document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("search-btn");
  const overlay = document.getElementById("search-overlay");
  const searchInput = document.getElementById("search-input");
  let isOpen = false;

  function toggleSearch() {
    isOpen = !isOpen;
    if (isOpen) {
      overlay.classList.add("open");
      searchBtn.textContent = "✕ Đóng";
      searchBtn.setAttribute("aria-expanded", "true");
      setTimeout(() => searchInput.focus(), 100);
    } else {
      overlay.classList.remove("open");
      searchBtn.textContent = "🔍 Tìm kiếm";
      searchBtn.setAttribute("aria-expanded", "false");
      searchBtn.focus(); // Trả focus về nút bấm chuẩn A11y
    }
  }

  searchBtn.addEventListener("click", toggleSearch);

  // Nhấn Esc để đóng
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) {
      toggleSearch();
    }
  });

  // Click ra ngoài vùng search-box cũng đóng
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) toggleSearch();
  });
});