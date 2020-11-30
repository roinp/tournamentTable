const activeTournament = JSON.parse(localStorage.getItem("array"))
const newTournamentButton = document.getElementById('new-tournament');
const startWrapper = document.querySelector('.start-wrapper');
const startButton = document.getElementById('start');
const tournamentNameInput= document.getElementById('tournament-name');
const teamsWrapper = document.getElementById("teams");
const addTeamButton = document.getElementById('add-team');
const tournamentTable = document.getElementById('tournament-table');
const finishButton = document.getElementById('finish-button')
const historyButton = document.getElementById('button');
const nameDiv = document.getElementById("tournament-head");
const tournamentNameElement = document.createElement('p');
let tournamentName ="";

let history =JSON.parse(localStorage.getItem('history')) || [];

newTournamentButton.addEventListener('click', () => {
   newTournamentButton.classList.add("none");
   startWrapper.classList.remove("none");
})



addTeamButton.addEventListener('click',function(){
    const teamNameInput = document.createElement('input')
    teamsWrapper.appendChild(teamNameInput)
    teamNameInput.classList.add('input')
    teamNameInput.setAttribute('placeholder', teamNameInput.previousElementSibling.getAttribute("placeholder"));
    teamNameInput.focus();
});

startButton.addEventListener('click',() =>{
    if(!tournamentNameInput.value.trim()){
            alert("sheiyvane turniris saxeli");
            return;
    }

    const emptyArr = [];
    teamsWrapper.querySelectorAll("input").forEach(team => {
        if(team.value.trim()) {
            emptyArr.push(team.value.trim())
        }
    })

    if(emptyArr.length < 4){
        alert("sheiyvane minimum 4 gundi bliad");
        return;
    }

    emptyArr.forEach((team,index) => {
        createTeam(index+1,team);
    }); 

    
    createTable();
    createSelect();
    
    localStorage.setItem("teams", JSON.stringify(teams));
    startWrapper.classList.add("none");
    tournamentTable.classList.remove("none");
    tournamentName = tournamentNameInput.value;
    addName();
    localStorage.setItem("name", (tournamentName));


})


finishButton.addEventListener('click',() =>{
    localStorage.removeItem('teams');
    history.unshift({teams:teams, name:tournamentName});
    localStorage.setItem("history",JSON.stringify(history));
    window.location.reload(); 
});

function addName(){
    
    tournamentNameElement.textContent = tournamentName;
    nameDiv.appendChild(tournamentNameElement);
    nameDiv.classList.remove("none")
};

// historyButton.addEventListener('click',() =>{
//     teamsAraay = JSON.parse(localStorage.getItem("teams"))
// })

// old code

const trElement = document.getElementById('tbody')
const submitButton = document.getElementById('submit')
const firstValue = document.getElementById('value1')
const secondValue = document.getElementById('value2')
const teamSelect1 = document.getElementById('team1');
const teamSelect2 = document.getElementById('team2');



function Team(id,name){
    this.id=id;
    this.name =name;
    this.game = 0;
    this.goals=0;
    this.score=0;
};

function createTeam(id, name){
    teams.push(new Team(id, name));
};


function createTable() {
    tbody.innerHTML = ""
    teams.forEach((team,id) => {
     const tr = document.createElement('tr');
     const firstTd = document.createElement('td');
     const secondTd = document.createElement('td');
     const thirdTd = document.createElement('td');
     const fourthTd = document.createElement('td');
     const fiveTd = document.createElement('td');
     firstTd.textContent = ++id;
     secondTd.textContent = team.name;
     thirdTd.textContent = team.game;
     fourthTd.textContent = team.goals;
     fiveTd.textContent = team.score;
     trElement.appendChild(tr);
     tr.appendChild(firstTd);
     tr.appendChild(secondTd);
     tr.appendChild(thirdTd);
     tr.appendChild(fourthTd);
     tr.appendChild(fiveTd);
    }) 
}

function createSelect(){
    teams.forEach((team) => {
        const option1 = document.createElement('option')
        option1.textContent = team.name;
        option1.value = team.id;
        const option2 = document.createElement('option')
        option2.textContent = team.name;
        option2.value = team.id;
        teamSelect1.appendChild(option1);
        teamSelect2.appendChild(option2);
        
    });
}

function updadeLocalStorage(){
    localStorage.setItem("teams", JSON.stringify(teams));
}

function arraySort(){
    teams.sort((a, b) => {
        if(a.score > b.score){
            return -1
        }else{
            if(a.score < b.score){
                return 1
            }else {
                if(a.goals >= b.goals){
                    return -1 
                }else{
                    return 1
                }
            }
        }
        
    })
}


submitButton.addEventListener('click',function(){
    JSON.parse(localStorage.getItem('teams'));
    if(firstValue.value !==""&&secondValue.value !==""){
        let currentTeam1 = teams.find(team => team.id === +teamSelect1.value);
        let currentTeam2 = teams.find(team => team.id === +teamSelect2.value);
        currentTeam1.game++;
        currentTeam2.game++;
        if(+firstValue.value > +secondValue.value){
            currentTeam1.score += 3; 
        }else{
            if(+firstValue.value == +secondValue.value){
                currentTeam1.score++;
                currentTeam2.score++;
            }else{
                currentTeam2.score += 3;
            }
        }
        currentTeam1.goals =currentTeam1.goals + (firstValue.value - secondValue.value) 
        currentTeam2.goals =currentTeam2.goals + (secondValue.value - firstValue.value)
        arraySort();
        updadeLocalStorage();
        createTable();
    }
});

// PROGRAM

let teams = JSON.parse(localStorage.getItem("teams")) ||  [];
if(teams.length) {
    tournamentName = localStorage.getItem("name")
    addName();
    createTable();
    createSelect();
    tournamentTable.classList.remove("none");
    newTournamentButton.classList.add("none");
}





