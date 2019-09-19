function searchLineups(pos, num, captain){

	addPlayer(pos, num)

}

function searchLineupsToRemove(pos, num, captain){
	if(captain === 'yes') removeCaptain(pos, num)
	else removeRegular(pos, num)
}

function addPlayer(pos, numLineups){

	var addedTo = [] // Lineup Id's that fit our criteria. We'll use this at the end of this function

	// Looping through global lineups
	for(var i=0; i < lineups.length; i++){

		let alreadyInLineup = isClickedPlayerInLineup(lineups[i].id)
		if(alreadyInLineup) continue

		switch(pos){
			case 'QB': 
				checkQB(lineups[i])
				break
			case 'RB':
				checkRB(lineups[i])
				break
			case 'WR':
				checkWR(lineups[i])
				break
			default:
				console.log("ERROR")
				break
		}

		// Stop because we've reached the number to add
		if(addedTo.length == numLineups) break

	}

}

function checkQB(lineup){
	if(!lineup.roster['QB'][0].ID){
		lineup.roster['QB'][0] = clickedPlayer
	} else if(!lineup.roster['SF'][0].ID){
		lineup.roster['SF'][0] = clickedPlayer
	}
}

function checkRB(lineup){
	for (var i=0; i < 2; i++){
		if(!lineup.roster['RB'][i].ID){
			lineup.roster['RB'][i] = clickedPlayer
			return 
		}
	}
	if(!lineup.roster['FX'][0].ID){
		lineup.roster['FX'][0] = clickedPlayer
		return
	}
	if(!lineup.roster['SF'][0].ID){
		lineup.roster['SF'][0] = clickedPlayer
		return
	}
}

function checkWR(lineup){
	for (var i=0; i < 3; i++){
		if(!lineup.roster['WR'][i].ID){
			lineup.roster['WR'][i] = clickedPlayer
			return 
		}
	}
	if(!lineup.roster['FX'][0].ID){
		lineup.roster['FX'][0] = clickedPlayer
		return
	}
	if(!lineup.roster['SF'][0].ID){
		lineup.roster['SF'][0] = clickedPlayer
		return
	}
}


function addCaptain(pos, numLineups){
	
	var addedTo = [] // Lineup Id's that fit our criteria. We'll use this to update the global lineups at the end of this function

	// Looping through global lineups
	for(var i=0; i < lineups.length; i++){

		// Check to see if Captain spot is empty and skip to next lineup if so
		if(lineups[i].roster['CAP'][0].ID) continue;

		// Check to see if player is already somewhere else in this lineup and skip to next lineup if so
		let playerInLineup = checkLineupForRegularPlayer(lineups[i])
		if(playerInLineup) continue

		// Captain spot is empty and player isn't elsewhere in lineup so add him to captain spot and add to our local array
		lineups[i].roster['CAP'][0] = clickedPlayer
		addedTo.push(lineups[i].id)

		// Stop because we've reached the number to add
		if(addedTo.length == numLineups) break
	}

	// Update the view to reflect player being added to lineups
	addLineupsToPlayer(clickedPlayer.ID, addedTo)

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

function addRegular(pos, numLineups){

	var addedTo = [] // Lineup Id's that fit our criteria. We'll use this at the end of this function

	// Looping through global lineups
	for(var i=0; i < lineups.length; i++){

		// Check to see if player is in captain spot and skip to next lineup if so
		if(lineups[i].roster['CAP'][0].ID == clickedPlayer.ID) continue;

		// Check to see if player is already somewhere else in this lineup and skip to next lineup if so
		let playerInLineup = checkLineupForRegularPlayer(lineups[i])
		if(playerInLineup) continue

		// Check if lineup has any empty spots
		for(var j = 0; j < 5; j++){
			
			// Found empty spot so add player to lineup and add to our local array
			if(!lineups[i].roster['REG'][j].ID){
				lineups[i].roster['REG'][j] = clickedPlayer
				addedTo.push(lineups[i].id)
				break
			}
		}

		// Stop because we've reached the number to add
		if(addedTo.length == numLineups) break
	}

	// Update the player's lineups in selected players
	addLineupsToPlayer(clickedPlayer.ID, addedTo)

}


function removeRegular(pos, numLineups){

	var removeFrom = [] // Lineup Id's that fit our criteria. We'll use this at the end of this function

	// Looping through global lineups
	for(var i=0; i < lineups.length; i++){
		
		// Check each regular spot in lineup for player
		for(var j = 0; j < 5; j++){
			
			// Found player so remove them and add to local array
			if(lineups[i].roster['REG'][j].ID === clickedPlayer.ID){
				lineups[i].roster['REG'][j] = {}
				removeFrom.push(lineups[i].id)
				break
			}
		}

		// Stop because we've reached the number to remove
		if(removeFrom.length == Math.abs(numLineups)) break

	}

	console.log(removeFrom)

	//removeLineupsFromPlayer(clickedPlayer.ID, removeFrom)
}



function addPlayerToHighlightedLineups(){

	let rows = eligibleHighlightedRowsToAdd // global
	let toAdd = [] // collecting lineup id's for selected players
	
	for(var i = 0; i < rows.length; i++){
		
		// find the index of each highlighted lineup
		let foundLineupIndex = lineups.findIndex(x => x.id == rows[i].lineup)
		
		// insert as captain or regular
		if(rows[i].row == 0) lineups[foundLineupIndex].roster['CAP'][0] = clickedPlayer
		else lineups[foundLineupIndex].roster['REG'][rows[i].row - 1] = clickedPlayer

		// Add to our collection to send to selected players
		toAdd.push(lineups[foundLineupIndex].id)
		
	}

	// Update the player's lineups in selected players
	addLineupsToPlayer(clickedPlayer.ID, toAdd)

}



function addLineupsToPlayer(pid, toAdd){
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

