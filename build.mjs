// Gera as páginas de aula gratuita (uma por área + a home de escolha) a partir
// do config.mjs. Uso: node build.mjs

import { writeFileSync, mkdirSync } from "node:fs";
import { AREAS } from "./config.mjs";

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Versões geradas. v1 = sem o botão de vendas (raiz). v2 = com o botão (/v2/...).
const VERSOES = [
  { nome: "v1", base: "", botao: false },
  { nome: "v2", base: "/v2", botao: true },
];
let V = VERSOES[0]; // versão sendo gerada

const TITULO_H1 = `Assista, gratuitamente, a uma aula de <span class="grad-text">2ª&nbsp;fase do Método&nbsp;VDE!</span>`;

// Ícones lucide (inline, para não depender de rede)
const I = {
  play: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14z"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`,
  next: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>`,
  book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>`,
  scale: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>`,
};

const head = ({ title, desc, path }) => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:type" content="website">
  <meta name="theme-color" content="#5a009f">
  <link rel="icon" href="/assets/olho-2fase.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/style.css">
</head>
<body data-page="${esc(path)}">
<div class="topbar">
  <img src="/assets/estrela.svg" alt="" aria-hidden="true"><span>Aulas gratuitas · 2ª fase da OAB&nbsp;48</span><img src="/assets/estrela.svg" alt="" aria-hidden="true">
</div>
<img class="bg-mark" src="/assets/olho-2fase.svg" alt="" aria-hidden="true">
<header class="top">
  <a href="${V.base}/" aria-label="Escolher outra área"><img src="/assets/logo-2fase.svg" alt="Método VDE · OAB 2ª fase"></a>
</header>`;

const footer = `<footer class="foot">
  <div class="wrap">
    <img src="/assets/logo-2fase.svg" alt="Método VDE · OAB 2ª fase">
    <p>© ${new Date().getFullYear()} Método VDE · Vício de uma Estudante. Todos os direitos reservados.</p>
  </div>
</footer>`;

// Nav de áreas (pills). `atual` = slug ativo.
const navAreas = (atual) => `<nav class="areas" aria-label="Escolha a área">
  ${AREAS.map(
    (a) =>
      `<a href="${V.base}/${a.slug}"${a.slug === atual ? ' class="on" aria-current="page"' : ""}>${esc(a.curta)}</a>`
  ).join("\n  ")}
</nav>`;

// Lista plana de blocos, na ordem: material, depois processual.
function blocosDe(area) {
  const out = [];
  area.aulas.forEach((aula) => {
    aula.blocos.forEach((src, i) => {
      out.push({
        src,
        tipo: aula.tipo,
        titulo: aula.titulo,
        bloco: aula.blocos.length === 1 ? "Bloco único" : `Bloco ${i + 1} de ${aula.blocos.length}`,
      });
    });
  });
  return out;
}

function paginaArea(area) {
  const blocos = blocosDe(area);
  const primeiro = blocos[0];
  const plural = area.professores.length > 1;
  const f = area.generoProfs === "f";
  const tituloProfs = plural
    ? f ? "as suas professoras" : "os seus professores"
    : f ? "a sua professora" : "o seu professor";

  let idx = 0;
  const playlist = area.aulas
    .map((aula) => {
      const itens = aula.blocos
        .map((_, i) => {
          const b = blocos[idx];
          const html = `<button type="button" class="pl-item${idx === 0 ? " on" : ""}" data-i="${idx}" aria-pressed="${idx === 0}">
            <span class="pl-ico">${I.play}</span>
            <span class="pl-txt"><b>${esc(b.bloco)}</b><small>${esc(aula.titulo)}</small></span>
          </button>`;
          idx++;
          return html;
        })
        .join("\n          ");
      return `<div class="pl-group">
          <p class="pl-kicker">${aula.tipo === "Direito Material" ? I.book : I.scale}${esc(aula.tipo)}</p>
          <p class="pl-title">${esc(aula.titulo)}</p>
          ${itens}
        </div>`;
    })
    .join("\n        ");

  const cards = area.professores
    .map(
      (p) => `<article class="prof" tabindex="0">
        <img src="/assets/profs/${p.foto}.webp" alt="${esc(p.nome)}, ${esc(p.cargo)}" loading="lazy" width="1200" height="888">
        <div class="prof-base">
          <span class="chip"><span>${esc(p.cargo)}</span></span>
          <p class="prof-nome">${esc(p.nome)}</p>
          ${p.ig ? `<span class="prof-ig">@${esc(p.ig)}</span>` : ""}
          <span class="prof-more">Ver currículo</span>
        </div>
        <div class="prof-hover">
          <div class="prof-hd">
            <span class="chip"><span>${esc(p.cargo)}</span></span>
            <p class="prof-nome">${esc(p.nome)}</p>
            ${p.ig ? `<span class="prof-ig">@${esc(p.ig)}</span>` : ""}
          </div>
          <p class="prof-bio">${esc(p.bio)}</p>
          ${
            p.ig
              ? `<a class="prof-link" href="https://www.instagram.com/${esc(p.ig)}" target="_blank" rel="noopener"><img src="/assets/instagram-branco.svg" alt="" aria-hidden="true" width="22" height="22">Ver perfil</a>`
              : `<span></span>`
          }
        </div>
      </article>`
    )
    .join("\n      ");

  const checkout = `${area.turmaUrl}#purchase-section`;

  return `${head({
    title: `Aula gratuita de 2ª fase · ${area.nome} | Método VDE`,
    desc: `Assista, gratuitamente, a uma aula de 2ª fase de ${area.nome} do Método VDE para a OAB 48: ${area.aulas.map((a) => a.titulo).join(" e ")}.`,
    path: area.slug,
  })}

<main>
  <section class="hero">
    <div class="wrap">
      <h1>${TITULO_H1}</h1>
      ${navAreas(area.slug)}

      <div class="aula">
        <div class="player-col">
          <div class="player">
            <iframe id="player" src="${esc(primeiro.src)}" title="Aula gratuita de ${esc(area.nome)}" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture" allowfullscreen fetchpriority="high"></iframe>
          </div>
          <div class="now">
            <div class="now-txt">
              <span class="now-kicker" id="now-kicker">${esc(primeiro.tipo)}</span>
              <p class="now-title"><span id="now-title">${esc(primeiro.titulo)}</span> <span class="now-bloco" id="now-bloco">${esc(primeiro.bloco)}</span></p>
            </div>
            <button type="button" class="btn-next" id="btn-next"${blocos.length < 2 ? " hidden" : ""}>Próximo bloco ${I.next}</button>
          </div>
        </div>
        <aside class="playlist" aria-label="Blocos da aula">
          <p class="pl-label">Aula experimental de ${esc(area.curta)}</p>
          ${playlist}
        </aside>
      </div>
    </div>
  </section>

  <section class="sec-profs">
    <div class="wrap">
      <h2>Conheça <span class="grad-text">${tituloProfs}</span> de ${esc(area.curta)}</h2>
      <div class="profs${plural ? "" : " single"}">
      ${cards}
      </div>
    </div>
  </section>

  <section class="sec-cta">
    <div class="wrap">
      <div class="cta-shell">
        <div class="cta-tab"><img src="/assets/estrela.svg" alt="" aria-hidden="true"><span>VDE 2ª Fase · OAB&nbsp;48</span></div>
        <div class="cta-box">
          <h2>Gostou da aula? Estude <span class="grad-text">todas as peças de ${esc(area.nome)}</span> com o Método&nbsp;VDE.</h2>
          <ul class="cta-list">
            <li>${I.check}<span><b>Cronograma diário até a prova</b>, com no máximo 3h de estudo por dia</span></li>
            <li>${I.check}<span><b>Aulas de Direito Material e Processual</b> 100% gravadas, com todo o conteúdo do edital</span></li>
            <li>${I.check}<span><b>Simulados inéditos com correção individualizada</b> e indicação dos pontos de melhoria</span></li>
            <li>${I.check}<span><b>Encontros ao vivo com os professores</b> para revisão e tira-dúvidas</span></li>
          </ul>
          ${V.botao ? `<a class="btn" href="${esc(checkout)}" data-cta>Entrar no VDE ${esc(area.curta)} ${I.arrow}</a>
          <p class="cta-note">Acesso até a 2ª fase da OAB 48, em 28/02/2027</p>` : ""}
        </div>
      </div>
    </div>
  </section>
</main>

${footer}

<script>window.__BLOCOS__ = ${JSON.stringify(blocos.map((b) => ({ ...b, area: area.nome })))};</script>
<script src="/assets/player.js" defer></script>
</body>
</html>
`;
}

function paginaHome() {
  const cards = AREAS.map(
    (a) => `<a class="area-card" href="${V.base}/${a.slug}">
        <span class="area-play">${I.play}</span>
        <span class="area-txt">
          <b>${esc(a.nome)}</b>
          <small>${a.aulas.map((x) => esc(x.titulo)).join(" · ")}</small>
          <em>com ${esc(a.professores.map((p) => p.nome).join(" e "))}</em>
        </span>
        <span class="area-go">${I.arrow}</span>
      </a>`
  ).join("\n      ");

  return `${head({
    title: "Aulas gratuitas de 2ª fase da OAB 48 | Método VDE",
    desc: "Assista, gratuitamente, a uma aula de 2ª fase do Método VDE: Trabalho, Constitucional, Penal, Administrativo, Tributário e Civil.",
    path: "home",
  })}

<main>
  <section class="hero hero-home">
    <div class="wrap">
      <h1>${TITULO_H1}</h1>
      <p class="sub">Escolha a sua área para assistir à aula completa, com o conteúdo de direito material e a peça processual.</p>
      <div class="area-grid">
      ${cards}
      </div>
    </div>
  </section>
</main>

${footer}
</body>
</html>
`;
}

for (const versao of VERSOES) {
  V = versao;
  const dir = V.base ? `.${V.base}/` : "./";
  for (const a of AREAS) {
    mkdirSync(new URL(`${dir}${a.slug}`, import.meta.url), { recursive: true });
    writeFileSync(new URL(`${dir}${a.slug}/index.html`, import.meta.url), paginaArea(a));
    console.log(`ok  ${V.base}/${a.slug}  (${a.nome} · ${blocosDe(a).length} blocos${V.botao ? "" : " · sem botão"})`);
  }
  writeFileSync(new URL(`${dir}index.html`, import.meta.url), paginaHome());
  console.log(`ok  ${V.base}/  (home de escolha)`);
}
