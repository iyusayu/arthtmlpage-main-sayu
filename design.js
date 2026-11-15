(() => {
 const icon=path=>'<svg class="line-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+path+'</svg>';
 const symbols=['<rect x="4" y="5" width="16" height="16" rx="3"/><path d="M8 3v4m8-4v4M4 11h16M8 15h2m4 0h2"/>','<rect x="3" y="5" width="18" height="15" rx="3"/><path d="m3 16 5-5 5 6 3-3 5 5"/><circle cx="16" cy="10" r="1"/>','<path d="M4 7h16M4 12h16M4 17h16"/>','<path d="M4 21h16M6 17l1-5L17 2l5 5-10 10zM14 5l5 5"/>','<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 3h6v4H9zM9 12h6m-6 4h6"/>'];
 document.querySelectorAll('.main-acc-icon').forEach((el,i)=>el.innerHTML=icon(symbols[i]||symbols[0]));
 document.querySelectorAll('.main-acc-header').forEach(header=>{
   header.setAttribute('role','button');header.tabIndex=0;
   const sync=()=>{const open=header.classList.contains('open');header.setAttribute('aria-expanded',String(open));header.querySelector('.main-acc-arrow').textContent=open?'−':'+';};
   header.addEventListener('click',sync);header.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();header.click();}});sync();
 });
 if(designConfig.meteorsEnabled){const sky=document.createElement('div');sky.className='meteor-layer';sky.setAttribute('aria-hidden','true');for(let i=0;i<6;i++){const meteor=document.createElement('i');meteor.className='meteor';meteor.style.setProperty('--n',i);sky.append(meteor);}document.body.prepend(sky);}
 const sheet=document.querySelector('.profile-sheet'),content=document.getElementById('profileContent'),reopen=document.querySelector('.profile-reopen');
 const minimize=sheet.querySelector('[data-window="minimize"]'),maximize=sheet.querySelector('[data-window="maximize"]');
 const expand=()=>{content.hidden=false;minimize.setAttribute('aria-expanded','true');minimize.setAttribute('aria-label','프로필 접기');};
 minimize.onclick=()=>{content.hidden=!content.hidden;minimize.setAttribute('aria-expanded',String(!content.hidden));minimize.setAttribute('aria-label',content.hidden?'프로필 펼치기':'프로필 접기');};
 maximize.onclick=()=>{expand();const on=sheet.classList.toggle('is-maximized');maximize.setAttribute('aria-pressed',String(on));maximize.setAttribute('aria-label',on?'프로필 원래 크기로':'프로필 크게 보기');};
 sheet.querySelector('[data-window="close"]').onclick=()=>{sheet.hidden=true;reopen.hidden=false;reopen.focus({preventScroll:true});};
 reopen.onclick=()=>{sheet.hidden=false;reopen.hidden=true;expand();minimize.focus({preventScroll:true});};
 document.querySelector('.hero-cta').onclick=e=>{const href=e.currentTarget.getAttribute('href');const link=Array.from(document.querySelectorAll('.topnav a')).find(a=>a.getAttribute('href')===href);if(link){e.preventDefault();link.click();}};
 document.querySelectorAll('.pf-type-tabs').forEach(tabs=>tabs.addEventListener('click',e=>{const b=e.target.closest('button');if(b)tabs.scrollTo({left:b.offsetLeft-tabs.offsetLeft-(tabs.clientWidth-b.offsetWidth)/2,behavior:'smooth'});}));
 const hamburger=document.getElementById('hamburger');hamburger.addEventListener('click',()=>hamburger.setAttribute('aria-expanded',String(hamburger.classList.contains('open'))));
 document.querySelectorAll('.mob-link').forEach(a=>a.addEventListener('click',()=>hamburger.setAttribute('aria-expanded','false')));
})();
