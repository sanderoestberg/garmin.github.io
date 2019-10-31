// This will let you use the .remove() function later on
if (!("remove" in Element.prototype)) {
  Element.prototype.remove = function() {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2FuZGVyb2UiLCJhIjoiY2sxengzdXJqMHR3dzNubXZvOHBpdnR5aSJ9.A6TG6pK8OUspJlBGePZgsQ";

// This adds the map to the page
var map = new mapboxgl.Map({
  // container id specified in the HTML
  container: "map",
  // style URL
  style: "mapbox://styles/sanderoe/ck202depo53bd1cp9y4yme2uz",
  // initial position in [lon, lat] format
  center: [10.1316, 56.168463],
  // initial zoom
  zoom: 16
});
// image dom//
var img = new Image();
img.src = "";

/////

/////
var stores = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [10.13139, 56.167685]
      },
      properties: {
        InfoFormatted: "Hvordan klare de sig under pigtråden",
        sucess: "",
        info: "Barbed Wire",
        forhindring:
          "<strong>BARDED WIRE</strong>  Kravlegården er en ægte klassiker! Pigtråden tvinger dig ned på alle 4!" +
          "<button onclick=window.open('livefeed.html#barbedwire','_self');>Se live..</button>" +
          "<button onclick=window.open('barbedwire.html','_self');>Se mere..</button>"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [, 10.130393, 56.168234]
      },
      properties: {
        InfoFormatted: "Kralv under en masse reb",
        sucess: "",
        info: "Kravl under en masser reb",
        forhindring:
          "<strong>BODY CRAWL</strong> Telefonenpælene har været med siden 2013 og har taget pusten af mange. De tværliggende stokke indeholder 4 faser, 2 x over og 2 x under." +
          "<button onclick=window.open('livefeed.html#barbedwire','_self');>Se live..</button>" +
          "<button onclick=window.open('newpage.html','_self');>Se mere..</button>"
      },
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [10.133204, 56.168668]
      },
      properties: {
        InfoFormatted: "Kralv over en masse reb",
        sucess: "",
        info: "Web Climb",
        forhindring:
          "<strong>WEB CLIMB</strong> et løsthængende net er udfordrende at klatre i." +
          "<br/>" +
          "<button onclick=window.open('livefeed.html#webclimb','_self');>Se live..</button>" +
          "<button onclick=window.open('webclimb.html','_self');>Se mere..</button>"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [10.131295, 56.168853]
      },
      properties: {
        InfoFormatted: "Test din overkropsstyrke på denne brutale forhindring",
        sucess: "",
        info: "EDGE",
        forhindring:
          "<strong>EDGE</strong>  er det nyeste skud på stammen af forhindringer, fra Nordic Race" +
          "</BR>" +
          "<button onclick=window.open('livefeed.html#edge','_self');>Live feed..</button>" +
          "<button onclick=window.open('edge.html','_self');>Se mere..</button>"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [10.132604, 56.168152]
      },
      properties: {
        InfoFormatted: "Test din overkropsstyrke på the big rig",
        sucess: "",
        info: "HIGH RIG",
        forhindring:
          "<strong>HIGH RIG</strong>  Få et godt greb, brug armene og få et godt sving i kroppen." +
          "<br/>" +
          "<button onclick=window.open('livefeed.html#highrig','_self');>Se live..</button>" +
          "<button onclick=window.open('barbedwire.html','_self');>Se mere..</button>"
      }
    }
  ]
};

///////

map.on("load", function(e) {
  // Add the data to your map as a layer
  map.addSource("places", {
    type: "geojson",
    data: stores
  });

  buildLocationList(stores);
});

