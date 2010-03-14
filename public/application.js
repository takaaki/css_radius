// http://www.martienus.com/code/javascript-remove-duplicates-from-array.html
Array.prototype.unique = function () {
	var r = new Array();
	o:for(var i = 0, n = this.length; i < n; i++)
	{
		for(var x = 0, y = r.length; x < y; x++)
		{
			if(r[x]==this[i])
			{
				continue o;
			}
		}
		r[r.length] = this[i];
	}
	return r;
};

$(document).ready(function() {
  var topleft_value, topright_value, bottomleft_value, bottomright_value;
  var all_radius_values = [];
  var unique_radius_values = [];
  var short_code = "";
  var topleft_code = "", topright_code = "", bottomleft_code = "", bottomright_code = "";
  var props = {
    "webkit": {
      "short" : "-webkit-border-radius", // "short" is a reserved word
      "topleft" : "-webkit-border-top-left-radius",
      "topright" : "-webkit-border-top-right-radius",
      "bottomleft" : "-webkit-border-bottom-left-radius",
      "bottomright" : "-webkit-border-bottom-right-radius"
    },
    "moz" : {
      "short" : "-moz-border-radius",
      "topleft": "-moz-border-radius-topleft",
      "topright": "-moz-border-radius-topright",
      "bottomleft": "-moz-border-radius-bottomright",
      "bottomright": "-moz-border-radius-bottomleft"
    },
    "css3" : {
      "short" : "border-radius",
      "topleft" : "border-top-left-radius",
      "topright" : "border-top-right-radius",
      "bottomleft" : "border-bottom-left-radius",
      "bottomright" : "border-bottom-right-radius"
    }
  };
  
  $('#copiable').click(function() {
    $(this).focus().select();
  });
  
  var get_code = function() {
    short_code = "";
    topleft_code = "";
    topright_code = "";
    bottomleft_code = "";
    bottomright_code = "";
    
    if (unique_radius_values.length === 1) { // e.g., [2, 2, 2, 2]
      for (vendor in props) {
        if (unique_radius_values[0] !== 0) {
          short_code += props[vendor]["short"] + ": " + unique_radius_values[0] + "px;\n";
        };
      }

    } else if (unique_radius_values.length === 2) {
      var frequencies = {};
      var max_index; // Most frequest value
      var max_value = 0; // How many times the value repeats in each array.

      $.each(all_radius_values, function(index, value) {
        if (frequencies[value] !== undefined) {
          frequencies[value]++;
        } else {
          frequencies[value] = 1;
        }
      });

      $.each(frequencies, function(index, value) {
        if (value > max_value) {
          max_value = value;
          max_index = index;
        }
      });
      
      if (max_value === 3) { // e.g., [7, 7, 3, 7]
        for (vendor in props) {
         short_code += props[vendor]["short"] + ": " + max_index + "px;\n";
         if (topleft_value != max_index) { 
           topleft_code += props[vendor].topleft + ": " + topleft_value + "px;\n"; 
         }
         if (topright_value != max_index) { 
           topright_code += props[vendor].topright + ": " + topright_value + "px;\n"; 
         }
         if (bottomleft_value != max_index) { 
           bottomleft_code += props[vendor].bottomleft + ": " + bottomleft_value + "px;\n";
         }
         if (bottomright_value != max_index) { 
           bottomright_code += props[vendor].bottomright + ": " + bottomright_value + "px;\n";
         }
        }
      } else if (max_value === 2) { // e.g., [4, 4, 2, 2]
       var min_value = Math.min.apply(Math, all_radius_values);
       for (vendor in props) {
         short_code += props[vendor]["short"] + ": " + min_value + "px;\n";
         if (topleft_value != min_value) { topleft_code += props[vendor].topleft + ": " + topleft_value + "px;\n"; }
         if (topright_value != min_value) { topright_code += props[vendor].topright + ": " + topright_value + "px;\n"; }
         if (bottomleft_value != min_value) { bottomleft_code += props[vendor].bottomleft + ": " + bottomleft_value + "px;\n"; }
         if (bottomright_value != min_value) { bottomright_code += props[vendor].bottomright + ": " + bottomright_value + "px;\n"; }
       }
     }
     
     
    } else if (unique_radius_values.length === 3) { // e.g., [8, 8, 1, 5]
      /*
        Code duplication warning!
      */
      var frequencies = {};
      var max_index;
      var max_value = 0;

      $.each(all_radius_values, function(index, value) {
        if (frequencies[value] !== undefined) {
          frequencies[value]++;
        } else {
          frequencies[value] = 1;
        }
      });

      $.each(frequencies, function(index, value) {
        if (value > max_value) {
          max_value = value;
          max_index = index;
        }
      });
      /*
        Code duplication warning ends here.
      */
      
      var min_value = Math.min.apply(Math, all_radius_values);
      for (vendor in props) {
        short_code += props[vendor]["short"] + ": " + min_value + "px;\n";
        if (topleft_value != min_value) { topleft_code += props[vendor].topleft + ": " + topleft_value + "px;\n"; }
        if (topright_value != min_value) { topright_code += props[vendor].topright + ": " + topright_value + "px;\n"; }
        if (bottomleft_value != min_value) { bottomleft_code += props[vendor].bottomleft + ": " + bottomleft_value + "px;\n"; }
        if (bottomright_value != min_value) { bottomright_code += props[vendor].bottomright + ": " + bottomright_value + "px;\n"; }
      }
    } else { // unique_radius_values.length === 4
      // Each value is different. e.g., [7, 1, 8, 4]
      for (vendor in props) {
        topleft_code += props[vendor].topleft + ": " + topleft_value + "px;\n";
        topright_code += props[vendor].topright + ": " + topright_value + "px;\n";
        bottomleft_code += props[vendor].bottomleft + ": " + bottomleft_value + "px;\n";
        bottomright_code += props[vendor].bottomright + ": " + bottomright_value + "px;\n";
      }
    }
    return short_code + topleft_code + topright_code + bottomleft_code + bottomright_code;
  };


  var get_values_from_sliders = function() {
    topleft_value     = $('#slider_topleft').slider('option', 'value');
    topright_value    = $('#slider_topright').slider('option', 'value');
    bottomleft_value  = $('#slider_bottomleft').slider('option', 'value');
    bottomright_value = $('#slider_bottomright').slider('option', 'value');

  };
  
  $(".slider").slider({
    animate: true,
    change: function(event, ui) {
      get_values_from_sliders();
      all_radius_values = [topleft_value, topright_value, bottomleft_value, bottomright_value];
      unique_radius_values = all_radius_values.unique();
      var code = get_code();
      $('#box').attr("style", code);
      $('#copiable').text(code);
      $(this).next().text(ui.value);
    }
  });
  });
