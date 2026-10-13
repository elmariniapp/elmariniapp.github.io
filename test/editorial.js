'use strict';

(() => {
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const header = $('.header-inner');
  const dialog = $('.project-dialog');
  const mobileNav = $('#mobile-nav');
  const menuButton = $('.menu-toggle');
  const languageButton = $('.language-button');
  const scenes = $$('[data-scene]');
  const steps = $$('[data-step]');
  const story = $('[data-story]');
  const stage = $('.story-stage');
  const hero = $('.hero');
  const storageKey = 'lang';
  const fr = {};
  for (const element of $$('[data-i18n]')) fr[element.dataset.i18n] = element.innerHTML;
  const frAttributes = {};
  for (const kind of ['aria', 'alt']) {
    for (const element of $$(`[data-i18n-${kind}]`)) {
      frAttributes[element.dataset[kind === 'aria' ? 'i18nAria' : 'i18nAlt']] = element.getAttribute(kind === 'aria' ? 'aria-label' : 'alt');
    }
  }

  const en = {
    skip: 'Skip to content', independent: 'Independent developer', method: 'Method', projects: 'My apps', offer: 'Services', contact: 'Contact',
    headline1: 'I unblock', headline2: 'Flutter apps.', headline3: 'Right to the store.', heroIntro: 'Precise fixes. Reliable applications.', book: 'Book an audit', seeProjects: 'View the projects',
    heroFootnote: 'From the first diagnosis to the final check.', heroAnnotation: 'From diagnosis<br>to release.', heroTopics: 'Bugs<br>Interfaces<br>Purchases<br>Stores',
    inDevelopment: 'In development', projectsLabel: '01 / Projects', projectsNote: 'Real products. The same care.', projectsTitle: 'The work,<br>in practice.',
    projectsIntro: 'I build my own applications. Production constraints shape every fix, every interface and every release.', live: 'Published',
    muslimShort: 'Prayer, Quran and everyday tools. Six languages, including Arabic and Urdu.', muslimCategory: 'Spirituality<br>Multilingual & RTL', discover: 'Explore',
    scanerisShort: 'Scan, organise and sign. PDF tools with on-device processing.', scanerisCategory: 'Productivity<br>PDF & OCR',
    alarmShort: 'An alarm with missions. A carefully considered interface, down to the first gesture of the morning.', alarmCategory: 'Everyday life<br>Alarms & missions',
    stampShort: 'Field photos, context and PDF reports.', blueShort: 'Daily challenges and guided lessons.', comingSoon: 'Coming soon',
    methodLabel: '02 / Method', methodNote: 'Understand. Fix. Verify.', methodTitle1: 'From diagnosis', methodTitle2: 'to release.',
    methodIntro: 'A problem should be understood before it is fixed. Here is how I turn a blocker into a verified delivery.', process: 'The path to a fix',
    step1Kicker: 'The issue', scene1Title: 'One problem.<br>The right questions.', device: 'Device', conditions: 'Conditions', conditionsValue: 'Version, account, network', reproduction: 'Reproduction', documented: 'Documented',
    step2Kicker: 'The diagnosis', scene2Title: 'Trace it back<br>to the source.', trace1: 'Interface & interaction', trace2: 'Logic & state', trace3: 'Cause identified <i aria-hidden="true">↗</i>',
    step3Kicker: 'The fix', scene3Title: 'Fix it.<br>Then verify.', check1: 'Original issue reproduced', check2: 'Targeted correction', check3: 'Related scenarios checked',
    step4Kicker: 'The delivery', scene4Title: 'Ready for<br>the next step.', scene4Note: 'Signed builds, configuration and verification before submission.',
    step1Title: 'Reproduce.', step1Text: 'I recreate the issue in its real conditions: device, version, keyboard, orientation, network or account state. The starting point is observable.',
    step2Title: 'Find the cause.', step2Text: 'I trace the issue from the interface to the logic, then to dependencies and the platform. The diagnosis identifies what is blocked and what needs to change.',
    step3Title: 'Fix and test.', step3Text: 'The fix addresses the identified cause. I check the original scenario, related situations and regression risks, using tests suited to the change.',
    step4Title: 'Prepare the release.', step4Text: 'I prepare builds, signing, in-app purchases and the elements required for submission. The delivery is documented and verified on the relevant platforms.',
    offerLabel: '03 / Services', offerNote: 'A clear scope. An agreed price.', offerTitle: 'Start by<br>understanding.',
    offerIntro: 'The audit provides a precise diagnosis and an order for the fixes. You decide what comes next, with the information you need.', tagIap: 'In-app purchases', tagResponsive: 'Responsive & RTL',
    auditTitle: 'Flutter audit', exclVat: 'excl. VAT', auditTime: 'Report delivered within 2 business days.',
    audit1: 'Reproduction and review of the relevant code', audit2: 'Risks and fixes ranked by priority', audit3: 'A fixed price for each proposed correction', audit4: 'A 30-minute call to review everything',
    auditNote: 'The audit fee is deducted if you then hire me for the fixes.', fixTitle: 'Fixed-price corrections.', fixText: 'The selected items are fixed at the quoted price, with verification suited to each change.',
    releaseTitle: 'Store release support.', releaseText: 'Signed builds, TestFlight, purchase configuration and technical responses to publication rejections.',
    uiTitle: 'Resilient interfaces.', uiText: 'Text sizes, tablets, keyboards, landscape and RTL languages. Interfaces designed for the conditions in which they are used.',
    faqTitle: 'A few<br>details.', faq1Title: 'What projects do you work on?', faq1Text: 'Flutter applications for Android and iOS: bugs, interfaces, in-app purchases, document exports and publication. The audit defines the scope before any correction.',
    faq2Title: 'What should I prepare for the audit?', faq2Text: 'A description of the issue, steps to reproduce it, the platform and the app version. Access to the code and relevant technical information is arranged afterwards.',
    faq3Title: 'Does the audit commit me to further work?', faq3Text: 'You receive the diagnosis, priorities and pricing. You then choose which corrections to assign. The audit fee is deducted if we continue together.',
    faq4Title: 'How does the first contact work?', faq4Text: 'An email is enough: describe the issue, the platform and what you have already tried. I reply with an initial assessment and the information needed to move forward.',
    contactLabel: '04 / Contact', contactNote: 'The next step starts here.', contactTitle1: 'Tell me', contactTitle2: 'what is stuck.', contactIntro: 'A few lines are enough. What happens, on which device, and since when.',
    write: 'Let’s talk about your app', location: 'Independent developer · France<br>Android & iOS · Français & English', copyEmail: 'Copy the address',
    copyright: '© 2026 El Marini App · Independent Flutter developer', privacy: 'App privacy policies', backTop: 'Back to top', closeProject: 'Close project', caseSignature: 'An El Marini App project.', backProjects: 'Back to projects'
  };

  const enAttributes = {
    navigation: 'Main navigation', openMenu: 'Open menu', mobileNavigation: 'Mobile navigation', discoverAlarm: 'Explore AlarmBolt', discoverMuslim: 'Explore Muslim App', discoverScaneris: 'Explore Scaneris',
    alarmAlt: 'AlarmBolt alarm editor with a circular clock and repeat settings', muslimAlt: 'Official Muslim App artwork showing prayer times and the home dashboard', scanerisAlt: 'Official Scaneris artwork showing the scanner and recent documents',
    correctionSteps: 'The steps of a correction', methodSteps: 'Method steps', step1Label: 'Step 1: reproduce', step2Label: 'Step 2: diagnose', step3Label: 'Step 3: fix', step4Label: 'Step 4: deliver'
  };

  const projects = {
    muslim: {
      number: '01', title: 'Muslim App', className: 'visual-muslim', image: 'assets/muslim-01.webp', gallery: ['assets/muslim-02.webp'], store: 'https://play.google.com/store/apps/details?id=com.elmariniapp.muslimapp',
      fr: { category: 'Spiritualité / Multilingue', intro: 'Les prières, le Coran et les outils du quotidien, réunis dans une application disponible en six langues.', topics: ['Flutter', 'Six langues', 'Arabe & RTL', 'Android & iOS'], imageAlt: 'Tableau de bord Muslim App, visuel officiel Google Play', caption: 'Visuels de la fiche officielle Google Play.', galleryAlt: 'Deuxième visuel officiel de Muslim App',
        sections: [{title: 'Le produit', text: 'Horaires de prière, lecture et audio du Coran, Qibla, invocations, calendrier et outils de suivi. Une interface adaptée aux usages quotidiens.'}, {title: 'Le travail technique', text: 'La même base Flutter doit respecter les particularités des deux plateformes, les langues de droite à gauche et les différentes tailles d’écran.', items: ['Six langues : français, anglais, arabe, ourdou, indonésien et turc.', 'Mise en page RTL et tailles de texte adaptables.', 'Lecture, audio et téléchargements du Coran selon la plateforme.']}, {title: 'Découvrir l’application', text: 'La fiche Google Play présente les fonctionnalités disponibles et les captures publiées.'}] },
      en: { category: 'Spirituality / Multilingual', intro: 'Prayer, Quran and everyday tools brought together in an application available in six languages.', topics: ['Flutter', 'Six languages', 'Arabic & RTL', 'Android & iOS'], imageAlt: 'Muslim App home dashboard, official Google Play artwork', caption: 'Artwork from the official Google Play listing.', galleryAlt: 'Second official Muslim App visual',
        sections: [{title: 'The product', text: 'Prayer times, Quran reading and audio, Qibla, supplications, a calendar and tracking tools. An interface suited to everyday use.'}, {title: 'The technical work', text: 'The same Flutter foundation needs to respect the particularities of both platforms, right-to-left languages and different screen sizes.', items: ['Six languages: French, English, Arabic, Urdu, Indonesian and Turkish.', 'RTL layouts and adjustable text sizes.', 'Quran reading, audio and downloads according to the platform.']}, {title: 'Explore the app', text: 'The Google Play listing presents the available features and published screenshots.'}] }
    },
    scaneris: {
      number: '02', title: 'Scaneris', className: 'visual-scaneris', image: 'assets/scaneris-01.webp', gallery: ['assets/scaneris-02.webp'], store: 'https://play.google.com/store/apps/details?id=com.elmariniapp.scaneris',
      fr: { category: 'Productivité / Documents', intro: 'Un atelier documentaire sur votre téléphone : scan, PDF, OCR, signature et organisation, avec traitement sur l’appareil.', topics: ['Flutter', 'PDF & OCR', 'Traitement local', 'Android & iOS'], imageAlt: 'Accueil et documents récents de Scaneris, visuel officiel Google Play', caption: 'Visuels de la fiche officielle Google Play.', galleryAlt: 'Fonctionnalités documentaires de Scaneris, visuel officiel',
        sections: [{title: 'Le produit', text: 'Scan de documents, création de PDF multipages, extraction de texte, signature et outils d’édition. Les documents sont organisés dans un espace local.'}, {title: 'Le travail technique', text: 'Le parcours documentaire doit rester lisible malgré des contenus et des appareils très différents.', items: ['Gestion des pages et des exports PDF.', 'Interfaces adaptées au clavier, aux tablettes et au paysage.', 'Traitement local de l’OCR et des documents.', 'Achats et restauration adaptés à la plateforme.']}, {title: 'Découvrir l’application', text: 'La fiche Google Play détaille les fonctions gratuites et les outils de l’offre Pro.'}] },
      en: { category: 'Productivity / Documents', intro: 'A document workshop on your phone: scanning, PDF, OCR, signing and organisation, with on-device processing.', topics: ['Flutter', 'PDF & OCR', 'Local processing', 'Android & iOS'], imageAlt: 'Scaneris home and recent documents, official Google Play artwork', caption: 'Artwork from the official Google Play listing.', galleryAlt: 'Scaneris document features, official artwork',
        sections: [{title: 'The product', text: 'Document scanning, multipage PDF creation, text extraction, signing and editing tools. Documents are organised in a local workspace.'}, {title: 'The technical work', text: 'The document workflow must remain clear across very different content and devices.', items: ['Page management and PDF exports.', 'Interfaces suited to keyboards, tablets and landscape.', 'Local OCR and document processing.', 'Purchases and restoration suited to the platform.']}, {title: 'Explore the app', text: 'The Google Play listing details the free features and Pro tools.'}] }
    },
    alarmbolt: {
      number: '03', title: 'AlarmBolt', className: 'visual-alarm', image: '../assets/alarmbolt-feature.webp', gallery: [], support: '../alarmbolt-support/',
      fr: { category: 'Quotidien / Réveils — En développement', intro: 'Un réveil à missions, conçu pour accompagner le passage du réveil au lever, avec une interface claire et un cadran circulaire.', topics: ['Flutter', 'Réveils & missions', 'Android & iOS', 'Motion design'], imageAlt: 'Écran du projet AlarmBolt : création d’un réveil et répétition', caption: 'Capture du projet intégrée au visuel AlarmBolt existant.',
        sections: [{title: 'Le produit', text: 'Réveils, missions enchaînées, siestes, profils et statistiques. Le cadran circulaire donne une identité commune aux interactions.'}, {title: 'Le travail technique', text: 'Un réveil demande un travail particulier sur le système, la fiabilité des déclenchements et les interruptions du cycle de vie.', items: ['Déclenchements, son, vibrations et rappels.', 'Missions de calcul, QR et mots.', 'Interfaces adaptées aux grandes tailles de texte.', 'Animation du cadran et continuité des interactions.']}, {title: 'La suite', text: 'Le projet est en cours de préparation pour sa publication. Les informations d’assistance sont déjà disponibles.'}] },
      en: { category: 'Everyday life / Alarms — In development', intro: 'An alarm with missions, designed to support the move from waking up to getting up, with a clear interface and a circular dial.', topics: ['Flutter', 'Alarms & missions', 'Android & iOS', 'Motion design'], imageAlt: 'AlarmBolt project screen: alarm creation and repeat settings', caption: 'Project capture embedded in the existing AlarmBolt artwork.',
        sections: [{title: 'The product', text: 'Alarms, chained missions, naps, profiles and statistics. The circular dial gives the interactions a shared identity.'}, {title: 'The technical work', text: 'An alarm needs particular attention to the operating system, reliable triggering and lifecycle interruptions.', items: ['Triggering, sound, vibrations and reminders.', 'Math, QR and word missions.', 'Interfaces suited to large text settings.', 'Dial animation and continuity of interactions.']}, {title: 'What comes next', text: 'The project is being prepared for publication. Support information is already available.'}] }
    },
    stampsight: {
      number: '04', title: 'StampSight', className: 'visual-stampsight', image: 'assets/stampsight-01.webp', gallery: [], store: 'https://play.google.com/store/apps/details?id=com.elmariniapp.stampsight',
      fr: { category: 'Productivité / Photos terrain', intro: 'Transformer les photos de terrain en dossiers documentés : contexte, notes, date, localisation et export de rapports PDF.', topics: ['Flutter', 'Photo & contexte', 'Rapports PDF', 'Organisation'], imageAlt: 'Présentation officielle de StampSight et de ses photos terrain', caption: 'Visuel de la fiche officielle Google Play.',
        sections: [{title: 'Le produit', text: 'Un parcours de capture et d’organisation pour les inspections, livraisons, interventions et suivis de chantier.'}, {title: 'Le travail technique', text: 'La valeur du dossier vient autant de son contexte que de la photo. La capture, la structure et l’export doivent former un parcours cohérent.', items: ['Photos et métadonnées contextualisées.', 'Organisation par client, site, mission ou session.', 'Génération de rapports PDF et exports d’images.']}, {title: 'Découvrir l’application', text: 'La fiche Google Play présente les usages et les fonctions disponibles.'}] },
      en: { category: 'Productivity / Field photography', intro: 'Turn field photos into documented records: context, notes, date, location and PDF report exports.', topics: ['Flutter', 'Photo & context', 'PDF reports', 'Organisation'], imageAlt: 'Official StampSight artwork showing field photography', caption: 'Artwork from the official Google Play listing.',
        sections: [{title: 'The product', text: 'A capture and organisation workflow for inspections, deliveries, interventions and site progress.'}, {title: 'The technical work', text: 'The value of a record comes from its context as much as its photograph. Capture, structure and export need to form a coherent workflow.', items: ['Photos and contextual metadata.', 'Organisation by client, site, mission or session.', 'PDF report generation and image exports.']}, {title: 'Explore the app', text: 'The Google Play listing presents the use cases and available features.'}] }
    }
  };

  let lang = 'fr';
  let activeProject = null;
  let returnFocus = null;
  let sourceVisual = null;
  let savedScroll = 0;
  let activeTransition = null;
  let activeMorph = null;
  let activeStep = 0;
  let headerHeight = header.getBoundingClientRect().height || 100;
  let framePending = false;
  const runningAnimations = new Set();
  const t = key => (lang === 'en' ? en[key] : fr[key]) || key;

  function animate(element, keyframes, options) {
    if (!element || reducedMotion.matches || typeof element.animate !== 'function') return;
    const animation = element.animate(keyframes, { ...options, easing: options.easing || 'cubic-bezier(.22,1,.36,1)' });
    runningAnimations.add(animation);
    animation.finished.then(() => { runningAnimations.delete(animation); animation.cancel(); }).catch(() => runningAnimations.delete(animation));
    return animation;
  }

  function setMenu(open) {
    mobileNav.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? (lang === 'fr' ? 'Fermer le menu' : 'Close menu') : (lang === 'fr' ? 'Ouvrir le menu' : 'Open menu'));
    if (open) animate(mobileNav, [{opacity: 0, transform: 'translateY(-8px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: 300});
  }

  function setLanguage(next, remember = true) {
    lang = next === 'en' ? 'en' : 'fr';
    document.documentElement.lang = lang;
    for (const element of $$('[data-i18n]')) element.innerHTML = t(element.dataset.i18n);
    for (const kind of ['aria', 'alt']) {
      for (const element of $$(`[data-i18n-${kind}]`)) {
        const key = element.dataset[kind === 'aria' ? 'i18nAria' : 'i18nAlt'];
        element.setAttribute(kind === 'aria' ? 'aria-label' : 'alt', (lang === 'en' ? enAttributes[key] : frAttributes[key]) || frAttributes[key] || '');
      }
    }
    languageButton.textContent = lang === 'fr' ? 'EN' : 'FR';
    languageButton.lang = lang === 'fr' ? 'en' : 'fr';
    languageButton.setAttribute('aria-label', lang === 'fr' ? 'Switch to English' : 'Passer en français');
    $('.copy-status').textContent = '';
    $('.wordmark').setAttribute('aria-label', lang === 'fr' ? 'El Marini App, accueil' : 'El Marini App, home');
    document.title = lang === 'fr' ? 'El Marini App — Du diagnostic au store' : 'El Marini App — From diagnosis to release';
    $('meta[name="description"]').content = lang === 'fr' ? 'Développeur Flutter indépendant. Audit, correction et publication d’applications Android et iOS. Découvrez Muslim App, Scaneris et AlarmBolt.' : 'Independent Flutter developer. Audits, fixes and releases for Android and iOS apps. Explore Muslim App, Scaneris and AlarmBolt.';
    $('meta[property="og:title"]').content = document.title;
    $('meta[property="og:description"]').content = $('meta[name="description"]').content;
    $('.contact-copy .button').href = 'mailto:support@elmariniapp.com?subject=' + encodeURIComponent(lang === 'fr' ? 'Audit Flutter — Mon projet' : 'Flutter audit — My project');
    setMenu(menuButton.getAttribute('aria-expanded') === 'true');
    if (activeProject) renderProject(activeProject);
    if (remember) { try { localStorage.setItem(storageKey, lang); } catch { /* Language still works when storage is unavailable. */ } }
    scheduleFrame();
  }

  function create(tag, text, className) {
    const element = document.createElement(tag);
    if (text !== undefined) element.textContent = text;
    if (className) element.className = className;
    return element;
  }

  function renderProject(id) {
    const project = projects[id];
    const content = project[lang];
    $('#case-category').textContent = content.category;
    $('.case-number').textContent = project.number + ' / 05';
    $('#case-title').textContent = project.title;
    $('#case-intro').textContent = content.intro;
    const topics = $('.case-topics');
    topics.replaceChildren(...content.topics.map(topic => create('span', topic)));
    const sections = $('.case-sections');
    sections.replaceChildren(...content.sections.map(section => {
      const article = create('section', undefined, 'case-section');
      article.append(create('h3', section.title), create('p', section.text));
      if (section.items) {
        const list = create('ul');
        list.append(...section.items.map(item => create('li', item)));
        article.append(list);
      }
      return article;
    }));
    const media = $('.case-media');
    media.className = 'case-media project-visual ' + project.className;
    let image = $('img', media);
    if (!image || image.dataset.project !== id) {
      image = create('img');
      image.src = project.image;
      image.dataset.project = id;
      image.width = project.className === 'visual-alarm' ? 1600 : 800;
      image.height = project.className === 'visual-alarm' ? 781 : 1422;
      media.replaceChildren(image);
    }
    image.alt = content.imageAlt;
    $('.case-caption').textContent = content.caption;
    const gallery = $('.case-gallery');
    gallery.replaceChildren(...project.gallery.map(src => {
      const figure = create('figure');
      const shot = create('img');
      shot.src = src;
      shot.alt = content.galleryAlt;
      shot.loading = 'lazy';
      figure.append(shot, create('figcaption', content.caption));
      return figure;
    }));
    const links = $('.case-links');
    const destination = project.store || project.support;
    const mainLink = create('a', undefined, 'button button-solid');
    mainLink.href = destination;
    if (project.store) { mainLink.target = '_blank'; mainLink.rel = 'noopener noreferrer'; }
    mainLink.append(create('span', project.store ? (lang === 'fr' ? 'Voir sur Google Play' : 'View on Google Play') : (lang === 'fr' ? 'Informations & assistance' : 'Information & support')));
    const arrow = create('span', '↗', 'arrow');
    arrow.setAttribute('aria-hidden', 'true');
    mainLink.append(arrow);
    const contactLink = create('a', lang === 'fr' ? 'Parlons de votre projet' : 'Let’s discuss your project', 'text-link');
    contactLink.href = '#contact';
    contactLink.addEventListener('click', event => {
      event.preventDefault();
      closeProject(false);
      $('#contact').scrollIntoView({behavior: reducedMotion.matches ? 'instant' : 'smooth'});
      history.replaceState(null, '', '#contact');
    });
    links.replaceChildren(mainLink, contactLink);
  }

  function lockBody() {
    savedScroll = window.scrollY;
    document.body.style.top = `-${savedScroll}px`;
    document.body.classList.add('dialog-open');
  }

  function unlockBody() {
    document.body.classList.remove('dialog-open');
    document.body.style.top = '';
    const previous = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo({top: savedScroll, behavior: 'instant'});
    document.documentElement.style.scrollBehavior = previous;
  }

  function cleanTransitionNames() {
    if (sourceVisual) sourceVisual.style.viewTransitionName = '';
    $('.case-media').style.viewTransitionName = '';
  }

  function finishMorph() {
    if (!activeMorph) return;
    activeMorph.animation.cancel();
    activeMorph.target.style.opacity = '';
    activeMorph.node.remove();
    activeMorph = null;
  }

  function morphFallback(update) {
    const opening = !dialog.open;
    const origin = opening ? sourceVisual : $('.case-media');
    const from = origin?.getBoundingClientRect();
    const clone = origin?.cloneNode(true);
    const originalImage = origin && $('img', origin);
    const imageStyle = originalImage && getComputedStyle(originalImage);
    update();
    const target = opening ? $('.case-media') : sourceVisual;
    const to = target?.getBoundingClientRect();
    if (!clone || !from?.width || !from?.height || !to?.width || !to?.height || typeof clone.animate !== 'function') return;
    clone.classList.add('motion-clone');
    clone.setAttribute('aria-hidden', 'true');
    clone.inert = true;
    Object.assign(clone.style, {position:'fixed', left:`${to.left}px`, top:`${to.top}px`, width:`${to.width}px`, height:`${to.height}px`, minHeight:'0', maxHeight:'none', zIndex:'100', pointerEvents:'none', viewTransitionName:''});
    const image = $('img', clone);
    if (image && imageStyle) Object.assign(image.style, {width:'100%', height:'100%', objectFit:imageStyle.objectFit || 'cover', objectPosition:imageStyle.objectPosition || 'center', transform:'none'});
    (opening ? dialog : document.body).append(clone);
    target.style.opacity = '0';
    const animation = animate(clone, [{transform:`translate(${from.left-to.left}px, ${from.top-to.top}px) scale(${from.width/to.width}, ${from.height/to.height})`,transformOrigin:'0 0',opacity:1},{transform:'translate(0,0) scale(1,1)',transformOrigin:'0 0',opacity:1,offset:.88},{transform:'translate(0,0) scale(1,1)',transformOrigin:'0 0',opacity:0}], {duration:720,fill:'both'});
    if (!animation) {target.style.opacity='';clone.remove();return;}
    const record = {animation,node:clone,target};
    activeMorph = record;
    animation.finished.catch(() => {}).finally(() => {
      if (activeMorph === record) {target.style.opacity='';clone.remove();activeMorph=null;}
    });
  }

  function transition(update) {
    finishMorph();
    if (activeTransition) { activeTransition.skipTransition(); cleanTransitionNames(); }
    if (reducedMotion.matches || typeof document.startViewTransition !== 'function') {
      if (reducedMotion.matches) update();
      else morphFallback(update);
      cleanTransitionNames();
      return;
    }
    try {
      const current = document.startViewTransition(update);
      activeTransition = current;
      current.finished.catch(() => {}).finally(() => {
        if (activeTransition === current) { cleanTransitionNames(); activeTransition = null; }
      });
    } catch {
      update();
      cleanTransitionNames();
    }
  }

  function openProject(id, trigger) {
    if (!projects[id] || dialog.open || activeProject) return;
    if (typeof dialog.showModal !== 'function') return;
    activeProject = id;
    returnFocus = trigger;
    sourceVisual = $('.project-visual', trigger) || $('.project-visual', trigger.closest('.project-card') || hero);
    renderProject(id);
    if (sourceVisual) sourceVisual.style.viewTransitionName = 'project-image';
    transition(() => {
      if (!activeProject) return;
      if (sourceVisual) sourceVisual.style.viewTransitionName = '';
      $('.case-media').style.viewTransitionName = 'project-image';
      dialog.showModal();
      dialog.scrollTop = 0;
      lockBody();
      $('.case-close', dialog).focus({preventScroll: true});
      if (typeof document.startViewTransition !== 'function') animate($('.case-copy'), [{opacity: 0, transform: 'translateY(18px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: 460});
    });
  }

  function closeProject(withMotion = true) {
    finishMorph();
    if (activeTransition) { activeTransition.skipTransition(); activeTransition = null; }
    if (!dialog.open) { activeProject = null; cleanTransitionNames(); return; }
    cleanTransitionNames();
    const close = () => {
      $('.case-media').style.viewTransitionName = '';
      dialog.close();
      unlockBody();
      if (sourceVisual) sourceVisual.style.viewTransitionName = 'project-image';
      if (returnFocus?.isConnected) returnFocus.focus({preventScroll: true});
      activeProject = null;
    };
    if (withMotion) { $('.case-media').style.viewTransitionName = 'project-image'; transition(close); }
    else { close(); cleanTransitionNames(); }
  }

  for (const trigger of $$('.project-trigger')) {
    trigger.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0 || typeof dialog.showModal !== 'function') return;
      event.preventDefault();
      openProject(trigger.dataset.project, trigger);
    });
  }
  for (const button of $$('.case-close')) button.addEventListener('click', () => closeProject());
  dialog.addEventListener('cancel', event => { event.preventDefault(); closeProject(false); });
  dialog.addEventListener('close', () => {
    if (dialog.open) return;
    if (document.body.classList.contains('dialog-open')) unlockBody();
    activeProject = null;
  });

  function setActiveStep(index) {
    if (index === activeStep) return;
    activeStep = index;
    $('#stage-number').textContent = String(index + 1).padStart(2, '0');
    for (let i = 0; i < scenes.length; i++) {
      scenes[i].classList.toggle('is-active', i === index);
      scenes[i].setAttribute('aria-hidden', String(i !== index));
      scenes[i].inert = i !== index;
      steps[i].classList.toggle('is-active', i === index);
      const link = $$('.stage-navigation a')[i];
      link.classList.toggle('is-active', i === index);
      if (i === index) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    }
  }

  function updateFrame() {
    framePending = false;
    if (dialog.open) return;
    const root = document.documentElement;
    const range = root.scrollHeight - window.innerHeight;
    root.style.setProperty('--reading', range > 0 ? Math.max(0, Math.min(1, window.scrollY / range)).toFixed(4) : '0');
    if (!reducedMotion.matches) {
      const heroRect = hero.getBoundingClientRect();
      if (heroRect.bottom > 0) {
        const progress = Math.min(1, Math.max(0, -heroRect.top / Math.max(1, heroRect.height)));
        root.style.setProperty('--hero-shift', `${(-progress * 18).toFixed(2)}px`);
        root.style.setProperty('--hero-scale', (1.035 + progress * .05).toFixed(4));
      }
    }
    const storyRect = story.getBoundingClientRect();
    if (storyRect.bottom > headerHeight && storyRect.top < window.innerHeight) {
      const mobilePinned = window.innerWidth <= 760 && getComputedStyle(stage).position === 'sticky';
      const trigger = mobilePinned ? headerHeight + stage.getBoundingClientRect().height + 35 : headerHeight + (window.innerHeight - headerHeight) * .34;
      let next = 0;
      for (let i = 0; i < steps.length; i++) if (steps[i].getBoundingClientRect().top <= trigger) next = i;
      setActiveStep(next);
    }
  }

  function scheduleFrame() {
    if (!framePending) { framePending = true; requestAnimationFrame(updateFrame); }
  }
  window.addEventListener('scroll', scheduleFrame, {passive: true});
  window.addEventListener('resize', () => { if (window.innerWidth > 760 && !mobileNav.hidden) setMenu(false); scheduleFrame(); }, {passive: true});
  window.addEventListener('pageshow', scheduleFrame);
  if (typeof ResizeObserver !== 'undefined') {
    const observer = new ResizeObserver(() => {
      headerHeight = header.getBoundingClientRect().height || 100;
      document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
      scheduleFrame();
    });
    observer.observe(header);
  }

  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  for (const link of $$('a', mobileNav)) link.addEventListener('click', () => setMenu(false));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !mobileNav.hidden) { setMenu(false); menuButton.focus(); } });
  document.addEventListener('click', event => { if (!mobileNav.hidden && !event.target.closest('.site-header')) setMenu(false); });
  languageButton.addEventListener('click', () => setLanguage(lang === 'fr' ? 'en' : 'fr'));

  $('.copy-email').addEventListener('click', async () => {
    const status = $('.copy-status');
    try {
      await navigator.clipboard.writeText('support@elmariniapp.com');
      status.textContent = lang === 'fr' ? 'Adresse copiée.' : 'Address copied.';
    } catch {
      status.textContent = lang === 'fr' ? 'Adresse : support@elmariniapp.com' : 'Address: support@elmariniapp.com';
    }
  });

  if (typeof IntersectionObserver !== 'undefined') {
    const revealObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target;
        if (element.classList.contains('rule-reveal')) {
          animate(element, [{clipPath: 'inset(0 100% 0 0)'}, {clipPath: 'inset(0 0 0 0)'}], {duration: 800});
        } else {
          const siblings = [...element.parentElement.children].filter(el => el.hasAttribute('data-reveal'));
          const position = Math.max(0, siblings.indexOf(element));
          animate(element, [{transform: 'translateY(24px)', opacity: .35}, {transform: 'translateY(0)', opacity: 1}], {duration: 720, delay: Math.min(position * 75, 180)});
        }
        revealObserver.unobserve(element);
      }
    }, {threshold: .12, rootMargin: '0px 0px -18px 0px'});
    for (const element of $$('[data-reveal], .rule-reveal')) revealObserver.observe(element);
    const navigationObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const link of $$('.desktop-nav a')) {
          if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        }
      }
    }, {rootMargin: '-15% 0px -65% 0px', threshold: 0});
    for (const section of $$('main > section[id]')) navigationObserver.observe(section);
  }

  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) {
      finishMorph();
      for (const animation of runningAnimations) animation.cancel();
      runningAnimations.clear();
      if (activeTransition) activeTransition.skipTransition();
      cleanTransitionNames();
    }
    scheduleFrame();
  });

  let remembered;
  try { remembered = localStorage.getItem(storageKey) || localStorage.getItem('elmarini-lang'); } catch { remembered = null; }
  setLanguage(remembered === 'fr' || remembered === 'en' ? remembered : navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : 'en', false);
  for (const [index, line] of $$('.title-line>span').entries()) {
    animate(line, [{transform: 'translateY(111%) rotate(1.4deg)'}, {transform: 'translateY(0) rotate(0)'}], {duration: 1000, delay: 70 + index * 105, fill: 'both'});
  }
  animate($('.hero-kicker'), [{opacity: 0, transform: 'translateY(8px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: 700, delay: 60, fill: 'both'});
  animate($('.hero-art'), [{clipPath: 'inset(0 0 100% 0)'}, {clipPath: 'inset(0 0 0 0)'}], {duration: 1200, delay: 120, fill: 'both'});
  for (const [index, element] of [$('.hero-intro'), $('.hero-actions'), $('.hero-footnote')].entries()) {
    animate(element, [{opacity: 0, transform: 'translateY(12px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: 700, delay: 280 + index * 90, fill: 'both'});
  }
  scheduleFrame();
})();
