/* ----------------------------------
   Javascript Slider Project
---------------------------------- */

const projects = [
  {
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    title: "ĐỀ 11 BTL Thiết kế Web",
    link: "project-detail.html"
  },
  {
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
    title: "Hệ thống xử lý dữ liệu C++",
    link: "project-cpp.html"
  },
  {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    title: "Project 3 - Analytics & Admin Dashboard App",
    link: "project.html"
  }
];

let currentProject = 0;

// Lấy đúng ID từ HTML
const projectImage = document.getElementById("projectImage");
const projectTitle = document.getElementById("projectTitle");
const projectLink = document.getElementById("projectLink");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function showProject(index) {
  projectImage.src = projects[index].image;
  projectTitle.textContent = projects[index].title;
  projectLink.href = projects[index].link;
}

// Project trước
prevBtn.addEventListener("click", () => {
  currentProject--;
  if (currentProject < 0) {
    currentProject = projects.length - 1;
  }
  showProject(currentProject);
});

// Project tiếp theo
nextBtn.addEventListener("click", () => {
  currentProject++;
  if (currentProject >= projects.length) {
    currentProject = 0;
  }
  showProject(currentProject);
}); 