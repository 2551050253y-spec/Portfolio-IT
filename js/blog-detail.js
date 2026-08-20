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

   // 3. Render toàn bộ nội dung bài viết theo biến CSS (Tự động thích ứng Dark / Light Mode)
    container.innerHTML = `
      <article class="font-sans">
        <!-- Header bài viết -->
        <header class="mb-8">
          <div class="flex items-center gap-3 mb-4">
            <span class="tech-badge uppercase font-mono">
              ${post.category}
            </span>
            <span class="text-xs text-[var(--text-muted)] font-mono">• ${post.date} • ${post.readTime}</span>
          </div>

          <h1 class="text-3xl sm:text-4xl font-extrabold text-[var(--text-main)] leading-tight mb-6 tracking-tight">
            ${post.title}
          </h1>

          <!-- Nút sao chép chia sẻ (Clipboard API) -->
          <div class="flex items-center gap-4 py-3 border-y border-[var(--border-main)]">
            <div class="flex items-center gap-2 text-xs text-[var(--text-muted)] font-mono">
              <span>Tác giả: <strong class="text-[var(--text-main)]">${post.author}</strong></span>
            </div>
            <button type="button" id="share-blog-btn" class="ml-auto filter-btn text-xs flex items-center gap-2">
              <i class="fa-regular fa-copy"></i>
              <span id="share-text">Chia sẻ bài viết</span>
            </button>
          </div>
        </header>

        <!-- Ảnh bìa -->
        <div class="w-full h-80 rounded-2xl overflow-hidden mb-8 border border-[var(--border-main)]">
          <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover">
        </div>

        <!-- Mục lục nhảy nhanh (Table of Contents) -->
        <nav class="bg-[var(--bg-card)] border border-[var(--border-main)] rounded-xl p-6 mb-10 font-mono" aria-label="Mục lục bài viết">
          <h2 class="text-sm font-bold text-[var(--color-accent)] uppercase mb-3 flex items-center gap-2">
            <i class="fa-solid fa-list-ul"></i> Mục lục bài viết
          </h2>
          <ul class="text-xs space-y-2 text-[var(--text-muted)]">
            <li><a href="#intro" class="hover:text-[var(--color-accent)] transition">1. Giới thiệu tổng quan</a></li>
            <li><a href="#section-1" class="hover:text-[var(--color-accent)] transition">${post.content.section1_title}</a></li>
            <li><a href="#section-2" class="hover:text-[var(--color-accent)] transition">${post.content.section2_title}</a></li>
            <li><a href="#summary" class="hover:text-[var(--color-accent)] transition">4. Tổng kết & Đánh giá</a></li>
          </ul>
        </nav>

        <!-- Thân bài viết -->
        <div class="text-[var(--text-main)] text-sm sm:text-base leading-relaxed space-y-8">
          <section id="intro">
            <p class="text-base text-[var(--text-main)] font-medium leading-relaxed italic border-l-4 border-[var(--color-accent)] pl-4 py-1">
              "${post.content.intro}"
            </p>
          </section>

          <section id="section-1">
            <h2 class="text-2xl font-bold text-[var(--text-main)] mb-3 font-mono">
              ${post.content.section1_title}
            </h2>
            <p class="leading-loose text-[var(--text-muted)]">${post.content.section1_body}</p>
          </section>

          <section id="section-2">
            <h2 class="text-2xl font-bold text-[var(--text-main)] mb-3 font-mono">
              ${post.content.section2_title}
            </h2>
            <p class="leading-loose text-[var(--text-muted)]">${post.content.section2_body}</p>
          </section>

          <section id="summary" class="bg-[var(--bg-card)] p-6 rounded-xl border border-[var(--border-main)] shadow-sm">
            <h2 class="text-lg font-bold text-[var(--color-accent)] mb-2 font-mono">Tổng kết</h2>
            <p class="leading-relaxed text-[var(--text-main)]">${post.content.summary_text}</p>
          </section>
        </div>

        <!-- Tags bài viết -->
        <div class="mt-12 pt-6 border-t border-[var(--border-main)] flex items-center gap-2 flex-wrap font-mono text-xs">
          <span class="text-[var(--text-muted)]">Tags:</span>
          ${post.tags.map((t) => `<span class="filter-btn text-xs">#${t}</span>`).join("")}
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