var firstPlayerCard = {
  name: "",
  score: 0,
  avatar: "",
};
var secondPlayerCard = {
  name: "",
  score: 0,
  avatar: "",
};
var thirdPlayerCard = {
  name: "",
  score: 0,
  avatar: "",
};
var fourthPlayerCard = {
  name: "",
  score: 0,
  avatar: "",
};

var playerCount = 2;
/* Difficulty level */
var difficultyLevel = 'easy';
var scoreJump = 1;
var currentPlayer = 1;

function confirmStartGame() {
  if (confirm('Are you sure you want to end this game and start again?')) {
    initialisePage();
  }
}

function initialisePage() {
  $("#select-player").val("2");
  $("#select-difficulty").val("Easy");
  $("#first-player-input").val("");
  $("#second-player-input").val("");
  $("#third-player-input").val("");
  $("#fourth-player-input").val("");
  $("#player-form-group-pair-row-1").css("display", "block");
  $("#player-form-group-pair-row-2").css("display", "none");
  $("#div-player1").css("display", "block");
  $("#div-player2").css("display", "block");
  $("#div-player3").css("display", "none");
  $("#div-player4").css("display", "none");
  $("#player-scores-row-1").css("display", "block");
  $("#player-scores-row-2").css("display", "none");
  $("#player1").css("display", "block");
  $("#player2").css("display", "block");
  $("#player3").css("display", "none");
  $("#player4").css("display", "none");
  $("#question").css("display", "none");
  $("#buttonBox").css("display", "none");
  $("#pieces-table").html("");
  $("#start-game").css("display", "none");
  $("#initial-selection").css("display", "block");
  $("#centre-piece-2").css("display", "none");
  $("#centre-piece-1").css("display", "block");
  firstPlayerCard = {
    name: "",
    score: 0,
    avatar: "",
  };
  secondPlayerCard = {
    name: "",
    score: 0,
    avatar: "",
  };
  thirdPlayerCard = {
    name: "",
    score: 0,
    avatar: "",
  };
  fourthPlayerCard = {
    name: "",
    score: 0,
    avatar: "",
  };
  playerCount = 2;
  difficultyLevel = 'easy';
  scoreJump = 1;
  currentPlayer = 1;
}

function getPlayerName(){
  switch (currentPlayer) {
    case 1:
      return firstPlayerCard.name;
    case 2:
      return secondPlayerCard.name;
    case 3:
      return thirdPlayerCard.name;
    case 4:
      return fourthPlayerCard.name;
      
  }
}

function setStage(stage){
  console.log('setStage', stage)
  const player= getPlayerName();
  if(stage==='afterRoll'){
   
    $(".info-header").html(player + ' make your move');
    $("#info-body").html('');
    /* Question box ID */
    $("#question-box-inner").html('');
  }
  else if(stage === 'afterMove') {
    $(".info-header").html( player +' answer the question');
    $("#info-body").html('')
  }
  else {
    $(".info-header").html( player +' roll the dice');
    $("#info-body").html('')
    /* Question box ID */
    $("#question-box-inner").html('');
  }
}

var icons = [];

function rollDice() {
  var audio = document.getElementById("audio");
  audio.play();
  setStage('afterRoll');
  const dice = [...document.querySelectorAll(".die-list")];
  dice.forEach((die) => {
    toggleClasses(die);
    die.dataset.roll = getRandomNumber(1, 6);
  });
}

