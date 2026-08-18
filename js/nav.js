document.addEventListener("DOMContentLoaded", () => {
  const dots = [...document.querySelectorAll(".dot")],
    sections = [...document.querySelectorAll("main section")];
  dots.forEach((d) => {
    let t;
    d.onclick = () =>
      document
        .getElementById(d.dataset.target)
        ?.scrollIntoView({ behavior: "smooth" });
    d.onmouseenter = () =>
      (t = setTimeout(() => d.classList.add("show-tip"), 2000));
    d.onmouseleave = () => {
      clearTimeout(t);
      d.classList.remove("show-tip");
    };
  });
  const o = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting)
          dots.forEach((d) =>
            d.classList.toggle("active", d.dataset.target === e.target.id),
          );
      }),
    { threshold: 0.52 },
  );
  sections.forEach((s) => o.observe(s));
});
