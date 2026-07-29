"use strict";

const scenarios = [
  {
    title: "A Hot Weekend",
    context: "A Master Gardener volunteer is helping at a demonstration garden. Temperatures reach 102°F for two days. The tomato plants wilt, but recover after cooler weather returns.",
    evidence: ["The heat lasted two days.", "The plants recovered when conditions changed."],
    question: "What conclusion is best supported by this evidence?",
    correct: "weather",
    choices: [
      ["weather", "This is primarily a short-term weather event."],
      ["climate", "This is evidence of a long-term climate pattern."],
      ["more", "There is not enough information to identify even a weather event."]
    ],
    correctFeedback: "This observation describes weather: conditions over a short period. The event may fit within a broader climate trend, but this single weekend cannot establish that trend.",
    coaching: {
      climate: "A hot weekend can occur in many climates. To identify a climate pattern, compare repeated observations or records across many years.",
      more: "There is enough information to identify a short-term heat event. The uncertainty is whether it reflects a long-term climate trend."
    },
    observation: "Record the date, duration, temperature, plant response, and recovery."
  },
  {
    title: "Earlier Bloom Over Time",
    context: "For 12 years, Lee has recorded the first bloom date of the same lilac. The record shows that flowering has gradually shifted about 11 days earlier.",
    evidence: ["The same plant was observed.", "The record spans 12 years.", "The direction of change is gradual and repeated."],
    question: "What conclusion is best supported?",
    correct: "climate",
    choices: [
      ["weather", "This is only this year's weather."],
      ["climate", "This is evidence consistent with a long-term climate-related shift."],
      ["more", "There is no useful evidence yet."]
    ],
    correctFeedback: "The multi-year record reveals a repeated long-term pattern. Bloom timing can vary with annual weather, but a sustained directional shift is consistent with climate-related change.",
    coaching: {
      weather: "A single bloom date reflects seasonal weather. Here, however, the evidence is a 12-year pattern rather than one season.",
      more: "More data can always strengthen a conclusion, but this consistent 12-year record is meaningful evidence of a long-term shift."
    },
    observation: "Phenology records—such as first leaf, first bloom, or insect emergence—become more useful when methods stay consistent."
  },
  {
    title: "Early Bloom, Late Freeze",
    context: "After an unusually warm February, fruit trees bloom. A hard freeze two weeks later damages many blossoms. No prior records are available.",
    evidence: ["The warm period and freeze occurred in one season.", "There are no observations from earlier years."],
    question: "What can a careful observer conclude?",
    correct: "more",
    choices: [
      ["weather", "This is weather, and no further observation is useful."],
      ["climate", "This single event proves the climate has changed."],
      ["more", "The events are weather; more years of evidence are needed to assess a climate pattern."]
    ],
    correctFeedback: "The warm spell and freeze are weather events. Without a longer record, we cannot determine whether their timing or frequency reflects a climate trend.",
    coaching: {
      weather: "You correctly noticed weather, but the answer is incomplete. The scenario asks what can be concluded about the broader pattern, and that requires more evidence.",
      climate: "One unusual season does not prove a long-term climate shift. Record it, then compare it with future and historical observations."
    },
    observation: "Uncertainty is not failure. 'I need more evidence' is often the most scientifically responsible conclusion."
  },
  {
    title: "Maria's Garden in Transition",
    context: "Maria has gardened in the same location for 20 years. During the last several years, lettuce bolts earlier, hydrangeas scorch more often, and irrigation is needed sooner in summer.",
    evidence: ["Several plant responses point toward heat and water stress.", "The changes have repeated across multiple years.", "The garden location and gardener are consistent."],
    question: "Which interpretation is best supported?",
    correct: "climate",
    choices: [
      ["weather", "Each symptom should be treated as an unrelated weather event."],
      ["climate", "The repeated pattern is consistent with a changing climate, while local factors should still be checked."],
      ["more", "Observation has no role until a laboratory test is completed."]
    ],
    correctFeedback: "Maria's repeated observations form a useful pattern. They do not rule out irrigation problems, plant age, soil changes, or other local factors, but they support investigating climate-related heat and moisture stress.",
    coaching: {
      weather: "Individual events matter, but the repeated combination of earlier bolting, scorching, and increased watering over several years points beyond one day's weather.",
      more: "Additional evidence is useful, but gardeners can begin adaptation by observing, documenting, and testing reasonable responses."
    },
    observation: "Good diagnosis considers both broad trends and site-specific causes."
  },
  {
    title: "From Observation to Adaptation",
    context: "A volunteer notices that a community garden bed dries sooner than expected and seedlings experience afternoon heat stress.",
    evidence: ["The observation is specific.", "The cause has not yet been confirmed.", "A low-risk response can be tested."],
    question: "What is the strongest next step?",
    correct: "observe",
    choices: [
      ["replace", "Immediately replace every plant with a drought-tolerant species."],
      ["ignore", "Ignore the observation until climate projections prove the cause."],
      ["observe", "Record conditions and test a small adaptation, such as mulch, adjusted irrigation timing, or temporary shade."]
    ],
    correctFeedback: "Observation can lead directly to a small, testable adaptation. Recording the results helps the volunteer learn whether the response improves plant performance.",
    coaching: {
      replace: "Large, irreversible changes are not always the best first response. Begin with a proportionate, testable action.",
      ignore: "Gardeners do not need perfect certainty before trying a low-risk adaptation. Observation and experimentation can occur together."
    },
    observation: "Observe. Record. Test. Reflect. These are practical first steps in climate adaptation."
  }
];

