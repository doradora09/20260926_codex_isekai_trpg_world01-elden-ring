(function () {
  'use strict';
  // Each label belongs to the opening scene, not to a later paragraph.
  const places = {
    goddess: ['女神の間', ''],
    limgrave: ['リムグレイブ', '導きのはじまり'],
    church: ['エレの教会', 'リムグレイブ'],
    gatefront: ['関門前', 'リムグレイブ'],
    stormgate: ['嵐の関門', 'リムグレイブ'],
    castleApproach: ['城に向かう坑道', 'ストームヴィル城の手前'],
    castleBridge: ['ストームヴィル城', '城へ至る石橋'],
    stormveilGate: ['ストームヴィル正門', 'ストームヴィル城'],
    roundtable: ['円卓', '大祝福'],
    stormveil: ['ストームヴィル城', 'リムグレイブ'],
    liurnia: ['湖のリエーニエ', ''],
    academy: ['魔術学院レアルカリア', '湖のリエーニエ'],
    altus: ['アルター高原', ''],
    capital: ['王都ローデイル', ''],
    forbidden: ['禁域', ''],
    mountaintops: ['巨人たちの山嶺', ''],
    farum: ['崩れゆくファルム・アズラ', ''],
    ash: ['灰都ローデイル', ''],
    classroom: ['いつもの教室', '元の世界']
  };
  // Curated opening locations only. Never reveal an arrival in the middle of
  // a scrolling scene, or repeat a familiar return/supply destination.
  const entries = {
    '1-2': [[0, 'goddess']],
    '1-4': [[0, 'limgrave']],
    '1-11': [[0, 'church']],
    '1-30-melina': [[0, 'gatefront']],
    '1-46': [[0, 'castleBridge']],
    '1-47': [[0, 'roundtable']],
    '1-52-scout': [[0, 'liurnia']],
    '1-58': [[0, 'academy']],
    '1-77': [[0, 'capital']],
    '1-87': [[0, 'mountaintops']],
    '1-93-farum': [[0, 'farum']]
  };
  window.READER_AREAS = {places, entries};
})();
