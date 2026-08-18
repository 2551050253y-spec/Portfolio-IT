# Nhựt Nam — Web Developer Portfolio

Website portfolio cá nhân được hiện thực từ mẫu **Web Developer Portfolio Website Template (Community)** trên Figma. Dự án dùng HTML, CSS và JavaScript thuần; không cần build step.

## Trang và tính năng

| Trang | Đường dẫn | Nội dung |
| --- | --- | --- |
| Trang chủ | `index.html` | Hero, giới thiệu, kỹ năng, dự án, bài viết và liên hệ |
| Danh sách dự án | `projects.html` | Các case study nổi bật |
| Chi tiết dự án | `project-detail.html?id=portfolio` | Nội dung thay đổi theo URL parameter |
| Danh sách blog | `blogs.html` | Render từ JSON, lọc theo chủ đề và phân trang |
| Chi tiết blog | `blog-detail.html?id=post-1` | Nạp bài viết theo URL parameter |
| Resume | `resume.html` | Hồ sơ kỹ năng và định hướng |

Các tương tác chính:

- Dot navigation: cuộn tới từng section, scrollspy và tooltip sau 2 giây hover.
- Search overlay: tìm nhanh dự án, blog và resume; `Esc` hoặc click nền để đóng.
- Dark/light mode: lưu lựa chọn bằng `localStorage`.
- Blog: tải nội dung từ `data/blogs.json`, lọc category và phân trang.
- Contact form: kiểm tra từng trường, báo lỗi inline và focus vào trường sai đầu tiên.
- Responsive: bố cục được tối ưu cho desktop, tablet, mobile và màn hình hẹp.

## Chạy tại máy

Không mở trực tiếp file HTML vì trang blog sử dụng `fetch()` để đọc JSON. Hãy dùng một local server, ví dụ:

1. Mở thư mục dự án bằng VS Code.
2. Cài extension **Live Server** nếu chưa có.
3. Chuột phải vào `index.html` → **Open with Live Server**.

Hoặc dùng Node.js:

```bash
npx serve .
```

Mở địa chỉ mà terminal cung cấp, thường là `http://localhost:3000`.

## Cấu trúc thư mục

```text
.
├── css/
│   ├── tokens.css          # Màu sắc, typography và design tokens
│   └── components.css      # Layout/component dùng chung
├── data/
│   └── blogs.json          # Dữ liệu bài viết
├── js/
│   ├── main.js             # Theme, menu mobile, scroll reveal
│   ├── nav.js              # Dot navigation và scrollspy
│   ├── search.js           # Search overlay
│   ├── validate.js         # Contact form validation
│   ├── blogs.js            # Lọc và phân trang blog
│   └── blog-detail.js      # Chi tiết blog theo URL
├── index.html
├── blogs.html
├── blog-detail.html
├── projects.html
├── project-detail.html
└── resume.html
```

## Kiểm thử trước khi nộp

Xem checklist chi tiết tại [docs/QA-CHECKLIST.md](docs/QA-CHECKLIST.md).

Các mốc viewport cần kiểm tra: 1920px, 1280px, 768px và 390px. Khi đã deploy, chạy Lighthouse trên cả `index.html` và `blogs.html`, lưu ảnh kết quả vào báo cáo.

## Tài liệu tham khảo

- Figma Community: **Web Developer Portfolio Website Template (Community)**.
- [MDN Web Docs — HTML](https://developer.mozilla.org/docs/Web/HTML)
- [MDN Web Docs — CSS](https://developer.mozilla.org/docs/Web/CSS)
- [MDN Web Docs — JavaScript](https://developer.mozilla.org/docs/Web/JavaScript)
- [web.dev — Learn Accessibility](https://web.dev/learn/accessibility/)

## Ghi chú liêm chính học thuật

Figma được dùng làm nguồn tham chiếu giao diện. Mã nguồn được nhóm rà soát, hiểu và chịu trách nhiệm giải thích khi bảo vệ. Nếu sử dụng công cụ AI trong quá trình phát triển, cần ghi rõ phần hỗ trợ đó trong báo cáo theo yêu cầu môn học.
