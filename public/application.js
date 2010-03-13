$(document).ready(function() {

  $('#copiable').click(function() {
    $(this).focus().select();
  });
  
  $("#slider").slider({
    animate: true,
    max: 90,
    change: function(event, ui) {
      var value = ui.value;

      $('#box').css('-webkit-border-radius', value)
               .css('-moz-border-radius', value + 'px')
               .css('border-radius', value + 'px');
      $('#slider_value').text(value + "px");

      $('#copiable').text(function() {
        var webkit = "-webkit-border-radius: " + value + "px;";
        var mozilla = "-moz-border-radius: " + value + "px;";
        var css3 = "border-radius: " + value + "px;";
        return webkit + "\n" + mozilla + "\n" + css3;
      });
      
    }

  });
});

