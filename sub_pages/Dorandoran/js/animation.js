
// element fade-in animation
  var imganimation = function () {
    var items, winH;
   
    var initModule = function () {
      items = document.querySelectorAll(".hidden");
      winH = window.innerHeight;
      _addEventHandlers();
    }
   
    var _addEventHandlers = function () {
      window.addEventListener("scroll", _checkPosition);
      window.addEventListener("load", _checkPosition);
      window.addEventListener("resize", initModule);
    };
   
    var _checkPosition = function () {
      for (var i = 0; i < items.length; i++) {
        var posFromTop = items[i].getBoundingClientRect().top;
        if (winH > posFromTop) {
          items[i].classList.add("fade-in");
        }
      }
    }
   
    return {
      init: initModule
    }
  }
   
  imganimation().init();
