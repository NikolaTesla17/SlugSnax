diningHalls = {};
maxFoodScore = 0;
bestFood = "Error Finding Food";
var time = new Date();
var hours = time.getHours();
var minutes = time.getMinutes();
j = 0;
hoursTillMealChange = 0;
minutesTillMealChange = 0;
maxDiningHallScore = 0;
backgroundColorScale = "Breakfast";

function setHoursRemaining(hoursOfSwap, minutesOfSwap, meal){
    if(hoursOfSwap-1-hours==0){
        document.getElementById("timeTillMealChange").innerHTML = meal + " - " + (minutesOfSwap-minutes) + " minutes left";
    }else{
        document.getElementById("timeTillMealChange").innerHTML = meal + " - " (hoursOfSwap-1-hours) + " hours and "+ (minutesOfSwap+60-minutes) + " minutes left";
    }
}

function setBgColor(points, id){
    if(backgroundColorScale == "Breakfast"){
        if(points>35){
            document.getElementById(id).style.backgroundColor = "#004800";
        }else if(points>30){
            document.getElementById(id).style.backgroundColor = "#134344";
        }else if(points>20){
            document.getElementById(id).style.backgroundColor = "#624F1C";
        }else if(points<20){
            document.getElementById(id).style.backgroundColor = "#420E0E";
        }
    }else if(backgroundColorScale == "Lunch"){
        if(points>50){
            document.getElementById(id).style.backgroundColor = "#004800";
        }else if(points>40){
            document.getElementById(id).style.backgroundColor = "#134344";
        }else if(points>30){
            document.getElementById(id).style.backgroundColor = "#624F1C";
        }else if(points<30){
            document.getElementById(id).style.backgroundColor = "#420E0E";
        }
    }else if(backgroundColorScale == "Dinner"){
        if(points>55){
            document.getElementById(id).style.backgroundColor = "#004800";
        }else if(points>45){
            document.getElementById(id).style.backgroundColor = "#134344";
        }else if(points>35){
            document.getElementById(id).style.backgroundColor = "#624F1C";
        }else if(points<35){
            document.getElementById(id).style.backgroundColor = "#420E0E";
        }
    }else if(backgroundColorScale == "Late Night"){
        if(points>35){
            document.getElementById(id).style.backgroundColor = "#004800";
        }else if(points>30){
            document.getElementById(id).style.backgroundColor = "#134344";
        }else if(points>20){
            document.getElementById(id).style.backgroundColor = "#624F1C";
        }else if(points<20){
            document.getElementById(id).style.backgroundColor = "#420E0E";
        }
    }else if(backgroundColorScale == "Continuous Dining"){
        if(points>50){
            document.getElementById(id).style.backgroundColor = "#004800";
        }else if(points>40){
            document.getElementById(id).style.backgroundColor = "#134344";
        }else if(points>30){
            document.getElementById(id).style.backgroundColor = "#624F1C";
        }else if(points<30){
            document.getElementById(id).style.backgroundColor = "#420E0E";
        }
    }
}

