/**
 * トップページ：気分別おすすめ表示
 * 各作品：atmosphere / highlight / point
 */

const GENRE_LABELS = {
  strongest: "最強主人公",
  bgm: "神BGM",
  rewatch: "見返したくなる",
  dark: "ダークファンタジー",
};

const ANIME_DATA = {
  strongest: [
    { title: "陰の実力者になりたくて！", atmosphere: "中二全開のダークヒーロー幻想。秘密とド派手演出。", highlight: "影の実力者として最強を隠すギャップと決めシーン。", point: "細部より「カッコいい空気」で楽しめる。見返すたびに爽快感。" },
    { title: "ようこそ実力至上主義の教室へ", atmosphere: "学園の策略と、クールな主人公の余裕。", highlight: "表は平凡、裏で学園を動かす頭脳戦。", point: "最強の「勝ち方」の雰囲気が好きな人向け。" },
    { title: "七つの大罪", atmosphere: "王国奪還ファンタジー。コミカルと熱血の混合。", highlight: "メリオダスら最強騎士の圧倒バトル。", point: "派手な戦闘で何度でもテンション上がる。" },
    { title: "FAIRY TAIL", atmosphere: "ギルド仲間と魔法バトルの王道熱さ。", highlight: "仲間のため限界突破する瞬間。", point: "話を忘れてもバトルだけ見返して楽しい。" },
  ],
  bgm: [
    { title: "86-エイティシックス-", atmosphere: "戦場の緊迫と、沁みるボーカル・ピアノ。", highlight: "戦闘と音楽が一体化する名シーン。", point: "神BGM枠の筆頭。曲だけで思い出せる。" },
    { title: "終わりのセラフ", atmosphere: "ダーク世界にキャッチーで切ない曲。", highlight: "OP・EDが強く、バトル前後を音で覚える。", point: "音楽から入って再視聴しやすい。" },
    { title: "鬼滅の刃", atmosphere: "和モダンな世界と、力強いロック・バラード。", highlight: "決意が高まる挿入歌と華やかなOP。", point: "シーンと曲のセットで記憶に残る。" },
    { title: "進撃の巨人", atmosphere: "重厚で緊迫したサウンドトラック。", highlight: "毎期話題のオープニング。", point: "歌だけで熱くなれる見返し向き。" },
  ],
  rewatch: [
    { title: "FAIRY TAIL", atmosphere: "ギルドの日常とド派手魔法戦。", highlight: "仲間ピンチからの全員バトル。", point: "ランダムに一話見ても楽しい。" },
    { title: "終わりのセラフ", atmosphere: "終末×吸血鬼×剣のチーム戦。", highlight: "戦術と一対一の剣戟のテンポ。", point: "ダークだが見返しやすいバトル。" },
    { title: "杖と剣のウィストリア", atmosphere: "魔法学園×剣戟の成長ファンタジー。", highlight: "二刀流で強くなる手応え。", point: "熱いバトルだけ切り取って満足。" },
    { title: "七つの大罪", atmosphere: "冒険と個性派最強騎士のチーム戦。", highlight: "全員活躍の派手な戦闘。", point: "名シーンを何度でも味わえる。" },
  ],
  dark: [
    { title: "終わりのセラフ", atmosphere: "滅亡世界と吸血鬼、少年兵の終末感。", highlight: "絆と復讐をかけた剣のバトル。", point: "ダークファンタジーの定番。" },
    { title: "進撃の巨人", atmosphere: "壁の閉塞感と巨人の恐怖。", highlight: "立体機動と真相への歩み。", point: "世界観の重さが忘れられない。" },
    { title: "86-エイティシックス-", atmosphere: "戦争の残酷と静かな悲しみのSF。", highlight: "戦場の無力さとそれでも戦う姿。", point: "ダークSFとして音楽と見返す。" },
    { title: "呪術廻戦", atmosphere: "呪いが支配する現代ダーク世界。", highlight: "領域展開などルールある死闘。", point: "暗い雰囲気＋見返せるアクション。" },
  ],
};

