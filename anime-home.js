/**
 * トップページ：特集カード一覧を表示
 */

(function () {
  const grid = document.getElementById("portal-grid");
  if (!grid || typeof PORTAL_SECTIONS === "undefined") return;

  grid.innerHTML = "";

  PORTAL_SECTIONS.forEach(function (sec) {
    const page = ANIME_PAGES[sec.id];
    if (!page) return;

    const top3 = page.list.slice(0, 3);
    const article = document.createElement("article");
    article.className = "portal-card portal-card--" + sec.accent;

    let picks = '<ul class="portal-card__picks">';
    top3.forEach(function (item) {
      picks += "<li>" + escapeHtml(item.title) + "</li>";
    });
    picks += "</ul>";

    article.innerHTML =
      '<span class="portal-card__badge">' + escapeHtml(sec.badge) + "</span>" +
      '<h3 class="portal-card__title">' + escapeHtml(page.h1) + "</h3>" +
      '<p class="portal-card__desc">' + escapeHtml(page.linkDesc) + "</p>" +
      picks +
      '<a href="' + page.file + '" class="portal-card__cta">特集を読む →</a>";

    grid.appendChild(article);
  });

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
})();
