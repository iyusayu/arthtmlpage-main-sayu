// 가격은 제작 가이드 기준입니다. 범위가 있는 옵션은 시작 가격이며 상담 후 확정됩니다.
const workCategories = [
 ['일러 + 리깅 세트',[
  ['전신 + 디자인시안 3안 + 삼면도 (10만원 할인)',1650000],
  ['전신 + 디자인시안 3안 (10만원 할인)',1550000],
  ['전신 (10만원 할인)',1400000],
  ['반신 · 허벅지까지 (5만원 할인)',950000]
 ]],
 ['버츄얼 캐릭터 일러스트',[
  ['반신 · 파츠분리, 허벅지까지',500000],['전신 · 파츠분리',750000],['전신 · 더 디테일한 파츠분리, 리깅 제외',950000]
 ]],
 ['Live2D 리깅',[['반신 리깅',500000],['전신 리깅',750000]]],
 ['캐릭터 디자인',[['디자인시안 3개 · 디자인 2, 바리에이션 1',150000],['삼면도만 · 앞, 옆, 뒤',100000],['삼면도 + 디테일 편집',150000]]],
 ['추가 옵션',[
  ['비대칭 포즈',100000],['추가 팔 포즈',80000],['별도 소품',20000],['추가 표정',10000],
  ['iOS 기능 · 볼빵빵, 입좌우',50000],['iOS 기능 · 혀 내밀기',60000],
  ['작업 전 인체틀 · 추후 의상 추가용',90000],['신의상 추가',150000,'150,000~350,000원'],
  ['헤어 추가',80000,'80,000~200,000원'],['동물 귀/꼬리, 날개 추가',30000,'30,000~100,000원'],
  ['on/off 의상',50000,'50,000~80,000원']
 ]],
 ['완성모델 구매',[['화가남자 음기모델 · 리깅완료 + 삼면도',790000]]],
 ['비공개',[['완성 후 데뷔 전 3달 이상 비공개',50000]]]
];

