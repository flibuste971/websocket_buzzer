const websocket = new WebSocket("ws://localhost:8081/");
var reference = Date.now();
var timer_running = true;

window.addEventListener("DOMContentLoaded", () => {
  receiveMsg();
  setInterval(timer, 10);
});

window.addEventListener("keydown", (event) => {
  if (event.key == " " || event.key == "Space") {
    sendMsg("player", "buzz");
  }
});

function showMessage(message) {
  window.setTimeout(() => window.alert(message), 50);
}

function sendMsg(player, msg) {
  if (msg === "buzz") {
    var event = {
      type: "buzz",
      player: player,
    };
  }
  if (msg === "start" && player === "referee") {
    var event = {
      type: "start",
    };
  }
  websocket.send(JSON.stringify(event));
}

function receiveMsg() {
  websocket.onmessage = function (event) {
    var msg = JSON.parse(event.data);
    console.log(msg);
    if (msg.type === "winner") {
      timer(msg.time*1000);
      document.getElementById("winner-announcement").innerHTML =
        "Le " +
        msg.player +
        " a buzzé en " +
        msg.time.toFixed(2) +
        "s !";
      timer_running = false;
    }
    if (msg.type === "start") {
      reference = Date.now();
      timer_running = true;
      document.getElementById("winner-announcement").innerHTML = "";
    }
  };
}

function timer(setter) {
  let millisec = document.getElementById("chrono-millisec");
  let sec = document.getElementById("chrono-sec");
  let min = document.getElementById("chrono-min");
  if (timer_running) {
    if (setter) {
      var diff = setter;
      console.log(diff);
    } else {
      var diff = Date.now() - reference;

    }
    millisec.innerHTML =
      Math.floor(diff / 10) % 100 > 9
        ? Math.floor(diff / 10) % 100
        : "0" + (Math.floor(diff / 10) % 100);
    sec.innerHTML =
      Math.floor(diff / 1000) % 60 > 9
        ? Math.floor(diff / 1000) % 60
        : "0" + (Math.floor(diff / 1000) % 60);
    min.innerHTML = Math.floor(diff / 60000);
  }
}
