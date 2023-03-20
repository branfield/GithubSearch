let validation = new JustValidate('#form',{
  errorLabelStyle: {
      color: '#f2f2f2',
      fontFamily: '"Gill Sans", sans-serif',
      fontSize: '13px',
      marginTop: '15px',
      fontWeight: '500'
  }
});

validation.addField("#text", [
  {
      rule: 'required',
      errorMessage : 'Задан пустой поисковой запрос'
  },
  {
      rule: 'minLength',
      value: 3,
      errorMessage : 'Запрос должен быть не короче трёх символов'
  }
])

const searchForm = document.querySelector(".search-form");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  findItemsClear();

  const searchValue = document.querySelector(".search-input");

  let url = `https://api.github.com/search/repositories?q=${searchValue.value}&sort=stars&order=desc&page=1&per_page=10`;
  fetch(url)
    .then((res) => res.json())
    .then((res) => setRepo(res.items));
});

function setRepo(items) {
  const findItems = document.querySelector(".answers");

  if (items.length) {
    items.map((item) => {
      findItems.append(createRepoItem(item));
    });
  } else {
    findItems.append("По вашему запросу ничего не найдено");
  }
}

function createRepoItem(item) {
  const itemDiv = document.createElement("div");
  itemDiv.classList.add("answer");

  const itemDivFullName = document.createElement("div");
  itemDivFullName.classList.add("nickname");

  const itemDivFullNameUrl = document.createElement("a");
  itemDivFullNameUrl.href = item.html_url;
  itemDivFullNameUrl.target = "_blanck";
  itemDivFullNameUrl.innerText = item.full_name;

  itemDivFullName.append(itemDivFullNameUrl);

  itemDiv.append(itemDivFullName);

  if (item.description) {
    const itemDivDescription = document.createElement("div");
    itemDivDescription.classList.add("description");
    itemDivDescription.innerText = item.description;

    itemDiv.append(itemDivDescription);
  }

  return itemDiv;
}

function findItemsClear() {
  const findItems = document.querySelector(".answers");
  findItems.innerHTML = "";
}