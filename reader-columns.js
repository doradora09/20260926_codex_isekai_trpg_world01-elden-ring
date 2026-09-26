(function () {
  'use strict';
  const chapter = document.getElementById('chapter');
  const meta = document.getElementById('chapterMeta');
  const prose = document.getElementById('prose');
  const figure = document.getElementById('figure');
  const image = document.getElementById('chapterImage');
  const textPanel = document.getElementById('textPanel');
  if (!chapter || !meta || !prose || !figure || !image || !textPanel) return;
  const caption = figure.querySelector('figcaption');
  const originalCaption = caption?.textContent || '';
  const originalLabel = textPanel.getAttribute('aria-label');
  const rules = [
    ['赤月', '十日ごとに、備える夜。', '日が進むほど危険は増し、普段と違う敵の動きや夜襲も起こり得る。けれど、必ず戦闘になるとは限らない。'],
    ['復活', 'まだ灯していない祝福が、帰り道。', '生き残った仲間が新しい祝福を開くと、離脱中の全員がそこへ復活する。同じ祝福で再び復活させることはできず、記憶と傷痕も残る。'],
    ['損耗', '身体が癒えても、刃は欠けたまま。', '祝福では装備は直らない。修理には資材・費用・時間が必要。矢、食料、水も自分たちで補う。'],
    ['期限', '百日目の終わりまでに、結末を。', 'DAY100の終わりまでに世界の結末を一つ成立させる。その時、生存・復活済みの仲間が帰還できる。']
  ];
  const pages = {
    '1-18-cast': {
      image: 'assets/reader-column-first-cast-v1.jpg', alt: '旅立ちの装備を確かめ合う生徒たち',
      caption: '三十二人。それぞれに、できることと怖いことがある。',
      kicker: '人物紹介 ── 最初の班分け',
      rules: [
        ['結衣（ゆい）', '声をつなぐ。', '皆をまとめ、離れた班へ判断を伝える。笛は一回きり。吹く時も、吹かずに退く時も決めなければならない。'],
        ['蓮（れん）', '見て、戻って、伝える。', '斥候の先導役。見えた一人を「敵は一人」と言い換えない。'],
        ['澪（みお）', '見たことを、残す。', '手帳に人数と道を記す。分からない所を、空欄のままにできる記録役。'],
        ['陽太（ようた）', '前へ出る力を、使い分ける。', '槍を持つ狩りの前衛。獲物を追うだけでなく、仲間を止める役も覚えていく。'],
        ['葵（あおい）', '手が届く所で、支える。', '初めの治療は小傷に限り、三回まで。誰にでも何度でも使える安心ではない。'],
        ['隼人（はやと）', '反発もする。持ち場にも立つ。', '口は悪いが、退く合図は確かめる。前へ出たい気持ちと、仲間を残せない気持ちを持つ。']
      ], reminder: '水汲みには誠の桶、拠点には楓の木槌と美咲の裁縫。戦わない仕事にも、名前がある。', note: 'この時点での役割。先の成長や結末は、まだ分からない。'
    },
    '1-25-council': {
      image: 'assets/reader-map-gatefront-watch.svg', alt: '教会から観測した尾根までの道。見えた兵二人より奥と、関門前の祝福への経路はまだ未確認。',
      caption: '余白は、安全な場所ではない。まだ見えていない場所。',
      kicker: '作戦会議 ── 最初の進路を決める',
      rules: [
        ['目標', '関門前の祝福まで、道をつなぐ。', '欲しいのは敵を倒した数より、先へ進み、戻ってこられる足場。祝福への経路を確かめたい。'],
        ['不安', '見えた二人が、全てとは限らない。', '尾根の向こうも、増援の人数も分からない。攻撃してから確かめるには、生徒が近すぎる。'],
        ['代償', '数日待つにも、水と食料が要る。', '偵察へ全員を回せば、生活が止まる。観測と調達を分担し、皆が動ける日をつなぐ。'],
        ['方針', '見たことと、推測を分けて持ち帰る。', '時刻と観測場所を変え、戦わず戻る。空欄を想像で埋めず、次を決められるだけの情報を集める。']
      ],
      reminder: '「二人しかいないのか、見える所に二人いたのか」',
      note: 'DAY3・朝の帰還時点。これからの偵察結果は、まだ記されていません。', fullText: true,
      fullTextOpen: false
    },
    '1-8-plan': {
      image: 'assets/reader-plan-first-steps.svg', alt: '騎士を避け、教会へ退避し、水と食料を確保してから育成を確かめる行動順',
      caption: '先生の記憶から組み立てた、最初の順番。',
      kicker: '先生の思案 ── 最初の行動順',
      rules: [
        ['避ける', '黄金の騎士とは、戦わない。', 'ゲームを知っているのは先生だけ。案内役に見えても危険な相手だと伝え、巡回路から距離を取る。'],
        ['退避', '近くの教会を目指す。', '商人がいたはずの場所へ。着いたら人数を数え、見張りと戻る場所を決める。'],
        ['生活', '水、食料、寝床を先に。', '三十三人が今日を越えるために必要な物を確かめる。安全な採取路と、戻る合図を用意する。'],
        ['育成', '祝福とメリナの手掛かりを探す。', 'ルーンを集めるだけでは、力に変えられなかったはず。出会う場所の記憶は曖昧だ。すぐ強くなれると決めつけず、現地で確かめる。']
      ],
      reminder: '知っている敵の順番より、皆が明日も動ける順番を。',
      note: 'まだ確かめていない、先生の記憶と計画。', fullText: true, fullTextLabel: '先生の考えを読む'
    },
    '1-8': {
      imageScene: '1-8', alt: '生徒の能力確認を見ながら、全員が帰る方法を考える先生',
      caption: '一回も死なずに、クリア。\nそんなことが、本当にできるのか。',
      kicker: '先生の思案 ── まだ口には出していないこと',
      rules: [
        ['懸念', '知っているゲームほど、怖い。', '画面の向こうでは何度も倒れた。今、そこへ連れてきたのは三十二人の生徒だ。同じ失敗を、気軽には繰り返せない。'],
        ['現実', '生徒の高揚と、巡回する騎士。', '皆が自分の能力を見比べている間も、敵は道を巡っている。話し合いが終わるまで待ってはくれない。'],
        ['疑問', '戻ることと、家へ帰ること。', '倒れて女神の広間へ戻れても、それで旅が終わるわけではない。離れた仲間まで、同じ帰り道につなげられるのか。'],
        ['次の一歩', '全員の力を知り、条件を確かめる。', '目の前には、返事を待つ生徒がいる。不安だけを渡す前に、何を任せられ、何を確かめるべきかを整理する。']
      ],
      reminder: '先生の懸念は、まだ生徒たちには伝わっていない。',
      note: 'この時点では、能力の確認が続いている。', fullText: true, fullTextLabel: '先生の思案を読む'
    },
    '1-99-council': {
      image: 'assets/reader-map-final-route.svg', alt: 'マリケスから結末へ至る四つの関門。最後はラダゴンとエルデの獣の二連戦。',
      caption: '勝った印ではなく、これから挑む順番。',
      kicker: '作戦会議 ── DAY89・赤月を前に',
      rules: [
        ['残る敵', '四つの関門。最後だけ、二連戦。', 'マリケス、ギデオン、ゴッドフレイ。そしてラダゴンからエルデの獣へ。前の三戦を越えても、最後の二体には休息を挟めない。'],
        ['持ち時間', '赤月の翌日から、九日で進む。', 'DAY90を全員で守り、DAY91–99を攻略と立て直しに使う。期限はDAY100の終わり。結末の確定と仲間の救出にも時間を残す。'],
        ['日程', 'DAY95を仮目標に、余白を残す。', 'DAY91に再戦。その後の移動と連戦を経て、DAY95に最後の戦いへ。DAY96–99は遅れと救援に備える。勝てた場合の計画だ。'],
        ['優先', '明日の守りと、再戦の手順。', '今夜は教会。大橋の祝福から再開できる道はある。新しい遠征を増やすより、交代・回復・退路を詰めて、次の一歩に力を残す。']
      ],
      reminder: '倒す相手の数より、残せる再挑戦の回数を考える。',
      note: 'DAY89時点の先読み。後日の勝敗は、この予定には含めていません。', fullText: true
    },
    '1-107-council': {
      image: 'assets/reader-map-final-plan.svg', alt: '教会から十三人が二連戦へ、留守の二十人は翌朝の救援を準備する作戦図',
      caption: '黄金樹へ向かう線だけを、\n最後の一本にはしない。',
      kicker: '作戦会議 ── 決戦前の最終確認',
      rules: [
        ['先生', '今日、十三人で出発する。', '「残り三日。これ以上、探し物で往復はできない。整えた支度で、二連戦を越えよう」'],
        ['葵', '一戦目で、使い切らない。', '「回復も支援も、次の戦いに残します。傷を隠して前に立たないで。交代できるうちに、呼んでください」'],
        ['蓮', '先生が倒れたら、自分が決める。', '「勝てるなら続ける。勝ち目がなくなったら退く。先生を追って、全員を失うことはしません」'],
        ['翼', '翌朝六時。返事がなくても動く。', '「戻らなければ、新しい祝福を開きます。探しに走るんじゃなく、帰ってくる場所を用意して待ちます」']
      ],
      reminder: '「戻れるから大丈夫、とは思わないでください」── 颯',
      note: '出発前の確認。結果を書く欄は、帰ってくるまで空けておく。',
      fullText: true
    },
    '1-13-map': {
      image: 'assets/reader-map-limgrave.svg', alt: '現在地のエレの教会、北の関門前、東の湖を結ぶ略図。教会の外への道は未確認。',
      caption: '歩いて確かめる前の、最初の略図。',
      kicker: '作戦会議 ── リムグレイブで生き延びる',
      rules: [
        ['現在地', 'エレの教会に、三十三人。', 'カーレのいる教会を拠点にする。帰り道の起点は、ここ。'],
        ['生活', '東の湖で、水場を探す。', '水があることと、安全に汲めることは別。食料と寝床の確保もまだ続く。'],
        ['偵察', '北の関門前は、まず確かめる。', '祝福と敵の位置を少人数で確認する候補。全員で突破する段階ではない。'],
        ['方針', '進む距離より、戻れる道。', '戦う力と生活を整え、無理なら引き返す。遠征の前に、皆の明日を守る。']
      ],
      reminder: '地図の点線は「行けそうな方向」。安全が確認された道ではない。',
      note: 'この時点の記憶と伝聞をまとめた略図です。縮尺・移動時間・敵の位置は表していません。'
    },
    '1-43-rules': {
      imageScene: '1-2', alt: '先生と生徒たちに約束を告げる女神リュシア',
      caption: '知っている世界でも、\n同じやり方で帰れるとは限らない。',
      kicker: '旅のしおり ── 女神との約束', rules,
      reminder: '復活も、チェックポイントからのやり直しも、過ぎた日数は戻らない。',
      note: 'この物語独自のルールです。原作のゲーム仕様とは異なります。'
    },
    '1-32-guide': {
      image: 'assets/reader-map-foresight.svg', alt: '教会を起点に生活圏を整え、関門前を次の候補として調べる道筋。先の土地は未踏。',
      caption: 'DAY18：実線は歩いた道。点線は、調べた先の道。',
      kicker: '旅のしおり ── 先生の固有スキル',
      rules: [
        ['先読み', '原作の道筋を、調べられる。', '関門前を抜ける道は、嵐の丘、その先のストームヴィル城へ続いている。'],
        ['調べる', 'いま困っているのは、野営地。', '角笛で敵が集まれば、全員を危険にさらす。警報を許さず、一体ずつ離せないか。'],
        ['重ねる', '攻略の手順を、斥候の地図へ。', '「先に、笛の人を探すんですね」蓮が指す位置を、先生はまだ確定しない。今日もそこにいるかを、見に行く。'],
        ['選ぶ', '遠い城より、目の前の道から。', '先への線は薄く残す。次の朝に確かめる範囲だけを、濃く囲んだ。']
      ],
      reminder: '手順は読める。今日の配置も、明日の結果も、まだ分からない。',
      note: '先生の固有スキルを使った、次の一手。', fullText: true, fullTextLabel: '地図を広げた先生たちの会話'
    }
  };
  for (const part of window.READER_CHAPTERS?.parts || []) {
    pages[part.id] = {...part, chapterNumber: part.number, note: part.range + ' ／ ここまでに分かったことと、この先の課題。'};
  }
  const el = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text != null) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  const stamp = el('p', '', 'reader-interlude-stamp');
  stamp.hidden = true;
  document.getElementById('chapterTitle')?.before(stamp);
  Object.assign(pages,window.READER_EXTRA_COLUMNS||{});
  const atlas = window.READER_ATLAS || {};
  for (const page of Object.values(pages)) {
    const map = atlas[(page.image || '').split('/').pop()];
    if (map) {
      page.image = map.asset;
      page.alt = map.title + '／' + map.day + 'の作戦用の略図';
    }
  }
  for (const scene of window.STORY_READER_DATA.scenes) {
    const map = atlas[(scene.image || '').split('/').pop()];
    if (map) scene.image = map.asset;
  }
  let current = null;
  function render() {
    const id = chapter.dataset.readerScene;
    const page = pages[id];
    if (id === current && (!page || prose.querySelector('.column-rules'))) return;
    current = id;
    const supplement = window.STORY_READER_DATA?.scenes.find(scene => scene.id === id)?.supplementType;
    stamp.hidden = !supplement;
    stamp.textContent = page?.chapterNumber || (supplement === 'council' ? '作戦会議' : '補足コラム');
    stamp.dataset.kind = supplement || '';
    const column = Boolean(page);
    chapter.dataset.layout = column ? 'column' : '';
    chapter.dataset.columnArt = /\.svg(?:[?#]|$)/i.test(page?.image || '') ? 'map' : '';
    chapter.dataset.columnKind = page?.chapterNumber ? 'chapter' : '';
    document.body.dataset.readerLayout = column ? 'column' : '';
    textPanel.setAttribute('aria-label', column ? '旅のしおり・コラム' : originalLabel || '物語の本文・スクロールして読む');
    if (caption) caption.textContent = column ? page.caption : originalCaption;
    if (!column) return;
    const summary = document.getElementById('playerDecisionSummary');
    if (summary) summary.hidden = true;
    // Keep the reference on the left; discussion and optional details live on the right.
    const illustration = window.STORY_READER_DATA?.scenes.find(scene => scene.id === page.imageScene);
    const art = page.image || illustration?.image;
    if (art) {
      figure.hidden = false;
      image.src = art;
      image.alt = page.alt || page.number + 'の扉・' + page.title.replace('\n', '');
    }
    const list = el('dl', null, 'column-rules');
    for (const [index, [name, heading, text]] of page.rules.entries()) {
      const item = el('div', null, 'column-rule');
      item.dataset.rule = String(index + 1);
      const term = el('dt');
      term.append(el('span', name, 'column-rule-name'), el('span', heading));
      item.append(term, el('dd', text));
      list.append(item);
    }
    prose.replaceChildren(
      el('p', page.kicker, 'column-kicker'),
      list,
      el('p', page.reminder, 'column-reminder'),
      el('p', page.note, 'column-note')
    );
    if (page.fullText) {
      const story = window.STORY_READER_DATA.scenes.find(scene => scene.id === id);
      const details = el('details', null, 'column-conversation');
      details.open = Boolean(page.fullTextOpen);
      details.append(el('summary', page.fullTextLabel || '作戦会議の会話を読む'));
      const body = el('div', null, 'column-conversation-body');
      for (const text of story?.text || []) body.append(el('p', text));
      details.append(body);
      prose.append(details);
    }
    textPanel.scrollTop = 0;
  }
  new MutationObserver(render).observe(meta, {childList: true, characterData: true, subtree: true});
  render();
  // Anchor navigation to the viewport, not variable story/column heights.
  function alignNavigation() {
    const bounds = chapter.getBoundingClientRect();
    document.documentElement.style.setProperty('--reader-nav-left', Math.max(6, bounds.left + 10) + 'px');
    document.documentElement.style.setProperty('--reader-nav-right', Math.max(6, window.innerWidth - bounds.right + 10) + 'px');
  }
  window.addEventListener('resize', alignNavigation);
  alignNavigation();
})();
