function searchLineups(pos, num, skip){

	addPlayer(pos, num, skip)

}

function searchLineupsToRemove(pos, num){
	removeRegular(pos, num)
}

function addPlayer(pos, numLineups, numSkip){

	var addedTo = [] // Lineup Id's that fit our criteria. We'll use this at the end of this function

	let i = 0
	if(numSkip) i = numSkip - 1

	// Looping through global lineups
	for(i; i < lineups.length; i++){

		let alreadyInLineup = isClickedPlayerInLineup(lineups[i].id)
		if(alreadyInLineup) continue

		let added = false
		switch(pos){
			case 'QB': 
				added = checkQB(lineups[i])
				break
			case 'RB':
				added = checkRB(lineups[i])
				break
			case 'WR':
				added = checkWR(lineups[i])
				break
			default:
				console.log("ERROR")
				break
		}

		if(added) addedTo.push(lineups[i].id)
		else continue

		// Stop because we've reached the number to add
		if(addedTo.length == numLineups) break

	}

	console.log(addedTo)

	addLineupsToPlayer(addedTo)

}

function addLineupsToPlayer(toAdd){

	console.log("TO ADD " + toAdd)
	let lineupsIn = clickedPlayerLineups
	
	if(lineupsIn.length == 0){
		
		// Create the player in SelectedPlayers 
		selectedPlayers.push({
			'ID': clickedPlayer.ID,
			'lineupsIn': toAdd
		})

		// Set global to update slider view
		clickedPlayerLineups = toAdd

	} else{

		// Player is already selected so find him and merge newlineups with existing lineups
		let foundPlayer = selectedPlayers.findIndex(x => x.ID == clickedPlayer.ID)
		let merged = _.concat(lineupsIn, toAdd);
		selectedPlayers[foundPlayer].lineupsIn = merged

		// Set global to update slider view
		clickedPlayerLineups = merged

		console.log(clickedPlayerLineups)
	}
}

function removeCaptain(pos, numLineups){

	var removeFrom = []

	// Looping through global lineups
	for(var i=0; i < lineups.length; i++){

		// Checking to see if player is captain in this lineup
		let isCaptain = checkLineupForCaptain(lineups[i])
		
		// Player is the captain so remove them and add to counter
		if(isCaptain){
			lineups[i].roster['CAP'][0] = {}
			removeFrom.push(lineups[i].id)
		}

		// Stop because we've reached the number to remove
		if(removeFrom.length == Math.abs(numLineups)) break

	}

	//removeLineupsFromPlayer(clickedPlayer.ID, removeFrom)

}





function addPlayerToHighlightedLineups(){

	let rows = eligibleHighlightedRowsToAdd // global
	let toAdd = [] // collecting lineup id's for selected players
	
	for(var i = 0; i < rows.length; i++){

		let position = rows[i].position
		let slot = rows[i].slot
		
		// find the index of each highlighted lineup
		let foundLineupIndex = lineups.findIndex(x => x.id == rows[i].lineup)
		
		// insert as captain or regular
		lineups[foundLineupIndex].roster[position][slot] = clickedPlayer

		// Add to our collection to send to selected players
		toAdd.push(lineups[foundLineupIndex].id)
		
	}

	// Update the player's lineups in selected players
	addLineupsToPlayer(toAdd)

}


function checkQB(lineup){
	if(!lineup.roster['QB'][0].ID){
		lineup.roster['QB'][0] = clickedPlayer
		return true
	} else if(!lineup.roster['SF'][0].ID){
		lineup.roster['SF'][0] = clickedPlayer
		return true
	}

	return false
}

function checkRB(lineup){
	for (var i=0; i < 2; i++){
		if(!lineup.roster['RB'][i].ID){
			lineup.roster['RB'][i] = clickedPlayer
			return true
		}
	}
	if(!lineup.roster['FX'][0].ID){
		lineup.roster['FX'][0] = clickedPlayer
		return true
	}
	if(!lineup.roster['SF'][0].ID){
		lineup.roster['SF'][0] = clickedPlayer
		return true
	}

	return false
}

function checkWR(lineup){
	for (var i=0; i < 3; i++){
		if(!lineup.roster['WR'][i].ID){
			lineup.roster['WR'][i] = clickedPlayer
			return true
		}
	}
	if(!lineup.roster['FX'][0].ID){
		lineup.roster['FX'][0] = clickedPlayer
		return true
	}
	if(!lineup.roster['SF'][0].ID){
		lineup.roster['SF'][0] = clickedPlayer
		return true
	}

	return false
}


function isClickedPlayerInLineup(lid){
	return _.includes(clickedPlayerLineups, lid)
}

function checkPlayerLineups(pid){
	let player = _.find(selectedPlayers, {'ID': pid })
	if(player) return player.lineupsIn
		else return []
}

function checkLineupForCaptain(lineup){
	if(lineup.roster['CAP'][0].ID == clickedPlayer.ID) return true
	else return false
}

function checkLineupForRegularPlayer(lineup){

	// Check the main position
	for(var i = 0; i < 5; i++){
		if(lineup.roster['REG'][i].ID == clickedPlayer.ID) return true
	}

	return false
}

