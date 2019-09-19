function printPlayers(selectedPosition, awayTeam){
	
	emptyPlayers();
	var list = '';

	var playersToLoop = [];

	if(awayTeam){
		for(var i=0; i<players.length; i++){

			var playerGame = players[i].GameInfo;
			var playerAwayTeam = playerGame.substr(0, playerGame.indexOf('@'));
			
			if(playerAwayTeam === awayTeam){
				playersToLoop.push(players[i]);
			}
		}
	}
		else playersToLoop = players;

	
	switch(selectedPosition){
		case 'ALL':
			for(var i=0; i<playersToLoop.length; i++){
				list += printPlayer(playersToLoop[i]);
			}
			break;
		case 'FLEX':
			for(var i=0; i<playersToLoop.length; i++){
				if(playersToLoop[i].Position == 'RB' || playersToLoop[i].Position == 'WR' || playersToLoop[i].Position =='TE'){
					list += printPlayer(playersToLoop[i]);
				}
			}
			break;
		case 'SEL':
			for(var i=0; i<selectedPlayers.length; i++){
				var p = playersToLoop.findIndex(function(player){
					return player.id == selectedPlayers[i].id;
				});
				if(p != -1) list += printPlayer(playersToLoop[p]);
			}	
			break;
		default:
			for(var i=0; i<playersToLoop.length; i++, i){
				if(selectedPosition == playersToLoop[i].Position){
					list += printPlayer(playersToLoop[i]);
				}
			}
			break;
	}

	$('.players').append(list);
}

