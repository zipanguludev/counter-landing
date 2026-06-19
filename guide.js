// Shared theme toggle for Counter guide pages (light / dark)
(function(){
  var root = document.documentElement;
  var btn = document.getElementById('theme-toggle');
  var meta = document.querySelector('meta[name="theme-color"]');
  var COLOR = { dark: '#0a0a0f', light: '#f6f6fb' };
  function get(){ return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark'; }
  function apply(theme){
    root.setAttribute('data-theme', theme);
    if (meta) meta.setAttribute('content', COLOR[theme]);
    if (btn) btn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
  }
  apply(get());
  if (btn) {
    btn.addEventListener('click', function(){
      var next = get() === 'light' ? 'dark' : 'light';
      apply(next);
      try { localStorage.setItem('ca-theme', next); } catch(e){}
      if (typeof gtag === 'function') { gtag('event', 'theme_toggle', { theme: next }); }
    });
  }
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function(e){
      var saved = null;
      try { saved = localStorage.getItem('ca-theme'); } catch(_){}
      if (!saved) apply(e.matches ? 'light' : 'dark');
    });
  }
})();
