// js/blogs.js
document.addEventListener("DOMContentLoaded", async () => {
  const blogList = document.getElementById("blog-list");
  const filterBtns = document.querySelectorAll(".filter-btn");

  let blogs = [];

  try {
    const res = await fetch("data/blogs.json");
    if (!res.ok) throw new Error("Không thể tải dữ liệu");
    blogs = await res.json();
    renderBlogs(blogs);
  } catch (err) {
    blogList.innerHTML = `<p style="color: red;">Lỗi khi tải bài viết: ${err.message}</p>`;
  }

  function renderBlogs(items) {
    if (items.length === 0) {
      blogList.innerHTML = "<p>Không tìm thấy bài viết nào phù hợp.</p>";
      return;
    }

    blogList.innerHTML = items.map(post => `
      <article style="padding: 24px; border-radius: 10px; border: 1px solid var(--border-color); background-color: var(--bg-surface);">
        <span style="font-size: 12px; color: var(--primary-accent); font-weight: bold; text-transform: uppercase;">${post.category}</span>
        <h2 style="margin: 8px 0;"><a href="blog-detail.html?id=${post.id}" style="color: inherit; text-decoration: none;">${post.title}</a></h2>
        <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 12px;">${post.date} • ${post.readTime} đọc</p>
        <p style="color: var(--text-secondary); line-height: 1.6;">${post.summary}</p>
        <a href="blog-detail.html?id=${post.id}" style="color: var(--primary-accent); font-weight: 600; text-decoration: none;">Đọc tiếp →</a>
      </article>
    `).join("");
  }

  // Lọc theo Category
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.style.backgroundColor = "transparent");
      btn.style.backgroundColor = "var(--border-color)";
      
      const cat = btn.dataset.category;
      if (cat === "all") {
        renderBlogs(blogs);
      } else {
        renderBlogs(blogs.filter(p => p.category === cat));
      }
    });
  });
});