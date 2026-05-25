/**
 * 全ページ共通ナビゲーション（SITE_NAV から自動生成）
 * HTMLに <nav id="site-nav" class="site-nav site-nav--portal"></nav> を置いてください
 */

(function () {
  const nav = document.getElementById("site-nav");
  if (!nav || typeof SITE_NAV === "undefined") return;

  const pageId = document.body.dataset.page || "";
  const currentFile = window.location.pathname.split("/").pop() || "index.html";

  let html = "";
  SITE_NAV.forEach(function (item) {
    const isCurrent = item.file === currentFile || item.id === pageId;
    html +=
      '<a href="' +
      item.file +
      '"' +
      (isCurrent ? ' class="is-current" aria-current="page"' : "") +
      ">" +
      escapeHtml(item.label) +
      "</a>";
  });
  nav.innerHTML = html;

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
})();
