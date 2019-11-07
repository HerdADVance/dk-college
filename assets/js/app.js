// GLOBALS
allPlayers = _.filter(playersData, function (f) { return f['Roster Position'] !== 'CPT'; });


selectedPlayers = []

selectedPosition = 'ALL'
selectedGame = 'ALL'

newLineupId = 0
numberOfLineups = 20
lineups = []

clickedPlayer = null
clickedPlayerLineups = []

clickedLineupRows = []

eligibleHighlightedRows = []

slider = null

// INITIALIZE
printSortedPlayers(allPlayers)
createLineups(numberOfLineups)
printLineups(lineups)
printTeamNames()

console.log(lineups)



