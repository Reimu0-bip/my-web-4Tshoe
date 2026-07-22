/* =========================================================
   4T SHOE STORE — SHARED APP LOGIC
   Dùng chung cho mọi trang. Dữ liệu giỏ hàng được lưu ở
   localStorage nên sẽ đồng bộ qua lại giữa các trang.
   ========================================================= */

const STORE = {
  cartKey: "4t_cart",
  couponKey: "4t_coupon",
};

/* ---------- Ảnh sản phẩm thật ----------
   Cấu trúc thư mục: image/<Brand>/<Brand> (n).jpg
   Ví dụ: image/4T/4T (1).jpg, image/Nike/Nike (1).jpg ...
   Mỗi thư mục hiện có khoảng 10 ảnh — nếu số ảnh thực tế khác,
   chỉ cần đổi BRAND_IMAGE_COUNT bên dưới. */
const BRAND_IMAGE_COUNT = 10;

function productImagePath(folder, index) {
  const n = ((index - 1) % BRAND_IMAGE_COUNT) + 1;
  return `./image/${folder}/${folder}_(${n}).jpg`;
}

/* Trả về 4 đường dẫn ảnh liên tiếp trong cùng thư mục brand,
   dùng cho dãy ảnh thumbnail ở trang chi tiết sản phẩm. */
function detailThumbImages(p) {
  const arr = [];
  for (let i = 0; i < 4; i++) arr.push(productImagePath(p.brandFolder, p.imgIndex + i));
  return arr;
}

/* Tạo thẻ <img> ảnh sản phẩm, tự động fallback về SVG placeholder
   nếu ảnh chưa có / load lỗi (tránh vỡ giao diện khi thiếu file ảnh). */
