/* Reading edition only. Historical rolls, chronology and inventory remain in the source records. */
(function () {
  'use strict';
  const data = window.STORY_READER_DATA, a = window.READER_FINALE;
  if (!data || !a || window.READER_EARLY_EDITING) return;
  const find = id => data.scenes.find(s => s.id === id);
  const originals = {};
  for (const n of [14,15,18,19,20,21,22,23,24,26,27,28,29,30]) {
    const s = find('1-'+n); if (s) originals[s.id] = {...s, text: s.text.slice()};
  }
  data.redirects = {...data.redirects, '1-15':'1-14', '1-20':'1-19', '1-24':'1-23'};
  a.conversationSources = {...a.conversationSources, '1-14':['1-14','1-15'], '1-19':['1-19','1-20'], '1-23':['1-23','1-24']};
  a.conditionGroups = {...a.conditionGroups, '1-14':['1-14','1-15'], '1-23':['1-23','1-24']};
  const keepDetail = (scene, ids) => { scene.readingRecords = ids.map(id=>({label:'TURN '+id+' の詳しい経過', paragraphs:originals[id].text})); };
  const merged = find('1-14');
  if (merged) {
    const x=originals['1-14'].text,y=originals['1-15'].text;
    Object.assign(merged,{title:'帰ってくるのも、斥候の仕事。',sourceTurn:'1-14〜1-15',text:[x[0],x[2],x[3],x[4],x[5],y[0],y[1],y[2],y[3],y[4],y[5],y[6]],quote:originals['1-15'].quote,cards:[]});
    keepDetail(merged,['1-14','1-15']);
  }
  // Put the first map after the merchant has actually explained it. Keep its URL stable.
  const map = find('1-13-map'), merchant = find('1-16');
  if (map && merchant) {
    data.scenes.splice(data.scenes.indexOf(map),1);
    data.scenes.splice(data.scenes.indexOf(merchant)+1,0,map);
    map.sourceTurn='1-16';a.sourceIds[map.id]='1-16';
    map.title='カーレの枝が、道をつなぐ。';
  }
  const planning = find('1-18');
  if (planning) {
    const cast={...planning,id:'1-18-cast',title:'最初に、頼る顔。',sourceTurn:'1-18',phase:'人物紹介 · 出発前',supplementType:'cast',image:'assets/reader-column-first-cast-v1.jpg',text:[],quote:'',cards:[]};
    data.scenes.splice(data.scenes.indexOf(planning),0,cast);a.suppressContext.push(cast.id);
    const t=originals['1-18'].text;
    planning.text=[t[0],t[1],t[2],t[3],t[4],t[5],t[6],t[7],t[8],t[9]];
    planning.paragraphLabels={0:'出発前｜役割と、戻る場所',4:'同じ午後｜監視班',6:'同じ午後｜水汲み班',8:'16:00｜合流地点'};
    keepDetail(planning,['1-18']);
  }
  const water = find('1-19');
  if (water) {
    Object.assign(water,{title:'水面までより、帰り道。',sourceTurn:'1-19〜1-20',text:[
      '空の桶を見ながら、先生は佑真へ頼んだ。水辺まで何分か。水を持った帰りには、何分かかるのか。佑真が教会へ往復し、カーレの答えを持ち帰った時には、16:20になっていた。日暮れまで、あと一時間四十分ほどしかない。',
      '岸まで慎重に歩いて二十〜三十分。汲むのに五〜十分。重くなった桶を持ち、帰りにも二十〜三十分。近くに見える水面への一往復が、四十五〜七十分になる。誠の桶には四リットルしか入らない。三十三人が一度飲んで終わりでは、明日も同じ所で困る。',
      '先生たちは追跡がないことを確かめ、教会へ戻った。今度は地図ではなく、カーレの水袋を指した。\n「その水は、どこで汲んだものですか」\n「西岸に、荷を下ろせる石積みがある。俺はそこを使う」\n欲しかったのは湖の名前ではなかった。実際に桶を下ろし、また背を向けて帰れる、一か所だった。',
      '「俺も水を足しておきたい。今日は一往復なら、案内の代金はいらない」\nカーレは、荷を持つ速さに合わせること、危険が見えれば止まることを条件に同行を引き受けた。行ったことのある人が加わった。それでも、皆を守る壁が道にできたわけではない。',
      '岸の上に座れる草地はあるが、屋根も祝福もないと聞き、蓮は地図の教会の丸を消さなかった。\n「水場へ行くのと、ここを捨てるのは別だな」\n先生は頷いた。16:35。出発するか、明るい朝を待つか。空の水袋と、傾いた日を見比べた。'
    ],quote:'近い水面でも、皆が飲むためには一往復が要る。',cards:[]});
    keepDetail(water,['1-19','1-20']);
  }
  const night=find('1-21');
  if(night)night.image="assets/reader-first-night-v1.jpg";
  if(night){
    const t=originals['1-21'].text;
    night.text=[t[0],t[1],t[2],t[3],t[4],
      '火の明るい所から顔を上げると、星があった。屋根の穴から見えるのではない。屋根そのものが、なかった。美咲は膝に抱えた鞄を少し強く引き寄せた。学校から持ってきた物なのに、肩紐へ触れる指だけが冷えていた。',
      '「……学校で寝ちゃった時みたいに、起きたら教室だったらいいのに」\n隣の結衣は、すぐには大丈夫と言わなかった。自分の上着の裾を引き、石の上で座り直す。\n「朝になったら、まず人数を数えよう」\n美咲は小さく頷いた。帰れる約束より、その時も誰かが名前を呼んでくれることが、今は少しだけ頼りになった。',
      '入口に近い場所で、隼人が外を見ていた。昼間より口数が少ない。薪が弾けるたび、誰かの肩が動く。彼は一度振り返り、火から離れすぎた鞄を足元へ寄せた。\n「見張ってるから。寝られるやつは寝とけ」\n言い方はいつも通りだった。そこを笑う者はいなかった。',
      '私は出席簿の代わりに、澪の書いた名前を辿った。三十二人。火の向こうにいる顔と、紙の上の文字を合わせる。ゲームでなら、夜を越す操作は一つだった。ここでは、水を分ける相手がいて、眠れない者がいて、明日の番を待つ者がいる。誰を先に強くするかより前に、全員の朝を用意しなければならなかった。',
      '「先生は、寝ないんですか」\n結衣に聞かれ、私は紙から顔を上げた。眠らずにいれば守れるわけではない。疲れたまま、次の判断を間違える方が怖かった。\n「次の交代で寝る。変な音がしたら、遠慮なく起こして」\nそれだけを約束して、鞄を枕にした。',
      '瞼を閉じても、黄金の枝が残った。遠い家の天井ではなく、星のある暗さが、すぐ上に広がっている。誰かが寝返りを打ち、その音が止むまで私は息をひそめていた。',t[6],t[7]
    ];
    night.quote='朝になったら、まず人数を数えよう。';night.cards=[];keepDetail(night,['1-21']);
  }
  const firstWater=find('1-22');
  if(firstWater){const t=originals['1-22'].text;firstWater.text=[t[0],t[1],t[2],t[5],t[6],t[7], '七十五分で原水四リットル。教会へ置かれた桶は、まだ飲める水の備蓄ではない。それでも、先生は足場へ続く線を、地図で初めて濃くなぞれた。一回、行って帰ってきた。その小さな違いから、朝の仕事が始まった。'];firstWater.cards=[];keepDetail(firstWater,['1-22']);}
  const work=find('1-23');
  if(work){Object.assign(work,{title:'暮らしをつくった、一日。',sourceTurn:'1-23〜1-24',phase:'日々の回想',recap:true,recapSummary:'水の往復を覚え、失敗した狩りの合図を直す。最初の食材を持ち帰っても、屋根と備蓄はまだ足りない。',text:[
    '朝、桶の水を小鍋へ移した。待ち、冷まし、少しずつ配る。飲めば、また桶が空く。教会に腰を落ち着けるとは、同じ仕事を何度でも続けられるようにすることだった。',
    '【水汲み：5＋6＋2＝13】二度目はカーレがいない。八人は昨日教わった足場を使い、途中の二人が連絡をつないだ。六十分で四リットル。桶を置くまでが、一つの仕事になった。',
    '狩りは、そうはいかなかった。【狩猟：3＋1＋2＝6】最初の矢だけが先に飛び、鹿は逃げた。花が弓を下ろす。\n「狙うだけじゃなくて、撃つ合図が必要だったね」\n午後、同じ草地へ戻る前に、射手と逃げ道を見る組を分けた。やり直したのは結果ではなく、手順だった。',
    '【狩猟：6＋3＋3＝12】合図を待てた二度目には、小型の鹿二頭を持ち帰った。運ぶ隼人の肩にも、制服の袖にも土がつく。美咲たちはカーレに確かめた葉と根を分け、水辺の班は浅場で小魚四匹を確保した。ようやく、今夜何を食べるかを話せた。',
    '【小屋：1＋3＋2＝6】屋根はできなかった。楓の選んだ枝へ美咲が布を当て、尖った所を指す。「これじゃ、穴が開く」。骨組みを直し、石をどけ、また材料を選ぶ。暮らしの準備には、片づけたと思った所へ戻る仕事もあった。',
    '昼過ぎ、飲用水は四リットル残った。矢は四十三本。食材はあるが、長く保存する支度はない。明日の分まで安心できたわけではなかった。それでも、朝より具体的な手間と、頼める相手の顔が増えていた。\n「給食って、こんなにありがたかったんだね」\n美咲の声に、獲物を下ろした隼人が答えた。\n「とりあえず、今日は何か食えるだろ」',
    '十五時。陽太は携帯罠具をカーレに見せた。普通の罠を増やせれば狩りを助けられるかもしれない。だが、丈夫な縄も留め具も、まだ足りない。先生は新しい案を残し、まず今日の食材を調理する方へ皆を戻した。'
  ],quote:'同じ仕事を繰り返せることが、少しずつ生きる足場になった。',cards:[]});keepDetail(work,['1-23','1-24']);a.contextSources[work.id]='1-24';}
  const combat=find('1-27');
  if(combat){combat.text=[...combat.text];combat.text[0]='三日間の観測で、最低九人と、隠れた先から来る増援の可能性が見えた。では、離れた一人なら、こちらはどこまでできるのか。先生が決めたのは、人数を減らして腕試しすることではなかった。盾、槍、遠距離、回復、観測、指揮、伝令――退くための役も揃えた十二人で、通常兵一人への連携を確かめる。先生は教会に残り、二十一人で警戒と生活を続ける。';}
  const disguise=find('1-28');
  if(disguise){disguise.text=[...disguise.text];disguise.text[0]='兵の服を着て近づけないか。正面から大勢を相手にする前に、先生は別の道も探した。遠目に仲間だと思わせ、祝福へ届く隙をつくる。そのためには、まず着られる兵装が要る。夜は外へ出ず、全員で教会へ戻り、傷を負えば交代して引く方針を確かめて朝を待った。';disguise.text[6]+='\n先生は、地図へ引きかけた変装の道を薄く消した。戦えたから次も押せる、ではない。拾えるはずだった服さえ揃わないなら、今ある盾と、見た道で考え直すしかなかった。';}
  // Separate death, the wait at the goddess's hall, and the return. Archived events stay unchanged.
  const death=find('1-29');
  if(death){death.image='assets/reader-hayate-fall-v1.jpg';const t=originals['1-29'].text;death.text=[...t.slice(0,5),
    '【撤退：1＋3＋2＝6】退く合図は出ていた。07時56分。後衛の颯が凹んだ足場に足を取られ、隊列との間に隙間ができた。立て直すには、ほんの一歩だった。',
    '追ってきた兵の一撃が、その一歩より早かった。颯の膝が落ちた。盾が傾き、草へ触れた。私は名を呼んだ。いつもなら、少し遅れてでも返事のある名前だった。',
    '返事がなかった。\nもう一度呼んでも、身体は起き上がらなかった。休めば戻る体力の話ではない。今ここで、生徒が一人、死んだ。その事実だけが、敵の足音より遅れて私へ届いた。',
    '戻ろうとした足を、止めなければならなかった。後ろには、まだ動ける生徒がいる。ここで全員を止めれば、次が来る。\n「下がって……。遮蔽まで、下がれ」\n出した声が、私自身のものに聞こえなかった。守るために決めた退路を、守れなかった一人を残して使った。',
    '新しい祝福を開けば戻れる。女神の言葉は覚えていた。だが、先へ抜けた八人が、もうそこへ着いたのかを私は知らない。先ほどまでいた子の返事を、まだ届いていない報告へ預けることしかできなかった。'
  ];death.quote='慎重に進めていた。それでも、死ぬ時は一度の隙だった。';death.cards=[];
    const grace={...originals['1-29'],id:'1-29-grace',sourceTurn:'1-29',image:'assets/reader-hayate-return-v1.jpg',title:'戻った息。届かない知らせ。',phase:'関門前の祝福',text:[...t.slice(6)],quote:'戻れたことは、まだ離れた先生には伝わっていない。',cards:[]};
    grace.text[0]='07時58分、関門前。蓮が、初めてその祝福へ触れた。金色の光が地面をほどき、八人の間へもう一つ影を結ぶ。颯だった。\n最初に聞こえたのは、名前への返事ではなく、咳き込む音だった。息を吸い、もう一度吸い、自分の胸へ手を当てる。動く。指も、腕も。確かめるたび、かえって息が乱れた。';
    grace.text[1]='「後ろにいた、よな？」\n隼人の声に、颯は頷いた。白い柱。女神の声。たった一人で待っていた広間の冷たさが、まだ掌に残っている気がした。ここでは、倒れてから二分が過ぎていた。\n「……呼ばれてたのに、返事、できなくて」\n誰の声だったかを言う前に、息が震えた。澪は八人のはずの顔を数え、九人目で手を止めた。新しい祝福を開くと、離脱した仲間が戻る。その約束が、初めて形になった。';
    grace.text.unshift(
      '草の匂いが、消えていた。颯は白い石の上に座っていた。胸へ手を当てても、さっきの痛みはない。見上げた先に青い光の輪がある。皆でここへ来た時には、隣の声がうるさいくらいだった。今は、自分の服が擦れる音だけがした。\n「……女神、さま？」',
      'リュシアが、少し離れた場所に立っていた。\n「あなたの意識は、この広間へ戻っています」\n言い直してはくれなかった。颯は、自分が死んだのだと分かった。\n「皆は。先生は？」\n立ち上がろうとして、どちらへ行けばいいのか分からなくなった。教会へ続く道も、あの草地も、ここにはない。',
      '「あなたから、向こうへの扉を開くことはできません。仲間がまだ灯していない祝福へ届けば、道がつながります」\n最初に聞いた説明だった。今は、聞く側に自分しかいない。先生が名前を呼んでいた。返事をしなければと思うのに、ここから届ける術はなかった。颯は膝の上で両手を握った。皆が進んでくれるのを、待つしかなかった。',
      'どのくらい待ったのか、颯には測れなかった。やがて足元に、青とは違う細い金色が走った。リュシアがそちらへ顔を向ける。\n「道が、つながりました」\n颯は立ち上がった。今度は、返事をしたい。その思いが言葉になるより先に、石の冷たさが掌から消えた。'
    );
    grace.image='assets/reader-hayate-goddess-wait-v1.jpg';
    data.scenes.splice(data.scenes.indexOf(death)+1,0,grace);
    a.sourceIds[grace.id]='1-29';a.contextSources[grace.id]='1-29';a.suppressContext.push('1-29');a.progressSources['1-29']='1-28';a.progressSources[grace.id]='1-29';
    a.outcomeOverrides['1-29']={kind:'loss',label:'死亡',subject:'岡田 颯',summary:'撤退判定 1＋3＋2＝6。新しい祝福からの知らせは、まだない。',encounter:'loss'};
    a.outcomeOverrides[grace.id]={kind:'revival',label:'復活',subject:'岡田 颯 ── 関門前の祝福',summary:'07:58、仲間が灯した新しい祝福へ。三十三人は二か所に分かれ、まだ互いの無事を確かめられていない。',encounter:'revival'};
  }
  const memory=find('1-30');
  if(memory){
    const t=originals['1-30'].text;
    memory.title='その先の返事を、まだしていない。';memory.text=t.slice(0,16);memory.cards=[];memory.quote='戻った身体にも、覚えている怖さがある。';
    const melina={...originals['1-30'],id:'1-30-melina',sourceTurn:'1-30',image:'assets/reader-melina-meeting-v2.jpg',title:'黄金樹へ、連れていって。',phase:'メリナとの出会い',quote:'助けてもらうだけではない。彼女にも、辿り着きたい場所がある。',cards:[],text:[
      t[16],t[17],
      '蓮は立ち上がりかけ、やめた。颯はまだ隣で、自分の呼吸を確かめている。見知らぬ相手へ、全員の事情をどこまで話してよいのか分からなかった。メリナはその沈黙の間も、距離を詰めなかった。',
      '「あなたたちは、何を求めているの？」\n「……帰りたい。皆で」\n蓮が答えると、澪が顔を上げた。ここへ来てから、食べるものと水のことを何度も話した。いま口に出したのは、その仕事を続ける理由の方だった。',
      '「私にも、行きたい場所がある。黄金樹の麓へ、連れていってほしい」\n彼女は遠い金色へ目を向けた。ここから何が見え、何を思い出しているのかまでは分からない。\n「その代わり、ルーンを力に変える手助けができる。あなたたちが、この先を進むための力に」',
      '無条件に守ってくれる誰かが現れたのではなかった。こちらには強くなる手段が要る。彼女には、一緒に進む相手が要る。それでも蓮には、その取引が、敵を倒して何かを拾う話とは違って聞こえた。誰かの行き先を、自分たちの道へ重ねるということだった。',
      t[19],
      'メリナは、教会に残った人数を聞いた。颯へ目が向いても、その傷をすぐに尋ねたりはしなかった。\n「まず、あなたたちの事情を聞かせて」\n「先生にも、話を伝えたい」\n蓮の答えを、彼女は急かさなかった。ここで頷くことが、今この場にいない仲間の旅も変える。その重さを、待ってくれる相手だった。',t[21]
    ]};
    data.scenes.splice(data.scenes.indexOf(memory)+1,0,melina);
    a.sourceIds[melina.id]='1-30';a.contextSources[melina.id]='1-30';a.suppressContext.push('1-30');a.progressSources['1-30']='1-29';a.progressSources[melina.id]='1-30';
    // The intimate recollection is optional, reached from the side-story shortcut.
    const side={id:'hayate-next-breath',slug:'hayate-next-breath',studentId:'student-16',character:'岡田 颯',title:'その先の返事を、まだしていない。',day:7,scene:'1-29-grace',summary:'途切れた二分と、戻ってから何度も確かめた呼吸。',paragraphs:t.slice(0,15),readMinutes:3,image:'assets/reader-hayate-return-v1.jpg',imageMode:'single',imageCaption:'DAY7・関門前、戻ったあと',canonScope:'TURN1-30に記録された颯の内面を掌編へ再配置。新たな死や復活は追加しない。'};
    side.paragraphs[7]='呼ぶ声が遠ざかった。目を閉じたのかどうかも、颯には分からなかった。\n颯の命は、一度ここで途切れた。白い広間で女神の声を聞き、仲間が道を開くのを待った。その間、先生へ返事を届けることはできなかった。';
    side.canonScope='TURN1-30の颯の内面を掌編へ再配置し、序章で示した女神の間での待機を補った読書版。死亡・復活の回数と時刻は変更しない。';
    if(typeof SIDE_STORIES!=='undefined'&&!SIDE_STORIES.stories.some(s=>s.id===side.id))SIDE_STORIES.stories.push(side);
    const entry={id:side.id,title:side.title,character:side.character,day:7,summary:side.summary,href:'reader.html#scene-1-29-grace'};
    for(const id of ['1-29-grace','1-30-melina','1-31']){const context=window.READER_CONTEXT?.scenes;if(context){const source=context[id]||context[a.contextSources[id]||id];context[id]={items:source?.items||[],stories:[...(source?.stories||[]),entry]};a.contextSources[id]=id;}}
    data.redirects['1-30']='1-30-melina';
  }
  const reunion=find('1-31');
  if(reunion){reunion.text=reunion.text.slice();reunion.text.splice(1,0,
    '私が代わればよかった。最初に浮かぶのは、それだった。私が殿へ出て、私が倒れれば、生徒は助かったかもしれない。だが、その後で次の道を誰が決める。班をまとめられる生徒はいる。それでも、私の記憶の中だけに置いた危険や、途中までしか話していない作戦は、私と一緒に途切れる。',
    'もう誰も犠牲にしたくない。そのために前へ出たい。そのために、帰ってこなければならない。矛盾した願いの間で、私は手帳の空いた所へ「戻る合図」と書いた。自分一人の覚悟だけでは、皆の帰り道にはならない。まだ役を引き継ぐ段取りまでは決められなかったが、少なくとも、頭の中だけで守ろうとするのはやめなければならなかった。'
  );}
  const growth=find('1-33');
  if(growth){growth.text=growth.text.slice();growth.text.splice(2,0,
    '手帳で前の数字と比べる。澪はLv1から10へ。知力に五、生命力と精神力に二ずつ振った。先生自身は、初めに十ずつだった生命力・精神力・知力が十三になっていた。数字は増えた。だが、それを「一人で何でも倒せる」に置き換えないために、昨日までの課題があった。',
    '【昨日までの確認】一人が敵へ向き合い、護衛はすぐ救援できる距離に残る。問うたのは、最後まで殴り合って勝てるかだけではなかった。相手が踏み込んだら距離を作れるか。盾で受けた後、横の遮蔽へ退けるか。育成前には、そこへ全員が固まっていた。今は、一人が下がる場所を別の者が空けられる。',
    '一班は最初の確認で位置取りを助けてもらい、翌日の模擬練習を経て離脱の課題を終えた。四班と五班、先生の班では、孤立した通常兵への受けと距離維持を確認できた。評価中に新しく敵を倒したわけではない。「強くなった」の中には、危なくなってから帰ってこられる幅が増えたことも含まれていた。'
  );}
  const campBattle=find('1-34');
  if(campBattle){const old=campBattle.text.slice();campBattle.readingRecords=[{label:'TURN1-34 の詳しい経過',paragraphs:old}];campBattle.text=[old[0],old[1],old[3],old[4],
    '強化と練習は働いていた。だが、盾は二方向へ同時に向かない。犬の進路を塞いだ大地が盾を戻す瞬間、別の兵の刃が袖を裂いた。「腕、少し」。本人が隠さず伝え、結衣が撤退を指示した。まだ攻められそうでも、一人が負傷したら引く。その約束を、勝ち始めた時にも守ることになった。',
    old[7],old[8],old[9],
    '一人への連携は、前より速くなった。五人を倒す力もあった。それでも、視線の外から来る一撃までは消えない。先生は「もっと安全に」の一言で手帳を閉じず、横を見て交代できる場所を地図へ残した。次は力を増やすだけでなく、その力を同時に使える並び方が要る。明日の夜、DAY20には、月の異変にも備えなければならなかった。'
  ];}
  data.scenes=data.scenes.filter(s=>!['1-15','1-20','1-24','1-30'].includes(s.id));
  for(const entry of Object.values(data.byDay||{}))if(data.redirects[entry.id])entry.id=data.redirects[entry.id];
  window.READER_EARLY_EDITING={originals,edition:'2026-09-26',note:'読書用の統合・加筆。保存された進行記録・判定は変更しない。'};
})();
