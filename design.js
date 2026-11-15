(() => {
 document.querySelectorAll('.main-acc-icon').forEach((el,i)=>{el.textContent=String(i+1).padStart(2,'0');el.setAttribute('aria-hidden','true');});
 document.querySelectorAll('.main-acc-header').forEach(header=>{
   header.setAttribute('role','button');header.tabIndex=0;
   const sync=()=>{const open=header.classList.contains('open');header.setAttribute('aria-expanded',String(open));header.querySelector('.main-acc-arrow').textContent=open?'−':'+';};
   header.addEventListener('click',sync);header.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();header.click();}});sync();
 });
 const sheet=document.querySelector('.profile-sheet'),content=document.getElementById('profileContent'),reopen=document.querySelector('.profile-reopen');
 const minimize=sheet.querySelector('[data-window="minimize"]'),maximize=sheet.querySelector('[data-window="maximize"]');
 const expand=()=>{content.hidden=false;minimize.setAttribute('aria-expanded','true');minimize.setAttribute('aria-label','프로필 접기');};
 minimize.onclick=()=>{content.hidden=!content.hidden;minimize.setAttribute('aria-expanded',String(!content.hidden));minimize.setAttribute('aria-label',content.hidden?'프로필 펼치기':'프로필 접기');};
 maximize.onclick=()=>{expand();const on=sheet.classList.toggle('is-maximized');maximize.setAttribute('aria-pressed',String(on));maximize.setAttribute('aria-label',on?'프로필 원래 크기로':'프로필 크게 보기');};
 sheet.querySelector('[data-window="close"]').onclick=()=>{sheet.hidden=true;reopen.hidden=false;reopen.focus({preventScroll:true});};
 reopen.onclick=()=>{sheet.hidden=false;reopen.hidden=true;expand();minimize.focus({preventScroll:true});};
 document.querySelectorAll('.hero-actions a').forEach(action=>{action.onclick=e=>{const href=e.currentTarget.getAttribute('href');const link=Array.from(document.querySelectorAll('.topnav a')).find(a=>a.getAttribute('href')===href);if(link){e.preventDefault();link.click();}};});
 document.querySelectorAll('.pf-type-tabs').forEach(tabs=>tabs.addEventListener('click',e=>{const b=e.target.closest('button');if(b)tabs.scrollTo({left:b.offsetLeft-tabs.offsetLeft-(tabs.clientWidth-b.offsetWidth)/2,behavior:'smooth'});}));
 const hamburger=document.getElementById('hamburger');hamburger.addEventListener('click',()=>hamburger.setAttribute('aria-expanded',String(hamburger.classList.contains('open'))));
 document.querySelectorAll('.mob-link').forEach(a=>a.addEventListener('click',()=>hamburger.setAttribute('aria-expanded','false')));
})();
