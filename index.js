fetch('static/foodScores.json').then(response => response.json()).then(function(foodScores) {
fetch('https://ucsc.cc/api', {method: 'GET'}).then(function(response) { return response.json(); }).then(function(json) {
    diningHalls = {};
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
                            diningHalls[json[0].halls[i].name] += foodScores[y].points;
                        }
                    }
                }
            }
        }
    }
    switch (Object.keys(diningHalls).reduce(function(a, b){ return diningHalls[a] > diningHalls[b] ? a : b })){
        case "Cowell/Stevenson":
            document.getElementById("first").innerHTML = "Cowell/Stevenson" + document.getElementById("first").innerHTML;
    }
});
});