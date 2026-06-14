/* ===========================
   5CUSTOMS — GLOBAL SCRIPTS
   =========================== */

// ===== NAVBAR SCROLL =====
(function() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
})();

// ===== MOBILE MENU =====
(function() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-close');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const close = () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (mobileClose) mobileClose.addEventListener('click', close);
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
})();

// ===== SCROLL ANIMATIONS =====
(function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
})();

// ===== AI CHAT WIDGET =====
(function() {
  const bubble = document.querySelector('.ai-bubble');
  const chat = document.querySelector('.ai-chat');
  const closeBtn = document.querySelector('.ai-close-btn');
  const input = document.querySelector('.ai-chat-input input');
  const sendBtn = document.querySelector('.ai-send-btn');
  const messages = document.querySelector('.ai-chat-messages');

  if (!bubble || !chat) return;

  const responses = [
    'Здравствуйте! Я AI-помощник компании 5CUSTOMS. Чем могу помочь?',
    'Мы осуществляем поставку автомобилей из США, Европы, Японии, Китая и других стран. Сроки доставки — от 4 до 12 недель в зависимости от региона.',
    'Для расчёта стоимости поставки конкретного автомобиля, пожалуйста, свяжитесь с нашим менеджером по телефону +7 (666) 333-73-73 или в Telegram.',
    'Мы работаем как с современными, так и с коллекционными автомобилями. Расскажите подробнее, что вас интересует?',
    'Стоимость запчастей рассчитывается индивидуально. Оставьте заявку, и мы свяжемся с вами в течение 24 часов.',
    'Отличный выбор! Мы поможем подобрать и привезти именно такой автомобиль. Для начала работы нужно оставить заявку.',
  ];

  let responseIdx = 0;

  bubble.addEventListener('click', () => {
    chat.classList.toggle('open');
  });

  if (closeBtn) closeBtn.addEventListener('click', () => {
    chat.classList.remove('open');
  });

  function addMessage(text, isUser) {
    const msg = document.createElement('div');
    msg.className = 'ai-msg' + (isUser ? ' user' : '');
    msg.innerHTML = `<div class="ai-msg-bubble${isUser ? ' user' : ''}">${text}</div>`;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, true);
    input.value = '';
    setTimeout(() => {
      addMessage(responses[responseIdx % responses.length], false);
      responseIdx++;
    }, 800);
  }

  if (sendBtn) sendBtn.addEventListener('click', sendMessage);
  if (input) input.addEventListener('keydown', e => {
    if (e.key === 'Enter') sendMessage();
  });
})();

// ===== COOKIE BANNER =====
(function() {
  const banner = document.querySelector('.cookie-banner');
  if (!banner) return;
  if (localStorage.getItem('5c_cookies') === 'accepted') return;

  setTimeout(() => banner.classList.add('visible'), 1200);

  const acceptBtn = banner.querySelector('.cookie-accept');
  const declineBtn = banner.querySelector('.cookie-decline');

  const dismiss = () => {
    banner.style.transform = 'translateY(100%)';
    setTimeout(() => banner.remove(), 400);
  };

  if (acceptBtn) acceptBtn.addEventListener('click', () => {
    localStorage.setItem('5c_cookies', 'accepted');
    dismiss();
  });

  if (declineBtn) declineBtn.addEventListener('click', dismiss);
})();

// ===== MODAL =====
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => {
      m.classList.remove('open');
    });
    document.body.style.overflow = '';
  }
});

// ===== FORM SUBMIT =====
document.addEventListener('submit', (e) => {
  if (e.target.classList.contains('contact-form')) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('[type="submit"]');
    if (btn) {
      btn.textContent = 'Отправляем...';
      btn.disabled = true;
    }
    setTimeout(() => {
      form.closest('.modal-overlay')?.classList.remove('open');
      document.body.style.overflow = '';
      openModal('modal-success');
    }, 1200);
  }
});

// ===== FAQ ACCORDION =====
(function() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-question');
    if (!q) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
})();
// ===== CAR CATALOG MODAL GALLERY =====

