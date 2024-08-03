"use strict"
const nameString = document.querySelector(".name")
const job = document.querySelector(".job")
const continueBtn = document.querySelector(".continue")
const avaterImg = document.querySelectorAll(".avater-img")
const prepare = document.querySelector(".wrapper-prepare")
const mainAvater = document.querySelector(".main-avater-img")
const mainView = document.querySelector(".main-view")
const body = document.body
let mainValue = ""
let avaterName = ""
let avaterJob = ""

// Erro display Code

const errorDisplay = (status, message, classname) => {
  let errwindow = document.createElement("div")
  errwindow.setAttribute("class", "new-div2")

  let errwindowsecond = document.createElement("div")
  errwindowsecond.setAttribute("class", "new-div")

  let heading = document.createElement("h3")
  heading.textContent = status

  heading.setAttribute("class", "new-h3")
  heading.setAttribute("id", classname)

  let paragraph = document.createElement("p")
  paragraph.textContent = message
  paragraph.setAttribute("class", "new-p")

  errwindowsecond.append(heading)
  errwindowsecond.append(paragraph)
  errwindow.append(errwindowsecond)
  body.append(errwindow)

  setTimeout(() => {
    document.querySelector(".new-div2").remove()
  }, 1500)
}

//Select the avater

avaterImg.forEach((img) => {
  img.addEventListener("click", (e) => {
    let clickedElment = e.target

    avaterImg.forEach((img) => {
      img.classList.remove("border-green")
    })
    clickedElment.classList.add("border-green")
    let avaterValue = clickedElment.src
    let splitvalue = avaterValue.split("img/")
    mainValue = splitvalue[1]
  })
})

//Handle the information

continueBtn.addEventListener("click", (e) => {
  if (nameString.value == "" || job.value == "None") {
    errorDisplay(
      "Error",
      "Name field and career Field can not be empty, Please fill the form and try agin",
      "err"
    )
  } else if (mainValue === "") {
    errorDisplay("Error", "Please Select your Avater from the pictures ", "err")
  } else {
    avaterName = nameString.value
    avaterJob = job.value

    errorDisplay(
      "Sucessfully Submited",
      "You have sucessfully submit your information yo may now commence to the quiz Good Luck",
      "success"
    )

    setTimeout(() => {
      prepare.classList.add("hidden")
      mainView.classList.remove("hidden")
      intalizermain()
    }, 1500)
  }
})
