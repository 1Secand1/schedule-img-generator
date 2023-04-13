let img = 1,
  fontText = 50, // размер текста
  textСolor = "#000000",
  x = 10, // X
  y = 50, // Y верхний левого угла вормеруемого списка
  intermediateDistance = 10; // растояние между строками

let displayTemplate = {
  id: 0,
  content: [],
};

async function templateSelection() {
  let templateList = await fetchData();
  const listAllTemplates = document.querySelectorAll(".radio-btn");

  listAllTemplates.forEach((element) => {
    element.onclick = (event) => {
      let index = event.target.id;
      displayTemplate.content = templateList[index].content;
      displayTemplate.id = templateList[index].id;
      reset();
    };
  });
}

const imageInput = document.querySelector(".settings__image-input");
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
  return img;
});

const btnAddTemplate = document.querySelector(".settings__add-template");
btnAddTemplate.addEventListener("click", () => {
  if (img != undefined) {
    templateRendering(displayTemplate.content);
  } else {
    alert("Сначало загрузите изображение");
  }
});

function ColorСhange() {
  const inputColor = document.querySelector(".settings__input-color");
  let colorValue = inputColor.value;

  inputColor.addEventListener("input", (event) => {
    const colorValue = event.target.value;
    textСolor = colorValue;
    reset();
  });
}
ColorСhange();

function сhangeSize() {
  let inputTextSize = document.querySelector(".resizing");

  inputTextSize.addEventListener("input", (event) => {
    if (img != undefined) {
      const textSizeValue = event.target.value;
      fontText = textSizeValue;
      reset();
    }
  });
}
сhangeSize();

function moving() {
  const moveUp = document.querySelector(".up"),
    moveDown = document.querySelector(".down"),
    moveRight = document.querySelector(".right"),
    moveLeft = document.querySelector(".left");

  let intervalId;

  moveUp.addEventListener("mousedown", () => {
    intervalId = setInterval(() => {
      if (y >= 50) {
        y = y - 10;
        reset();
      }
    }, 100);
  });
  moveRight.addEventListener("mousedown", () => {
    intervalId = setInterval(() => {
      x += 10;
      reset();
    }, 100);
  });
  moveDown.addEventListener("mousedown", () => {
    intervalId = setInterval(() => {
      y += 10;
      reset();
    }, 100);
  });
  moveLeft.addEventListener("mousedown", () => {
    intervalId = setInterval(() => {
      if (x >= 10) {
        x = x - 10;
        reset();
      }
    }, 100);
  });

  moveUp.addEventListener("mouseup", () => {
    clearInterval(intervalId);
  });
  moveRight.addEventListener("mouseup", () => {
    clearInterval(intervalId);
  });
  moveDown.addEventListener("mouseup", () => {
    clearInterval(intervalId);
  });
  moveLeft.addEventListener("mouseup", () => {
    clearInterval(intervalId);
  });
}
moving();

const downloadImg = document.querySelector(".download");
downloadImg.addEventListener("click", () => {
  if (img != undefined) {
    let image = canvas.toDataURL("image/png");

    let link = document.createElement("a");
    link.download = "image.png";
    link.href = image;

    downloadImg.parentNode.insertBefore(link, downloadImg.nextSibling);
    link.click();
  } else {
    alert("Сначало загрузите изображение");
  }
});

async function reset() {
  if (img != undefined) {
    let templateList = await fetchData();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    templateRendering(displayTemplate.content);
  } else {
    alert("Сначало загрузите изображение");
  }
}
