# Aulas gratuitas · 2ª fase OAB 48

Páginas estáticas com uma aula experimental por área (Trabalho, Constitucional, Penal, Administrativo, Tributário, Civil), na IDV de metodovde.com.br/segundafase.

- `config.mjs`: áreas, embeds do Panda (um por bloco), professores e link da turma.
- `node build.mjs`: gera `/<slug>/index.html` para cada área e `/index.html` (home de escolha).
- Duas versões (`VERSOES` no build.mjs): v1 na raiz, sem o botão de vendas; v2 em `/v2/...`, igual mas com o botão.
- `assets/style.css` e `assets/player.js`: estilo e troca de blocos da playlist.
- Botão de vendas: página da turma no site, âncora `#purchase-section` (preço e cupom sempre os vigentes).

Preview local: `python3 -m http.server 4213` na pasta. Deploy: Vercel estático (`vercel.json` com `cleanUrls`).
