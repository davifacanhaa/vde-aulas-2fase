// Aulas gratuitas de 2ª fase (OAB 48) por área.
// Edite aqui e rode `node build.mjs` para regenerar as páginas.
//
// Professores, bios, @ e fotos conferidos nas páginas de turma de
// metodovde.com.br/segundafase/turma/<slug> em 10/11/2026.
// O botão de vendas leva para a página da turma, na seção de compra, assim o
// preço/cupom vigente fica sempre o do site.

const PANDA = (host, id) => `https://${host}.tv.pandavideo.com.br/embed/?v=${id}`;

export const AREAS = [
  {
    slug: "trabalho",
    nome: "Direito do Trabalho",
    curta: "Trabalho",
    generoProfs: "f",
    turmaUrl: "https://metodovde.com.br/segundafase/turma/trabalho",
    aulas: [
      { tipo: "Direito Material", titulo: "Adicionais", blocos: [
        PANDA("player-vz-2b607c99-772", "6c5ea0af-6ce1-4755-9f6f-148df9889d7a"),
      ] },
      { tipo: "Direito Processual", titulo: "Homologação de Acordo Extrajudicial", blocos: [
        PANDA("player-vz-2b607c99-772", "a3f32035-7848-4135-880f-73a3d30e8dfe"),
      ] },
    ],
    professores: [
      { nome: "Ana Carolina Destefani", cargo: "Professora", ig: "anacarolinadestefani", foto: "ana-carolina-destefani",
        bio: "Advogada. Servidora Pública. Mestre em Direito. Pós-Graduação em Direito do Consumidor, Trabalho, Processo do Trabalho e Direito Privado. Professora do Método VDE." },
      { nome: "Renata Japiassu", cargo: "Professora", ig: "re.japiassu", foto: "renata-japiassu",
        bio: "Advogada. Mestre em Direito. Especialista em Direito do Trabalho e Processual Trabalhista. Professora do Método VDE." },
    ],
  },
  {
    slug: "constitucional",
    nome: "Direito Constitucional",
    curta: "Constitucional",
    generoProfs: "m",
    turmaUrl: "https://metodovde.com.br/segundafase/turma/constitucional",
    aulas: [
      { tipo: "Direito Material", titulo: "Poder Constituinte e Emendas Constitucionais", blocos: [
        PANDA("player-vz-54a88981-4fc", "0e56a558-e0e7-4e35-9079-61dd8fe86590"),
      ] },
      { tipo: "Direito Processual", titulo: "Ação Popular", blocos: [
        PANDA("player-vz-54a88981-4fc", "9637a83f-a4f7-44e9-bdf4-a03d807c539e"),
        PANDA("player-vz-54a88981-4fc", "211be4cb-2d89-40c6-bf43-cdeabef00669"),
        PANDA("player-vz-54a88981-4fc", "66a93b73-27a1-4f6c-bf54-08008c589c19"),
      ] },
    ],
    professores: [
      { nome: "Líbero Filho", cargo: "Professor", ig: "liberofilho", foto: "libero-filho",
        bio: "Oficial de Registro Civil das Pessoas Naturais de Curral Queimado, Petrolina/PE. Mestre em Direito pela UNICAP. Pós-Graduado em Direito Eleitoral e Direito Constitucional. Professor VDE Concursos e VDE OAB." },
      { nome: "Natalia Valença", cargo: "Professora", ig: "nataliavalenca", foto: "natalia-valenca",
        bio: "Advogada. Especialista em Direito Público, Mestra e Doutoranda em Direito. Professora do Método VDE." },
    ],
  },
  {
    slug: "penal",
    nome: "Direito Penal",
    curta: "Penal",
    generoProfs: "m",
    turmaUrl: "https://metodovde.com.br/segundafase/turma/penal",
    aulas: [
      { tipo: "Direito Material", titulo: "Ilicitude", blocos: [
        PANDA("player-vz-21d8c0ab-498", "9b1512fa-121c-4e4b-bbdb-4109b181f3fc"),
        PANDA("player-vz-21d8c0ab-498", "89e25d6f-a059-4d7a-aeea-240409804e5a"),
      ] },
      { tipo: "Direito Processual", titulo: "Memoriais", blocos: [
        PANDA("player-vz-21d8c0ab-498", "24518b7f-0c64-490a-9c64-01dc81683573"),
      ] },
    ],
    professores: [
      { nome: "Bruna Sakezevski", cargo: "Professora", ig: "brunasakezevski", foto: "bruna-sakezevski",
        bio: "Advogada Criminal. Pós-Graduação em Direito Penal, Processo Penal e Legislação Penal Especial. Mestre pela Univel. Professora do Método VDE." },
      { nome: "Victor Pontes", cargo: "Professor", ig: "victorpontesadv", foto: "victor-pontes",
        bio: "Advogado. Mestre em Direito pela Universidade Católica de Pernambuco (UNICAP). Pós-Graduado em Direito Penal e Processo Penal pela Faculdade Damas. Professor de Direito na Faculdade UNIBRA. Professor do Método VDE." },
    ],
  },
  {
    slug: "administrativo",
    nome: "Direito Administrativo",
    curta: "Administrativo",
    generoProfs: "f",
    turmaUrl: "https://metodovde.com.br/segundafase/turma/administrativo",
    aulas: [
      { tipo: "Direito Material", titulo: "Improbidade Administrativa", blocos: [
        PANDA("player-vz-de17bc11-bf0", "746c2ba7-05da-4038-8122-dd7cc3b5351a"),
      ] },
      { tipo: "Direito Processual", titulo: "Mandado de Segurança", blocos: [
        PANDA("player-vz-de17bc11-bf0", "700ed005-735b-4217-8921-2ffc0837ed28"),
        PANDA("player-vz-de17bc11-bf0", "404a8434-0dd2-4a97-846f-cc614ed9724f"),
        PANDA("player-vz-de17bc11-bf0", "1731c9a4-ccc6-4147-b9ce-858e5537b244"),
      ] },
    ],
    professores: [
      { nome: "Tainan Natércia", cargo: "Professora", ig: "tainannatercia", foto: "tainan-natercia",
        bio: "Advogada. Expertise e atuação em Direito Público. Mestre em Direito ao Desenvolvimento. Professora do Método VDE." },
    ],
  },
  {
    slug: "tributario",
    nome: "Direito Tributário",
    curta: "Tributário",
    generoProfs: "f",
    turmaUrl: "https://metodovde.com.br/segundafase/turma/tributario",
    aulas: [
      { tipo: "Direito Material", titulo: "Imunidades Tributárias", blocos: [
        PANDA("player-vz-a1540ae3-806", "31a88b16-b215-4b5a-96d7-714df4dfb716"),
        PANDA("player-vz-a1540ae3-806", "c02e92ea-38c5-4475-a756-20ee22150ef2"),
      ] },
      { tipo: "Direito Processual", titulo: "Ação Anulatória de Débito Fiscal", blocos: [
        PANDA("player-vz-a1540ae3-806", "42afa371-4558-4ade-bd4c-07599a53098f"),
        PANDA("player-vz-a1540ae3-806", "8fbb02ad-211d-4a82-81b3-38c07712ee47"),
      ] },
    ],
    professores: [
      { nome: "Lara Machado", cargo: "Professora", ig: "laradbmachado", foto: "lara-machado",
        bio: "Advogada. Mestre pela Universidade Federal do Ceará (UFC). Pesquisadora do Grupo de Tributação Ambiental, PPGD/UFC. Professora do Método VDE." },
    ],
  },
  {
    slug: "civil",
    nome: "Direito Civil",
    curta: "Civil",
    generoProfs: "f",
    turmaUrl: "https://metodovde.com.br/segundafase/turma/civil",
    aulas: [
      { tipo: "Direito Material", titulo: "Direito das Obrigações", blocos: [
        PANDA("player-vz-c6340714-849", "29f5e3fe-cf2c-4e2d-8c46-b11eb585f313"),
        PANDA("player-vz-c6340714-849", "c1cee353-584d-4a71-82d3-0f2f00c850f3"),
      ] },
      { tipo: "Direito Processual", titulo: "Tutelas Provisórias", blocos: [
        PANDA("player-vz-c6340714-849", "ad79ae02-fb12-4bae-b2d5-3faea77ca521"),
      ] },
    ],
    professores: [
      // Giulia não tem Instagram no site.
      { nome: "Giulia Christensen", cargo: "Professora", ig: "", foto: "giulia-christensen",
        bio: "Juíza no Tribunal de Justiça do Estado de São Paulo. Professora do Método VDE." },
      { nome: "Eduarda Caraciolo", cargo: "Professora", ig: "eduardacaraciolo", foto: "eduarda-graciolo",
        bio: "Advogada. Especialista em Direito Civil e Direito Processual Civil. Professora do Método VDE." },
    ],
  },
];
