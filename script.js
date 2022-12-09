// выбираем основные элементы в игре: аудиоплеер, блок Старт, блок Игры, кнопка Старт, кнопка Музыки, Игрок.
audioPlayer = document.querySelector("audio");
start = document.querySelector("#start");
gameBlock = document.querySelector("#game");
startBtn = document.querySelector("#startBtn");
soundBtn = document.querySelector("#sound img");
gamer = document.querySelector("#player");
score = document.querySelector("#score span");

gamerSkin = "skin_1";

// переменная - количество жизней
countLifes = 3;

// функция клика по кнопке старт - запуск функции старта игры
startBtn.onclick = function () {
    startGame();
}

// переменная для определения играет ли музыка или нет
sound = "off"; // "on"

// функция клика по кнопке Музыки (если музыка играет, то выключаем + меняем картинку, а если не играет, то включаем + меняем картинку)
soundBtn.onclick = function () {
    if (sound == "on") {
        soundBtn.src = "images/mute_sound.png";
        sound = "off";
        audioPlayer.pause();
    } else {
        soundBtn.src = "images/sound_on.png";
        sound = "on";
        audioPlayer.play();
    }
}

// функция клика по клавишам с keyCode=87(S), keyCode=83(W) и keyCode=32(пробел). Передвижение игрока вверх и вниз (с ограничением), выстрел
document.onkeydown = function (event) {
    if (event.keyCode == 87) {
        if (gamer.offsetTop > 79) {
            gamer.style.top = gamer.offsetTop - 40 + "px";
        }
    }
    if (event.keyCode == 83) {
        if (gamer.offsetTop < document.documentElement.clientHeight - 200) {
            gamer.style.top = gamer.offsetTop + 40 + "px";
        }
    }
    if (event.keyCode == 32) {
        createBullet();
    }
}

// функция старта игры (убирает стартовый блок, показывает блок игры, запускает функции движения "врагов")
function startGame() {
    start.style.display = "none";
    gameBlock.style.display = "block";
    gamer.className = gamerSkin;
    createLifes();
    createEnemy();
}

// функция создания "врагов"
function createEnemy() {
    isEnemyExist = document.querySelector(".enemy");
    if (isEnemyExist == null) {
        for (let i = 0; i < random(1, 5); i++) {
            let enemy = document.createElement("div");
            enemy.className = "enemy " + typeEnemy();
            enemy.style.top = random(110, document.documentElement.clientHeight - 150) + "px";
            gameBlock.appendChild(enemy);
            moveEnemy(enemy);
        }
    }
    listEnemy = document.querySelectorAll(".enemy");
}

// функция выбора типа врага (случайного)
function typeEnemy() {
    if (random(1, 2) == 1) {
        return "type-1";
    } else {
        return "type-2";
    }
}

// функция запуска движения "врагов"
function moveEnemy(enemy) {
    let timerID = setInterval(function () {
        enemy.style.left = enemy.offsetLeft - 10 + "px";
        if (enemy.offsetLeft < -100) {
            // удаляем "врага"
            enemy.remove();
            // остановить таймер
            clearInterval(timerID);
            // создание нового "врага"
            createEnemy();
            // уменьшение жизней
            die();
        }
    }, 80)
}

// функция создания пули
function createBullet() {
    let bullet = document.createElement("div");
    bullet.className = "bullet";
    bullet.style.top = gamer.offsetTop + 140 + "px";
    gameBlock.appendChild(bullet);
    bulletMove(bullet);
}

// функция запуска движения "пули"
function bulletMove(bullet) {
    let timerIdBullet = setInterval(function () {
        bullet.style.left = bullet.offsetLeft + 10 + "px";
        if (bullet.offsetLeft > document.querySelector("body").clientWidth) {
            // удаляем пулю
            bullet.remove();
            // остановить таймер
            clearInterval(timerIdBullet);
        }
        isBoom(bullet);
    }, 10)
}

// функция попадания пулей по врагу
function isBoom(bullet) {
    listEnemy.forEach(function (enemy) {
        if (bullet.offsetTop > enemy.offsetTop && bullet.offsetTop < enemy.offsetTop + enemy.clientHeight && bullet.offsetLeft > enemy.offsetLeft) {
            createBoom(enemy.offsetLeft, enemy.offsetTop);
            bullet.remove();
            enemy.remove();
            scoreChange();
            createEnemy();
        }
    })
}

// функция создания взрыва (boom)
function createBoom(enLeft, enTop) {
    let boom = document.createElement("div");
    boom.className = "boom";
    boom.style.left = enLeft - 42 + "px";
    boom.style.top = enTop - 40 + "px";
    gameBlock.appendChild(boom);
    setTimeout(function () {
        boom.remove();
    }, 1000)
}

// функция уменьшения жизней
function die() {
    countLifes = countLifes - 1;
    createLifes();
    if (countLifes <= 0) {
        endGame();
    }
}

// функция "рисования" жизней
function createLifes() {
    let lifesBlock = document.querySelector("#lifes");
    lifesBlock.innerHTML = "";
    let count = 0;
    while (count < countLifes) {
        let span = document.createElement("span");
        lifesBlock.appendChild(span);
        count = count + 1;
    }
}

// функция изменения очков
function scoreChange() {
    // score = document.querySelector("#score span");
    score.innerText = +score.innerText + 1;
}

// функция конца игры
function endGame() {
    let scoreBlock = document.querySelector("#end h3 span");
    scoreBlock.innerText = score.innerText;
    gameBlock.innerHTML = "";
    let endBlock = document.querySelector("#end");
    endBlock.style.display = "block";
    let restartBtn = document.querySelector("#end button");
    restartBtn.onclick = restart;
}

// функция по нажатию на кнупку рестарт
function restart() {
    location.reload();
}

// функция случайных чисел.
function random(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

// выбор скинов для игрока (gamer) и назначение клика мышки по ним.
selectSkin1 = document.querySelector("#skin_1");
selectSkin2 = document.querySelector("#skin_2");

selectSkin1.onclick = function () {
    selectSkin1.className = "selected";
    selectSkin2.className = "";
    gamerSkin = "skin_1";
}

selectSkin2.onclick = function () {
    selectSkin2.className = "selected";
    selectSkin1.className = "";
    gamerSkin = "skin_2";
}


