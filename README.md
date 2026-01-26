# AISI/HCI — Site 100% estático (institucional/minimalista)

Este pacote foi gerado para hospedar um portal institucional e de transparência totalmente estático.

## Estrutura
- /index.html: página inicial (cards de navegação)
- /a-aisi/: apresentação institucional
- /governanca/: diretoria, estatuto, organograma, associados, atas, conselhos externos
- /pessoas/: gestão de pessoas
- /receitas/: receitas
- /contabilidade/: demonstrações/relatórios
- /compras/: licitações e compras

## Como atualizar conteúdo (sem mexer em código)
1. **Documentos (PDF):** coloque arquivos em `/docs` e ajuste links (se necessário) nas páginas.
2. **Listas/tabelas:** preencha os arquivos JSON em `/data`:
   - diretoria.json
   - associados.json
   - atas.json
   - relatorios.json
   - receitas.json
   - estagios.json

Os componentes são renderizados automaticamente via `/assets/app.js`.

## Hospedagem
- GitHub Pages, Cloudflare Pages, Netlify, Vercel (static), ou servidor HTTP simples.

## Teste local
Em um terminal, dentro da pasta do site:
- Python 3: `python -m http.server 8000`
Depois acesse `http://localhost:8000`
