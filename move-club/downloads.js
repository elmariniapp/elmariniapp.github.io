(() => {
  const links = document.querySelector('.store-links');
  const status = document.querySelector('.download-status');
  const french = document.documentElement.lang === 'fr';
  const assetDirectory = new URL('assets/', document.currentScript.src);
  const stores = {
    apple: {
      badge: french ? 'app-store-fr.svg' : 'app-store-en.svg',
      label: french ? 'Télécharger sur l’App Store' : 'Download on the App Store',
      matches: (url) => url.origin === 'https://apps.apple.com'
        && /^\/(?:[a-z]{2}\/)?app\/(?:[^/]+\/)?id\d+\/?$/.test(url.pathname),
    },
    google: {
      badge: french ? 'google-play-fr.png' : 'google-play-en.png',
      label: french ? 'Télécharger sur Google Play' : 'Get it on Google Play',
      matches: (url) => url.origin === 'https://play.google.com'
        && url.pathname === '/store/apps/details'
        && url.searchParams.get('id') === 'com.moveclub.move_club',
    },
  };

  function addBadge(key, listing) {
    if (typeof listing !== 'string' || !listing) return;
    let url;
    try {
      url = new URL(listing);
    } catch {
      return;
    }
    const store = stores[key];
    if (url.username || url.password || !store.matches(url)) return;

    const link = document.createElement('a');
    link.className = 'store-link';
    link.dataset.store = key;
    link.href = url.href;
    const image = document.createElement('img');
    image.alt = store.label;
    image.addEventListener('error', () => { link.textContent = store.label; }, { once: true });
    image.src = new URL(store.badge, assetDirectory).href;
    link.append(image);
    links.append(link);
  }

  fetch(new URL('stores.json', document.currentScript.src))
    .then((response) => response.ok ? response.json() : null)
    .then((listings) => {
      if (!listings) return;
      for (const key of Object.keys(stores)) addBadge(key, listings[key]);
      if (links.childElementCount) {
        links.hidden = false;
        status.hidden = true;
      }
    })
    .catch(() => {});
})();
