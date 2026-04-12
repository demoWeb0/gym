/* ── GLOBAL CONFIG ── */
window.GYM_CONFIG = {
  gymName: 'Octane Fitness Prime Gym',
  phoneNumber: '919915685409',
  whatsappNumber: '919915685409',
  currency: '₹'
};

/* ── 1. LOADER ── */
(() => {
  const loader = document.getElementById('loader');
  if (!loader) return;
  document.body.style.overflow = 'hidden';
  const hideLoader = () => { loader.classList.add('hidden'); document.body.style.overflow = ''; };
  const maxTimer = setTimeout(hideLoader, 2500);
  window.addEventListener('load', () => { clearTimeout(maxTimer); setTimeout(hideLoader, 800); });
})();

/* ── 2. MOBILE NAVIGATION ── */
(() => {
  const hbg = document.getElementById('hbg');
  const mobNav = document.getElementById('mobNav');
  const mobOverlay = document.getElementById('mobOverlay');
  const closeBtn = document.getElementById('closeMobBtn');
  const navLinks = document.querySelectorAll('.mob-lnk, #closeMobBtn');

  const openMob = () => {
    hbg.classList.add('open');
    mobNav.classList.add('open');
    mobOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  };
  const closeMob = () => {
    hbg.classList.remove('open');
    mobNav.classList.remove('open');
    mobOverlay.classList.remove('show');
    document.body.style.overflow = '';
  };

  if (hbg) hbg.addEventListener('click', () => hbg.classList.contains('open') ? closeMob() : openMob());
  if (mobOverlay) mobOverlay.addEventListener('click', closeMob);
  if (closeBtn) closeBtn.addEventListener('click', closeMob);
  navLinks.forEach(lnk => lnk.addEventListener('click', closeMob));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMob(); });
})();

/* ── 3. HERO TYPING EFFECT ── */
(() => {
  const textWhite = 'SWEAT TODAY, ';
  const textRed = 'SHINE TOMORROW';
  let iW = 0, iR = 0;

  const typeRed = () => {
    const el = document.getElementById('typed-red');
    if (el && iR < textRed.length) { el.innerHTML += textRed.charAt(iR++); setTimeout(typeRed, 70); }
  };
  const typeWhite = () => {
    const el = document.getElementById('typed-white');
    if (el && iW < textWhite.length) { el.innerHTML += textWhite.charAt(iW++); setTimeout(typeWhite, 90); }
    else setTimeout(typeRed, 200);
  };
  setTimeout(typeWhite, 900);
})();

/* ── 5. TRAINERS SLIDER ── */
(() => {
  const track = document.getElementById("coachTrack");
  if (!track) return;
  const cards = document.querySelectorAll(".coachCard");
  const next = document.getElementById("nextCoach");
  const prev = document.getElementById("prevCoach");
  let auto = true, index = 0;

  const visibleCards = () => window.innerWidth < 600 ? 1 : window.innerWidth < 900 ? 2 : 3;
  const setCardWidth = () => {
    let show = visibleCards();
    cards.forEach(c => c.style.flex = `0 0 ${100 / show}%`);
    slide();
  };

  const slide = () => {
    const cardWidth = cards[0].offsetWidth;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  };

  setCardWidth();
  window.addEventListener("resize", setCardWidth);

  const autoSlide = () => {
    if (!auto) return;
    index++;
    if (index > cards.length - visibleCards()) index = 0;
    slide();
  };
  let interval = setInterval(autoSlide, 3000);

  if (next) next.onclick = () => { auto = false; clearInterval(interval); index++; if (index > cards.length - visibleCards()) index = 0; slide(); };
  if (prev) prev.onclick = () => { auto = false; clearInterval(interval); index--; if (index < 0) index = cards.length - visibleCards(); slide(); };
})();

/* ── 6. TESTIMONIALS SLIDER ── */
(() => {
  const track = document.getElementById("octane-track");
  if (!track) return;
  const slides = document.querySelectorAll("#octane-track .octane-slide");
  const next = document.getElementById("octane-next-btn");
  const prev = document.getElementById("octane-prev-btn");
  const section = document.getElementById("octane-testimonial-section");
  let index = 0, auto = true;

  const update = () => {
    slides.forEach(s => { s.style.opacity = ".5"; s.style.transform = "scale(.9)"; });
    if (slides[index]) {
      slides[index].style.opacity = "1";
      slides[index].style.transform = "scale(1.05)";
      track.style.transform = `translateX(-${index * 380}px)`;
    }
  };

  const nextSlide = () => { index++; if (index >= slides.length) index = 0; update(); };
  const prevSlide = () => { index--; if (index < 0) index = slides.length - 1; update(); };

  setInterval(() => { if (auto) nextSlide(); }, 3000);
  if (next) next.onclick = () => { auto = false; nextSlide(); };
  if (prev) prev.onclick = () => { auto = false; prevSlide(); };
  if (section) section.addEventListener("mouseleave", () => auto = true);
  update();
})();

