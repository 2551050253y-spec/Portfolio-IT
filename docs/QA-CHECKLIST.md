# Checklist kiểm thử và Lighthouse

Điền ngày kiểm thử, người kiểm thử và ảnh chụp minh chứng vào báo cáo sau khi hoàn thành.

## 1. Giao diện và responsive

| Hạng mục | 1920px | 1280px | 768px | 390px |
| --- | --- | --- | --- | --- |
| Header không tràn ngang | ☐ | ☐ | ☐ | ☐ |
| Hero đọc rõ, CTA thao tác được | ☐ | ☐ | ☐ | ☐ |
| Card skills/projects không vỡ bố cục | ☐ | ☐ | ☐ | ☐ |
| Menu mobile mở/đóng được | — | — | ☐ | ☐ |
| Form liên hệ không bị che hoặc tràn | ☐ | ☐ | ☐ | ☐ |
| Không xuất hiện thanh cuộn ngang | ☐ | ☐ | ☐ | ☐ |

## 2. Chức năng JavaScript

- [ ] Dot navigation cuộn tới đúng khối.
- [ ] Section đang xem làm sáng đúng dot.
- [ ] Tooltip dot hiện sau khoảng 2 giây hover.
- [ ] Search mở bằng nút, lọc được kết quả, đóng bằng `Esc`/click nền và trả focus về nút mở.
- [ ] Theme đổi đúng màu và vẫn giữ sau khi tải lại trang.
- [ ] Blog tải từ `data/blogs.json`, lọc category và phân trang hoạt động.
- [ ] URL `blog-detail.html?id=post-1` hiển thị đúng bài viết.
- [ ] URL dự án thay đổi nội dung case study theo `id`.
- [ ] Form báo lỗi inline, focus vào trường lỗi đầu tiên và hiện thông báo thành công khi dữ liệu hợp lệ.

## 3. Accessibility và SEO

- [ ] Dùng `Tab` từ đầu đến cuối cả trang; focus luôn nhìn thấy.
- [ ] Skip link đưa focus tới nội dung chính.
- [ ] Toàn bộ nút/icon có accessible name.
- [ ] Form có label và `aria-invalid` khi lỗi.
- [ ] Mỗi trang chỉ có một `h1`, heading không nhảy cấp.
- [ ] Mỗi trang có `title` và `meta description` phù hợp.
- [ ] Không có lỗi 404 trong DevTools Console/Network.

## 4. Lighthouse sau khi deploy

1. Mở Chrome ở chế độ Incognito để giảm ảnh hưởng extension/cache.
2. Mở DevTools → **Lighthouse**.
3. Chọn **Mobile**, bật Performance, Accessibility, Best Practices và SEO.
4. Chạy tối thiểu 2 lần cho `index.html` và `blogs.html`; ghi lần ổn định hơn.
5. Đưa ảnh báo cáo Lighthouse vào mục kiểm thử của báo cáo.

| Trang | Performance | Accessibility | Best Practices | SEO | Ảnh minh chứng |
| --- | ---: | ---: | ---: | ---: | --- |
| Trang chủ |  |  |  |  |  |
| Danh sách blog |  |  |  |  |  |
| Chi tiết blog |  |  |  |  |  |

Mục tiêu an toàn trước khi nộp: Accessibility ≥ 90; các hạng mục còn lại ≥ 85.
