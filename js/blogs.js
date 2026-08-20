// js/blogs.js - Quản lý lọc, tìm kiếm và phân trang Blog
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("blogs-container");
  const searchInput = document.getElementById("blog-search-input");
  const filterBtns = document.querySelectorAll("#category-filters .filter-btn");
  const paginationContainer = document.getElementById("pagination-controls");

  let allBlogs = [];
  let filteredBlogs = [];
  let currentCategory = "all";
  let searchQuery = "";
  let currentPage = 1;
  const itemsPerPage = 4; // 4 bài viết mỗi trang

  // 1. Tải dữ liệu từ file blogs.json
  try {
    const res = await fetch("data/blogs.json");
    if (!res.ok) throw new Error("Không thể nạp dữ liệu bài viết!");
    allBlogs = await res.json();
    filteredBlogs = [...allBlogs];
    renderPage();
  } catch (err) {
    container.innerHTML = `<p class="text-rose-400 col-span-full text-center">Lỗi: ${err.message}</p>`;
  }

  // 2. Hàm lọc tổng hợp (Category + Search Keyword)
  function applyFilters() {
    filteredBlogs = allBlogs.filter((post) => {
      const matchCategory =
        currentCategory === "all" || post.category === currentCategory;
      const matchSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchCategory && matchSearch;
    });

    currentPage = 1; // Reset về trang 1 sau khi lọc
    renderPage();
  }

  // 3. Render danh sách bài viết theo phân trang
  function renderPage() {
    if (filteredBlogs.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-12 bg-[#2C3137] rounded-2xl border border-gray-700">
          <i class="fa-regular fa-folder-open text-4xl text-gray-500 mb-3"></i>
          <p class="text-gray-300 font-mono text-sm">Không tìm thấy bài viết nào phù hợp với từ khóa "${searchQuery}".</p>
        </div>
      `;
      paginationContainer.innerHTML = "";
      return;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = filteredBlogs.slice(startIndex, endIndex);

    container.innerHTML = paginatedItems
      .map(
        (post) => `
      <article class="bg-[#2C3137] border border-gray-700 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between hover:border-[#26D9B5] transition duration-300">
        <div>
          <div class="h-48 overflow-hidden relative">
            <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover hover:scale-105 transition duration-500">
            <span class="absolute top-3 right-3 bg-[#26D9B5] text-[#212429] text-[10px] font-bold font-mono px-3 py-1 rounded-full uppercase">
              ${post.category}
            </span>
          </div>
          <div class="p-6">
            <div class="flex items-center gap-3 text-xs text-gray-400 font-mono mb-2">
              <span><i class="fa-regular fa-calendar mr-1"></i>${post.date}</span>
              <span>•</span>
              <span><i class="fa-regular fa-clock mr-1"></i>${post.readTime}</span>
            </div>
            <h2 class="text-xl font-bold text-white mb-3 hover:text-[#26D9B5] transition">
              <a href="blog-detail.html?id=${post.id}">${post.title}</a>
            </h2>
            <p class="text-xs text-gray-300 leading-relaxed mb-4 line-clamp-3">
              ${post.summary}
            </p>
          </div>
        </div>

        <div class="px-6 pb-6 pt-0 flex justify-between items-center border-t border-gray-700/60 mt-auto">
          <div class="flex gap-1.5 flex-wrap pt-3">
            ${post.tags.map((tag) => `<span class="text-[10px] font-mono text-gray-400 bg-slate-800 px-2 py-0.5 rounded">#${tag}</span>`).join("")}
          </div>
          <a href="blog-detail.html?id=${post.id}" class="text-xs font-mono font-bold text-[#26D9B5] hover:underline pt-3 flex-shrink-0">
            Đọc bài →
          </a>
        </div>
      </article>
    `
      )
      .join("");

    renderPagination();
  }

  // 4. Render các nút phân trang
  function renderPagination() {
    const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
    if (totalPages <= 1) {
      paginationContainer.innerHTML = "";
      return;
    }

    let buttonsHtml = `
      <button type="button" class="filter-btn ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}" id="prev-page" ${currentPage === 1 ? "disabled" : ""}>
        ← Trang trước
      </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
      buttonsHtml += `
        <button type="button" class="filter-btn ${i === currentPage ? "active font-bold" : ""}" data-page="${i}">
          ${i}
        </button>
      `;
    }

    buttonsHtml += `
      <button type="button" class="filter-btn ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}" id="next-page" ${currentPage === totalPages ? "disabled" : ""}>
        Trang sau →
      </button>
    `;

    paginationContainer.innerHTML = buttonsHtml;

    // Gắn sự kiện chuyển trang
    paginationContainer
      .querySelectorAll("button[data-page]")
      .forEach((btn) => {
        btn.addEventListener("click", () => {
          currentPage = Number(btn.dataset.page);
          renderPage();
          window.scrollTo({ top: 150, behavior: "smooth" });
        });
      });

    document.getElementById("prev-page")?.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderPage();
        window.scrollTo({ top: 150, behavior: "smooth" });
      }
    });

    document.getElementById("next-page")?.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderPage();
        window.scrollTo({ top: 150, behavior: "smooth" });
      }
    });
  }

  // 5. Sự kiện bấm nút Lọc Category
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.dataset.category;
      applyFilters();
    });
  });

  // 6. Sự kiện gõ tìm kiếm (có Debounce nhẹ)
  let searchTimer;
  searchInput?.addEventListener("input", (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      searchQuery = e.target.value.trim();
      applyFilters();
    }, 250);
  });
});