/* ARAL R9 preview: shared navigation and original logo with a tight transparent SVG viewport. */
(()=>{'use strict';
 const script=document.currentScript;
 const ROOT=new URL(script?.dataset.feedbackRoot||'./',document.baseURI);
 const to=p=>new URL(p,ROOT).href;
 const routes={
  home:to('design/hero/prototypes/hero-4s-k-views/ARAL_home_employer_feedback_r12_preview.html'),
  company:to('index-employer-feedback-r12-preview.html#company'),
  products:to('pages/products-employer-feedback-r12-preview.html#/catalog'),
  drivers:to('pages/drivers-employer-feedback-r12-preview.html'),
  partners:to('pages/partners-employer-feedback-r12-preview.html'),
  advantages:to('pages/advantages-employer-feedback-r12-preview.html'),
  interesting:to('index-employer-feedback-r12-preview.html#interesting'),
  contacts:to('pages/contacts-employer-feedback-r12-preview.html#contacts-stores')
 };
 const linkMapping=[
 ['index-employer-feedback-r11-preview.html',to('index-employer-feedback-r12-preview.html')],
 ['pages/products-employer-feedback-r11-preview.html',to('pages/products-employer-feedback-r12-preview.html')],
 ['pages/partners-employer-feedback-r11-preview.html',to('pages/partners-employer-feedback-r12-preview.html')],
 ['pages/contacts-employer-feedback-r11-preview.html',to('pages/contacts-employer-feedback-r12-preview.html')],
 ['pages/drivers-employer-feedback-r11-preview.html',to('pages/drivers-employer-feedback-r12-preview.html')],
 ['pages/advantages-employer-feedback-r11-preview.html',to('pages/advantages-employer-feedback-r12-preview.html')],

 ['index-employer-feedback-r10-preview.html',to('index-employer-feedback-r12-preview.html')],
 ['pages/products-employer-feedback-r10-preview.html',to('pages/products-employer-feedback-r12-preview.html')],
 ['pages/partners-employer-feedback-r10-preview.html',to('pages/partners-employer-feedback-r12-preview.html')],
 ['pages/contacts-employer-feedback-r10-preview.html',to('pages/contacts-employer-feedback-r12-preview.html')],
 ['pages/drivers-employer-feedback-r10-preview.html',to('pages/drivers-employer-feedback-r12-preview.html')],
 ['pages/advantages-employer-feedback-r10-preview.html',to('pages/advantages-employer-feedback-r12-preview.html')],

 ['index-employer-feedback-r9-preview.html',to('index-employer-feedback-r12-preview.html')],
 ['pages/products-employer-feedback-r9-preview.html',to('pages/products-employer-feedback-r12-preview.html')],
 ['pages/partners-employer-feedback-r9-preview.html',to('pages/partners-employer-feedback-r12-preview.html')],
 ['pages/contacts-employer-feedback-r9-preview.html',to('pages/contacts-employer-feedback-r12-preview.html')],
 ['pages/drivers-employer-feedback-r9-preview.html',to('pages/drivers-employer-feedback-r12-preview.html')],
 ['pages/advantages-employer-feedback-r9-preview.html',to('pages/advantages-employer-feedback-r12-preview.html')],

 ['index-employer-feedback-r8-preview.html',to('index-employer-feedback-r12-preview.html')],
 ['pages/products-employer-feedback-r8-preview.html',to('pages/products-employer-feedback-r12-preview.html')],
 ['pages/contacts-employer-feedback-r8-preview.html',to('pages/contacts-employer-feedback-r12-preview.html')],
 ['pages/partners-employer-feedback-r8-preview.html',to('pages/partners-employer-feedback-r12-preview.html')],
 ['pages/drivers-employer-feedback-r8-preview.html',to('pages/drivers-employer-feedback-r12-preview.html')],
 ['pages/advantages-employer-feedback-r8-preview.html',to('pages/advantages-employer-feedback-r12-preview.html')],
 ['index-employer-feedback-r5-preview.html',to('index-employer-feedback-r12-preview.html')],
 ['pages/products-employer-feedback-r5-preview.html',to('pages/products-employer-feedback-r12-preview.html')],
 ['pages/contacts-employer-feedback-r5-preview.html',to('pages/contacts-employer-feedback-r12-preview.html')],
 ['pages/drivers-employer-feedback-r5-preview.html',to('pages/drivers-employer-feedback-r12-preview.html')],
 ['pages/partners-employer-feedback-r5-preview.html',to('pages/partners-employer-feedback-r12-preview.html')],
 ['pages/advantages-employer-feedback-r5-preview.html',to('pages/advantages-employer-feedback-r12-preview.html')],
 ['index-employer-feedback-r4-preview.html',to('index-employer-feedback-r12-preview.html')],
 ['pages/products-employer-feedback-r4-preview.html',to('pages/products-employer-feedback-r12-preview.html')],
 ['pages/contacts-employer-feedback-r4-preview.html',to('pages/contacts-employer-feedback-r12-preview.html')],
 ['pages/drivers-employer-feedback-r4-preview.html',to('pages/drivers-employer-feedback-r12-preview.html')],
 ['pages/partners-employer-feedback-r4-preview.html',to('pages/partners-employer-feedback-r12-preview.html')],
 ['pages/advantages-employer-feedback-r4-preview.html',to('pages/advantages-employer-feedback-r12-preview.html')],
 ['index-employer-feedback-r3-preview.html',to('index-employer-feedback-r12-preview.html')],
 ['pages/products-employer-feedback-r3-preview.html',to('pages/products-employer-feedback-r12-preview.html')],
 ['pages/contacts-employer-feedback-r3-preview.html',to('pages/contacts-employer-feedback-r12-preview.html')],
 ['pages/drivers-employer-feedback-r3-preview.html',to('pages/drivers-employer-feedback-r12-preview.html')],
 ['pages/partners-employer-feedback-r3-preview.html',to('pages/partners-employer-feedback-r12-preview.html')],
 ['pages/advantages-employer-feedback-r3-preview.html',to('pages/advantages-employer-feedback-r12-preview.html')],
 ['index-employer-feedback-r1-preview.html',to('index-employer-feedback-r12-preview.html')],
 ['pages/products-employer-feedback-r1-preview.html',to('pages/products-employer-feedback-r12-preview.html')],
 ['pages/drivers-employer-feedback-r1-preview.html',to('pages/drivers-employer-feedback-r12-preview.html')],
 ['pages/partners-employer-feedback-r1-preview.html',to('pages/partners-employer-feedback-r12-preview.html')],
 ['pages/advantages-employer-feedback-r1-preview.html',to('pages/advantages-employer-feedback-r12-preview.html')],
 ['pages/contacts-employer-feedback-r1-preview.html',to('pages/contacts-employer-feedback-r12-preview.html')],
 ['design/hero/prototypes/hero-4s-k-views/ARAL_home_contour_2A_footer_preview.html',routes.home],
 ['design/hero/prototypes/hero-4s-k-views/ARAL_home_markup_preview.html',routes.home],
 ['index-footer-preview.html',routes.company],
 ['index-markup-preview.html',routes.company],
 ['pages/products-r15-contour-2A-footer-preview.html',routes.products],
 ['pages/products-r15-markup-preview.html',routes.products],
 ['pages/drivers-08-footer-preview.html',routes.drivers],
 ['pages/drivers-08-markup-preview.html',routes.drivers],
 ['pages/partners-11-footer-preview.html',routes.partners],
 ['pages/partners-11-markup-preview.html',routes.partners],
 ['pages/advantages-04-footer-preview.html',routes.advantages],
 ['pages/advantages-04-markup-preview.html',routes.advantages],
 ['pages/contacts-03-footer-preview.html',routes.contacts],
 ['pages/contacts-03-markup-preview.html',routes.contacts],
 ];
 const menu=[
  ['Продукция',routes.products,'products'],
  ['О бренде',routes.company,'company'],
  ['Где купить',routes.contacts,'contacts'],
  ['Сотрудничество',routes.partners,'partners'],
  ['Преимущества ARAL',routes.advantages,'advantages'],
  ['Для водителей',routes.drivers,'drivers'],
  ['Интересное',routes.interesting,'interesting']
 ];
 function rewriteInternalLinks(){
  const rootPath=ROOT.pathname;
  document.querySelectorAll('a[href]').forEach(a=>{
   const raw=a.getAttribute('href');
   if(!raw||raw.startsWith('#')||/^(?:mailto:|tel:|javascript:)/i.test(raw))return;
   let old;try{old=new URL(raw,document.baseURI)}catch{return}
   if(old.origin!==ROOT.origin||!old.pathname.startsWith(rootPath))return;
   for(const [from,target] of linkMapping){
    if(old.pathname.endsWith('/'+from)){
     const u=new URL(target);
     if(old.hash)u.hash=old.hash;
     a.href=u.href;return;
    }
   }
  });
 }
 function installHeader(){
  const headers=[...document.querySelectorAll('header.home-nav,header.site-header,header.nav')];
  headers.forEach(header=>{
   const row=header.querySelector('.home-nav-inner,.nav-row,.nav-wrap');
   header.classList.add('aral-header-shell');
   row?.classList.add('aral-header-row');
   let brand=header.querySelector('.home-brand,.brand');
   if(brand && !(brand instanceof HTMLAnchorElement)){
    const link=document.createElement('a');
    link.className=brand.className;
    brand.replaceWith(link);
    brand=link;
   }
   if(brand){
    brand.href=routes.home;brand.setAttribute('aria-label','ARAL — на главную');
    brand.classList.add('aral-preview-brand');
    brand.innerHTML='<img src="'+to('assets/aral-logo-header-r9.svg')+'" alt="Логотип ARAL" width="64" height="64" decoding="async">';
    const toggle=header.querySelector('.home-menu-toggle,.nav-toggle,.mobile-toggle');
    if(toggle)brand.after(toggle);
   }
   const nav=header.querySelector('nav.home-menu,nav.navlinks,nav.menu');
   if(!nav)return;
   const current=header.closest('[data-route]')?.dataset.route
     ?? (header.classList.contains('site-header')?'products':null);
   nav.setAttribute('aria-label','Основные разделы ARAL');
   nav.classList.add('aral-jelly-menu');
   nav.innerHTML=menu.map(([name,url,key])=>'<a class="aral-jelly-chip" data-aral-nav="'+key+'" href="'+url+'"'+(current===key?' aria-current="page"':'')+'><span>'+name+'</span></a>').join('');
   const links=[...nav.querySelectorAll('a')];
   links.forEach((a,i)=>{
    a.addEventListener('keydown',e=>{
     let next=null;
     if(e.key==='ArrowRight'||e.key==='ArrowDown')next=(i+1)%links.length;
     if(e.key==='ArrowLeft'||e.key==='ArrowUp')next=(i+links.length-1)%links.length;
     if(e.key==='Home')next=0;if(e.key==='End')next=links.length-1;
     if(next!==null){e.preventDefault();links[next].focus()}
    });
   });
  });
 }
 function installHeaderActions(){
  const compareUrl=new URL(routes.products);compareUrl.hash='/compare';
  document.querySelectorAll('header.home-nav,header.site-header,header.nav').forEach(header=>{
   let tools=header.querySelector('.home-nav-tools,.navtools');
   if(!tools){tools=document.createElement('div');tools.className='aral-header-actions';header.querySelector('.home-nav-inner,.nav-row,.nav-wrap').appendChild(tools)}
   tools.classList.add('aral-header-actions');
   tools.querySelector('.home-catalog-cta,.primary-link')?.remove();
   let compare=tools.querySelector('.home-compare-link,#headerCompare');
   if(!compare){compare=document.createElement('a');compare.innerHTML='Сравнение <span class="aral-header-count">0</span>';tools.appendChild(compare)}
   compare.href=compareUrl.href;compare.classList.add('aral-header-control','aral-header-compare');compare.dataset.magnetic='header-compare';
   compare.querySelector('em,span')?.classList.add('aral-header-count');
  });
  const syncCounts=()=>{
   let count=0;try{const values=JSON.parse(localStorage.getItem('aralProductsV13Compare')||'[]');if(Array.isArray(values))count=values.filter(v=>typeof v==='string').slice(0,4).length}catch{}
   document.querySelectorAll('.aral-header-count').forEach(el=>{
    el.textContent=String(count);
    el.hidden=count===0;
   });
  };
  syncCounts();window.addEventListener('focus',syncCounts);window.addEventListener('storage',e=>{if(e.key==='aralProductsV13Compare')syncCounts()});
 }
 function hideCoolantPublicReferences(){
  const obsolete=/Silikatfrei\s*G12|охлаждающ(?:ие|ая|их)\s+жидкост(?:и|ь|ей)|антифриз/iu;
  document.querySelectorAll('.mini,.part-benefit').forEach(el=>{
   if(obsolete.test(el.textContent||'')){
    if(el.classList.contains('mini'))el.remove();
    else{
     const p=el.querySelector('p');
     if(p) p.textContent='В каталоге представлены масла для легковых автомобилей и грузового транспорта. Ассортимент можно отфильтровать по типу транспорта и техническим характеристикам.';
    }
   }
  });
  document.querySelectorAll('p').forEach(p=>{
    if(/Для Aral Silikatfrei G12/.test(p.textContent||''))p.remove();
  });
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  const textNodes=[];while(walker.nextNode())textNodes.push(walker.currentNode);
  for(const t of textNodes){
   if(!t.parentElement||['SCRIPT','STYLE','NOSCRIPT'].includes(t.parentElement.tagName))continue;
   const old=t.nodeValue||'';
   const next=old
    .replace(/(?:,\s*)?и технические жидкости/giu,'')
    .replace(/,\s*охлаждающие жидкости/giu,'')
    .replace(/и одну охлаждающую жидкость/giu,'')
    .replace(/17 продуктов для формирования закупочного перечня/giu,'16 моторных масел для формирования закупочного перечня');
   if(next!==old)t.nodeValue=next;
  }
 }
 function makeRouteInspection(){
  const btn=document.createElement('button');
  btn.className='aral-review-toggle';btn.type='button';btn.textContent='Показать пути к скрытым разделам';btn.setAttribute('aria-pressed','false');
  document.body.appendChild(btn);
  function mark(){
   let n=0;
   document.querySelectorAll('main a[href],.aral-global-footer a[href]').forEach(a=>{
    if(a.classList.contains('aral-review-toggle'))return;
    let u;try{u=new URL(a.href)}catch{return}
    let category=u.pathname.includes('drivers-employer-feedback-')?'ДЛЯ ВОДИТЕЛЕЙ':u.hash==='#interesting'?'ИНТЕРЕСНОЕ':null;
    if(!category)return;
    n++;a.classList.add('aral-review-route');a.dataset.aralReviewTip=category+' · '+n;
   });
   return n;
  }
  mark();
  function update(on){
   document.body.classList.toggle('aral-review-links-on',on);
   btn.setAttribute('aria-pressed',String(on));
   btn.textContent=on?'Скрыть подсветку переходов':'Показать пути к скрытым разделам';
  }
  btn.addEventListener('click',()=>update(!document.body.classList.contains('aral-review-links-on')));
  update(new URLSearchParams(location.search).get('review')==='links');
 }
 function installContactAndMenu(){

  for(const button of document.querySelectorAll('.home-menu-toggle,.nav-toggle,.mobile-toggle')){
   button.classList.add('aral-menu-toggle');
   button.innerHTML='<span class="aral-menu-label">Меню</span>';
   const label=()=>button.setAttribute('aria-label',button.getAttribute('aria-expanded')==='true'?'Закрыть меню':'Открыть меню');
   label();new MutationObserver(label).observe(button,{attributes:true,attributeFilter:['aria-expanded']});
   const header=button.closest('header');
   const nav=header.querySelector('.aral-jelly-menu');
   const close=(restoreFocus=false)=>{
    if(button.getAttribute('aria-expanded')!=='true')return;
    button.setAttribute('aria-expanded','false');nav?.classList.remove('open','is-open');
    if(restoreFocus)button.focus();
   };
   header.addEventListener('keydown',e=>{if(e.key==='Escape'){close(true);e.preventDefault()}});
   nav?.addEventListener('click',e=>{if(e.target.closest('a'))close()});
   document.addEventListener('click',e=>{if(!header.contains(e.target))close()});
   matchMedia('(min-width:1201px)').addEventListener('change',e=>{if(e.matches)close()});
  }
  for(const b of document.querySelectorAll('[data-max-phone]')){
   if(b.dataset.boundMax)return;b.dataset.boundMax='true';
   b.addEventListener('click',async()=>{
    const card=b.closest('.aral-approved-contact,.aral-contact-card,.af-contact');
    let status=card.querySelector('.aral-copy-status');
    if(!status){status=document.createElement('p');status.className='aral-copy-status';status.setAttribute('role','status');card.appendChild(status)}
    try{await navigator.clipboard.writeText('+7 (964) 640-12-35');status.textContent='Номер MAX скопирован'}
    catch{status.textContent='Номер для MAX: +7 (964) 640-12-35'}
   });
  }
 }
 function install(){
  rewriteInternalLinks();
  installHeader();
  installHeaderActions();

  installContactAndMenu();
  hideCoolantPublicReferences();
  document.querySelector('.aral-contour-compare')?.remove();
  if(new URLSearchParams(location.search).get('review')==='links')makeRouteInspection();

  document.body.dataset.feedbackPreview='r12';
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
