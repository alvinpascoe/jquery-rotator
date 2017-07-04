$(function() {

    // Let's make the main title rotate with default settings
    $('.header-container .title').rotator();

    // Let's rotate the h2 passing in custom settings
    $('.header-container h2').rotator({
      speed:500,
      degree:5,
      incrementor:10,
      reverse:true,
    });

    // Let's make the article and all immediate children randomly rotate.
    $('article').rotator({
      random: true
    });

    // Finally, let's attach the reset and restart events
    $('.reset').on('click',function(){
      $('.header-container .title').rotator('reset');
      $('.header-container h2').rotator('reset');
      $('article').rotator('reset');
    });

    $('.restart').on('click',function(){
      $('.header-container .title').rotator();
      $('.header-container h2').rotator({
        speed:500,
        degree:5,
        incrementor:10,
        reverse:true,
      });
      $('article').rotator({
        random: true
      });
    });

});