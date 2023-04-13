const canvas = document.querySelector("canvas"),
  ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 700;

async function fetchData() {
  try {
    const response = await fetch("/Presets/Config.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function generatingList() {
  let templateList = await fetchData();
  let templatesContainer = document.querySelector(
    ".templates-options-container"
  );

  for (let index = 0; index < 2; index++) {
    console.log();

    templatesContainer.innerHTML += `
    <label for="${index}" class="templates-option">
      <input class="radio-btn" type="radio" id="${index}" name="template-select">
      <img src="${templateList[index].preview}" alt="template${index + 1}">
    </label>
    `;
  }
  templateSelection();
}
generatingList();

function templateRendering(array) {
  let localX = x;
  let localY = y;

  switch (displayTemplate.id) {
    case 0:
      templateScript0(localX, localY, array);
      break;

    case 1:
      templateScript1(localX, localY, array);
      break;

    case 2:
      templateScript2(localX, localY, array);
      break;

    case 3:
      templateScript3(localX, localY, array);
      break;

    case 4:
      templateScript4(localX, localY, array);
      break;

    default:
      break;
  }
}
