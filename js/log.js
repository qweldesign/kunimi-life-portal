// Log.js

import { marked } from 'https://cdnjs.cloudflare.com/ajax/libs/marked/16.3.0/lib/marked.esm.js';

export default class Log {
  constructor(container, logDir, limit = 3) {
    this.container = container || document.getElementById('log');
    this.logDir = logDir || '/log/';

    this.loadLog(limit);
  }

  async loadLog(limit) {
    // index.json を読み込む
    const res = await fetch(`${this.logDir}index.json`);
    let files = await res.json();

    // markdown を新しい順にソート
    files = files.sort().reverse().slice(0, limit);

    // 各 markdown を読み込んで表示
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const date = file.replace('.md', '');

      const mdRes = await fetch(`${this.logDir}${file}`);
      const mdText = await mdRes.text();
      const html = marked.parse(mdText); // marked を使って HTML に変換

      const details = document.createElement('details');
      if (i === 0) details.open = true; // 最初の1件だけ開く

      const summary = document.createElement('summary');
      summary.textContent = date;

      const content = document.createElement('div');
      content.className = 'log__body';
      content.innerHTML = html;

      details.appendChild(summary);
      details.appendChild(content);
      this.container.appendChild(details);
    }
  }
}
