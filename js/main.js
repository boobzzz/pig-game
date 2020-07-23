const selector = (el, s) => el.querySelector(s)
const selectors = (el, s) => el.querySelectorAll(s)
const getAttr = (el, attr) => el.getAttribute(attr)
const setAttr = (el, attr, val) => el.setAttribute(attr, val)
const hasClass = (el, className) => el.classList.contains(className)
const addClass = (el, className) => el.classList.add(className)
const removeClass = (el, className) => el.classList.remove(className)
const toggleClass = (el, className) => el.classList.toggle(className)
const getHtml = (el) => el.innerHTML
const setHtml = (el, val) => el.innerHTML = val
const randomize = () => Math.floor(Math.random() * 6) + 1

const newGameBtn = selector(document, '.new-game > a')
const rollDiceBtn = selector(document, '.roll-dice > a')
const holdBtn = selector(document, '.hold > a')
const dice = selector(document, '.dice > img')
const players = selectors(document, '.player')
const rollDice = selectors(document, '.roll-dice')[0]
const hold = selectors(document, '.hold')[0]

let score = 0
let currentScore = 0
const maxScore = 100

// --------------------------------Methods--------------------------------
const togglePlayers = () => {
    score = 0
    currentScore = 0

    for (let player of players) {
        let playerName = selectors(player, '.name')[0]
        let playerScore = selectors(player, '.score')[0]
        let totalScore = getHtml(playerScore)
        let playerCurrent = selectors(player, '.current-score')[0]

        if (totalScore < maxScore) {
            toggleClass(player, 'active')
            setHtml(playerCurrent, 0)
        } else {
            addClass(player, 'winner')
            setAttr(dice, 'src', '')
            setHtml(playerName, 'WINNER!!!')
            rollDice.style.display = 'none'
            hold.style.display = 'none'
        }
    }
}

const onNewGame = (e) => {
    e.preventDefault()
    let playerNum = 0

    rollDice.style.display = 'block'
    hold.style.display = 'block'

    for (let player of players) {
        let playerName = selectors(player, '.name')[0]
        let playerScore = selectors(player, '.score')[0]
        let playerCurrent = selectors(player, '.current-score')[0]

        removeClass(player, 'winner')
        setHtml(playerName, `Player ${++playerNum}`)
        setHtml(playerScore, 0)
        setHtml(playerCurrent, 0)

        getHtml(playerName) === 'Player 1'
        ? addClass(player, 'active')
        : removeClass(player, 'active')
    }

    setAttr(dice, 'src', '')
}

const onRollDice = (e) => {
    e.preventDefault()
    let random = randomize()
    currentScore += random

    if (random === 1) togglePlayers()

    for (let player of players) {
        let playerCurrent = selectors(player, '.current-score')[0]
        if (hasClass(player, 'active')) setHtml(playerCurrent, currentScore)
    }

    setAttr(dice, 'src', `assets/images/dice-${random}.png`)
}

const onHold = (e) => {
    e.preventDefault()

    for (let player of players) {
        let playerScore = selectors(player, '.score')[0]
        let totalScore = getHtml(playerScore)
        score = parseInt(totalScore) + currentScore

        if (hasClass(player, 'active')) setHtml(playerScore, score)
    }

    togglePlayers()
}

newGameBtn.addEventListener('click', onNewGame)
rollDiceBtn.addEventListener('click', onRollDice)
holdBtn.addEventListener('click', onHold)