const carImageConfig = {
  "corvette-c7": {
    folder: "cars/corvette-c7",
    prefix: "corvette_c7"
  },
  "corvette-c8": {
    folder: "cars/corvette-c8",
    prefix: "corvette_c8"
  },
  "porsche-911-turbo": {
    folder: "cars/porsche-911-turbo",
    prefix: "porsche_911_turbo"
  },
  "porsche-cayman-gt4": {
    folder: "cars/porsche-cayman-gt4",
    prefix: "porsche_cayman_gt4"
  },
  "mercedes-g63": {
    folder: "cars/mercedes-g63",
    prefix: "mercedes_g63"
  },
  "mercedes-s63": {
    folder: "cars/mercedes-s63",
    prefix: "mercedes_s63"
  },
  "bentley-continental": {
    folder: "cars/bentley-continental",
    prefix: "bentley_continental"
  },
  "bentley-flying-spur": {
    folder: "cars/bentley-flying-spur",
    prefix: "bentley_flying_spur"
  },
  "aston-db11": {
    folder: "cars/aston-db11",
    prefix: "aston_db11"
  },
  "aston-vantage": {
    folder: "cars/aston-vantage",
    prefix: "aston_vantage"
  },
  "bmw-m5": {
    folder: "cars/bmw-m5",
    prefix: "bmw_m5"
  },
  "audi-rs6": {
    folder: "cars/audi-rs6",
    prefix: "audi_rs6"
  }
};

function makeCarImages(carId) {
  const config = carImageConfig[carId];
  if (!config) return [];

  return Array.from({ length: 10 }, (_, i) => {
    const num = i + 1;
    return `${config.folder}/${config.prefix}_${num}.webp`;
  });
}

const carsData = {
  "corvette-c7": {
    brand: "Chevrolet",
    name: "Chevrolet Corvette C7",
    price: "от 5 500 000 ₽",
    year: "2014–2019",
    power: "460–650 л.с.",
    engine: "6.2L V8",
    drive: "Задний",
    delivery: "6–8 недель",
    description: "Chevrolet Corvette C7 — последнее поколение Corvette с классической переднемоторной компоновкой. Ценится за мощный V8, задний привод и яркий американский характер."
  },
  "corvette-c8": {
    brand: "Chevrolet",
    name: "Chevrolet Corvette C8",
    price: "от 8 700 000 ₽",
    year: "2020–н.в.",
    power: "490–670 л.с.",
    engine: "6.2L V8 / 5.5L V8",
    drive: "Задний",
    delivery: "6–10 недель",
    description: "Corvette C8 — первое среднемоторное поколение Corvette. Машина стала ближе к европейским суперкарам, сохранив атмосферный V8 и агрессивный стиль."
  },
  "porsche-911-turbo": {
    brand: "Porsche",
    name: "Porsche 911 Turbo S",
    price: "от 24 000 000 ₽",
    year: "2021–н.в.",
    power: "650 л.с.",
    engine: "3.7L Twin-Turbo Boxer",
    drive: "Полный",
    delivery: "5–7 недель",
    description: "911 Turbo S — один из самых быстрых и универсальных спорткаров Porsche. Сочетает полный привод, премиальный комфорт и динамику уровня суперкара."
  },
  "porsche-cayman-gt4": {
    brand: "Porsche",
    name: "Porsche Cayman GT4",
    price: "от 13 000 000 ₽",
    year: "2020–2025",
    power: "420 л.с.",
    engine: "4.0L атмосферный Boxer",
    drive: "Задний",
    delivery: "5–7 недель",
    description: "Cayman GT4 — среднемоторный Porsche с атмосферным двигателем и трековой настройкой шасси. Один из самых драйверских автомобилей марки."
  },
  "mercedes-g63": {
    brand: "Mercedes-Benz",
    name: "Mercedes-Benz G63 AMG",
    price: "от 23 000 000 ₽",
    year: "2019–н.в.",
    power: "585 л.с.",
    engine: "4.0L V8 Biturbo",
    drive: "Полный",
    delivery: "5–8 недель",
    description: "G63 AMG — статусный внедорожник с мощным V8, премиальным салоном и узнаваемым дизайном. Один из главных символов AMG."
  },
  "mercedes-s63": {
    brand: "Mercedes-Benz",
    name: "Mercedes-Benz S63 AMG",
    price: "от 25 000 000 ₽",
    year: "2022–н.в.",
    power: "612–802 л.с.",
    engine: "4.0L V8 Biturbo",
    drive: "Полный",
    delivery: "4–7 недель",
    description: "S63 AMG сочетает комфорт представительского S-Class и мощность AMG. Это автомобиль для тех, кому нужен люкс без потери динамики."
  },
  "bentley-continental": {
    brand: "Bentley",
    name: "Bentley Continental GT",
    price: "от 28 000 000 ₽",
    year: "2019–н.в.",
    power: "550–659 л.с.",
    engine: "4.0L V8 / 6.0L W12",
    drive: "Полный",
    delivery: "5–8 недель",
    description: "Continental GT — роскошный гран-турер Bentley для дальних поездок на высокой скорости. Машина сочетает статус, комфорт и мощность."
  },
  "bentley-flying-spur": {
    brand: "Bentley",
    name: "Bentley Flying Spur",
    price: "от 27 000 000 ₽",
    year: "2020–н.в.",
    power: "542–626 л.с.",
    engine: "V8 / W12 / Hybrid",
    drive: "Полный",
    delivery: "5–7 недель",
    description: "Flying Spur — люксовый седан Bentley с высоким уровнем комфорта, ручной отделкой и мощными двигателями."
  },
  "aston-db11": {
    brand: "Aston Martin",
    name: "Aston Martin DB11",
    price: "от 17 000 000 ₽",
    year: "2017–2023",
    power: "510–630 л.с.",
    engine: "4.0L V8 / 5.2L V12",
    drive: "Задний",
    delivery: "5–8 недель",
    description: "DB11 — элегантный британский grand tourer. Подходит тем, кто ищет сочетание стиля, редкости и мощного двигателя."
  },
  "aston-vantage": {
    brand: "Aston Martin",
    name: "Aston Martin Vantage",
    price: "от 16 000 000 ₽",
    year: "2018–н.в.",
    power: "503–665 л.с.",
    engine: "4.0L V8 Biturbo",
    drive: "Задний",
    delivery: "5–8 недель",
    description: "Vantage — более компактный и агрессивный Aston Martin, ориентированный на драйв, звук и спортивный характер."
  },
  "bmw-m5": {
    brand: "BMW",
    name: "BMW M5 Competition",
    price: "от 13 500 000 ₽",
    year: "2022–2025",
    power: "625 л.с.",
    engine: "4.4L V8 Biturbo",
    drive: "Полный",
    delivery: "4–7 недель",
    description: "BMW M5 Competition — один из эталонов спортивных седанов. Практичный кузов, полный привод и динамика уровня суперкара."
  },
  "audi-rs6": {
    brand: "Audi",
    name: "Audi RS6 Performance",
    price: "от 15 000 000 ₽",
    year: "2023–н.в.",
    power: "630 л.с.",
    engine: "4.0L V8 TFSI Biturbo",
    drive: "Полный quattro",
    delivery: "4–6 недель",
    description: "Audi RS6 Performance — быстрый универсал с мощным V8, полным приводом quattro и практичностью на каждый день."
  }
};

