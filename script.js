const zoneDragOver = document.querySelector(".upload-zone__dragover");
const formUpload = document.getElementById("upload-form__file");
const fileList = document.getElementById("file-list");
const fileInfo = document.getElementById("file-info");
const fileSend = document.getElementById("files-sent");
const btnSubmit = document.querySelector(".form-upload__submit");

["dragover", "drop"].forEach((event) => {
  document.addEventListener(event, (e) => {
    e.preventDefault();
  });
});

zoneDragOver.addEventListener("dragenter", () => {
  zoneDragOver.classList.add("active");
});

zoneDragOver.addEventListener("dragleave", () => {
  zoneDragOver.classList.remove("active");
});

zoneDragOver.addEventListener("drop", (e) => {
  e.preventDefault();
  zoneDragOver.classList.remove("active");
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    saveFiles(files);
    displayFilesInfo(files);
    fileSend.style.display = "none";
  }
});

const saveFiles = (files) => {
  const allFiles = Array.from(formUpload.files);
  allFiles.push(...files);

  const dataTransfer = new DataTransfer();

  allFiles.forEach((file) => {
    dataTransfer.items.add(file);
  });

  formUpload.files = dataTransfer.files;
};

formUpload.addEventListener("change", () => {
  const files = formUpload.files;
  if (files.length > 0) {
    displayFilesInfo(files);
    fileSend.style.display = "none";
  }
});

const displayFilesInfo = (files) => {
  fileInfo.innerHTML = ""; 
  fileInfo.style.display = "block";
  btnSubmit.style.display = "block";
  
  for (const file of files) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<span>Файл загружен: ${file.name}</span> <br> <span>Размер файла: ${file.size} bytes</span>`;
    fileInfo.append(listItem);
  }
};

btnSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  const files = formUpload.files;

 
  fileSend.textContent = files.length >= 2 ? "Файлы отправлены" : "Файл отправлен";
  fileSend.style.display = "block";
  btnSubmit.style.display = "none";
  fileInfo.style.display = "none";
  fileInfo.innerHTML = ""; 

  const filesInfo = Array.from(files).map((file) => ({
    name: file.name,
    size: file.size,
    type: file.type,
  }));

  console.log("Файл Отправлен", filesInfo);
  
  fileClear();
  
  setTimeout(() => {
    fileSend.style.display = "none";
  }, 2000);
});

const fileClear = () => {
  const tempInput = new DataTransfer();
  formUpload.files = tempInput.files;
  fileInfo.innerHTML = "";
  fileInfo.style.display = "none";
};