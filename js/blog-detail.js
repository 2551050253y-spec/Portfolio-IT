document.addEventListener("DOMContentLoaded", async () => {
  const area = document.querySelector("#article"),
    id = new URLSearchParams(location.search).get("id");
  try {
    const res = await fetch("data/blogs.json");
    const posts = await res.json(),
      p = posts.find((x) => x.id === id);
    if (!p) throw Error("Bài viết không tồn tại");
    document.title = `${p.title} — Nhựt Nam`;
    area.innerHTML = `<a class="back" href="blogs.html">← Quay lại danh sách</a><p class="eyebrow">${p.category}</p><h1>${p.title}</h1><p class="meta">${p.date} · ${p.readTime} đọc</p><p>${p.summary}</p><h2>Góc nhìn triển khai</h2><p>${p.content}</p><p>Khi đưa một ý tưởng vào sản phẩm thật, mình luôn ưu tiên cấu trúc rõ ràng, trạng thái giao diện dễ hiểu và một trải nghiệm tốt cho cả người dùng bàn phím.</p><h2>Kết luận</h2><p>Đây là một ghi chú đang được tiếp tục cập nhật trong quá trình học và làm dự án.</p>`;
  } catch (e) {
    area.innerHTML =
      '<p>Không tìm thấy bài viết. <a href="blogs.html">Quay lại Blogs</a></p>';
  }
});
