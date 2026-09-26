(function () {
  'use strict';
  const data = window.STORY_READER_DATA;
  if (!data || window.READER_CHAPTERS) return;
  const parts = [
    {
      id: '1-4-chapter', before: '1-5', source: '1-4', number: '第一章',
      title: '生き延びるために。', range: '序章・DAY1から', image: 'assets/reader-chapter-one-v1.jpg',
      caption: '知っている世界に、\n守らなければならない人がいる。',
      kicker: 'はじまりのしおり',
      rules: [
        ['あらすじ', '先生一人と、生徒三十二人。', '教室から異世界へ。ゲームを知る先生にも、皆の空腹や恐怖まで解く攻略法はない。まずは、今夜を越える場所を探す。'],
        ['先生', '経験を、皆が帰るために使う。', '敵の強さを知っているからこそ、すぐには戦えない。どこまで教え、誰に何を任せるかを考える。'],
        ['仲間', '違う声が、同じ教室から来た。', '周囲に声をかける結衣（ゆい）、様子を見る蓮（れん）、記録する澪（みお）。生徒たちにも、それぞれの考えがある。'],
        ['課題', '水、食料、寝床。そして帰り道。', '遠くの敵を倒す前に、三十三人の明日を守る。安全に動ける範囲を、一歩ずつ増やしていく。']
      ],
      reminder: '「誰も置いていかない」を、今日の行動に変える。'
    },
    {
      id: '1-44-chapter', before: '1-44', source: '1-44', number: '第二章',
      title: '道をひらき、\n帰る場所を守る。', range: 'DAY31から', image: 'assets/reader-chapter-two-v1.jpg',
      caption: '先へ向かう人。\n帰りを支える人。',
      kicker: 'ここまでと、これから',
      rules: [
        ['あらすじ', '生きるための手順は、できてきた。', '教会には食事と見張りの仕事が生まれ、仲間を失う怖さも知った。けれど、ここで待つだけでは元の世界へ帰れない。'],
        ['攻略', '先生と、育っていく二つの隊。', '直人（なおと）と大地（だいち）が前を支え、蓮が進退を考える。危険な先を調べ、必要な時に力を集める。'],
        ['拠点', '留守を守る仲間も、旅を進める。', '結衣や澪を中心に、食料、水、物資と帰還の連絡をつなぐ。遠征と暮らしを、同時に動かさなければならない。'],
        ['課題', '攻略の一歩と、赤月への備え。', '新しい土地へ進むほど、補給も帰路も長くなる。十日ごとの赤月を見据え、どこで引き返すかも決めておく。']
      ],
      reminder: '全員が同じ場所で戦うことだけが、皆で進む方法ではない。'
    },
    {
      id: '1-92-chapter', before: '1-92', source: '1-92', number: '第三章',
      title: '百日目の、その前に。', range: 'DAY82から', image: 'assets/reader-chapter-three-v1.jpg',
      caption: '急がなければ帰れない。\n急ぐだけでも、帰れない。',
      kicker: 'ここまでと、これから',
      rules: [
        ['あらすじ', '王都を越えても、旅は終わらない。', '雪の山へ道をつなぎ、赤い雨の夜を教会で越えた。次は火の巨人。百日目の期限まで、もう二十日もない。'],
        ['主力', '先生と攻略組十二人で、先へ。', '葵（あおい）の回復、紬（つむぎ）の防護、前衛と後衛の交代。先生だけに頼りきらず、残る力をつないで戦う。'],
        ['後方', '翼たちの調達と、教会の暮らし。', '第３チームの翼（つばさ）たちと、結衣たち拠点の仲間。物資と帰る場所を守る仕事は、ここからも続く。'],
        ['課題', '準備に使う一日も、選び取る。', '強くなるまで待つか、今の力で挑むか。負けた後の立て直しも含め、残る日を何に使うかが重くなる。']
      ],
      reminder: '勝つことと、全員で帰ること。その両方に間に合わせる。'
    }
  ];
  for (const part of parts) {
    const source = data.scenes.find(s => s.id === part.source);
    const before = data.scenes.findIndex(s => s.id === part.before);
    if (!source || before < 0) throw new Error('Missing chapter boundary: ' + part.id);
    data.scenes.splice(before, 0, {
      ...source, id: part.id, sourceTurn: part.source, title: part.title.replace('\n', ''),
      phase: part.number + ' · 章の扉', supplementType: 'chapter', quote: '', cards: [],
      image: part.image || data.scenes.find(s => s.id === part.imageScene)?.image,
      text: part.rules.map(([, heading, text]) => heading + '\n' + text).concat(part.reminder)
    });
    window.READER_FINALE?.suppressContext.push(part.id);
  }
  // Chapter introductions describe only facts already known at their boundary.
  // Turn numbers, historical records, dates and dice are not changed.
  window.READER_CHAPTERS = {parts};
})();
