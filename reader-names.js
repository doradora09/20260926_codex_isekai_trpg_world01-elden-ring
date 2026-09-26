(function () {
  'use strict';
  const chapter = document.getElementById('chapter');
  const meta = document.getElementById('chapterMeta');
  const prose = document.getElementById('prose');
  if (!chapter || !meta || !prose || !window.STUDENT_READINGS) return;
  const escape = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  function annotate(student) {
    const full = new RegExp(escape(student.family) + '[\\s　]*' + escape(student.given), 'u');
    const given = new RegExp('(?<![\\p{Script=Han}\\p{Script=Katakana}])' + escape(student.given) + '(?![\\p{Script=Han}\\p{Script=Katakana}])', 'u');
    const walker = document.createTreeWalker(prose, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.parentElement?.closest('ruby, script, style')) continue;
      const matches = [full.exec(node.data), given.exec(node.data)].filter(Boolean);
      const match = matches.sort((a, b) => a.index - b.index)[0];
      if (!match) continue;
      const ruby = document.createElement('ruby');
      ruby.className = 'student-name';
      ruby.dataset.student = student.name;
      const rt = document.createElement('rt');
      rt.textContent = full.test(match[0]) ? student.reading : student.givenKana;
      const left = document.createElement('rp'), right = document.createElement('rp');
      left.textContent = '（'; right.textContent = '）';
      ruby.append(document.createTextNode(match[0]), left, rt, right);
      node.replaceWith(document.createTextNode(node.data.slice(0, match.index)), ruby, document.createTextNode(node.data.slice(match.index + match[0].length)));
      return;
    }
  }

  function render() {
    const id = chapter.dataset.readerScene;
    for (const student of window.STUDENT_READINGS) {
      const editedFirst={'朝倉結衣':'1-2','白瀬澪':'1-2','井上結菜':'1-45'};
      let first=editedFirst[student.name]||student.firstScene;
      first=window.STORY_READER_DATA?.redirects?.[first]||first;
      if (first !== id || prose.querySelector('ruby[data-student="' + student.name + '"]')) continue;
      annotate(student);
    }
  }
  new MutationObserver(render).observe(meta, {childList: true, characterData: true, subtree: true});
  render();
})();
