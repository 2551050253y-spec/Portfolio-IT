document.addEventListener("DOMContentLoaded", () => {
  const b = document.querySelector("#search-button"),
    o = document.querySelector("#search-overlay"),
    i = document.querySelector("#search-input"),
    r = document.querySelector("#search-results");
  if (!b) return;
  const data = [
      [
        "Dự án Portfolio",
        "project-detail.html?id=portfolio",
        "Web / Case study",
      ],
      [
        "Data Manager",
        "project-detail.html?id=data-manager",
        "C++ / Case study",
      ],
      [
        "Accessibility Components",
        "project-detail.html?id=a11y",
        "Lab / Case study",
      ],
      ["Bài viết", "blogs.html", "Performance · Frontend · Accessibility"],
      ["Resume", "resume.html", "Kỹ năng và kinh nghiệm"],
    ],
    close = () => {
      o.classList.remove("is-open");
      document.body.classList.remove("modal-open");
      b.focus();
    },
    render = () => {
      let q = i.value.toLowerCase();
      r.innerHTML =
        data
          .filter((x) => x.join(" ").toLowerCase().includes(q))
          .map(
            (x) =>
              `<li><a href="${x[1]}">${x[0]}<br><small>${x[2]}</small></a></li>`,
          )
          .join("") ||
        "<li><small>Không tìm thấy kết quả phù hợp.</small></li>";
    };
  b.onclick = () => {
    o.classList.add("is-open");
    document.body.classList.add("modal-open");
    i.value = "";
    render();
    i.focus();
  };
  i.oninput = render;
  o.onclick = (e) => e.target === o && close();
  document.onkeydown = (e) =>
    e.key === "Escape" && o.classList.contains("is-open") && close();
});
