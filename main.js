const cards = document.querySelector(".cards");
let jsonData = null;

async function fetchData() {
  if (!jsonData) {
    const response = await fetch("data.json");
    jsonData = await response.json();
  }
  return jsonData;
}

async function dataFetch(text, type) {
  const data = await fetchData();
  const fragment = document.createDocumentFragment();

  data.forEach((e) => {
    if (type === "region" || type === "") {
      if (text === e.region || text === "") {
        fragment.appendChild(createCardElement(e));
      }
    } else if (type === "country") {
      if (e.name.toLowerCase().includes(text.toLowerCase())) {
        fragment.appendChild(createCardElement(e));
      }
    }
  });

  cards.innerHTML = "";
  cards.appendChild(fragment);
}
dataFetch("", "");

function createCardElement(data) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <img src="${data.flags.png}" alt="00">
    <div class="content">
      <h2 id="country">${data.name}</h2>
      <p>Population: <span>${data.population}</span></p>
      <p>Region: <span>${data.region}</span></p>
      <p>Capital: <span>${data.capital}</span></p>
    </div>
  `;

  card.addEventListener("click", () => {
    showDetailedInfo(data);
  });

  return card;
}

const content = document.querySelector(".details");
function showDetailedInfo(data) {
  content.style.display = "block";
  let menu = document.querySelector(".menu");
  menu.style.display = "none";
  let cards = document.querySelector(".cards")
  cards.style.display = "none";
  const languages = data.languages.map((language) => language.name).join(", ");
  let items = "";
  if (data.borders) {
    for (let i = 0; i < data.borders.length; i++) {
      items += `<li>${data.borders[i]}</li>`
    }
  }
  content.innerHTML = `
    <button class="back">
      <i class="fa-solid fa-arrow-left-long"></i>
      Back
    </button>
    <div class="content">
      <img src="${data.flags.png}" alt="000">
      <div class="text">
        <h1>${data.name}</h1>
        <ul class="info">
          <li><span>Native Name :  </span>${data.nativeName}</li>
          <li><span>Population :  </span>${data.population}</li>
          <li><span>Region :  </span>${data.region}</li>
          <li><span>Sub Region :  </span>${data.subregion}</li>
          <li><span>Capital :  </span>${data.capital}</li>
          <li><span>Top Level Domain :  </span>${data.topLevelDomain}</li>
          <li><span>Currencies :  </span>${data.currencies[0].name}</li>
          <li><span>Languages : </span>${languages}</li>
        </ul>
        <div class="border-countries">
          <p>Border Countries: </p>
          <ul>
            ${items}
          </ul>
        </div>
      </div>
    </div>
  `;
  let backbtn = document.querySelector(".back");
  backbtn.addEventListener("click", () => {
    cards.style.display = "grid";
    content.style.display = "none";
    menu.style.display = "flex";
  })
}

const filterbtn = document.querySelector(".dropdown button");
const dropdownUl = document.querySelector(".dropdown ul");
let isDropdownVisible = false;

filterbtn.addEventListener("click", () => {
  dropdownUl.style.display = isDropdownVisible ? "none" : "block";
  isDropdownVisible = !isDropdownVisible;
});

const regions = document.querySelectorAll(".dropdown ul li");
regions.forEach((region) => {
  region.addEventListener("click", () => {
    cards.innerHTML = "";
    dataFetch(region.innerHTML, "region");
  });
});

const search = document.querySelector(".search input");

search.addEventListener("input", () => {
  const searchTerm = search.value;
  dataFetch(searchTerm, "country");
});

function changeMode(mode) {
  if (mode) {
    document.body.style.backgroundColor = "hsl(207, 26%, 17%)";
    document.body.style.color = "hsl(0, 0%, 100%)";
    document.querySelector("header").style.backgroundColor = "hsl(209, 23%, 22%)";
    document.querySelector(".menu input").style.backgroundColor = "hsl(209, 23%, 22%)";
    document.documentElement.style.setProperty("--White", "hsl(209, 23%, 22%)");
  } else {
    document.body.style.backgroundColor = "hsl(0, 0%, 95%)";
    document.body.style.color = "hsl(200, 15%, 8%)";
    document.querySelector("header").style.backgroundColor = "hsl(0, 0%, 100%)";
    document.querySelector(".menu input").style.backgroundColor = "hsl(0, 0%, 100%)";
    console.log(document.documentElement.style.setProperty("--White", "hsl(0, 0%, 100%)"));
  }
}
let modebtn = document.querySelector("#mode");
modebtn.addEventListener("click", () => {
  const modeHeader = document.querySelector("#mode h4");

  if (modeHeader.innerHTML === "Dark Mode") {
    modeHeader.innerHTML = "Light Mode";
    changeMode(true)
  } else {
    modeHeader.innerHTML = "Dark Mode";
    changeMode(false)
  }

})