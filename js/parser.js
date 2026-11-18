class LL1Parser {
  parse(inputString) {
    const input = (inputString.trim() + " $")
      .split(/\s+/)
      .filter((t) => t !== "");
    let pointer = 0;
    const stack = ["$", "S"];
    const steps = [];

    while (stack.length > 0) {
      const top = stack[stack.length - 1];
      const currentToken = input[pointer] || "";

      const currentStep = {
        stack: [...stack],
        input: input.slice(pointer).join(" "),
        action: "",
      };

      if (top === "$" && currentToken === "$") {
        currentStep.action = "Aceito";
        steps.push(currentStep);
        return {
          steps,
          success: true,
          message: "Sucesso: Sentença reconhecida!",
        };
      }

      if (isTerminal(top)) {
        if (top === currentToken) {
          currentStep.action = `Ler '${currentToken}' (Desempilhar)`;
          stack.pop();
          pointer++;
        } else {
          currentStep.action = `Erro: Esperado '${top}', encontrado '${currentToken}'`;
          steps.push(currentStep);
          return {
            steps,
            success: false,
            message: "Erro de Sintaxe: Sentença Rejeitada.",
          };
        }
      } else {
        const row = PARSING_TABLE[top];
        const production =
          row && Object.hasOwn(row, currentToken) ? row[currentToken] : null;

        if (production) {
          currentStep.action = `Produzir: ${top} -> ${production.join(" ")}`;
          stack.pop();
          if (production[0] !== "ε") {
            for (let i = production.length - 1; i >= 0; i--) {
              stack.push(production[i]);
            }
          }
        } else {
          currentStep.action = `Erro: Nenhuma regra para M[${top}, ${currentToken}]`;
          steps.push(currentStep);
          return {
            steps,
            success: false,
            message: "Erro de Sintaxe: Sentença Rejeitada.",
          };
        }
      }
      steps.push(currentStep);
    }

    return {
      steps,
      success: false,
      message: "Erro: A pilha esvaziou antes do final da entrada.",
    };
  }
}
