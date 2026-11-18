const GRAMMAR_RULES = [
  "S -> a A C | b B",
  "A -> c A | ε",
  "B -> d B | e C",
  "C -> f",
];

const FIRST_SETS = {
  S: ["a", "b"],
  A: ["c", "ε"],
  B: ["d", "e"],
  C: ["f"],
};

const FOLLOW_SETS = { S: ["$"], A: ["f"], B: ["$"], C: ["$"] };

const GRAMMAR_PRODUCTIONS = {
  S: [
    ["a", "A", "C"],
    ["b", "B"],
  ],
  A: [["c", "A"], ["ε"]],
  B: [
    ["d", "B"],
    ["e", "C"],
  ],
  C: [["f"]],
};

const TERMINALS = ["a", "b", "c", "d", "e", "f", "$"];

const PARSING_TABLE = {
  S: { a: ["a", "A", "C"], b: ["b", "B"] },
  A: { c: ["c", "A"], f: ["ε"] },
  B: { d: ["d", "B"], e: ["e", "C"] },
  C: { f: ["f"] },
};

function isTerminal(sym) {
  return /^[abcdef$ε]$/.test(sym);
}

function generateValidSentence() {
  const sentenceTokens = [];

  const expand = (symbol) => {
    if (isTerminal(symbol)) {
      if (symbol !== "ε") sentenceTokens.push(symbol);
      return;
    }

    const productions = GRAMMAR_PRODUCTIONS[symbol];
    const randomProduction =
      productions[Math.floor(Math.random() * productions.length)];

    randomProduction.forEach(expand);
  };

  expand("S");
  return sentenceTokens.join(" ");
}
