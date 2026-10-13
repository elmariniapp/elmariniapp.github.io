const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {JSDOM, VirtualConsole} = require('jsdom');
const root = path.resolve(__dirname, '../..');
const html = fs.readFileSync(path.join(root, 'test/index.html'), 'utf8');
const js = fs.readFileSync(path.join(root, 'test/editorial.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'test/editorial.css'), 'utf8');
let checks = 0;
function check(message, fn) { fn(); checks++; console.log('PASS ' + message); }
function setup({lang = 'fr', reduced = false, transition = false, storageBlocked = false, mobile = false} = {}) {
  const errors = [], animations = [], observers = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', e => { if (!e.message.includes('navigation')) errors.push(e.message); });
  const dom = new JSDOM(html, {url:'https://elmariniapp.github.io/test/', runScripts:'outside-only', pretendToBeVisual:true, virtualConsole});
  const w = dom.window;
  Object.defineProperty(w.navigator, 'language', {value:lang});
  if (mobile) w.innerWidth = 390;
  w.matchMedia = () => ({matches: reduced, addEventListener(){}, removeEventListener(){}});
  w.scrollTo = () => {};
  w.HTMLElement.prototype.scrollIntoView = function() {};
  w.HTMLElement.prototype.animate = function(frames, options) {
    animations.push({element:this,frames,options});
    return {finished:Promise.resolve(),cancel(){}};
  };
  w.ResizeObserver = class { constructor(fn){this.fn=fn;} observe(){this.fn();} };
  w.IntersectionObserver = class {constructor(fn){this.fn=fn;this.targets=[];observers.push(this);}observe(e){this.targets.push(e);}unobserve(){} };
  w.HTMLDialogElement.prototype.showModal = function(){this.open=true;};
  w.HTMLDialogElement.prototype.close = function(){this.open=false;this.dispatchEvent(new w.Event('close'));};
  w.navigator.clipboard = {writeText: async text => {w.copiedText=text;}};
  if (transition) w.document.startViewTransition = fn => {
    fn();
    const names = [...w.document.querySelectorAll('[style]')].filter(el=>el.style.viewTransitionName==='project-image');
    assert.equal(names.length,1,'only one image has a transition name');
    return {finished:Promise.resolve(),skipTransition(){}};
  };
  if (storageBlocked) Object.defineProperty(w,'localStorage',{get(){throw new Error('blocked');}});
  w.eval(js);
  return {w,dom,errors,animations,observers};
}
const tick = () => new Promise(resolve=>setTimeout(resolve,30));
(async()=>{
  const main=setup(); await tick(); const d=main.w.document;
  check('Initialization has no JavaScript error',()=>assert.deepEqual(main.errors,[]));
  check('French is detected and content is complete',()=>{assert.equal(d.documentElement.lang,'fr');assert.match(d.querySelector('h1').textContent,/Je débloque/);});
  check('All local image, stylesheet, script and font paths exist',()=>{
    for(const el of d.querySelectorAll('[src],link[href]')){
      const value=el.getAttribute('src')||el.getAttribute('href');
      if(/^https:|^mailto:|^#/.test(value))continue;
      assert.ok(fs.existsSync(path.resolve(root,'test',value)),value);
    }
    const fontCss=fs.readFileSync(path.join(root,'test/fonts/fonts.css'),'utf8');
    for(const [,url]of fontCss.matchAll(/url\(([^)]+)\)/g))assert.ok(fs.existsSync(path.resolve(root,'test/fonts',url)),url);
  });
  check('All same-page anchors target an existing id',()=>{
    for(const a of d.querySelectorAll('a[href^="#"]'))assert.ok(d.getElementById(a.hash.slice(1)),a.hash);
  });
  check('No duplicate HTML ids',()=>{const ids=[...d.querySelectorAll('[id]')].map(el=>el.id);assert.equal(new Set(ids).size,ids.length);});
  check('Images have alt text and explicit dimensions',()=>{for(const im of d.querySelectorAll('img')){assert.ok(im.alt.length>10);assert.ok(im.width>0&&im.height>0);}});
  check('Native links remain available without JavaScript',()=>{
    const staticDom=new JSDOM(html);
    for(const a of staticDom.window.document.querySelectorAll('.project-trigger'))assert.ok(a.getAttribute('href')&&!a.getAttribute('href').startsWith('#'));
    assert.ok(!html.includes('opacity:0'));
    staticDom.window.close();
  });
  d.querySelector('.language-button').click();await tick();
  check('Every page translation resolves in English',()=>{
    for(const el of d.querySelectorAll('[data-i18n]'))assert.notEqual(el.innerHTML,el.dataset.i18n,el.dataset.i18n);
    assert.equal(d.documentElement.lang,'en');assert.match(d.querySelector('h1').textContent,/I unblock/);
    for(const el of d.querySelectorAll('[data-i18n-aria]'))assert.ok(el.getAttribute('aria-label'));
  });
  check('Language choice persists across page reloads',()=>assert.equal(main.w.localStorage.getItem('lang'),'en'));
  const ids=['muslim','scaneris','alarmbolt','stampsight'];
  for(const id of ids){
    const trigger=d.querySelector(`[data-project="${id}"]`);trigger.click();await tick();
    check(`Project ${id} opens with complete English content`,()=>{
      assert.equal(d.querySelector('dialog').open,true);assert.equal(d.querySelectorAll('.case-section').length,3);
      assert.ok(d.querySelector('#case-intro').textContent.length>50);
      assert.ok(d.querySelector('.case-media img').alt.length>10);
      assert.ok(d.body.classList.contains('dialog-open'));
      assert.equal(d.activeElement,d.querySelector('.case-close'));
      for(const im of d.querySelectorAll('.case-art img'))assert.ok(fs.existsSync(path.resolve(root,'test',im.getAttribute('src'))));
    });
    d.querySelector('dialog').dispatchEvent(new main.w.Event('cancel',{cancelable:true}));await tick();
    check(`Project ${id} closes with Escape and restores focus`,()=>{
      assert.equal(d.querySelector('dialog').open,false);assert.ok(!d.body.classList.contains('dialog-open'));assert.equal(d.activeElement,trigger);
    });
  }
  d.querySelector('.copy-email').click();await tick();
  check('Copy email produces accessible confirmation',()=>{assert.equal(main.w.copiedText,'support@elmariniapp.com');assert.equal(d.querySelector('.copy-status').textContent,'Address copied.');});
  d.querySelector('.language-button').click();await tick();
  check('French text and accessibility labels are restored',()=>{assert.equal(d.documentElement.lang,'fr');assert.equal(d.querySelector('.menu-toggle').getAttribute('aria-label'),'Ouvrir le menu');});
  const mobile=setup({mobile:true});await tick();const md=mobile.w.document;
  md.querySelector('.menu-toggle').click();
  check('Mobile menu exposes its links',()=>{assert.equal(md.querySelector('#mobile-nav').hidden,false);assert.equal(md.querySelector('.menu-toggle').getAttribute('aria-expanded'),'true');});
  md.querySelector('#mobile-nav a').click();
  check('Mobile navigation closes after choosing a section',()=>assert.equal(md.querySelector('#mobile-nav').hidden,true));
  md.querySelector('.menu-toggle').click();md.dispatchEvent(new mobile.w.KeyboardEvent('keydown',{key:'Escape'}));
  check('Escape closes mobile menu and restores its focus',()=>{assert.equal(md.querySelector('#mobile-nav').hidden,true);assert.equal(md.activeElement,md.querySelector('.menu-toggle'));});
  const reduced=setup({reduced:true});await tick();
  check('Reduced motion schedules no Web Animation',()=>assert.equal(reduced.animations.length,0));
  reduced.w.document.querySelector('[data-project="scaneris"]').click();await tick();
  check('Reduced-motion project remains usable',()=>assert.equal(reduced.w.document.querySelector('dialog').open,true));
  reduced.w.document.querySelector('.case-close').click();await tick();
  check('Reduced-motion close restores document state',()=>assert.ok(!reduced.w.document.body.classList.contains('dialog-open')));
  const native=setup({transition:true});await tick();const nd=native.w.document;
  nd.querySelector('[data-project="muslim"]').click();await tick();
  check('Native View Transition opens the project',()=>assert.equal(nd.querySelector('dialog').open,true));
  nd.querySelector('.case-close').click();await tick();
  check('Native View Transition restores the project card',()=>{assert.equal(nd.querySelector('dialog').open,false);assert.equal(nd.querySelectorAll('[style*="view-transition-name: project-image"]').length,0);});
  const blocked=setup({storageBlocked:true});await tick();
  check('Unavailable localStorage does not break initialization',()=>assert.deepEqual(blocked.errors,[]));
  check('Responsive and motion preference styles are included',()=>{
    for(const rule of ['max-width:760px','max-width:370px','prefers-reduced-motion:reduce','max-height:680px'])assert.ok(css.includes(rule),rule);
    assert.ok(css.includes('minmax(0,'));assert.ok(css.includes('focus-visible'));
  });
  check('Official images and local fonts need no runtime third-party request',()=>{
    for(const el of d.querySelectorAll('script[src],link[rel="stylesheet"],img[src]'))assert.ok(!/^https:/.test(el.getAttribute('src')||el.getAttribute('href')));
    assert.ok(!js.includes('fetch('));
  });
  for(const context of [main,mobile,reduced,native,blocked]){assert.deepEqual(context.errors,[]);context.w.close();}
  console.log(`${checks} checks passed. DOM and static validation; browser layout has not been emulated.`);
})().catch(error=>{console.error(error);process.exit(1);});
