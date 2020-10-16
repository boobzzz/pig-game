import * as U from './utils.js';

const newGameBtn = U.selector(document, '.new-game > a')
const rollDiceBtn = U.selector(document, '.roll-dice > a')
const holdBtn = U.selector(document, '.hold > a')
const dice = U.selector(document, '.dice > img')
const rollDice = U.selector(document, '.roll-dice')
const hold = U.selector(document, '.hold')
const players = document.querySelectorAll('.player')

let score = 0
let currentScore = 0
const maxScore = 100

//---------------------------------- Methods -----------------------------------
const togglePlayers = () => {
    score = 0
    currentScore = 0

    for (let player of players) {
        let playerCurrentScore = U.selector(player, '.current-score')

        U.toggleClass(player, 'active')
        U.setHtml(playerCurrentScore, 0)
    }
}

const onNewGame = () => {
    let playerNum = 0

    dice.style.display = 'none'
    rollDice.style.display = 'block'
    hold.style.display = 'block'

    for (let player of players) {
        let playerName = U.selector(player, '.name')
        let playerScore = U.selector(player, '.score')
        let playerCurrentScore = U.selector(player, '.current-score')

        U.removeClass(player, 'winner')
        U.setHtml(playerName, `Player ${++playerNum}`)
        U.setHtml(playerScore, 0)
        U.setHtml(playerCurrentScore, 0)

        U.getHtml(playerName) === 'Player 1'
        ? U.addClass(player, 'active')
        : U.removeClass(player, 'active')
    }

    U.setAttr(dice, 'src', '')
}

const onRollDice = () => {
    dice.style.display = 'block'

    let random = U.randomize()
    currentScore += random

    if (random === 1) togglePlayers()

    for (let player of players) {
        let playerCurrentScore = U.selector(player, '.current-score')
        if (U.hasClass(player, 'active')) {
            U.setHtml(playerCurrentScore, currentScore)
        }
    }

    U.setAttr(dice, 'src', `assets/images/dice-${random}.png`)
}

const onHold = () => {
    for (let player of players) {
        if (U.hasClass(player, 'active')) {
            let playerName = U.selector(player, '.name')
            let playerScore = U.selector(player, '.score')
            let totalScore = U.getHtml(playerScore)

            score = parseInt(totalScore) + currentScore

            U.setHtml(playerScore, score)

            if (score >= maxScore) {
                U.addClass(player, 'winner')
                U.setAttr(dice, 'src', '')
                U.setHtml(playerName, 'WINNER!!!')
                dice.style.display = 'none'
                rollDice.style.display = 'none'
                hold.style.display = 'none'
            }
        }
    }

    if (score < maxScore) togglePlayers()
}

//---------------------------------- Events ------------------------------------
newGameBtn.addEventListener('click', onNewGame)
rollDiceBtn.addEventListener('click', onRollDice)
holdBtn.addEventListener('click', onHold)
