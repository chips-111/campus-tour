document.addEventListener("DOMContentLoaded", function () {
  initNavigation();
  initBackToTop();
  initCarousel();
  initMapInteraction();
  initFeedbackForm();
});

function initNavigation() {
  var hamburger = document.querySelector(".hamburger");
  var nav = document.querySelector("nav");
  if (hamburger && nav) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("open");
      nav.classList.toggle("open");
    });
    var navLinks = nav.querySelectorAll("a");
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        hamburger.classList.remove("open");
        nav.classList.remove("open");
      });
    });
  }
  var currentPage = window.location.pathname.split("/").pop() || "index.html";
  var navItems = document.querySelectorAll("nav ul li a");
  navItems.forEach(function (item) {
    var href = item.getAttribute("href");
    if (href === currentPage) {
      item.classList.add("active");
    }
  });
}

function initBackToTop() {
  var btn = document.querySelector(".back-to-top");
  if (!btn) return;
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }
  });
  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initCarousel() {
  var carousel = document.querySelector(".carousel");
  if (!carousel) return;
  var track = carousel.querySelector(".carousel-track");
  var slides = carousel.querySelectorAll(".carousel-slide");
  var prevBtn = carousel.querySelector(".carousel-btn.prev");
  var nextBtn = carousel.querySelector(".carousel-btn.next");
  var dotsContainer = carousel.querySelector(".carousel-dots");
  var currentIndex = 0;
  var autoPlayTimer = null;
  var totalSlides = slides.length;

  if (totalSlides === 0) return;

  for (var i = 0; i < totalSlides; i++) {
    var dot = document.createElement("button");
    dot.classList.add("carousel-dot");
    if (i === 0) dot.classList.add("active");
    dot.setAttribute("data-index", i);
    dot.addEventListener("click", function () {
      goToSlide(parseInt(this.getAttribute("data-index")));
    });
    dotsContainer.appendChild(dot);
  }

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentIndex = index;
    track.style.transform = "translateX(-" + (currentIndex * 100) + "%)";
    updateDots();
  }

  function updateDots() {
    var dots = dotsContainer.querySelectorAll(".carousel-dot");
    dots.forEach(function (dot, i) {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      goToSlide(currentIndex - 1);
      resetAutoPlay();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      goToSlide(currentIndex + 1);
      resetAutoPlay();
    });
  }

  function startAutoPlay() {
    autoPlayTimer = setInterval(function () {
      goToSlide(currentIndex + 1);
    }, 4000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayTimer);
    startAutoPlay();
  }

  startAutoPlay();

  carousel.addEventListener("mouseenter", function () {
    clearInterval(autoPlayTimer);
  });
  carousel.addEventListener("mouseleave", function () {
    startAutoPlay();
  });
}

function initMapInteraction() {
  var mapContainer = document.querySelector(".campus-map");
  if (!mapContainer) return;
  var buildings = mapContainer.querySelectorAll(".map-building");
  var infoPanel = document.querySelector(".map-info-panel");
  var closeBtn = infoPanel ? infoPanel.querySelector(".close-btn") : null;

  buildings.forEach(function (building) {
    building.addEventListener("click", function () {
      buildings.forEach(function (b) { b.classList.remove("active"); });
      building.classList.add("active");
      if (infoPanel) {
        var name = building.getAttribute("data-name") || building.textContent;
        var desc = building.getAttribute("data-desc") || "暂无介绍信息";
        var category = building.getAttribute("data-category") || "校园建筑";
        infoPanel.querySelector("h3").textContent = name;
        infoPanel.querySelector(".category").textContent = category;
        infoPanel.querySelector(".desc").textContent = desc;
        infoPanel.classList.add("show");
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      infoPanel.classList.remove("show");
      buildings.forEach(function (b) { b.classList.remove("active"); });
    });
  }

  document.addEventListener("click", function (e) {
    if (infoPanel && !mapContainer.contains(e.target) && !infoPanel.contains(e.target)) {
      infoPanel.classList.remove("show");
      buildings.forEach(function (b) { b.classList.remove("active"); });
    }
  });
}

function initFeedbackForm() {
  var form = document.querySelector(".feedback-form form");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.querySelector("#name");
    var email = form.querySelector("#email");
    var message = form.querySelector("#message");
    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      alert("请填写所有必填项！");
      return;
    }
    var emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailReg.test(email.value.trim())) {
      alert("请输入有效的邮箱地址！");
      return;
    }
    alert("感谢您的反馈！我们会尽快处理。");
    form.reset();
  });
}
