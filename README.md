# Analisador Sintático LL(1)

Projeto interativo de um **Analisador Sintático Preditivo LL(1)** feito em **HTML, CSS e JavaScript puros**, sem frameworks, sem build e sem dependências. A aplicação valida sentenças com base em uma gramática específica e mostra, passo a passo, o comportamento da pilha de parsing, a tabela de análise $M[A, a]$ e os conjuntos *FIRST* e *FOLLOW*.

---

## 🚀 Como executar

Não é preciso instalar nada (nem Node.js, nem npm).

1. Baixe ou clone o repositório.
2. Abra o arquivo **`index.html`** no navegador (duplo clique).

Se preferir usar um servidor local, na pasta do projeto rode `python -m http.server` e acesse `http://localhost:8000`.

Como todos os caminhos são relativos, a pasta também pode ser publicada como está no **GitHub Pages**.

---

## 🗂️ Estrutura do projeto

```
analisador-sintatico/
├── index.html          # Estrutura da página
├── css/
│   └── style.css       # Estilos
└── js/
    ├── grammar.js      # Gramática, FIRST/FOLLOW, tabela de parsing e gerador de sentenças
    ├── parser.js       # Algoritmo LL(1) (classe LL1Parser)
    ├── components.js   # Funções que desenham a gramática, a tabela e a pilha
    └── app.js          # Estado da tela, eventos dos botões e renderização
```

Os scripts são carregados pelo `index.html` nesta ordem: `grammar.js` → `parser.js` → `components.js` → `app.js`.

---

## 📝 Como utilizar o analisador

1. **Gerar Sentença Válida**: cria de forma aleatória uma cadeia válida pertencente à linguagem da gramática.
2. **Entrada de sentença**: campo de texto onde você digita a cadeia que deseja validar.
3. **Analisar**: executa o algoritmo LL(1) e exibe a tabela com todo o histórico de transições da pilha.
4. **Passo a passo**: executa a mesma análise, mas mostra uma linha por vez. Use **Próximo passo** para avançar; o resultado final aparece ao terminar.
5. **Reiniciar**: limpa o histórico, as mensagens e o campo de texto para um novo teste.

---

## ⚠️ Observação importante de formatação

Ao escrever uma sentença manualmente, separe cada símbolo por um espaço. Os tokens são delimitados por espaços para que o analisador consiga interpretá-los corretamente.

- **Formato correto:** `a c c f`
- **Formato errado:** `accf`

---

## 📐 Gramática implementada

O analisador valida a seguinte Gramática Livre de Contexto (GLC):

```
S -> aAC | bB
A -> cA | ε
B -> dB | eC
C -> f
```

Letras maiúsculas **(S, A, B, C)** representam Não-Terminais e letras minúsculas **(a, b, c, d, e, f)** representam Terminais. O símbolo **ε** representa a cadeia vazia.
