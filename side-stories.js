(function(){'use strict';
const stories=typeof SIDE_STORIES==='undefined'?[]:SIDE_STORIES.stories||[];
const $=id=>document.getElementById(id),list=$('storyList'),reader=$('storyReader'),content=$('storyContent'),filter=$('characterFilter'),search=$('storySearch'),order=$('storyOrder');
const key='isekai-side-stories-view';let active=null;
const norm=s=>String(s||'').replace(/[\s　]/g,'').toLowerCase();
function el(tag,text,cls){const n=document.createElement(tag);if(text!=null)n.textContent=String(text);if(cls)n.className=cls;return n}
function requested(){try{return decodeURIComponent(location.hash.slice(1))}catch{return ''}}
function save(){try{sessionStorage.setItem(key,JSON.stringify({id:active,scroll:reader.scrollTop}))}catch{}}
function show(id,updateHash=true){
 const story=stories.find(s=>s.id===id);content.replaceChildren();reader.scrollTop=0;
 if(!story){active=null;content.append(el('h2','読みたい物語を選んでください。'));return;}
 active=story.id;content.append(el('p',story.character+' · DAY '+story.day+(story.readMinutes?' · 約'+story.readMinutes+'分':''),'story-meta'),el('h2',story.title));
 if(story.image&&/^assets\//.test(story.image)&&!story.image.includes('..')){
  const figure=el('figure',null,'story-art'),frame=el('div',null,'story-art-window'),img=el('img');
  img.src=story.image;img.alt=story.alt||story.character+'の掌編挿絵';const single=story.imageMode==='single';figure.classList.toggle('story-art-single',single);img.style.width=single?'100%':'200%';img.style.transform=!single&&story.imagePosition==='right'?'translateX(-50%)':'translateX(0)';
  img.onload=()=>{const ratio=img.naturalWidth/((single?1:2)*img.naturalHeight);if(ratio>0){if(!single)figure.style.width=260*ratio+'px';frame.style.aspectRatio=String(ratio)}};img.onerror=()=>{figure.hidden=true};frame.append(img);figure.append(frame,el('figcaption',story.imageCaption||'DAY'+story.day));content.append(figure);
 }
 for(const p of story.paragraphs||[])content.append(el('p',p,'story-paragraph'));
 if(story.scene&&/^1-\d+(?:-[a-z]+)?$/.test(story.scene)){const a=el('a','この時の本編へ戻る →','story-source');a.href='reader.html#scene-'+story.scene;content.append(a)}
 if(story.canonScope){const d=el('details',null,'story-scope');d.append(el('summary','この掌編について'),el('p',typeof story.canonScope==='string'?story.canonScope:JSON.stringify(story.canonScope)));content.append(d)}
 for(const b of list.children)b.setAttribute('aria-pressed',String(b.dataset.id===active));
 if(updateHash)history.replaceState(null,'','#'+encodeURIComponent(active));
 requestAnimationFrame(()=>{reader.scrollTop=0;window.IsekaiNewContent?.markHref('side-stories.html#'+story.id);save()});
}
const people=[...new Map(stories.map(s=>[s.characterId,{id:s.characterId,name:s.character,category:s.category}])).values()];
for(const [category,label] of [['student','生徒たち'],['companion','先生と旅で出会った人たち']]){const group=el('optgroup');group.label=label;for(const p of people.filter(p=>p.category===category).sort((a,b)=>a.id.localeCompare(b.id))){const option=el('option',p.name);option.value=p.id;group.append(option)}if(group.children.length)filter.append(group)}
function renderList(){const q=norm(search.value);const matching=stories.filter(s=>(!filter.value||s.characterId===filter.value)&&(!q||norm(s.character+' '+s.title+' DAY'+s.day+' '+s.summary).includes(q))).sort((a,b)=>(order.value==='oldest'?a.day-b.day:b.day-a.day)||a.character.localeCompare(b.character,'ja'));
 list.replaceChildren();$('storyCount').textContent=matching.length+'話 ／ 全'+stories.length+'話';
 for(const s of matching){const b=el('button',null,'story-card');b.type='button';b.dataset.id=s.id;b.setAttribute('aria-pressed',String(s.id===active));b.append(el('small',s.character+' · DAY '+s.day),el('strong',s.title),el('p',s.summary));b.onclick=()=>{show(s.id);reader.focus()};list.append(b)}
 if(!matching.length)list.append(el('p','該当する物語がありません。人物や検索語を変えてみてください。','story-empty'));updateBadges();
}
function updateBadges(){for(const b of list.querySelectorAll('button')){let badge=b.querySelector('.story-new');const unread=window.IsekaiNewContent?.isUnread('side-stories.html#'+b.dataset.id);if(unread&&!badge){badge=el('span','NEW','story-new');b.prepend(badge)}if(badge)badge.hidden=!unread}}
filter.onchange=renderList;search.oninput=renderList;order.onchange=renderList;
let previous;try{previous=JSON.parse(sessionStorage.getItem(key)||'null')}catch{}
const hash=requested(),initial=stories.find(s=>s.id===hash)||stories.find(s=>s.id===previous?.id)||stories[0];
if(hash&&initial?.id===hash)filter.value=initial.characterId;
renderList();if(initial)show(initial.id);if(!hash&&previous?.id===initial?.id)requestAnimationFrame(()=>{reader.scrollTop=previous.scroll||0});
window.addEventListener('hashchange',()=>{const s=stories.find(s=>s.id===requested());if(s){filter.value=s.characterId;search.value='';renderList();show(s.id,false)}});
window.addEventListener('pagehide',save);window.addEventListener('isekai:new-content-change',updateBadges);
window.IsekaiLiveRefresh?.start({page:'stories',images:()=>[...document.querySelectorAll('#storyContent img')].map(i=>i.src),beforeReload:save});
})();
