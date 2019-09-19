// CLICK EVENTS


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
	let captain = $('#captain').val()
	let numberToChange = parseInt(($('.player-select-delta').text()))

	// Shuffle the lineups if random is selected
	if(random == 'yes') lineups = _.shuffle(lineups);

	// The main functions reponsible for adding or removing players
	if(numberToChange < 0) searchLineupsToRemove(clickedPlayer.Position, numberToChange, captain)
	else searchLineups(clickedPlayer.Position, numberToChange, captain)

	// Reorder the lineups by their original ID's before printing
	lineups = _.orderBy(lineups, ['id'],['asc'])

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
	var row = $(this).attr('data-row')


	if(playerId){ // This row has a player so remove him from lineup and update his selected lineups
		
		removePlayerFromOneLineup(playerId, lineupId, row)
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
				row: row
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


