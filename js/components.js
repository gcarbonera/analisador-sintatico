function el(tag, attrs, ...children) {
  const node = document.createElement(tag);

  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      node.setAttribute(key, value);
    }
  }

  for (const child of children.flat()) {
    if (child === null || child === undefined || child === false) continue;
    node.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }

  return node;
}

function createSetTable(title, modifier, sets) {
  return el(
    "div",
    { class: "panel" },
    el("h3", { class: `panel__title panel__title--${modifier}` }, `Conjuntos ${title}`),
    el(
      "table",
      { class: "set-table" },
      el("thead", null, el("tr", null, el("th", null, "Não terminal"), el("th", null, title))),
      el(
        "tbody",
        null,
        Object.entries(sets).map(([symbol, values]) =>
          el(
            "tr",
            null,
            el("td", { class: "set-table__symbol" }, symbol),
            el("td", null, `{${values.join(", ")}}`)
          )
        )
      )
    )
  );
}

function renderGrammarInfo(container) {
  container.replaceChildren(
    el(
      "div",
      { class: "panel panel--grammar" },
      el("h3", { class: "panel__title" }, "Gramática"),
      el(
        "ul",
        { class: "rules" },
        GRAMMAR_RULES.map((rule) => el("li", null, el("b", null, rule)))
      )
    ),
    createSetTable("FIRST", "first", FIRST_SETS),
    createSetTable("FOLLOW", "follow", FOLLOW_SETS)
  );
}

function renderParsingTable(container) {
  const rows = Object.keys(PARSING_TABLE).map((nt) =>
    el(
      "tr",
      null,
      el("td", { class: "parsing-table__nt" }, nt),
      TERMINALS.map((t) => {
        const production = PARSING_TABLE[nt][t];
        return el("td", null, production ? `${nt} → ${production.join(" ")}` : "");
      })
    )
  );

  container.replaceChildren(
    el("h3", { class: "section-title" }, "Tabela de Parsing M[A, a]"),
    el(
      "table",
      { class: "parsing-table__grid" },
      el("thead", null, el("tr", null, el("th", null, "NT \\ T"), TERMINALS.map((t) => el("th", null, t)))),
      el("tbody", null, rows)
    )
  );
}

function renderStackVisualizer(container, steps) {
  if (steps.length === 0) {
    container.replaceChildren();
    return;
  }

  container.replaceChildren(
    el("h3", { class: "stack__title" }, "Passos de Execução da Pilha"),
    el(
      "table",
      { class: "stack__table" },
      el(
        "thead",
        null,
        el(
          "tr",
          null,
          el("th", { class: "stack__col-line" }, "Linha"),
          el("th", null, "Pilha"),
          el("th", null, "Entrada Restante"),
          el("th", null, "Ação")
        )
      ),
      el(
        "tbody",
        null,
        steps.map((step, idx) =>
          el(
            "tr",
            null,
            el("td", { class: "stack__line" }, idx + 1),
            el("td", { class: "stack__stack" }, step.stack.join(" ")),
            el("td", { class: "stack__input" }, step.input),
            el("td", { class: "stack__action" }, step.action)
          )
        )
      )
    )
  );
}
