const tableWrapper = document.getElementById('table-wrapper');

let tournaments = JSON.parse(localStorage.getItem("history"));

if(tournaments) {
    createTable();
}

function addName(){
    
};


function createTable() {
    for(let i = 0; i < tournaments.length; i++){
        const nameElement = document.createElement('h2');
        tableWrapper.appendChild(nameElement)
        nameElement.textContent = tournaments[i].name
        const table = document.createElement("table");
        tableHead(table);
        tableWrapper.appendChild(table)
        const tbody = document.createElement('tbody');
        table.appendChild(tbody);
        tbody.innerHTML = ""
        tournaments[i].teams.forEach((team,id) => {
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
        tbody.appendChild(tr);
        tr.appendChild(firstTd);
        tr.appendChild(secondTd);
        tr.appendChild(thirdTd);
        tr.appendChild(fourthTd);
        tr.appendChild(fiveTd);
    });
  }
}

function tableHead(table) {
    const thead = document.createElement('thead');
    table.appendChild(thead);
    const th1 = document.createElement('th');
    thead.appendChild(th1);
    th1.textContent = "#"
    const th2 = document.createElement('th');
    thead.appendChild(th2);
    th2.textContent = "T E A M"
    const th3 = document.createElement('th');
    thead.appendChild(th3);
    th3.textContent = "G A M E S"
    const th4 = document.createElement('th');
    thead.appendChild(th4);
    th4.textContent = "G O A L S"
    const th5 = document.createElement('th');
    thead.appendChild(th5);
    th5.textContent = "S C O R E"
}
