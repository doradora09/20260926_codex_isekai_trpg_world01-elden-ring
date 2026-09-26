(function () {
  'use strict';
  const data = window.STORY_READER_DATA;
  const aliases = window.READER_FINALE;
  if (!data || !aliases || data.scenes.some(s => s.id === '1-25-council')) return;
  const before = data.scenes.find(s => s.id === '1-25');
  if (before) {
    data.scenes.splice(data.scenes.indexOf(before) + 1, 0, {
      ...before, id: '1-25-council', sourceTurn: '1-25', title: '二人の向こうが、見えない。',
      startDay: 3, endDay: 3, dayLabel: 'DAY 3', phase: '作戦会議 · 関門前への道', supplementType: 'council',
      image: 'assets/reader-map-gatefront-watch.svg', quote: '', cards: [],
      text: [
        '【DAY3・朝／斥候の帰還後】澪が描いた二つの点を、私はしばらく見ていた。七人とも帰ってきた。矢も使っていない。無事な報告なのに、その先を決めようとすると指が止まった。二人なら、と思いかけた自分がいた。',
        '「二人を倒せば、通れそうですか」\n蓮の問いに、私は点の奥を指した。\n「そこが、まだ分からない。二人しかいないのか、見える所に二人いたのか」\n澪が頷く。尾根の向こうは、まだ紙の色のままだった。敵がいないことを表す余白ではない。見えなかった場所だ。',
        '私が欲しいのは、野営地を片づけたという報告ではなかった。関門前の祝福まで届く道だ。身体を休められる場所が増えれば、ここだけを頼りにするより先を考えられる。メリナへつながる手掛かりも、そこにあるかもしれない。けれど、ゲームの記憶だけで三十三人を連れて歩くには、道があまりに細かった。',
        '手前の一人へ仕掛ける。物音がする。奥から誰かが来る。そこで初めて人数が分かったとして、その時にはもう、生徒が相手の手の届く所にいる。私は二つの点を囲もうとした手を下ろした。戦える相手の数に見えるよう、勝手に線を引いてはいけない。',
        '結衣が、水袋を地図の脇へ置いた。\n「待つなら、その間の食事も要りますね」\n残っている飲用水は二リットル。昨夜の食材は食べ切った。待てば安全になるわけでもない。偵察に出す人数を増やしすぎれば、今度は水を運ぶ人と、教会の火を見る人が足りなくなる。',
        '「数日、確かめよう。出る時間と見る場所を変える。ただし、奥まで行くために戦いは始めない」\n急いでいないように聞こえただろうか。私自身、そう思われるのが怖かった。帰るために進みたい。その気持ちを、見えていない敵へ生徒を向かわせる理由にはしたくなかった。',
        '蓮は二つの点の横に「同時に見た」と書いた。澪はその下へ、確かめたいことを並べる。何人いるか。どこから来るか。祝福へ向かう道と、戻る道。推測は別の欄へ置く。見つけられなかった日に、空欄を想像で埋める約束にはしなかった。',
        '「待っている間も、皆が食べられるようにします」\n結衣の言葉で、ようやく次の一日が形になった。生活を続ける人。見て戻る人。その報告で判断する私。地図の先は白いままだ。それでも、何が分かれば次を決められるのかは、さっきよりはっきりしていた。'
      ]
    });
    aliases.sourceIds['1-25-council'] = '1-25';
    aliases.suppressContext.push('1-25-council');
  }
  const training = data.scenes.find(s => s.id === '1-32');
  if (training) {
    const original = {...training, text: training.text.slice()};
    Object.assign(training, {title: '一人ずつ、力をつける。', endDay: 9, dayLabel: 'DAY 7–9', text: original.text.slice(0, 4), quote: '', cards: []});
    const night = {
      ...original, id: '1-32-night', sourceTurn: '1-32', title: '十日目の、ぬるい風。',
      startDay: 10, endDay: 10, dayLabel: 'DAY 10', phase: '夜の小景', quote: '', cards: [],
      image: 'assets/redmoon-day10-omen-v1.jpg',
      text: [
        '【DAY10・夜／エレの教会】火を小さくして、最後の鍋を脇へ寄せた。皆が横になる頃、壁の隙間から風が入った。昼の熱が残った石をなでたような、妙にぬるい風だった。',
        '澪が空を見上げる。\n「月、少し赤くないですか」\n雲の薄い所に、小さな月があった。夕暮れの色を、そこだけ拭き残したように見える。見ているうちに雲が重なり、赤かったのかどうか、はっきりしなくなった。',
        '遠くで犬が鳴いた。少し遅れて、別の方角からも声がした。私は鍋の蓋を置く手を止め、次の音を待った。草の擦れる音だけが、しばらく続いた。近づいてくる足音はなかった。',
        '「いつも、あんな所から聞こえたかな」\n答えを求めて言ったわけではなかった。ここで暮らし始めて、まだ十日しか経っていない。いつも、という言葉を使えるほど、この土地の夜を知ってはいないのだ。',
        '澪は手帳の端へ、月を小さく描いた。その下に「風がぬるい」と書く。私は外へ確かめに行くのをやめ、次の見張りへ、聞こえた方角だけを伝えた。',
        'やがて犬の声は途切れた。誰も飛び起きることはなく、その夜は過ぎた。朝になれば、また水を汲み、食事を作り、身体の動かし方を練習する。紙の端の赤い月だけが、まだ何の印にもならずに残っていた。'
      ]
    };
    const later = {...original, id: '1-32-training', sourceTurn: '1-32', startDay: 11, endDay: 18, dayLabel: 'DAY 11–18', text: original.text.slice(4)};
    later.text[0] = later.text[0].replace('この間に三十四便', 'DAY7から18までの育成期間を通じて三十四便');
    data.scenes.splice(data.scenes.indexOf(training) + 1, 0, night, later);
    aliases.suppressContext.push('1-32', '1-32-night');
    aliases.contextSources[later.id] = '1-32';
    aliases.sourceIds[later.id] = '1-32';
    aliases.conditionSources[later.id] = '1-32';
    aliases.suppressConditions = [...(aliases.suppressConditions || []), '1-32'];
    aliases.progressSources['1-32'] = '1-31';
    aliases.progressSources[night.id] = '1-31';
    aliases.progressSources[later.id] = '1-32';
    if (data.byDay) {
      for (let day = 8; day <= 18; day++) data.byDay[day] = {id: day < 10 ? '1-32' : day === 10 ? night.id : later.id, covered: true};
    }
  }
  const guide = data.scenes.find(s => s.id === '1-32-guide');
  if (guide) {
    guide.text = [
      '原作の道筋を、調べられる。先生は手帳を開き、関門前の野営地を抜けた先を確かめた。道は嵐の丘へ続き、その先にストームヴィル城がある。三十三人の地図に、初めて「いまの生活圏の向こう」が一本の線でつながった。',
      'けれど、その線へ向かう前に知りたいことがあった。野営地には角笛を持つ兵がいる。警報を許さず、一度に相手をする数を減らせないか。先生は調べた手順を、澪が観察した位置と重ねてみる。',
      '「先に、笛の人を探すんですね」\n蓮の指が、地図の関門前で止まった。\n「前に見た場所へ、今日も立っているとは限らない。まず配置を確かめる。それから、一体ずつ離せるか考えよう」',
      '攻略記事には先の道があった。今日、何時に誰がその道を歩くかはない。先生は城へ伸びる線を薄く残し、いま確かめる野営地の周りを、少し濃くなぞった。'
    ];
  }
})();
