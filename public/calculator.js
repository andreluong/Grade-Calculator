var numActivities = 4;

document.getElementById("addActivity").addEventListener("click", addActivity);

function addActivity(){
    numActivities++;
    var table = document.getElementById("table");
    var row = table.insertRow(table.rows.length);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);

    var inputWeight = document.createElement("input");
    inputWeight.type = "number";
    inputWeight.id = "weight_" + numActivities;

    var inputGrade1 = document.createElement("input");
    inputGrade1.type = "number";
    inputGrade1.id = "grade1_" + numActivities;
    inputGrade1.addEventListener("keyup", computePercent);

    var inputGrade2 = document.createElement("input");
    inputGrade2.type = "number";
    inputGrade2.id = "grade2_" + numActivities;
    inputGrade2.addEventListener("keyup", computePercent);

    var outputPercentage = document.createElement("p");
    outputPercentage.id = "percent_" + numActivities;

    var slash = document.createTextNode(" / "); 

    cell1.innerHTML = "Activity " + numActivities;
    cell2.innerHTML = "A" + numActivities;

    cell3.appendChild(inputWeight);   
    cell4.appendChild(inputGrade1);
    cell4.appendChild(slash);
    cell4.appendChild(inputGrade2);
    cell5.appendChild(outputPercentage);
}

function computePercent(){
    for(let i = 1; i <= numActivities; i++){
        var grade1 = document.getElementById("grade1_" + i).value;
        var grade2 = document.getElementById("grade2_" + i).value;
        var percentage = grade1 / grade2 * 100;

        if(!isNaN(percentage)){
            percentage = (Math.round(percentage * 100) / 100).toFixed(2);
            document.getElementById("percent_" + i).value = percentage;
            document.getElementById("percent_" + i).innerHTML = percentage + '%';
        }
    }
}

document.getElementById("mean").addEventListener("click", computeMean);

function computeMean(){
    var sumGrades = 0;
    var numGrades = 0;
    for(let i = 1; i <= numActivities; i++){
        var percentage = parseFloat(document.getElementById("percent_" + i).value);
        if(!isNaN(percentage) && isFinite(percentage)){
            sumGrades += percentage;
            numGrades++;
        }
    }
    var mean = sumGrades / numGrades;
    mean = (Math.round(mean * 100) / 100).toFixed(2);
    document.getElementById("result").innerHTML = "Mean of grades: " + mean;
}

document.getElementById("weighted").addEventListener("click", computeWeighted);

function computeWeighted(){
    var sumScores = 0;
    var sumWeights = 0;
    for(let i = 1; i <= numActivities; i++){
        var percentage = parseFloat(document.getElementById("percent_" + i).value);
        var weight = parseInt(document.getElementById("weight_" + i).value);
        if(!(isNaN(percentage) || isNaN(weight)) && isFinite(percentage)){
            sumScores += percentage * weight;
            sumWeights += weight;
        }
    }
    var weighted = sumScores / sumWeights;
    weighted = (Math.round(weighted * 100) / 100).toFixed(2);
    document.getElementById("result").innerHTML = "Weighted grades: " + weighted;
}