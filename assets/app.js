async function loadJSON(path) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`Falha ao carregar ${path}: ${res.status}`);
  return res.json();
}

function escapeHTML(str) {
  return String(str ?? "").replace(/[&<>"']/g, (m) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"
  }[m]));
}

function renderTable(el, columns, rows) {
  if (!Array.isArray(rows) || rows.length === 0) {
    el.innerHTML = `<p class="small">Nenhum item publicado até o momento.</p>`;
    return;
  }
  const thead = `<thead><tr>${columns.map(c => `<th>${escapeHTML(c.label)}</th>`).join("")}</tr></thead>`;
  const tbody = `<tbody>${
    rows.map(r => `<tr>${columns.map(c => `<td>${c.render(r)}</td>`).join("")}</tr>`).join("")
  }</tbody>`;
  el.innerHTML = `<table class="table">${thead}${tbody}</table>`;
}

function renderDocLink(url, label="PDF") {
  if (!url) return "-";
  const safeUrl = escapeHTML(url);
  return `<a href="${safeUrl}" target="_blank" rel="noopener">${escapeHTML(label)}</a>`;
}

async function initDiretoria() {
  const target = document.querySelector("[data-page='diretoria']");
  if (!target) return;
  const data = await loadJSON("/data/diretoria.json");
  renderTable(target, [
    { label: "Nome", render: r => escapeHTML(r.nome) },
    { label: "Cargo", render: r => escapeHTML(r.cargo) },
    { label: "Mandato", render: r => escapeHTML(r.mandato) },
    { label: "Mini-currículo", render: r => escapeHTML(r.minicv) },
    { label: "Documento", render: r => renderDocLink(r.documento_url, r.documento_label || "PDF") }
  ], data.itens);
}

async function initAssociados() {
  const target = document.querySelector("[data-page='associados']");
  if (!target) return;
  const data = await loadJSON("/data/associados.json");
  renderTable(target, [
    { label: "Nome", render: r => escapeHTML(r.nome) }
  ], data.itens);
}

async function initAtas() {
  const target = document.querySelector("[data-page='atas']");
  if (!target) return;
  const data = await loadJSON("/data/atas.json");
  renderTable(target, [
    { label: "Ano", render: r => escapeHTML(r.ano) },
    { label: "Descrição", render: r => escapeHTML(r.descricao) },
    { label: "Documento", render: r => renderDocLink(r.pdf_url, "PDF") }
  ], data.itens);
}

async function initRelatorios() {
  const target = document.querySelector("[data-page='relatorios']");
  if (!target) return;
  const data = await loadJSON("/data/relatorios.json");
  renderTable(target, [
    { label: "Ano", render: r => escapeHTML(r.ano) },
    { label: "Tipo", render: r => escapeHTML(r.tipo) },
    { label: "Documento", render: r => renderDocLink(r.pdf_url, "PDF") }
  ], data.itens);
}

async function initReceitas() {
  const target = document.querySelector("[data-page='receitas']");
  if (!target) return;
  const data = await loadJSON("/data/receitas.json");
  renderTable(target, [
    { label: "Ano", render: r => escapeHTML(r.ano) },
    { label: "Receita pública (R$)", render: r => escapeHTML(r.publica) },
    { label: "Receita privada (R$)", render: r => escapeHTML(r.privada) },
    // { label: "Observações", render: r => escapeHTML(r.obs) }
  ], data.itens);
}

async function initEstagios() {
  const target = document.querySelector("[data-page='estagios']");
  if (!target) return;
  const data = await loadJSON("/data/estagios.json");
  renderTable(target, [
    { label: "Área", render: r => escapeHTML(r.area) },
    { label: "Instituição de origem", render: r => escapeHTML(r.instituicao) },
    // { label: "Tipo de vínculo", render: r => escapeHTML(r.vinculo) },
    { label: "Alunos por Ano", render: r => escapeHTML(r.estagAno) }
  ], data.itens);
}

async function initAuditoria() {
  const target = document.querySelector("[data-page='auditoria']");
  if (!target) return;
  const data = await loadJSON("/data/auditoria.json");
  renderTable(target, [
    { label: "Título", render: r => escapeHTML(r.titulo) },
    { label: "Arquivo", render: r => renderDocLink(r.arquivo, "Ver PDF") }
  ], data.itens);
}


async function init() {
  const fns = [initDiretoria, initAssociados, initAtas, initRelatorios, initReceitas, initEstagios, initAuditoria];
  for (const fn of fns) {
    try { await fn(); } catch (e) { console.error(e); }
  }
}

document.addEventListener("DOMContentLoaded", init);
