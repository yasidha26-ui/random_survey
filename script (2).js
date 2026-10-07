// ---------- Question bank ----------
// Add as many questions as you like; each round picks QUESTIONS_PER_ROUND of them.
const questionBank = [
  { id: 1,  question: "What is your favorite programming language?", options: ["JavaScript", "Python", "C++", "Java"] },
  { id: 2,  question: "How many hours do you code per day?",         options: ["1-2 hours", "3-5 hours", "6+ hours", "I just started"] },
  { id: 3,  question: "Which operating system do you prefer?",       options: ["Windows", "macOS", "Linux", "ChromeOS"] },
  { id: 4,  question: "Do you prefer remote work or office work?",   options: ["Remote", "Office", "Hybrid", "No preference"] },
  { id: 5,  question: "What is your primary development focus?",     options: ["Frontend", "Backend", "Full-stack", "Mobile/AI"] },
  { id: 6,  question: "How do you learn new tech skills?",           options: ["Bootcamps", "YouTube/Blogs", "University", "Documentation"] },
  { id: 7,  question: "Which tool do you use for version control?",  options: ["Git/GitHub", "GitLab", "Bitbucket", "None"] },
  { id: 8,  question: "Which code editor do you use most?",          options: ["VS Code", "IntelliJ/PyCharm", "Vim/Neovim", "Other"] },
  { id: 9,  question: "When do you code best?",                      options: ["Morning", "Afternoon", "Evening", "Late night"] },
  { id: 10, question: "How do you debug a problem first?",           options: ["Print/console logs", "Debugger", "Search the error", "Ask someone"] }
];

const QUESTIONS_PER_ROUND = 5;
let selectedQuestions = [];

// ---------- Fair shuffle (Fisher-Yates) ----------
// Returns a shuffled COPY; the original array is not changed.
function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// ---------- Start (or restart) a round ----------
function startSurvey() {
  selectedQuestions = shuffle(questionBank).slice(0, QUESTIONS_PER_ROUND);

  const container = document.getElementById("questions-container");
  container.innerHTML = "";

  selectedQuestions.forEach((q, index) => {
    const qDiv = document.createElement("div");
    qDiv.classList.add("question-block");

    // Note: plain ${...} with no backslash, so the values are actually inserted.
    qDiv.innerHTML = `
      <p><strong>Q${index + 1}: ${q.question}</strong></p>
      ${q.options.map(opt => `
        <label class="option">
          <input type="radio" name="q_${q.id}" value="${opt}" required> ${opt}
        </label>
      `).join("")}
    `;
    container.appendChild(qDiv);
  });

  // Show the form, hide everything else
  document.getElementById("start-btn").classList.add("hidden");
  document.getElementById("results-container").classList.add("hidden");
  document.getElementById("survey-form").classList.remove("hidden");
}

// ---------- Submit and show results ----------
document.getElementById("survey-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const resultsContainer = document.getElementById("results-container");

  let summaryHTML = "<h2>Survey Completed! Your Answers:</h2><ul>";

  selectedQuestions.forEach(q => {
    const userAnswer = formData.get(`q_${q.id}`) || "No answer";
    summaryHTML += `<li><strong>${q.question}</strong><br>Answer: <em>${userAnswer}</em></li>`;
  });

  summaryHTML += `</ul><button type="button" onclick="startSurvey()">Take Again (new questions)</button>`;
  resultsContainer.innerHTML = summaryHTML;

  document.getElementById("survey-form").classList.add("hidden");
  resultsContainer.classList.remove("hidden");
});
