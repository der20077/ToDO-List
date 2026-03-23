const dragItems = document.querySelectorAll(".drag-item");
const blanks = document.querySelectorAll(".blank");
const sentences = document.querySelectorAll(".sentence");

const dragStart = (event) => {
  event.dataTransfer.setData("text/plain", event.target.id);
};

const dragOver = (event) => {
  event.preventDefault();
  const existsAnsver = event.target.querySelector(".drag-item");
  if (existsAnsver) {
    const optionsContainer = event.target
      .closest(".question")
      .querySelector(".options");
    optionsContainer.append(existsAnsver);
  }
};

const drop = (event) => {
  event.preventDefault();
  const id = event.dataTransfer.getData("text/plain");
  const dragItem = document.getElementById(id);
  const optionsContainer = event.target
    .closest(".question")
    .querySelector(".options");
  const possiblAnswers = Array.from(
    optionsContainer.querySelectorAll(".drag-item"),
  ).map((item) => item.textContent);

  if (!possiblAnswers.includes(dragItem.textContent)) {
    alert("Так не надо ");
    return;
  }

  event.target.append(dragItem);
};

const dragOverStyle = (event) => {
  event.target.classList.add("active");
};

const dragLeave = (event) => {
  event.target.classList.remove("active");
};

dragItems.forEach((item) => {
  item.addEventListener("dragstart", dragStart);
});

blanks.forEach((blank) => {
  blank.addEventListener("drop", drop);
  blank.addEventListener("dragover", dragOver);
});

sentences.forEach((sentence) => {
  sentence.addEventListener("dragover", dragOverStyle);
  sentence.addEventListener("dragleave", dragLeave);
});

document.getElementById("check-answers").addEventListener("click", () => {
  const correctAnsver = {
    "blank-1": "ёлка",
    "blank-2": "лук",
  };
  let score = 0;
  const scoreAnsvers = Object.keys(correctAnsver).length;
  blanks.forEach((blank) => {
    const userAnsver = blank.querySelector(".drag-item");
    const blankId = blank.id;
    if (userAnsver) {
      const isCorected = userAnsver.textContent === correctAnsver[blankId];
      if (isCorected) {
        userAnsver.style.backgroundColor = "";
        score++;
      } else {
        userAnsver.style.backgroundColor = "red";
      }
    } else {
      alert("Выбирите ответы");
    }
  });
  const pesonAnsver = (score / scoreAnsvers) * 100;
  const resultText =
    score == scoreAnsvers
      ? `Все ответы верны !`
      : `Количество правильных ответов ${score}
          Процент правильных ответов ${pesonAnsver} %`;
  document.getElementById("result").textContent = resultText;
});