/* ── 7. BILLING TOGGLE & WHATSAPP BUY ── */
(() => {
  const toggle = document.getElementById('togSw');
  const lblM = document.getElementById('lblM');
  const lblA = document.getElementById('lblA');
  let isAnnual = false;
  const prices = { monthly: [249, 499, 999], annual: [199, 399, 799] };

  if (toggle) {
    toggle.addEventListener('click', () => {
      isAnnual = !isAnnual;
      toggle.classList.toggle('on', isAnnual);
      lblM.classList.toggle('active', !isAnnual);
      lblA.classList.toggle('active', isAnnual);
      const set = isAnnual ? prices.annual : prices.monthly;
      ['ps', 'pe', 'pl'].forEach((id, i) => {
        const el = document.getElementById(id);
        if (el) el.textContent = set[i];
      });
    });
  }

  document.querySelectorAll('.btn-whatsapp-buy').forEach(btn => {
    btn.addEventListener('click', () => {
      const planName = btn.getAttribute('data-plan');
      const priceId = btn.getAttribute('data-priceid');
      const price = document.getElementById(priceId).textContent;
      const cycle = isAnnual ? 'Annual' : 'Monthly';
      const cfg = window.GYM_CONFIG;
      const msg = `Hi ${cfg.gymName},\nI am interested in joining the *${planName}* plan.\nBilling: *${cycle}*\nPrice: *${cfg.currency}${price}*\nPlease share the next steps! 💪`;
      window.open(`https://wa.me/${cfg.phoneNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    });
  });
})();

/* ── 8. BMI CALCULATOR LOGIC (Enhanced) ── */
(() => {
  const btn = document.getElementById('calcBmiBtn');
  if (!btn) return;

  /* BMI category config: label, color, tip, gauge % ceiling */
  const BMI_CATS = [
    { max: 18.5, label: 'Underweight', color: '#3498db', gauge: 25, tip: 'Your BMI is below the healthy range. A strength-training program combined with a calorie-surplus nutrition plan can help you build lean mass safely.' },
    { max: 25.0, label: 'Normal Weight', color: '#2ecc71', gauge: 55, tip: 'Great — your BMI sits in the healthy range! Maintain it with consistent exercise, balanced macros, and adequate recovery.' },
    { max: 30.0, label: 'Overweight', color: '#f1c40f', gauge: 75, tip: 'A moderate caloric deficit paired with 4–5 cardio + resistance sessions per week can bring you back into the healthy range within a few months.' },
    { max: Infinity, label: 'Obese', color: '#e74c3c', gauge: 95, tip: 'We strongly recommend booking a one-on-one consultation with one of our certified coaches to build a safe, personalised program for you.' }
  ];

  /* Highlight the matching row in the reference table */
  const highlightRow = (label) => {
    document.querySelectorAll('.bmi-range-row').forEach(row => {
      row.classList.toggle('highlight', row.dataset.cat === label);
    });
  };

  btn.addEventListener('click', () => {
    const height = parseFloat(document.getElementById('bmiHeight').value);
    const weight = parseFloat(document.getElementById('bmiWeight').value);
    const unitEl = document.getElementById('bmiUnit');
    const unit = unitEl ? unitEl.value : 'metric';
    const errBox = document.getElementById('bmiError');
    const resBox = document.getElementById('bmiResultBox');

    errBox.style.display = 'none';
    resBox.style.display = 'none';

    if (!height || !weight || height <= 0 || weight <= 0) {
      errBox.textContent = 'Please enter valid numbers for height and weight.';
      errBox.style.display = 'block';
      return;
    }

    let bmi;
    if (unit === 'imperial') {
      /* height in inches, weight in lbs */
      bmi = ((weight / (height * height)) * 703).toFixed(1);
    } else {
      const hm = height / 100;
      bmi = (weight / (hm * hm)).toFixed(1);
    }

    const cat = BMI_CATS.find(c => bmi < c.max);

    /* Update UI */
    document.getElementById('bmiValueOut').textContent = bmi;
    const catOut = document.getElementById('bmiCategoryOut');
    catOut.textContent = cat.label;
    catOut.style.color = cat.color;

    /* Animated gauge */
    const fill = document.getElementById('bmiGaugeFill');
    if (fill) {
      fill.style.width = '0%';
      fill.style.background = cat.color;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { fill.style.width = cat.gauge + '%'; });
      });
    }

    /* Tip card */
    const tipEl = document.getElementById('bmiTip');
    if (tipEl) {
      tipEl.textContent = cat.tip;
      tipEl.style.borderLeftColor = cat.color;
    }

    highlightRow(cat.label);

    resBox.classList.remove('bmi-result-pop');
    void resBox.offsetWidth; /* force reflow */
    resBox.classList.add('bmi-result-pop');
    resBox.style.display = 'block';
  });

  /* Unit toggle swaps placeholder labels */
  const unitEl = document.getElementById('bmiUnit');
  if (unitEl) {
    unitEl.addEventListener('change', () => {
      const isImp = unitEl.value === 'imperial';
      const hInput = document.getElementById('bmiHeight');
      const wInput = document.getElementById('bmiWeight');
      const hLabel = document.getElementById('bmiHeightLabel');
      const wLabel = document.getElementById('bmiWeightLabel');
      if (hInput) hInput.placeholder = isImp ? 'e.g. 69 (inches)' : 'e.g. 175 (cm)';
      if (wInput) wInput.placeholder = isImp ? 'e.g. 155 (lbs)' : 'e.g. 70 (kg)';
      if (hLabel) hLabel.textContent = isImp ? 'Height (in)' : 'Height (cm)';
      if (wLabel) wLabel.textContent = isImp ? 'Weight (lbs)' : 'Weight (kg)';
    });
  }
})();

/* ── 9. CONTACT FORM ── */
(() => {
  const btn = document.getElementById('fSubmit');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const getVal = (id) => document.getElementById(id) ? document.getElementById(id).value.trim() : '';
    const fname = getVal('fname'), lname = getVal('lname'), email = getVal('email'), msg = getVal('msg');

    if (!fname || !lname || !email) {
      alert('Please enter your name and email.');
      return;
    }

    const cfg = window.GYM_CONFIG;
    const waMsg = `📩 *New Enquiry — ${cfg.gymName}*\n\n*Name:* ${fname} ${lname}\n*Email:* ${email}\n*Message:*\n${msg || 'No message'}`;
    window.open(`https://wa.me/${cfg.phoneNumber}?text=${encodeURIComponent(waMsg)}`, '_blank');

    btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
    setTimeout(() => btn.innerHTML = '<i class="fas fa-paper-plane"></i>&nbsp; Send Message', 3000);
  });
})();

/* ── 10. GALLERY LIGHTBOX ── */
(() => {
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbClose = document.getElementById('lbClose');
  if (!lb || !lbImg) return;

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.dataset.src || item.querySelector('img')?.src;
      if (!src) return;
      lbImg.src = src;
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  const closeLb = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
  if (lbClose) lbClose.addEventListener('click', closeLb);
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
})();

/* ── 11. GLOBAL UI (Scroll Effects) ── */
document.addEventListener('DOMContentLoaded', () => {
  /* Intersection Observer reveals */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const revObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revObs.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(el => revObs.observe(el));
  }

  /* Scroll Progress & Navbar scrolled state */
  const sprogress = document.getElementById('sprogress');
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (sprogress) sprogress.style.width = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100) + '%';
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  /* Active nav links via IntersectionObserver */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-a');
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-a[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(s => navObserver.observe(s));
});

/* ---- BMI Calculator ---- */
const metricBtn   = document.getElementById('metricBtn');
const imperialBtn = document.getElementById('imperialBtn');
const weightInput = document.getElementById('weight');
const heightInput = document.getElementById('height');
const weightUnit  = document.getElementById('weightUnit');
const heightUnit  = document.getElementById('heightUnit');
const calcBtn     = document.getElementById('calcBmi');
const bmiResult   = document.getElementById('bmiResult');
const bmiValueEl  = document.getElementById('bmiValue');
const bmiCatEl    = document.getElementById('bmiCategory');
const bmiMsgEl    = document.getElementById('bmiMessage');
const ringFill    = document.getElementById('ringFill');
const scalePtr    = document.getElementById('scalePointer');

let isMetric = true;

function switchUnit(unit) {
  isMetric = (unit === 'metric');
  metricBtn.classList.toggle('active', isMetric);
  imperialBtn.classList.toggle('active', !isMetric);
  weightUnit.textContent = isMetric ? 'kg'  : 'lb';
  heightUnit.textContent = isMetric ? 'cm'  : 'in';
  weightInput.placeholder = isMetric ? 'e.g. 70'  : 'e.g. 154';
  heightInput.placeholder = isMetric ? 'e.g. 175' : 'e.g. 69';
  weightInput.value = '';
  heightInput.value = '';
  bmiResult.style.display = 'none';
}

metricBtn.addEventListener('click',   () => switchUnit('metric'));
imperialBtn.addEventListener('click', () => switchUnit('imperial'));

calcBtn.addEventListener('click', () => {
  const weight = parseFloat(weightInput.value);
  const height = parseFloat(heightInput.value);
  const age    = parseInt(document.getElementById('age').value) || 0;

  if (!weight || !height || weight <= 0 || height <= 0) {
    shakeFeedback(calcBtn);
    return;
  }

  let bmi;
  if (isMetric) {
    const hM = height / 100;
    bmi = weight / (hM * hM);
  } else {
    bmi = (703 * weight) / (height * height);
  }

  bmi = Math.round(bmi * 10) / 10;

  // Category
  let cat, msg, color, ringPercent, ptrLeft;

  if (bmi < 18.5) {
    cat = 'Underweight';
    msg = 'Consider a calorie-surplus diet and a structured strength program to build healthy muscle mass.';
    color = '#3b82f6';
    ringPercent = 0.25;
    ptrLeft = '12.5%';
  } else if (bmi < 25) {
    cat = 'Normal Weight';
    msg = 'Great job! Maintain your weight with balanced nutrition and regular exercise to stay in this healthy range.';
    color = '#22c55e';
    ringPercent = 0.55;
    ptrLeft = '37.5%';
  } else if (bmi < 30) {
    cat = 'Overweight';
    msg = 'A mix of cardio and strength training combined with a calorie-controlled diet will help you reach a healthy BMI.';
    color = '#f59e0b';
    ringPercent = 0.75;
    ptrLeft = '62.5%';
  } else {
    cat = 'Obese';
    msg = 'We strongly recommend speaking with one of our certified trainers to create a safe, sustainable weight-loss plan.';
    color = '#ef4444';
    ringPercent = 0.92;
    ptrLeft = '87.5%';
  }

  // Render result
  bmiResult.style.display = 'flex';
  bmiValueEl.textContent  = bmi;
  bmiCatEl.textContent    = cat;
  bmiMsgEl.textContent    = msg;
  bmiCatEl.style.color    = color;
  ringFill.style.stroke   = color;

  // Animate ring: circumference = 2πr = ~314
  const offset = 314 - (314 * ringPercent);
  setTimeout(() => {
    ringFill.style.strokeDashoffset = offset;
  }, 50);

  // Move scale pointer
  scalePtr.style.setProperty('--ptr', ptrLeft);
  scalePtr.querySelector ? null : null; // noop
  const after = scalePtr;
  after.style.setProperty('--left', ptrLeft);
  // Use a CSS trick via inline style on the pseudo element's parent
  scalePtr.setAttribute('data-left', ptrLeft);
  updatePointer(ptrLeft);

  // Smooth scroll to result
  bmiResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

function updatePointer(left) {
  // Inject a dynamic style so the ::after pseudo-element moves
  let styleTag = document.getElementById('dynamic-ptr-style');
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = 'dynamic-ptr-style';
    document.head.appendChild(styleTag);
  }
  styleTag.textContent = `.scale-pointer::after { left: ${left} !important; }`;
}

function shakeFeedback(el) {
  el.style.animation = 'none';
  el.offsetHeight; // reflow
  el.classList.add('shake');
  setTimeout(() => el.classList.remove('shake'), 500);

  // Highlight empty fields
  [weightInput, heightInput].forEach(inp => {
    if (!inp.value) {
      inp.parentElement.style.borderColor = '#ef4444';
      setTimeout(() => inp.parentElement.style.borderColor = '', 1500);
    }
  });
}