Object.keys(carsData).forEach(carId => {
  carsData[carId].images = makeCarImages(carId);
});

let currentCar = null;
let currentImageIndex = 0;

function getCarIdFromHref(href) {
  if (!href) return null;
  return href.split("/").pop().replace(".html", "");
}

function createCarModal() {
  if (document.querySelector("#carModal")) return;

  const modal = document.createElement("div");
  modal.className = "car-modal-overlay";
  modal.id = "carModal";

  modal.innerHTML = `
    <div class="car-modal" onclick="event.stopPropagation()">
      <button class="car-modal-close">✕</button>

      <div class="car-modal-gallery">
        <div class="car-modal-main-image">
          <button class="car-gallery-arrow car-gallery-prev" id="carPrevImage" aria-label="Предыдущее фото">‹</button>
          <img id="carModalImage" src="" alt="">
          <button class="car-gallery-arrow car-gallery-next" id="carNextImage" aria-label="Следующее фото">›</button>
        </div>

        <div class="car-modal-thumbs" id="carModalThumbs"></div>
      </div>

      <div class="car-modal-info">
        <div class="car-modal-brand" id="carModalBrand"></div>
        <h2 id="carModalTitle"></h2>
        <div class="car-modal-price" id="carModalPrice"></div>

        <div class="car-modal-specs">
          <div><span>Год</span><strong id="carModalYear"></strong></div>
          <div><span>Мощность</span><strong id="carModalPower"></strong></div>
          <div><span>Двигатель</span><strong id="carModalEngine"></strong></div>
          <div><span>Привод</span><strong id="carModalDrive"></strong></div>
          <div><span>Срок доставки</span><strong id="carModalDelivery"></strong></div>
        </div>

        <p id="carModalDescription"></p>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.addEventListener("click", closeCarModal);
  modal.querySelector(".car-modal-close").addEventListener("click", closeCarModal);
  modal.querySelector("#carPrevImage").addEventListener("click", prevCarImage);
  modal.querySelector("#carNextImage").addEventListener("click", nextCarImage);
}

function openCarModal(carId) {
  const car = carsData[carId];
  if (!car) return;

  createCarModal();

  currentCar = car;
  currentImageIndex = 0;

  document.querySelector("#carModalBrand").textContent = car.brand;
  document.querySelector("#carModalTitle").textContent = car.name;
  document.querySelector("#carModalPrice").textContent = car.price;
  document.querySelector("#carModalYear").textContent = car.year;
  document.querySelector("#carModalPower").textContent = car.power;
  document.querySelector("#carModalEngine").textContent = car.engine;
  document.querySelector("#carModalDrive").textContent = car.drive;
  document.querySelector("#carModalDelivery").textContent = car.delivery;
  document.querySelector("#carModalDescription").textContent = car.description;

  renderCarGallery();

  document.querySelector("#carModal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function renderCarGallery() {
  if (!currentCar) return;

  const mainImage = document.querySelector("#carModalImage");
  const thumbs = document.querySelector("#carModalThumbs");

  mainImage.src = currentCar.images[currentImageIndex];
  mainImage.alt = currentCar.name;

  thumbs.innerHTML = "";

  currentCar.images.forEach((image, index) => {
    const img = document.createElement("img");
    img.src = image;
    img.alt = currentCar.name;

    if (index === currentImageIndex) {
      img.classList.add("active");
    }

    img.addEventListener("click", () => {
      currentImageIndex = index;
      renderCarGallery();
    });

    thumbs.appendChild(img);
  });
}

function nextCarImage() {
  if (!currentCar) return;
  currentImageIndex = (currentImageIndex + 1) % currentCar.images.length;
  renderCarGallery();
}

function prevCarImage() {
  if (!currentCar) return;
  currentImageIndex =
    (currentImageIndex - 1 + currentCar.images.length) % currentCar.images.length;
  renderCarGallery();
}

function closeCarModal() {
  const modal = document.querySelector("#carModal");
  if (!modal) return;

  modal.classList.remove("open");
  document.body.style.overflow = "";
}

function replaceCardEmojisWithImages() {
  document.querySelectorAll(".car-card").forEach(card => {
    const carId = card.dataset.car || getCarIdFromHref(card.getAttribute("href"));
    const car = carsData[carId];

    if (!car) return;

    card.dataset.car = carId;

    const imageBox = card.querySelector(".car-image");
    if (!imageBox) return;

    const emoji = imageBox.querySelector(".car-silhouette");
    if (emoji) emoji.remove();

    if (!imageBox.querySelector(".car-card-img")) {
      const img = document.createElement("img");
      img.className = "car-card-img";
      img.src = car.images[0];
      img.alt = car.name;
      imageBox.appendChild(img);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  replaceCardEmojisWithImages();

  document.querySelectorAll(".car-card").forEach(card => {
    card.addEventListener("click", event => {
      event.preventDefault();

      const carId = card.dataset.car || getCarIdFromHref(card.getAttribute("href"));
      openCarModal(carId);
    });
  });
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeCarModal();
  }
});
// SIMPLE LOCAL PROFILE

function createProfileModal() {
  if (document.querySelector("#profileModal")) return;

  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.id = "profileModal";

  modal.innerHTML = `
    <div class="modal" onclick="event.stopPropagation()">
      <button class="modal-close" onclick="closeProfileModal()">✕</button>
      <h3>Профиль клиента</h3>
      <p class="modal-subtitle">Сохраните контактные данные для быстрых обращений.</p>

      <form id="profileForm">
        <div class="form-group">
          <label>Имя</label>
          <input type="text" id="profileName" placeholder="Ваше имя" required>
        </div>

        <div class="form-group">
          <label>Телефон</label>
          <input type="tel" id="profilePhone" placeholder="+7..." required>
        </div>

        <div class="form-group">
          <label>Интересующий автомобиль</label>
          <input type="text" id="profileCar" placeholder="Например, Porsche 911 Turbo S">
        </div>

        <button class="btn btn-primary btn-lg" style="width:100%;justify-content:center;">
          Сохранить профиль
        </button>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  modal.addEventListener("click", closeProfileModal);

  document.querySelector("#profileForm").addEventListener("submit", event => {
    event.preventDefault();

    const profile = {
      name: document.querySelector("#profileName").value,
      phone: document.querySelector("#profilePhone").value,
      car: document.querySelector("#profileCar").value
    };

    localStorage.setItem("fivecustomsProfile", JSON.stringify(profile));
    updateProfileButton();
    closeProfileModal();
  });
}

