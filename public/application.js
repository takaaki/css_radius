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
  var tl_value, tr_value, bl_value, br_value;
  var all_radius_values = [];
  var unique_radius_values = [];
  var short_code = "";
  var tl_code = "", tr_code = "", bl_code = "", br_code = "";
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
  
  $(':checkbox').attr("checked", "true");
  $(".px").text("0");
  
  var get_code = function(vendor) {
    short_code = "";
    tl_code = "";
    tr_code = "";
    bl_code = "";
    br_code = "";
    
    var frequencies = {};
    var max_index; // Most frequest value
    var max_value = 0; // How many times the value repeats in each array.
    // var max_value = 0
    var min_value = 0;
    
    if (unique_radius_values.length === 1) { // e.g., [2, 2, 2, 2]
      if (unique_radius_values[0] !== 0) {
        short_code += props[vendor]["short"] + ": " + unique_radius_values[0] + "px;\n";
      }

    } else if (unique_radius_values.length === 2) {
      $.each(all_radius_values, function(index, value) {
        if (frequencies[value] !== undefined) {
          frequencies[value] = frequencies[value] + 1;
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
        max_value = Math.max.apply(Math, all_radius_values);
        min_value = Math.min.apply(Math, all_radius_values);
        if (min_value == 0) {
          if (tl_value != 0) { tl_code += props[vendor].topleft + ": " + tl_value + "px;\n"; }
          if (tr_value != 0) { tr_code += props[vendor].topright + ": " + tr_value + "px;\n"; }
          if (bl_value != 0) { bl_code += props[vendor].bottomleft + ": " + bl_value + "px;\n"; }
          if (br_value != 0) { br_code += props[vendor].bottomright + ": " + br_value + "px;\n"; }
          
        } else {
          short_code += props[vendor]["short"] + ": " + max_index + "px;\n";
          if (tl_value != max_index) { tl_code += props[vendor].topleft + ": " + tl_value + "px;\n"; }
          if (tr_value != max_index) { tr_code += props[vendor].topright + ": " + tr_value + "px;\n"; }
          if (bl_value != max_index) { bl_code += props[vendor].bottomleft + ": " + bl_value + "px;\n"; }
          if (br_value != max_index) { br_code += props[vendor].bottomright + ": " + br_value + "px;\n"; }
          
        }
        
      } else if (max_value === 2) { // e.g., [4, 4, 2, 2]
        max_value = Math.max.apply(Math, all_radius_values);
        min_value = Math.min.apply(Math, all_radius_values);
        if (min_value != 0) {short_code += props[vendor]["short"] + ": " + max_value + "px;\n";}
        if (tl_value == max_value) { tl_code += props[vendor].topleft + ": " + tl_value + "px;\n"; }
        if (tr_value == max_value) { tr_code += props[vendor].topright + ": " + tr_value + "px;\n"; }
        if (bl_value == max_value) { bl_code += props[vendor].bottomleft + ": " + bl_value + "px;\n"; }
        if (br_value == max_value) { br_code += props[vendor].bottomright + ": " + br_value + "px;\n"; }
     }
     
     
    } else if (unique_radius_values.length === 3) { // e.g., [8, 8, 1, 5]
      /*
        Code duplication warning!
      */

      $.each(all_radius_values, function(index, value) {
        if (frequencies[value] !== undefined) {
          frequencies[value] = frequencies[value] + 1;
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
      if (min_value != 0) { short_code += props[vendor]["short"] + ": " + min_value + "px;\n"; }
      if (tl_value != min_value) { tl_code += props[vendor].topleft + ": " + tl_value + "px;\n"; }
      if (tr_value != min_value) { tr_code += props[vendor].topright + ": " + tr_value + "px;\n"; }
      if (bl_value != min_value) { bl_code += props[vendor].bottomleft + ": " + bl_value + "px;\n"; }
      if (br_value != min_value) { br_code += props[vendor].bottomright + ": " + br_value + "px;\n"; }
    } else { // unique_radius_values.length === 4
      // Each value is different. e.g., [7, 1, 8, 4]
      if (tl_value != 0 ) { tl_code += props[vendor].topleft + ": " + tl_value + "px;\n"; }
      if (tr_value != 0 ) { tr_code += props[vendor].topright + ": " + tr_value + "px;\n"; }
      if (bl_value != 0 ) { bl_code += props[vendor].bottomleft + ": " + bl_value + "px;\n"; }
      if (br_value != 0 ) { br_code += props[vendor].bottomright + ": " + br_value + "px;\n"; }
    }
    
    var complete_code = short_code + tl_code + tr_code + bl_code + br_code;
    return complete_code.replace(/\s0px/g, " 0");
  };


  var get_values_from_sliders = function() {
    tl_value = $('#slider_topleft').slider('option', 'value');
    tr_value = $('#slider_topright').slider('option', 'value');
    bl_value = $('#slider_bottomleft').slider('option', 'value');
    br_value = $('#slider_bottomright').slider('option', 'value');
  };
  var update = function(){
    get_values_from_sliders();
    all_radius_values = [tl_value, tr_value, bl_value, br_value];
    unique_radius_values = all_radius_values.unique();
    var webkit, moz, css3;
    var code = "";
    if ($("#webkit").attr("checked")) { webkit = get_code("webkit"); }
    if ($("#moz").attr("checked")) { moz = get_code("moz"); }
    if ($("#css3").attr("checked")) { css3 = get_code("css3"); }
    
    if (webkit) { code += webkit; }
    if (moz) { code += moz; }
    if (css3) { code += css3; }
    
    $('#box').attr("style", code);
    
    $('#copiable').text(code);
  };
  
  $(".slider").slider({
    animate: true,
    change: function(event, ui) {
      update();
      $(this).next().text(ui.value);
    }
  });
  
  $(":checkbox").click(function() {
      update();    
  });
});
