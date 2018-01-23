// Prototype to hold slider image informations.
function f2wImage(image) {
  this.image = image;
  this.src = image.getAttribute('src');
  this.rects = image.getClientRects();
  this.bounds = image.getBoundingClientRect();
  this.width = typeof image.naturalWidth !== 'undefined' ? image.naturalWidth : image.clientWidth;
  this.height = typeof image.naturalHeight !== 'undefined' ? image.naturalHeight : image.clientHeight;
  this.aspect = this.width / this.height;
}

// Prototype to inizialize fit2window root object.
function Fit2Window(images) {
  this.images = Array.from(images).map(function (image) {
    return new f2wImage(image);
  });
}

// Utility function that returns style string removing properties listed in 'exclude' parameter.
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

  var w = window.innerWidth;
  var h = window.innerHeight;
  var pixelRatio = window.devicePixelRatio;
  var aspect = w / h;

  f2w.images.forEach(function (img) {
    var styleStr = getStyleAsStringExcluding(img.image, ['width', 'height', 'left']);

    if (aspect < img.aspect) {
      styleStr += 'height: ' + h + 'px; width: ' + h * img.aspect + 'px';

    } else {
      styleStr += 'width: ' + w + 'px; height: ' + w / img.aspect + 'px';
    }

    img.image.setAttribute('style', styleStr);

    if (!img.image.classList.contains('f2w-center')) {
      img.image.classList.add('f2w-center');
    }
  });

};

function errorLog(e) {
  console.log('%s: "%s"', e.name, e.message);
}

function fit2windowInit(event) {
  // console.log('this ', this);
  let elements;

  try {
    elements = document.querySelectorAll('.owl-item img');
  } catch (e) {
    errorLog(e);
  }

  if (typeof elements !== 'undefined') {
    window.f2w = new Fit2Window(elements);
    console.log('f2w: ', f2w);
  }

  if (typeof window.f2w !== 'undefined') {
    fit2window();
  }
}

window.addEventListener('load', fit2windowInit);
window.addEventListener('resize', fit2window);