function openProfileModal() {
  createProfileModal();

  const saved = JSON.parse(localStorage.getItem("fivecustomsProfile") || "{}");

  document.querySelector("#profileName").value = saved.name || "";
  document.querySelector("#profilePhone").value = saved.phone || "";
  document.querySelector("#profileCar").value = saved.car || "";

  document.querySelector("#profileModal").classList.add("open");
}

function closeProfileModal() {
  const modal = document.querySelector("#profileModal");
  if (modal) modal.classList.remove("open");
}

function updateProfileButton() {
  const saved = JSON.parse(localStorage.getItem("fivecustomsProfile") || "{}");

  document.querySelectorAll(".profile-text").forEach(el => {
    el.textContent = saved.name ? saved.name : "Профиль";
  });
}

document.addEventListener("DOMContentLoaded", updateProfileButton);
// ===== INFINITE SERVICES SLIDER =====

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector("#servicesSlider");
  const prevBtn = document.querySelector(".services-prev");
  const nextBtn = document.querySelector(".services-next");

  if (!slider || !prevBtn || !nextBtn) return;

  function getSlideWidth() {
    const slide = slider.querySelector(".service-slide");
    if (!slide) return 0;

    const gap = parseFloat(getComputedStyle(slider).gap) || 0;
    return slide.offsetWidth + gap;
  }

  function goNext() {
    const slideWidth = getSlideWidth();

    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5) {
      slider.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      slider.scrollBy({ left: slideWidth, behavior: "smooth" });
    }
  }

  function goPrev() {
    const slideWidth = getSlideWidth();

    if (slider.scrollLeft <= 5) {
      slider.scrollTo({ left: slider.scrollWidth, behavior: "smooth" });
    } else {
      slider.scrollBy({ left: -slideWidth, behavior: "smooth" });
    }
  }

  nextBtn.addEventListener("click", goNext);
  prevBtn.addEventListener("click", goPrev);
});
// ===== HERO COUNTERS =====

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  if (!counters.length) return;

  let started = false;

  function animateCounters() {
    if (started) return;
    started = true;

    counters.forEach(counter => {
      const target = Number(counter.dataset.target);
      const suffix = counter.dataset.suffix || "";
      const duration = 1400;
      const startTime = performance.now();

      function update(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(eased * target);

        counter.textContent = value + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = target + suffix;
        }
      }

      requestAnimationFrame(update);
    });
  }

  const hero = document.querySelector(".hero");

  if (!hero) {
    animateCounters();
    return;
  }

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateCounters();
      observer.disconnect();
    }
  }, { threshold: 0.35 });

  observer.observe(hero);
});

