document.addEventListener("DOMContentLoaded", () => {
  const f = document.querySelector("#contact-form");
  if (!f) return;
  const fs = [
      ["fullname", "Vui lòng nhập họ tên (ít nhất 2 ký tự)."],
      ["email", "Vui lòng nhập email hợp lệ."],
      ["message", "Tin nhắn cần ít nhất 10 ký tự."],
    ],
    check = ([id, msg]) => {
      let i = document.querySelector("#" + id),
        bad = !i.checkValidity();
      i.closest(".field").classList.toggle("is-error", bad);
      i.setAttribute("aria-invalid", bad);
      document.querySelector("#" + id + "-error").textContent = bad ? msg : "";
      return !bad;
    };
  fs.forEach(
    (x) => (document.querySelector("#" + x[0]).onblur = () => check(x)),
  );
  f.onsubmit = (e) => {
    e.preventDefault();
    let first = fs.find((x) => !check(x));
    if (first) return document.querySelector("#" + first[0]).focus();
    f.reset();
    showToast("Cảm ơn bạn! Tin nhắn đã được ghi nhận.");
  };
});
