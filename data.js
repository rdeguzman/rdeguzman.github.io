var map, featureLayer;

var geojson = [
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [145.228883,-37.926672]
    },
    "properties": {
      "id": 1,
      "marker-color": "#D73C50",
      "marker-size": "large",
      "marker-symbol": "car",
      category: "Experience",
      date_to: "now",
      date_from: "07/25/2011",
      location: "Melbourne, Australia",
      title: "Software Developer",
      company: "Datalink Technologies Pty Ltd",
      description: "Develop proof of concept mobile applications to support underground asset management for Dial Before You Dig. Technologies include ObjectiveC, C# and Java, Oracle Spatial, Postgres/Postgis, Mapserver and Geoserver. Integration with Google, Bing Maps and deCarta (Java). Spatial analysis (i.e spatial intersections) and geometry transformation using FME."
    }
  },
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [144.97652500000004, -37.837833]
    },
    "properties": {
      "id": 2,
      "marker-color": "#0A2628",
      "marker-size": "large",
      "marker-symbol": "city",
      category: "Experience",
      date_to: "07/01/2011",
      date_from: "05/01/2011",
      location: "Melbourne, Australia",
      title: "iPhone Developer",
      company: "PlayUp / Revo Pty Ltd",
      description: "Develop proof of concept mobile applications to support underground asset management for Dial Before You Dig. Technologies include ObjectiveC, C# and Java, Oracle Spatial, Postgres/Postgis, Mapserver and Geoserver. Integration with Google, Bing Maps and deCarta (Java). Spatial analysis (i.e spatial intersections) and geometry transformation using FME."
    }
  },
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [144.987975, -37.806503]
    },
    "properties": {
      "id": 3,
      "marker-color": "#479C8C",
      "marker-size": "large",
      "marker-symbol": "america-football",
      category: "Experience",
      date_to: "05/01/2011",
      date_from: "05/01/2009",
      location: "Melbourne, Australia",
      title: "GIS and Mobile Developer",
      company: "PelicanCorp Pty Ltd",
      description: "Develop proof of concept mobile applications to support underground asset management for Dial Before You Dig. Technologies include ObjectiveC, C# and Java, Oracle Spatial, Postgres/Postgis, Mapserver and Geoserver. Integration with Google, Bing Maps and deCarta (Java). Spatial analysis (i.e spatial intersections) and geometry transformation using FME."
    }
  },
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [116.40752599999996, 39.90403]
    },
    "properties": {
      "id": 4,
      "marker-color": "#6EB4A4",
      "marker-size": "large",
      "marker-symbol": "suitcase",
      category: "Experience",
      date_to: "01/02/2009",
      date_from: "11/01/2006",
      location: "Beijing, China",
      title: "Team Lead / Tech Lead",
      company: "Cybersoft Beijing Information Technology",
      description: "Cybersoft Beijing is involved in providing mobile travel and mapping systems to telecom providers in China during the Beijing 2008 Olympics."
    }
  },
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [121.03002500000002, 14.639163]
    },
    "properties": {
      "id": 5,
      "marker-color": "#98CAB7",
      "marker-size": "large",
      "marker-symbol": "mobilephone",
      category: "Experience",
      date_to: "2006/10/01",
      date_from: "2004/05/01",
      location: "Manila, Philippines",
      title: "Systems Admin / Lead Developer",
      company: "Cybersoft Integrated Geoinformatics Inc",
      description: "Cybersoft GeoInformatics is responsible in providing GIS data and mapping capabilities to DPC YellowPages, Mapcentral Philippines and Telecom Providers. It also has extensive experience in vehicle asset tracking and monitoring thru PLDT."
    }
  }
];

function getShortDate(dt){
  var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];
  return monthNames[dt.getMonth()] + " " + dt.getFullYear();
}

function getFormattedDate(dtStart, dtEnd){
  var dateStart = new Date(dtStart);
  var dateEnd = (dtEnd == 'now') ? new Date() : new Date(dtEnd);
  return getShortDate(dateStart) + " - " + getShortDate(dateEnd);
}

function getDuration(dtStart, dtEnd){
  var dateStart = new Date(dtStart);
  var dateEnd = (dtEnd == 'now') ? new Date() : new Date(dtEnd);

  var diffInMilliseconds = Math.abs(dateStart - dateEnd);
  var one_day=1000*60*60*24;
  var days = diffInMilliseconds / one_day;
  var months = Math.floor(days / 30);
  var years = Math.floor(months / 12);
  var remainingMonths = months - (years * 12);

  var duration = "";

  if(years > 1) {
    duration = years + " yrs";
  }
  else if(years == 1) {
    duration = "1 yr";
  }

  if(remainingMonths > 1) {
    duration += " " + remainingMonths + " months";
  }
  else if(remainingMonths == 1) {
    duration += " 1 month";
  }

  return duration;
}

function createExperiences(){
  for(var i in geojson) {
    var ex = geojson[i].properties;
    var html;
    html  = "<div class='row'>";
    html += "  <div class='col-md-4'>";
    html += "    <strong>" + getDuration(ex.date_from, ex.date_to) + "</strong> <br/>";
    html += "    <small>" + getFormattedDate(ex.date_from, ex.date_to) + "</small> <br/>";
    html += "    <small>" + ex.location + "</small>";
    html += "  </div>";
    html += "  <div class='col-md-8 experience'>";
    html += "    <div class='title'><a href='javascript:openPopup(" + ex.id + ");'>" + ex.title + "</a></div>";
    html += "    <div class='company'>" + ex.company + "</div>";
    html += "  </div>";
    html += "</div>";

    $("#experiences").append(html);
  }
}

function initMap() {
  map = L.mapbox.map('map-canvas', 'rupert.hnb5c3da');

  featureLayer = L.mapbox.featureLayer(geojson).addTo(map);
  map.fitBounds(featureLayer.getBounds());
  map.setZoom(3);

  featureLayer.on('click', function(e) {
    map.panTo(e.layer.getLatLng());
  });
}

function openPopup(markerId) {
  featureLayer.eachLayer(function(marker) {
    if (marker.feature.properties.id === markerId) {
      marker.openPopup();
      map.panTo(marker.getLatLng());
    }
  });
}

$( document ).ready(function() {
  createExperiences();
  initMap();
});
