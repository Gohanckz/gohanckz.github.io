/* GOHANCKZ — interacción del sitio (sin dependencias) */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ── Limpieza del service worker del tema anterior ── */
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (rs) { rs.forEach(function (r) { r.unregister(); }); }).catch(function () {});
  }
  if (window.caches && caches.keys) {
    caches.keys().then(function (ks) { ks.forEach(function (k) { if (/^chirpy/.test(k)) caches.delete(k); }); }).catch(function () {});
  }

  /* ── Reloj (hora de Santiago) ── */
  var clock = $('[data-clock]');
  if (clock) {
    var fmt;
    try { fmt = new Intl.DateTimeFormat('es-CL', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Santiago' }); }
    catch (e) { fmt = null; }
    var tick = function () { clock.textContent = fmt ? fmt.format(new Date()) : ''; };
    tick(); setInterval(tick, 30000);
  }

  /* ── Correo ofuscado ── */
  $$('.js-mail').forEach(function (a) {
    if (a.dataset.u && a.dataset.d) a.href = 'mailto:' + a.dataset.u + '@' + a.dataset.d;
  });

  /* ── Texto que se "descifra" ── */
  var GLYPHS = '!<>-_\\/[]{}=+*^?#01ABCDEFX$%&';
  function scramble(el, duration) {
    if (reduce || el._scr) return;
    var target = el.dataset.text || (el.dataset.text = el.textContent);
    var len = target.length, start = Date.now(), dur = duration || 420;
    el._scr = true;
    (function step() {
      var out = '', progress = (Date.now() - start) / dur;
      for (var i = 0; i < len; i++) {
        var ch = target[i];
        if (ch === ' ' || ch === '\n') { out += ch; continue; }
        out += (i / len < progress) ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (progress < 1) setTimeout(step, 30);
      else { el.textContent = target; el._scr = false; }
    })();
  }
  $$('[data-scramble]').forEach(function (el) {
    el.addEventListener('mouseenter', function () { scramble(el, 380); });
    el.addEventListener('focus', function () { scramble(el, 380); });
  });
  $$('[data-decode]').forEach(function (el, i) {
    setTimeout(function () { scramble(el, 900); }, 120 + i * 140);
  });

  /* ── Cursor de selección ── */
  if (finePointer) {
    var cur = $('.cursor');
    if (cur) {
      document.documentElement.classList.add('has-cursor');
      var dot = $('.cursor__dot', cur), box = $('.cursor__box', cur), label = $('.cursor__label', cur);
      var mx = -100, my = -100, bx = -100, by = -100, bw = 34, bh = 34, hover = null, lastLabel = '';
      var SEL = 'a, button, summary, label[for], input, [data-cursor]';

      document.addEventListener('pointermove', function (e) {
        mx = e.clientX; my = e.clientY;
        cur.classList.remove('is-hidden');
        dot.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
      }, { passive: true });
      document.addEventListener('pointerdown', function () { cur.classList.add('is-down'); });
      document.addEventListener('pointerup', function () { cur.classList.remove('is-down'); });
      document.addEventListener('mouseleave', function () { cur.classList.add('is-hidden'); });
      document.addEventListener('pointerover', function (e) {
        var t = e.target.closest ? e.target.closest(SEL) : null;
        hover = t;
      });

      var labelFor = function (el) {
        if (el.dataset.cursor) return el.dataset.cursor;
        if (el.tagName === 'SUMMARY') return el.parentNode.open ? 'Cerrar' : 'Abrir';
        if (el.tagName === 'INPUT') return 'Escribir';
        if (el.tagName === 'A') {
          var href = el.getAttribute('href') || '';
          if (/^mailto:|^#contacto/.test(href) && el.classList.contains('js-mail')) return 'Email';
          if (/^https?:/.test(href) && el.host !== location.host) return 'Abrir ↗';
          return 'Ir →';
        }
        return 'Click';
      };

      (function loop() {
        var tx, ty, tw, th, text;
        if (hover && document.body.contains(hover)) {
          var r = hover.getBoundingClientRect(), pad = 6;
          tx = r.left - pad; ty = r.top - pad; tw = r.width + pad * 2; th = r.height + pad * 2;
          text = labelFor(hover);
        } else {
          tw = 34; th = 34; tx = mx - 17; ty = my - 17;
          text = 'x:' + Math.round(mx) + ' y:' + Math.round(my);
        }
        var k = 0.22;
        bx += (tx - bx) * k; by += (ty - by) * k; bw += (tw - bw) * k; bh += (th - bh) * k;
        box.style.transform = 'translate(' + bx.toFixed(1) + 'px,' + by.toFixed(1) + 'px)';
        box.style.width = bw.toFixed(1) + 'px'; box.style.height = bh.toFixed(1) + 'px';
        if (text !== lastLabel) { label.textContent = text; lastLabel = text; }
        requestAnimationFrame(loop);
      })();
    }
  }

  /* ── Ojo ASCII que sigue al cursor ── */
  var canvas = $('#ascii-eye');
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var RAMP = ' .·:;-=+*#%@';
    var NOISE = '01<>/\\{}[]#$%&*';
    var W = 0, H = 0, dpr = 1, fs = 12, cw = 7, ch = 12, cols = 0, rows = 0;
    var pointer = { x: -9999, y: -9999, seen: false, last: 0 };
    var look = { x: 0, y: 0 }, lookT = { x: 0, y: 0 };
    var openness = 1, blinkAt = performance.now() + 2500, blinkStart = 0, glitchUntil = 0;
    var visible = true, lastFrame = 0;

    var hash = function (x, y) { var h = (Math.imul(x, 374761393) + Math.imul(y, 668265263)) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967295; };

    function resize() {
      var r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      fs = Math.max(8, Math.min(14, W / 46));
      cw = fs * 0.62; ch = fs * 1.02;
      cols = Math.floor(W / cw); rows = Math.floor(H / ch);
      buildAtlas();
    }

    // Render por software: cada glifo se rasteriza una vez como máscara alfa y
    // en cada fotograma se copian los píxeles a un buffer (putImageData).
    // fillText/drawImage por celda (~3000 por frame) era demasiado lento.
    var GL = '', GI = {}, LEVELS = 16, masks = [], gw = 1, gh = 1, img = null, buf = null, CW = 0, CH = 0, PAL = [];
    (RAMP + NOISE).split('').forEach(function (c) { if (!(c in GI)) { GI[c] = GL.length; GL += c; } });
    for (var lv = 0; lv <= LEVELS; lv++) {
      var gg = Math.round(70 + (lv / (LEVELS - 1)) * 185);
      PAL.push(lv === LEVELS ? [57, 255, 106] : [gg, gg, gg]);
    }
    function buildAtlas() {
      gw = Math.ceil(cw * dpr); gh = Math.ceil(ch * dpr);
      CW = canvas.width; CH = canvas.height;
      var a = document.createElement('canvas');
      a.width = gw * GL.length; a.height = gh;
      var ac = a.getContext('2d');
      ac.font = '500 ' + (fs * dpr).toFixed(1) + 'px "JetBrains Mono", monospace';
      ac.textBaseline = 'top'; ac.fillStyle = '#fff';
      for (var k = 0; k < GL.length; k++) ac.fillText(GL[k], k * gw, 0);
      var data = ac.getImageData(0, 0, a.width, a.height).data;
      masks = [];
      for (k = 0; k < GL.length; k++) {
        var m = new Uint8Array(gw * gh);
        for (var y = 0; y < gh; y++) for (var x = 0; x < gw; x++) m[y * gw + x] = data[((y * a.width) + k * gw + x) * 4 + 3];
        masks.push(m);
      }
      img = ctx.createImageData(CW, CH);
      buf = new Uint32Array(img.data.buffer);
    }
    function blit(k, lvl, ox, oy) {
      var m = masks[k], c = PAL[lvl], r = c[0], g = c[1], b = c[2];
      for (var y = 0; y < gh; y++) {
        var yy = oy + y; if (yy >= CH) break;
        var row = yy * CW + ox, mrow = y * gw;
        for (var x = 0; x < gw; x++) {
          var al = m[mrow + x];
          if (al && ox + x < CW) buf[row + x] = (al << 24) | (b << 16) | (g << 8) | r;
        }
      }
    }

    function frame(now) {
      if (!reduce) requestAnimationFrame(frame);
      if (!visible || (now - lastFrame < 33 && !reduce)) return;
      lastFrame = now;
      var t = now / 1000;

      // Parpadeo
      if (!reduce) {
        if (!blinkStart && now > blinkAt) blinkStart = now;
        if (blinkStart) {
          var p = (now - blinkStart) / 260;
          openness = p < .5 ? 1 - p * 2 * 0.95 : 0.05 + (p - .5) * 2 * 0.95;
          if (p >= 1) { openness = 1; blinkStart = 0; blinkAt = now + 2600 + Math.random() * 4200; }
        }
      }

      // Mirada: sigue al puntero, o deambula si está quieto
      var rect = canvas.getBoundingClientRect();
      var cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
      if (pointer.seen && now - pointer.last < 3500) {
        lookT.x = Math.max(-1, Math.min(1, (pointer.x - cx) / (window.innerWidth * 0.45)));
        lookT.y = Math.max(-1, Math.min(1, (pointer.y - cy) / (window.innerHeight * 0.45)));
      } else if (!reduce) {
        lookT.x = Math.sin(t * 0.35) * 0.55; lookT.y = Math.sin(t * 0.23 + 1) * 0.35;
      }
      look.x += (lookT.x - look.x) * (reduce ? 1 : 0.08);
      look.y += (lookT.y - look.y) * (reduce ? 1 : 0.08);

      var ix = look.x * 0.34, iy = look.y * 0.13;
      var near = Math.hypot(pointer.x - cx, pointer.y - cy);
      var pupilR = 0.105 + Math.max(0, 0.05 - near / 12000);
      var glitch = now < glitchUntil;
      var px0 = pointer.x - rect.left, py0 = pointer.y - rect.top;
      var R = Math.max(60, W * 0.13);

      if (!buf) return;
      buf.fill(0);
      var half = W / 2, tslot = Math.floor(t * 2);
      for (var j = 0; j < rows; j++) {
        var py = j * ch + ch / 2;
        var v = (py - H / 2) / half;
        for (var i = 0; i < cols; i++) {
          var px = i * cw + cw / 2;
          var u = (px - W / 2) / half;
          var uu = u / 0.94;
          var lid = uu * uu < 1 ? openness * 0.5 * Math.pow(1 - uu * uu, 0.85) : 0;
          var b = 0, inside = Math.abs(v) < lid;

          if (inside) {
            var dx = u - ix, dy = v - iy, r = Math.sqrt(dx * dx + dy * dy);
            if (r < pupilR) b = hash(i, j) < 0.12 ? 0.12 : 0;
            else if (r < 0.33) {
              var ang = Math.atan2(dy, dx);
              b = 0.5 + 0.42 * (0.5 + 0.5 * Math.sin(ang * 11 + r * 26 - t * 0.5)) * (r / 0.33);
              if (r > 0.3) b = 0.08;
              else if (r < pupilR + 0.03) b = 0.22;
            } else {
              var edge = 1 - Math.abs(v) / lid;
              b = 0.16 + 0.34 * Math.min(1, edge * 1.6) + (hash(i, j) - 0.5) * 0.22;
            }
            var hx = dx + 0.1, hy = dy + 0.09;
            if (hx * hx + hy * hy < 0.0028) b = 1;
          } else {
            var d = Math.abs(v) - lid + Math.max(0, Math.abs(uu) - 1) * 0.8;
            var prob = 0.62 * Math.exp(-d * 5.2);
            if (hash(i + tslot * 7, j) < prob * (0.55 + 0.45 * Math.sin(t * 1.3 + i * 0.4 + j * 0.3))) b = 0.14 + hash(i, j + 3) * 0.22;
          }

          var hot = false;
          var mdx = px - px0, mdy = py - py0;
          if (mdx * mdx + mdy * mdy < R * R) hot = b > 0.05 || hash(i, j + tslot) < 0.25;
          if (glitch && hash(i, j + Math.floor(t * 30)) < 0.08) hot = true;
          if (b <= 0.02 && !hot) continue;

          var chx, lvl;
          if (hot) {
            chx = NOISE[(hash(i + Math.floor(t * 12), j) * NOISE.length) | 0];
            lvl = LEVELS;
          } else {
            chx = RAMP[Math.min(RAMP.length - 1, Math.max(1, Math.round(b * (RAMP.length - 1))))];
            lvl = Math.min(LEVELS - 1, Math.max(0, Math.round(b * (LEVELS - 1))));
          }
          blit(GI[chx], lvl, Math.round(i * cw * dpr), Math.round(j * ch * dpr));
        }
      }
      ctx.putImageData(img, 0, 0);    }

    resize();
    window.addEventListener('resize', function () { resize(); if (reduce) frame(performance.now()); });
    document.addEventListener('pointermove', function (e) {
      pointer.x = e.clientX; pointer.y = e.clientY; pointer.seen = true; pointer.last = performance.now();
      if (reduce) frame(performance.now());
    }, { passive: true });
    canvas.parentNode.addEventListener('click', function () {
      glitchUntil = performance.now() + 450; blinkAt = performance.now();
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }).observe(canvas);
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { resize(); if (reduce) frame(performance.now()); });
    requestAnimationFrame(frame);
  }

  /* ── Filtro del blog ── */
  var q = $('#post-search');
  if (q) {
    var rows = $$('.plist .prow'), btns = $$('.filters button'), count = $('#post-count'), empty = $('.blog-empty');
    var cat = 'all';
    var norm = function (s) { return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); };
    var apply = function () {
      var term = norm(q.value.trim()), n = 0;
      rows.forEach(function (r) {
        var ok = (cat === 'all' || r.dataset.cat === cat) && (!term || norm(r.dataset.search).indexOf(term) !== -1);
        r.hidden = !ok; if (ok) n++;
      });
      if (count) count.textContent = String(n).padStart(2, '0');
      if (empty) empty.hidden = n !== 0;
    };
    q.addEventListener('input', apply);
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        cat = b.dataset.cat;
        btns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        apply();
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && document.activeElement !== q) { e.preventDefault(); q.focus(); }
    });
    apply();
  }

  /* ── Bloques de código: barra de ventana + copiar ── */
  $$('.prose div.highlighter-rouge').forEach(function (blk) {
    var m = blk.className.match(/language-([\w+-]+)/);
    var lang = m ? m[1] : 'code';
    if (lang === 'plaintext' || lang === 'text') lang = 'txt';
    var bar = document.createElement('div');
    bar.className = 'code-bar';
    bar.innerHTML = '<span>' + lang + '.exe</span>';
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'code-copy'; btn.textContent = 'Copiar';
    btn.addEventListener('click', function () {
      var code = blk.querySelector('.rouge-code pre') || blk.querySelector('pre');
      var text = code ? code.innerText : '';
      (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(function () {
        btn.textContent = 'Copiado'; btn.classList.add('is-done');
        setTimeout(function () { btn.textContent = 'Copiar'; btn.classList.remove('is-done'); }, 1600);
      }).catch(function () { btn.textContent = 'Error'; });
    });
    bar.appendChild(btn);
    blk.insertBefore(bar, blk.firstChild);
  });

  /* ── Índice del post ── */
  var toc = $('.toc'), prose = $('.prose');
  if (toc && prose) {
    var hs = $$('h1[id], h2[id], h3[id]', prose);
    var top = Math.min.apply(null, hs.map(function (h) { return +h.tagName.charAt(1); }));
    hs = hs.filter(function (h) { return +h.tagName.charAt(1) <= top + 1; });
    if (hs.length < 2) { toc.style.display = 'none'; }
    else {
      var nav = $('nav', toc), links = {};
      hs.forEach(function (h) {
        var a = document.createElement('a');
        a.href = '#' + h.id; a.textContent = h.textContent; a.className = 'lvl-' + (+h.tagName.charAt(1) - top + 2);
        nav.appendChild(a); links[h.id] = a;
      });
      if ('IntersectionObserver' in window) {
        var current = null;
        var io = new IntersectionObserver(function (es) {
          es.forEach(function (e) {
            if (e.isIntersecting) {
              if (current) current.classList.remove('is-active');
              current = links[e.target.id]; if (current) current.classList.add('is-active');
            }
          });
        }, { rootMargin: '-90px 0px -70% 0px' });
        hs.forEach(function (h) { io.observe(h); });
      }
    }
  }
})();
