async function getApi() {
    let promise = await fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo")
    let data = await promise.json()
    // console.log(data["Time Series (Daily)"])

    // this is the object
    let dataObjects = data["Time Series (Daily)"]

    // to convert the object to an array of object
    // let dataArrayOfObjects = Object.entries(dataObjects).map((entry) => {
    //     return { [entry[0]]: entry[1] }
    // })
    // return dataArrayOfObjects
    return dataObjects
}

// to get the whole required object from the Api
let dataObj = await getApi()
console.log("dataObjects:", dataObj)

// to make the above object into an array of objects
let dataArrayOfObjects = Object.entries(dataObj).map((entry) => {
    return { [entry[0]]: entry[1] }
})
console.log("dataArrayOfObjects:", dataArrayOfObjects)


// to get the date keys as an array 
var dateArray = dataArrayOfObjects.map((obj) => {
    return Object.keys(obj).toString()
})
console.log("dateArray:", dateArray)


// to get the insde objects which are the values of date keys as an array of objects
var objArray = []
dataArrayOfObjects.forEach((obj) => {
    console.log("DataExtObjects", obj)
    for (let [key, value] of Object.entries(obj)) {
        console.log("DataInsideObject", value)
        objArray.push(value)
    }
});
console.log("DataArrayOfInsideObjects:", objArray)


// to add the date value from dateArray as an date key vlue pair to the objArray
for (let i = 0; i < objArray.length; i++) {
    objArray[i]["6. date"] = dateArray[i]
}
console.log("NewObjArrayWithDate", objArray)


// // function to make the above array of objects sorted by a required key
function sortByVolume(objArr) {
    let sortedByVolumeObjArray = objArr.sort((val_1, val_2) => val_2["5. volume"] - val_1["5. volume"])
    // console.log("sortedArrayofObjectsByVolume", sortedByVolumeObjArray)
    return sortedByVolumeObjArray
}


// to sort the objArray and store it in a new value
// let newObjArray = sortByVolume(objArray)
// console.log("NewSortedByVolumeObjArray", newObjArray)


function getTableRow(date, high, low, volume) {
    let tRow = document.createElement("tr")
    tRow.innerHTML = `
    <tr>
    
            <td>${date}</td>
    
            <td>${high}</td>
    
            <td>${low}</td>

            <td>${volume}</td>
    
    </tr>
    `
    return tRow
}

function populateDetails(newObjArr) {
    let tBody = document.getElementById("table-body")
    tBody.innerHTML = ""
    newObjArr.forEach((obj) => {
        let date = obj["6. date"]
        let high = obj["2. high"]
        let low = obj["3. low"]
        let volume = obj["5. volume"]
        let tRowContent = getTableRow(date, high, low, volume)
        tBody.append(tRowContent)
    })
}

let acceptanceHeader = document.querySelector("#questions-table > thead > tr > th:nth-child(4)")
acceptanceHeader.addEventListener("click", function () {
    var newSortedObjArray = sortByVolume(objArray)
    populateDetails(newSortedObjArray)

    // to populate without sorting
    // populateDetails(objArray)
})

// populateDetails(newObjArray)