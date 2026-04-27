const cats = [
  {
    name: "Tower & Stand Fans", icon: "&#127758;",
    products: [
      { id: 1, name: 'HanaBishi 16" Windmill 360° Red', price: 1910.00, tag: "Best Seller", img: "images/red.jpg" },
      { id: 2, name: 'Hanabishi Industrial Stand Fan HISF360', price: 2735.00, tag: "Popular", img: "images/HISF360.jpg" },
      { id: 3, name: 'Hanabishi Stand Fan The Wind TW16SF', price: 1975.00, tag: "", img: "images/THEWIND16SF-PINK.jpg" },
      { id: 4, name: "Hanabishi Baby Shield Stand Fan HBBSHLD16SF", price: 2280.00, tag: "", img: "images/viber_image.jpg" },
      { id: 5, name: 'Hanabishi Stand Fan AeroWindmill AWM16SF', price: 2105.00, tag: "Value Pick", img: "images/AeroOrange.jpg" }
    ]
  },
  {
    name: "Personal & Mini Fans", icon: "&#10024;",
    products: [
      { id: 6, name: "Jisulife Ultra2 Handheld Fan", price: 4419.28, tag: "Best Seller", img: "images/ultra2.jpg" },
      { id: 7, name: "JisuLife Handheld Fan Life9", price: 1656.34, tag: "Compact", img: "images/life9.jpg" },
      { id: 8, name: "JisuLife Handheld Fan Life10S", price: 1670.92, tag: "Trending", img: "images/life10.jpg" },
      { id: 9, name: "JisuLife Handheld Fan Pro1S (New Version) - 2025", price: 4417.94, tag: "", img: "images/pro1S.jpg" },
      { id: 10, name: "JisuLife Handheld Fan Life7", price: 1324.95, tag: "Budget", img: "images/life7.jpg" }
    ]
  },
  {
    name: "Ground Fans", icon: "&#129398;",
    products: [
      { id: 11, name: "Hanabishi Ground Fan Hurricane HHURRIC20", price: 2570.00, tag: "Essential", img: "images/HHURRIC-20.jpg" },
      { id: 12, name: "Hanabishi Ground Fan Windmill WM16GF-WM18GF", price: 1860.00, tag: "", img: "images/WINDMILL16-ORANGE.jpg" },
      { id: 13, name: "Hanabishi Ground Fan Granite Series 16", price: 2005.00, tag: "", img: "images/GS16.jpg" },
      { id: 14, name: "Hanabishi Industrial Floor Fan 10 HIFF10BLK", price: 1235.00, tag: "Popular", img: "images/HIFF-10BLK.jpg" },
      { id: 15, name: "Hanabishi Pearl White Aesthetic Floor Fan White HIFF1600WHT", price: 2080.00, tag: "Value", img: "images/HIFF-1600WHT.jpg" }
    ]
  },
  {
    name: "Smart & Desk Fans", icon: "&#128187;",
    products: [
      { id: 16, name: "Hanabishi Desk Fan The Wind 16T TW16T", price: 1590.00, tag: "Perfect to have", img: "images/WINDPINK.jpg" },
      { id: 17, name: "Hanabisihi Desk Fan Windmill 16 WM16DF", price: 1785.00, tag: "Great Value", img: "images/WINDMILL_16DF.jpg" },
      { id: 18, name: "Hanabishi High Velocity Mini Jumbo Fan HMJF7", price: 915.00, tag: "Low Budget", img: "images/HMJF-7.jpg" },
      { id: 19, name: "Hanabishi Air Circulator Fan HACF88", price: 2217.50, tag: "2217.50 OFF!!", img: "images/HACF88.jpg" },
      { id: 20, name: "Hanabishi Desk Fan Cool Fan 8T HCF801", price: 980.00, tag: "Also Low Budget", img: "images/HCF801.jpg" }
    ]
  }
];

const bsIds = [1, 2, 6, 8];
let cart = [];

function fmt(p) {
  return '₱' + p.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function toast(msg) {
  const t = document.getElementById('ff-toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

function ffPage(p) {
  document.querySelectorAll('.ff-page').forEach(x => {
    x.classList.remove('active');
    x.style.display = 'none';
  });
  const target = document.getElementById('ff-' + p);
  target.classList.add('active');
  target.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderCart() {
  const list = document.getElementById('ff-clist');
  const total = document.getElementById('ff-total');
  const cnt = document.getElementById('ff-cnt');
  const btn = document.getElementById('ff-subbtn');
  const hidden = document.getElementById('ff-hidden-order');

  list.innerHTML = '';
  let sum = 0;

  cart.forEach((item, i) => {
    sum += item.prod_price; 
    const li = document.createElement('li');
    li.className = 'ff-citem';
    li.innerHTML = '<div><div class="ff-ciname">' + esc(item.prod_name) + '</div><div class="ff-ciprice">' + fmt(item.prod_price) + '</div></div><button class="ff-rm" data-i="' + i + '">\u2715</button>';
    list.appendChild(li);
  });

  total.textContent = fmt(sum);
  cnt.textContent = cart.length;
  btn.disabled = cart.length === 0;

  const payload = cart.map(x => ({ prod_name: x.prod_name, prod_price: x.prod_price.toFixed(2) }));
  hidden.value = JSON.stringify(payload);

  list.querySelectorAll('.ff-rm').forEach(b => {
    b.addEventListener('click', function () {
      const idx = parseInt(this.getAttribute('data-i'));
      cart.splice(idx, 1);
      renderCart();
    });
  });
}

function mkCard(p) {
  const d = document.createElement('div');
  d.className = 'ff-card';
  d.innerHTML = '<div class="ff-cimg"><img src="' + p.img + '" alt="' + esc(p.name) + '" loading="lazy" /></div><div class="ff-cinfo">' + (p.tag ? '<div class="ff-ctag">' + esc(p.tag) + '</div>' : '') + '<div class="ff-cname">' + esc(p.name) + '</div><div class="ff-cprice">' + fmt(p.price) + '</div><button class="ff-add">Add to Cart</button></div>';

  d.querySelector('.ff-add').addEventListener('click', function () {
    cart.push({ prod_name: p.name, prod_price: parseFloat(p.price) });
    renderCart();
    toast('Added: ' + p.name);
    const btn = this;
    btn.textContent = '\u2713 Added!';
    btn.classList.add('added');
    setTimeout(() => { btn.textContent = 'Add to Cart'; btn.classList.remove('added'); }, 1400);
  });

  return d;
}

function init() {
  const bsg = document.getElementById('ff-bs-grid');
  const allp = document.getElementById('ff-all-prods');

  cats.forEach(cat => {
    const sec = document.createElement('div');
    sec.className = 'ff-catsec';
    sec.innerHTML = '<div class="ff-catttitle"><span>' + cat.icon + '</span> ' + esc(cat.name) + '</div>';
    const g = document.createElement('div');
    g.className = 'ff-grid';

    cat.products.forEach(p => {
      g.appendChild(mkCard(p));
      if (bsIds.includes(p.id)) bsg.appendChild(mkCard(p));
    });

    sec.appendChild(g);
    allp.appendChild(sec);
  });

  renderCart();

  const checkoutForm = document.getElementById('ff-coform');
if (checkoutForm) {
  checkoutForm.addEventListener('submit', function () {
    const payload = cart.map(x => ({ 
      prod_name: x.prod_name, 
      prod_price: Number(x.prod_price) 
    }));
    document.getElementById('ff-hidden-order').value = JSON.stringify(payload);
  });
}
}

init();