//button actions
"use strict";

$('#socialButtons input:checkbox').addClass('input_hidden');
$('#socialButtons label').click(function() {
   // $(this).addClass('selected');
 //});
var ele = $(this).find(':checkbox');
    if ($(':checked').length) {
      ele.prop('checked', false);
      $(this).removeClass('selected');
    } else {
      ele.prop('checked', true);
      $(this).addClass('selected');
    }
 });

    
$('#heatmapButton').on('click', function() {
        codeAddress();
        $('#panel').remove();
        $("#heatButton").show();
        $("#socialButtons").show();
        $('#homeButton').show();
        $('#images').show();

        
    });
