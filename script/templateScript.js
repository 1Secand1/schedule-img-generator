function templateScript0(localX, localY, array) {
  let rowHeight = fontText - 10; // высота страки котороая преблезительно = размер текста - 10
  let indentInterval = 0;
  let rightIndent = +fontText + 5; // отступ справа равен относительно размера теста

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

function templateScript1(localX, localY, array) {
  let rowHeight = fontText - 10; // высота страки котороая преблезительно = размер текста - 10

  array.forEach((element) => {
    ctx.fillStyle = `${textСolor}`;
    ctx.font = `${fontText}px Montserrat`;
    ctx.fillText(`${element}`, localX, localY);
    localY += intermediateDistance + rowHeight;
  });
}