const genreButtons = document.querySelectorAll(".genre-btn");
const searchInput = document.getElementById("search-input");
const searchClear = document.getElementById("search-clear");
const searchHint = document.getElementById("search-hint");
const animeList = document.getElementById("anime-list");
const resultsCount = document.getElementById("results-count");
const resultsGenreLabel = document.getElementById("results-genre-label");

let currentGenre = null;

function createCard(anime, genreKey) {
  const card = document.createElement("article");
  card.className = "anime-card";
  card.dataset.genre = genreKey;
  card.dataset.title = anime.title;

  card.innerHTML =
    '<h3 class="anime-card__title">' + escapeHtml(anime.title) + "</h3>" +
    '<dl class="anime-card__meta">' +
    "<div><dt>雰囲気</dt><dd>" + escapeHtml(anime.atmosphere) + "</dd></div>" +
    "<div><dt>見どころ</dt><dd>" + escapeHtml(anime.highlight) + "</dd></div>" +
    "<div><dt>おすすめポイント</dt><dd>" + escapeHtml(anime.point) + "</dd></div>" +
    "</dl>";

  return card;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function matchesSearch(anime, keyword) {
  if (!keyword) return true;
  const q = keyword.trim().toLowerCase();
  const haystack = (
    anime.title + " " + anime.atmosphere + " " + anime.highlight + " " + anime.point
  ).toLowerCase();
  return haystack.includes(q);
}

function renderList(genreKey, keyword) {
  const list = genreKey ? ANIME_DATA[genreKey] : [];
  const filtered = list.filter(function (a) {
    return matchesSearch(a, keyword);
  });

  animeList.innerHTML = "";

  if (!genreKey) {
    animeList.innerHTML =
      '<p class="anime-list__empty">上のボタンを押すと、おすすめ作品がここに表示されます。</p>';
    resultsCount.textContent = "";
    resultsGenreLabel.textContent = "";
    searchHint.textContent = "テーマを選ぶか、キーワードで絞り込めます";
    return;
  }

  const label = GENRE_LABELS[genreKey];
  resultsGenreLabel.textContent = "【" + label + "】のおすすめ";

  if (filtered.length === 0) {
    animeList.innerHTML =
      '<p class="anime-list__no-match">条件に合う作品が見つかりませんでした。別のキーワードやテーマを試してください。</p>';
    resultsCount.textContent = "0 件";
    return;
  }

  filtered.forEach(function (anime) {
    animeList.appendChild(createCard(anime, genreKey));
  });

  resultsCount.textContent = filtered.length + " 件";
  searchHint.textContent = keyword
    ? "「" + keyword + "」で絞り込み中（" + label + "）"
    : label + " の作品を表示中";
}

function selectGenre(genreKey) {
  currentGenre = genreKey;
  genreButtons.forEach(function (btn) {
    btn.classList.toggle("is-active", btn.dataset.genre === genreKey);
  });
  renderList(genreKey, searchInput.value);
}

function updateClearButton() {
  searchClear.classList.toggle("is-visible", searchInput.value.length > 0);
}

genreButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    selectGenre(btn.dataset.genre);
  });
});

searchInput.addEventListener("input", function () {
  updateClearButton();
  if (currentGenre) {
    renderList(currentGenre, searchInput.value);
  } else if (searchInput.value.trim()) {
    searchHint.textContent = "先にテーマボタンを選んでから検索してください";
  } else {
    searchHint.textContent = "テーマを選ぶか、キーワードで絞り込めます";
  }
});

searchClear.addEventListener("click", function () {
  searchInput.value = "";
  updateClearButton();
  searchInput.focus();
  if (currentGenre) {
    renderList(currentGenre, "");
  } else {
    searchHint.textContent = "テーマを選ぶか、キーワードで絞り込めます";
  }
});
