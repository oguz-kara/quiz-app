const questions = [
  {
    id: 1,
    question: "Where is capital of Turkey ?",
    a: "Istanbul",
    b: "Izmir",
    c: "Adana",
    d: "Ankara",
    answer: "d",
  },
  {
    id: 2,
    question: "What is Ataturk's birthday ?",
    a: "1999",
    b: "1899",
    c: "1799",
    d: "1881",

    answer: "d",
  },
  {
    id: 3,
    question: "Who is founder of SpaceX ?",
    a: "Zeloin Musk",
    b: "Floin Misc",
    c: "Zlain Musc",
    d: "Elon Musk",
    answer: "d",
  },
  {
    id: 4,
    question: "Who is founder of SpaceX ?",
    a: "Zeloin Musk",
    b: "Floin Misc",
    c: "Zlain Musc",
    d: "Elon Musk",
    answer: "d",
  },
  {
    id: 5,
    question: "Who is founder of SpaceX ?",
    a: "Zeloin Musk",
    b: "Floin Misc",
    c: "Zlain Musc",
    d: "Elon Musk",
    answer: "d",
  },
  {
    id: 6,
    question: "Who is founder of SpaceX ?",
    a: "Zeloin Musk",
    b: "Floin Misc",
    c: "Zlain Musc",
    d: "Elon Musk",
    answer: "d",
  },
  {
    id: 7,
    question: "Who is founder of SpaceX ?",
    a: "Zeloin Musk",
    b: "Floin Misc",
    c: "Zlain Musc",
    d: "Elon Musk",
    answer: "d",
  },
  {
    id: 8,
    question: "Who is founder of SpaceX ?",
    a: "Zeloin Musk",
    b: "Floin Misc",
    c: "Zlain Musc",
    d: "Elon Musk",
    answer: "d",
  },
  {
    id: 9,
    question: "Who is founder of SpaceX ?",
    a: "Zeloin Musk",
    b: "Floin Misc",
    c: "Zlain Musc",
    d: "Elon Musk",
    answer: "d",
  },
  {
    id: 10,
    question: "Who is founder of SpaceX ?",
    a: "Zeloin Musk",
    b: "Floin Misc",
    c: "Zlain Musc",
    d: "Elon Musk",
    answer: "d",
  },
];
let questionIndex = 0;
let answers = [];

// select elements
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const arrowIcon = document.querySelector(".next-btn span");
const quizContainer = document.querySelector(".quiz-container");
const indicator = document.querySelector(".indicator");
const quiz = document.querySelector(".quiz");

let qst = questions;
let countdownNumber = 3;
let countdownInterval;
let infoText = "You have completed the exam, result will show in 3 seconds...";
let index = 0;
let interval;
let points = 0;

let pinfo, counter, examResultDiv, examResultP, examResult;

// App

window.addEventListener("DOMContentLoaded", () => {
  const markup = `
    <p class="pinfo">
    
    </p>
    <div class="counter">3</div>
    <div class="exam-result">
      <p>Exam result </p>
      <div>100</div>
    </div> 
  `;
  console.log(
    new DOMParser().parseFromString(markup, "text/html").body.childNodes
  );
  showQuestion(questions[0]);
  showIndicator();
  // handleCountdown();
});

nextBtn.addEventListener("click", (e) => {
  // console.log(answers);

  if (questionIndex < questions.length - 1) {
    questionIndex++;
    showIndicator();
    showQuestion(questions[questionIndex]);
    if (questionIndex === questions.length - 1) {
      changeStyleBtn();
    }
  } else {
    handleFinishExam();
  }
});

prevBtn.addEventListener("click", (e) => {
  if (questionIndex === questions.length - 1) {
    changeStyleBtnReverse();
  }
  if (questionIndex <= questions.length - 1 && questionIndex > 0) {
    questionIndex--;
    showIndicator();
    showQuestion(questions[questionIndex]);
    if (questionIndex === questions.length - 1) {
      changeStyleBtn();
    }
  }
});