function productImgTag(src, alt, color, size = 100) {
  const safeAlt = String(alt).replace(/"/g, "&quot;");
  return `<img src="${src}" alt="${safeAlt}" loading="lazy" style="width:100%;height:100%;object-fit:contain" onerror="this.onerror=null;this.outerHTML=shoeSVG('${color}', ${size});">`;
}

/* ---------- SVG giày (dự phòng khi chưa có ảnh thật) ---------- */
function shoeSVG(color = "#111111", size = 90) {
  return `<svg viewBox="0 0 120 60" width="${size}%" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 42 C6 34 14 30 22 29 L46 24 C54 18 66 14 80 15 C90 16 96 22 100 28
    L112 30 C116 31 118 34 118 38 L118 46 C118 49 116 51 113 51 L10 51 C7 51 6 49 6 46 Z"
    fill="${color}" opacity="0.92"/>
    <path d="M22 29 L46 24 C54 18 66 14 80 15" stroke="white" stroke-width="2" fill="none" opacity="0.5"/>
    <circle cx="34" cy="40" r="3" fill="white" opacity="0.7"/>
    <circle cx="46" cy="38" r="3" fill="white" opacity="0.7"/>
    <circle cx="58" cy="36" r="3" fill="white" opacity="0.7"/>
    <rect x="6" y="46" width="112" height="6" rx="3" fill="black" opacity="0.85"/>
  </svg>`;
}

/* ---------- Dữ liệu sản phẩm mẫu ---------- */
const PRODUCTS = [
  { id: "p1", brand: "Nike", name: "Nike Dunk Low", price: 2591200, oldPrice: 3239000, rating: 4, reviews: 256, tag: "Sale", color: "#3b6fe0", brandFolder: "Nike", imgIndex: 1 },
  { id: "p2", brand: "Puma", name: "Speedcat Leather", price: 2800000, oldPrice: null, rating: 4, reviews: 142, tag: null, color: "#111111", brandFolder: "Puma", imgIndex: 1 },
  { id: "p3", brand: "Adidas", name: "Grand Court", price: 1499000, oldPrice: null, rating: 4, reviews: 89, tag: null, color: "#111111", brandFolder: "Adidas", imgIndex: 1 },
  { id: "p4", brand: "Adidas", name: "Start Your Run", price: 1100000, oldPrice: 2000000, rating: 4, reviews: 178, tag: "Sale", color: "#111111", brandFolder: "Adidas", imgIndex: 2 },
  { id: "p5", brand: "Nike", name: "Nike Flex Train", price: 2189000, oldPrice: null, rating: 4, reviews: 203, tag: null, color: "#111111", brandFolder: "Nike", imgIndex: 2 },
  { id: "p6", brand: "4T", name: "VT Shoe", price: 1290000, oldPrice: 2000000, rating: 4, reviews: 95, tag: "Sale", color: "#d8c7a8", brandFolder: "4T", imgIndex: 1 },
  { id: "p7", brand: "Nike", name: "Nike Air Force", price: 3600000, oldPrice: 2890000, rating: 4, reviews: 128, tag: "-17%", color: "#cfcfcf", brandFolder: "Nike", imgIndex: 3 },
  { id: "p8", brand: "Adidas", name: "Adidas Ultra Boost 22", price: 2450000, oldPrice: null, rating: 5, reviews: 64, tag: "Mới", color: "#111111", brandFolder: "Adidas", imgIndex: 3 },
  { id: "p9", brand: "Puma", name: "Classic Puma Pro", price: 890000, oldPrice: 1050000, rating: 3, reviews: 41, tag: "-15%", color: "#f4f4f4", brandFolder: "Puma", imgIndex: 2 },
  { id: "p10", brand: "Puma", name: "PUMA Street Runner X2", price: 1200000, oldPrice: null, rating: 4, reviews: 58, tag: null, color: "#111111", brandFolder: "Puma", imgIndex: 3 },
  { id: "p11", brand: "Giày 4T", name: "4T VT V3 PRO", price: 750000, oldPrice: null, rating: 5, reviews: 33, tag: "Mới", color: "#d8c7a8", brandFolder: "4T", imgIndex: 2 },
  { id: "p12", brand: "Nike", name: "Nike Free RN 5.0", price: 1540000, oldPrice: 2200000, rating: 4, reviews: 77, tag: "-30%", color: "#111111", brandFolder: "Nike", imgIndex: 4 },
];

/* Gán sẵn đường dẫn ảnh chính cho mỗi sản phẩm dựa trên brandFolder/imgIndex */
PRODUCTS.forEach((p) => {
  p.img = productImagePath(p.brandFolder, p.imgIndex);
});

/* ---------- Helpers ---------- */
function formatVND(n) {
  return n.toLocaleString("vi-VN") + "đ";
}
function starRow(rating) {
  let s = "";
  for (let i = 1; i <= 5; i++) s += i <= rating ? "★" : "☆";
  return s;
}
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(STORE.cartKey)) || [];
  } catch (e) {
    return [];
  }
}
function saveCart(cart) {
  localStorage.setItem(STORE.cartKey, JSON.stringify(cart));
  updateCartBadges();
}
function cartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}
function addToCart(product, qty = 1) {
  const cart = getCart();
  const existing = cart.find((i) => i.id === product.id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...product, qty });
  }
  saveCart(cart);
  showToast(`Đã thêm "${product.name}" vào giỏ hàng`);
}
function updateCartBadges() {
  const count = cartCount();
  document.querySelectorAll(".cart-badge").forEach((el) => {
    el.textContent = count;
    el.style.display = count > 0 ? "flex" : "flex";
  });
}

/* ---------- Toast ---------- */
function showToast(msg) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* ---------- Mobile menu toggle ---------- */
function initMobileMenu() {
  const btn = document.querySelector(".mobile-menu-btn");
  const nav = document.querySelector(".mobile-nav");
  if (!btn || !nav) return;
  btn.addEventListener("click", () => nav.classList.toggle("open"));
}

/* ---------- Header search filter (nếu trang có #productGrid) ---------- */
function initHeaderSearch() {
  const input = document.querySelector(".header-search input");
  const grid = document.querySelector("#productGrid");
  if (!input) return;
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (!grid) return;
    grid.querySelectorAll(".product-card").forEach((card) => {
      const name = card.dataset.name || "";
      card.style.display = name.includes(q) ? "" : "none";
    });
  });
}

