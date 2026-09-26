(function () {
  'use strict';
  const slides = window.CREDITS_DATA?.slides;
  if (!slides) return;
  const melina = slides.find(slide => slide.id === 'day-17');
  if (melina) {
    melina.image = 'assets/reader-ending-melina-v1.jpg';
    melina.source = 'reader.html#scene-1-110';
  }
  const home = slides.findIndex(slide => slide.id === 'day-18');
  if (home !== -1) slides[home].image = 'assets/reader-school-homecoming-v1.jpg';
  if (home !== -1 && !slides.some(slide => slide.id === 'epilogue-bbq')) {
    slides.splice(home + 1, 0, {
      id: 'epilogue-bbq', kind: 'memory', duration: 12,
      dayLabel: 'EPILOGUE · 帰還後の休日',
      title: '今日は、おかわりしていい。',
      lines: ['先生のおごりで、三十三人のバーベキュー。', '「足りなかったら、また焼くから」。今度は、おなかいっぱいになるまで。'],
      image: 'assets/reader-epilogue-bbq-v1.jpg',
      source: 'reader.html#scene-1-110-bbq',
      scene: '1-110-bbq', sourceTitle: '今日は、おかわりしていい。',
      label: '帰還後の休日｜三十三人のバーベキュー'
    });
  }
})();