function buildLocationList(data) {
  /// while data -

  // Iterate through the list of stores
  for (i = 0; i < data.features.length; i++) {
    var currentFeature = data.features[i];

    // Shorten data.feature.properties to just `prop` so we're not
    // writing this long form over and over again.
    var prop = currentFeature.properties;

    // Select the listing container in the HTML and append a div
    // with the class 'item' for each store
    var listings = document.getElementById("listings");
    var listing = listings.appendChild(document.createElement("div"));
    listing.className = "item";
    listing.id = "listing" + i;

    // Create a new link with the class 'title' for each store
    // and fill it with the store address
    var link = listing.appendChild(document.createElement("a"));
    link.href = "#";
    link.className = "title";
    link.dataPosition = i;
    link.innerHTML = prop.info;
    // Add an event listener for the links in the sidebar listing
    link.addEventListener("click", function(e) {
      // Update the currentFeature to the store associated with the clicked link
      var clickedListing = data.features[this.dataPosition];
      // 1. Fly to the point associated with the clicked link
      flyToStore(clickedListing);
      // 2. Close all other popups and display popup for clicked store
      createPopUp(clickedListing);
      // 3. Highlight listing in sidebar (and remove highlight for all other listings)
      var activeItem = document.getElementsByClassName("active");
      if (activeItem[0]) {
        activeItem[0].classList.remove("active");
      }
      this.parentNode.classList.add("active");
    });

    // Create a new div with the class 'details' for each store
    // and fill it with the city and phone number
    var details = listing.appendChild(document.createElement("div"));
    details.innerHTML = prop.info + "# " + prop.InfoFormatted;
    if (prop.sucess) {
      details.innerHTML += " &middot; " + prop.InfoFormatted;
    }
  }
}

//Function to fly to the correct store
function flyToStore(currentFeature) {
  map.flyTo({
    center: currentFeature.geometry.coordinates,
    zoom: 16
  });
}

//Function to display popup features
function createPopUp(currentFeature) {
  var popUps = document.getElementsByClassName("mapboxgl-popup");
  // Check if there is already a popup on the map and if so, remove it
  if (popUps[0]) popUps[0].remove();

  var popup = new mapboxgl.Popup({ closeOnClick: true })
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML(
      "<h3>Forhindring</h3>" +
        "<h4>" +
        currentFeature.properties.forhindring +
        "</h4>" +
        "<h4>" +
        currentFeature.properties.sucess +
        "</h4>"
      // +
      /// "<img>"
    )
    .addTo(map);
}

///////////////////////

//// Add an event listener for when a user clicks on the map

stores.features.forEach(function(marker) {
  // Create a div element for the marker
  var el = document.createElement("div");
  // Add a class called 'marker' to each div
  el.className = "marker";
  // By default the image for your custom marker will be anchored
  // by its center. Adjust the position accordingly
  // Create the custom markers, set their position, and add to map
  new mapboxgl.Marker(el, { offset: [0, -23] })
    .setLngLat(marker.geometry.coordinates)
    .addTo(map);
  el.addEventListener("click", function(e) {
    var activeItem = document.getElementsByClassName("active");
    // 1. Fly to the point
    flyToStore(marker);
    // 2. Close all other popups and display popup for clicked store
    createPopUp(marker);
    // 3. Highlight listing in sidebar (and remove highlight for all other listings)
    e.stopPropagation();
    if (activeItem[0]) {
      activeItem[0].classList.remove("active");
    }

    var listing = document.getElementById("listing-" + i);
    console.log(listing);
    listing.classList.add("active");
  });
});
////
map.scrollZoom.disable();

// click for reset function
$("#Topimage").click(function() {
  location.reload();
});

/////// popup////////

function myFunction() {
  //alert("I am an alert box!");

  document.getElementById("runnerpopup").style.visibility = "visible";
}
$(document).mouseup(function(e) {
  var container = $("Rmarker");

  // If the target of the click isn't the container
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    $("#runnerpopup").css("visibility", "hidden");
  }
});

////////counter bpm////

var count3 = 140;
countdown = function() {
  count3++;
  if (count3 > 150) {
    count3 = 140;
  }
  document.getElementById("bpm").innerHTML = count3 + " BPM";
};

////////counter Km/T////

var count4 = 10;
countdown = function() {
  count4++;
  if (count4 > 15) {
    count4 = 10;
  }
  document.getElementById("km").innerHTML = count4 + " Km/T";
};
