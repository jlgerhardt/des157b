( function (){
    'use strict';

    $(window).load(function() {
        $('.flexslider').flexslider({
          animation: "slide",
          slideshowSpeed: 10000,
          pauseOnHover: true
        });
      });
    
      new fullpage('#fullPage', {
        autoScrolling: true,
        navigation: true
      })

})();