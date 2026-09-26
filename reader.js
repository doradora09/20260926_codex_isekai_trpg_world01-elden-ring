(function(){'use strict';
const data=window.STORY_READER_DATA,allScenes=data.scenes,$=id=>document.getElementById(id),key='isekai-story-bookmark-v1';let current=0,bookmark=null,scrollTimer,restorePending=false,renderVersion=0;
let skipSupplements=false;try{skipSupplements=localStorage.getItem('isekai-reader-skip-supplements-v1')==='on'}catch{}
let scenes=skipSupplements?allScenes.filter(s=>!s.supplementType):allScenes;
function visibleIndex(id){id=data.redirects?.[id]||id;const found=scenes.findIndex(s=>s.id===id);if(found>=0)return found;const sourceIndex=allScenes.findIndex(s=>s.id===id);if(sourceIndex<0)return -1;for(let i=sourceIndex+1;i<allScenes.length;i++){const next=scenes.indexOf(allScenes[i]);if(next>=0)return next}return scenes.length-1}
try{bookmark=JSON.parse(localStorage.getItem(key)||'null')}catch{}
if(bookmark)bookmark.id=data.redirects?.[bookmark.id]||bookmark.id;
if(!bookmark||!allScenes.some(s=>s.id===bookmark.id))bookmark=null;
function el(tag,text){const n=document.createElement(tag);if(text!=null)n.textContent=text;return n}
function save(){if(restorePending)return;bookmark={id:scenes[current].id,scroll:Math.max(0,window.scrollY||0),textScroll:Math.max(0,$('textPanel').scrollTop||0),layout:'split-v1'};try{localStorage.setItem(key,JSON.stringify(bookmark))}catch{}updateBookmark()}
function updateBookmark(){if(!bookmark)return;const s=allScenes.find(s=>s.id===bookmark.id);$('resume').hidden=false;$('bookmarkNote').textContent='しおり：'+s.dayLabel+'「'+s.title+'」'}
function href(s){return '#scene-'+s.id}
function nav(id,s,direction){const a=$(id);a.textContent=s?(direction<0?'← 前の話\n':'次の話 →\n')+s.title:direction<0?'物語のはじまり':'本編読了';a.setAttribute('aria-disabled',String(!s));a.setAttribute('aria-label',a.textContent.replace('\n',' '));a.title=a.textContent.replace('\n',' ');if(id.endsWith('Top'))a.textContent=direction<0?'‹':'›';if(s)a.href=href(s);else a.removeAttribute('href')}
function toc(){const list=$('tocList'),q=$('search').value.trim();list.replaceChildren();for(const s of scenes){if(q&&!((s.title+' '+s.dayLabel).includes(q)))continue;const a=el('a');a.href=href(s);a.append(el('small',s.dayLabel),el('span',s.title));if(s.id===scenes[current].id)a.setAttribute('aria-current','page');list.append(a)}if(!list.children.length)list.append(el('p','一致するタイトルはありません。'))}
function render(i,notice='',restore=null,initial=false){const version=++renderVersion;restorePending=true;current=i;const s=scenes[i];const parts=window.READER_CHAPTERS?.parts||[];const part=parts.slice().reverse().find(p=>allScenes.findIndex(x=>x.id===p.id)<=allScenes.indexOf(s))||parts[0];if(part)$('chapterSelect').value=part.id;$('chapter').dataset.readerScene=s.id;$('chapter').dataset.finalePhase=s.phase||'';document.title=s.dayLabel+'・'+s.title+'｜異世界転移録';$('chapterMeta').textContent=s.id==='1-110-bbq'?'帰還後の休日 ／ エピローグ':s.dayLabel+' ／ TURN '+(s.sourceTurn||s.id)+(s.phase?' ／ '+s.phase:'');const countdownDay=s.startDay||0;if(countdownDay>=90&&Number((s.sourceTurn||s.id).split('-')[1])<110){const count=el('span','期限まで あと'+(100-countdownDay)+'日');count.className='reader-countdown';count.title='DAY100−現在のDAY。今日を含まない暦日差。期限はDAY100の終わり。';$('chapterMeta').append(count)}
 $('chapterTitle').textContent=s.title;$('position').textContent=(i+1)+' / '+scenes.length+' 話';$('daySelect').value=String(s.startDay||0);$('dayNotice').hidden=!notice;$('dayNotice').textContent=notice;
 const image=$('chapterImage');$('figure').hidden=!s.image;image.onload=()=>requestAnimationFrame(measureArtworkOverlap);image.onerror=()=>{$('figure').hidden=true};if(s.image){image.src=s.image;image.alt=s.title+'の挿絵'}
 $('prose').replaceChildren(...s.text.map((t,n)=>{const p=el('p',t);p.dataset.paragraph=n;if(s.paragraphLabels?.[n]){const h=el('strong',s.paragraphLabels[n]);h.className='reader-paragraph-label';p.prepend(h)}return p}));$('quote').hidden=!s.quote;$('quote').textContent=s.quote||'';$('cards').replaceChildren();for(const c of s.cards||[]){const section=el('section');section.append(el('h3',c.name||''));for(const k of ['genre','desc','cost'])if(c[k])section.append(el('p',c[k]));$('cards').append(section)}$('recordDetails').hidden=!s.cards?.length;$('recordDetails').open=false;renderReadingDetail(s);
 nav('prevTop',scenes[i-1],-1);nav('prevBottom',scenes[i-1],-1);nav('nextTop',scenes[i+1],1);nav('nextBottom',scenes[i+1],1);$('endCard').hidden=i!==scenes.length-1;if(!$('toc').hidden)toc();renderDaily(s);$('dailyRecords').open=false;
 const place=()=>{if(version!==renderVersion)return;$('textPanel').scrollTop=restore?.layout==='split-v1'?Math.max(0,Number(restore.textScroll)||0):0;if(!initial){$('toc').hidden=true;$('tocToggle').setAttribute('aria-expanded','false')}measureReaderTools();if(!initial||location.hash)$('chapter').scrollIntoView({block:'start'});restorePending=false;if(!initial)save()};
 requestAnimationFrame(()=>{place();measureArtworkOverlap()});
}
function renderReadingDetail(s){
 let box=$('readingEditionDetails');if(!box){box=el('details');box.id='readingEditionDetails';box.className='reading-edition-details';$('recordDetails').after(box)}box.replaceChildren();box.open=false;box.hidden=!s.readingRecords?.length;
 if(s.readingRecords?.length){box.append(el('summary','詳しい経過を読む'));for(const entry of s.readingRecords){box.append(el('h3',entry.label));for(const p of entry.paragraphs)box.append(el('p',p))}}
 let recap=$('readingRecap');if(!recap){recap=el('aside');recap.id='readingRecap';$('prose').before(recap)}recap.replaceChildren();recap.hidden=!s.recap;
 if(s.recap){recap.append(el('strong','日々の回想'),el('p',s.recapSummary));const next=scenes[current+1];if(next){const skip=el('a','この回想を飛ばす →');skip.href=href(next);recap.append(skip)}}
}
function resolve(initial=false){const hash=location.hash;let id=allScenes[0].id,notice='';if(/^#scene-1-\d+(?:-[a-z]+)?$/.test(hash))id=hash.slice(7);else if(/^#day-\d+$/.test(hash)){const day=Number(hash.slice(5)),entry=data.byDay[day];if(entry){id=entry.id;const s=allScenes.find(x=>x.id===id);if(!entry.covered)notice='DAY '+day+'の独立した記録はありません。次に記録された話を表示しています。';else if(s.startDay!==s.endDay)notice='DAY '+day+'は、'+s.dayLabel+'を描くこの話に含まれます。'}}let i=visibleIndex(id);if(i>=0&&scenes[i].id!==id)history.replaceState(null,'',href(scenes[i]));if(i<0){i=0;notice='指定された話が見つからないため、物語の最初を表示しています。'}render(i,notice,null,initial)}

let readingMode='below',lastTextMode='below';
try{const stored=localStorage.getItem('isekai-reader-view-v2');if(['overlay','below','image'].includes(stored))readingMode=stored}catch{}
function setReadingMode(mode){requestAnimationFrame(measureArtworkOverlap);readingMode=['overlay','below','image'].includes(mode)?mode:'below';if(readingMode!=='image')lastTextMode=readingMode;$('chapter').dataset.mode=readingMode;$('readingMode').value=readingMode;$('imageToggle').textContent=readingMode==='image'?'本文を戻す':'画像だけ表示';$('imageToggle').setAttribute('aria-pressed',String(readingMode==='image'));try{localStorage.setItem('isekai-reader-view-v2',readingMode)}catch{}}
$('readingMode').onchange=e=>setReadingMode(e.target.value);$('imageToggle').onclick=()=>setReadingMode(readingMode==='image'?lastTextMode:'image');setReadingMode(readingMode);

function closeSideStories(){if($('sideStoryDialog').open)$('sideStoryDialog').close()}
function renderSideStoryShortcut(stories){
 closeSideStories();const button=$('sideStoryShortcut'),list=$('sideStoryLinks');list.replaceChildren();button.hidden=!stories.length;
 button.textContent='サイドストーリーを読む'+(stories.length>1?' · '+stories.length+'話':'');
 for(const story of stories){const box=el('section');box.className='side-story-link';const a=el('button',story.title+' →');a.type='button';a.onclick=()=>showInlineSideStory(story,stories);box.append(el('small',(story.character||'')+(story.day?' ／ DAY '+story.day:'')),a);if(story.summary)box.append(el('p',story.summary));list.append(box)}
}
function showInlineSideStory(entry,entries){
 const all=typeof SIDE_STORIES==='undefined'?[]:SIDE_STORIES.stories||[];const story=all.find(s=>s.id===entry.id),list=$('sideStoryLinks');list.replaceChildren();
 const back=el('button','← 一覧に戻る');back.type='button';back.className='side-story-back';back.onclick=()=>{renderSideStoryShortcut(entries);$('sideStoryDialog').showModal();$('sideStoryLinks').querySelector('button')?.focus()};list.append(back);
 const title=el('h3',entry.title);title.tabIndex=-1;title.className='side-story-reading-title';list.append(title);
 if(!story){list.append(el('p','本文を読み込めませんでした。ページを再読み込みして、もう一度お試しください。'));title.focus();return}
 list.append(el('p',story.character+' ／ DAY '+story.day));
 if(story.image&&/^assets\//.test(story.image)&&!story.image.includes('..')){const figure=el('figure'),frame=el('div'),image=el('img');figure.className='side-story-reading-art';frame.className='side-story-reading-art-frame';const single=story.imageMode==='single';image.src=story.image;image.alt=story.character+'の掌編挿絵';image.style.width=single?'100%':'200%';image.style.transform=!single&&story.imagePosition==='right'?'translateX(-50%)':'translateX(0)';image.onerror=()=>{figure.hidden=true};frame.append(image);figure.append(frame);if(story.imageCaption)figure.append(el('figcaption',story.imageCaption));list.append(figure)}
 const prose=el('div');prose.className='side-story-reading-prose';for(const text of story.paragraphs||[])prose.append(el('p',text));list.append(prose);$('sideStoryDialog').scrollTop=0;title.focus();
}
$('sideStoryShortcut').onclick=()=>{$('sideStoryDialog').showModal();$('sideStoryClose').focus()};
$('sideStoryClose').onclick=closeSideStories;
$('sideStoryDialog').addEventListener('click',event=>{if(event.target!==$('sideStoryDialog'))return;const r=event.currentTarget.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeSideStories()});

function renderDaily(scene){const finale=window.READER_FINALE;const context=finale?.suppressContext.includes(scene.id)?{items:[],stories:[]}:(window.READER_CONTEXT?.scenes?.[finale?.contextSources[scene.id]||scene.id]||{items:[],stories:[]});const holder=$('dailyContent');holder.replaceChildren();const items=context.items||[],extraStories=(typeof SIDE_STORIES==='undefined'?[]:SIDE_STORIES.stories||[]).filter(s=>(data.redirects?.[s.scene]||s.scene)===scene.id).map(s=>({id:s.id,title:s.title,character:s.character,day:s.day,summary:s.summary,href:'side-stories.html#'+s.id})),stories=[...new Map([...(context.stories||[]),...extraStories].map(s=>[s.id,s])).values()];renderSideStoryShortcut(stories);const parts=[];if(items.length)parts.push('入手・成長 '+items.length+'件');if(stories.length)parts.push('この日の寄り道 '+stories.length+'話');$('dailyRecords').hidden=!parts.length;$('dailySummary').textContent=parts.join(' ／ ');if(!parts.length)return;
 const notice=el('p',scene.startDay?'この日付範囲で、この話までに確認できる主な記録の抜粋です。後の出来事は先に表示しません。':'日付制導入前の場面です。この話で確認できる内容を掲載しています。');notice.className='muted';holder.append(notice);
 if(items.length)holder.append(el('h3','入手・習得・装備の更新'));
 for(const item of items){const box=el('section');box.className='context-entry';box.append(el('strong',item.label||item.title||'記録'));if(item.description)box.append(el('p',item.description));if(item.evidence){const source=el('details');source.className='evidence';source.append(el('summary','本文の根拠'));const evidence=el('p',item.source?.quote||item.evidence);evidence.className='source-quote';source.append(evidence);box.append(source)}if(item.scene&&item.scene!==scene.id){const a=el('a','記録された話へ');a.href='#scene-'+item.scene;a.className='context-source';box.append(a)}holder.append(box)}
 if(stories.length)holder.append(el('h3','この日の寄り道 — サイドストーリー'));
 for(const story of stories){const box=el('section');box.className='context-entry';const a=el('a',story.title);a.href=story.href;a.target='_blank';a.rel='noopener';box.append(a,el('small','　'+(story.character||'')+(story.day?' ／ DAY '+story.day:'')));if(story.summary)box.append(el('p',story.summary));holder.append(box)}
}

for(const part of window.READER_CHAPTERS?.parts||[]){const option=el('option',part.number+'｜'+part.title.replace('\n',''));option.value=part.id;$('chapterSelect').append(option)}$('chapterSelect').onchange=e=>{location.hash='scene-'+e.target.value};
$('daySelect').append(el('option','序章'));$('daySelect').children[0].value='0';for(let day=1;day<=data.lastDay;day++){const o=el('option','DAY '+day);o.value=String(day);$('daySelect').append(o)}$('daySelect').onchange=e=>{location.hash=Number(e.target.value)?'day-'+e.target.value:'scene-1-1'};
$('tocToggle').onclick=()=>{const open=$('toc').hidden;$('toc').hidden=!open;$('tocToggle').setAttribute('aria-expanded',String(open));if(open){toc();$('toc').scrollIntoView({block:'start'})}};$('search').oninput=toc;
$('fontSize').onchange=e=>{const size=['17','20','23'].includes(e.target.value)?e.target.value:'17';document.documentElement.style.setProperty('--font',size+'px');try{localStorage.setItem('isekai-reader-font',size)}catch{}};
try{const size=localStorage.getItem('isekai-reader-font');if(['17','20','23'].includes(size)){$('fontSize').value=size;document.documentElement.style.setProperty('--font',size+'px')}}catch{}
$('resume').onclick=()=>{if(!bookmark)return;const saved={...bookmark},i=visibleIndex(saved.id);if(i<0)return;history.pushState(null,'',href(scenes[i]));render(i,'',scenes[i].id===saved.id?saved:null)};
$('skipSupplements').checked=skipSupplements;
$('skipSupplements').onchange=e=>{const id=scenes[current].id;skipSupplements=e.target.checked;try{localStorage.setItem('isekai-reader-skip-supplements-v1',skipSupplements?'on':'off')}catch{}scenes=skipSupplements?allScenes.filter(s=>!s.supplementType):allScenes;const i=visibleIndex(id);history.replaceState(null,'',href(scenes[i]));render(i)};
$('textPanel').addEventListener('scroll',()=>{clearTimeout(scrollTimer);scrollTimer=setTimeout(save,300)},{passive:true});
function measureArtworkOverlap(){
 const image=$('chapterImage');if($('chapter').dataset.mode!=='overlay'||$('figure').hidden||!image.complete||!image.naturalWidth||!image.naturalHeight)return;
 const box=image.getBoundingClientRect(),chapterBox=$('figure').closest('.reading-frame').getBoundingClientRect();if(!box.width||!box.height)return;
 const drawnHeight=Math.min(box.height,box.width*image.naturalHeight/image.naturalWidth);
 const summary=$('playerDecisionSummary'),withSummary=summary&&!summary.hidden;
 const imageTop=withSummary?0:(box.height-drawnHeight)/2,overlap=withSummary?.1:.2;
 $('chapter').style.setProperty('--reader-overlay-top',(box.top-chapterBox.top+imageTop+drawnHeight*(1-overlap))+'px');
}
function measureReaderTools(){
 document.documentElement.style.setProperty('--reader-tools-height',Math.ceil($('readerTools').getBoundingClientRect().height)+'px');
 requestAnimationFrame(measureArtworkOverlap);
}
measureReaderTools();if(typeof ResizeObserver!=='undefined')new ResizeObserver(measureReaderTools).observe($('readerTools'));window.addEventListener('resize',measureReaderTools);window.addEventListener('resize',()=>requestAnimationFrame(measureArtworkOverlap));if(typeof ResizeObserver!=='undefined')new ResizeObserver(measureArtworkOverlap).observe($('figure'));
window.addEventListener('hashchange',()=>resolve());window.addEventListener('scroll',()=>{clearTimeout(scrollTimer);scrollTimer=setTimeout(save,300)},{passive:true});window.addEventListener('pagehide',save);updateBookmark();resolve(true);
})();
