(function(){'use strict';
const cases=window.MAKING_CONVERSATIONS||[],reader=document.getElementById('readerTools');
const mount=reader?.querySelector('.view-controls')||document.querySelector('.story .section-label');if(!mount||!cases.length)return;
const el=(tag,text)=>{const n=document.createElement(tag);if(text!=null)n.textContent=text;return n};
const button=el('button','AIとプレイヤーの会話');button.type='button';button.hidden=true;button.id='conversationShortcut';button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-controls','conversationDialog');mount.prepend(button);
const dialog=el('dialog');dialog.id='conversationDialog';dialog.setAttribute('aria-labelledby','conversationTitle');
const heading=el('div');heading.className='conversation-heading';const title=el('h2','AIとプレイヤーの会話');title.id='conversationTitle';const close=el('button','閉じる');close.type='button';heading.append(title,close);
const note=el('p','プレイヤーが何に迷い、AIと相談してどう決めたかを辿ります。「会話原文」は保存履歴からの抜粋、「編集メモ」は記録から整理した説明です。全会話ログではありません。');note.className='conversation-note';
const label=el('label','表示する会話 '),select=el('select');select.setAttribute('aria-label','表示する会話');label.append(select);
for(const [value,text] of [['current','この場面に関連'],['all','すべての会話（先の展開を含む）'],...cases.map(c=>[c.id,c.day+' ／ '+c.title])]){const o=el('option',text);o.value=value;select.append(o)}
const list=el('div');list.id='conversationEntries';dialog.append(heading,note,label,list);document.body.append(dialog);
const chapter=reader?document.getElementById('chapter'):null;
const summaryPreferenceKey='isekai-decision-summary-v1';let summaryEnabled=false;
try{summaryEnabled=localStorage.getItem(summaryPreferenceKey)==='on'}catch{}
let intention=null,intentionText=null,progressLine=null,intentionToggle=null,summaryExpanded=false;
if(chapter){const setting=el('label');setting.id='decisionSummarySetting';const checkbox=el('input');checkbox.type='checkbox';checkbox.id='decisionSummaryToggle';checkbox.checked=summaryEnabled;checkbox.setAttribute('aria-controls','playerDecisionSummary');setting.append(checkbox,el('span','方針・進捗サマリを表示'));mount.append(setting);checkbox.onchange=()=>{summaryEnabled=checkbox.checked;try{localStorage.setItem(summaryPreferenceKey,summaryEnabled?'on':'off')}catch{}renderIntention()}}

if(chapter){intention=el('section');intention.id='playerDecisionSummary';intention.hidden=true;intention.setAttribute('aria-label','プレイヤーの意思決定・要約と攻略進捗');const caption=el('small','プレイヤーの意思決定 · 要約');caption.title='会話に残る迷いと選択理由を整理した編集要約です。';intentionText=el('p');intentionText.id='playerDecisionText';intentionToggle=el('button','思惑を詳しく');intentionToggle.type='button';intentionToggle.id='decisionContextToggle';intentionToggle.hidden=true;intentionToggle.setAttribute('aria-expanded','false');intentionToggle.setAttribute('aria-controls','playerDecisionText');intentionToggle.onclick=()=>{summaryExpanded=!summaryExpanded;intentionText.className=summaryExpanded?'decision-context-expanded':'decision-context-collapsed';intentionToggle.textContent=summaryExpanded?'短く表示':'思惑を詳しく';intentionToggle.setAttribute('aria-expanded',String(summaryExpanded));measureIntention()};progressLine=el('div');progressLine.id='readerProgressSummary';intention.append(caption,intentionText,progressLine);chapter.prepend(intention)}
function measureIntention(){if(!chapter||!intention)return;if(intentionToggle)intentionToggle.hidden=!summaryExpanded&&!(intentionText.scrollHeight>intentionText.clientHeight+1);chapter.style.setProperty('--decision-summary-height',Math.ceil(intention.getBoundingClientRect().height)+'px')}
if(intention&&typeof ResizeObserver!=='undefined')new ResizeObserver(measureIntention).observe(intention);
window.addEventListener('resize',measureIntention);
function renderProgress(){
 if(!progressLine)return false;
 progressLine.replaceChildren();
 const record=window.READER_PROGRESS?.scenes?.[window.READER_FINALE?.progressSources[sceneId]||sceneId];progressLine.hidden=!record;if(!record)return false;
 const displayed=window.STORY_READER_DATA?.scenes.find(s=>s.id===sceneId);
 const day=displayed?.startDay??record.startDay,end=displayed?.endDay??record.endDay??day,percent=record.percent;
 const label=record.oldEstimate?'開始時：'+(record.stage||'攻略を継続中'):percent===null?'攻略目安：未集計':'開始時の攻略目安 約'+percent+'％';
 const status=el('span',label);progressLine.append(status);
 if(percent!==null&&!record.oldEstimate){const bar=el('meter');bar.min=0;bar.max=100;bar.value=percent;bar.setAttribute('aria-label',label);progressLine.append(bar)}
 if(day){const remaining=Math.max(0,100-day),endRemaining=Math.max(0,100-end);const timer=el('span',(day===end?'DAY '+day:'DAY '+day+'–'+end)+' · 期限まで '+remaining+(day===end?'':'→'+endRemaining)+'日');timer.className='reader-time-left';if(remaining<=10)timer.className+=' reader-time-urgent';progressLine.append(timer)}
 else progressLine.append(el('span','序章 · 日数カウント開始前'));
 const note=el('span',record.retrospective?'※振り返り用の推定':record.oldEstimate?'※数値未更新':record.reassessed?'※DAY81の記録で再評価':percent===null?'生存の準備から':'※卓の目安');note.className='reader-progress-note';progressLine.append(note);
 progressLine.title='この話の開始時点の攻略目安です。公式達成率・勝率ではなく、残り日数にも比例しません。残日数は100−DAYの暦日差（当日を含まず、時刻単位の残り時間ではありません）。複数日の話は日付範囲を表示。'+(record.retrospective?' 到達状況：'+record.stage+'。当時の記録に残っていた'+record.recordedPercent+'％を、振り返り用に補った推定です。元の記録は変更していません。':record.oldEstimate?' 古い数値のため到達状況で表示しています。':record.reassessed?' 65％はDAY81に到達状況を再評価した当時の記録です。':'')+(record.source?' 参照：'+record.source:'');
 return true;
}
function renderIntention(){if(!intention)return;const entry=matching().find(c=>c.intentionSummary),summary=entry?.intentionSummary;const hasProgress=renderProgress();intention.hidden=(!summary&&!hasProgress)||!summaryEnabled;intentionText.textContent=summary?summary.join(' '):'';intentionText.title=entry?.intentionSummaryNote||'';summaryExpanded=false;intentionText.className='decision-context-collapsed';intentionText.scrollTop=0;intentionToggle.textContent='思惑を詳しく';intentionToggle.setAttribute('aria-expanded','false');progressLine.append(intentionToggle);measureIntention();requestAnimationFrame(measureIntention)}
let sceneId='';
function currentId(){return reader?(document.getElementById('chapter')?.dataset?.readerScene||document.getElementById('chapterMeta')?.textContent.match(/TURN (1-\d+)/)?.[1]||''):(document.getElementById('turn')?.textContent.trim()||'')}
function matching(){const a=window.READER_FINALE,ids=a?.conversationSources?.[sceneId]||[a?.sourceIds[sceneId]||sceneId];return cases.filter(c=>ids.some(id=>c.scenes.includes(id)))}
function render(){list.replaceChildren();const entries=select.value==='current'?matching():select.value==='all'?cases:cases.filter(c=>c.id===select.value);
 if(!entries.length){list.append(el('p','この場面の会話抜粋はまだありません。上のメニューから、収録済みの場面を選べます。'));return}
 for(const c of entries){const article=el('article');article.className='conversation-case';article.append(el('p',c.day),el('h3',c.title));
 if(c.mode==='transcript'){
 const intro=el('div');intro.className='conversation-context';intro.append(el('h4','この場面へ進む方針（編集メモ）'),el('p',c.decision));article.append(intro);
 const sourceNote=el('p',c.transcriptNote);sourceNote.className='conversation-note';article.append(sourceNote);
 for(const message of c.messages){const bubble=el('section');bubble.className=message.role==='user'?'conversation-user':'conversation-gm';bubble.append(el('h4',(message.role==='user'?'プレイヤー｜会話原文':'Codex・ゲームマスター｜会話原文')+(message.excerpt?'（一部抜粋）':'')));
 const time=el('time',new Date(message.timestamp).toLocaleString('ja-JP',{timeZone:'Asia/Tokyo',month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'}));time.dateTime=message.timestamp;bubble.append(time,el('blockquote',message.text));article.append(bubble)}
 }else{
 const user=el('section');user.className='conversation-user';user.append(el('h4','ユーザー｜実際の発言・抜粋'),el('blockquote',c.quote));
 const gm=el('section');gm.className='conversation-gm';gm.append(el('h4','ゲームマスター｜判断の整理（編集メモ）'),el('p',c.decision));
 article.append(user,gm);
 }
 const detail=el('details'),summary=el('summary','本編への反映を見る（ネタバレあり）'),link=el('a','この会話が反映された本編を読む →');link.href='reader.html#scene-'+c.target;link.onclick=()=>dialog.close();detail.append(summary,el('p',c.result),link);
 article.append(detail);list.append(article)}
 dialog.scrollTop=0;
}
function refresh(){const next=currentId();if(sceneId===next)return;sceneId=next;if(dialog.open)dialog.close();renderIntention();const count=matching().length;button.hidden=count===0;button.textContent='AIとプレイヤーの会話';button.title=count?'この場面の元になった指示と判断を読む':'収録済みの制作の会話を日付で探す'}
button.onclick=()=>{refresh();if(!matching().length)return;select.value='current';render();dialog.showModal();close.focus({preventScroll:true});dialog.scrollTop=0;requestAnimationFrame(()=>{if(dialog.open)dialog.scrollTop=0})};close.onclick=()=>dialog.close();select.onchange=render;
dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()});
const meta=document.getElementById(reader?'chapterMeta':'turn');if(meta)new MutationObserver(refresh).observe(meta,{childList:true,characterData:true,subtree:true});refresh();
})();
