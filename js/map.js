// Map.js

export default class Map {
  constructor() {
    // 地図の初期化
    this.map = L.map('map', {
      zoomControl: true,
      scrollWheelZoom: false,
      doubleClickZoom: false
    }).setView([36.094336, 136.032054], 15); // 国見公民館を中心に設定

    // ダブルクリックでズームアウト
    this.map.on('dblclick', () => {
      this.map.setZoom(15, { animate: true });
    });

    // タイルレイヤーの追加 (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // アイコンの定義
    this.icons = {
      "調査前": L.icon({
        iconUrl: "./assets/pin-gray.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
      }),
      "調査済": L.icon({
        iconUrl: "./assets/pin-blue.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
      }),
      "案内可": L.icon({
        iconUrl: "./assets/pin-green.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
      }),
      "拠点": L.icon({
        iconUrl: "./assets/pin-yellow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
      }),
      "施設": L.icon({
        iconUrl: "./assets/pin-red.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
      })
    };


    // 物件データ読み込み
    fetch('/properties/properties.json')
      .then(res => res.json())
      .then(properties => {
        properties.forEach(p => {
          const icon = this.icons[p.category] ?? this.icons["調査前"];
          const marker = L.marker([p.lat, p.lng], { icon }).addTo(this.map);

          // ポップアップ設定
          marker.bindPopup(`
            <strong>${p.name} | ${p.category}</strong>
            <br><span>${p.address}</span>
            <br><a href="#${p.id}">詳細を見る</a>
          `);

          // クリックで移動・ズーム
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