const app = document.getElementById("app");
const liveRegion = document.getElementById("live-region");

let state = {
  screen: "intro",
  scenarioIndex: 0,
  selectedChoice: null,
  attempts: Array(scenarios.length).fill(0),
  correctFirstTry: 0
};

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

function progressMarkup(index) {
  const current = index + 1;
  const percent = Math.round((current / scenarios.length) * 100);
  return `
    <div class="progress-wrap" aria-label="Activity progress">
      <div class="progress-label">
        <span>Scenario ${current} of ${scenarios.length}</span>
        <span>${percent}%</span>
      </div>
      <div class="progress-track" role="progressbar" aria-valuemin="1" aria-valuemax="${scenarios.length}" aria-valuenow="${current}" aria-label="Scenario progress">
        <div class="progress-bar" style="width:${percent}%"></div>
      </div>
    </div>`;
}

function renderIntro() {
  state.screen = "intro";
  app.innerHTML = `
    <p class="scenario-kicker">Accessible branching scenario</p>
    <h1 id="screen-title">Garden Detective: Weather or Climate?</h1>
    <p class="lead">Use garden evidence to distinguish a short-term weather event from a long-term climate pattern—and decide when more observation is needed.</p>
    <div class="objective">
      <strong>Learning objective:</strong> Recognize that climate adaptation can begin with simple, careful observation.
    </div>
    <h2>How it works</h2>
    <p>You will examine five garden scenarios. Each choice leads to a different feedback path. Some choices invite you to reconsider the evidence before moving forward.</p>
    <p>This activity is ungraded. Mistakes are part of the learning process.</p>
    <div class="button-row">
      <button class="primary-button" id="start-button" type="button">Begin the investigation</button>
    </div>`;
  document.getElementById("start-button").addEventListener("click", () => {
    state.scenarioIndex = 0;
    state.screen = "scenario";
    render();
    announce("Scenario 1 of 5.");
  });
  focusTitle();
}

function renderScenario() {
  const s = scenarios[state.scenarioIndex];
  app.innerHTML = `
    ${progressMarkup(state.scenarioIndex)}
    <p class="scenario-kicker">Examine the evidence</p>
    <h1 id="screen-title">${escapeHTML(s.title)}</h1>
    <p class="lead">${escapeHTML(s.context)}</p>
    <section class="evidence-box" aria-labelledby="evidence-heading">
      <h2 id="evidence-heading">Evidence available</h2>
      <ul>${s.evidence.map(item => `<li>${escapeHTML(item)}</li>`).join("")}</ul>
    </section>
    <p class="question">${escapeHTML(s.question)}</p>
    <div class="choice-list" role="group" aria-label="Choose the best conclusion">
      ${s.choices.map(([id, label]) => `
        <button type="button" class="choice-button" data-choice="${escapeHTML(id)}">${escapeHTML(label)}</button>
      `).join("")}
    </div>
    <p class="small-note">Choose the response best supported by the evidence—not necessarily the response that feels most certain.</p>`;
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
    if (state.attempts[state.scenarioIndex] === 1) {
      state.correctFirstTry += 1;
    }
    state.screen = "correct";
    announce("That conclusion is well supported. Review the explanation.");
  } else {
    state.screen = "coaching";
    announce("Review the coaching feedback, then reconsider the evidence.");
  }
  render();
}

