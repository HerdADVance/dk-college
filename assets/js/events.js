// CLICK EVENTS

$('.prepare-csv').click(function(){
	let output = 'QB,RB,RB,WR,WR,WR,FLEX,S-FLEX\n'

	_.forEach(lineups, function(lineup){

		for(var key in lineup.roster){
			
			let position = lineup.roster[key]

			_.forEach(position, function(slot){
				output += slot.ID + ','
			})

		}

		output = output.substring(0, output.length - 1)
		output += '\n'

	})

	$('#csv-data').val(output)

	document.getElementById('create-csv').submit();
})

// Sort players based on game or position
$('.sort-players li').click(function(){

	// Change highlighted selection
	$(this).addClass('selected').siblings().removeClass('selected');

	// Update correct global variable
	if($(this).parent().hasClass('sort-positions')) selectedPosition = $(this).text()
		else selectedGame = $(this).text()

	// Selected players requires different type of printing
	if(selectedPosition == 'SEL'){
		printSelectedPlayers(selectedGame)
	} else{ // Sort & Print
		let players = sortPlayers(selectedPosition, selectedGame)
		printSortedPlayers(players)
	}
	

})


// Showing player select bar when player clicked
$(".players").delegate(".player", "click", function(){

	$('.players tr').removeClass('clicked-player')
	$(this).addClass('clicked-player')
	
	// Find Clicked Player & set globals for clickedPlayer and clickedPlayerLineups
	let clickedPlayerId = parseInt($(this).attr('id'))
	clickedPlayer = findPlayerById(clickedPlayerId)
	clickedPlayerLineups = checkPlayerLineups(clickedPlayerId)

	// Build Player Select Bar and place it after clicked row
	let selectBar = buildPlayerSelectBar(clickedPlayer, clickedPlayerLineups.length)
	$(this).after(selectBar)

	// Create Slider into Player Select Bar
	if(clickedLineupRows.length < 1) createSlider(clickedPlayerLineups.length)

})


// Adding player based on slider
$(".players").delegate(".player-select-add", "click", function(){

	let random = $('#random').val()
	let numberToChange = parseInt(($('.player-select-delta').text()))
	let startFrom = parseInt($('#start-from').val());

	// Shuffle the lineups if random is selected
	if(random == 'yes') lineups = _.shuffle(lineups);

	// Start from this lineup if selected
	let numberToSkip = undefined
	if(startFrom) numberToSkip = startFrom 

	// The main functions reponsible for adding or removing players
	if(numberToChange < 0) searchLineupsToRemove(clickedPlayer.Position, numberToChange)
	else searchLineups(clickedPlayer.Position, numberToChange, numberToSkip)

	// Reorder the lineups by their original ID's before printing. Otherwise keep sorted by salary/whatever
	if(random == 'yes') lineups = _.orderBy(lineups, ['id'],['asc'])

	printLineups(lineups)

	updateSlider()

})


// Adding player to highlighted rows
$(".players").delegate(".player-select-add-highlighted", "click", function(){

	addPlayerToHighlightedLineups()
	printLineups(lineups)

	// Reset globals and unhighlight rows
	clickedLineupRows = []
	eligibleHighlightedRows = []

	let selectBar = buildPlayerSelectBar(clickedPlayer, clickedPlayerLineups.length)
	$('.player-select-bar').remove()
	$('.clicked-player').after(selectBar)
	if(clickedLineupRows.length < 1) createSlider(clickedPlayerLineups.length)

	

})


// Clicking lineup rows
$(".lineups").delegate("tr", "click", function(){
	
	var lineupId = parseInt($(this).parent().parent().attr('id'))
	var playerId = $(this).attr('data-pid')
	
	var position = $(this).attr('data-pos')
	var slot = $(this).attr('data-slot')


	if(playerId){ // This row has a player so remove him from lineup and update his selected lineups
		
		removePlayerFromOneLineup(playerId, lineupId, position, slot)
		// prevent this from taking away highlighted rows

	} else{ // Highlight row background and add next clicked player to row

		var wasSelected = $(this).hasClass('player-selectable')

		if(wasSelected){ // Row was already selected so remove from the global array
			
			clickedLineupRows = _.filter(clickedLineupRows, function(row) {
			    return row.lineup != lineupId
			});

			$(this).removeClass('player-selectable')

		} else { // Row wasn't selected so add to the global array (and remove other row in same lineup)
			
			// Remove row from same lineup from global
			clickedLineupRows = _.filter(clickedLineupRows, function(row) {
			    return row.lineup != lineupId
			});

			// Add row to global
			clickedLineupRows.push({
				lineup: lineupId,
				position: position,
				slot: slot
			})

			$(this).siblings().removeClass('player-selectable')
			$(this).addClass('player-selectable')
	
		}
	
	}

	// Remake player select bar
	let selectBar = buildPlayerSelectBar(clickedPlayer, clickedPlayerLineups.length)
	$('.player-select-bar').remove()
	$('.clicked-player').after(selectBar)
	if(clickedLineupRows.length < 1) createSlider(clickedPlayerLineups.length)
})


$('.show-over-cap').click(function(){
	$('.lineup').hide();
	$('.lineup').each(function(){
		if ($(this).children('tbody').children('.salary-status').hasClass('neg')) $(this).show();
	});
});

$('.show-all').click(function(){
	$('.lineup').show();
});

$('.sort-high').click(function(){
	sortLineupsBySalary('high');
	printLineups(lineups);
});

$('.sort-low').click(function(){
	sortLineupsBySalary('low');
	printLineups(lineups);
});

$('.sort-id').click(function(){
	sortLineupsById();
	printLineups(lineups);
});
