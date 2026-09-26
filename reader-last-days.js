(function () {
  'use strict';
  const d=window.STORY_READER_DATA,a=window.READER_FINALE;if(!d||!a)return;
  const get=id=>d.scenes.find(s=>s.id===id),pages=window.READER_EXTRA_COLUMNS;
  const link=(s,source)=>{a.sourceIds[s.id]=source;a.progressSources[s.id]=source;};
  const after=(base,s)=>d.scenes.splice(d.scenes.indexOf(base)+1,0,s);
  const original93={...get('1-93'),text:get('1-93').text.slice()};
  const farewell=get('1-93');
  const preparation={...original93,id:'1-93-preparation',sourceTurn:'1-93',title:'届くようになった手で。',phase:'DAY83・朝／補給から、大釜への道',image:'assets/reader-aoi-blessing-day83-v1.jpg',cards:[],quote:'巨人を倒しても、帰るための道はまだ閉じている。',text:[
    ...original93.text.slice(0,4),
    '蓮が、地図の雪山と王都を交互に見た。「巨人を倒したなら、あの樹の所へ戻れるんですか」\n先生は王都の印へ指を置いた。モーゴットを越えた後にも、黄金樹の入口は荊で閉ざされていた。昨日倒した巨人は、帰還を許す最後の敵ではない。荊を焼く火へ近づくため、越えなければならなかった相手だ。\n「このまま王都へ戻っても、入口は開かない。今日は、巨人の向こうにある大釜へ行く」',
    '先生の指は、大釜の印で止まった。メリナは、黄金樹の麓へ連れていってほしいと言っていた。そこへ辿り着いても扉は開かず、今度は彼女の導きで、ここまで来た。火を得る手順を、先生は先読みで知っている。それを皆へ説明しようとすると、どうしても彼女の名が先に浮かんだ。\n「……着いたら、メリナの話を聞こう」\n自分の知識だけで、彼女の答えまで決めたくはなかった。',
    original93.text[4],
    '最後の一人が鎖を渡り終えるまで、先生は振り返って待った。雪を踏む音が、硬い鉄を踏む音へ変わる。昨日の戦場も、今朝の教会も、ここからは見えない。釜の縁には、小さな祝福の光があった。'
  ]};
  d.scenes.splice(d.scenes.indexOf(farewell),0,preparation);link(preparation,'1-93');
  a.suppressContext.push(preparation.id);a.suppressConditions.push(preparation.id);a.outcomeOverrides[preparation.id]=null;
  if(d.byDay[83])d.byDay[83].id=preparation.id;
  farewell.title='その手を、離すまで。';farewell.image='assets/reader-melina-forge-v1.jpg';farewell.text=original93.text.slice(5,11);farewell.cards=[];farewell.quote='「私が選んだことよ」';
  const farum={...original93,id:'1-93-farum',sourceTurn:'1-93',title:'色のない空で、返事を数える。',phase:'崩れゆくファルム・アズラ',image:'assets/reader-farum-arrival-mono-v1.jpg',text:original93.text.slice(11),quote:'いない人を思うより先に、いる人を数えなければならなかった。'};
  farum.text[0]='【崩れゆくファルム・アズラ】白い空だった。黒い石の縁が、足のすぐ先で切れている。さっきまで瞼の裏にあった炎の色が、どこにもない。先生は誰かの肩へ手を伸ばしかけ、風しかない場所を掴んだ。\n「先生、こっち！」蓮に呼ばれて振り向いた瞬間、足元から小石が落ちた。落ちた音は、いつまでも聞こえなかった。空の中で建物が砕け、砕けたまま留まっている。遠くの竜巻が、町ほどもある石の塊を抱いていた。\nメリナ、と呼びかけた声を、次の風が持っていった。返事はない。先生は名を呼ぶ順番を変えた。蓮。直人。大地。一人ずつ、今ここにいる者の声を拾う。十三人。そこでようやく、揃っている人数の中に、あの人はいないのだと分かった。';
  farum.text[farum.text.length-1]+='\n彼女のために座っている時間を、まだ作れなかった。安全な床を確かめてから、先生は手袋を外した。握られた場所へ、もう片方の手を重ねる。暖かさまで思い出そうとして、ただ一度、目を閉じた。';
  after(farewell,farum);link(farum,'1-93');a.suppressContext.push('1-93');a.contextSources[farum.id]='1-93';a.conditionSources[farum.id]='1-93';a.outcomeOverrides[farum.id]=null;

  const march=get('1-96');
  const supply={...march,id:'1-96-council',sourceTurn:'1-96',title:'戻る一日を、先へ進む力に。',phase:'DAY86・出発前の作戦会議',supplementType:'council',image:'assets/reader-map-day86.svg',text:[
    '【DAY86・早朝／竜の聖堂、祭壇】神肌のふたりを越えても、次の道は細く崩れている。先生は地図の先へ線を延ばす前に、教会の印へ指を戻した。「一度帰ろう。弓と刃を整えてから、またここへ戻る」',
    '「戻る方で、一日使いませんか」花が尋ねた。先生は祝福を見た。十三人とも、ここへ自分で来ている。「道を最初から歩き直さなくていい。だから、補給に使える」',
    '残った日数を、強くなれる日と戦う日に分けるのは難しい。先へ行かなければ敵の速さは分からず、行った先で矢が尽きれば、結局戻らなければならない。先生は九十日の枠を赤く囲み、その一つ前に帰還と書いた。',
    '「八十九日には教会へ。そこまでに届いた祝福を、次の出発点にする」\n葵は余った紙に、補給する物を書いた。剣を研ぐ人。矢を買う人。力を伸ばす人。今日の準備を終えれば、まだ今日のうちに戻ってこられる。'
  ],quote:'',cards:[]};
  d.scenes.splice(d.scenes.indexOf(march),0,supply);link(supply,'1-96');a.suppressContext.push(supply.id);a.suppressConditions.push(supply.id);
  pages[supply.id]={image:supply.image,alt:'竜の聖堂から教会で補給し、同じ祝福へ戻って先へ進む経路',caption:'帰り道を確保してあるから、補給を前進に使える。',kicker:'作戦会議 ── DAY86・補給と再出発',rules:[
    ['現在地','神肌のふたりを越え、祭壇に十三人。','ここまでの祝福は全員が登録済み。帰還後も、この地点から探索を続けられる。'],
    ['補給','矢、修理、そして必要な育成。','教会の在庫と合流し、円卓で武器の強化も相談する。用意できるものを確かめてから、再出発する。'],
    ['攻略','最深部の祝福を、次の出発点に。','先に何がいるかは調べられる。今日どこまで届くかは、現地の敵と足場を見て決める。'],
    ['帰還期限','DAY89には教会。DAY90は全員で守る。','進めそうでも、赤月の直前まで残らない。留守を守る仲間と合流する時間を、先に残しておく。']
  ],reminder:'先へ進むために戻る。戻るたび、同じ場所からやり直さない。',note:'DAY86の行動前の確認。まだ得ていない装備や勝利は含めない。',fullText:true,fullTextOpen:false};
  if(d.byDay[86])d.byDay[86].id=supply.id;

  const battle=get('1-98'),old98={...battle,text:battle.text.slice()};
  battle.title='獣の衣の、その下へ。';battle.text=old98.text.slice(0,9);battle.cards=[];battle.quote='休んでから挑んだ。それでも、まだ知らない速さがあった。';
  const defeat={...old98,id:'1-98-blackblade',sourceTurn:'1-98',phase:'黒き剣、マリケス · 初挑戦',text:old98.text.slice(9)};
  defeat.text[5]='先生は剣を構え直しかけた。あと少しだった。さっきの着地にもう一人届いていれば。直人が退くところを、もう半歩早く代われていれば。\nだが、今度こそ当たるはずだという願いで、生徒をもう一度走らせるわけにはいかない。敵はまだ跳べる。こちらは、返事をする息まで削られている。\n「今日はここまでだ」\n口にした瞬間、負けたのだと分かった。帰る約束は守れる。今日、ここを越えるという約束は果たせない。先生はその二つを、同じ言葉で慰めなかった。';
  defeat.text[7]+='\n手を開くと、握っていた剣の跡だけが掌に残っていた。先読みには、この先の道が載っている。今日をもう一度選び直す頁は、なかった。';
  defeat.readingRecords=[{label:'当時の判定と帰結',paragraphs:[old98.text[14]]}];
  after(battle,defeat);link(defeat,'1-98');a.suppressContext.push(battle.id);a.contextSources[defeat.id]='1-98';a.conditionSources[defeat.id]='1-98';a.outcomeOverrides[battle.id]=null;a.outcomeOverrides[defeat.id]={from:'1-98',label:'敗北・撤退',summary:'勝利条件に届かず挑戦を放棄。13人は戻ったが、過ぎた日数と装備の損耗は戻らない。'};

  const council=get('1-99-council');
  council.text.push(
    '「全員のレベルを、もう少し上げてからなら」\n言いかけて、先生は必要なルーンと、それを集める日数を並べた。十三人分を均等に増やす間にも、空の色は変わっていく。強くなるまで待てば間に合う、という待ち方は、もうできなかった。',
    '澪が荷物の一覧を開いた。使った物には線が引かれ、線のない名前が幾つも残っている。\n「これ、まだ使ってませんよね。追憶」\n先生は机の上へ四つの包みを置いた。新しい敵を探しに行かなくても、既に持ち帰った力がある。ルーンへ換えるか、武器や術にするか。今度は、惜しむ理由より、誰に何が足りないかを先に考えた。',
    '「前に立ち続ける人を、二人に絞って育てる。私が離れた間をつないでもらう」\n健太と陽太が顔を見合わせる。紬は、使えるようになるまであと幾つ必要か、祈祷の記録を確かめた。全員を同じだけ上げる代わりに、昨日足りなかった役割へ力を集める。',
    '大ルーンは別に置いた。塔で力を戻す仕事は、第三隊が引き受けられるかを確かめる。武器の強化も、持っている石と足りない石を数え直す。集める場所を知っただけで、剣が強くなるわけではない。先生は「すぐにできる」「誰かへ任せる」「今は間に合わない」と、紙を三つに分けた。'
  );
  const home=get('1-99');home.text[10]='【残りを数える】夕方、先生は日数を書いた紙を皆の前へ広げた。期限は百日目の終わり。けれど、その日まで戦い続けて、取り残した仲間を戻す時間がなかったとは言いたくない。攻略は九十九日までを目標にする。今日が終われば、そのための十日。赤月を越えた後は九日になる。';

  Object.assign(a.outcomeOverrides, {
    '1-101': {from:'1-101',afterParagraph:19,resultImage:'assets/late-turn101-key-v1.jpg'},
    '1-102': {from:'1-102',afterParagraph:15,resultImage:'assets/late-gideon-combat-v1.jpg'},
    '1-103': {from:'1-103',afterParagraph:17,resultImage:'assets/reader-day93-hoarah-pressure-v1.jpg',summary:'撃破条件に届かず、再戦へ向けて退却を決断。'},
    '1-106': {from:'1-106',afterParagraph:33,resultImage:'assets/reader-day96-victory-thirteen-v1.jpg',summary:'主力13人の生存を確認。王座への道が開いた。'}
  });
  const godfrey=get('1-103');
  godfrey.text[17]='王はまだそこにいた。こちらの攻撃で膝をつかせた瞬間はあった。だが、倒れてはいない。先生は踏み出しかけた足を戻した。陽太が息を整える音がする。皆がまだ立っているからといって、このまま勝てるわけではなかった。\n「今日は、ここまでだ」\n二度目の形態に変わった相手へ、最後まで攻め続ける手順を作れなかった。その負け方を、覚えて帰る。';
  godfrey.readingRecords=[{label:'当時の判定と帰結',paragraphs:['進捗2＋1＋1＝4。事前の撃破条件5には届かず、挑戦放棄。勝敗・出目・報酬は当時の記録のまま。']}];
  const risk={...godfrey,id:'1-103-council',sourceTurn:'1-103',title:'七日を、どう使う。',phase:'DAY93・敗北の後',supplementType:'council',image:'assets/reader-map-last-seven.svg',cards:[],quote:'',text:[
    '【DAY93・夜／エレの教会】七日。先生は百日目までの枠を数え、最後の一つには線を引かずに残した。そこは仲間を戻し、結末を確かめるための一日だ。自分たちで決めた九十九日までなら、使えるのはあと六日だった。',
    '「次も、同じ装備で行きますか」直人が尋ねた。先生の剣は、帰還後にようやく一段上がったばかりだ。机にある金を、先生は見た。足りないのは、集めたルーンを使える材料と店につなぐ段取りだった。',
    'すぐ再戦すれば、明日勝てるかもしれない。二日を強化に使えば、その二日には勝てない。けれど、同じ敗北を重ねれば、二日で済む保証もなかった。\n「手分けして、買えるようにしよう。持っている金を、持っているだけで終わらせない」\n先生は三隊の行き先を書いた。奥へ探検するための線ではない。必要な物を取り、帰るための線だった。',
    '剣を置くと、颯の顔が見えた。先生は真っ先に危ない所へ立つつもりで、ここまで来た。しかし、自分が倒れれば、知っていることも、次に誰を呼ぶかも、そこで途切れる。その怖さが、最後の一歩を引かせていた。',
    '「……私が倒れたら、どうするかも決めよう」\n蓮が紙から目を上げた。今日の負けを、次は誰かの命で埋めるという命令にはしたくなかった。だが、先生自身が傷つく可能性をなくしてから進むだけの時間も、残ってはいない。',
    '「まず、武器と交代を整える。それでも最後に私が踏み込まないと届かないなら、君たちが戻す判断までできるようにする」\nその夜は、そこまでを書いた。次に剣を抜くまでに、受け継ぐ声と、先生を戻す手段を用意しなければならなかった。'
  ]};after(godfrey,risk);link(risk,'1-103');a.suppressContext.push(risk.id);a.suppressConditions.push(risk.id);
  pages[risk.id]={image:risk.image,alt:'DAY94と95を補強、DAY96に再戦し、その先へ備える七日間の計画',caption:'残る六日を、何度も同じ負け方をするためには使えない。',kicker:'作戦会議 ── DAY93・残り七日',rules:[
    ['敗因','避けられても、攻め続けられない。','掴みと踏みつけで交代が詰まり、クララも消失。レベルだけで押し切るには足りなかった。'],
    ['補強','二日で鈴玉と鍛石を集める。','三隊で分担し、買える石を増やす。余剰ルーンを武器強化へ集中。目的を果たしたら奥へ進まない。'],
    ['判断','先生が倒れた後も、指揮を止めない。','危険を引き受ける覚悟と、全員を失わない手順を一緒に用意する。無条件に突撃する作戦にはしない。'],
    ['日程','DAY94–95に補強、DAY96に再戦。','その後の二連戦と、仲間を戻す時間を残す。DAY100の期限を延ばすことはできない。']
  ],reminder:'時間を使って備える。その二日で、何を変えるのかを決めてから。',note:'再戦の前の計画です。後日の出目・勝利を前提にはしていません。',fullText:true,fullTextOpen:false};
})();