function renderCorrect() {
  const s = scenarios[state.scenarioIndex];
  const last = state.scenarioIndex === scenarios.length - 1;
  app.innerHTML = `
    ${progressMarkup(state.scenarioIndex)}
    <p class="scenario-kicker">Evidence-based conclusion</p>
    <h1 id="screen-title">${escapeHTML(s.title)}</h1>
    <div class="feedback correct" role="status">
      <div class="feedback-title"><span aria-hidden="true">✓</span> Well supported</div>
      <p>${escapeHTML(s.correctFeedback)}</p>
      <p class="key-idea">Observation practice: ${escapeHTML(s.observation)}</p>
    </div>
    <div class="button-row">
      <button type="button" class="primary-button" id="continue-button">${last ? "Complete the activity" : "Continue to the next scenario"}</button>
    </div>`;
  document.getElementById("continue-button").addEventListener("click", () => {
    if (last) {
      state.screen = "complete";
    } else {
      state.scenarioIndex += 1;
      state.screen = "scenario";
    }
    render();
    announce(last ? "Activity complete." : `Scenario ${state.scenarioIndex + 1} of ${scenarios.length}.`);
  });
  focusTitle();
}

function renderCoaching() {
  const s = scenarios[state.scenarioIndex];
  const feedback = s.coaching[state.selectedChoice] || "Review the duration, repetition, and strength of the evidence.";
  app.innerHTML = `
    ${progressMarkup(state.scenarioIndex)}
    <p class="scenario-kicker">Follow this branch</p>
    <h1 id="screen-title">Reconsider the evidence</h1>
    <div class="feedback coaching">
      <div class="feedback-title"><span aria-hidden="true">↺</span> Coaching feedback</div>
      <p>${escapeHTML(feedback)}</p>
    </div>
    <p><strong>Ask yourself:</strong> Does the evidence describe a short event, a repeated long-term pattern, or a situation where the broader pattern remains uncertain?</p>
    <div class="button-row">
      <button type="button" class="primary-button" id="retry-button">Return to the scenario</button>
    </div>`;
  document.getElementById("retry-button").addEventListener("click", () => {
    state.screen = "scenario";
    render();
    announce("Scenario reopened. Choose again.");
  });
  focusTitle();
}

function renderComplete() {
  const scoreText = `${state.correctFirstTry} of ${scenarios.length}`;
  app.innerHTML = `
    <p class="scenario-kicker">Investigation complete</p>
    <h1 id="screen-title">Observation is the beginning of adaptation</h1>
    <p class="lead">You practiced separating short-term events from long-term patterns while recognizing when the available evidence remains incomplete.</p>
    <div class="summary-grid">
      <section class="summary-card">
        <h2>Weather</h2>
        <p>Conditions or events over days, weeks, or a season.</p>
      </section>
      <section class="summary-card">
        <h2>Climate</h2>
        <p>Patterns and trends that emerge across many years.</p>
      </section>
      <section class="summary-card">
        <h2>Adaptation</h2>
        <p>Can begin with recording observations and testing low-risk responses.</p>
      </section>
    </div>
    <p><strong>First-choice indicator:</strong> ${scoreText} conclusions were supported on the first attempt. This activity is ungraded.</p>
    <label class="reflection-label" for="reflection">What is one garden observation you could begin recording?</label>
    <textarea id="reflection" placeholder="For example: first bloom date, soil moisture, irrigation frequency, heat damage, or pollinator timing."></textarea>
    <p class="small-note">This reflection stays in your browser and is not submitted to Canvas.</p>
    <div class="button-row">
      <button type="button" class="secondary-button" id="print-button">Print or save this screen</button>
      <button type="button" class="primary-button" id="restart-button">Restart activity</button>
    </div>`;
  document.getElementById("print-button").addEventListener("click", () => window.print());
  document.getElementById("restart-button").addEventListener("click", () => {
    state = {
      screen: "intro",
      scenarioIndex: 0,
      selectedChoice: null,
      attempts: Array(scenarios.length).fill(0),
      correctFirstTry: 0
    };
    render();
    announce("Activity restarted.");
  });
  focusTitle();
}

function render() {
  if (state.screen === "intro") renderIntro();
  else if (state.screen === "scenario") renderScenario();
  else if (state.screen === "correct") renderCorrect();
  else if (state.screen === "coaching") renderCoaching();
  else if (state.screen === "complete") renderComplete();
}

render();
