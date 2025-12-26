// Properties.js

export default class Properties {
  constructor() {
    this.container = document.getElementById('properties');
    if (!this.container) return;

    this.init();
  }

  init() {
    this.renderList();
  }

  async fetchProperties() {
    const res = await fetch('/properties/properties.json');
    const list = await res.json();
    return list.filter(p => p.category === 'property');
  }

  async getPropertyById(id) {
    const list = await this.fetchProperties();
    return list.find(p => p.id === id);
  }

  async renderList() {
    const list = await this.fetchProperties();

    this.container.innerHTML = '';

    const table = document.createElement('table');
    this.container.appendChild(table);

    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th>呼称</th>
        <th>住所</th>
        <th>状態</th>
        <th>&nbsp;</th>
      </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    list.forEach(item => {
      tbody.appendChild(this.renderItem(item));
    });
  }

  renderItem(item) {
    const tr = document.createElement('tr');
    const statusText = this.checkStatus(item);

    tr.innerHTML = `
      <tr>
        <td>${item.name}</th>
        <td>${item.address}</td>
        <td>${statusText}</td>
        <td><a href="#${item.id}/">詳細を見る</a></td>
      </tr>
    `;

    return tr;
  }

  checkStatus(item) {
    return item.status === 'hold' ? '保留中' : item.status === 'survey' ? '調査前' : item.status === 'available' ? '内覧可' : '不明';
  }
}
