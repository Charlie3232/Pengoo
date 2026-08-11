(function(){
  if(window.PengooTransition) return;

  const APP_PAGES = ['home.html','match.html','chat.html','my.html'];
  const APP_PAGE_SET = new Set(APP_PAGES);
  const IMAGE_CACHE_KEY = 'pengoo_recent_images_v1';
  const IMAGE_CACHE_LIMIT = 90;

  const style = document.createElement('style');
  style.textContent = `
    .app-transition-curtain{
      position:fixed;
      inset:0;
      z-index:9999;
      pointer-events:none;
      background:#F5F0EE;
      opacity:0;
      transform:translateX(18px);
      transition:opacity .22s ease, transform .22s ease;
    }
    body.app-enter .wrap{
      animation:pengooAppEnter .26s cubic-bezier(.2,.8,.2,1) both;
    }
    body.app-leaving .wrap{
      animation:pengooAppLeave .18s ease both;
    }
    body.app-leaving .app-transition-curtain{
      opacity:1;
      transform:translateX(0);
    }
    @keyframes pengooAppEnter{
      from{opacity:0;transform:translateX(14px) scale(.992);}
      to{opacity:1;transform:translateX(0) scale(1);}
    }
    @keyframes pengooAppLeave{
      from{opacity:1;transform:translateX(0) scale(1);}
      to{opacity:.55;transform:translateX(-10px) scale(.992);}
    }
    @media (prefers-reduced-motion: reduce){
      body.app-enter .wrap,
      body.app-leaving .wrap{animation:none;}
      .app-transition-curtain{transition:none;}
    }
  `;
  document.head.appendChild(style);

  const curtain = document.createElement('div');
  curtain.className = 'app-transition-curtain';

  function ensureCurtain(){
    if(!curtain.parentNode) document.body.appendChild(curtain);
  }

  function normalize(url){
    const anchor = document.createElement('a');
    anchor.href = url;
    return anchor.href;
  }

  function getAppPage(url){
    const anchor = document.createElement('a');
    anchor.href = url;
    const filename = anchor.pathname.split('/').pop() || 'home.html';
    return APP_PAGE_SET.has(filename) ? filename : '';
  }

  function go(url){
    if(!url) return;
    const appPage = getAppPage(url);
    if(appPage && window.parent && window.parent !== window && window.parent.PengooAppShell){
      window.parent.PengooAppShell.go(appPage.replace('.html', ''), url);
      return;
    }

    const next = normalize(url);
    if(next === window.location.href) return;

    ensureCurtain();
    document.body.classList.remove('app-enter');
    document.body.classList.add('app-leaving');
    window.setTimeout(() => {
      window.location.href = url;
    }, 180);
  }

  function safeStorageGet(key, fallback){
    try{
      return JSON.parse(localStorage.getItem(key) || 'null') || fallback;
    } catch(e){
      return fallback;
    }
  }

  function safeStorageSet(key, value){
    try{
      localStorage.setItem(key, JSON.stringify(value));
    } catch(e){}
  }

  function isUsefulImageUrl(url){
    if(!url || url.startsWith('data:') || url.startsWith('blob:')) return false;
    return /\.(jpg|jpeg|png|webp|gif)(\?|#|$)/i.test(url)
      || url.includes('firebasestorage.googleapis.com')
      || url.includes('storage.googleapis.com')
      || url.includes('googleusercontent.com');
  }

  function rememberImage(url){
    if(!isUsefulImageUrl(url)) return;
    const list = safeStorageGet(IMAGE_CACHE_KEY, []);
    const next = [url, ...list.filter(item => item !== url)].slice(0, IMAGE_CACHE_LIMIT);
    safeStorageSet(IMAGE_CACHE_KEY, next);
  }

  function rememberImagesFromPage(){
    document.querySelectorAll('img').forEach(img => {
      rememberImage(img.currentSrc || img.src);
      rememberImage(img.dataset?.full);
      rememberImage(img.dataset?.photo);
      rememberImage(img.dataset?.thumb);
    });
  }

  function warmImageCache(){
    const list = safeStorageGet(IMAGE_CACHE_KEY, []).slice(0, 36);
    list.forEach((url, index) => {
      window.setTimeout(() => {
        const img = new Image();
        img.decoding = 'async';
        img.loading = 'eager';
        img.src = url;
      }, index * 90);
    });
  }

  function installImageObserver(){
    const observer = new MutationObserver(() => rememberImagesFromPage());
    observer.observe(document.documentElement, {
      childList:true,
      subtree:true,
      attributes:true,
      attributeFilter:['src','data-full','data-photo','data-thumb']
    });
    window.setInterval(rememberImagesFromPage, 3500);
  }

  async function registerServiceWorker(){
    if(!('serviceWorker' in navigator) || location.protocol === 'file:') return;
    try{
      await navigator.serviceWorker.register('pengoo-sw.js', { scope:'./' });
    } catch(e){
      console.info('Pengoo cache worker skipped', e);
    }
  }

  window.PengooTransition = { go, rememberImage, warmImageCache };

  function prefetch(url){
    if(!url || document.querySelector(`link[rel="prefetch"][href="${url}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    link.as = 'document';
    document.head.appendChild(link);
  }

  window.addEventListener('load', () => {
    APP_PAGES.forEach(prefetch);
    registerServiceWorker();
    rememberImagesFromPage();
    warmImageCache();
    installImageObserver();
  });

  window.addEventListener('pageshow', () => {
    ensureCurtain();
    document.body.classList.remove('app-leaving');
    document.body.classList.add('app-enter');
    window.setTimeout(() => document.body.classList.remove('app-enter'), 320);
  });
})();
