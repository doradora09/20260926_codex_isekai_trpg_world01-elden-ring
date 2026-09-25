(function(){'use strict';
const data=window.STORY_READER_DATA,scenes=data.scenes,$=id=>document.getElementById(id),key='isekai-story-bookmark-v1';let current=0,bookmark=null,scrollTimer,restorePending=false,renderVersion=0;
try{bookmark=JSON.parse(localStorage.getItem(key)||'null')}catch{}
if(!bookmark||!scenes.some(s=>s.id===bookmark.id))bookmark=null;
function el(tag,text){const n=document.createElement(tag);if(text!=null)n.textContent=text;return n}
function save(){if(restorePending)return;bookmark={id:scenes[current].id,scroll:Math.max(0,window.scrollY||0),textScroll:Math.max(0,$('textPanel').scrollTop||0),layout:'split-v1'};try{localStorage.setItem(key,JSON.stringify(bookmark))}catch{}updateBookmark()}
function updateBookmark(){if(!bookmark)return;const s=scenes.find(s=>s.id===bookmark.id);$('resume').hidden=false;$('bookmarkNote').textContent='しおり：'+s.dayLabel+'「'+s.title+'」'}
function href(s){return '#scene-'+s.id}
function nav(id,s,direction){const a=$(id);a.textContent=s?(direction<0?'← 前の話\n':'次の話 →\n')+s.title:direction<0?'物語のはじまり':'本編読了';a.setAttribute('aria-disabled',String(!s));a.setAttribute('aria-label',a.textContent.replace('\n',' '));a.title=a.textContent.replace('\n',' ');if(id.endsWith('Top'))a.textContent=direction<0?'‹':'›';if(s)a.href=href(s);else a.removeAttribute('href')}
function toc(){const list=$('tocList'),q=$('search').value.trim();list.replaceChildren();for(const s of scenes){if(q&&!((s.title+' '+s.dayLabel).includes(q)))continue;const a=el('a');a.href=href(s);a.append(el('small',s.dayLabel),el('span',s.title));if(s.id===scenes[current].id)a.setAttribute('aria-current','page');list.append(a)}if(!list.children.length)list.append(el('p','一致するタイトルはありません。'))}
function render(i,notice='',restore=null,initial=false){const version=++renderVersion;restorePending=true;current=i;const s=scenes[i];document.title=s.dayLabel+'・'+s.title+'｜異世界転移録';$('chapterMeta').textContent=s.dayLabel+' ／ TURN '+s.id;$('chapterTitle').textContent=s.title;$('position').textContent=(i+1)+' / '+scenes.length+' 話';$('daySelect').value=String(s.startDay||0);$('dayNotice').hidden=!notice;$('dayNotice').textContent=notice;
 const image=$('chapterImage');$('figure').hidden=!s.image;image.onload=()=>requestAnimationFrame(measureArtworkOverlap);image.onerror=()=>{$('figure').hidden=true};if(s.image){image.src=s.image;image.alt=s.title+'の挿絵'}
 $('prose').replaceChildren(...s.text.map(t=>el('p',t)));$('quote').hidden=!s.quote;$('quote').textContent=s.quote||'';$('cards').replaceChildren();for(const c of s.cards||[]){const section=el('section');section.append(el('h3',c.name||''));for(const k of ['genre','desc','cost'])if(c[k])section.append(el('p',c[k]));$('cards').append(section)}$('recordDetails').hidden=!s.cards?.length;$('recordDetails').open=false;
 nav('prevTop',scenes[i-1],-1);nav('prevBottom',scenes[i-1],-1);nav('nextTop',scenes[i+1],1);nav('nextBottom',scenes[i+1],1);$('endCard').hidden=i!==scenes.length-1;if(!$('toc').hidden)toc();renderDaily(s);$('dailyRecords').open=false;
 const place=()=>{if(version!==renderVersion)return;$('textPanel').scrollTop=restore?.layout==='split-v1'?Math.max(0,Number(restore.textScroll)||0):0;if(!initial){$('toc').hidden=true;$('tocToggle').setAttribute('aria-expanded','false')}measureReaderTools();if(!initial||location.hash)$('chapter').scrollIntoView({block:'start'});restorePending=false;if(!initial)save()};
 requestAnimationFrame(()=>{place();measureArtworkOverlap()});
}
function resolve(initial=false){const hash=location.hash;let id=data.firstDayId,notice='';if(/^#scene-1-\d+$/.test(hash))id=hash.slice(7);else if(/^#day-\d+$/.test(hash)){const day=Number(hash.slice(5)),entry=data.byDay[day];if(entry){id=entry.id;const s=scenes.find(x=>x.id===id);if(!entry.covered)notice='DAY '+day+'の独立した記録はありません。次に記録された話を表示しています。';else if(s.startDay!==s.endDay)notice='DAY '+day+'は、'+s.dayLabel+'を描くこの話に含まれます。'}}let i=scenes.findIndex(s=>s.id===id);if(i<0){i=scenes.findIndex(s=>s.id===data.firstDayId);notice='指定された話が見つからないため、DAY1を表示しています。'}render(i,notice,null,initial)}

let readingMode='below',lastTextMode='below';
try{const stored=localStorage.getItem('isekai-reader-view-v2');if(['overlay','below','image'].includes(stored))readingMode=stored}catch{}
function setReadingMode(mode){requestAnimationFrame(measureArtworkOverlap);readingMode=['overlay','below','image'].includes(mode)?mode:'below';if(readingMode!=='image')lastTextMode=readingMode;$('chapter').dataset.mode=readingMode;$('readingMode').value=readingMode;$('imageToggle').textContent=readingMode==='image'?'本文を戻す':'画像だけ表示';$('imageToggle').setAttribute('aria-pressed',String(readingMode==='image'));try{localStorage.setItem('isekai-reader-view-v2',readingMode)}catch{}}
$('readingMode').onchange=e=>setReadingMode(e.target.value);$('imageToggle').onclick=()=>setReadingMode(readingMode==='image'?lastTextMode:'image');setReadingMode(readingMode);
function renderDaily(scene){const recordLink=$('sceneRecordLink');if(recordLink)recordLink.href='records.html#story/turn-'+scene.id+'.json';const context=window.READER_CONTEXT?.scenes?.[scene.id]||{items:[],stories:[]};const holder=$('dailyContent');holder.replaceChildren();const items=context.items||[],stories=context.stories||[];$('dailySummary').textContent='この日の記録 · 入手・成長 '+items.length+'件 ／ サイドストーリー '+stories.length+'話';
 const notice=el('p',scene.startDay?'この日付範囲で、この話までに確認できる主な記録の抜粋です。後の出来事は先に表示しません。':'日付制導入前の場面です。この話で確認できる内容を掲載しています。');notice.className='muted';holder.append(notice);
 holder.append(el('h3','入手・習得・装備の更新'));if(!items.length)holder.append(el('p','この時点の入手・更新について、掲載できる確定記録はまだありません。'));
 for(const item of items){const box=el('section');box.className='context-entry';box.append(el('strong',item.label||item.title||'記録'));if(item.description)box.append(el('p',item.description));if(item.evidence){const source=el('details');source.className='evidence';source.append(el('summary','本文の根拠'));const evidence=el('p',item.source?.quote||item.evidence);evidence.className='source-quote';source.append(evidence);box.append(source)}if(item.scene&&item.scene!==scene.id){const a=el('a','記録された話へ');a.href='#scene-'+item.scene;a.className='context-source';box.append(a)}holder.append(box)}
 holder.append(el('h3','この日のサイドストーリー'));if(!stories.length)holder.append(el('p','この時点に対応するサイドストーリーは未掲載です。'));
 for(const story of stories){const box=el('section');box.className='context-entry';const a=el('a',story.title);a.href=story.href;a.target='_blank';a.rel='noopener';box.append(a,el('small','　'+(story.character||'')+(story.day?' ／ DAY '+story.day:'')));if(story.summary)box.append(el('p',story.summary));holder.append(box)}
}

$('daySelect').append(el('option','序章'));$('daySelect').children[0].value='0';for(let day=1;day<=data.lastDay;day++){const o=el('option','DAY '+day);o.value=String(day);$('daySelect').append(o)}$('daySelect').onchange=e=>{location.hash=Number(e.target.value)?'day-'+e.target.value:'scene-1-2'};
$('tocToggle').onclick=()=>{const open=$('toc').hidden;$('toc').hidden=!open;$('tocToggle').setAttribute('aria-expanded',String(open));if(open){toc();$('toc').scrollIntoView({block:'start'})}};$('search').oninput=toc;
$('fontSize').onchange=e=>{const size=['17','20','23'].includes(e.target.value)?e.target.value:'17';document.documentElement.style.setProperty('--font',size+'px');try{localStorage.setItem('isekai-reader-font',size)}catch{}};
try{const size=localStorage.getItem('isekai-reader-font');if(['17','20','23'].includes(size)){$('fontSize').value=size;document.documentElement.style.setProperty('--font',size+'px')}}catch{}
$('resume').onclick=()=>{if(!bookmark)return;const saved={...bookmark};history.pushState(null,'',href(scenes.find(s=>s.id===saved.id)));render(scenes.findIndex(s=>s.id===saved.id),'',saved)};
$('textPanel').addEventListener('scroll',()=>{clearTimeout(scrollTimer);scrollTimer=setTimeout(save,300)},{passive:true});
function measureArtworkOverlap(){
 const image=$('chapterImage');if($('chapter').dataset.mode!=='overlay'||$('figure').hidden||!image.complete||!image.naturalWidth||!image.naturalHeight)return;
 const box=image.getBoundingClientRect(),chapterBox=$('chapter').getBoundingClientRect();if(!box.width||!box.height)return;
 const drawnHeight=Math.min(box.height,box.width*image.naturalHeight/image.naturalWidth);
 $('chapter').style.setProperty('--reader-overlay-top',(box.top-chapterBox.top+(box.height-drawnHeight)/2+drawnHeight*.8)+'px');
}
function measureReaderTools(){
 document.documentElement.style.setProperty('--reader-tools-height',Math.ceil($('readerTools').getBoundingClientRect().height)+'px');
 requestAnimationFrame(measureArtworkOverlap);
}
measureReaderTools();if(typeof ResizeObserver!=='undefined')new ResizeObserver(measureReaderTools).observe($('readerTools'));window.addEventListener('resize',measureReaderTools);window.addEventListener('resize',()=>requestAnimationFrame(measureArtworkOverlap));if(typeof ResizeObserver!=='undefined')new ResizeObserver(measureArtworkOverlap).observe($('figure'));
window.addEventListener('hashchange',()=>resolve());window.addEventListener('scroll',()=>{clearTimeout(scrollTimer);scrollTimer=setTimeout(save,300)},{passive:true});window.addEventListener('pagehide',save);updateBookmark();resolve(true);
})();
