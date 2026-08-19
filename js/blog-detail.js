// js/blog-detail.js - Xử lý hiển thị nội dung bài viết và thanh tiến trình đọc
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("blog-detail-container");
  const progressBar = document.getElementById("reading-progress");

  // 1. Đọc ID bài viết từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  if (!postId) {
    container.innerHTML = `
      <div class="text-center py-20 font-mono">
        <h1 class="text-2xl text-rose-400 font-bold mb-4">Không tìm thấy ID bài viết!</h1>
        <a href="blogs.html" class="filter-btn active inline-block">Quay lại danh sách Blogs</a>
      </div>
    `;
    return;
  }

  // 2. Fetch bài viết từ blogs.json
  try {
    const res = await fetch("data/blogs.json");
    const blogs = await res.json();
    const post = blogs.find((p) => p.id === postId);

    if (!post) {
      container.innerHTML = `
        <div class="text-center py-20 font-mono">
          <h1 class="text-2xl text-rose-400 font-bold mb-4">Bài viết không tồn tại hoặc đã bị xóa!</h1>
          <a href="blogs.html" class="filter-btn active inline-block">Quay lại danh sách Blogs</a>
        </div>
      `;
      return;
    }

    document.title = `${post.title} - SinanTokmak Blog`;

    // 3. Render toàn bộ nội dung bài viết
    container.innerHTML = `
      <article class="font-sans">
        <!-- Header bài viết -->
        <header class="mb-8">
          <div class="flex items-center gap-3 mb-4">
            <span class="bg-[#26D9B5] text-[#212429] text-xs font-bold font-mono px-3 py-1 rounded-full uppercase">
              ${post.category}
            </span>
            <span class="text-xs text-gray-400 font-mono">• ${post.date} • ${post.readTime}</span>
          </div>

          <h1 class="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-6 tracking-tight">
            ${post.title}
          </h1>

          <!-- Nút sao chép chia sẻ (Clipboard API) -->
          <div class="flex items-center gap-4 py-3 border-y border-gray-700/80">
            <div class="flex items-center gap-2 text-xs text-gray-300 font-mono">
              <span>Tác giả: <strong class="text-white">${post.author}</strong></span>
            </div>
            <button type="button" id="share-blog-btn" class="ml-auto filter-btn text-xs flex items-center gap-2">
              <i class="fa-regular fa-copy"></i>
              <span id="share-text">Chia sẻ bài viết</span>
            </button>
          </div>
        </header>

        <!-- Ảnh bìa -->
        <div class="w-full h-80 rounded-2xl overflow-hidden mb-8 border border-gray-700">
          <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover">
        </div>

        <!-- Mục lục nhảy nhanh (Table of Contents) -->
        <nav class="bg-[#2C3137] border border-gray-700 rounded-xl p-6 mb-10 font-mono" aria-label="Mục lục bài viết">
          <h2 class="text-sm font-bold text-[#26D9B5] uppercase mb-3 flex items-center gap-2">
            <i class="fa-solid fa-list-ul"></i> Mục lục bài viết
          </h2>
          <ul class="text-xs space-y-2 text-gray-300">
            <li><a href="#intro" class="hover:text-[#26D9B5] transition">1. Giới thiệu tổng quan</a></li>
            <li><a href="#section-1" class="hover:text-[#26D9B5] transition">${post.content.section1_title}</a></li>
            <li><a href="#section-2" class="hover:text-[#26D9B5] transition">${post.content.section2_title}</a></li>
            <li><a href="#summary" class="hover:text-[#26D9B5] transition">4. Tổng kết & Đánh giá</a></li>
          </ul>
        </nav>

        <!-- Thân bài viết -->
        <div class="text-gray-300 text-sm sm:text-base leading-relaxed space-y-8">
          <section id="intro">
            <p class="text-base text-gray-200 font-medium leading-relaxed italic border-l-2 border-[#26D9B5] pl-4 py-1">
              "${post.content.intro}"
            </p>
          </section>

          <section id="section-1">
            <h2 class="text-2xl font-bold text-white mb-3 text-[#26D9B5] font-mono">
              ${post.content.section1_title}
            </h2>
            <p class="leading-loose">${post.content.section1_body}</p>
          </section>

          <section id="section-2">
            <h2 class="text-2xl font-bold text-white mb-3 text-[#26D9B5] font-mono">
              ${post.content.section2_title}
            </h2>
            <p class="leading-loose">${post.content.section2_body}</p>
          </section>

          <section id="summary" class="bg-[#2C3137]/60 p-6 rounded-xl border border-gray-700/80">
            <h2 class="text-lg font-bold text-white mb-2 font-mono">Tổng kết</h2>
            <p class="leading-relaxed text-gray-300">${post.content.summary_text}</p>
          </section>
        </div>

        <!-- Tags bài viết -->
        <div class="mt-12 pt-6 border-t border-gray-700 flex items-center gap-2 flex-wrap font-mono text-xs">
          <span class="text-gray-400">Tags:</span>
          ${post.tags.map((t) => `<span class="bg-slate-800 text-[#26D9B5] px-3 py-1 rounded-full">#${t}</span>`).join("")}
        </div>
      </article>
    `;

    // 4. Xử lý nút Clipboard Share
    const shareBtn = document.getElementById("share-blog-btn");
    const shareText = document.getElementById("share-text");
    shareBtn?.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        shareText.textContent = "Đã sao chép link!";
        shareBtn.classList.add("active");
        setTimeout(() => {
          shareText.textContent = "Chia sẻ bài viết";
          shareBtn.classList.remove("active");
        }, 2000);
      } catch (e) {
        console.error(e);
      }
    });
  } catch (err) {
    container.innerHTML = `<p class="text-rose-400 text-center py-20 font-mono">Lỗi tải dữ liệu: ${err.message}</p>`;
  }

  // 5. Tính toán thanh tiến trình đọc khi cuộn
  window.addEventListener("scroll", () => {
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }
  });
});