const inputbtn = document.getElementById("input-btn")
let myLeads = []
const inputel = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const deletebtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabbtn = document.getElementById("tab-btn")



if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderlead(myLeads)
}

tabbtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderlead(myLeads)
    })

})

inputbtn.addEventListener("click", function () {
    let input = inputel.value
    myLeads.push(input)
    inputel.value = " "
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderlead(myLeads)
})

deletebtn.addEventListener("dblclick", function () {
    ulEl.textContent = " "
    myLeads = []
    localStorage.clear()
})

function renderlead(lead) {
    let listItems = ""
    for (let i = 0; i < lead.length; i++) {
        listItems += `<li> <a target='_blank'  href='${lead[i]}'> ${lead[i]} </a> </li>`
    }
    ulEl.innerHTML = listItems
} 
