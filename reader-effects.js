(function(){
  'use strict';
  const $=id=>document.getElementById(id),chapter=$('chapter'),panel=$('textPanel'),prose=$('prose'),image=$('chapterImage');
  if(!chapter||!panel||!prose||!image)return;
  const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!=null)n.textContent=text;if(cls)n.className=cls;return n;};
  const preference=(key)=>{try{return localStorage.getItem(key)!=='off'}catch{return true}};
  const state={enabled:preference('isekai-reading-effects-v1'),art:preference('isekai-reading-art-v1')};window.READER_EFFECTS=state;
  const setting=el('details',null,'reader-effect-settings');setting.append(el('summary','読書演出'));
  const settingsBody=el('div',null,'reader-effect-options');setting.append(settingsBody);$('readerTools').append(setting);
  const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  for(const [key,label,storage] of [['enabled','ダイス・結果の演出','isekai-reading-effects-v1'],['art','挿絵を本文に連動','isekai-reading-art-v1']]){
    const labelNode=el('label'),input=el('input');input.type='checkbox';input.checked=state[key];input.id='readerEffect-'+key;labelNode.append(input,el('span',label));settingsBody.append(labelNode);
    input.onchange=()=>{state[key]=input.checked;try{localStorage.setItem(storage,input.checked?'on':'off')}catch{}if(!state.enabled)dismiss();for(const row of prose.querySelectorAll('.reader-dice-actions'))row.hidden=!state.enabled;if(!state.art&&scene?.image)image.src=scene.image;schedule(false);};
  }
  const toast=el('button',null,'reader-dice-toast');toast.type='button';toast.hidden=true;toast.setAttribute('aria-label','ダイスの演出を閉じる');document.body.append(toast);
  const announcement=el('span',null,'outcome-announcement');announcement.setAttribute('role','status');document.body.append(announcement);
  const redMoon=el('button',null,'reader-redmoon-opening');redMoon.type='button';redMoon.hidden=true;redMoon.append(el('small','DAY 20'),el('strong','赤い月'),el('span','いつもの夜が、終わる。'));redMoon.setAttribute('aria-label','赤月の演出を閉じる');document.body.append(redMoon);
  let scene=null,sceneId='',generation=0,raf=null,timers=[],armed=false,seen=new Set(),first=null;
  const faces=['','⚀','⚁','⚂','⚃','⚄','⚅'];
  function dismiss(){for(const timer of timers)clearTimeout(timer);timers=[];toast.hidden=true;redMoon.hidden=true;}
  toast.onclick=dismiss;redMoon.onclick=dismiss;document.addEventListener('keydown',e=>{if(e.key==='Escape')dismiss()});
  function later(fn,ms){const token=generation;timers.push(setTimeout(()=>{if(generation===token)fn()},ms))}
  function showDice(cue){
    dismiss();toast.replaceChildren();toast.dataset.grade=cue.grade||'neutral';
    toast.append(el('small',cue.label));const equation=el('span',null,'reader-dice-equation');
    cue.dice.forEach(value=>{const face=el('span',faces[value],'reader-die');face.setAttribute('aria-label',value+'の目');equation.append(face)});
    const tail=el('span',(cue.modifier>=0?' ＋':' ')+cue.modifier+' ＝ '+cue.total,'reader-dice-total');tail.hidden=!reduced;equation.append(tail);toast.append(equation);
    const judgment=el('strong',cue.verdict||'記録された合計','reader-dice-verdict');judgment.hidden=!reduced;toast.append(judgment,el('small','保存された出目の再現 · クリックで閉じる'));
    toast.hidden=false;
    const complete=()=>{tail.hidden=false;judgment.hidden=false;toast.classList.add('reader-dice-settled');announcement.textContent=cue.label+'。'+cue.dice.join('と')+'、補正'+cue.modifier+'、合計'+cue.total+'。'+(cue.verdict||'');};
    toast.classList.remove('reader-dice-settled');if(reduced)complete();else later(complete,650);later(dismiss,4100);
  }
  function lineReached(node,ratio=.38){
    if(!node||!node.getClientRects().length)return false;
    const p=panel.getBoundingClientRect(),r=node.getBoundingClientRect();const top=Math.max(0,p.top),bottom=Math.min(innerHeight,p.bottom);
    return bottom>top&&r.top<=top+(bottom-top)*ratio;
  }
  function visible(node){if(!node||!node.getClientRects().length)return false;const p=panel.getBoundingClientRect(),r=node.getBoundingClientRect();return r.bottom>Math.max(p.top,0)&&r.top<Math.min(p.bottom,innerHeight)-12;}
  function check(){
    raf=null;if(!scene||chapter.dataset.mode==='image'||scene.supplementType)return;
    const activeResult=document.querySelector('.battle-result-overlay');
    if(state.art&&activeResult&&!activeResult.hidden&&activeResult.dataset.image){
      image.src=activeResult.dataset.image;
    }else if(state.art&&scene.artBeats?.length){const beats=scene.artBeats.filter(b=>b.paragraph===0||lineReached(prose.children[b.paragraph]));const beat=beats[beats.length-1]||scene.artBeats[0];if(image.getAttribute('src')!==beat.image){image.src=beat.image;image.alt=beat.label+'の挿絵';}}
    if(!state.enabled||!armed||(activeResult&&!activeResult.hidden))return;
    if(sceneId==='1-38'&&!seen.has('redmoon')&&lineReached(prose.children[6])){seen.add('redmoon');dismiss();redMoon.hidden=false;announcement.textContent='二十日目、赤い月。';later(dismiss,5000);return;}
    const cues=window.READER_DICE_CUES?.[sceneId]||[];
    const reached=cues.filter(c=>!seen.has(c.key)&&lineReached(prose.children[c.paragraph]));
    if(!reached.length)return;
    // Do not queue all dice after a large scroll: only the latest visible check.
    for(const c of reached)seen.add(c.key);const cue=reached[reached.length-1];if(visible(prose.children[cue.paragraph]))showDice(cue);
  }
  function schedule(fromScroll=true){if(fromScroll)armed=true;if(raf!==null)cancelAnimationFrame(raf);raf=requestAnimationFrame(check);}
  function addReplayButtons(){
    for(const cue of window.READER_DICE_CUES?.[sceneId]||[]){
      const paragraph=prose.children[cue.paragraph];if(!paragraph)continue;
      let row=paragraph.querySelector('.reader-dice-actions');
      if(!row){row=el('span',null,'reader-dice-actions');row.hidden=!state.enabled;paragraph.append(row)}
      const button=el('button','⚄ '+cue.label+'の判定を再生','reader-dice-replay');button.type='button';
      button.onclick=()=>{if(!state.enabled)return;seen.add(cue.key);showDice(cue)};row.append(button);
    }
  }
  function render(){
    const id=chapter.dataset.readerScene;if(id===sceneId&&first===prose.children[0])return;
    generation++;dismiss();sceneId=id;first=prose.children[0];seen=new Set();armed=false;scene=window.STORY_READER_DATA.scenes.find(s=>s.id===id);if(!scene?.supplementType)addReplayButtons();schedule(false);
  }
  new MutationObserver(render).observe($('chapterMeta'),{childList:true,subtree:true,characterData:true});
  new MutationObserver(()=>{if(chapter.dataset.mode==='image')dismiss();else schedule(false)}).observe(chapter,{attributes:true,attributeFilter:['data-mode']});
  const result=document.querySelector('.battle-result-overlay');if(result)new MutationObserver(()=>{if(!result.hidden)dismiss();schedule(false)}).observe(result,{attributes:true,attributeFilter:['hidden']});
  panel.addEventListener('scroll',()=>schedule(),{passive:true});window.addEventListener('scroll',()=>schedule(),{passive:true});window.addEventListener('resize',()=>schedule(false));render();
})();
