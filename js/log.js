// Log.js

import { marked } from 'https://cdnjs.cloudflare.com/ajax/libs/marked/16.3.0/lib/marked.esm.js';

export default class Log {
  constructor(container, logDir = '/log/', limit = 3, isOpen = false) {
    this.container = container || document.getElementById('log');
    this.isOpen = isOpen;
    this.loadLog(logDir, limit);
  }

  async loadLog(logDir, limit) {
    // index.json を読み込む
    const res = await fetch(`${logDir}index.json`);
    let files = await res.json();

    // markdown を新しい順にソート
    files = files.sort().reverse().slice(0, limit);

    // 各 markdown を読み込んで表示
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.renderLog(`${logDir}${file}`, i);
    }
  }

  async renderLog(url, i) {
    const res = await fetch(url);
    const text = await res.text();

    // フロントマター抽出
    let meta = {};
    let body = text;
    const match = text.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)/);
    if (match) {
      const metaText = match[1];
      body = match[2];

      metaText.split('\n').forEach(line => {
        const [key, ...rest] = line.split(':');
        if (!key || rest.length === 0) return;
        meta[key.trim()] = rest.join(':').trim();
      });
    }

    // details 要素作成
    const details = document.createElement('details');
    if (this.isOpen && i === 0) details.open = true; // 最初の1件だけ開く

    // summary に反映
    const summary = document.createElement('summary');
    summary.textContent = `${meta.date ?? ''} | ${meta.title ?? ''}`;

    // marked を使って本文を HTML に変換
    const content = document.createElement('div');
    content.className = 'log__body';
    content.innerHTML = marked.parse(body);

    // 挿入
    details.appendChild(summary);
    details.appendChild(content);
    this.container.appendChild(details);
  }
}
