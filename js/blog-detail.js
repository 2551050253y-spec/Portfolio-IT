// js/blog-detail.js
document.addEventListener("DOMContentLoaded", async () => {
  const contentArea = document.getElementById("blog-content-area");
  const progressBar = document.getElementById("progress-bar");

  // 1. Lấy param id từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  if (!postId) {
    contentArea.innerHTML = "<p>Không tìm thấy bài viết hợp lệ! <a href='blogs.html'>Quay lại danh sách</a></p>";
    return;
  }

  // 2. Fetch và nạp nội dung bài viết
  try {
    const res = await fetch("data/blogs.json");
    const blogs = await res.json();
    const post = blogs.find(p => p.id === postId);

    if (!post) {
      contentArea.innerHTML = "<p>Bài viết không tồn tại!</p>";
      return;
    }

    // Cập nhật title trình duyệt
    document.title = `${post.title} - DevPortfolio`;

    contentArea.innerHTML = `
      <a href="blogs.html" style="color: var(--primary-accent); text-decoration: none;">← Quay lại danh sách Blogs</a>
      <header style="margin: 20px 0;">
        <span style="color: var(--primary-accent); font-weight: bold; text-transform: uppercase;">${post.category}</span>
        <h1 style="font-size: 2.2rem; margin: 10px 0;">${post.title}</h1>
        <p style="color: var(--text-secondary); font-size: 14px;">Ngày đăng: ${post.date} • Thời gian đọc: ${post.readTime}</p>
        <button id="share-btn" style="padding: 6px 12px; border-radius: 6px; border: 1px solid var(--border-color); background: var(--bg-surface); color: inherit; cursor: pointer;">📋 Sao chép liên kết</button>
        <span id="share-msg" style="color: green; font-size: 14px; margin-left: 10px; display: none;">Đã sao chép!</span>
      </header>

      <!-- Mục lục nhảy nhanh -->
      <div class="table-of-contents">
        <strong>Mục lục bài viết</strong>
        <ul>
          <li><a href="#section-intro">1. Giới thiệu tổng quan</a></li>
          <li><a href="#section-details">2. Nội dung chuyên sâu</a></li>
          <li><a href="#section-summary">3. Tổng kết</a></li>
        </ul>
      </div>

      <article>
        <section id="section-intro">
          <h2>1. Giới thiệu tổng quan</h2>
          <p>${post.summary}</p>
        </section>
        <section id="section-details">
          <h2>2. Nội dung chuyên sâu</h2>
          <p>${post.content}</p>
          <p>Thiết kế đáp ứng nhiều kích thước màn hình và xử lý mượt mà trên môi trường trình duyệt hiện đại là tiêu chuẩn cốt lõi.</p>
        </section>
        <section id="section-summary">
          <h2>3. Tổng kết</h2>
          <p>Việc áp dụng các kỹ thuật trên giúp tối ưu hóa đáng kể trải nghiệm người dùng và điểm Lighthouse.</p>
        </section>
      </article>
    `;

    // 3. Xử lý nút Clipboard Share
    const shareBtn = document.getElementById("share-btn");
    const shareMsg = document.getElementById("share-msg");
    shareBtn.addEventListener("click", async () => {
      await navigator.clipboard.writeText(window.location.href);
      shareMsg.style.display = "inline";
      setTimeout(() => { shareMsg.style.display = "none"; }, 2500);
    });

  } catch (err) {
    contentArea.innerHTML = `<p style="color: red;">Lỗi tải dữ liệu: ${err.message}</p>`;
  }

  // 4. Thanh Reading Progress Bar cuộn theo trang
  window.addEventListener("scroll", () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }
  });
});