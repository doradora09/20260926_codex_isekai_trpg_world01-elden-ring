(function () {
  'use strict';
  const data = {...window.READER_OUTCOMES};
  for (const [id, override] of Object.entries(window.READER_FINALE?.outcomeOverrides || {})) {
    data[id] = override?.from ? {...window.READER_OUTCOMES[override.from], ...override} : override;
  }
  // Turning-point atmosphere does not announce death, revival, or victory.
  const atmospheres = {
    '1-27': {kind: 'firstcombat', label: '初めての実戦'},
    '1-29': {kind: 'loss', label: '帰り道の危機'},
    '1-29-grace': {kind:'revival',label:'関門前の祝福'},
    '1-41': {kind:'boss',label:'強敵との戦い'},
    '1-59': {kind:'boss',label:'討論室へ'},
    '1-62': {kind:'boss',label:'大書庫の女王'},
    '1-98': {kind:'boss',label:'獣の司祭'},
    '1-93-farum': {kind:'farum',label:'崩れゆくファルム・アズラ'},
    '1-93': {kind: 'embers', label: '巨人の火の釜'},
    '1-107-council': {kind: 'council', label: '作戦会議 · 決戦を前に'}
  };
  const meta = document.getElementById('chapterMeta');
  const anchor = document.getElementById('quote') || document.getElementById('prose');
  if (!data || !meta || !anchor) return;
  const panel = document.createElement('section');
  panel.id = 'chapterOutcome';
  panel.className = 'chapter-outcome';
  panel.hidden = true;
  panel.setAttribute('aria-label', 'この話の結果');
  anchor.after(panel);
  const postscript = document.createElement('section');
  postscript.className = 'chapter-outcome outcome-postscript';
  postscript.hidden = true;
  panel.after(postscript);
  const node = (tag, text, cls) => {
    const el = document.createElement(tag);
    el.textContent = text;
    if (cls) el.className = cls;
    return el;
  };
  const textPanel = document.getElementById('textPanel');
  const prose = document.getElementById('prose');
  const chapterImage = document.getElementById('chapterImage');
  const chapter = document.getElementById('chapter');
  const encounterNote = node('p', '', 'encounter-note');
  encounterNote.hidden = true;
  const title = document.getElementById('chapterTitle');
  title?.before(encounterNote);
  const overlay = node('button', '', 'battle-result-overlay');
  overlay.type = 'button';
  overlay.hidden = true;
  overlay.setAttribute('aria-label', '戦闘結果を閉じる');
  document.body.append(overlay);
  const announcement = node('span', '', 'outcome-announcement');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  document.body.append(announcement);
  function appendRewards(parent, entry, compact) {
    const change = entry.progressChange, rewards = entry.rewards;
    if (!change && !rewards) return;
    const box = node('span', '', compact ? 'battle-result-rewards' : 'outcome-rewards');
    if (change) {
      const text = change.delta > 0
        ? '攻略進捗 ＋' + change.delta + '%（' + change.before + '% → ' + change.after + '%）'
        : '攻略進捗 ' + change.after + '%（据え置き）';
      box.append(node('span', text, 'outcome-progress-gain'));
      box.append(node('span', change.estimated ? '※振り返り用の攻略目安' : '※この卓の攻略目安', 'outcome-progress-note'));
    }
    if (rewards) {
      box.append(node('span', '獲得：' + rewards.items.join(' ／ '), 'outcome-loot'));
      box.append(node('span', '＋' + rewards.runes.toLocaleString('ja-JP') + ' ルーン（卓内報酬）', 'outcome-runes'));
    }
    parent.append(box);
  }
  function appendChanges(parent,entry,compact){
    if(!entry.changes?.length)return;
    const box=node('span','','outcome-changes');
    for(const [label,value] of entry.changes){const line=node('span','','outcome-change');line.append(node('b',label),node('span',value));box.append(line)}
    parent.append(box);
  }
  function appendAftermath(parent, entry, compact) {
    const report = entry.aftermath;
    if (!report) return;
    const box = node('span', '', compact ? 'battle-result-aftermath' : 'outcome-aftermath');
    box.append(node('span', 'この赤月の被害・消耗', 'aftermath-heading'));
    const injuries = report.injured == null ? '負傷：' + report.injuryNote
      : '負傷 ' + report.injured + '名' + (report.injuryNote ? '（' + report.injuryNote + '）' : '');
    box.append(node('span', '死者 ' + report.deaths + '名 ／ ' + injuries, 'aftermath-people'));
    if (report.damage) box.append(node('span', '損耗：' + report.damage, 'aftermath-detail'));
    if (report.supplies) box.append(node('span', '物資：' + report.supplies, 'aftermath-detail'));
    parent.append(box);
  }
  let current = null, firstParagraph = null, activeEntry = null, shown = false, armed = false;
  let timer = null, frame = null, initialPageY = window.scrollY;
  function dismiss() {
    overlay.hidden = true;
    clearTimeout(timer);
    timer = null;
  }
  overlay.addEventListener('click', dismiss);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') dismiss();
  });
  function revealIfReached() {
    frame = null;
    if (window.READER_EFFECTS?.enabled===false || !armed || shown || !activeEntry || panel.hidden || chapter?.dataset.mode === 'image') return;
    const stamp = panel.querySelector('.outcome-stamp');
    if (!stamp || !stamp.getClientRects().length) return;
    const rect = stamp.getBoundingClientRect();
    const clip = textPanel ? textPanel.getBoundingClientRect() : {top: 0, bottom: innerHeight, left: 0, right: innerWidth};
    const top = Math.max(0, clip.top), bottom = Math.min(innerHeight, clip.bottom);
    const left = Math.max(0, clip.left), right = Math.min(innerWidth, clip.right);
    if (rect.height <= 0 || Math.min(rect.bottom, bottom) - Math.max(rect.top, top) < rect.height * .6 || rect.right <= left || rect.left >= right) return;
    shown = true;
    overlay.replaceChildren();
    overlay.dataset.kind = activeEntry.kind;
    const band = node('span', '', 'battle-result-band');
    if (activeEntry.event) band.append(node('span', activeEntry.event, 'battle-result-event'));
    band.append(node('span', activeEntry.label, 'battle-result-title'), node('span', activeEntry.subject, 'battle-result-subject'));
    appendRewards(band, activeEntry, true);
    appendAftermath(band, activeEntry, true);
    appendChanges(band,activeEntry,true);
    band.append(node('span', 'クリック / Esc で閉じる', 'battle-result-hint'));
    overlay.append(band);
    overlay.dataset.image = activeEntry.resultImage || '';
    if (overlay.dataset.image && window.READER_EFFECTS?.art !== false && chapterImage) {
      chapterImage.src = overlay.dataset.image;
      chapterImage.alt = activeEntry.subject + 'の挿絵';
    }
    overlay.hidden = false;
    announcement.textContent = activeEntry.label + '。' + activeEntry.subject;
    timer = setTimeout(dismiss, activeEntry.kind==='growth'?4500:['loss','revival'].includes(activeEntry.kind)?5500:activeEntry.aftermath ? 7000 : activeEntry.rewards ? 6000 : 3000);
  }
  function onScroll(event) {
    if (!activeEntry || shown) return;
    if ((event.target === textPanel && textPanel.scrollTop > 8) || (event.target === document && Math.abs(window.scrollY - initialPageY) > 8)) armed = true;
    if (armed && frame === null) frame = requestAnimationFrame(revealIfReached);
  }
  // Reveal at the end of the encounter, before any later travel or debrief.
  textPanel?.addEventListener('scroll', onScroll, {passive: true});
  document.addEventListener('scroll', onScroll, {passive: true});
  function render() {
    const id = chapter?.dataset.readerScene || meta.textContent.match(/TURN (1-\d+)/)?.[1] || '';
    if (id === current && firstParagraph === prose?.children[0]) return;
    current = id;
    firstParagraph = prose?.children[0];
    dismiss();
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    shown = false;
    armed = false;
    initialPageY = window.scrollY;
    announcement.textContent = '';
    // This node survives the prose being replaced during navigation.
    // Put it back at its default location before choosing an inline placement.
    anchor.after(panel);
    panel.replaceChildren();
    postscript.hidden = true;
    postscript.replaceChildren();
    const entry = data[id];
    activeEntry = entry && (entry.encounter === 'boss' || (entry.event&&!entry.quiet) || ['growth','loss','revival'].includes(entry.kind)) ? entry : null;
    // Same background for wins and retreats: atmosphere without a result spoiler.
    const redMoon = (Boolean(entry?.event)&&!entry.quiet) || id === '1-38';
    const atmosphere = atmospheres[id];
    if (chapter) chapter.dataset.encounter = redMoon ? 'redmoon' : atmosphere?.kind || entry?.encounter || '';
    encounterNote.hidden = (!activeEntry && !redMoon && !atmosphere)||entry?.kind==='growth';
    encounterNote.textContent = redMoon ? '赤月の夜' : atmosphere?.label || (id === '1-108' ? '第一戦 · ラダゴン' : id === '1-108-beast' ? '第二戦 · エルデの獣' : activeEntry ? '強敵との戦い' : '');
    panel.hidden = !entry;
    if (!entry) return;
    panel.dataset.kind = entry.kind;
    if (entry.event) panel.append(node('p', entry.event, 'outcome-event'));
    const row = document.createElement('div');
    row.className = 'outcome-row';
    row.append(node('strong', entry.label, 'outcome-stamp'));
    const detail = document.createElement('div');
    detail.className = 'outcome-detail';
    detail.append(node('p', entry.subject, 'outcome-subject'), node('p', entry.summary, 'outcome-summary'));
    row.append(detail);
    panel.append(row);
    appendRewards(panel, entry, false);
    appendAftermath(panel, entry, false);
    appendChanges(panel,entry,false);
    if (entry.postscriptChanges?.length) {
      postscript.hidden = false;
      postscript.append(node('p', '帰還後の強化', 'outcome-subject'));
      appendChanges(postscript, {changes: entry.postscriptChanges}, false);
    }
    const paragraph = Number.isInteger(entry.afterParagraph) && prose?.children[entry.afterParagraph];
    if (paragraph) {
      // One wrapper replaces one paragraph; dice and illustration indices stay stable.
      const passage = document.createElement('div');
      passage.className = 'reader-outcome-passage';
      passage.dataset.paragraph = entry.afterParagraph;
      paragraph.before(passage);
      passage.append(paragraph, panel);
    }
  }
  new MutationObserver(render).observe(meta, {childList: true, characterData: true, subtree: true});
  render();
})();
