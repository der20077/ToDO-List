const getData = async () => {
  try {
    const [postResult, userResult, comentResult] = await Promise.allSettled([
      getPosts(),
      getUser(),
      getComent(),
    ]);

    console.log(comentResult);

    const container = document.getElementById("posts");
    const posts = postResult.status === "fulfilled" ? postResult.value : [];
    const users = userResult.status === "fulfilled" ? userResult.value : [];
    const comentss =
      comentResult.status === "fulfilled" ? comentResult.value : [];

    container.innerHTML = "";

    if (posts.length === 0) {
      container.textContent = "Нет постов";
    }
    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");
      const titelElement = document.createElement("h2");
      titelElement.textContent = post.title;
      const bodyElement = document.createElement("p");
      bodyElement.textContent = post.body;
      postElement.append(titelElement);
      postElement.append(bodyElement);

      const user = users.find((user) => {
        return user.id === post.userId;
      });

      if (user) {
        const userElement = document.createElement("div");
        const nameElement = document.createElement("p");
        nameElement.textContent = `Author: ${user.name}`;
        const emailElement = document.createElement("p");
        emailElement.textContent = `Email: ${user.email}`;

        userElement.append(nameElement);
        userElement.append(emailElement);
        postElement.append(userElement);
      }

      const postComand = comentss.filter((coment) => coment.postId === post.id);

      if (postComand.length > 0) {
        const comentsContainer = document.createElement("div");
        comentsContainer.classList.add("coments");
        const comentTitle = document.createElement("p");
        comentTitle.textContent = "Coment:";
        comentsContainer.append(comentTitle);
        postComand.forEach((coment) => {
          const comentElement = document.createElement("div");
          comentElement.classList.add("coment");
          const comentName = document.createElement("p");
          comentName.textContent = `Name: ${coment.name} `;
          const comentEmail = document.createElement("p");
          comentEmail.textContent = `Email: ${coment.email} `;
          const comentBody = document.createElement("p");
          comentBody.textContent = coment.body;
          comentElement.append(comentName);
          comentElement.append(comentEmail);
          comentElement.append(comentBody);

          comentsContainer.append(comentElement);
        });
        postElement.append(comentsContainer);
      }

      container.append(postElement);
    });
  } catch (error) {
    console.error("Ошибка при получение данных", error);
  }
};

const fetchData = async (url, errorMessage) => {
  const loader = document.getElementById("loader");
  try {
    loader.style.display = "block";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    error.message === "Failed to fetch"
      ? console.error("Ошибка: нет подключения к интернету")
      : console.error(`${errorMessage}`, error.message);
    throw error;
  } finally {
    loader.style.display = "none";
  }
};

const getPosts = async () => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const errorMessage = "Ошибка при получении коментариев";
  const result = await fetchData(url, errorMessage);
  return result;
};

const getComent = async () => {
  const url = "https://jsonplaceholder.typicode.com/comments";
  const errorMessage = "Ошибка при получении постов";
  const result = await fetchData(url, errorMessage);
  return result;
};

const getUser = async () => {
  const url = "https://jsonplaceholder.typicode.com/users";
  const errorMessage = "Ошибка при получении пользователей";
  const result = await fetchData(url, errorMessage);
  return result;
};

const btn = document.getElementById("button");
btn.addEventListener("click", getData);
