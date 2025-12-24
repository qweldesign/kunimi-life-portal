// Map.js

export default class Map {
  constructor() {
    // 地図の初期化
    this.map = L.map('map', {
      zoomControl: true,
      scrollWheelZoom: false,
      doubleClickZoom: false
    }).setView([36.094336, 136.032054], 17); // 国見公民館を中心に設定

    // タイルレイヤーの追加 (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // 物件データ読み込み
    fetch('/properties/properties.json')
      .then(res => res.json())
      .then(properties => {
        properties.forEach(p => {
          const marker = L.marker([p.lat, p.lng]).addTo(this.map);

          // ポップアップ設定
          marker.bindPopup(`
            <strong>${p.name}</strong>
            <br><a href="${p.url}" target="_blank">詳細を見る</a>
          `);

          // クリックで移動
          marker.on('click', () => {
            this.map.setView(marker.getLatLng(), 17);
          });

        });
      })
      .catch(err => {
        console.error('物件データの読み込みに失敗', err);
      });
  }
}