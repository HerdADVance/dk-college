function printTeamNames(){
	
	let info = playersData[0]['Game Info']
	let awayTeam = info.substr(0, info.indexOf('@'));
	info = info.substring(info.indexOf("@") + 1);
	let homeTeam = info.substr(0, info.indexOf(' '));

	$('.away-team').text(awayTeam)
	$('.home-team').text(homeTeam)
}