/* ---------- Render lưới sản phẩm (dùng ở home & products) ---------- */
function renderProductCard(p) {
  return `
  <div class="product-card" data-name="${p.name.toLowerCase()}">
    <div class="product-image">
      ${p.tag ? `<span class="product-tag ${p.tag === "Mới" ? "new" : ""}">${p.tag}</span>` : ""}
      ${productImgTag(p.img, p.name, p.color, 100)}
    </div>
    <div class="product-body">
      <span class="product-brand">${p.brand}</span>
      <a href="product-detail.html?id=${p.id}" class="product-name">${p.name}</a>
      <div class="product-rating">${starRow(p.rating)} <span class="count">(${p.reviews})</span></div>
      <div class="product-price-row">
        <div>
          <span class="product-price">${formatVND(p.price)}</span>
          ${p.oldPrice ? `<span class="product-price-old">${formatVND(p.oldPrice)}</span>` : ""}
        </div>
        <button class="cart-icon-btn" data-add="${p.id}" aria-label="Thêm vào giỏ">🛒</button>
      </div>
    </div>
  </div>`;
}
function initProductGrid(containerSelector, list) {
  const el = document.querySelector(containerSelector);
  if (!el) return;
  el.innerHTML = list.map(renderProductCard).join("");
  el.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const p = PRODUCTS.find((x) => x.id === btn.dataset.add);
      if (p) addToCart(p, 1);
    });
  });
}

/* ---------- Hero slider (home) ---------- */
function initHeroSlider() {
  const dots = document.querySelectorAll(".hero-dots span");
  const prev = document.querySelector(".hero-arrow.prev");
  const next = document.querySelector(".hero-arrow.next");
  if (!dots.length) return;
  let idx = 0;
  function setIdx(i) {
    idx = (i + dots.length) % dots.length;
    dots.forEach((d, n) => d.classList.toggle("active", n === idx));
  }
  prev && prev.addEventListener("click", () => setIdx(idx - 1));
  next && next.addEventListener("click", () => setIdx(idx + 1));
  dots.forEach((d, n) => d.addEventListener("click", () => setIdx(n)));
  setInterval(() => setIdx(idx + 1), 5000);
}

/* ---------- Trang Giỏ hàng ---------- */
function renderCartPage() {
  const body = document.querySelector("#cartTableBody");
  if (!body) return;
  const cart = getCart();

  function draw() {
    const items = getCart();
    if (items.length === 0) {
      body.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:40px 0;color:var(--text-muted)">Giỏ hàng của bạn đang trống.</td></tr>`;
    } else {
      body.innerHTML = items
        .map(
          (i) => `
        <tr data-id="${i.id}">
          <td><div class="cart-item-info"><div class="thumb">${productImgTag(i.img, i.name, i.color, 90)}</div>
            <div><strong>${i.name}</strong><span>Màu: Mặc định / Size: 40</span></div></div></td>
          <td>${formatVND(i.price)}</td>
          <td><div class="qty-control">
            <button data-act="dec">−</button>
            <input type="text" value="${i.qty}" readonly>
            <button data-act="inc">+</button>
          </div></td>
          <td style="display:flex;align-items:center;gap:10px;justify-content:space-between">
            <strong>${formatVND(i.price * i.qty)}</strong>
            <button class="remove-btn" data-act="remove">✕</button>
          </td>
        </tr>`
        )
        .join("");
    }
    updateSummary();
  }

  function updateSummary() {
    const items = getCart();
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const discountPct = parseFloat(localStorage.getItem(STORE.couponKey) || "0");
    const discount = Math.round(subtotal * discountPct);
    const total = subtotal - discount;
    const set = (sel, val) => {
      const el = document.querySelector(sel);
      if (el) el.textContent = val;
    };
    set("#sumSubtotal", formatVND(subtotal));
    set("#sumDiscount", "-" + formatVND(discount));
    set("#sumTotal", formatVND(total));
    set("#itemCount", items.reduce((s, i) => s + i.qty, 0));
  }

  body.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-act]");
    if (!btn) return;
    const row = btn.closest("tr");
    const id = row.dataset.id;
    let items = getCart();
    const item = items.find((i) => i.id === id);
    if (!item) return;
    if (btn.dataset.act === "inc") item.qty += 1;
    if (btn.dataset.act === "dec") item.qty = Math.max(1, item.qty - 1);
    if (btn.dataset.act === "remove") items = items.filter((i) => i.id !== id);
    saveCart(items);
    draw();
  });

  const applyBtn = document.querySelector("#applyCoupon");
  if (applyBtn) {
    applyBtn.addEventListener("click", () => {
      const code = document.querySelector("#couponInput").value.trim().toUpperCase();
      if (code === "SOLE20" || code === "TONY136") {
        localStorage.setItem(STORE.couponKey, "0.2");
        showToast("Áp dụng mã giảm giá thành công (-20%)");
      } else if (code) {
        localStorage.setItem(STORE.couponKey, "0");
        showToast("Mã giảm giá không hợp lệ");
      }
      updateSummary();
    });
  }

  const checkoutBtn = document.querySelector("#goCheckout");
  if (checkoutBtn) checkoutBtn.addEventListener("click", () => (window.location.href = "checkout.html"));

  draw();
}

