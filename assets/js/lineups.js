function createLineups(n){
	var count = 0
	while(count < n){
		lineups.push(createLineup())
		count ++
	}
}

function createLineup(){
	
	newLineupId ++

	return{
		id: newLineupId,
	 	roster: {
	 		QB: [{}],
	 		SF: [{}],
			RB: [{}, {}],
			WR: [{}, {}, {}],
			FX: [{}]
	 	}
	}
}

function printLineups(arr){

	let count = 1
	let output = ''

	_.forEach(arr, function(lineup){

		output += '<table class="lineup" id="' + lineup.id + '">'
			output +='<tr><th colspan="4"> Lineup #' + count + '</th></tr>'
			
			var salary = 0

			for(var key in lineup.roster){
				
				let position = lineup.roster[key]
				let slotCount = 0

				_.forEach(position, function(slot){
				
					if(slot.Name) output += '<tr data-pos="' + key + '" data-slot="' + slotCount + '" data-pid="' + slot.ID + '" class="has-player">'
					else output += '<tr data-pos="' + key + '" data-slot="' + slotCount + '">'
						output += '<td>' + key + '</td>'
						if(slot.Name){
							salary += slot.Salary
							output += '<td>' + slot.Name + '</td>'
							output += '<td>' + slot.Salary
							output += '<td>' + '-' + '</td>'  
						} else output += '<td></td><td></td><td>+</td>'
					output += '</tr>'

					slotCount ++

				})
			}

		output += '<tr><td colspan="2">Rem: ' + (50000 - salary) + '</td><td colspan="2">' + salary + '</td></tr>'
		output += '</table>'

		count ++
	})

	$('.lineups').html(output)
}


function removePlayerFromOneLineup(playerId, lineupId, position, slot){

	// Find the lineup to remove player from
	let foundLineup = lineups.findIndex(x => x.id == lineupId)

	// Remove from captain or regular based on row
	lineups[foundLineup].roster[position][slot] = {}

	// Print the new lineups to reflect removal
	printLineups(lineups)

	// Remove from player's selected lineups or remove player from selected lineups array if was only in one
	let foundPlayer = selectedPlayers.findIndex(x => x.ID == playerId)
	let foundLineups = selectedPlayers[foundPlayer].lineupsIn

	if(foundLineups.length == 1){ // Remove player from array
		selectedPlayers.splice(foundPlayer, 1)
		
		// Update slider if opened player happens to be the one being removed
		if(clickedPlayer.ID == playerId){
			clickedPlayerLineups = []
			updateSlider()
		}

	} else{ // Just remove one lineup
		let indexToRemove = foundLineups.indexOf(lineupId)
		if (indexToRemove > -1) selectedPlayers[foundPlayer].lineupsIn.splice(indexToRemove, 1);

		// Update slider if opened player happens to be the one being removed
		if(clickedPlayer.ID == playerId){
			clickedPlayerLineups = selectedPlayers[foundPlayer].lineupsIn
			updateSlider()
		}

	}

	

}

