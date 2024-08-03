"use strict"

let quset = {
  1: {
    qusetion:
      "Of the follwing, One is not a typical catagory of risk in project managment",
    choice: [
      "Operational risk",
      "Technical risk",
      "Schedule risk",
      "Fincial risk",
    ],
    mark: 1.0,
    correct: "Technical risk",
  },
  2: {
    qusetion:
      "Of the follwing, One is incorrect abou major processes involved in project managmnet",
    choice: [
      "cost Authoriation",
      "cost estimation",
      "cost controlling",
      "cost budgeting",
    ],
    mark: 1.0,
    correct: "cost Authoriation",
  },
  3: {
    qusetion: "One of the follwing is differnet from others, which one is it",
    choice: [
      "Risk explotiation",
      "Risk enhancment",
      "Risk sharing",
      "Risk avoidance",
    ],
    mark: 1.0,
    correct: "Risk explotiation",
  },
  4: {
    qusetion:
      "All of the following can be used as input to develop human resource managment plan except",
    choice: [
      "Organizational Polices",
      "Expert judgment",
      "Activity resource requirments",
      "project managmnent plan",
    ],
    mark: 2.0,
    correct: "Expert judgment",
  },
}

const Btn = document.querySelector(".btn-nxt")
const options = document.querySelectorAll(".options button")
const qusetion = document.querySelector(".qusetion")
const correctDisplay = document.querySelector(".correct")
const wrapAnswer = document.querySelector(".correct-answer")
const mark = document.querySelector(".mark")
const num = document.querySelector(".num")
const givenMark = document.querySelector(".given-mark")
const statusPerExam = document.querySelector(".status-per-exam")
const date = document.querySelectorAll(".date")
const hour = document.querySelector(".hour")
const minute = document.querySelector(".minute")
const second = document.querySelector(".second")
const result = document.querySelector(".result")
const resultPercentage = document.querySelector(".result-percentage")
const timeAlloted = document.querySelector(".time-alloted")
const totalMark = document.querySelectorAll(".total-mark")
const wrapResult = document.querySelector(".wrap-result")
const usedTime = document.querySelector(".used-time")
const startNew = document.querySelector(".start-new")

let count = 1
let score = 0
let allotedHour = 1
let allotedMinute = 21
let countsecond = 0
let countMinute = 0
let countHour = 0

function intalizermain() {
  TimeStopFunctionality()
  displayQusetions()
}

const intalizer = () => {
  count = 1
  score = 0
  allotedHour = 1
  allotedMinute = 21
  countsecond = 0
  countMinute = 0
  countHour = 0

  wrapResult.style.display = "none"
  mainView.classList.add("hidden")
  prepare.classList.remove("hidden")
}
intalizer()

const dateGenerator = () => {
  const dateThis = new Date()
  let text2 = dateThis.toString()

  let splitedarr = text2.split(" GMT+")
  let needed = splitedarr[0]

  date.forEach((da) => {
    da.textContent = needed
  })
}

dateGenerator()

//Time Handler
const TimeStopFunctionality = () => {
  setInterval(() => {
    if (countsecond == 60) {
      countsecond = 0
      countMinute++
      if (countMinute == 60) {
        countMinute = 0
        countHour++
      }
    }

    countsecond++
    //If alloted time is over, give the error message and stop the exam
    if (
      countHour == allotedHour &&
      countMinute == allotedHour &&
      countsecond == 0
    ) {
      errorDisplay(
        "Error",
        "Your alloted Time is now Finshed the exam is no over",
        "err"
      )
      //  Here stop the exam
    }
    let textsecond = countsecond < 10 ? `0${countsecond}` : countsecond
    let textMinute = countMinute < 10 ? `0${countMinute}` : countMinute
    let textHour = countHour < 10 ? `0${countHour}` : countHour

    second.textContent = textsecond
    minute.textContent = textMinute
    hour.textContent = textHour
  }, 1000)
}
//Display the result to the user

