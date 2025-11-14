(async function(){
  const RAW = '/bookmarks.json';
  async function load() {
    try {
      const r = await fetch(RAW, {cache: "no-cache"});
      if(!r.ok) throw new Error('fetch failed');
      const json = await r.json();
      render(json);
    } catch (e) {
      console.warn('无法加载 bookmarks.json，使用内置示例', e);
      // fallback to embedded sample
      const sample = {
        "sections":[
          {"id":"internal","title":"内网常用","items":[{"title":"百度","url":"https://www.baidu.com","icon":"https://www.baidu.com/favicon.ico"},{"title":"B站","url":"https://www.bilibili.com","icon":"https://www.bilibili.com/favicon.ico"}]},
          {"id":"external","title":"外网常用","items":[{"title":"YouTube","url":"https://www.youtube.com","icon":"https://www.google.com/s2/favicons?domain=youtube.com"},{"title":"Twitter","url":"https://twitter.com","icon":"https://www.google.com/s2/favicons?domain=twitter.com"}]}
        ]
      };
      render(sample);
    }
  }

  function render(data){
    const sections = data.sections || [];
    const nav = document.getElementById('sections');
    const grid = document.getElementById('grid');
    const titleLabel = document.getElementById('current-section-title');
    const searchInput = document.getElementById('search');

    nav.innerHTML = ''; grid.innerHTML = '';
    sections.forEach((sec, idx)=>{
      const btn = document.createElement('button');
      btn.textContent = sec.title;
      btn.onclick = ()=> {
        document.querySelectorAll('#sections button').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        showSection(sec);
      };
      if(idx===0) btn.classList.add('active');
      nav.appendChild(btn);
    });

    if(sections[0]) showSection(sections[0]);

    function showSection(sec){
      titleLabel.textContent = sec.title;
      grid.innerHTML = '';
      sec.items.forEach(it=>{
        const card = document.createElement('article');
        card.className='card';
        const a = document.createElement('a');
        a.href = it.url; a.target='_blank'; a.rel='noopener';
        const fav = document.createElement('div'); fav.className='favicon';
        const img = document.createElement('img');
        img.src = it.icon || ('https://www.google.com/s2/favicons?domain='+new URL(it.url).hostname);
        img.onerror = ()=>{ img.src = 'data:image/svg+xml;charset=utf-8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2248%22 height=%2248%22><rect width=%2248%22 height=%2248%22 fill=%22%230b1220%22/></svg>' };
        fav.appendChild(img);
        const meta = document.createElement('div'); meta.className='meta';
        const h = document.createElement('h3'); h.textContent = it.title;
        const p = document.createElement('p'); p.textContent = it.url;
        meta.appendChild(h); meta.appendChild(p);
        a.appendChild(fav); a.appendChild(meta);
        card.appendChild(a);
        grid.appendChild(card);
      });
      adjustCols();
      // search hook
      searchInput.oninput = ()=> applyFilter(searchInput.value);
    }

    function applyFilter(q){
      q = (q||'').toLowerCase().trim();
      const cards = grid.querySelectorAll('.card');
      cards.forEach(c=>{
        const txt = c.innerText.toLowerCase();
        c.style.display = txt.includes(q) ? '' : 'none';
      });
    }
  }

  function adjustCols(){
    const grid = document.getElementById('grid');
    const w = document.documentElement.clientWidth;
    let cols = 3;
    if(w>=1600) cols = 5;
    else if(w>=1200) cols = 4;
    else cols = 3;
    grid.classList.remove('cols-3','cols-4','cols-5');
    grid.classList.add('cols-'+cols);
  }

  window.addEventListener('resize', ()=>{ clearTimeout(window._resize_to); window._resize_to = setTimeout(adjustCols,120); });
  await load();
})();
