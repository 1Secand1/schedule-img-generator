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
  let rowHeight = fontText - 10; // высота страки котороая преблезительно = размер текста - 10

  let indentInterval = 0;
  let rightIndent = fontText ; // отступ справа равен относительно размера теста
  array.forEach((element) => {
    indentInterval++;
    if (indentInterval === 2) {
      localX += rightIndent;
    }

    ctx.fillStyle = `${textСolor}`;
    ctx.font = `${fontText}px Montserrat`;
    ctx.fillText(`${element}`, localX, localY);
    localY += intermediateDistance + rowHeight;

    if (indentInterval === 2) {
      localX -= rightIndent;
      localY += 20;
      indentInterval = 0;
    }
  });
}

/*
  array.forEach((element) => {
    ctx.fillStyle = `${textСolor}`;
    ctx.font = `${fontText}px Montserrat`;
    ctx.fillText(`${element}`, localX, localY);
    localY += intermediateDistance + rowHeight;
  });
*/
