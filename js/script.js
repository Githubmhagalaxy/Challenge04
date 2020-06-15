let initials = [
    {init: "AB", score: 22},
    {init: "bc", score: 22},
    {init: "cd", score: 22},
    {init: "de", score: 22},
    {init: "ef", score: 22}
];
let timer;
let index = 0;
let time = 75;
const sections = document.getElementsByTagName('section');
const questions = document.querySelectorAll('.questions section');
const showAllScores = () => {
    let ul = "", li = "";
    initials.forEach((elem, i) => {
        li = `<li>${i+1}. ${elem.init} - ${elem.score}</li>`;
        ul += li;
    });
    document.getElementById('scoresList').innerHTML = ul;
    for (let item of sections) {
        item.classList.add('d-none');
    }
    document.getElementsByClassName('show-scores')[0].classList.remove('d-none');
};
const handleStart = (elem) => {
    sections[0].classList.add('d-none');
    document.getElementById(`question${index}`).classList.remove('d-none');
    document.getElementById('time').innerHTML = time;
    timer = setInterval(() => {
        if(time > 0) {
            time -= 1;
            document.getElementById('time').innerHTML = time;
        } else {
            finish();
            clearInterval(timer);
        }
    }, 1000);
};
const handleAnswer = (elem) => {
    document.getElementById(`question${index}`).classList.add('d-none');
    if(index < questions.length - 1) {
        index++;
    } else {
        finish();
        return;
    }
    if(elem.dataset.value === "1") {
        document.querySelector(`#question${index} .resultText`).innerHTML = "Correct!";
    } else {
        document.querySelector(`#question${index} .resultText`).innerHTML = "Wrong!";
        time -= 10;
    }
    document.getElementById(`question${index}`).classList.remove('d-none');
};
const finish = () => {
    clearInterval(timer);
    for (let item of sections) {
        item.classList.add('d-none');
    }
    document.querySelector('section.finish').classList.remove('d-none');
};
const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
        init: document.getElementById('initials').value,
        score: time
    };
    initials.push(data);
    showAllScores();
};
const goBackFun = () => {
    time = 75;
    index = 0;
    document.getElementById('initials').value = "";
    for (let item of sections) {
        item.classList.add('d-none');
    }
    document.querySelector('.start').classList.remove('d-none');
};
const clearHighScores = () => {
    initials = Array();
    showAllScores();
};