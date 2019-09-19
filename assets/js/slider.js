function createSlider(){

	slider = $( ".player-select-slider" ).slider({
		animate: "fast",
		value: clickedPlayerLineups.length,
		min: 0,
		max: numberOfLineups,
		stop: function( event, ui ) {

			$('.player-select-delta').text(ui.value - clickedPlayerLineups.length)
			
			$(".player-add-button").hide();

			$(".player-add-slider-number").val(ui.value);
			$(".player-add-slider-pct").text(((ui.value/lineups.length) * 100).toFixed(2));

			var currentLineups = $('.player-add-number-lineups').text();
			var delta = ui.value - currentLineups;

			if(delta > 0) $("#delta-plus").show();
				else if (delta < 0) $('#delta-minus').show();
			
			$(".player-add-delta").text(Math.abs(delta));
		
		}
	});

}

function updateSlider(){

	slider.slider( "option", "value", clickedPlayerLineups.length );

	$('.player-select-current-lineups').text(clickedPlayerLineups.length)
	$('.player-select-delta').text(0)

}