//create js element node thing with an html string

function create(htmlStr) {
  var frag = document.createDocumentFragment(),
    temp = document.createElement("div");
  temp.innerHTML = htmlStr;
  while (temp.firstChild) {
    frag.appendChild(temp.firstChild);
  }
  return frag;
}

//creates a new Volcano_Map window
var addVolcano_Map = () => {
  container = document.getElementById("main-container");
  Volcano_Map = create(
    `<div class="part-container Volcano_Map" onmousedown = "goTop(this)" style="z-index:${returnTop()}"><div class="drag-bar" onmousedown="dragStart(this)"><p>Volcano_Map</p></div><button onclick="closeWindow(this)">×</button><iframe src="Parts/Volcano_Map/index.html"></iframe></div>`
  );
  container.appendChild(Volcano_Map);
};

//creates a new Quiz windows
var addQuiz = () => {
  container = document.getElementById("main-container");
  Quiz = create(
    `<div class="part-container Quiz" onmousedown = "goTop(this)" style="z-index:${returnTop()}"><div class="drag-bar" onmousedown="dragStart(this)"><p>Quiz</p></div><button onclick="closeWindow(this)">×</button><iframe src="Parts/Quiz/index.html"></iframe></div>`
  );
  container.appendChild(Quiz);
};

var addWeather = () => {
  container = document.getElementById("main-container");
  Weather = create(
    `<div class="part-container Weather" onmousedown = "goTop(this)" style="z-index:${returnTop()}"><div class="drag-bar" onmousedown="dragStart(this)"><p>Weather</p></div><button onclick="closeWindow(this)">×</button><iframe src="Parts/Weather/index.html"></iframe></div>`
  );
  container.appendChild(Weather);
};

var addAir_Quality = () => {
  container = document.getElementById("main-container");
  Air_Quality = create(
    `<div class="part-container Air_Quality" onmousedown = "goTop(this)" style="z-index:${returnTop()}"><div class="drag-bar" onmousedown="dragStart(this)"><p>Air_Quality</p></div><button onclick="closeWindow(this)">×</button><iframe src="Parts/Air_Quality/index.html"></iframe></div>`
  );
  container.appendChild(Air_Quality);
};

var addTimer = () => {
  container = document.getElementById("main-container");
  timer = create(
    `<div class="part-container timer" onmousedown = "goTop(this)" style="z-index:${returnTop()}"><div class="drag-bar" onmousedown="dragStart(this)"><p>Timer/Clock</p></div><button onclick="closeWindow(this)">×</button><iframe src="Parts/ClockTimer/index.html"></iframe></div>`
  );
  container.appendChild(timer);
};

//deletes window
var closeWindow = (element) => {
  element.parentNode.remove();
};

//makes window go to top when clicked
var goTop = (element) => {
  //gets all of the elements
  let elements = document.getElementsByClassName("part-container");
  let zI = 0;
  //loop throught and find the highest z_index, and subtract one from other z_indexes
  //so the number will not increase
  for (let i = 0; i < elements.length; i++) {
    let index = parseInt(elements[i].style.zIndex);
    if (!index) {
      index = 0;
    }
    if (index > parseInt(element.style.zIndex) && element != elements[i]) {
      elements[i].style.zIndex = parseInt(elements[i].style.zIndex) - 1;
    }
    if (index > zI) {
      zI = index;
    }
  }
  //set the z_index of the element to be the hightest
  element.style.zIndex = zI;
  zI = 0;
};

// returns the highest z-index so that all of the windows have differnt z-indexes
// used when new windows are added and makes it so that the windows all have different z_indexes
var returnTop = () => {
  let elements = document.getElementsByClassName("part-container");
  let zIndex = 0;
  for (let i = 0; i < elements.length; i++) {
    let index = parseInt(elements[i].style.zIndex);
    if (!index || index < 1) {
      index = 0;
      elements[i].style.zIndex = 0;
    }
    if (index > zIndex) {
      zIndex = index;
    }
  }

  return zIndex + 1;
};

//saving Air_Quality in localStorage so they don't disappear when reloaded
function saveWindow(posX, posY, zI, width, height, type) {
  this.posX = posX;
  this.posY = posY;
  this.zI = zI;
  this.width = width;
  this.height = height;
  this.type = type;
}

//makes json file and saves the windows in localStorages
function saveWindows() {
  let savedata = [];
  let savedWindows = document.getElementsByClassName("part-container");
  for (let i = 0; i < savedWindows.length; i++) {
    let win = savedWindows[i];
    savedata[i] = new saveWindow(
      win.style.left,
      win.style.top,
      win.style.zIndex,
      win.style.width,
      win.style.height,
      win.classList[1]
    );
  }
  localStorage.setItem("savedWindows", JSON.stringify(savedata));
}

//saves dark/light mode in localStorage
function saveTheme() {
  switch (appearance) {
    case "auto":
      localStorage.setItem("theme", "auto");
      break;
    default:
    case "dark":
      localStorage.setItem("theme", "dark");
      break;
    case "light":
      localStorage.setItem("theme", "light");
      break;
  }
}
//runs the saveWindows and saveTheme functions when page is reloaded
window.addEventListener("beforeUnload", () => {
  saveWindows();
  saveTheme();
});
window.addEventListener("unload", () => {
  saveWindows();
  saveTheme();
});

