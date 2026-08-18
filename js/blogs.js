document.addEventListener("DOMContentLoaded", async () => {
  const list = document.querySelector("#blog-list"),
    filters = document.querySelector("#filters"),
    pager = document.querySelector("#pagination");
  try {
    const res = await fetch("data/blogs.json");
    if (!res.ok) throw Error("Không thể tải dữ liệu");
    const posts = await res.json(),
      cats = ["all", ...new Set(posts.map((p) => p.category))];
    let category = "all",
      page = 1;
    const render = () => {
      let selected =
          category === "all"
            ? posts
            : posts.filter((p) => p.category === category),
        per = 2,
        pages = Math.ceil(selected.length / per);
      page = Math.min(page, pages || 1);
      list.innerHTML =
        selected
          .slice((page - 1) * per, page * per)
          .map(
            (p) =>
              `<article class="card post"><div><span class="tag">${p.category}</span><p class="meta">${p.date}<br>${p.readTime} đọc</p></div><div><h2><a href="blog-detail.html?id=${encodeURIComponent(p.id)}">${p.title}</a></h2><p>${p.summary}</p><a class="meta" href="blog-detail.html?id=${encodeURIComponent(p.id)}">Đọc bài viết →</a></div></article>`,
          )
          .join("") || "<p>Không tìm thấy bài viết phù hợp.</p>";
      pager.innerHTML = Array.from(
        { length: pages },
        (_, i) =>
          `<button class="${i + 1 === page ? "active" : ""}" data-page="${i + 1}">${i + 1}</button>`,
      ).join("");
    };
    filters.innerHTML = cats
      .map(
        (c) =>
          `<button class="filter ${c === "all" ? "active" : ""}" data-category="${c}">${c === "all" ? "Tất cả" : c}</button>`,
      )
      .join("");
    filters.onclick = (e) => {
      let b = e.target.closest("button");
      if (!b) return;
      category = b.dataset.category;
      page = 1;
      filters
        .querySelectorAll("button")
        .forEach((x) => x.classList.toggle("active", x === b));
      render();
    };
    pager.onclick = (e) => {
      let b = e.target.closest("button");
      if (b) {
        page = +b.dataset.page;
        render();
      }
    };
    render();
  } catch (e) {
    list.textContent =
      "Không thể tải bài viết. Vui lòng chạy website qua local server.";
  }
});
