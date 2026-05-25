/**
 * トップページ（アニメ特化ポータル）のカテゴリ・特集プレビュー表示
 */

(function () {
  renderHubCategories();
  renderSpotlight("like86", "spotlight-86-list", "anime-like86.html");
  renderSpotlight("shadow", "spotlight-shadow-list", "anime-shadow.html");

  function renderHubCategories() {
    const container = document.getElementById("hub-categories");
    if (!container || typeof HUB_CATEGORIES === "undefined") return;

    container.innerHTML = "";

    HUB_CATEGORIES.forEach(function (cat) {
      const page = ANIME_PAGES[cat.id];
      if (!page) return;

      const preview = page.list.slice(0, 3);
      const article = document.createElement("article");
      article.className = "hub-card hub-card--" + cat.accent;

      let picksHtml = '<ul class="hub-card__picks">';
      preview.forEach(function (item) {
        picksHtml += "<li>" + escapeHtml(item.title) + "</li>";
      });
      picksHtml += "</ul>";

      article.innerHTML =
        '<div class="hub-card__glow"></div>' +
        '<p class="hub-card__label">CATEGORY</p>' +
        '<h3 class="hub-card__title">' + escapeHtml(cat.title) + "</h3>" +
        '<p class="hub-card__desc">' + escapeHtml(cat.desc) + "</p>" +
        picksHtml +
        '<a href="' + cat.file + '" class="hub-card__cta">特集ページへ →</a>';

      container.appendChild(article);
    });
  }

  function renderSpotlight(pageId, listId, linkFile) {
    const listEl = document.getElementById(listId);
    if (!listEl || !ANIME_PAGES[pageId]) return;

    const page = ANIME_PAGES[pageId];
    listEl.innerHTML = "";

    page.list.slice(0, 4).forEach(function (item) {
      const li = document.createElement("li");
      li.className = "spotlight-item";
      li.innerHTML =
        '<span class="spotlight-item__rank">' + item.rank + "</span>" +
        "<div>" +
        '<strong class="spotlight-item__title">' + escapeHtml(item.title) + "</strong>" +
        '<p class="spotlight-item__text">' + escapeHtml(item.atmosphere) + "</p>" +
        "</div>";
      listEl.appendChild(li);
    });

    const link = document.querySelector('[data-spotlight-link="' + pageId + '"]');
    if (link) {
      link.setAttribute("href", linkFile);
    }
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
})();
