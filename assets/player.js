// Troca de bloco na playlist da aula (Panda Video via iframe).
(function () {
  var blocos = window.__BLOCOS__ || [];
  var iframe = document.getElementById("player");
  var items = Array.prototype.slice.call(document.querySelectorAll(".pl-item"));
  var kicker = document.getElementById("now-kicker");
  var title = document.getElementById("now-title");
  var bloco = document.getElementById("now-bloco");
  var next = document.getElementById("btn-next");
  var atual = 0;

  function comAutoplay(src) {
    return src + (src.indexOf("?") > -1 ? "&" : "?") + "autoplay=true";
  }

  function ir(i, rolar) {
    if (i < 0 || i >= blocos.length || i === atual) return;
    atual = i;
    var b = blocos[i];
    iframe.src = comAutoplay(b.src);
    kicker.textContent = b.tipo;
    title.textContent = b.titulo;
    bloco.textContent = b.bloco;
    items.forEach(function (el, k) {
      el.classList.toggle("on", k === i);
      el.setAttribute("aria-pressed", k === i ? "true" : "false");
    });
    if (next) next.hidden = i >= blocos.length - 1;
    // No celular a playlist fica abaixo do player: sobe para o vídeo.
    if (rolar && window.matchMedia("(max-width: 1023px)").matches) {
      iframe.closest(".player").scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  items.forEach(function (el) {
    el.addEventListener("click", function () {
      ir(Number(el.getAttribute("data-i")), true);
    });
  });
  if (next) next.addEventListener("click", function () { ir(atual + 1, false); });

  // Card de professor: no toque (sem hover) abre/fecha o currículo.
  if (window.matchMedia("(hover: none)").matches) {
    document.querySelectorAll(".prof").forEach(function (card) {
      card.addEventListener("click", function (e) {
        if (e.target.closest("a")) return;
        card.classList.toggle("open");
      });
    });
  }
})();
