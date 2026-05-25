/**
 * 特集ページ：アニメカード10枚を表示
 * 各作品：genre / rating / atmosphere / highlight / target
 * 広告：6位の前（記事中）※ 上・下はHTMLに記述
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
      '<article class="anime-card anime-card--rank anime-card--seo">' +
      '  <div class="rank-card__head">' +
      '    <span class="rank-card__num" aria-label="第' + item.rank + '位">' + item.rank + "</span>" +
      '    <div class="rank-card__title-wrap">' +
      '      <h2 class="anime-card__title">' + escapeHtml(item.title) + "</h2>" +
      '      <p class="anime-card__genre">' + escapeHtml(item.genre) + "</p>" +
      '      <p class="anime-card__stars" aria-label="おすすめ度 ' + item.rating + ' / 5">' +
      stars(item.rating) +
      '        <span class="anime-card__rating-num">（' + item.rating + "/5）</span>" +
      "      </p>" +
      "    </div>" +
      "  </div>" +
      '  <dl class="anime-card__meta">' +
      "    <div><dt>雰囲気</dt><dd>" + escapeHtml(item.atmosphere) + "</dd></div>" +
      "    <div><dt>見どころ</dt><dd>" + escapeHtml(item.highlight) + "</dd></div>" +
      "    <div><dt>どんな人向け</dt><dd>" + escapeHtml(item.target) + "</dd></div>" +
      "  </dl>" +
      "</article>";

    listEl.appendChild(li);
  });

  function stars(n) {
    return "★".repeat(n) + "☆".repeat(5 - n);
  }

  function createMidAd() {
    const li = document.createElement("li");
    li.className = "ad-slot";
    li.setAttribute("aria-label", "広告スペース（記事中）");
    li.innerHTML =
      '<div class="ad ad--inline ad--mid">' +
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
