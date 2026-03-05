document.addEventListener("DOMContentLoaded", loadToDo);

function loadToDo() {
  const input = document.getElementById("inputTask");
  const btnTask = document.getElementById("addTaskBtn");
  const listTask = document.getElementById("list");
  const temeSwitsh = document.getElementById("themeSwitch");

  const toggleTheme = () => {
    const currnetTeme = document.documentElement.getAttribute("data-theme");
    const newTheme = currnetTeme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
  };

  temeSwitsh.addEventListener("change", toggleTheme);

  const loadTask = () => {
    const task = JSON.parse(localStorage.getItem("tasks")) || [];
    return task;
  };

  const saveTask = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const tasks = loadTask();
  const addtask = () => {
    const taskHtml = tasks
      .map((task) => {
        return `<li>
        <input type="checkbox" ${task.compleadet ? "checked" : " "}>
        <span>${task.text}</span>
        <button class="btnDel">x</button>
      </li>`;
      })
      .join("");

    listTask.innerHTML = taskHtml;

    listTask.querySelectorAll(".btnDel").forEach((btn, index) => {
      btn.addEventListener("click", () => {
        tasks.splice(index, 1);
        saveTask(tasks);
        addtask();
      });
    });
    listTask
      .querySelectorAll('input[type="checkbox"]')
      .forEach((checbox, index) => {
        checbox.addEventListener("change", (event) => {
          event.preventDefault();
          tasks[index].compleadet = event.target.checked;
          saveTask(tasks);
          addtask();
        });
      });
  };

  input.addEventListener("input", () => {
    if (input.value.trim().length > 0) {
      btnTask.style.display = "block";
    } else {
      btnTask.style.display = "none";
    }
  });

  btnTask.addEventListener("click", (event) => {
    event.preventDefault();
    const textTask = input.value.trim();

    if (textTask) {
      const newTask = {
        id: Date.now(),
        text: textTask,
        compleadet: false,
      };
      tasks.push(newTask);
      saveTask(tasks);
      input.value = "";
    }
    addtask();
  });
  addtask();
}
