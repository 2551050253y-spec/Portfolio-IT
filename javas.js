 document.addEventListener('DOMContentLoaded', function() {
            const sections = document.querySelectorAll('section');
            const navItems = document.querySelectorAll('.nav-item');

            window.addEventListener('scroll', () => {
                let current = '';
                
                // Lấy ID của section đang nằm trên màn hình
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    // Trừ đi một khoảng offset để khi vừa chạm tới đã đổi màu
                    if (scrollY >= sectionTop - 150) {
                        current = section.getAttribute('id');
                    }
                });

                // Đổi class active cho nav-item tương ứng
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href').substring(1) === current) {
                        item.classList.add('active');
                    }
                });
            });
        });