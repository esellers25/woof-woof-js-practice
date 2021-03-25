

fetch("http://localhost:3000/pups")
.then(res => res.json())
.then(function(returnObj){
    returnObj.forEach(createDogSpan)
})

function createDogSpan(dogObj){
    let dogBar = document.querySelector("#dog-bar")
    let dogButton = document.createElement("span")
    let dogInfo = document.querySelector("#dog-info")
    let dogPicture = document.querySelector("#dog-image")
    let dogName = document.querySelector("#dog-name")
    let goodDogButton = document.querySelector("#dog-button")
    dogButton.innerText = `${dogObj.name}` 
    dogBar.append(dogButton)

    dogButton.addEventListener("click", function(){
        dogPicture.src = dogObj.image 
        dogName.innerText = dogObj.name
        if (dogObj.isGoodDog === true) {
            goodDogButton.innerText = "Good Dog!"
        } else {
            goodDogButton.innerText = "Bad Dog!"
        }
        dogInfo.append(dogPicture, dogName, goodDogButton)        
    }) 
    
    let goodDog = false;
    goodDogButton.addEventListener("click", function(){
        goodDog = !goodDog;
        if (goodDog){
            goodDogButton.innerText = "Good Dog!"
        } else {
            goodDogButton.innerText = "Bad Dog!"
        }
        fetch(`http://localhost:3000/pups/${dogObj.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                isGoodDog: `${goodDog}` 
            })
        }).then(res => res.json())
            .then(function(newDogStatus){
                console.log(newDogStatus)
            })
            
        })
    }


        
