/* Reading-edition pacing. Recorded outcomes and rolls are retained. */
(function(){
  'use strict';
  const d=window.STORY_READER_DATA,a=window.READER_FINALE;if(!d||!a)return;
  const get=id=>d.scenes.find(s=>s.id===id), original={};
  for(const n of [35,36,37,38,40,41,42,43]){const s=get('1-'+n);original[s.id]={...s,text:s.text.slice()};}
  const insert=(base,s)=>{d.scenes.splice(d.scenes.indexOf(base)+1,0,s);a.sourceIds[s.id]=base.id;};
  const council=get('1-35'),c=original['1-35'].text;
  council.text=[...c.slice(1,5),
    'なぜ、私にだけ言うのだろう。全員に同じ言葉で告げてもらえれば、と思った。けれど、その理由は聞けていない。女神に伝えられたことと、私が皆へ伝えるべきことは、同じ順番で並ばなかった。',
    '期限を知れば、進む理由を分かってもらえるかもしれない。待っていれば助かる、という望みだけを持たせずに済む。だが、さっき血のついた袖を見た者へ「百日しかない」と言えば、無理をして傷を隠す者が出ないか。怖くて立てない者へ、逃げる場所までないと思わせないか。',
    '黙っていれば、今夜は眠れるかもしれない。けれど、事情を知らせずに危険を選ばせたら、それは本当に皆が選んだことになるのか。後から知った時、次の私の言葉を信じてもらえるだろうか。私は日付を伏せた手帳を、一度閉じた。まず、今日の傷を次に繰り返さないための話をしなければならなかった。',
    ...c.slice(5,16),
    c[16].replace('今は、一対一でも戦えるだけの力を身につけた。','今は、離れた通常兵への対処と、危なくなった時に退く動きを身につけた。'),c[17]
  ];council.readingRecords=[{label:'TURN1-35 の当時の記録',paragraphs:c}];
  const victory=get('1-36'),v=original['1-36'].text;
  victory.text=[...v.slice(0,3),
    '大地が、買ったばかりの鎖帷子の裾を直した。午前と同じ傷を怖がっていることを、隠す必要はなかった。健太が横に並び、盾一枚分の隙間を空ける。下がる者が通れる幅だ。朝よりレベルが上がったわけではない。さっき帰ってきてから、皆で直した場所だった。',
    ...v.slice(3,7),
    '誰かが「終わった」と言った。すぐには歓声にならなかった。結衣が一人ずつ返事を求め、名前の数が揃う。最後に先生が頷いた時、張りつめていた肩が、ばらばらに落ちた。\n「……今度は、帰ってきただけじゃないんだな」\n陽太が盾の向こうを見る。さっきまで近づけなかった荷車へ、味方が歩いていく。',...v.slice(7)
  ];
  a.outcomeOverrides['1-36']={from:'1-36',encounter:'boss',changes:[['陣地','途中で撤退 → 十体の陣地を制圧'],['帰還','全33人／新しい死者0'],['持ち帰った道具','君主軍の大剣・フレイル・砥石の小刀・嵐踏み']]};
  const supper=get('1-37');supper.text=supper.text.slice();supper.text.splice(6,0,
    '「帰ったら、肉を数えずに食べような」\n誰かの声に、空いた器がいくつか上がった。隼人が「言ったな、先生」とこちらを見る。私は、いつ帰れるとは言えなかった。それでも、その食事の席に誰がいるかだけは、迷わず答えた。\n「全員でな」\n今夜、増えた肉は一切れもない。けれど、食べ終わったあとに話すことができた。');
  const red=get('1-38'),r=original['1-38'].text;
  red.text=r.slice();red.text[5]+='\n昨日の勝ち方を話す声が、寝床の端にまだ残っていた。下がる班を守れば、残る者が戦える。手順が一つ分かった。その安心を、私も手放したくなかった。';
  red.text[9]+='\n昨日、皆で囲んだ騎士とは、重さが違う。勝ったばかりの身体は同じで、盾も同じなのに、それを並べた先に生徒が立っているところを想像した途端、息が止まった。何人いれば受け止められるのか。頭に浮かんだ数を、私はすぐに消した。';
  red.text[10]+='\n頬に当たる赤は、焚き火の暖かさを持っていなかった。息を吸う音まで外へ漏れそうで、誰も深く吸えない。まだ壁は破られていない。その「まだ」の幅だけが、教会の中で細くなっていった。';
  // Three movements of preparation; no extra days, fights, or rolls.
  const prep=get('1-40'),t=original['1-40'].text;
  prep.title='皆に伝える、百日目。';prep.endDay=24;prep.dayLabel='DAY 21–24';prep.text=[...t.slice(0,2),
    '先生は、隼人の「先に知りたかった」を聞き返さなかった。責められたくなくて黙っていたのではない、と弁解したくなる。その言葉は飲み込んだ。知らないまま過ごした日が、皆にもあったことは変わらない。\n「急げとだけ言うつもりはない。残って守る役も、戻す役も要る。私が倒れた時にも、君たちが決められるように、分かっていることを渡しておく」',...t.slice(2,8)
  ];prep.cards=[];prep.quote='急げとだけ言うつもりはない。残って守る役も、戻す役も要る。';
  const practice={...original['1-40'],id:'1-40-practice',sourceTurn:'1-40',title:'弾く練習より、戻る練習。',startDay:25,endDay:28,dayLabel:'DAY 25–28',text:[t[8],
    '「いま、先生に向かっていません」\n花の声で、私は盾を振りかけた手を止めた。練習棒を持つ相手は、後ろの弓手へ顔を向けていた。自分が避ければ終わりではない。私から離れた一撃は、誰かへ届く。盾役は、その一撃を全部受けるための壁ではなかった。弓を下ろした花が逃げる、その道を塞がないためにいる。',
    t[9],'「弾けたから、成功ですか」\n蓮の問いに、私は肩で息をしながら首を振った。\n「皆が退く間も立っていられたら、成功にしよう」\n派手に剣を返す動きより、盾を戻して次の足場へ移る動きを、もう一度確かめた。',...t.slice(10)],readingRecords:[{label:'TURN1-40 の詳しい経過',paragraphs:t}]};
  insert(prep,practice);a.suppressContext.push('1-40');a.contextSources[practice.id]='1-40';a.conditionSources[practice.id]='1-40';a.suppressConditions=[...(a.suppressConditions||[]),'1-40'];a.progressSources[practice.id]='1-40';
  for(let day=21;day<=28;day++)d.byDay[day]={id:day<=24?'1-40':practice.id,covered:true};
  const duel=get('1-41'),b=original['1-41'].text;
  duel.title='金色の騎士の、間合いへ。';duel.text=b.slice(0,8);duel.quote='自分が避ければ終わりではない。';duel.cards=[];
  const clash={...original['1-41'],id:'1-41-clash',sourceTurn:'1-41',title:'振り向け。今度は、俺の方へ。',phase:'ツリーガード · 後半',text:[b[8],
    '私を見るはずの兜が、向こうへ向いていた。弓手に近づかれたらどうする。その問いへ、何度も図の上で答えた。いまは線の代わりに、花がいる。後ろへ動く大地の肩が、馬の胸より小さい。盾を構えて止まれとは、言えなかった。',b[9],
    '土が、目の高さまで来た。盾を取り落としてはいない。立てる。赤い瓶は、まだある。私はそれだけを順に確かめた。あと一度うまく弾けば、と考えるのをやめた。次に弾けない攻撃が来ても、帰る足を残さなければならない。',...b.slice(10)]};
  insert(duel,clash);a.suppressContext.push('1-41');a.contextSources[clash.id]='1-41';a.conditionSources[clash.id]='1-41';a.progressSources[clash.id]='1-41';a.outcomeOverrides['1-41']=null;a.outcomeOverrides[clash.id]={from:'1-41',changes:[['消耗','矢56本／先生の赤瓶2回'],['被害','先生に打撲・擦過傷／生徒の新負傷0'],['救援用の祝福','未解放のまま温存']]};
  const horse=get('1-42'),h=original['1-42'];
  horse.title='身体は休め、道具は手入れを。';horse.text=[h.text[0],
    '騎士のいなくなった草地へ、花たち六人が戻った。馬はまだいた。捕まえて乗るのではなく、手を近づけ、相手が離れたら待つ。戻ってきた花の報告は、たった一つだった。\n「手に、鼻をくっつけてくれました」\n美咲が付け足す。「連れて帰っていい、ではないですけどね」\n名前は、まだつけなかった。',...h.text.slice(9,13)];horse.cards=h.cards;horse.quote='休めば直るものと、手を掛けなければ直らないものがある。';
  const side={id:'hana-warhorse-first-touch',character:'水野 花',title:'まだ、名前はつけない。',day:29,scene:'1-42',summary:'金色の騎士が去ったあと、草地に残った馬との最初の接触。',paragraphs:h.text.slice(1,9),image:h.image,imageMode:'single',readMinutes:3};
  if(typeof SIDE_STORIES!=='undefined'&&!SIDE_STORIES.stories.some(x=>x.id===side.id))SIDE_STORIES.stories.push(side);
  const context=window.READER_CONTEXT?.scenes;if(context){context['1-42']={...(context['1-42']||{}),stories:[...(context['1-42']?.stories||[]),{id:side.id,title:side.title,character:side.character,day:29,summary:side.summary,href:'reader.html#scene-1-42'}]};}
  a.outcomeOverrides['1-43']={from:'1-43',quiet:true};
  // DAY20 is an ominous night, not a completed defense battle.
  a.outcomeOverrides['1-39']=null;
  d.scenes=d.scenes.filter(s=>s.id!=='1-43-rules');d.redirects={...d.redirects,'1-43-rules':'1-43'};
  window.READER_FIRST_VICTORY={original};
})();
