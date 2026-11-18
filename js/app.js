(function () {
  const $ = (id) => document.getElementById(id);

  const els = {
    grammarInfo: $("grammar-info"),
    parsingTable: $("parsing-table"),
    input: $("sentence"),
    btnGenerate: $("btn-generate"),
    btnAnalyze: $("btn-analyze"),
    btnStepByStep: $("btn-step-by-step"),
    btnReset: $("btn-reset"),
    stepControls: $("step-controls"),
    btnNext: $("btn-next"),
    stepCounter: $("step-counter"),
    stack: $("stack-visualizer"),
    result: $("result"),
  };

  const state = {
    steps: [],
    isSuccess: null,
    visibleStepCount: 0,
    isStepByStep: false,
    analysisFinished: false,
  };

  function resetState() {
    state.steps = [];
    state.isSuccess = null;
    state.visibleStepCount = 0;
    state.isStepByStep = false;
    state.analysisFinished = false;
  }

  function render() {
    const showStepControls = state.isStepByStep && !state.analysisFinished;
    els.stepControls.hidden = !showStepControls;
    els.stepCounter.textContent = `Etapa ${state.visibleStepCount} de ${state.steps.length}`;

    renderStackVisualizer(els.stack, state.steps.slice(0, state.visibleStepCount));

    const showResult = state.analysisFinished && state.isSuccess !== null;
    els.result.hidden = !showResult;
    if (showResult) {
      els.result.className = `result ${state.isSuccess ? "result--success" : "result--error"}`;
      els.result.textContent = state.isSuccess
        ? `Aceito em ${state.steps.length} linhas`
        : `Rejeitado em ${state.steps.length} linhas`;
    }
  }

  function handleParse(stepByStep) {
    if (!els.input.value.trim()) return;

    const result = new LL1Parser().parse(els.input.value);
    state.steps = result.steps;
    state.isSuccess = result.success;
    state.isStepByStep = stepByStep;
    state.visibleStepCount = stepByStep
      ? Math.min(1, result.steps.length)
      : result.steps.length;
    state.analysisFinished = !stepByStep || result.steps.length <= 1;
    render();
  }

  function handleNextStep() {
    state.visibleStepCount = Math.min(state.visibleStepCount + 1, state.steps.length);
    if (state.visibleStepCount === state.steps.length) {
      state.analysisFinished = true;
    }
    render();
  }

  function handleGenerate() {
    els.input.value = generateValidSentence();
    resetState();
    render();
  }

  function handleReset() {
    resetState();
    els.input.value = "";
    render();
  }

  renderGrammarInfo(els.grammarInfo);
  renderParsingTable(els.parsingTable);

  els.btnGenerate.addEventListener("click", handleGenerate);
  els.btnAnalyze.addEventListener("click", () => handleParse(false));
  els.btnStepByStep.addEventListener("click", () => handleParse(true));
  els.btnNext.addEventListener("click", handleNextStep);
  els.btnReset.addEventListener("click", handleReset);

  render();
})();
