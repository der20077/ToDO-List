const blanks = document.querySelectorAll(".blank");
const parts = document.querySelector(".parts");
const dragItem = document.querySelectorAll(".drag-item");
const checkBtn = document.getElementById("check-puzzles");
const result = document.getElementById("result");

const drop = (e) => {
  e.preventDefault();
  const id = e.dataTransfer.getData("text/plain");
  const dragetItem = document.getElementById(id);
  if (dragetItem === null) {
    return;
  }
  console.log(dragetItem);

  const targetBlank = e.target.closest(".blank");
  if (!e.target) {
    return;
  }

  const existingPuzzle = targetBlank.querySelector(".drag-item");
  if (existingPuzzle) {
    parts.append(existingPuzzle);
  }

  targetBlank.append(dragetItem);
};

const dragStart = (event) => {
  event.dataTransfer.setData("text/plain", event.target.id);
  console.log(event.target.id);
};

blanks.forEach((blank) => {
  blank.draggable = true;
  blank.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  blank.addEventListener("drop", drop);
});

const shuffeldItem = Array.from(dragItem).sort(function () {
  return Math.random() - 0.5;
});

shuffeldItem.forEach((item) => parts.append(item));

dragItem.forEach((item) => {
  item.addEventListener("dragstart", dragStart);
});

checkBtn.addEventListener("click", () => {
  let iscorect = true;
  blanks.forEach((blank, index) => {
    const puzzle = blank.firstChild;
    if (!puzzle || puzzle.id !== `item-${index + 1}`) {
      iscorect = false;
    }
  });
  if (iscorect) {
    window.location.href = "site.html";
  } else {
    result.textContent = "Пазл собран не правильно";
  } 
});
