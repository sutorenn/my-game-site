/**
 * トップページ：2026年版 神アニメランキング TOP10 表示
 * データは anime-pages-data.js の GOD_TIER_RANKING_2026
 */

(function () {
  const listEl = document.getElementById("top10-list");
  if (!listEl || typeof GOD_TIER_RANKING_2026 === "undefined") return;

  listEl.innerHTML = "";

  GOD_TIER_RANKING_2026.forEach(function (item) {
    if (item.rank === 6) {
      listEl.appendChild(createTop10Ad());
    }

    const li = document.createElement("li");
    li.className = "top10-card";
    li.dataset.rank = String(item.rank);
    if (item.rank <= 3) {
      li.classList.add("top10-card--podium");
    }

    li.innerHTML =
      '<article class="top10-card__inner">' +
      '  <div class="top10-card__head">' +
      '    <span class="top10-card__rank" aria-label="第' + item.rank + '位">' + item.rank + "</span>" +
      '    <div class="top10-card__title-wrap">' +
      '      <h3 class="top10-card__title">' + escapeHtml(item.title) + "</h3>" +
      '      <p class="top10-card__stars" aria-label="おすすめ度 ' + item.rating + ' / 5">' +
      stars(item.rating) +
      '        <span class="top10-card__rating-num">（' + item.rating + "/5）</span>" +
      "      </p>" +
      "    </div>" +
      "  </div>" +
      '  <p class="top10-card__comment">' + escapeHtml(item.comment) + "</p>" +
      '  <ul class="top10-card__tags" aria-label="タグ">' +
      item.tags.map(function (tag) {
        return '<li class="top10-tag ' + tagClass(tag) + '">' + escapeHtml(tag) + "</li>";
      }).join("") +
      "  </ul>" +
      '  <a href="' + escapeHtml(item.page) + '" class="top10-card__link">' +
      escapeHtml(item.pageLabel) +
      " →</a>" +
      "</article>";

    listEl.appendChild(li);
  });

  function stars(n) {
    return "★".repeat(n) + "☆".repeat(5 - n);
  }

  function tagClass(tag) {
    if (tag === "最強主人公") return "top10-tag--strongest";
    if (tag === "神BGM") return "top10-tag--bgm";
    if (tag === "感動") return "top10-tag--emotion";
    if (tag === "見返したくなる") return "top10-tag--rewatch";
    if (tag === "ダークファンタジー") return "top10-tag--dark";
    return "";
  }

  function createTop10Ad() {
    const li = document.createElement("li");
    li.className = "top10-ad-slot";
    li.setAttribute("aria-label", "広告スペース（ランキング中）");
    li.innerHTML =
      '<div class="ad ad--inline ad--top10-mid">' +
      '<p class="ad__label">AD</p>' +
      '<p class="ad__placeholder">ランキング読了中の広告（300×250 など）</p>' +
      "</div>";
    return li;
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
})();
