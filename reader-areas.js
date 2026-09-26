(function () {
  'use strict';
  const data = window.READER_AREAS;
  const chapter = document.getElementById('chapter');
  const meta = document.getElementById('chapterMeta');
  const frame = chapter?.querySelector('.reading-frame');
  if (!data || !chapter || !meta || !frame) return;
  const banner = document.createElement('div');
  banner.className = 'reader-area-title';
  banner.hidden = true;
  banner.setAttribute('role', 'status');
  banner.setAttribute('aria-live', 'polite');
  banner.setAttribute('aria-atomic', 'true');
  const region = document.createElement('span');
  region.className = 'reader-area-region';
  const name = document.createElement('span');
  name.className = 'reader-area-name';
  banner.append(region, name);
  frame.append(banner);
  const result = document.querySelector('.battle-result-overlay');
  let scene = null, timer = null, frameId = null, generation = 0;
  function dismiss() {
    clearTimeout(timer);
    timer = null;
    if (frameId !== null) cancelAnimationFrame(frameId);
    frameId = null;
    banner.hidden = true;
  }
  function render() {
    const id = chapter.dataset.readerScene;
    if (id === scene) return;
    scene = id;
    generation++;
    dismiss();
    const current = window.STORY_READER_DATA?.scenes.find(s => s.id === id);
    const area = data.entries[id]?.[0]?.[1];
    if (!area || current?.supplementType || chapter.dataset.mode === 'image') return;
    const [title, subtitle] = data.places[area];
    name.textContent = title;
    region.textContent = subtitle;
    region.hidden = !subtitle;
    const token = generation;
    frameId = requestAnimationFrame(() => {
      frameId = null;
      if (generation !== token || chapter.dataset.mode === 'image' || (result && !result.hidden)) return;
      banner.hidden = false;
      timer = setTimeout(dismiss, 5000);
    });
  }
  new MutationObserver(render).observe(meta, {childList: true, subtree: true, characterData: true});
  new MutationObserver(() => {
    if (chapter.dataset.mode === 'image') dismiss();
  }).observe(chapter, {attributes: true, attributeFilter: ['data-mode']});
  if (result) new MutationObserver(() => {
    if (!result.hidden) dismiss();
  }).observe(result, {attributes: true, attributeFilter: ['hidden']});
  document.addEventListener('keydown', event => { if (event.key === 'Escape') dismiss(); });
  // No scroll/resize callbacks: labels appear only when entering a curated scene.
  render();
})();