const selectedItems=new Map();
let selectedUsageName='추가 구매 없음',usageCost=0;
const money=n=>n.toLocaleString('ko-KR')+'원';
const estList=document.getElementById('estCatList');
const selectedUsage=()=>({name:selectedUsageName,cost:usageCost});
function estimateSummary(){const items=[...selectedItems.values()];const subtotal=items.reduce((n,r)=>n+r.price*r.quantity,0)+usageCost;const share=document.getElementById('fProcessShare').checked;const discount=share&&items.some(r=>r.category!=='비공개')?Math.min(30000,subtotal):0;return {items,subtotal,discount,total:subtotal-discount,ranged:items.some(r=>r.range)};}
workCategories.forEach(([category,items],ci)=>{
 const wrap=document.createElement('div'),button=document.createElement('button'),body=document.createElement('div');
 button.type='button';button.className='est-cat-header';button.style.width='100%';button.setAttribute('aria-expanded',ci===0?'true':'false');button.textContent=category+' '+(ci===0?'−':'+');body.className='est-cat-body'+(ci===0?' open':'');body.hidden=ci!==0;
 button.onclick=()=>{const open=body.hidden;body.hidden=!open;body.classList.toggle('open',open);button.classList.toggle('open',open);button.setAttribute('aria-expanded',String(open));button.textContent=category+(open?' −':' +');};
 if(category==='추가 옵션'){const note=document.createElement('p');note.className='est-category-note';note.textContent='일러스트+리깅 세트 의뢰 시 iOS 기능을 제외한 추가 옵션(표정 포함)은 수량을 2로 선택해 주세요.';body.append(note);}
 items.forEach(([name,price,range],ii)=>{
  const key=ci+'-'+ii,row=document.createElement('div'),left=document.createElement('div'),label=document.createElement('label'),cost=document.createElement('span'),controls=document.createElement('div'),minus=document.createElement('button'),plus=document.createElement('button'),input=document.createElement('input');
  row.className='est-item-row';left.className='est-item-left';label.className='est-item-name';input.id='option-'+key;label.htmlFor=input.id;label.textContent=name;cost.className='est-item-price';cost.textContent=range||money(price);left.append(label,cost);controls.className='est-quantity';input.type='number';input.min='0';input.max='99';input.step='1';input.value='0';input.setAttribute('aria-label',category+' / '+name+' 수량');minus.type=plus.type='button';minus.textContent='−';plus.textContent='+';minus.setAttribute('aria-label',name+' 수량 줄이기');plus.setAttribute('aria-label',name+' 수량 늘리기');
  const update=()=>{const n=Math.max(0,Math.min(99,Math.floor(Number(input.value)||0)));input.value=n;minus.disabled=n===0;plus.disabled=n===99;if(n)selectedItems.set(key,{category,name,price,range,quantity:n});else selectedItems.delete(key);row.classList.toggle('checked',n>0);updateReceipt();};
  minus.onclick=()=>{input.value=Number(input.value)-1;update();};plus.onclick=()=>{input.value=Number(input.value)+1;update();};input.oninput=update;input.onchange=update;minus.disabled=true;controls.append(minus,input,plus);row.append(left,controls);body.append(row);
 });wrap.append(button,body);estList.append(wrap);
});
const usage=document.getElementById('usageGroup'),heading=document.createElement('p');heading.className='est-category-note';heading.textContent='상업이용권 구매 (하나만 선택)';usage.append(heading);
[['추가 구매 없음',0],['개인',200000],['기업',500000]].forEach(([name,cost],i)=>{const label=document.createElement('label'),input=document.createElement('input');label.className='usage-radio-label';input.type='radio';input.name='usageOpt';input.checked=i===0;input.value=name;input.onchange=()=>{selectedUsageName=name;usageCost=cost;updateReceipt();};label.append(input,document.createTextNode(name+(cost?' · '+money(cost):'')));usage.append(label);});
function updateReceipt(){const box=document.getElementById('receiptBox');box.replaceChildren();const {items,total,discount,ranged}=estimateSummary();if(!items.length&&!usageCost){const p=document.createElement('p');p.className='receipt-empty';p.textContent='선택한 항목이 없습니다';box.append(p);return;}const add=(name,value,cls='receipt-item')=>{const row=document.createElement('div'),label=document.createElement('span'),cost=document.createElement('span');row.className=cls;label.className='receipt-item-name';cost.className='receipt-item-price';label.textContent=name;cost.textContent=value;row.append(label,cost);box.append(row);};items.forEach(r=>add(r.name+' × '+r.quantity,money(r.price*r.quantity)+(r.range?'~':'')));if(usageCost)add('상업이용권 · '+selectedUsageName,money(usageCost));if(discount)add('작가 SNS 작업 과정 공개 할인','−'+money(discount));add('예상 합계',money(total)+(ranged?'~':''),'receipt-total');const note=document.createElement('p');note.className='sayu-est-total-note';note.textContent=ranged?'범위 옵션은 시작 금액으로 계산됩니다. 최종 견적은 상담 후 확정됩니다.':'최종 견적은 상담 후 확정됩니다.';box.append(note);}
function buildApplication(){const {items,total,discount,ranged}=estimateSummary(),value=id=>document.getElementById(id).value.trim()||'(미입력)';return ['SAYU · 작업 신청서','━━━━━━━━━━━━━━━━━━━━','견적 내역',...items.map(r=>'- '+r.category+' / '+r.name+' × '+r.quantity+': '+money(r.price*r.quantity)+(r.range?'~ ('+r.range+')':'')),'상업이용권: '+selectedUsageName+(usageCost?' · '+money(usageCost):''),...(discount?['SNS 작업 과정 공개 할인: −'+money(discount)]:[]),'예상 합계: '+money(total)+(ranged?'~':''),'━━━━━━━━━━━━━━━━━━━━','신청 목록: '+value('fWorkType'),'신청 내용과 참고자료: '+value('fDetail'),'추가 요청사항: '+value('fEtc'),'공개 / 데뷔 일정: '+value('fDebut'),'작가 SNS 작업 과정 공개: '+(document.getElementById('fProcessShare').checked?'허용':'허용하지 않음'),'━━━━━━━━━━━━━━━━━━━━','※ 일러스트+리깅 세트의 추가 옵션은 iOS 기능만 제외하고 수량 2를 선택해 주세요.','※ 최종 견적은 상담 후 확정됩니다.'].join('\n');}
async function copyApplication(text){try{await navigator.clipboard.writeText(text);return true;}catch(_){}const area=document.createElement('textarea');area.value=text;area.style.cssText='position:fixed;left:0;top:0;opacity:0';document.body.append(area);area.select();let done=false;try{done=document.execCommand('copy');}catch(_){}area.remove();return done;}
document.getElementById('formCopyBtn').onclick=async()=>{const text=buildApplication(),copied=await copyApplication(text);if(copied)document.dispatchEvent(new Event('application-copied'));const toast=document.getElementById('copyToast');toast.textContent=copied?'양식과 견적을 복사했습니다.':'자동 복사가 차단되어 직접 복사할 수 있는 창을 준비했습니다.';toast.classList.add('show');window.requestArtmugInquiry(text,copied);};
document.getElementById('fProcessShare').onchange=updateReceipt;
updateReceipt();
