// js/nav.js
document.addEventListener("DOMContentLoaded", () => {
  const dots = document.querySelectorAll(".dot-item");
  const sections = document.querySelectorAll("main section");

  // 1. Click dot -> Cuộn mượt
  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const targetId = dot.dataset.target;
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });

    // 2. Hover giữ 2s -> Hiện Tooltip
    let hoverTimer;
    dot.addEventListener("mouseenter", () => {
      const tooltip = dot.querySelector(".dot-tooltip");
      // Nếu là dot đầu tiên, đề bài cho phép bỏ qua hoặc tooltip riêng
      hoverTimer = setTimeout(() => {
        if (tooltip) tooltip.classList.add("show");
      }, 2000); // Đúng 2000ms theo đặc tả đề
    });

    dot.addEventListener("mouseleave", () => {
      clearTimeout(hoverTimer);
      const tooltip = dot.querySelector(".dot-tooltip");
      if (tooltip) tooltip.classList.remove("show");
    });
  });

  // 3. Scrollspy bằng IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        dots.forEach(dot => {
          dot.classList.toggle("active", dot.dataset.target === `#${id}`);
        });
      }
    });
  }, { threshold: 0.5 }); // Khi section chiếm > 50% màn hình

  sections.forEach(sec => observer.observe(sec));
});