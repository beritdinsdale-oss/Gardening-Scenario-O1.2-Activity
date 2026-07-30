"use strict";

const app = document.getElementById("app");
const liveRegion = document.getElementById("live-region");

let content;
let scenarios = [];
let state;

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function announce(message) {
  liveRegion.textContent = "";
  window.setTimeout(() => {
    liveRegion.textContent = message;
  }, 40);
}

function focusTitle() {
  window.setTimeout(() => {
    const title = document.getElementById("screen-title");
    if (title) {
      title.setAttribute("tabindex", "-1");
      title.focus();
    }
  }, 0);
}

function resetState() {
  state = {
    screen: "intro",
    scenarioIndex: 0,
    selectedChoice: null,
    attempts: Array(scenarios.length).fill(0),
    correctFirstTry: 0
  };
}

function photoMarkup(photo) {
  if (!photo) return "";
  const source = photo.source
    ? `<a href="${escapeHTML(photo.source)}" target="_blank" rel="noopener">${escapeHTML(photo.credit)}</a>`
    : escapeHTML(photo.credit || "");
  return `
    <figure class="scenario-photo">
      <img src="${escapeHTML(photo.src)}" alt="${escapeHTML(photo.alt || "")}" loading="lazy" decoding="async">
      ${photo.credit ? `<figcaption>Photo: ${source}</figcaption>` : ""}
    </figure>`;
}

function progressMarkup(index) {
  const labels = content.activity.labels;
  const current = index + 1;
  const percent = Math.round((current / scenarios.length) * 100);
  return `
    <div class="progress-wrap" aria-label="Activity progress">
      <div class="progress-label">
        <span>${escapeHTML(labels.progressScenario)} ${current} ${escapeHTML(labels.progressOf)} ${scenarios.length}</span>
        <span>${percent}%</span>
      </div>
      <div class="progress-track" role="progressbar" aria-valuemin="1" aria-valuemax="${scenarios.length}" aria-valuenow="${current}" aria-label="Scenario progress">
        <div class="progress-bar" style="width:${percent}%"></div>
      </div>
    </div>`;
}

function renderIntro() {
  const intro = content.activity.intro;
  state.screen = "intro";
  app.innerHTML = `
    <section class="hero-intro">
      <div class="hero-image-wrap">
        <img class="hero-image"
          src="${escapeHTML(intro.heroImage.src)}"
          alt="${escapeHTML(intro.heroImage.alt)}"
          loading="eager" decoding="async">
        <p class="hero-credit-overlay">
          <span aria-hidden="true">📷</span>
          <span>${escapeHTML(intro.heroImage.credit)}</span>
        </p>
      </div>
      <div class="hero-copy">
        <p class="scenario-kicker">${escapeHTML(intro.eyebrow)}</p>
        <h1 id="screen-title">${escapeHTML(intro.title)}</h1>
        <p class="hero-subtitle">${escapeHTML(intro.subtitle)}</p>
        <p class="lead">${escapeHTML(intro.description)}</p>
        <div class="objective">
          <strong>${escapeHTML(intro.objectiveLabel)}</strong>
          <span>${escapeHTML(intro.objective)}</span>
        </div>
        <div class="intro-details">
          <h2>${escapeHTML(intro.howItWorksHeading)}</h2>
          ${intro.instructions.map(item => `<p>${escapeHTML(item)}</p>`).join("")}
        </div>
        <div class="button-row intro-button-row">
          <button class="primary-button" id="start-button" type="button">${escapeHTML(intro.startButton)}</button>
        </div>
      </div>
    </section>`;
  document.getElementById("start-button").addEventListener("click", () => {
    state.scenarioIndex = 0;
    state.screen = "scenario";
    render();
    announce(`${content.activity.labels.progressScenario} 1 ${content.activity.labels.progressOf} ${scenarios.length}.`);
  });
  focusTitle();
}

function renderScenario() {
  const s = scenarios[state.scenarioIndex];
  const labels = content.activity.labels;
  app.innerHTML = `
    ${progressMarkup(state.scenarioIndex)}
    <p class="scenario-kicker">${escapeHTML(labels.scenarioEyebrow)}</p>
    <h1 id="screen-title">${escapeHTML(s.title)}</h1>
    <p class="lead">${escapeHTML(s.context)}</p>
    ${photoMarkup(s.photo)}
    <section class="evidence-box" aria-labelledby="evidence-heading">
      <h2 id="evidence-heading">${escapeHTML(labels.evidenceHeading)}</h2>
      <ul>${s.evidence.map(item => `<li>${escapeHTML(item)}</li>`).join("")}</ul>
    </section>
    <p class="question">${escapeHTML(s.question)}</p>
    <div class="choice-list" role="group" aria-label="${escapeHTML(labels.choiceGroup)}">
      ${s.choices.map(([id, label]) => `
        <button type="button" class="choice-button" data-choice="${escapeHTML(id)}">${escapeHTML(label)}</button>
      `).join("")}
    </div>
    <p class="small-note">${escapeHTML(labels.choiceHint)}</p>`;
  app.querySelectorAll("[data-choice]").forEach(button => {
    button.addEventListener("click", () => handleChoice(button.dataset.choice));
  });
  focusTitle();
}

function handleChoice(choice) {
  const s = scenarios[state.scenarioIndex];
  state.selectedChoice = choice;
  state.attempts[state.scenarioIndex] += 1;
  if (choice === s.correct) {
    if (state.attempts[state.scenarioIndex] === 1) state.correctFirstTry += 1;
    state.screen = "correct";
    announce(content.activity.messages.correct);
  } else {
    state.screen = "coaching";
    announce(content.activity.messages.coaching);
  }
  render();
}

