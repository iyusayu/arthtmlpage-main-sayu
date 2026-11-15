(() => {
 const root=document.getElementById('sayuSlots'),slots=window.sayuSettings?.slots||{};
 const now=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit'}).format(new Date());
 const start=/^\d{4}-(0[1-9]|1[0-2])$/.test(slots.startMonth||'')?slots.startMonth:now;
 const [year,month]=start.split('-').map(Number);
 for(let i=0;i<3;i++){
  const date=new Date(year,month-1+i,1),key=date.getFullYear()+'-'+String(date.getMonth()+1).padStart(2,'0'),row=slots.months?.[key];
  const card=document.createElement('article');card.className='sayu-slot';
  const heading=document.createElement('h3');heading.textContent=date.getFullYear()+'년 '+(date.getMonth()+1)+'월';card.append(heading);
  const valid=Number.isInteger(row?.total)&&row.total>=0&&row.total<=30&&Number.isInteger(row?.booked)&&row.booked>=0&&row.booked<=row.total;
  const circles=document.createElement('div');circles.className='sayu-slot-circles';
  if(valid&&row.total>0){for(let n=0;n<row.total;n++){const c=document.createElement('span');c.textContent=n<row.booked?'●':'○';c.className=n<row.booked?'booked':'available';c.setAttribute('aria-hidden','true');circles.append(c);}circles.setAttribute('role','img');circles.setAttribute('aria-label','전체 '+row.total+'개 중 예약 완료 '+row.booked+'개, 예약 가능 '+(row.total-row.booked)+'개');}
  else circles.textContent=valid?'슬롯 없음':'문의';
  const note=document.createElement('p');note.textContent=!valid?'예약 일정은 문의해 주세요.':row.total===0?'이번 달은 예약을 받지 않습니다.':row.booked===row.total?'예약이 마감되었습니다.':(row.total-row.booked)+'개 슬롯 예약 가능';card.append(circles,note);root.append(card);
 }
})();
