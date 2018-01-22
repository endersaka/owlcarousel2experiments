function Fit2Window(image) {
  this.image = image;
  this.src = image.getAttribute('src');
  this.bounds = image.getBoundingClientRect();
  this.width = image.clientWidth;
  this.height = image.clientHeight;
  this.aspect = this.width / this.height;
}

function getStyleAsStringExcluding(el, exclude = []) {
  var style = el.style;
  for (var i = 0; i < exclude.length; i++) {
    style.removeProperty(exclude[i]);
  }
  var styleArr = Array.from(style);
  var str = styleArr.map(function (pair) {
    return pair.join(': ');
  }).join('; ');
  //console.log('Style Attrubute Value: ' + str);
  return str;
}

function fit2window(event) {
  // if () {
  //   fit2windowInit();
  // }
  var img = document.getElementsByTagName('img')[0];
  var imgSrc = img.getAttribute('src');
  var imgBounds = img.getBoundingClientRect();

  /* Probably HTMLElement.clientWidth is not the best property for this achievment.
   * In fact, it seems to be dependant on the scrollbar size, something like:
   * clientWidth = window.innerWidth - [scrollbar width]
   * see https://stackoverflow.com/a/21064102
   *
   * There are two options remaining: scrollWidth and offsetWidth.
   * offsetWidth seems to be the size of the element, included border-width.
   * scrollWidth, instead, starts from the top-left corner of the padding box
   * and continue till the image box right limit.
   *
   * Of course I could use naturalWidth and implement a fallback of naturalWidth
   * for older browsers.
   */
  var w = img.naturalWidth;
  var h = img.naturalHeight;

  var imgAspectRatio = w / h;

  var winW = window.innerWidth;
  var winH = window.innerHeight;
  var winPixelRatio = window.devicePixelRatio;
  var winAspectRatio = winW / winH;

  var styleStr = getStyleAsStringExcluding(img, ['width', 'height', 'left']);

  if (winAspectRatio < imgAspectRatio) {
    styleStr += 'height: ' + winH + 'px';
  } else {
    styleStr += 'width: ' + winW + 'px';
  }

  img.setAttribute('style', styleStr);

  if (!img.classList.contains('hcenter')) {
    img.classList.add('hcenter');
  }
};

function fit2windowInit(event) {
  return new Fit2Window(document.getElementsByTagName('img')[0]);
}

// window.onload = fit2window;
// window.onresize = fit2window;

window.addEventListener('load', fit2window);
window.addEventListener('resize', fit2window);
