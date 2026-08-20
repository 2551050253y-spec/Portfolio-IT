// js/javas.js - Điều khiển toàn bộ logic giao diện, Theme, Scrollspy, Scroll Reveal, Search & Form
document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------------------------------------
     1. THEME TOGGLE (Hoạt động đồng bộ trên TẤT CẢ các trang)
  ------------------------------------------------------------- */
  const themeToggles = document.querySelectorAll(".theme-toggle");
  
  function applyTheme(theme) {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
      themeToggles.forEach(btn => {
        btn.innerHTML = '<i class="fa-solid fa-sun text-[#26D9B5]"></i>';
        btn.setAttribute("aria-label", "Switch to light theme");
      });
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
      themeToggles.forEach(btn => {
        btn.innerHTML = '<i class="fa-solid fa-moon text-slate-700"></i>';
        btn.setAttribute("aria-label", "Switch to dark theme");
      });
    }
    localStorage.setItem("app_theme", theme);
  }

  const savedTheme = localStorage.getItem("app_theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  applyTheme(savedTheme);

  themeToggles.forEach(btn => {
    btn.addEventListener("click", () => {
      const isDark = document.body.classList.contains("dark");
      applyTheme(isDark ? "light" : "dark");
    });
  });

  /* -------------------------------------------------------------
     2. SIDEBAR NAV: TOOLTIP 2S & SCROLLSPY (Chuẩn Đề 11)
  ------------------------------------------------------------- */
  const navItems = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll("section[id]");

  navItems.forEach((item, index) => {
    let tooltipTimer = null;
    const tooltip = item.querySelector(".nav-tooltip");

    if (index !== 0 && tooltip) {
      item.addEventListener("mouseenter", () => {
        tooltipTimer = setTimeout(() => {
          tooltip.classList.add("show-tooltip");
        }, 2000);
      });

      item.addEventListener("mouseleave", () => {
        clearTimeout(tooltipTimer);
        tooltip.classList.remove("show-tooltip");
      });
    }

    item.addEventListener("click", (e) => {
      const targetId = item.dataset.target || item.getAttribute("href");
      if (targetId && targetId.startsWith("#")) {
        const targetSec = document.querySelector(targetId);
        if (targetSec) {
          e.preventDefault();
          targetSec.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  if (sections.length > 0) {
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = `#${entry.target.getAttribute("id")}`;
          navItems.forEach(item => {
            const target = item.dataset.target || item.getAttribute("href");
            item.classList.toggle("active", target === currentId);
          });
        }
      });
    }, { threshold: 0.35 });

    sections.forEach(sec => scrollObserver.observe(sec));
  }

  /* -------------------------------------------------------------
     3. SCROLL REVEAL
  ------------------------------------------------------------- */
  const revealElements = document.querySelectorAll("section, article, .blog-item, .card");
  revealElements.forEach(el => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  /* -------------------------------------------------------------
     4. TYPING EFFECT TẠI HERO
  ------------------------------------------------------------- */
  const typingElement = document.getElementById("typing-text");
  if (typingElement) {
    const roles = ["Full-Stack Developer", "Software Engineer", "C++ Programmer", "Frontend Specialist"];
    let roleIndex = 0, charIndex = 0, isDeleting = false;

    function typeEffect() {
      const currentRole = roles[roleIndex];
      typingElement.textContent = isDeleting 
        ? currentRole.substring(0, charIndex - 1) 
        : currentRole.substring(0, charIndex + 1);
      charIndex += isDeleting ? -1 : 1;

      let speed = isDeleting ? 40 : 80;
      if (!isDeleting && charIndex === currentRole.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
      }
      setTimeout(typeEffect, speed);
    }
    typeEffect();
  }

  /* -------------------------------------------------------------
     5. OVERLAY SEARCH
  ------------------------------------------------------------- */
  const searchTriggers = document.querySelectorAll(".search-trigger");
  const searchOverlay = document.getElementById("search-overlay");
  const searchCloseBtn = searchOverlay ? searchOverlay.querySelector(".search-close") : null;
  const searchInput = document.getElementById("site-search");
  const searchResults = document.getElementById("search-results");
  let lastFocusedElement = null;

  const searchableData = [
    { title: "Trang chủ (Home)", url: "index.html#home", type: "Section" },
    { title: "Giới thiệu bản thân (About Me)", url: "index.html#about", type: "Section" },
    { title: "Kỹ năng chuyên môn (Skills)", url: "index.html#skills", type: "Section" },
    { title: "Dự án tiêu biểu (Works)", url: "index.html#works", type: "Section" },
    { title: "Web Developer Portfolio (Đề 11)", url: "project-detail.html", type: "Project" },
    { title: "Hệ thống xử lý dữ liệu C++", url: "project-cpp.html", type: "Project" },
    { title: "Tất cả bài viết (Blogs Page)", url: "blogs.html", type: "Page" },
    { title: "Liên hệ hợp tác (Contact)", url: "index.html#contact", type: "Section" }
  ];

  function performSearch(query) {
    if (!searchResults) return;
    const q = query.trim().toLowerCase();
    if (!q) {
      searchResults.innerHTML = '<p class="text-center py-2 text-gray-500">Nhập từ khóa và bấm Enter...</p>';
      return;
    }

    const matches = searchableData.filter(item => 
      item.title.toLowerCase().includes(q) || item.type.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      searchResults.innerHTML = `<p class="text-center py-2 text-rose-400">Không tìm thấy kết quả cho "${query}".</p>`;
      return;
    }

    searchResults.innerHTML = matches.map(item => `
      <a href="${item.url}" class="flex justify-between items-center p-3 rounded-lg bg-[#212429] hover:bg-[#33383f] border border-gray-700 mb-2 transition text-decoration-none">
        <span class="text-white text-xs font-medium">${item.title}</span>
        <span class="text-[10px] font-mono bg-[#26D9B5] text-black px-2 py-0.5 rounded font-bold">${item.type}</span>
      </a>
    `).join("");
  }

  function toggleSearch(open) {
    if (!searchOverlay) return;
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

  searchInput?.addEventListener("input", (e) => performSearch(e.target.value));
  searchInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const firstLink = searchResults ? searchResults.querySelector("a") : null;
      if (firstLink) {
        toggleSearch(false);
        window.location.href = firstLink.getAttribute("href");
      }
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && searchOverlay && !searchOverlay.hasAttribute("hidden")) {
      toggleSearch(false);
    }
  });

  /* -------------------------------------------------------------
     6. WORKS FILTER
  ------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-item");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const tech = btn.dataset.tech;
      projectItems.forEach(item => {
        item.style.display = (tech === "all" || item.dataset.tech === tech) ? "block" : "none";
      });
    });
  });

  /* -------------------------------------------------------------
     7. MOBILE MENU
  ------------------------------------------------------------- */
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeMobileBtn = document.getElementById("close-mobile-btn");
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];

  function toggleMobile(open) {
    if (!mobileMenu) return;
    if (open) {
      mobileMenu.removeAttribute("hidden");
      menuToggle?.setAttribute("aria-expanded", "true");
    } else {
      mobileMenu.setAttribute("hidden", "");
      menuToggle?.setAttribute("aria-expanded", "false");
    }
  }

  menuToggle?.addEventListener("click", () => toggleMobile(true));
  closeMobileBtn?.addEventListener("click", () => toggleMobile(false));
  mobileLinks.forEach(l => l.addEventListener("click", () => toggleMobile(false)));

  /* -------------------------------------------------------------
     8. CLIPBOARD API (Sao chép Email)
  ------------------------------------------------------------- */
  const copyBtn = document.querySelector(".copy-email");
  const emailSpan = document.querySelector("[data-email]");
  copyBtn?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(emailSpan.textContent.trim());
      const icon = copyBtn.querySelector("i");
      if (icon) icon.className = "fa-solid fa-check text-emerald-400";
      setTimeout(() => {
        if (icon) icon.className = "fa-regular fa-copy";
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  });

  /* -------------------------------------------------------------
     9. FORM VALIDATION & SUBMIT (Ngăn reload trang & báo lỗi inline)
  ------------------------------------------------------------- */
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  const formRules = {
    name: (val) => val.trim().length >= 2 ? "" : "Vui lòng nhập họ và tên (tối thiểu 2 ký tự).",
    email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) ? "" : "Địa chỉ email không hợp lệ (ví dụ: name@domain.com).",
    phone: (val) => /^(0|84)(3|5|7|8|9)[0-9]{8}$/.test(val.trim().replace(/\s+/g, "")) ? "" : "Số điện thoại gồm 10 chữ số hợp lệ.",
    message: (val) => val.trim().length >= 10 ? "" : "Nội dung tin nhắn cần ít nhất 10 ký tự."
  };

  function validateFormField(fieldName) {
    const input = document.querySelector(`[name="${fieldName}"]`);
    const errorSpan = document.getElementById(`${fieldName}-error`);
    if (!input || !errorSpan) return true;

    const errorMsg = formRules[fieldName](input.value);
    if (errorMsg) {
      input.setAttribute("aria-invalid", "true");
      errorSpan.textContent = errorMsg;
      return false;
    } else {
      input.setAttribute("aria-invalid", "false");
      errorSpan.textContent = "";
      return true;
    }
  }

  ["name", "email", "phone", "message"].forEach(field => {
    const input = document.querySelector(`[name="${field}"]`);
    input?.addEventListener("blur", () => validateFormField(field));
    input?.addEventListener("input", () => {
      if (input.getAttribute("aria-invalid") === "true") validateFormField(field);
    });
  });

  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();

    let isAllValid = true;
    let firstInvalid = null;

    ["name", "email", "phone", "message"].forEach(field => {
      const isValid = validateFormField(field);
      if (!isValid) {
        isAllValid = false;
        if (!firstInvalid) firstInvalid = document.querySelector(`[name="${field}"]`);
      }
    });

    if (!isAllValid) {
      if (firstInvalid) firstInvalid.focus();
      if (formStatus) {
        formStatus.className = "text-center text-xs font-bold mt-4 text-rose-500";
        formStatus.textContent = "Vui lòng sửa các trường thông tin bị lỗi.";
      }
      return;
    }

    if (formStatus) {
      formStatus.className = "text-center text-xs font-bold mt-4 text-[#26D9B5]";
      formStatus.textContent = "✓ Gửi tin nhắn thành công! Tôi sẽ liên hệ lại sớm nhất.";
    }
    contactForm.reset();
    ["name", "email", "phone", "message"].forEach(n => {
      document.querySelector(`[name="${n}"]`)?.setAttribute("aria-invalid", "false");
    });
    setTimeout(() => { if (formStatus) formStatus.textContent = ""; }, 5000);
  });

});