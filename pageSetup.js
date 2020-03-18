function removeElement(elementId) {
  var element = document.getElementById(elementId);
  element.parentNode.removeChild(element);
}

function setupBackground() {
  strokeWeight(SCALE);
  
  background(255);
  for (w = 0; w < width / 4 * SCALE; w++) {
    for (h = 0; h < height / 4 * SCALE; h++) {
      stroke(200);
      point(w * 4 * SCALE, h * 4 * SCALE);

      stroke(230);
      if (w % 2 == h % 2) {
        line(w * 4 * SCALE + 1 * SCALE, h * 4 * SCALE + 1 * SCALE,
          w * 4 * SCALE + 1 * SCALE, h * 4 * SCALE + 3 * SCALE);
        line(w * 4 * SCALE + 3 * SCALE, h * 4 * SCALE + 1 * SCALE,
          w * 4 * SCALE + 3 * SCALE, h * 4 * SCALE + 3 * SCALE);
      } else {
        line(w * 4 * SCALE + 1 * SCALE, h * 4 * SCALE + 1 * SCALE,
          w * 4 * SCALE + 3 * SCALE, h * 4 * SCALE + 1 * SCALE);
        line(w * 4 * SCALE + 1 * SCALE, h * 4 * SCALE + 3 * SCALE,
          w * 4 * SCALE + 3 * SCALE, h * 4 * SCALE + 3 * SCALE);
      }
    }
  }
}