function listen4Answer(e) {
  e.preventDefault();
  answers[questionIndex] = e.target.value;
}

function isAnswerChecked() {
  let isChecked = false;
  document.querySelectorAll(".result").forEach((el) => {
    if (el.checked) {
      isChecked = true;
    }
  });
  return isChecked;
}

function showQuestion(qst) {
  const html = `
      <div class="quiz-header">
        <p>
         ${qst.question}
        </p>
      </div>
      <div class="quiz-answers">
        <ol>
          <li>
            <label for="a">${qst.a}</label>
            <input onchange="listen4Answer(event)" ${
              answers[questionIndex] === "a" ? "checked" : ""
            } class="result" type="radio" id="a" name="answer" value="a" />
          </li>
          <li>
            <label for="b">${qst.b}</label>
            <input onchange="listen4Answer(event)" ${
              answers[questionIndex] === "b" ? "checked" : ""
            }  class="result" type="radio" id="b" name="answer" value="b" />
          </li>
          <li>
            <label for="c">${qst.c}</label>
            <input onchange="listen4Answer(event)" ${
              answers[questionIndex] === "c" ? "checked" : ""
            } class="result" type="radio" id="c" name="answer" value="c" />
          </li>
          <li>
            <label for="d">${qst.d}</label>
            <input onchange="listen4Answer(event)" ${
              answers[questionIndex] === "d" ? "checked" : ""
            } class="result" type="radio" id="d" name="answer" value="d" />
          </li>
        </ol>
      </div></div>
    `;
  quiz.innerHTML = html;
}

function changeStyleBtn() {
  nextBtn.classList.add("finish-btn");
  nextBtn.innerHTML = `finish it! <span><i class="fas fa-arrow-circle-right"></i></span>`;
}

function changeStyleBtnReverse() {
  nextBtn.classList.remove("finish-btn");
  nextBtn.innerHTML = "Next";
}

function showIndicator() {
  indicator.innerHTML = `${questionIndex + 1} / ${questions.length}`;
}

function handleCountdown() {
  countdownInterval = setInterval(function () {
    counter.innerHTML = countdownNumber;
    countdownNumber--;
    if (countdownNumber < 0) {
      examResultDiv.classList.add("block");
      calculateQuizResults();
      examResult.innerText = points;
      examResultDiv.classList.add(colorDecision());
      counter.classList.add("none");
      clearInterval(countdownInterval);
    }
    console.log(counter.innerHTML);
  }, 1000);
}

function handleFinishExam() {
  quizContainer.innerHTML = "";
  pinfo = document.createElement("p");
  counter = document.createElement("div");
  examResultDiv = document.createElement("div");
  examResultP = document.createElement("p");
  examResult = document.createElement("div");

  pinfo.classList.add("pinfo");
  counter.classList.add("counter");
  examResultDiv.classList.add("exam-result");

  counter.innerText = "3";
  examResult.innerText = "100";

  examResultDiv.appendChild(examResultP);
  examResultDiv.appendChild(examResult);

  quizContainer.appendChild(pinfo);
  quizContainer.appendChild(counter);
  quizContainer.appendChild(examResultDiv);

  interval = setInterval(finalScreen, 25);
}

function finalScreen() {
  if (infoText.length < index) {
    counter.classList.add("block");
    handleCountdown();
    clearInterval(interval);
  }
  const partText = infoText.slice(0, index);
  pinfo.innerText = partText;
  index++;
}

function calculateQuizResults() {
  answers.forEach((item, i) => {
    if (item !== undefined) {
      item === questions[i].answer ? (points += 10) : points;
    }
  });
}
function colorDecision() {
  if (points < 40) {
    return "red";
  } else if (points >= 40 && points < 70) {
    return "yellow";
  } else if (points >= 70 && points <= 100) {
    return "green";
  } else {
    return "purple";
  }
}
