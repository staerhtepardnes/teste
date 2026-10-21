(() => {
  "use strict";

  const DEFAULT_TITLE = "gaymes legauzão";

  const changelog = document.querySelector("#changelog");
  const closeLink = document.querySelector("#close-link");

  if (closeLink) {
    closeLink.addEventListener("click", (event) => {
      event.preventDefault();
      document.body.style.opacity = "0.35";
    });
  }

  function showChangelog() {
    if (!changelog) return;
    const key = "gaymes-legauzao:last-changelog";
    const signature = changelog.dataset.signature;
    let seen = false;
    try {
      seen = localStorage.getItem(key) === signature;
    } catch {}
    changelog.addEventListener("close", () => {
      try {
        localStorage.setItem(key, signature);
      } catch {}
    });
    if (!seen) changelog.showModal();
  }

  const root = document.querySelector("#regular-workspace");
  const homeMarkup = root.innerHTML;
  let viewVersion = 0;

  const views = {
    home: () => {
      root.innerHTML = homeMarkup;
    },
    games: () => {
      root.innerHTML = `
        <section class="section">
          <div class="section-title">games</div>
          <p>unblocked games coming soon.</p>
        </section>
      `;
    },
    about: () => {
      root.innerHTML = `
        <section class="section">
          <div class="section-title">about</div>
          <p>gaymes legauzão — a quiet, direct update page.</p>
        </section>
      `;
    },
    changelog: () => {
      if (changelog) changelog.showModal();
    },
  };

  function showView(view) {
    viewVersion++;
    (views[view] || views.home)();
  }

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-view]");
    if (target) {
      event.preventDefault();
      showView(target.dataset.view);
    }
  });

  showChangelog();
})();
