function printSortedPlayers(arr){
	var output = ''

	_.forEach(arr, function(value){
		output += '<tr class="player" id="' + value.ID + '">'
			output += '<td class="position">' + value.Position + '</td>'
			output += '<td class="name">' + value.Name + '</td>'
			output += '<td class="team">' + value.TeamAbbrev + '</td>'
			output += '<td class="team">' + value.Salary + '</td>'
		output += '</tr>'
	})

	$('.players').html(output)
}

function printSelectedPlayers(game){
	
	let output = ''

	for(var i=0; i<selectedPlayers.length; i++){

		let player = selectedPlayers[i]
		let foundPlayer = findPlayerById(player.ID)

		console.log(foundPlayer)

		output += '<tr class="player" id="' + player.ID + '">'
			output += '<td class="position">' + foundPlayer.Position + '</td>'
			output += '<td class="name">' + foundPlayer.Name + '</td>'
			output += '<td class="team">' + foundPlayer.TeamAbbrev + '</td>'
			output += '<td class="pct-lineups">' + player.lineupsIn.length + '/' + numberOfLineups + '</td>'
			output += '<td class="pct-lineups">' + (player.lineupsIn.length/numberOfLineups*100).toFixed(1) + '%' + '</td>'
		output += '</tr>'
	}

	$('.players').html(output)
}

function sortPlayers(pos, game){
	let players = allPlayers
	players = sortPlayersByPosition(players, pos)
	players = sortPlayersByGame(players, game)
	return players
}

function sortPlayersByGame(players, game){

	let matching = players

	switch(game){
		
		case 'ALL':
			break
		
		default:

			matching =_.filter(players,function(item){
		    	return item.TeamAbbrev == game
		    })

			break
	}

	return matching
}

function sortPlayersByPosition(players, pos){
	
	let matching = players

	switch(pos){
		
		case 'ALL':
			break
		
		case 'FLEX':
			matching = players.filter(e => ['RB', 'WR', 'TE'].includes(e.Position))
			break
		
		default:
			matching = _.filter(players, { 'Position': pos })
			break
	}

	console.log(matching)
	return matching
}

