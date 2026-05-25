/**
 * ランキングページ：カード表示（雰囲気・見どころ・おすすめポイント）
 * 5位のあとに広告スペースを挿入
 */

(function () {
  const pageId = document.body.dataset.page;
  if (!pageId || !ANIME_PAGES[pageId]) return;

  const page = ANIME_PAGES[pageId];
  const listEl = document.getElementById("ranking-list");
  if (!listEl) return;

  listEl.innerHTML = "";

  page.list.forEach(function (item) {
    if (item.rank === 6) {
      listEl.appendChild(createMidAd());
    }

    const li = document.createElement("li");
    li.className = "rank-card";
    li.dataset.accent = page.accent;

    li.innerHTML =
      '<article class="anime-card anime-card--rank">' +
      '  <div class="rank-card__head">' +
      '    <span class="rank-card__num" aria-label="第' + item.rank + '位">' + item.rank + "</span>" +
      '    <h2 class="anime-card__title">' + escapeHtml(item.title) + "</h2>" +
      "  </div>" +
      '  <dl class="anime-card__meta">' +
      "    <div><dt>雰囲気</dt><dd>" + escapeHtml(item.atmosphere) + "</dd></div>" +
      "    <div><dt>見どころ</dt><dd>" + escapeHtml(item.highlight) + "</dd></div>" +
      "    <div><dt>おすすめポイント</dt><dd>" + escapeHtml(item.point) + "</dd></div>" +
      "  </dl>" +
      "</article>";

    listEl.appendChild(li);
  });

  function createMidAd() {
    const li = document.createElement("li");
    li.className = "ad-slot";
    li.setAttribute("aria-label", "広告スペース（記事中）");
    li.innerHTML =
      '<div class="ad ad--inline">' +
      '<p class="ad__label">AD</p>' +
      '<p class="ad__placeholder">記事読了中の広告（300×250 など）</p>' +
      "</div>";
    return li;
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
})();
