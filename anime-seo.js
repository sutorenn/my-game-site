/**
 * SEO共通処理（全ページ）
 * ・タイトル / meta description
 * ・パンくずリスト
 * ・導入文
 * ・関連記事
 * ・構造化データ（パンくず）
 */

(function () {
  const pageId = document.body.dataset.page || "home";
  const isHome = pageId === "home";
  const page = isHome ? SITE_HOME : ANIME_PAGES[pageId];

  if (!page) return;

  /* --- 1. Google検索向けタイトル・説明文 --- */
  document.title = page.seoTitle + " | " + SITE_NAME;

  setMeta("description", page.metaDescription);
  setMeta("og:title", page.seoTitle);
  setMeta("og:description", page.metaDescription);
  setMeta("og:type", "website");

  /* --- 2. 導入文（ページ上部） --- */
  const introEl = document.getElementById("page-intro");
  if (introEl && page.intro) {
    introEl.textContent = page.intro;
  }

  /* --- 3. パンくずリスト --- */
  renderBreadcrumb(pageId, page);

  /* --- 4. 関連記事 --- */
  renderRelated(page.related, pageId);

  /* --- 5. 構造化データ --- */
  insertBreadcrumbJsonLd(pageId, page);

  function setMeta(name, content) {
    let el = document.querySelector('meta[name="' + name + '"]');
    if (!el) {
      el = document.querySelector('meta[property="' + name + '"]');
    }
    if (!el) {
      el = document.createElement("meta");
      if (name.indexOf("og:") === 0) {
        el.setAttribute("property", name);
      } else {
        el.setAttribute("name", name);
      }
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  }

  function renderBreadcrumb(currentId, currentPage) {
    const nav = document.getElementById("breadcrumb");
    if (!nav) return;

    const items = [
      { url: "anime-recommend.html", label: "トップ" },
    ];

    if (currentId !== "home") {
      items.push({
        url: currentPage.file,
        label: currentPage.breadcrumb || currentPage.h1,
      });
    }

    let html = '<ol class="breadcrumb__list">';
    items.forEach(function (item, index) {
      const isLast = index === items.length - 1;
      html += "<li>";
      if (isLast) {
        html += '<span aria-current="page">' + escapeHtml(item.label) + "</span>";
      } else {
        html += '<a href="' + item.url + '">' + escapeHtml(item.label) + "</a>";
      }
      html += "</li>";
    });
    html += "</ol>";

    nav.innerHTML = html;
  }

  function renderRelated(relatedIds, currentId) {
    const list = document.getElementById("related-list");
    if (!list || !relatedIds) return;

    list.innerHTML = "";

    relatedIds.forEach(function (id) {
      if (id === currentId) return;
      const p = ANIME_PAGES[id];
      if (!p) return;

      const li = document.createElement("li");
      li.innerHTML =
        '<a href="' +
        p.file +
        '" class="related-card">' +
        "<strong>" +
        escapeHtml(p.h1) +
        "</strong>" +
        "<span>" +
        escapeHtml(p.linkDesc) +
        "</span>" +
        "</a>";
      list.appendChild(li);
    });
  }

  function insertBreadcrumbJsonLd(currentId, currentPage) {
    const items = [
      {
        "@type": "ListItem",
        position: 1,
        name: "トップ",
        item: "anime-recommend.html",
      },
    ];

    if (currentId !== "home") {
      items.push({
        "@type": "ListItem",
        position: 2,
        name: currentPage.breadcrumb || currentPage.h1,
        item: currentPage.file,
      });
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items,
    });
    document.head.appendChild(script);
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
})();