// ===== RESULTS REVIEWS SLIDER =====
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector("#reviewsTrack");
  const prev = document.querySelector(".reviews-prev");
  const next = document.querySelector(".reviews-next");

  if (!track || !prev || !next) return;

  let index = 0;

  function getVisibleCount() {
    const w = window.innerWidth;
    if (w <= 640) return 1;
    if (w <= 1024) return 2;
    return 4;
  }

  function updateReviews() {
    const cards = Array.from(track.querySelectorAll(".review-card"));
    if (!cards.length) return;

    const visible = getVisibleCount();
    const maxIndex = Math.max(0, cards.length - visible);
    if (index > maxIndex) index = 0;
    if (index < 0) index = maxIndex;

    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const cardWidth = cards[0].offsetWidth;
    track.style.transform = `translateX(-${index * (cardWidth + gap)}px)`;
  }

  next.addEventListener("click", () => {
    const cards = track.querySelectorAll(".review-card");
    const maxIndex = Math.max(0, cards.length - getVisibleCount());
    index = index >= maxIndex ? 0 : index + 1;
    updateReviews();
  });

  prev.addEventListener("click", () => {
    const cards = track.querySelectorAll(".review-card");
    const maxIndex = Math.max(0, cards.length - getVisibleCount());
    index = index <= 0 ? maxIndex : index - 1;
    updateReviews();
  });

  window.addEventListener("resize", updateReviews);
  updateReviews();
});
