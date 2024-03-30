  var reference = Date.now();
  var timer_running = false;


function initWebSocket(websocket) {
  websocket.onopen = function () {
    let event = {
      type: "connection",
    }
    websocket.send(JSON.stringify(event));
  }
}

function showMessage(message) {
  window.setTimeout(() => window.alert(message), 50);
}

function sendMsg(player, msg) {
  globalThis
  if (msg === "buzz") {
    var event = {
      type: "buzz",
      player: player,
    };
  }
  if (msg === "start") {
    var event = {
      type: "start",
      player: player,
    };
  }
  websocket.send(JSON.stringify(event));
}

function receiveMsg(websocket) {
  websocket.onmessage = function (event) {
    var msg = JSON.parse(event.data);
    console.log(msg);
    if (msg.type === "winner") {
      timer(msg.time*1000);
      document.getElementById("winner-announcement-div").style.display = "flex";
      document.getElementById("winner-announcement").innerHTML =
        "L' " +
        msg.player +
        " a buzzé en " +
        msg.time.toFixed(2) +
        "s !";
      timer_running = false;
    }
    if (msg.type === "start") {
      reference = Date.now();
      timer_running = true;
      document.getElementById("winner-announcement-div").style.display = "none";
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

window.addEventListener("DOMContentLoaded", () => {
  const websocket = new WebSocket("ws://" + window.location.hostname + ":8081/");
  globalThis.websocket = websocket;
  initWebSocket(websocket);
  receiveMsg(websocket);
  setInterval(timer, 10);
});