/* ---------- Trang thanh toán / bước thông tin ---------- */
function renderCheckoutSummary() {
  const el = document.querySelector("#checkoutSummary");
  if (!el) return;
  const items = getCart();
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const discountPct = parseFloat(localStorage.getItem(STORE.couponKey) || "0");
  const discount = Math.round(subtotal * discountPct);
  const total = subtotal - discount;
  el.innerHTML =
    items
      .map(
        (i, n) => `
    <div class="order-summary-item">
      <div class="num-badge">${n + 1}</div>
      <div class="thumb" style="width:44px;height:44px;border-radius:8px;background:var(--bg-soft);display:flex;align-items:center;justify-content:center;overflow:hidden">${productImgTag(i.img, i.name, i.color, 90)}</div>
      <div style="flex:1"><strong style="display:block;font-size:13px">${i.name}</strong><span style="color:var(--text-muted);font-size:12px">x${i.qty}</span></div>
      <strong style="font-size:13px">${formatVND(i.price * i.qty)}</strong>
    </div>`
      )
      .join("") +
    `<div class="cart-summary-row" style="margin-top:16px"><span>Tạm tính</span><span>${formatVND(subtotal)}</span></div>
     <div class="cart-summary-row"><span>Phí vận chuyển</span><span class="green">Miễn phí</span></div>
     ${discount > 0 ? `<div class="cart-summary-row"><span>Mã giảm giá</span><span>-${formatVND(discount)}</span></div>` : ""}
     <div class="cart-summary-row total"><span>Tổng cộng</span><span id="checkoutTotal">${formatVND(total)}</span></div>`;

  const payAmountEl = document.querySelector("#payAmount");
  if (payAmountEl) {
    payAmountEl.innerHTML = `${formatVND(total)} <span class="text-muted" style="font-weight:400;font-size:12px">Tổng đơn hàng</span>`;
  }
}

function initShippingOptions() {
  document.querySelectorAll(".ship-option").forEach((opt) => {
    opt.addEventListener("click", () => {
      document.querySelectorAll(".ship-option").forEach((o) => o.classList.remove("selected"));
      opt.classList.add("selected");
      const radio = opt.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });
}

function initCheckoutForm() {
  const form = document.querySelector("#checkoutForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.href = "payment.html";
  });
}

/* ---------- Trang phương thức thanh toán ---------- */
function initPayTabs() {
  const tabs = document.querySelectorAll(".pay-tab");
  if (!tabs.length) return;
  const panels = document.querySelectorAll(".pay-panel");
  tabs.forEach((tab, idx) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      panels.forEach((p) => (p.style.display = "none"));
      tab.classList.add("active");
      if (panels[idx]) panels[idx].style.display = "block";
    });
  });
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", () => showToast("Đã sao chép"));
  });
  const confirmBtn = document.querySelector("#confirmPay");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      saveCart([]);
      showToast("Thanh toán thành công! Cảm ơn bạn đã mua sắm 🎉");
      setTimeout(() => (window.location.href = "index.html"), 1500);
    });
  }
}

