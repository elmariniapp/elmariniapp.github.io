(() => {
  const root = document.documentElement;
  const hero = document.querySelector('.hero');
  const shoe = hero.querySelector('.hero-shoe');
  const scene = hero.querySelector('.hero-art');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const scenes = document.querySelectorAll('.screen, .feature, .share-panel, .premium-panel');

  const visibilityThreshold = 0.18;
  let observer;
  let frame = 0;
  let playedIntro = false;

  function playShoe() {
    if (hero.classList.contains('is-intro') && shoe.naturalWidth) {
      shoe.classList.add('is-arriving');
    }
  }

  function updateScroll() {
    frame = 0;
    const position = window.scrollY;
    const distance = root.scrollHeight - root.clientHeight;
    const progress = distance > 0 ? Math.min(1, Math.max(0, position / distance)) : 0;
    root.style.setProperty('--page-progress', progress.toFixed(4));

    const bounds = hero.getBoundingClientRect();
    if (bounds.bottom <= 0) return;

    const departure = Math.min(1, Math.max(0, -bounds.top / bounds.height));
    scene.style.setProperty('--shoe-offset', `${(departure * 28).toFixed(2)}px`);
    scene.style.setProperty('--track-offset', `${(-departure * 16).toFixed(2)}px`);
    scene.style.setProperty('--grid-offset', `${(departure * 12).toFixed(2)}px`);
  }

  function queueScroll() {
    if (!frame) frame = window.requestAnimationFrame(updateScroll);
  }

  function syncMotion() {
    if (reduceMotion.matches) {
      root.classList.remove('has-motion');
      hero.classList.remove('is-intro');
      shoe.classList.remove('is-arriving');
      scenes.forEach((element) => element.classList.remove('is-in-view'));
      shoe.removeEventListener('load', playShoe);
      observer?.disconnect();
      window.removeEventListener('scroll', queueScroll);
      window.removeEventListener('resize', queueScroll);
      window.cancelAnimationFrame(frame);
      frame = 0;
      return;
    }

    root.classList.add('has-motion');
    if (!playedIntro && !location.hash && window.scrollY < 16) {
      playedIntro = true;
      hero.classList.add('is-intro');
      if (shoe.complete) playShoe();
      else shoe.addEventListener('load', playShoe, { once: true });
    }

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries, currentObserver) => {
        for (const entry of entries) {
          if (entry.intersectionRatio < visibilityThreshold) continue;
          entry.target.classList.add('is-in-view');
          currentObserver.unobserve(entry.target);
        }
      }, { threshold: visibilityThreshold });
      scenes.forEach((element) => observer.observe(element));
    }
    window.addEventListener('scroll', queueScroll, { passive: true });
    window.addEventListener('resize', queueScroll);
    queueScroll();
  }

  reduceMotion.addEventListener?.('change', syncMotion);
  syncMotion();
})();