function toggleClasses(die) {
  die.classList.toggle("odd-roll");
  die.classList.toggle("even-roll");
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function correctClick(buttonNumber) {
  /* Line  to change button color */
  $('#answer-button-' + buttonNumber).addClass('answer-correct');
 /* Timeout to allow color change before alert box */
  setTimeout(correctClick2, 200);
 }

/* Splitting correctClick function to allow color change before alert box */
function correctClick2() {
  alert("Correct Answer");
  score(true);
  setStage('roll');
}

function wrongClick(buttonNumber, correctButtonNumber) {
  /* ********************************************************************************************/
  /* change button color*/
  $('#answer-button-' + buttonNumber).addClass('answer-wrong');
  $('#answer-button-' + correctButtonNumber).addClass('answer-correct');
  /*  ********************************************************************************************/
  /* ********************************************************************************************/
  /* Timeoutto allow color change before alert box */
  setTimeout(wrongClick2, 200);
  /*  ********************************************************************************************/
}

/* **********************************************************************************************/
/* Splitting wrongClick function to allow color change before alert box */
function wrongClick2() {
  alert("Wrong Answer");
  score(false);
  setStage('roll');
}
/*  **********************************************************************************************/

function getQuestion() {
  /* ********************************************************************************************/
  /* Download 50 questions instead of just one then pick up a random one from them to avoid the same question */
                                                                                                      
  var randomIndex = Math.floor(Math.random() * 50);
  console.log("random index ", randomIndex);
  var url = "https://opentdb.com/api.php?amount=50&type=multiple&difficulty=" + difficultyLevel;
  console.log("url ", url);
  $.get(url, function (data) {
    const elem = data.results[randomIndex];
    /*  ******************************************************************************************/
    console.log("elem", elem);
    const answersArray = [
      `<button id="answer-button-1" onclick="wrongClick(1, 4);">${elem.incorrect_answers[0]}</button>`,
      `<button id="answer-button-2" onclick="wrongClick(2, 4);">${elem.incorrect_answers[1]}</button>`,
      `<button id="answer-button-3" onclick="wrongClick(3, 4);">${elem.incorrect_answers[2]}</button>`,
      `<button id="answer-button-4" onclick="correctClick(4);">${elem.correct_answer}</button>`,
    ];
    /* **********************************************************************************************/
    /* Question box ID*/
    $("#question-box-inner").html(`
    <p id="question">${elem.question}</p>
    <div id="buttonBox">
    ${randomArrayShuffle(answersArray).join("")}
    `);
    /*  **********************************************************************************************/
    /* **********************************************************************************************/
    /* Making sure question is displayed */
    $("#question").css("display", "block");
    $("#buttonBox").css("display", "block");
    /*  **********************************************************************************************/
    console.log("data", data);
  });
}
function randomArrayShuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

document.getElementById("roll-button-item").addEventListener("click", rollDice);

/* **********************************************************************************************/
/* Integrating winning sound with display */
function doWin(playerName) {
  var audio = document.getElementById("winner");
  audio.play();
  $("#centre-piece-1").css("display", "none");
  $("#centre-piece-2").show(100);
  $("#centre-piece-2-text").html(playerName + " Wins!");
}
/*  **********************************************************************************************/

function score(isCorrect) {
  if (isCorrect) {
    if (currentPlayer === 1) {
      firstPlayerCard.score = firstPlayerCard.score + scoreJump;
      $("#first-player-score").html(firstPlayerCard.score)
      if (firstPlayerCard.score >= 10) {
        /* **********************************************************************************************/
        /* Integrating winning sound with display */
        doWin(firstPlayerCard.name);
        /*  **********************************************************************************************/
      }
    } else if (currentPlayer === 2) {
      secondPlayerCard.score = secondPlayerCard.score + scoreJump;
      $("#second-player-score").html(secondPlayerCard.score)
      if (secondPlayerCard.score >= 10) {
        /* **********************************************************************************************/
        /* Integrating winning sound with display */
        doWin(secondPlayerCard.name);
        /*  **********************************************************************************************/
      }
    } else if (currentPlayer === 3) {
      thirdPlayerCard.score = thirdPlayerCard.score + scoreJump;
      $("#third-player-score").html(thirdPlayerCard.score)
      if (thirdPlayerCard.score >= 10) {
        /* **********************************************************************************************/
        /* Integrating winning sound with display */
        doWin(thirdPlayerCard.name);
        /*  **********************************************************************************************/
      }
    } else if (currentPlayer === 4) {
      fourthPlayerCard.score = fourthPlayerCard.score + scoreJump;
      $("#fourth-player-score").html(fourthPlayerCard.score)
      if (fourthPlayerCard.score >= 10) {
        /* **********************************************************************************************/
        /* Integrating winning sound with display */
        doWin(fourthPlayerCard.name);
        /*  **********************************************************************************************/
      }
    }
  } else {
    nextPlayer();
  }
  // testing line - doWin('Makhs'); // take out
}

function nextPlayer() {
  currentPlayer = (currentPlayer + 1) % (playerCount + 1);
  if(currentPlayer>=5){
    currentPlayer = currentPlayer % 5;
  }
  if(currentPlayer === 0){
    currentPlayer = 1;
  }
  console.log('currentPlayer', currentPlayer)
}

function skipPlayer() {
  nextPlayer();
  setStage('roll');
}

var gamescripts = (function () {
  var item = null;
  var wid = 6;

  return {
    init: function () {
      // install listeners for game pieces
      $(".gamepiece").each(function () {
        this.addEventListener("dragstart", gamescripts.drag_start, false);
      });

      // install listeners for master wedges
      $(".wedge").each(function () {
        this.addEventListener("dragstart", gamescripts.drag_start, false);
      });

      // install listeners on board
      document.body.addEventListener("dragover", gamescripts.drag_over, false);
      document.body.addEventListener("drop", gamescripts.drop, false);
    },

    drag_start: function (event) {
      item = event.target;
      console.log("dragged", item);
      var itemstyle = item.currentStyle || window.getComputedStyle(item, false);
      var bi = itemstyle.backgroundImage.slice(4, -1).replace(/"/g, "");
      console.log("bi", bi);
      var splittedArray = bi.split("/");
      var element = splittedArray[splittedArray.length - 1];
      element = element.replace(".png", "");
      if (element !== undefined) {
        var elementAudio = document.getElementById(element);
        console.log("element", element);
        console.log("element", typeof element);

        console.log("elementAudio", elementAudio);
        elementAudio.play();
      }
      var style = window.getComputedStyle(event.target, null);
      event.dataTransfer.setData(
        "text/plain",
        parseInt(style.getPropertyValue("left"), 10) -
          event.clientX +
          "," +
          (parseInt(style.getPropertyValue("top"), 10) - event.clientY)
      );
    },

    drag_over: function (event) {
      if (!item) return;
      event.preventDefault();
      return false;
    },

    drop: function (event) {
      console.log("item", item);
      console.log("event", event);
      if (!item) return;

      // allow game pieces to be dropped anywhere on the board
      if (
        item.getAttribute("data-draggable") == "gamepiece" &&
          /*  **********************************************************************************************/
          /* Target ID to new board piece ids */
        event.target.id == "board-piece"
          /* **********************************************************************************************/
      ) {
        var offset = event.dataTransfer.getData("text/plain").split(",");
        dm = document.getElementById(item.id);
        item.style.left = event.clientX + parseInt(offset[0], 10) + "px";
        item.style.top = event.clientY + parseInt(offset[1], 10) + "px";

        getQuestion();
      }

      // allow master wedges to be dropped into team score boxes
      if (
        item.getAttribute("data-draggable") == "master-wedge" &&
        $("#" + event.target.id)
          .parents("table:first")
          .attr("id") == "score-table"
      ) {
        gamescripts.master_wedge_helper(event);
      }

      // allow slave wedges to be deleted from team score boxes
      if (
        item.getAttribute("data-draggable") == "slave-wedge" &&
        $("#" + event.target.id)
          .parents("table:first")
          .attr("id") != "score-table"
      ) {
        gamescripts.slave_wedge_helper(event);
      }

      item = null;
      event.preventDefault();
      return false;
    },

    master_wedge_helper: function (event) {
      var colorid = item.id[1];
      var team = event.target.id;

      if (!team || team == undefined) return;

      // add wedge to table and give it a listener for dragstart
      $("#" + team).append(
        '<span id="w' +
          wid +
          '" class="wedge wedge' +
          colorid +
          '" draggable="true" data-draggable="slave-wedge">&#9660;</span>'
      );
      document
        .getElementById("w" + wid)
        .addEventListener("dragstart", gamescripts.drag_start, false);

      // increment wedge id
      wid += 1;
    },

    slave_wedge_helper: function (event) {
      $("#" + item.id).remove();
    },
  };
})();

$(function () {
  gamescripts.init();
});

/**select */
var firstIconSelect;
var secondIconSelect;
var thirdIconSelect;
var fourthIconSelect;

window.onload = function () {
  firstIconSelect = new IconSelect("my-icon-select", {
    selectedIconWidth: 48,
    selectedIconHeight: 48,
    selectedBoxPadding: 5,
    iconsWidth: 48,
    iconsHeight: 48,
    boxIconSpace: 3,
    vectoralIconNumber: 8,
    horizontalIconNumber: 1,
  });

  secondIconSelect = new IconSelect("second-player-select", {
    selectedIconWidth: 48,
    selectedIconHeight: 48,
    selectedBoxPadding: 5,
    iconsWidth: 48,
    iconsHeight: 48,
    boxIconSpace: 3,
    vectoralIconNumber: 8,
    horizontalIconNumber: 1,
  });

  thirdIconSelect = new IconSelect("third-player-select", {
    selectedIconWidth: 48,
    selectedIconHeight: 48,
    selectedBoxPadding: 5,
    iconsWidth: 48,
    iconsHeight: 48,
    boxIconSpace: 3,
    vectoralIconNumber: 8,
    horizontalIconNumber: 1,
  });

  fourthIconSelect = new IconSelect("fourth-player-select", {
    selectedIconWidth: 48,
    selectedIconHeight: 48,
    selectedBoxPadding: 5,
    iconsWidth: 48,
    iconsHeight: 48,
    boxIconSpace: 3,
    vectoralIconNumber: 8,
    horizontalIconNumber: 1,
  });

  icons.push({ iconFilePath: "./img/lion.png", iconValue: "1" });
  icons.push({ iconFilePath: "./img/hippo.png", iconValue: "2" });
  icons.push({ iconFilePath: "./img/koala.png", iconValue: "3" });
  icons.push({ iconFilePath: "./img/owl.png", iconValue: "4" });
  icons.push({ iconFilePath: "./img/snake.png", iconValue: "5" });
  icons.push({ iconFilePath: "./img/crocodile.png", iconValue: "6" });

  firstIconSelect.refresh(icons);
  secondIconSelect.refresh(icons);
  thirdIconSelect.refresh(icons);
  fourthIconSelect.refresh(icons);

  $("#select-player").on("change", function () {
    //ways to retrieve selected option and text outside handler
    console.log("Changed option value " + this.value);
    playerCount = this.value;
    console.log("Changed option value " + $("#first-player-input").val());
    console.log(
      "Changed option text " + $(this).find("option").filter(":selected").text()
    );
/* **********************************************************************************************/
/* Page Using display instead of visibility */
    switch ($(this).find("option").filter(":selected").text()) {
      case "2":
        $("#player-form-group-pair-row-1").css("display", "block");
        $("#player-form-group-pair-row-2").css("display", "none");
        $("#div-player1").css("display", "block");
        $("#div-player2").css("display", "block");
        $("#div-player3").css("display", "none");
        $("#div-player4").css("display", "none");
        $("#player-scores-row-1").css("display", "block");
        $("#player-scores-row-2").css("display", "none");
        $("#player1").css("display", "block");
        $("#player2").css("display", "block");
        $("#player3").css("display", "none");
        $("#player4").css("display", "none");
        break;
      case "3":
        console.log("3 selected");
        $("#player-form-group-pair-row-1").css("display", "block");
        $("#player-form-group-pair-row-2").css("display", "block");
        $("#div-player1").css("display", "block");
        $("#div-player2").css("display", "block");
        $("#div-player3").css("display", "block");
        $("#div-player4").css("display", "none");
        $("#player-scores-row-1").css("display", "block");
        $("#player-scores-row-2").css("display", "block");
        $("#player1").css("display", "block");
        $("#player2").css("display", "block");
        $("#player3").css("display", "block");
        $("#player4").css("display", "none");
        break;
      case "4":
        $("#player-form-group-pair-row-1").css("display", "block");
        $("#player-form-group-pair-row-2").css("display", "block");
        $("#div-player1").css("display", "block");
        $("#div-player2").css("display", "block");
        $("#div-player3").css("display", "block");
        $("#div-player4").css("display", "block");
        $("#player-scores-row-1").css("display", "block");
        $("#player-scores-row-2").css("display", "block");
        $("#player1").css("display", "block");
        $("#player2").css("display", "block");
        $("#player3").css("display", "block");
        $("#player4").css("display", "block");
        break;
    }
/*  **********************************************************************************************/
  });

  /* ********************************************************************************************/
  /* Handle difficulty */
  $("#select-difficulty").on("change", function () {
    console.log("Changed difficulty to " + this.value);
    difficultyLevel = this.value;
    difficultyLevel = difficultyLevel.toLowerCase();
    switch (difficultyLevel) {
      case 'easy':
        scoreJump = 1;
        break;
      case 'medium':
        scoreJump = 2;
        break;
      case 'hard':
        scoreJump = 3;
        break;
    }
  });

  initialisePage();
  $('#restart-clicked').click(function() { confirmStartGame(); } );
  $('#skip-player-clicked').click(function() { skipPlayer(); } );
  /*  ********************************************************************************************/
};
/**select */

/* **********************************************************************************************/
/* Trim function */
function trim(str) {
  str = String(str);
  str.trim();
  return str;
}
/*  **********************************************************************************************/

$("#play-clicked").click(function () {
  $("#initial-selection").css("display", "none");
/* **********************************************************************************************/
/* Page Using display instead of visibility */
  $("#start-game").css("display", "block");
/*  **********************************************************************************************/
  /* **********************************************************************************************/
  /* Amended to make sure names show up */
  var playerName1 = trim($("#first-player-input").val());
  if (playerName1 == '') {
    playerName1 = 'Player 1';
  }
  var playerName2 = trim($("#second-player-input").val());
  if (playerName2 == '') {
    playerName2 = 'Player 2';
  }
  var playerName3 = trim($("#third-player-input").val());
  if (playerName3 == '') {
    playerName3 = 'Player 3';
  }
  var playerName4 = trim($("#fourth-player-input").val());
  if (playerName4 == '') {
    playerName4 = 'Player 4';
  }
  $("#first-player-name").html(playerName1);
  $("#second-player-name").html(playerName2);
  $("#third-player-name").html(playerName3);
  $("#fourth-player-name").html(playerName4);
  $(".info-header").html(playerName1 + " roll the dice");
  $("#first-player-score").html("0");
  $("#second-player-score").html("0");
  $("#third-player-score").html("0");
  $("#fourth-player-score").html("0");
  firstPlayerCard.name = playerName1;
  firstPlayerCard.avatar = firstIconSelect.getSelectedValue();
  secondPlayerCard.name = playerName2;
  secondPlayerCard.avatar = secondIconSelect.getSelectedValue();
  thirdPlayerCard.name = playerName3;
  thirdPlayerCard.avatar = thirdIconSelect.getSelectedValue();
  fourthPlayerCard.name = playerName4;
  fourthPlayerCard.avatar = fourthIconSelect.getSelectedValue();
  /*  **********************************************************************************************/
  console.log("first icon selected", playerCount);
  var innerTable = "<tr>";
  innerTable += `<td><div id="p0" class="gamepiece" draggable="true" data-draggable="gamepiece" style=" background-color: rgb(67, 218, 67);
   background-image: url('${
     icons.find((i) => i.iconValue === firstPlayerCard.avatar).iconFilePath
   }'); background-size: contain; " ></div> </td>`;
  innerTable += `<td><div id="p1" class="gamepiece" draggable="true" data-draggable="gamepiece" style=" background-color: darkorange;
    background-image: url('${
      icons.find((i) => i.iconValue === secondPlayerCard.avatar).iconFilePath
    }'); background-size: contain; " ></div></td>`;
  if (playerCount === "3") {
    innerTable += `<td><div id="p2" class="gamepiece" draggable="true" data-draggable="gamepiece" style=" background-color: gold;
    background-image: url('${
      icons.find((i) => i.iconValue === thirdPlayerCard.avatar).iconFilePath
    }'); background-size: contain; " ></div></td>`;
  }
  if (playerCount === "4") {
    innerTable += `<td><div id="p2" class="gamepiece" draggable="true" data-draggable="gamepiece" style=" background-color: gold;
    background-image: url('${
      icons.find((i) => i.iconValue === thirdPlayerCard.avatar).iconFilePath
    }'); background-size: contain; " ></div></td>`;
    innerTable += `<td><div id="p3" class="gamepiece" draggable="true" data-draggable="gamepiece" style=" background-color: gray;
     background-image: url('${
       icons.find((i) => i.iconValue === fourthPlayerCard.avatar).iconFilePath
     }'); background-size: contain; " ></div></td>`;
  }
  innerTable += "</tr>";
  $("#pieces-table").append(innerTable);

  gamescripts.init();
});