/* ---------- Đăng nhập / đăng ký demo ---------- */
function togglePassword(btn) {
  const wrap = btn.closest(".input-icon-wrap");
  const input = wrap.querySelector("input");
  input.type = input.type === "password" ? "text" : "password";
  btn.textContent = input.type === "password" ? "👁" : "🙈";
}
function initPasswordToggles() {
  document.querySelectorAll(".toggle-eye").forEach((btn) => {
    btn.addEventListener("click", () => togglePassword(btn));
  });
}
function checkPasswordStrength(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}
function initStrengthMeter() {
  const input = document.querySelector("#newPassword");
  const meter = document.querySelector(".strength-meter");
  const label = document.querySelector(".strength-label");
  if (!input || !meter) return;
  const bars = meter.querySelectorAll("span");
  const labels = ["Rất yếu", "Yếu", "Trung bình", "Mạnh", "Rất mạnh"];
  const colors = ["#fb2c36", "#ff8904", "#f0b100", "#00c951", "#00a63e"];
  input.addEventListener("input", () => {
    const score = checkPasswordStrength(input.value);
    bars.forEach((b, i) => (b.style.background = i < score ? colors[score - 1] : "#e5e5e5"));
    if (label) {
      label.textContent = input.value ? labels[Math.max(score - 1, 0)] : "";
      label.style.color = colors[Math.max(score - 1, 0)];
    }
  });
}
function initLoginRegisterForms() {
  const login = document.querySelector("#loginForm");
  if (login) {
    login.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Đăng nhập thành công!");
      setTimeout(() => (window.location.href = "index.html"), 1000);
    });
  }
  const register = document.querySelector("#registerForm");
  if (register) {
    register.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Tạo tài khoản thành công! Vui lòng đăng nhập.");
      setTimeout(() => (window.location.href = "login.html"), 1200);
    });
  }
  const changePw = document.querySelector("#changePasswordForm");
  if (changePw) {
    changePw.addEventListener("submit", (e) => {
      e.preventDefault();
      const pw = document.querySelector("#newPassword").value;
      const cf = document.querySelector("#confirmPassword").value;
      const hint = document.querySelector("#confirmHint");
      if (pw !== cf) {
        hint.textContent = "✗ Mật khẩu xác nhận không khớp";
        hint.className = "form-hint error";
        return;
      }
      hint.textContent = "✓ Mật khẩu khớp";
      hint.className = "form-hint success";
      showToast("Đổi mật khẩu thành công!");
    });
  }
}

/* ---------- Trang thông báo ---------- */
function initNotifications() {
  const pills = document.querySelectorAll(".notif-pill");
  const items = document.querySelectorAll(".notif-item");
  if (!pills.length) return;
  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      const cat = pill.dataset.cat;
      items.forEach((item) => {
        item.style.display = cat === "all" || item.dataset.cat === cat ? "flex" : "none";
      });
    });
  });
  document.querySelectorAll(".notif-close").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".notif-item");
      item.style.opacity = "0";
      setTimeout(() => item.remove(), 200);
      updateNotifBadge(-1);
    });
  });
  const markAll = document.querySelector("#markAllRead");
  if (markAll) {
    markAll.addEventListener("click", () => {
      items.forEach((i) => i.classList.remove("unread"));
      updateNotifBadge(0, true);
      showToast("Đã đánh dấu tất cả là đã đọc");
    });
  }
}
function updateNotifBadge(delta, reset = false) {
  const badge = document.querySelector(".notif-badge");
  if (!badge) return;
  let n = reset ? 0 : Math.max(0, parseInt(badge.textContent || "0") + delta);
  badge.textContent = n;
  badge.style.display = n > 0 ? "flex" : "none";
}

