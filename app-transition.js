(function(){
  if(window.PengooTransition) return;

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

  function go(url){
    if(!url) return;
    const next = normalize(url);
    if(next === window.location.href) return;

    ensureCurtain();
    document.body.classList.remove('app-enter');
    document.body.classList.add('app-leaving');
    window.setTimeout(() => {
      window.location.href = url;
    }, 180);
  }

  window.PengooTransition = { go };

  window.addEventListener('pageshow', () => {
    ensureCurtain();
    document.body.classList.remove('app-leaving');
    document.body.classList.add('app-enter');
    window.setTimeout(() => document.body.classList.remove('app-enter'), 320);
  });
})();
