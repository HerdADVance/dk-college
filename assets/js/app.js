// GLOBALS
allPlayers = _.filter(playersData, function (f) { return f['Roster Position'] !== 'CPT'; });


selectedPlayers = []

selectedPosition = 'ALL'
selectedGame = 'ALL'

newLineupId = 0
numberOfLineups = 15
lineups = []

clickedPlayer = null
clickedPlayerLineups = [1,2,3]

clickedLineupRows = []

eligibleHighlightedRows = []

slider = null

// INITIALIZE
printSortedPlayers(allPlayers)
createLineups(numberOfLineups)
printLineups(lineups)
printTeamNames()

console.log(lineups)