function renderCorrect() {
  const s = scenarios[state.scenarioIndex];
  const labels = content.activity.labels;
  const last = state.scenarioIndex === scenarios.length - 1;
  app.innerHTML = `
    ${progressMarkup(state.scenarioIndex)}
    <p class="scenario-kicker">${escapeHTML(labels.correctEyebrow)}</p>
    <h1 id="screen-title">${escapeHTML(s.title)}</h1>
    <div class="feedback correct" role="status">
      <div class="feedback-title"><span aria-hidden="true">✓</span> ${escapeHTML(labels.correctHeading)}</div>
      <p>${escapeHTML(s.correctFeedback)}</p>
      <p class="key-idea">${escapeHTML(labels.observationPractice)} ${escapeHTML(s.observation)}</p>
    </div>
    <div class="button-row">
      <button type="button" class="primary-button" id="continue-button">${escapeHTML(last ? labels.completeButton : labels.continueButton)}</button>
    </div>`;
  document.getElementById("continue-button").addEventListener("click", () => {
    if (last) state.screen = "complete";
    else {
      state.scenarioIndex += 1;
      state.screen = "scenario";
    }
    render();
    announce(last
      ? content.activity.messages.complete
      : `${labels.progressScenario} ${state.scenarioIndex + 1} ${labels.progressOf} ${scenarios.length}.`);
  });
  focusTitle();
}

function renderCoaching() {
  const s = scenarios[state.scenarioIndex];
  const labels = content.activity.labels;
  const feedback = s.coaching[state.selectedChoice] || "Review the duration, repetition, and strength of the evidence.";
  app.innerHTML = `
    ${progressMarkup(state.scenarioIndex)}
    <p class="scenario-kicker">${escapeHTML(labels.coachingEyebrow)}</p>
    <h1 id="screen-title">${escapeHTML(labels.coachingTitle)}</h1>
    <div class="feedback coaching">
      <div class="feedback-title"><span aria-hidden="true">↺</span> ${escapeHTML(labels.coachingHeading)}</div>
      <p>${escapeHTML(feedback)}</p>
    </div>
    <p><strong>${escapeHTML(labels.coachingPrompt)}</strong> ${escapeHTML(labels.coachingQuestion)}</p>
    <div class="button-row">
      <button type="button" class="primary-button" id="retry-button">${escapeHTML(labels.retryButton)}</button>
    </div>`;
  document.getElementById("retry-button").addEventListener("click", () => {
    state.screen = "scenario";
    render();
    announce(content.activity.messages.reopened);
  });
  focusTitle();
}

function renderComplete() {
  const completion = content.activity.completion;
  const scoreText = `${state.correctFirstTry} ${content.activity.labels.progressOf} ${scenarios.length}`;
  app.innerHTML = `
    <p class="scenario-kicker">${escapeHTML(completion.eyebrow)}</p>
    <h1 id="screen-title">${escapeHTML(completion.title)}</h1>
    <p class="lead">${escapeHTML(completion.description)}</p>
    <div class="summary-grid">
      ${completion.summaryCards.map(card => `
        <section class="summary-card">
          <h2>${escapeHTML(card.title)}</h2>
          <p>${escapeHTML(card.text)}</p>
        </section>`).join("")}
    </div>
    <p><strong>${escapeHTML(completion.scorePrefix)}</strong> ${scoreText} ${escapeHTML(completion.scoreSuffix)}</p>
    <label class="reflection-label" for="reflection">${escapeHTML(completion.reflectionLabel)}</label>
    <textarea id="reflection" placeholder="${escapeHTML(completion.reflectionPlaceholder)}"></textarea>
    <p class="small-note">${escapeHTML(completion.reflectionNote)}</p>
    <div class="button-row">
      <button type="button" class="secondary-button" id="print-button">${escapeHTML(completion.printButton)}</button>
      <button type="button" class="primary-button" id="restart-button">${escapeHTML(completion.restartButton)}</button>
    </div>`;
  document.getElementById("print-button").addEventListener("click", () => window.print());
  document.getElementById("restart-button").addEventListener("click", () => {
    resetState();
    render();
    announce(content.activity.messages.restarted);
  });
  focusTitle();
}

function renderLoadError(error) {
  const messages = content?.activity?.messages || {};
  app.innerHTML = `
    <h1 id="screen-title">${escapeHTML(messages.loadErrorTitle || "The activity content could not be loaded")}</h1>
    <p class="lead">${escapeHTML(messages.loadErrorText || "Open this activity through a web server rather than directly from a folder.")}</p>
    <details>
      <summary>Technical details</summary>
      <pre>${escapeHTML(error.message || error)}</pre>
    </details>`;
  focusTitle();
}

function render() {
  if (state.screen === "intro") renderIntro();
  else if (state.screen === "scenario") renderScenario();
  else if (state.screen === "correct") renderCorrect();
  else if (state.screen === "coaching") renderCoaching();
  else if (state.screen === "complete") renderComplete();
}

async function initialize() {
  try {
    const response = await fetch("content.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`content.json returned HTTP ${response.status}.`);
    content = await response.json();
    scenarios = content.scenarios;
    if (!Array.isArray(scenarios) || scenarios.length === 0) {
      throw new Error("content.json does not contain any scenarios.");
    }
    document.title = content.activity.browserTitle || content.activity.intro.title;
    resetState();
    render();
  } catch (error) {
    console.error(error);
    renderLoadError(error);
  }
}

initialize();
