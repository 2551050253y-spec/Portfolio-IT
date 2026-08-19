// javas.js - Điều khiển toàn bộ tính năng JavaScript Đề 11
document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------------------------------------
     1. TYPING EFFECT TẠI HERO SECTION (Điểm cộng Đề 11)
  ------------------------------------------------------------- */
  const typingElement = document.getElementById("typing-text");
  if (typingElement) {
    const roles = ["Full-Stack Developer", "Software Engineer", "C++ Programmer", "Frontend Specialist"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 50 : 100;
      if (!isDeleting && charIndex === currentRole.length) {
        speed = 2000; // Dừng lại 2s khi gõ xong
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 500;
      }
      setTimeout(typeEffect, speed);
    }
    typeEffect();
  }


  /* -------------------------------------------------------------
     2. SIDEBAR NAV: TOOLTIP 2S & SCROLLSPY (Bắt buộc Đề 11)
  ------------------------------------------------------------- */
  const navItems = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll("section[id]");

  navItems.forEach((item, index) => {
    // Rê chuột giữ 2 giây mới hiện tooltip (trừ icon đầu tiên)
    let tooltipTimer;
    const tooltip = item.querySelector(".nav-tooltip");

    if (index !== 0 && tooltip) {
      item.addEventListener("mouseenter", () => {
        tooltipTimer = setTimeout(() => {
          tooltip.classList.add("show-tooltip");
        }, 2000); // 2000ms theo đúng đặc tả
      });

      item.addEventListener("mouseleave", () => {
        clearTimeout(tooltipTimer);
        tooltip.classList.remove("show-tooltip");
      });
    }

    // Click cuộn mượt tới khối
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const targetSec = document.querySelector(item.dataset.target);
      if (targetSec) {
        targetSec.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Scrollspy: Sáng icon khi cuộn tới
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = `#${entry.target.getAttribute("id")}`;
        navItems.forEach(item => {
          item.classList.toggle("active", item.dataset.target === currentId);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => sectionObserver.observe(sec));


  /* -------------------------------------------------------------
     3. OVERLAY SEARCH (Tìm kiếm tức thì + Nhấn Enter)
  ------------------------------------------------------------- */
  const searchTriggers = document.querySelectorAll(".search-trigger");
  const searchOverlay = document.getElementById("search-overlay");
  const searchCloseBtn = searchOverlay ? searchOverlay.querySelector(".search-close") : null;
  const searchInput = document.getElementById("site-search");
  const searchResults = document.getElementById("search-results");
  let lastFocusedElement = null;

  // Danh mục dữ liệu tìm kiếm nhanh
  const searchableData = [
    { title: "Trang chủ (Home)", url: "index.html#home", type: "Section" },
    { title: "Giới thiệu bản thân (About Me)", url: "index.html#about", type: "Section" },
    { title: "Kỹ năng chuyên môn (Skills: HTML, CSS, JS, C++)", url: "index.html#skills", type: "Section" },
    { title: "Dự án tiêu biểu (Works: Web Portfolio, C++ App)", url: "index.html#works", type: "Section" },
    { title: "Tất cả bài viết kỹ thuật (Blogs Page)", url: "blogs.html", type: "Page" },
    { title: "Liên hệ hợp tác (Contact Form)", url: "index.html#contact", type: "Section" },
    { title: "Tối ưu Core Web Vitals & Lighthouse", url: "blog-detail.html?id=post-1", type: "Blog" },
    { title: "Design Tokens & Dark Mode", url: "blog-detail.html?id=post-2", type: "Blog" },
    { title: "Web Accessibility (A11y) WCAG 2.2", url: "blog-detail.html?id=post-3", type: "Blog" }
  ];

  function performSearch(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      searchResults.innerHTML = '<p class="text-center py-2 text-gray-500">Nhập từ khóa và bấm Enter để chuyển nhanh...</p>';
      return;
    }

    const matches = searchableData.filter(item => 
      item.title.toLowerCase().includes(q) || item.type.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      searchResults.innerHTML = `<p class="text-center py-2 text-rose-400">Không tìm thấy kết quả nào cho "${query}".</p>`;
      return;
    }

    searchResults.innerHTML = matches.map(item => `
      <a href="${item.url}" class="flex justify-between items-center p-3 rounded-lg bg-[#212429] hover:bg-[#33383f] border border-gray-700 mb-2 text-decoration-none transition">
        <span class="text-white font-medium">${item.title}</span>
        <span class="text-[10px] font-mono bg-[#26D9B5] text-black px-2 py-0.5 rounded font-bold">${item.type}</span>
      </a>
    `).join("");
  }

  function toggleSearch(open) {
    if (open) {
      lastFocusedElement = document.activeElement;
      searchOverlay.removeAttribute("hidden");
      searchTriggers.forEach(t => t.setAttribute("aria-expanded", "true"));
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        if (searchInput) {
          searchInput.value = "";
          performSearch("");
          searchInput.focus();
        }
      }, 100);
    } else {
      searchOverlay.setAttribute("hidden", "");
      searchTriggers.forEach(t => t.setAttribute("aria-expanded", "false"));
      document.body.style.overflow = "";
      if (lastFocusedElement) lastFocusedElement.focus();
    }
  }

  searchTriggers.forEach(btn => btn.addEventListener("click", () => toggleSearch(true)));
  searchCloseBtn?.addEventListener("click", () => toggleSearch(false));
  searchOverlay?.addEventListener("click", (e) => {
    if (e.target === searchOverlay) toggleSearch(false);
  });

  // Sự kiện gõ từ khóa
  searchInput?.addEventListener("input", (e) => performSearch(e.target.value));

  // Nhấn Enter chuyển ngay đến kết quả đầu tiên
  searchInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const firstLink = searchResults.querySelector("a");
      if (firstLink) {
        toggleSearch(false);
        window.location.href = firstLink.getAttribute("href");
      }
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !searchOverlay.hasAttribute("hidden")) {
      toggleSearch(false);
    }
  });
  /* -------------------------------------------------------------
     4. BỘ LỌC DỰ ÁN TẠI KHỐI WORKS (Điểm cộng Đề 11)
  ------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-item");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const tech = btn.dataset.tech;
      projectItems.forEach(item => {
        if (tech === "all" || item.dataset.tech === tech) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });


  /* -------------------------------------------------------------
     5. RESPONSIVE MOBILE MENU (768px & 390px)
  ------------------------------------------------------------- */
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeMobileBtn = document.getElementById("close-mobile-btn");
  const mobileLinks = mobileMenu.querySelectorAll("a");

  function toggleMobile(open) {
    if (open) {
      mobileMenu.removeAttribute("hidden");
      menuToggle.setAttribute("aria-expanded", "true");
    } else {
      mobileMenu.setAttribute("hidden", "");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  }

  menuToggle?.addEventListener("click", () => toggleMobile(true));
  closeMobileBtn?.addEventListener("click", () => toggleMobile(false));
  mobileLinks.forEach(l => l.addEventListener("click", () => toggleMobile(false)));


  /* -------------------------------------------------------------
     6. THEME TOGGLE (Dark / Light + LocalStorage)
  ------------------------------------------------------------- */
  const themeToggles = document.querySelectorAll(".theme-toggle");
  const body = document.body;

  const currentTheme = localStorage.getItem("app_theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  function setAppTheme(t) {
    if (t === "dark") {
      body.classList.add("dark");
      themeToggles.forEach(btn => btn.innerHTML = '<i class="fa-solid fa-sun text-[#26D9B5]"></i>');
    } else {
      body.classList.remove("dark");
      themeToggles.forEach(btn => btn.innerHTML = '<i class="fa-solid fa-moon text-slate-700"></i>');
    }
    localStorage.setItem("app_theme", t);
  }

  setAppTheme(currentTheme);
  themeToggles.forEach(btn => {
    btn.addEventListener("click", () => {
      setAppTheme(body.classList.contains("dark") ? "light" : "dark");
    });
  });


  /* -------------------------------------------------------------
     7. CLIPBOARD API (Copy Email)
  ------------------------------------------------------------- */
  const copyBtn = document.querySelector(".copy-email");
  const emailSpan = document.querySelector("[data-email]");

  copyBtn?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(emailSpan.textContent.trim());
      const icon = copyBtn.querySelector("i");
      icon.className = "fa-solid fa-check text-emerald-400";
      setTimeout(() => {
        icon.className = "fa-regular fa-copy";
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  });


  /* -------------------------------------------------------------
     8. FORM VALIDATION (Báo lỗi inline + A11y Focus)
  ------------------------------------------------------------- */
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  const rules = {
    name: (v) => v.trim().length >= 2 ? "" : "Vui lòng nhập họ và tên (ít nhất 2 ký tự).",
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Email không hợp lệ (ví dụ: name@domain.com).",
    phone: (v) => /^(0|84)(3|5|7|8|9)[0-9]{8}$/.test(v.trim().replace(/\s+/g, "")) ? "" : "Số điện thoại gồm 10 chữ số (đầu số 03/05/07/08/09).",
    message: (v) => v.trim().length >= 10 ? "" : "Nội dung cần tối thiểu 10 ký tự."
  };

  function validateInput(fieldName) {
    const input = document.querySelector(`[name="${fieldName}"]`);
    const errorP = document.getElementById(`${fieldName}-error`);
    if (!input || !errorP) return true;

    const msg = rules[fieldName](input.value);
    if (msg) {
      input.setAttribute("aria-invalid", "true");
      errorP.textContent = msg;
      return false;
    } else {
      input.setAttribute("aria-invalid", "false");
      errorP.textContent = "";
      return true;
    }
  }

  ["name", "email", "phone", "message"].forEach(name => {
    const input = document.querySelector(`[name="${name}"]`);
    input?.addEventListener("blur", () => validateInput(name));
    input?.addEventListener("input", () => {
      if (input.getAttribute("aria-invalid") === "true") validateInput(name);
    });
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    let firstError = null;

    ["name", "email", "phone", "message"].forEach(name => {
      if (!validateInput(name)) {
        valid = false;
        if (!firstError) firstError = document.querySelector(`[name="${name}"]`);
      }
    });

    if (!valid) {
      if (firstError) firstError.focus();
      status.className = "form-status error";
      status.textContent = "Vui lòng sửa các trường thông tin bị lỗi.";
      return;
    }

    status.className = "form-status success";
    status.textContent = "✓ Gửi tin nhắn thành công! Tôi sẽ phản hồi sớm nhất.";
    form.reset();
    ["name", "email", "phone", "message"].forEach(n => {
      document.querySelector(`[name="${n}"]`)?.setAttribute("aria-invalid", "false");
    });
    setTimeout(() => status.textContent = "", 5000);
  });

});