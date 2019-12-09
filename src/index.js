debugger;
const { Elm } = require("./Main");

const css = require("../public/stylesheets/styles.css");
let mymap;

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    var app = Elm.Main.init({
      flags: {
        latitude,
        longitude
      }
    });
    debugger;
    mymap = L.map("mapid").setView([latitude, longitude], 14);
    const moveHandler = handleMove(app);
    L.tileLayer("http://tile.stamen.com/toner/{z}/{x}/{y}.png").addTo(mymap);
    mymap.on("moveend", moveHandler);
    app.ports.sendLocation.subscribe(function(data) {
      console.log("LOCATION: ", data);
      // L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mymap);
    });
    app.ports.sendEvents.subscribe(function(data) {
      console.log(data);
    });
  });
} else {
  app = Elm.Main.init({
    flags: { latitude: "10", longitude: "10" }
  });
  app.ports.sendLocation.subscribe(function(data) {
    console.log("LOCATION: ", data);
    mymap = L.map("mapid").setView([49.2727, -123.1213], 14);
    // L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mymap);
    L.tileLayer("http://tile.stamen.com/toner/{z}/{x}/{y}.png").addTo(mymap);
  });
}

const handleMove = app => {
  return event => {
    const { lat, lng } = event.target.getCenter();
    console.log("DRAGGED");
    app.ports.receiveLocation.send({ latitude: lat, longitude: lng });
  };
};
