(function(){'use strict';
const data=window.READER_CONDITIONS?.scenes,prose=document.getElementById('prose'),meta=document.getElementById('chapterMeta');
if(!data||!prose||!meta)return;
const el=(tag,text)=>{const n=document.createElement(tag);if(text!=null)n.textContent=text;return n};
const panel=el('details');panel.id='diceConditions';panel.hidden=true;
const summary=el('summary','ダイスの事前条件を見る');const content=el('div');content.className='dice-conditions-content';panel.append(summary,content);
const quote=document.getElementById('quote');(quote||prose).after(panel);
const labels={scene:'場面',day:'作中の日付',status:'保存時の状態',checks:'判定項目',specification:'判定の仕様',declaredBeforeRolling:'先に定めた条件',rules:'判定ルール',thresholds:'出目ごとの条件',bands:'出目ごとの条件',outcomes:'分岐条件',modifier:'補正値',modifiers:'補正の根拠',modifierByPhase:'段階ごとの補正',basis:'判定の根拠',reason:'理由',label:'判定名',id:'識別名',task:'対象',action:'行動',method:'判定方法',roll:'判定式',dice:'ダイス',check:'判定',party:'参加者',main:'攻略組',teacher:'先生',A:'探索A隊',B:'探索B隊',AB:'探索二隊',C:'第3チーム',base:'拠点組',intent:'方針',goal:'目標',scope:'対象範囲',route:'経路',travel:'移動',preparation:'準備',phases:'戦闘の段階',boss:'ボスへの対処',victory:'勝利条件',phaseVictory:'各段階の突破条件',failure:'失敗時',retreat:'撤退条件',withdrawal:'撤退',natural2:'自然出目2の場合',naturalTwo:'自然出目2の場合',important:'重要な条件',cost:'消費',costs:'消費',resources:'物資',reward:'報酬条件',onVictory:'勝利した場合',onFailure:'失敗した場合',stopOnNewDeath:'新たな死者が出たら停止',noBossBattle:'今回はボス戦を行わない',randomChecks:'ランダム判定',reasonNoDice:'ダイスを振らない理由',savedBeforeRoll:'判定前に保存',beforeRoll:'判定前に保存',declaredBeforeRoll:'判定前に宣言',finish:'終了条件',end:'区切り',source:'参照記録',sources:'参考資料',sourceScene:'参照した場面',sourceHash:'参照記録の照合値',food:'食料',water:'水',weather:'天候',support:'支援',clara:'クララ',horse:'軍馬',growth:'育成',training:'訓練',budget:'予算',equipment:'装備',loot:'入手条件',grace:'祝福',recovery:'回復・立て直し',conditional:'条件付きの処理',executeIf:'実行条件',10:'10',success:'成功時',failure:'失敗時',successAt:'成功の基準',else:'その他の場合',fixedBeforeScene:'場面の前に固定した内容',fixed:'固定事項',unchanged:'変更しない事項',melinaCheck:'メリナへの呼びかけ',chests:'宝箱',rule:'ルール',resourceRule:'物資の扱い',trainingResourceRule:'育成と物資の扱い',rulesFixedBeforeDraw:'抽選前に固定したルール'};
function valueNode(v,depth=0){
 if(v===null)return el('span','なし');
 if(typeof v==='boolean')return el('span',v?'はい':'いいえ');
 if(Array.isArray(v)){const list=el('ol');for(const item of v){const li=el('li');li.append(valueNode(item,depth+1));list.append(li)}return list}
 if(typeof v==='object'){const dl=el('dl');for(const [k,value] of Object.entries(v)){const dt=el('dt',labels[k]||k),dd=el('dd');dd.append(valueNode(value,depth+1));dl.append(dt,dd)}return dl}
 return el('span',String(v));
}
// Summaries use only the saved pre-roll conditions, never the rolled result.
function percent(n,total=36){return (100*n/total).toFixed(n/total<.01?2:1).replace(/\.0$/,'')+'％'}
function count2d6(test){let n=0;for(let a=1;a<=6;a++)for(let b=1;b<=6;b++)if(test(a+b))n++;return n}
function paragraph(parent,title,text){if(!text)return;const p=el('p');p.append(el('strong',title+'：'),el('span',text));parent.append(p)}
function odds(parent,rows){const list=el('ul');list.className='dice-readable-odds';for(const [name,prob,meaning] of rows){const li=el('li');li.append(el('strong',name+' · 約'+prob),el('span',meaning));list.append(li)}parent.append(list)}
function fireGiantDigest(parent){
 paragraph(parent,'今回の作戦','13人で弱点を交代攻撃。足首への攻撃 → 炎への対応 → 最後の攻め、という3つの山場を判定します。');
 paragraph(parent,'各山場の見込み','準備と連携を有利さ「＋4」として反映。サイコロ2個の合計に足して、次の3段階に分けます。');
 odds(parent,[
  ['大きく前進',percent(count2d6(s=>s+4>=10)),'攻略の手応えを2点獲得。'],
  ['消耗しながら前進',percent(count2d6(s=>s+4>=7&&s+4<=9)),'負傷や回復の消費と引き換えに1点獲得。'],
  ['足踏み・危険',percent(count2d6(s=>s+4<=6)),'得点なし。立て直しの判定を行い、負傷や死亡の分岐へ。']
 ]);
 paragraph(parent,'勝敗の決まり方','3つの山場で合計5点以上なら撃破。4点なら一度だけ追加の攻めができ、約'+percent(count2d6(s=>s+3>=10))+'で最後の1点を獲得。それ以外は撤退です。点数は敵のHPではなく、攻略が進んだ度合いです。');
 paragraph(parent,'最悪の分岐','最初の2個が両方「1」だったときだけ、立て直しでもう一度振ります。そこでも両方「1」なら、その局面で指定された人が死亡し進行を停止。この二重の凶運は、判定1回あたり約'+percent(1,1296)+'（1,296回に1回）です。');
 paragraph(parent,'誰が危険を負うか','足首への攻撃と追加の攻めは先生、炎への対応は健太、最後の攻めは直人。生徒の被害を後から都合よく入れ替えない条件です。');
 const note=el('p','上の確率は各山場の判定についてのものです。ボス戦全体の勝率や、戦闘全体で誰かが死亡する確率ではありません。公平な6面サイコロを、互いに独立に振る前提で計算しています。');note.className='muted';parent.append(note);
}
const readableNames={training:'育成',recon:'先生の偵察',teacher:'先生の行動',mine:'坑道での採取',base:'拠点の生活・調達',supply:'物資の調達',shelter:'拠点の防衛準備',wolves:'狼への対処',bats:'飛行する敵への対処',entrance:'入口の突破',graveyard:'墓地の探索',waterwheel:'水車の通過',ankle:'足首への攻撃',flameTransition:'炎への対応',finish:'最後の攻め',weather:'天候'};
function shortText(s){return s.length>240?s.slice(0,240)+'…':s}
function japaneseText(v){return typeof v==='string'&&/[ぁ-んァ-ヶ一-龠]/.test(v)}
function digest(parent,doc){
 const v=doc.value;
 const box=el('div');box.className='dice-readable-summary';parent.append(box);
 if(doc.kind==='no-roll'||v.reasonNoDice){paragraph(box,'今回はサイコロを振りません',v.reasonNoDice||'確定した行動を描く場面です。');return}
 if(doc.source==='turn-1-92-conditions.json'){fireGiantDigest(box);return}
 if(doc.source==='turn-1-106-conditions.json'||doc.source==='turn-1-108-conditions.json'){
  const final=doc.source.includes('108');
  paragraph(box,'勝負の仕組み',final?'2連戦です。各ボスで3つの山場を判定し、合計5点以上の手応えを得れば突破。最初のボスを倒せなければ、次には進めません。':'3つの山場を判定し、合計5点以上の手応えを得れば突破です。');
  paragraph(box,'出目の意味','補正後の合計が10以上なら大きく前進して2点、7〜9なら1点、6以下なら0点。負傷や特殊な出目による例外もあります。');
  paragraph(box,'危険を承知の追加攻勢','3〜4点で届かず、先生が生きている場合は追加の攻めへ。攻めの成否とは別に先生の危険を判定し、補正なしの2個の合計が2〜4なら死亡する条件です。その確率は約'+percent(count2d6(s=>s<=4))+'。追加攻勢を行う場合だけの危険で、戦闘全体の死亡率ではありません。');
  paragraph(box,'確率をひとまとめにしない理由','死亡による補正の変化や追加攻勢があるため、各判定の数字をそのまま「ボスに勝てる確率」とは扱えません。細かな分岐は下の原文に残しています。');return;
 }
 let overview=false;
 for(const key of ['action','goal','intent','plan','policy','route'])if(japaneseText(v[key])){paragraph(box,'何をするか',shortText(v[key]));overview=true;break}
 const checks=Array.isArray(v.checks)?v.checks.filter(x=>x&&typeof x==='object'):[];
 const named=checks.map((c,i)=>japaneseText(c.label)?c.label:japaneseText(c.goal)?c.goal:readableNames[c.type]||readableNames[c.id]||readableNames[c.id?.split('-')[0]]||'判定'+(i+1));
 if(named.length){paragraph(box,'判定すること',[...new Set(named)].slice(0,4).join('／')+(new Set(named).size>4?' ほか':''));overview=true}
 if(!overview)paragraph(box,'読み方','この場面で先に決めた「行動の成否」と「失敗時の扱い」を確認できます。条件は場面ごとに異なります。');
 // Only compute odds for explicit, fixed 2d6 checks with their own complete bands.
 // Special rolls, changing modifiers and shared/implicit rules stay in the original.
 const raw=JSON.stringify(v);
 let shown=0;
 for(const c of (checks.length?checks:[v])){
  const bands=c.thresholds||c.outcomes||c.bands;
  if(!bands||typeof bands!=='object'||Array.isArray(bands))continue;
  const rows=Object.entries(bands).filter(([,x])=>japaneseText(x));
  if(!rows.length)continue;
  const modifier=Number.isFinite(c.modifier)?c.modifier:/no modifiers/.test(c.method||'')?0:null;
  const fixed=modifier!==null&&/2d6/i.test(c.dice||c.method||'')&&!/natural2|naturalTwo|自然2|自然出目|baseModifier|dynamic|補正.*変|補正.*減|補正.*増|補正.*相殺|追加補正/i.test(raw);
  const predicates=rows.map(([key])=>{const k=key.replace(/[–−〜～]/g,'-');let m;if((m=k.match(/^(\d+)(?:\+|以上)$/)))return s=>s+modifier>=+m[1];if((m=k.match(/^(\d+)-(\d+)$/)))return s=>s+modifier>=+m[1]&&s+modifier<=+m[2];if((m=k.match(/^(?:<=(\d+)|(\d+)以下)$/)))return s=>s+modifier<=+(m[1]||m[2]);return null});
  const covered=fixed&&predicates.every(Boolean)&&Array.from({length:11},(_,i)=>i+2).every(s=>predicates.filter(p=>p(s)).length===1);
  if(shown===0)box.append(el('h4','出目によって、どう変わる？'));
  if(checks.length)box.append(el('p',named[checks.indexOf(c)]));
  const list=el('ul');list.className='dice-readable-branches';
  rows.forEach(([key,val],i)=>{const p=covered?'約'+percent(count2d6(predicates[i]))+' · ':'';list.append(el('li',p+shortText(val)+'（'+key+'）'))});box.append(list);
  if(covered){const note=el('p','この行動1回の確率です。6面サイコロ2個の合計'+(modifier?'に'+modifier+'を加える':'で判定する')+'条件から計算しています。');note.className='muted';box.append(note)}
  if(++shown===2)break;
 }
 if(!shown){paragraph(box,'数字の読み方','「2d6」は6面サイコロを2個振って合計すること。「＋4」などは、準備や連携による有利さです。合計を条件表に当てはめて、前進・負傷・撤退などを決めます。')}
 if(/natural2|naturalTwo|自然2|自然出目/.test(raw))paragraph(box,'特別な危険','サイコロが両方「1」になった場合には、通常の点数とは別の分岐があります。対象者や立て直し・死亡の条件は、下の原文で確認できます。');
 if(checks.length>shown&&shown)box.append(el('p','その他の判定や消費する物資は、下の詳しい条件で確認できます。'));
}
let scene='';
function render(){const next=document.getElementById('chapter')?.dataset?.readerScene||meta.textContent.match(/TURN (1-\d+)/)?.[1]||'';if(next===scene)return;scene=next;panel.open=false;content.replaceChildren();const a=window.READER_FINALE,ids=a?.conditionGroups?.[scene];const entries=ids?ids.map(id=>data[id]).filter(Boolean):[];const entry=a?.suppressConditions?.includes(scene)?null:ids?{documents:entries.flatMap(e=>e.documents),auditNote:entries.map(e=>e.auditNote).filter(Boolean).join(' ／ ')}:data[a?.conditionSources[scene]||scene];panel.hidden=!entry;if(!entry)return;
 const note=el('p','この卓で保存された判定条件です。原作ゲームの確率・ダメージ計算ではありません。失敗時の分岐も含みます。');note.className='muted';content.append(note);
 if(entry.auditNote){const warning=el('p','記録の補足：'+entry.auditNote);warning.className='dice-condition-audit';content.append(warning)}
 for(const doc of entry.documents){const section=el('section');section.className='dice-condition-document';const name=doc.source.includes('base-')?'拠点組の条件':doc.source.includes('lower-team')?'探索隊の条件':doc.source.includes('additional')?'追加行動の条件':doc.kind==='no-roll'?'判定を行わない場面':'保存された条件';section.append(el('h3',name));
 if(doc.kind==='extracted'){const explanation=el('p','独立した事前条件ファイルではなく、当時の判定記録から条件欄を抜粋しています。結果の出目は含めていません。');explanation.className='muted';section.append(explanation)}
 digest(section,doc);
 const original=el('details');original.className='dice-condition-original';original.append(el('summary','詳しい判定条件・原文を見る'),valueNode(doc.value));
 const source=el('small','出典：'+doc.source);source.className='dice-condition-source';original.append(source);section.append(original);content.append(section)}
}
new MutationObserver(render).observe(meta,{childList:true,characterData:true,subtree:true});render();
})();