fetch('static/foodScores.json').then(response => response.json()).then(function(foodScores) {
fetch('https://ucsc.cc/api', {method: 'GET'}).then(function(response) { return response.json(); }).then(function(json) {
    for (var i = 0; i < json[0].halls.length; i++) {
        if (json[0].halls[i].name == "Porter/Kresge") {
            i++;
            break;
        }
        diningHalls[json[0].halls[i].name] = 0;
            if(7>hours){//pre breakfast'
            backgroundColorScale = "Breakfast";
                j = 0;
                if(7-hours==0){
                    if (minutes == 0){
                        document.getElementById("timeTillMealChange").innerHTML = "Breakfast - In 1 hour";
                    } else if (minutes=60){
                        document.getElementById("timeTillMealChange").innerHTML = "Breakfast - Imminent";
                    }
                    document.getElementById("timeTillMealChange").innerHTML = "Breakfast - In " + (60-minutes) + " minutes";
                }
                document.getElementById("timeTillMealChange").innerHTML = "Breakfast - In " + (7-hours) + " hours and " + (60-minutes) + " minutes";
            }
            else if(hours>=7&&11>hours){//breakfast
                j = 0;
                backgroundColorScale = "Breakfast";
                setHoursRemaining(11, 0, "Breakfast");
            }
            else if(hours==11&&30>minutes){//if in post breakfst
                j = 0;
                backgroundColorScale = "Breakfast";
                setHoursRemaining(11, 30, "Continuous Dining");
            }
            else if(hours<14){//if in lunch
                j=1;
                backgroundColorScale = "Lunch";
                setHoursRemaining(14, 0, "Lunch");
            }
            else if(hours>=14&&hours<17){//if in second continous dining
                j = 1;
                backgroundColorScale = "Breakfast";
                setHoursRemaining(17, 0, "Continuous Dining");
            }
            else if(hours>=17&&hours<20){//if in dinner
                j = 2;
                backgroundColorScale = "Dinner";
                setHoursRemaining(20, 0, "Dinner");
            }
            else if (hours>=20&&hours<23) {//if in late night
                j = 3;
                backgroundColorScale = "Late Night";
                setHoursRemaining(23, 0, "Late Night");
            } else if (hours >= 23){
                j = 0;
                backgroundColorScale = "Breakfast";
                if (minutes == 0){
                    document.getElementById("timeTillMealChange").innerHTML = "Breakfast - In 8 hours";
                } else if (minutes=60){
                    document.getElementById("timeTillMealChange").innerHTML = "Breakfast - In 7 hours";
                } else {
                    document.getElementById("timeTillMealChange").innerHTML = "Breakfast - In 7 hours and " + (60-minutes) + " minutes";
                }
            }
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
    document.getElementById("podiumTop").innerHTML = Object.keys(diningHalls).reduce(function(a, b){ return diningHalls[a] > diningHalls[b] ? a : b }) + document.getElementById("podiumTop").innerHTML;
    document.getElementById("topPoints").innerHTML = diningHalls[Object.keys(diningHalls).reduce(function(a, b){ return diningHalls[a] > diningHalls[b] ? a : b })] + document.getElementById("topPoints").innerHTML;
    document.getElementById("bestFood").innerHTML = bestFood;
    setBgColor(diningHalls[Object.keys(diningHalls).reduce(function(a, b){ return diningHalls[a] > diningHalls[b] ? a : b })], "topPodiumBg");
    delete diningHalls[Object.keys(diningHalls).reduce(function(a, b){ return diningHalls[a] > diningHalls[b] ? a : b })];
    mid = Object.keys(diningHalls).reduce(function(a, b){ return diningHalls[a] > diningHalls[b] ? a : b }).split("/")[0];
    if (mid == "College Nine"){mid = "College 9"}
    document.getElementById("podiumMid").innerHTML = mid;
    document.getElementById("midPoints").innerHTML = diningHalls[Object.keys(diningHalls).reduce(function(a, b){ return diningHalls[a] > diningHalls[b] ? a : b })];
    setBgColor(diningHalls[Object.keys(diningHalls).reduce(function(a, b){ return diningHalls[a] > diningHalls[b] ? a : b })], "midBg");
    delete diningHalls[Object.keys(diningHalls).reduce(function(a, b){ return diningHalls[a] > diningHalls[b] ? a : b })];
    participant = Object.keys(diningHalls).reduce(function(a, b){ return diningHalls[a] > diningHalls[b] ? a : b }).split("/")[0];
    if (participant == "College Nine"){participant = "College 9"}
    document.getElementById("participant").innerHTML = participant;
    document.getElementById("lowPoints").innerHTML = diningHalls[Object.keys(diningHalls).reduce(function(a, b){ return diningHalls[a] > diningHalls[b] ? a : b })];
    setBgColor(diningHalls[Object.keys(diningHalls).reduce(function(a, b){ return diningHalls[a] > diningHalls[b] ? a : b })], "lowBg");


    for (var i = 0; i < json[0].halls.length; i++) {//check if besst dining hall
        if (json[0].halls[i].name == "Porter/Kresge") {
            i++;
            break;
        }
        diningHalls[json[0].halls[i].name] = 0;
        for (var j = 0; j < json[0].halls[i].meals.length; j++){
            for (var k = 0; k < json[0].halls[i].meals[j].cats.length;k++){
                for (var x = 0; x < json[0].halls[i].meals[j].cats[k].foods.length; x++){
                    for (var y = 0;y < foodScores.length; y++){
                        if(foodScores[y].name == json[0].halls[i].meals[j].cats[k].foods[x].name){
                            diningHalls[json[0].halls[i].name] += foodScores[y].points;
                            if (diningHalls[json[0].halls[i].name] > maxDiningHallScore){
                                maxDiningHallScore = diningHalls[json[0].halls[i].name];
                            }
                        }
                    }
                }
            }
        }
    }

    if (diningHalls[Object.keys(diningHalls).reduce(function(a, b){ return diningHalls[a] > diningHalls[b] ? a : b })] == maxDiningHallScore){{
        document.getElementById("topPodiumBg").cssText = "border-top: 80px solid white;border-left: 80px solid red;"
    }
  }
});
});