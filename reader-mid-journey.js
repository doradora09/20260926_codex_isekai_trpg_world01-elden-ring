/* Editorial transitions and parallel viewpoints; archived turn records remain intact. */
(function(){
  'use strict';
  const d=window.STORY_READER_DATA,a=window.READER_FINALE;if(!d||!a)return;
  const get=id=>d.scenes.find(s=>s.id===id),original={};
  for(let n=48;n<=60;n++){const s=get('1-'+n);original[s.id]={...s,text:s.text.slice()};}
  const pages=window.READER_EXTRA_COLUMNS||(window.READER_EXTRA_COLUMNS={});
  const add=(base,s)=>{d.scenes.splice(d.scenes.indexOf(base)+1,0,s);a.sourceIds[s.id]=s.sourceTurn||base.id;};
  const column=(base,id,title,day,image,text,rules,reminder)=>{
    const s={...base,id,title,startDay:day,endDay:day,dayLabel:'DAY '+day,sourceTurn:base.id,phase:'作戦会議',supplementType:'council',image,text,quote:'',cards:[]};add(base,s);a.suppressContext.push(id);a.suppressConditions=[...(a.suppressConditions||[]),id];
    pages[id]={image,alt:title,caption:'現在地と、これから向かう場所。距離・方角は模式的。',kicker:'作戦会議 ── 地図を囲んで',rules,reminder,note:'この時点で分かっている情報だけを整理しています。',fullText:!!text.length,fullTextOpen:false};return s;
  };
  get('1-48').text[0]=get('1-48').text[0].replace('円卓での一幕は「ひとつ前の場面」から読める。','');
  column(get('1-48'),'1-48-council','守りきった朝、城への道を。',41,'assets/reader-map-day41.svg',[
    '【DAY41・夜明け／エレの教会】月の赤が抜けたあと、先生は濡れた地図の端を押さえた。結衣の点呼は三十三で終わっている。ここへ戻った判断は、間違っていなかった。それでも、守った場所に座り続けるだけでは帰れない。',
    '「昨日行った円卓の先が、城なんですか」\n美咲の問いに、先生は首を振った。「円卓では、戦う道具を整えた。城への道はこっち。マルギットを越えた橋へ、もう一度戻る」\n教会から城へ引いた線の脇に、円卓は別の丸で描いた。行き来する補給先であって、城の中にある部屋ではない。',
    '「今日は十三人で、城の中を調べる。正門を無理に抜けず、教わった脇道を確かめる。城主はゴドリックだ。ただ、そこまで一息で進めると決めてはいない」\n直人が二隊の名前を指した。結衣は残る二十人へ目を向ける。寝床を乾かし、水を揃え、帰ってくる入口を守る。どちらも、次の夜へ続く仕事だった。'
  ],[
    ['現在地','エレの教会で、全33人が生存。','DAY40の赤月を防衛。新しい死者・負傷者は0。円卓での補給は済み、教会へ帰還している。'],
    ['攻略地点','マルギットを越えた橋の先。','ストームヴィル城の内部は未踏。次は脇道を確かめ、城主ゴドリックへ届く道を探す。'],
    ['役割分担','先生＋A・B隊の13人が城へ。','結衣たち20人は教会の防衛・生活・救援を担当。まだ城の祝福を使って全員が移動できる状態ではない。'],
    ['手持ち','矢86本／共同170ルーン。','先生Lv35、直人Lv22、大地Lv33、ほかの攻略隊員Lv21。救援用の未解放祝福は5か所。']
  ],'赤月を守るために戻った。今度は、帰還の道を進めるために城へ戻る。');
  get('1-49').text[0]=get('1-49').text[0].replace('出るのは先生と、','目的地は、ストームヴィル城の内側だ。出るのは先生と、');
  column(get('1-51'),'1-51-council','勝った城と、まだ知らない湖。',42,'assets/reader-map-day42.svg',[
    '【DAY42・朝／ストームヴィル城】小部屋へ戻る前、先生は城の裏へ続く道を見た。あの先がリエーニエだ。城主を倒したから、城の兵まで消えたわけではない。次に全員を連れていく土地が安全になったわけでもない。',
    '「まず教会へ戻る。食事と手入れを済ませたら、二隊で残る二十人をこの小部屋まで連れてきてほしい」\n直人が頷く。「ここに触れておけば、皆も戻れるようになるんですね」\n「そう。城へ引っ越すためじゃない。遠征の出発点と、逃げる先を皆にも持ってもらうためだ」',
    '湖の地図は、まだ白い。そこへ最初から三十三人を連れていけば、引き返す判断も遅くなる。\n「その間、私は城の裏から湖の方を見る。今日は戦うために先へ出るんじゃない。道と、戻る場所を調べる」\n二隊を守りにつけたまま、自分だけが未知の場所を確かめる。誰も置いていくための分担ではなかった。'
  ],[
    ['一区切り','ストームヴィル城主、ゴドリック撃破。','大ルーンを一つ獲得。城内の通常兵は残る。移動に使えるのは、13人が触れた「奥まった小部屋」。'],
    ['まず帰還','食事・修理・育成を教会で。','戦利品を持ち帰り、次へ出る身体と道具を整える。城の勝利を、留守を守った20人にも伝える。'],
    ['二隊＋20人','全員に、城の帰還先をつくる。','A・B隊が護衛し、未登録の20人を小部屋まで案内。実際に触れたことを確かめてから教会へ戻す。'],
    ['先生ひとり','城の北側から、湖のリエーニエへ。','新しい土地は先行偵察。道・地図・祝福の位置を確かめる。生徒たちを未知の土地へ連れていく前の下見。']
  ],'同じ日の別行動：生徒たちは帰還先を増やし、先生は次の土地を確かめる。');
  const lake=get('1-52'),l=original['1-52'].text;
  lake.image='assets/reader-castle-escort-v1.jpg';lake.title='三十二人で、帰り道を覚える。';lake.text=l.slice(0,5);lake.text[0]=lake.text[0].replace('城主を倒しても','ストームヴィル城のゴドリックを倒しても');lake.text[2]=lake.text[2].replace('【昼｜城への列】','【昼｜A・B隊と教会組／ストームヴィル城への列】');lake.quote='城へ住み替えるのではない。帰れる場所を、みんなのものにする。';lake.cards=[];a.suppressContext.push(lake.id);a.outcomeOverrides[lake.id]=null;
  const scout={...original['1-52'],id:'1-52-scout',sourceTurn:'1-52',image:'assets/reader-liurnia-arrival-v1.jpg',title:'城の向こうの、湖へ。',phase:'同じ日の別行動 · 先生',text:[
    '【同じDAY42・昼／先生の先行偵察】二隊が教会の仲間を城へ案内する間、先生はその先の道を一人で確かめていた。ゴドリックを倒したストームヴィル城は、リムグレイブと北の湖を隔てる高台にある。城を抜けた先が、次に進む土地――リエーニエだった。',...l.slice(5)
  ]};add(lake,scout);a.contextSources[scout.id]='1-52';a.conditionSources[scout.id]='1-52';a.progressSources[scout.id]='1-52';
  const start=get('1-53'),s=original['1-53'].text,f=original['1-54'].text,t=original['1-55'].text;
  start.title='二つの割符、三つの仕事。';start.phase='作戦会議';start.supplementType='council';start.image='assets/reader-map-medallion.svg';start.text=[
    '【DAY43・朝／エレの教会】先生の指が、地図の湖より北へ動いた。「大昇降機という仕掛けがある。高原へ上がり、その先の王都を目指す道だ。まず、それを動かす割符を集めたい」\n半分ずつ。左はリムグレイブのハイト砦、右は東のファロス砦。先生は先読みで確かめた名前を書き、実際に歩いていない道には点線を引いた。',
    '「二隊は、一緒に行ってくれ。六人をさらに遠くへ分けるより、梯子を上る組と、下で守る組を作りたい。取ったら戻る。砦を空にする仕事じゃない」\n蓮が左の砦へ印を置く。まず近い方。それが済んでから、右へ行ける道を見極める。',
    '「私は湖の道と、昇降機までの進路を調べる。結衣たちは、ここを頼む」\n一人と、十二人と、二十人。違う方向へ線が伸びても、夕方の戻り先は同じだった。',s[0],s[1]
  ];start.cards=[];start.quote='取ったら戻る。砦を空にする仕事じゃない。';a.suppressContext.push(start.id);a.suppressConditions.push(start.id);a.outcomeOverrides[start.id]=null;
  pages[start.id]={image:start.image,alt:'割符回収と湖の偵察、教会の補給を分担する地図',caption:'三つの仕事、帰る場所は一つ。',kicker:'作戦会議 ── 割符を集める',rules:[
    ['目的','大昇降機へ進むため、左右の割符を。','左はハイト砦、右はファロス砦。先読みで目的地は分かるが、道の安全は現地で確かめる。'],
    ['先生','湖と北へ向かう道を先行偵察。','未知の危険を大人数で踏まないよう、まず一人で地形と帰路を調べる。'],
    ['A・B隊','十二人で、砦の箱へ。','一隊が進み、一隊が退路を支える。近い左から回収。右へ進めなければ、引き返して道を選び直す。'],
    ['教会組','二十人で、水・食事・修理を。','遠征が続く間も、教会を空にしない。濡れない寝床と帰って食べるものを用意する。']
  ],reminder:'次の三話は、DAY43〜45の同じ期間をそれぞれの側から追います。',note:'A・B隊はこの区間では合同で行動。先生Lv40、直人Lv24、大地Lv34、ほかの攻略隊員Lv23。',fullText:true};
  const teacher={...original['1-53'],id:'1-53-scout',sourceTurn:'1-53',title:'地図にはない、光の下で。',startDay:43,endDay:45,dayLabel:'DAY 43–45',phase:'同じ三日間 · 先生',image:'assets/reader-liurnia-scout-v1.jpg',text:[s[4].replace('【同じ午後｜東の街道】','【DAY43・午後／リエーニエ東の街道】'),s[5],f[2].replace('【北の谷｜先生】','【DAY44／北の谷】'),f[3],t[0],t[1],t[2],t[3]],quote:'今日は塔の足元を見ていない。その空白を、地図に残した。',cards:[]};add(start,teacher);
  const expedition=get('1-54');Object.assign(expedition,{title:'半分の鍵と、引き返した道。',startDay:43,endDay:45,dayLabel:'DAY 43–45',phase:'同じ三日間 · 探索A・B隊',image:'assets/reader-medallion-team-v2.jpg',text:[s[2].replace('【ハイト砦｜花】','【DAY43／ハイト砦・花】'),s[3],f[4].replace('【ケイリッド手前｜蓮】','【DAY44／ケイリッド手前・蓮】'),f[5],f[7],t[4].replace('【ファロス砦｜二隊】','【DAY45／ファロス砦・二隊】'),t[5]],quote:'砦の名前は知っている。そこへ皆を連れていける道は、まだ知らない。',cards:[]});
  const camp={...original['1-54'],id:'1-54-base',sourceTurn:'1-54',title:'帰って座れる、場所をつくる。',startDay:43,endDay:45,dayLabel:'DAY 43–45',phase:'同じ三日間 · 教会の二十人',image:'assets/reader-church-build-v2.jpg',text:[s[6].replace('【教会｜留守を守る手】','【DAY43／エレの教会】'),f[0],f[1],f[6].replace('【教会｜午後】','【DAY44・午後／エレの教会】'),t[6].replace('【教会｜もう一つの完成】','【DAY45／エレの教会】')],quote:'手を離しても、崩れなかった。',cards:[]};add(expedition,camp);
  for(const part of [teacher,expedition,camp]){a.suppressContext.push(part.id);a.conditionGroups={...(a.conditionGroups||{}),[part.id]:['1-53','1-54','1-55']};a.conversationSources={...(a.conversationSources||{}),[part.id]:['1-53','1-54','1-55']};a.progressSources[part.id]='1-54';a.outcomeOverrides[part.id]=null;}
  const join=get('1-55');join.title='揃った鍵と、もう一つの封印。';join.image='assets/reader-medallion-joined-v1.jpg';join.text=[t[7],
    '先生は昇降機の手前で確かめたことを、地図の上へ書いた。この旅の大昇降機には、割符だけでは解けない封印がある。二つの大ルーンを備える者に、上へ続く道が開く。左右の割符は揃った。だが、手元の大ルーンは、ゴドリックの一つだった。',
    '「あと一つ、か」\n直人が揃った金属を見下ろす。先生は湖の真ん中へ指を移した。「魔術学院レアルカリア。そこにいるレナラが、次の候補だ」\n砦へ行った三日間が無駄になったわけではない。割符をまた探す必要は、もうない。道を進めるために残った条件が、一つ見えるようになったのだ。',
    '「まず入口を調べる。学院へ入る鍵まで、これと同じとは限らない」\n結衣が暦へ線を引く。次の赤月は五十日目。残り五十五日。今度は湖の学院、その先に大昇降機。皆が同じ順番を口にしてから、先生は地図を畳んだ。'
  ];join.readingRecords=[{label:'DAY43〜45 の当時の記録',paragraphs:[...original['1-53'].text,...original['1-54'].text,...original['1-55'].text]},{label:'読書版で補った道筋について',paragraphs:['大昇降機に二つの大ルーンが必要という封印は、読書版で追加したこの物語独自の条件です。原作ゲームの大昇降機は左右の割符で利用できます。当時のプレイ記録・出目・取得品・勝敗は変更していません。']}];
  get('1-56').text[0]=get('1-56').text[0].replace('それでも、まだこの世界を出る道の途中だ。','残る封印を解くため、今日は二つ目の大ルーンを持つレナラのいる学院を目指す。');
  get('1-56').text[6]='「次の赤月まで、四日です」と結衣が言った。百日目までは五十四日。先生は割符を包み、地図の学院へ丸をつけた。「まず輝石鍵を取る。学院を越えて二つ目の大ルーンを得たら、大昇降機へ。その順番でいこう」\n全てを明日終えられるとは約束しない。竜と戦って時間を使う必要があるか、赤月までにどこを帰還先にするか。次に決めるのは、目的地そのものより、そこへ誰をどう連れていくかだった。';
  get('1-57').text[0]='【DAY47・朝｜攻略サイト先読み】雨音の下で、先生は手帳を開いた。割符は揃っている。残る昇降機の封印には、二つ目の大ルーンが要る。次の目的地は、レナラのいる魔術学院レアルカリア。その学院にも、入るための輝石鍵が必要だった。\n先読みで、鍵のある岩場と、そこに眠る竜を確かめる。「竜を倒すのが目的じゃない。今日は、鍵だけを取りに行く」';
  const approach=get('1-59'),wolf=original['1-59'].text;
  approach.title='戻り方を覚え、金色の霧へ。';approach.text=[...wolf.slice(0,5),'【討論室の手前】石の階段を上がった先で、空気が金色に濁っていた。煙のようで、風に流れない。花が弓を下ろす。「これも、鍵がないと開かない扉？」\n先生は首を振った。「この向こうに、強い相手がいる」\nマルギットの橋でも、ゴドリックの前でも見た境目だった。今回は、机と本の並ぶ建物の奥にある。','先生は来た道を振り返った。今休んだ学び舎へ、十三人とも戻れる。けれど、この霧の中から危なくなった瞬間に飛べるわけではない。まず戦いから離れ、仲間を連れて扉の外まで退く。その順番を確かめてから、皆の顔を見た。\n「追い回さない。跳んだ先で、待つ。誰かに向きが変わったら声を出して」\n返事が一つずつ揃う。先生が、金色へ手を入れた。'];approach.image='assets/reader-academy-fog-v1.jpg';approach.quote='強い相手の前でも、帰り方から決める。';approach.cards=[];a.suppressContext.push(approach.id);a.outcomeOverrides[approach.id]=null;
  const fight={...original['1-59'],id:'1-59-wolf',sourceTurn:'1-59',title:'赤い狼、金色の刃。',phase:'ラダゴンの赤狼',image:'assets/reader-academy-wolf-v1.jpg',text:wolf.slice(5),quote:'十三人で追い回すのではない。獣が跳ぶたび、受け持つ側が変わる。'};add(approach,fight);a.contextSources[fight.id]='1-59';a.conditionSources[fight.id]='1-59';a.progressSources[fight.id]='1-59';a.outcomeOverrides[fight.id]={from:'1-59'};
  const red=get('1-60');red.text[1]+='\n教会へ戻って迎えるつもりで暦を見てきた。それでも今、十三人は学院にいる。先生は、結衣が守る二十人の顔を思い浮かべた。いざとなれば学び舎から戻れる。その帰路まで塞がれれば、向こうを助けることもできない。だから、残す光の近くに座るだけでは足りなかった。';
  red.text[3]='魔術師たちは外へ交流に出ようとしているのではなかった。閉じていた教室から廊下へ出て、こちらの逃げ道へ回り込んでいる。学院の中にいる侵入者――自分たちを追い出す動きだった。\n「祝福のある場所まで、追ってくるのか……？」\n先生の知っている休息の場所と、目の前の安全は同じとは限らない。討論室の光は、まだ灯してさえいない。先読みには、この赤い月の夜に扉が開くとは書かれていなかった。';
  red.text[11]=red.text[11].replace('手帳の「封鎖」の文字を消さなかった。その下へ、赤月の夜の観測を書き足した。','手帳へ「学院内でも、赤月の夜は安全とは限らない」と書いた。光が見えることと、追撃が切れていることを、別々に確かめなければならない。');
  d.byDay[43]={id:'1-53',covered:false};d.byDay[44]={id:'1-53-scout',covered:true};d.byDay[45]={id:'1-55',covered:false};
  window.READER_MID_JOURNEY={original};
})();
