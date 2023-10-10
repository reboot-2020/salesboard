// Product A info
let productA = {
    emoji: "⭐",
    revenue: 200,
    commision: 50
}

// Product B info
let productB = {
    emoji: "🔥",
    revenue: 300,
    commision: 75
}


// variables
const toggleCheckbox = document.getElementById("toggle-checkbox")
let isToggleChecked = toggleCheckbox.checked
const body = document.querySelector("body")
const img = document.querySelector("img")
const buttonsEl = document.querySelectorAll(".btn-light")
const paragraphsEl = document.querySelectorAll(".light-p")

const productStarBtn = document.getElementById("product-star-btn")
const productFireBtn = document.getElementById("product-fire-btn")

const salesTitle = document.getElementById("sales-title")
const salesP = document.getElementById("sales-p")
let sales = []

const achivementTitle = document.getElementById("achivement-title")
const achivementP = document.getElementById("achivement-p")
let achievements = []

const revenueP = document.getElementById("revenue-p")
const commisionP = document.getElementById("commision-p")

const resetBtn = document.getElementById("reset-btn")


// rendering out product buttons' content: star and fire emojis
productStarBtn.textContent = productA.emoji
productFireBtn.textContent = productB.emoji


// checking localStorage for data (sales, achivements)
const salesFromLocalStorage = JSON.parse( localStorage.getItem("sales") )
const achievementsFromLocalStorage = JSON.parse( localStorage.getItem("achievements") )
const isToggleCheckedFromLocalStorage = JSON.parse( localStorage.getItem("isToggleChecked") )

if ( salesFromLocalStorage || achievementsFromLocalStorage ) {
    sales = salesFromLocalStorage
    achievements = achievementsFromLocalStorage
    liveSales()
    liveAchivements()
    totalRevenue()
    totalCommision()    
}

// checking localStorage for toggle boolean, and setting the mode (light or dark)
if ( isToggleCheckedFromLocalStorage ) {     
        toggleCheckbox.checked = isToggleCheckedFromLocalStorage      
        body.classList.add("body-dark")
        body.classList.remove("body-light")
        img.classList.add("img-light")
        img.classList.remove("img-dark")
        paragraphsEl.forEach(paragraph => paragraph.classList.add("light-p") )
        paragraphsEl.forEach(paragraph => paragraph.classList.remove("dark-p") )             
    } else {   
        body.classList.remove("body-dark")
        body.classList.add("body-light")
        img.classList.remove("img-light")
        img.classList.add("img-dark")
        paragraphsEl.forEach(paragraph => paragraph.classList.remove("light-p") )
        paragraphsEl.forEach(paragraph => paragraph.classList.add("dark-p") )
    }


// addEventListeners: light/dark toggle, star, fire, reset btn-s

// light-dark toggle
toggleCheckbox.addEventListener("click", function() {
    localStorage.setItem("isToggleChecked", JSON.stringify( toggleCheckbox.checked ) )
    if ( toggleCheckbox.checked ) {
        body.classList.add("body-dark")
        body.classList.remove("body-light")
        img.classList.add("img-light")
        img.classList.remove("img-dark")
        paragraphsEl.forEach(paragraph => paragraph.classList.add("light-p") )
        paragraphsEl.forEach(paragraph => paragraph.classList.remove("dark-p") )
    } else {
        body.classList.remove("body-dark")
        body.classList.add("body-light")
        img.classList.remove("img-light")
        img.classList.add("img-dark")
        paragraphsEl.forEach(paragraph => paragraph.classList.remove("light-p") )
        paragraphsEl.forEach(paragraph => paragraph.classList.add("dark-p") )
    }
})

// star btn
productStarBtn.addEventListener( "click", function() {
    sales.push( productA.emoji )
    localStorage.setItem( "sales", JSON.stringify(sales) )
    achivPush()
    localStorage.setItem( "achievements", JSON.stringify(achievements) )
    liveSales()
    liveAchivements()
    totalRevenue()
    totalCommision()
})

productFireBtn.addEventListener( "click", function() {
    sales.push( productB.emoji )
    localStorage.setItem( "sales", JSON.stringify(sales) )
    achivPush()
    localStorage.setItem( "achievements", JSON.stringify(achievements) )
    liveSales()
    liveAchivements()
    totalRevenue()
    totalCommision()
})
   
resetBtn.addEventListener( "click", function() {
    localStorage.clear()
    sales = []
    achievements = []
    liveSales()
    salesTitle.textContent = `Live Sales`
    liveAchivements()
    achivementTitle.textContent = `Live Achievements`
    totalRevenue()
    revenueP.textContent = ""
    totalCommision()
    commisionP.textContent = ""
})


// FUNCTIONS  for achievement push
function achivPush() {
        if ( sales.length === 1 ) {
            achievements.push("🔔")
        } else if ( sales.length === 15 ) {
            achievements.push("🏆")
        } else if ( totalRevenue() >= 2500 && achievements[1] !== "💰" ) {
            achievements.push("💰")
        }
}

// FUNCTIONS for live
function liveSales() {
    let concatItems = ""
    for ( let i = 0; i < sales.length; i++ ) {
        concatItems += sales[i]
    }
    salesP.textContent = concatItems
    salesTitle.textContent = `Live Sales - ${ sales.length }`
}

function liveAchivements() {
    let concatItems = ""
    for ( let i = 0; i < achievements.length; i++ ) {
        concatItems += achievements[i]
    }
    achivementP.textContent = concatItems
    achivementTitle.textContent = `Live Achievements - ${ achievements.length }`
}

// FUNCTIONS for totals
function totalRevenue() {
    let subTotal = 0
    for (let i = 0; i < sales.length; i++) {
        if ( sales[i] === productA.emoji ) {
            subTotal += productA.revenue
        }  else if ( sales[i] === productB.emoji ) {
             subTotal += productB.revenue
        }
    }
    revenueP.textContent = `$ ${subTotal}`
    revenueP.style.letterSpacing = "0"
    return subTotal
}

function totalCommision() {
    let subTotal = 0
    for (let i = 0; i < sales.length; i++) {
        if ( sales[i] === productA.emoji ) {
            subTotal += productA.commision
        }  else if ( sales[i] === productB.emoji ) {
             subTotal += productB.commision
        }
    }
    commisionP.textContent = `$ ${subTotal}`
    commisionP.style.letterSpacing = "0"
    return subTotal
}