fetch('static/foodScores.json').then(response => response.json()).then(function(foodScores) {
fetch('https://ucsc.cc/api', {method: 'GET'}).then(function(response) { return response.json(); }).then(function(json) {
    diningHalls = {};
    maxFoodScore = 0;
    bestFood = "Error Finding Food";
    for (var i = 0; i < json[0].halls.length; i++) {
        if (json[0].halls[i].name == "Porter/Kresge") {
            i++;
            break;
        }
        diningHalls[json[0].halls[i].name] = 0;
        for (var j = 0; j < json[0].halls[i].meals.length; j++) {
            for (var k = 0; k < json[0].halls[i].meals[j].cats.length;k++){
                for (var x = 0; x < json[0].halls[i].meals[j].cats[k].foods.length; x++){
                    for (var y = 0;y < foodScores.length; y++){
                        if(foodScores[y].name == json[0].halls[i].meals[j].cats[k].foods[x].name){
                            if(foodScores[y].points>maxFoodScore){
                                maxFoodScore = foodScores[y].points;
                                bestFood = foodScores[y].name;
                            }
                            diningHalls[json[0].halls[i].name] += foodScores[y].points;
                        }
                    }
                }
            }
        }
    }
    document.getElementById("podiumTop").innerHTML = Object.keys(diningHalls).reduce(function(a, b){ return diningHalls[a] > diningHalls[b] ? a : b }) + document.getElementById("podiumTop").innerHTML;
    document.getElementById("topPoints").innerHTML = diningHalls[Object.keys(diningHalls).reduce(function(a, b){ return diningHalls[a] > diningHalls[b] ? a : b })] + document.getElementById("topPoints").innerHTML;
    document.getElementById("bestFood").innerHTML = bestFood;
    delete diningHalls[Object.keys(diningHalls).reduce(function(a, b){ return diningHalls[a] > diningHalls[b] ? a : b })];
    mid = Object.keys(diningHalls).reduce(function(a, b){ return diningHalls[a] > diningHalls[b] ? a : b }).split("/")[0];
    if (mid == "College Nine"){mid = "College 9"}
    document.getElementById("podiumMid").innerHTML = mid;

    delete diningHalls[Object.keys(diningHalls).reduce(function(a, b){ return diningHalls[a] > diningHalls[b] ? a : b })];
    participant = Object.keys(diningHalls).reduce(function(a, b){ return diningHalls[a] > diningHalls[b] ? a : b }).split("/")[0];
    if (participant == "College Nine"){participant = "College 9"}
    document.getElementById("participant").innerHTML = participant;
});
});