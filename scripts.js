(function(){
  const red = document.getElementById('cursor-dot');
  const inv = document.getElementById('cursor-invert');

  if (!red || !inv) return;

  let x=0, y=0, tx=0, ty=0;
  const speed=.25;

  function raf(){
    tx += (x - tx) * speed;
    ty += (y - ty) * speed;
    red.style.transform = `translate(${tx}px,${ty}px) translate(-50%,-50%)`;
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  window.addEventListener('mousemove', (e)=>{
    x = e.clientX;
    y = e.clientY;
    inv.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;
  });

  function splitLetters(el){
    if(!el || el.dataset.split==='1') return;
    const text = el.textContent;
    el.textContent = '';
    for(const ch of text){
      const s = document.createElement('span');
      s.textContent = ch;
      s.style.display = 'inline-block';
      s.style.pointerEvents = ch.trim()==='' ? 'none' : 'auto';
      el.appendChild(s);
    }
    el.dataset.split = '1';
  }

  const first = document.querySelector('.first');
  const last  = document.querySelector('.last');
  splitLetters(first);
  splitLetters(last);

  function wire(el){
    if(!el) return;
    el.querySelectorAll('span').forEach(span=>{
      if(span.textContent.trim()==='') return;
      span.addEventListener('mouseenter', ()=>{
        inv.style.opacity = '1';
        red.style.opacity = '0';
      });
    });
    el.addEventListener('mouseleave', ()=>{
      inv.style.opacity = '0';
      red.style.opacity = '1';
    });
  }

  wire(first);
  wire(last);
})();

(function(){
  const cards = document.querySelectorAll('.card');
  cards.forEach(card=>{
    let rafId = 0, mx = 0, my = 0, tmx = 0, tmy = 0;
    const ease = 0.22;

    function loop(){
      tmx += (mx - tmx) * ease;
      tmy += (my - tmy) * ease;
      card.style.setProperty('--mx', `${tmx}px`);
      card.style.setProperty('--my', `${tmy}px`);
      rafId = requestAnimationFrame(loop);
    }

    card.addEventListener('mouseenter', e=>{
      const r = card.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
      if(!rafId) rafId = requestAnimationFrame(loop);
    });

    card.addEventListener('mousemove', e=>{
      const r = card.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    });

    card.addEventListener('mouseleave', ()=>{
      cancelAnimationFrame(rafId);
      rafId = 0;
      card.style.setProperty('--mx', `50%`);
      card.style.setProperty('--my', `0%`);
    });
  });
})();

(function(){
  const g = document.querySelector('.glide');
  if(!g) return;
  const text = g.getAttribute('data-text') || '';
  const ul = document.createElement('ul');
  ul.className = 'code';
  for (const ch of text.split('')) {
    const li = document.createElement('li');
    li.className = 'digit';
    li.tabIndex = 0;
    const sp = document.createElement('span');
    sp.textContent = ch;
    li.appendChild(sp);
    ul.appendChild(li);
  }
  g.textContent = '';
  g.appendChild(ul);
})();