/* ---------- Trang lỗi 503 ---------- */
function initErrorPage() {
  const fill = document.querySelector(".progress-fill");
  const countdownEl = document.querySelector("#retrySeconds");
  const retryBtn = document.querySelector("#retryBtn");
  if (!fill) return;
  let pct = 35;
  setInterval(() => {
    pct = Math.min(99, pct + Math.random() * 4);
    fill.style.width = pct + "%";
  }, 1200);
  let seconds = 29;
  if (countdownEl) {
    setInterval(() => {
      seconds = seconds > 0 ? seconds - 1 : 29;
      countdownEl.textContent = seconds;
    }, 1000);
  }
  if (retryBtn) {
    retryBtn.addEventListener("click", () => {
      showToast("Đang thử kết nối lại...");
      setTimeout(() => (window.location.href = "index.html"), 1200);
    });
  }
}

/* ---------- Trang liên hệ ---------- */
function initContactForm() {
  const chips = document.querySelectorAll(".chip");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
    });
  });
  const form = document.querySelector("#contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Đã gửi tin nhắn! Chúng tôi sẽ phản hồi sớm.");
      form.reset();
    });
  }
}

/* ---------- Bộ lọc trang sản phẩm ---------- */
function initProductFilters() {
  const checks = document.querySelectorAll(".filter-check input");
  const sizeBoxes = document.querySelectorAll(".size-box");
  const grid = document.querySelector("#productGrid");
  if (!grid) return;

  sizeBoxes.forEach((box) => {
    box.addEventListener("click", () => box.classList.toggle("selected"));
  });

  function applyFilters() {
    const activeBrands = Array.from(checks)
      .filter((c) => c.checked)
      .map((c) => c.value.toLowerCase());
    grid.querySelectorAll(".product-card").forEach((card) => {
      const brand = (card.querySelector(".product-brand")?.textContent || "").toLowerCase();
      const match = activeBrands.length === 0 || activeBrands.some((b) => brand.includes(b));
      card.style.display = match ? "" : "none";
    });
  }
  checks.forEach((c) => c.addEventListener("change", applyFilters));
}

/* ---------- Seed dữ liệu giỏ hàng demo (chỉ lần đầu) ---------- */
function seedCartIfEmpty() {
  if (localStorage.getItem(STORE.cartKey) === null) {
    const seed = [
      { ...PRODUCTS[0], qty: 1 },
      { ...PRODUCTS[1], qty: 2 },
      { ...PRODUCTS[2], qty: 1 },
    ];
    localStorage.setItem(STORE.cartKey, JSON.stringify(seed));
  }
}

/* ---------- Init toàn cục ---------- */
document.addEventListener("DOMContentLoaded", () => {
  seedCartIfEmpty();
  updateCartBadges();
  initMobileMenu();
  initHeaderSearch();
  initHeroSlider();
  initPasswordToggles();
  initStrengthMeter();
  initLoginRegisterForms();
  initNotifications();
  initErrorPage();
  initContactForm();
  initShippingOptions();
  initCheckoutForm();
  initPayTabs();

  if (document.querySelector("#homeProductGrid")) {
    initProductGrid("#homeProductGrid", PRODUCTS.slice(0, 6));
  }
  if (document.querySelector("#productGrid")) {
    initProductGrid("#productGrid", PRODUCTS);
    initProductFilters();
  }
  renderCartPage();
  renderCheckoutSummary();

  document.querySelectorAll("[data-quick-add]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const p = PRODUCTS.find((x) => x.id === btn.dataset.quickAdd);
      if (p) addToCart(p, parseInt(document.querySelector("#pdQty")?.value || "1"));
    });
  });
});