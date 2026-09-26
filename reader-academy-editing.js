(function(){
  'use strict';const d=window.STORY_READER_DATA,a=window.READER_FINALE;if(!d||!a)return;
  const get=id=>d.scenes.find(s=>s.id===id),pages=window.READER_EXTRA_COLUMNS;
  const library=get('1-62'),old={...library,text:library.text.slice()};
  library.title='歌の止まらない、大書庫。';library.image='assets/reader-rennala-library-v1.jpg';library.text=old.text.slice(0,7);library.cards=[];library.quote='美しい、と思ってしまったことが怖かった。';
  const moon={...old,id:'1-62-moon',sourceTurn:'1-62',title:'月の下で、光をかわす。',phase:'満月の女王 · 第二形態',image:'assets/reader-rennala-laser-v1.jpg',text:old.text.slice(7)};
  moon.text[0]='【月夜｜逃げる向きを揃えない】杖の先が、青白く膨らんだ。先生は光が飛ぶより先に横へ走った。「同じ方へ来るな！」後ろの班は反対へ散る。\n次の一歩を置くはずだった水面が、太い光の奔流に呑まれた。横へ投げ出した足に、砕けた水が当たる。盾で受ける幅ではなかった。息を吸う間も、光は止まらない。先生は濡れた手をつき、身体が残っている側へもう一歩転がった。\n直人が前へ出て注意を引く間に、先生は聖印を握る。薄い光が、自分の鎧にだけ落ちた。大地も黄金のハルバードを掲げる。先生、大地、直人の三人を、短い誓いの光が包んだ。';
  d.scenes.splice(d.scenes.indexOf(library)+1,0,moon);a.sourceIds[moon.id]=library.id;a.suppressContext.push(library.id);a.contextSources[moon.id]=library.id;a.conditionSources[moon.id]=library.id;a.progressSources[moon.id]=library.id;a.outcomeOverrides[library.id]=null;a.outcomeOverrides[moon.id]={from:library.id};
  const addCouncil=(base,id,title,day,image,rules,reminder,text=[])=>{
    const s={...base,id,sourceTurn:base.sourceTurn||base.id,title,image,startDay:day,endDay:day,dayLabel:'DAY '+day,phase:'作戦会議',supplementType:'council',text,quote:'',cards:[]};d.scenes.splice(d.scenes.indexOf(base)+1,0,s);a.sourceIds[id]=s.sourceTurn;a.suppressContext.push(id);a.suppressConditions.push(id);
    pages[id]={image,alt:title,caption:'今いる場所から、次の目的地へ。距離・方角は模式的。',kicker:'作戦会議 ── 次の一歩',rules,reminder,note:'この場面までの情報で作戦を整理しています。',fullText:text.length>0,fullTextOpen:false};return s;
  };
  addCouncil(moon,'1-62-council','二つの証を、次の道へ。',52,'assets/reader-map-after-academy.svg',[
    ['現在地','レナラ戦を終え、全33人が教会へ。','二つ目の大ルーンを獲得。割符と合わせ、大昇降機へ進む条件がそろった。王都までの道は、これから調べる。'],
    ['出発前','円卓で装備と遺灰を相談する。','戦利品を育成と修理へ。眠らせている装備を配り直し、先生ひとりの偵察を支える手段も探す。'],
    ['先生','高原へ先行し、王都への道を。','大昇降機から新しい土地へ。門番と戦うための出発ではない。経路・敵・帰還地点を観測して戻る。'],
    ['二隊と拠点','主力の残る12人は、昇降機を上がらない。','A・B隊は既存の土地で魔術や鍛石を探す。教会の20人は、食事・水・防衛と拠点の補修を続ける。']
  ],'まず補給と配分。先生が新しい地図を持ち帰ってから、全員で次の戦いを決める。');
  addCouncil(get('1-70'),'1-70-council','今度は十三人で、門の前へ。',61,'assets/reader-map-day61.svg',[
    ['現在地','DAY60の赤月を越え、教会に全33人。','二波の翼を退けた。先生の偵察も完了し、王都の門前には竜のツリーガードがいると分かっている。'],
    ['移動','大昇降機から、アルター高原へ。','先生が描いた迂回路と待ち場所を使う。先行組が敵を避けても、最後尾まで通れるかを確かめる。'],
    ['最優先','外廓の戦場跡を、13人の補給点に。','先生だけが歩いた道を、仲間まで転送できるわけではない。本人の到達と祝福への登録を先に済ませる。'],
    ['分担','先生＋A・B隊が前進。20人が教会を守る。','門番戦は補給の線をつないでから。教会を空にせず、食料・水と救援の余力を残しておく。']
  ],'偵察で見た道を、皆が帰れる道へ変える。その先で門番に挑む。');
  const roster=window.READER_COUNCIL_STATUS||[];
  addCouncil(get('1-73'),'1-73-council','足りなかったのは、どこか。',63,'assets/reader-status-day63-v1.svg',[
    ['帰還地点','外廓の戦場跡。13人全員が生存。','先生と陽太は被弾し、赤瓶を使用。クララは戦闘中に消失。門番は健在だが、撤退の道は使えた。'],
    ['先生','Lv50／生命36・持久25。','片手剣＋2、ヒーターシールド、騎士の防具。強くはなったが、炎の直後の一撃と雷を盾だけでは受け切れなかった。'],
    ['攻略隊','大地Lv37、直人・陸・拓海Lv27、ほかLv26。','大地の黄金のハルバード＋1を軸に攻撃は通った。弓と術を続けるには、前に立つ者と退く者の場所を整えたい。'],
    ['次の準備','炎と雷への備え、装備の補修、交代の確認。','教会へ戻って対策を探す。防護を重ねられるかは先読みで確かめる。まだ手にしていない護符や祈祷は戦力に数えない。']
  ],'同じ装備で、同じ場所へ立ち続けない。被弾した瞬間から作戦を組み直す。',[
    '【DAY63／初挑戦から戻った時点の装備と能力】以下は当時の人物・装備記録から抜き出した数値。次の日の強化や、新しく探す護符・防護は含めていない。',...roster.map(x=>x.name+'　Lv'+x.level+'\n'+Object.entries(x.stats).map(([k,v])=>k+' '+v).join('／')+'\n装備：'+x.gear)
  ]);pages['1-73-council'].caption='初挑戦から戻った時点の能力と装備。次の強化は、まだ含まない。';pages['1-73-council'].fullTextLabel='当時の13人の能力と装備を見る';
})();
