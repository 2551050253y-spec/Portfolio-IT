// js/validate.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const fields = [
    {
      id: "fullname",
      errorId: "fullname-error",
      validate: (val) => val.trim().length >= 2 ? "" : "Vui lòng nhập họ và tên (tối thiểu 2 ký tự)."
    },
    {
      id: "email",
      errorId: "email-error",
      validate: (val) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!val.trim()) return "Vui lòng nhập địa chỉ email.";
        if (!emailRegex.test(val)) return "Email không hợp lệ (ví dụ: ten@vidu.com).";
        return "";
      }
    },
    {
      id: "message",
      errorId: "message-error",
      validate: (val) => val.trim().length >= 10 ? "" : "Nội dung tin nhắn cần tối thiểu 10 ký tự."
    }
  ];

  function validateField(fieldConfig) {
    const input = document.getElementById(fieldConfig.id);
    const errorBox = document.getElementById(fieldConfig.errorId);
    const errorMessage = fieldConfig.validate(input.value);

    if (errorMessage) {
      input.setAttribute("aria-invalid", "true");
      input.style.borderColor = "#e11d48";
      errorBox.textContent = errorMessage;
      return false;
    } else {
      input.setAttribute("aria-invalid", "false");
      input.style.borderColor = "var(--border-color)";
      errorBox.textContent = "";
      return true;
    }
  }

  // Lắng nghe sự kiện gõ phím trực tiếp
  fields.forEach(f => {
    const input = document.getElementById(f.id);
    input.addEventListener("input", () => validateField(f));
    input.addEventListener("blur", () => validateField(f));
  });

  // Submit form
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isAllValid = true;
    let firstInvalidInput = null;

    fields.forEach(f => {
      const isValid = validateField(f);
      if (!isValid) {
        isAllValid = false;
        if (!firstInvalidInput) firstInvalidInput = document.getElementById(f.id);
      }
    });

    if (!isAllValid) {
      if (firstInvalidInput) firstInvalidInput.focus();
      return;
    }

    // Giả lập gửi thành công
    const successBox = document.getElementById("form-success");
    successBox.style.display = "block";
    form.reset();

    // Reset lại trạng thái border
    fields.forEach(f => {
      document.getElementById(f.id).setAttribute("aria-invalid", "false");
      document.getElementById(f.id).style.borderColor = "var(--border-color)";
    });

    setTimeout(() => {
      successBox.style.display = "none";
    }, 5000);
  });
});