(function(){
  'use strict';
  const d=window.STORY_READER_DATA;if(!d)return;
  const a=(n)=>'assets/late-turn'+n+'-key-v1.jpg';
  const cues={
    '1-29':[[0,'assets/reader-gatefront-approach-v1.jpg','関門前へ向かう'],[5,'assets/reader-hayate-fall-v1.jpg','撤退の一瞬']],
    '1-29-grace':[[0,'assets/reader-hayate-goddess-wait-v1.jpg','女神の間で待つ'],[4,'assets/reader-hayate-return-v1.jpg','新しい祝福へ戻る']],
    '1-32-training':[[0,'assets/reader-day18-training-retreat-v1.jpg','退き方まで、練習する']],
    '1-40-practice':[[0,'assets/reader-parry-practice-v1.jpg','逃げるための連携']],
    '1-41':[[0,'assets/reader-sentinel-parry-v1.jpg','金色の騎士の間合い']],
    '1-41-clash':[[0,'assets/reader-sentinel-rescue-v1.jpg','弓手の退路を守る']],
    '1-77':[[0,'assets/reader-leyndell-before-v1.jpg','灰に覆われる前の王都']],
    '1-95':[[0,a(95),'神肌のふたり']], '1-96':[[0,'assets/reader-day86-supply-hands-v1.jpg','持ち帰った手から、進む手へ'],[9,a(96),'崩れた足場をつなぐ']],
    '1-97':[[0,a(97),'大橋への道']],
    '1-98':[[0,'assets/late-priest-v1.jpg','獣の司祭']],
    '1-98-blackblade':[[0,a(98),'黒き剣、マリケス']],
    '1-99':[[0,a(99),'教会へ戻り、次を考える']],
    '1-100':[[0,'assets/reader-day90-four-remembrances-v1.jpg','眠らせていた力を、開く'],[9,a(100),'赤い雨の防衛線'],[16,'assets/reader-tsumugi-fire-v1.jpg','紬の火柱']],
    '1-101':[[0,'assets/reader-day91-goddess-dawn-v1.jpg','暁の女神と、残された時間'],[7,'assets/reader-day91-priest-rematch-v1.jpg','獣の司祭への再挑戦'],[11,a(101),'黒き剣への再戦'],[21,'assets/late-ash-arrival-v1.jpg','灰に変わった王都']],
    '1-102':[[0,'assets/reader-day92-rune-handoff-v1.jpg','別の道を進む仲間へ'],[3,'assets/reader-day92-ash-stairs-v1.jpg','灰に埋もれた階段を進む'],[5,a(102),'百智卿との対話'],[8,'assets/late-gideon-combat-v1.jpg','術を止める間合い'],[20,'assets/late-tower-v1.jpg','神授塔の六人']],
    '1-103':[[0,'assets/reader-day93-ashen-provisions-v1.jpg','灰都の大聖堂で、食料を分ける'],[5,a(103),'斧を持つ王'],[11,'assets/reader-day93-hoarah-pressure-v1.jpg','受け止めきれない力'],[19,'assets/reader-day93-stones-return-v1.jpg','敗北した手元に、六つの鍛石']],
    '1-104':[[0,'assets/reader-day94-three-routes-v1.jpg','二日を、三隊で使う'],[6,a(104),'結晶人に打撃を'],[11,'assets/reader-day94-hidden-chest-v1.jpg','隠された坑道の鈴玉'],[14,'assets/reader-day94-glovewort-v1.jpg','クララのための一輪'],[21,'assets/reader-day94-returned-tools-v1.jpg','持ち帰ったものを、並べる']],
    '1-106':[[0,'assets/reader-day96-command-lines-v1.jpg','先生の次に、指揮する人'],[5,'assets/reader-day96-throne-approach-v1.jpg','鍛え直した武器と、同じ王座へ'],[14,'assets/reader-day96-tsumugi-fire-v1.jpg','紬、空けてもらった場所に火柱を'],[16,a(106),'武器を捨てた戦士'],[31,'assets/reader-day96-victory-thirteen-v1.jpg','十三人で、王座への道を開く'],[36,'assets/reader-day96-homecoming-v1.jpg','使わずに済んだ、救援の紙']],
    '1-110':[[0,'assets/reader-ending-melina-v1.jpg','一人の旅人へ、おかえりを'],[39,'assets/reader-school-homecoming-v1.jpg','元の教室へ。先生も含めて、三十三人。']]
  };
  for(const s of d.scenes){if(cues[s.id]){s.artBeats=cues[s.id].map(([paragraph,image,label])=>({paragraph,image,label}));s.originalImage=s.image;s.image=s.artBeats[0].image;}}
  window.READER_ART_CUES={version:2,scenes:cues};
})();