const resultdisplayer = (currentTime) => {
  //Hide the maintab and show the result tab
  mainView.classList.add("hidden")
  wrapResult.style.display = "flex"

  //To get the total amount of mark Dynamically
  const noQuestions = Object.keys(quset).length

  let sumOfMarks = 0

  for (let i = 1; i <= noQuestions; i++) {
    let currentObject = quset[i]

    sumOfMarks = sumOfMarks + currentObject.mark
  }

  sumOfMarks = sumOfMarks.toFixed(2)

  totalMark.forEach((mark) => {
    mark.textContent = sumOfMarks
  })

  result.textContent = `${score}.00`

  let percentage = (score / sumOfMarks) * 100
  percentage = percentage.toFixed(2)

  if (percentage < 30) {
    resultPercentage.style.borderColor = "red"
  } else if (percentage > 31 && percentage < 67) {
    resultPercentage.style.borderColor = "yellow"
  }

  resultPercentage.textContent = `${percentage}%`

  //Used time to finshe the exam

  usedTime.textContent = currentTime
}

const displayQusetions = () => {
  //enabling the choice Buttons
  options.forEach((opt) => {
    opt.disabled = false
    opt.classList.remove("clicked")
  })

  timeAlloted.textContent = `${allotedHour} Hour ${allotedMinute} minutes`
  const noQuestions = Object.keys(quset).length

  if (noQuestions >= count) {
    let currentQuestion = quset[count]

    num.textContent = count
    qusetion.textContent = currentQuestion.qusetion

    options[0].textContent = currentQuestion.choice[0]
    options[1].textContent = currentQuestion.choice[1]
    options[2].textContent = currentQuestion.choice[2]
    options[3].textContent = currentQuestion.choice[3]

    correctDisplay.textContent = currentQuestion.correct
    //To get the total amount of mark Dynamically
    const noQuestions = Object.keys(quset).length

    let sumOfMarks = 0

    for (let i = 1; i <= noQuestions; i++) {
      let currentObject = quset[i]

      sumOfMarks = sumOfMarks + currentObject.mark
    }

    sumOfMarks = sumOfMarks.toFixed(2)
    mark.textContent = sumOfMarks

    options.forEach((opt) => {
      opt.addEventListener("click", (e) => {
        options.forEach((opt) => {
          opt.classList.remove("clicked")
        })

        opt.classList.add("clicked")
      })
    })
  } else {
    let currentTime = `${hour.textContent}: ${minute.textContent}: ${second.textContent}`
    resultdisplayer(currentTime)
  }
}

const answerHandler = (e) => {
  if (Btn.classList.contains("btn-submit")) {
    //To display the next Qusetion
    displayQusetions()
    statusPerExam.textContent = "Taking"
    Btn.classList.remove("btn-submit")
    Btn.textContent = "Submit"
    wrapAnswer.classList.add("vis-hidden")
  } else {
    //To display the correct answer and to keep track the score
    let isClicked
    var clickedElement
    for (let i = 0; i <= 3; i++) {
      let opt = options[i]

      if (opt.classList.contains("clicked")) {
        isClicked = true
        clickedElement = opt
        break
      } else {
        isClicked = false
      }
    }

    if (isClicked) {
      //Disabling the choice Buttons
      options.forEach((opt) => {
        opt.disabled = true
      })

      statusPerExam.textContent = "Completed"

      let selectedAnswer = clickedElement.textContent
      let correctanswer = quset[count].correct

      if (selectedAnswer === correctanswer) {
        //Increase the score value and give full mark
        score = score + Number.parseInt(quset[count].mark)

        givenMark.textContent = `${score}.00`
      }
      Btn.classList.add("btn-submit")
      Btn.textContent = "Next"

      wrapAnswer.classList.remove("vis-hidden")
      count++
    } else {
      errorDisplay("Error", "You have to select your answer", "err")
    }
  }
}
//Start the program again
const makeNew = () => {
  intalizer()
}

Btn.addEventListener("click", answerHandler)
startNew.addEventListener("click", makeNew)
