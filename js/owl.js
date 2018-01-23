$(document).ready(function () {
  // Define options for OwlCarousel.
  var options = {
    items: 1
  };

  // Get the reference to the HTMLElement with class attribute value equal
  // to 'owl-carousel'.
  var owl = $('.owl-carousel');

  // Call owlCarousel() method on the obtained reference.
  owl.owlCarousel(options);

  // Some log.
  console.log("owl ", owl);
});