//loads in the saved windows
function loadWindows() {
  let savedata = JSON.parse(localStorage.getItem("savedWindows"));
  container = document.getElementById("main-container");
  for (let i = 0; i < savedata.length; i++) {
    switch (savedata[i].type) {
      case "Volcano_Map":
        Volcano_Map = create(
          `<div class="part-container Volcano_Map" onmousedown = "goTop(this)" style="z-index:${savedata[i].zI};left:${savedata[i].posX};top:${savedata[i].posY};width:${savedata[i].width};height:${savedata[i].height}"><div class="drag-bar" onmousedown="dragStart(this)"><p>Volcano_Map</p></div><button onclick="closeWindow(this)">×</button><iframe src="Parts/Volcano_Map/index.html"></iframe></div>`
        );
        container.appendChild(Volcano_Map);
        break;
      case "Weather":
        Weather = create(
          `<div class="part-container Weather" onmousedown = "goTop(this)" style="z-index:${savedata[i].zI};left:${savedata[i].posX};top:${savedata[i].posY};width:${savedata[i].width};height:${savedata[i].height}"><div class="drag-bar" onmousedown="dragStart(this)"><p>Weather</p></div><button onclick="closeWindow(this)">×</button><iframe src="Parts/Weather/index.html"></iframe></div>`
        );
        container.appendChild(Weather);
        break;
      case "Quiz":
        Quiz = create(
          `<div class="part-container Quiz" onmousedown = "goTop(this)" style="z-index:${savedata[i].zI};left:${savedata[i].posX};top:${savedata[i].posY};width:${savedata[i].width};height:${savedata[i].height}"><div class="drag-bar" onmousedown="dragStart(this)"><p>Quiz</p></div><button onclick="closeWindow(this)">×</button><iframe src="Parts/Quiz/index.html"></iframe></div>`
        );
        container.appendChild(Quiz);
        break;
      case "Air_Quality":
        Air_Quality = create(
          `<div class="part-container Air_Quality" onmousedown = "goTop(this)" style="z-index:${savedata[i].zI};left:${savedata[i].posX};top:${savedata[i].posY};width:${savedata[i].width};height:${savedata[i].height}"><div class="drag-bar" onmousedown="dragStart(this)"><p>Air_Quality</p></div><button onclick="closeWindow(this)">×</button><iframe src="Parts/Air_Quality/index.html"></iframe></div>`
        );
        container.appendChild(Air_Quality);
        break;
      case "timer":
        timer = create(
          `<div class="part-container timer" onmousedown = "goTop(this)" style="z-index:${savedata[i].zI};left:${savedata[i].posX};top:${savedata[i].posY};width:${savedata[i].width};height:${savedata[i].height}"><div class="drag-bar" onmousedown="dragStart(this)"><p>Timer/Clock</p></div><button onclick="closeWindow(this)">×</button><iframe src="Parts/ClockTimer/index.html"></iframe></div>`
        );
        container.appendChild(timer);
    }
  }
}

//loads the theme
function loadTheme() {
  let savedAppearance = localStorage.getItem("theme");
  switch (savedAppearance) {
    case "auto":
      auto();
      break;
    case "light":
      lightmode();
      break;
    case "dark":
      darkmode();
  }
}

//loads windows when the website loads
window.addEventListener("load", () => {
  loadWindows();
  loadTheme();
});

function clearAllWindows() {
  document.getElementById("main-container").innerHTML = "";
}

// key bindings

updatePageRotation = true;

function changeUpdatePageRotation(condition) {
  updatePageRotation = condition;
}

window.addEventListener("keydown", function (event) {
  if (event.shiftKey && event.keyCode == 78) {
    // new Air_Quality
    // shift + n
    addAir_Quality();
  }

  if (event.shiftKey && event.keyCode == 68) {
    // new dict
    // shift + d
    addWeather();
  }

  if (event.shiftKey && event.keyCode == 67) {
    addVolcano_Map();
  }

  if (event.shiftKey && event.keyCode == 84) {
    addTimer();
  }

  if (event.shiftKey && event.keyCode == 83) {
    addQuiz();
  }

  // if(event.ctrlKey && event.keyCode == 82){
  //     event.preventDefault()
  //     if(updatePageRotation){
  //         changeUpdatePageRotation(false)
  //         document.body.classList.add("transform")
  //     }
  // }
});

// notifications

function checkNotificationPromise() {
  try {
    Notification.requestPermission().then();
  } catch (e) {
    return false;
  }

  return true;
}

function askNotificationPermission() {
  // function to actually ask the permissions
  function handlePermission(permission) {
    // set the button to shown or hidden, depending on what the user answers
    if (
      Notification.permission === "denied" ||
      Notification.permission === "default"
    ) {
    } else {
    }
  }

  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications.");
  } else {
    if (checkNotificationPromise()) {
      Notification.requestPermission().then((permission) => {
        handlePermission(permission);
      });
    } else {
      Notification.requestPermission(function (permission) {
        handlePermission(permission);
      });
    }
  }
}

askNotificationPermission();
