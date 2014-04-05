var map, marker_bounds;

var experiences = [
  {
    type: "Experience",
    date_to: "now",
    date_from: "07/25/2011",
    location: "Melbourne, Australia",
    title: "Software Developer",
    company: "Datalink Technologies Pty Ltd",
    latitude: -37.926672,
    longitude: 145.228883,
    description: "Develop proof of concept mobile applications to support underground asset management for Dial Before You Dig. Technologies include ObjectiveC, C# and Java, Oracle Spatial, Postgres/Postgis, Mapserver and Geoserver. Integration with Google, Bing Maps and deCarta (Java). Spatial analysis (i.e spatial intersections) and geometry transformation using FME."
  },
  {
    type: "Experience",
    date_to: "07/01/2011",
    date_from: "05/01/2011",
    location: "Melbourne, Australia",
    title: "iPhone Developer",
    company: "PlayUp / Revo Pty Ltd",
    latitude: -37.837833,
    longitude: 144.97652500000004,
    description: "Develop proof of concept mobile applications to support underground asset management for Dial Before You Dig. Technologies include ObjectiveC, C# and Java, Oracle Spatial, Postgres/Postgis, Mapserver and Geoserver. Integration with Google, Bing Maps and deCarta (Java). Spatial analysis (i.e spatial intersections) and geometry transformation using FME."
  },
  {
    type: "Experience",
    date_to: "05/01/2011",
    date_from: "05/01/2009",
    location: "Melbourne, Australia",
    title: "Mobile Developer",
    company: "PelicanCorp Pty Ltd",
    latitude: -37.806503,
    longitude: 144.987975,
    description: "Develop proof of concept mobile applications to support underground asset management for Dial Before You Dig. Technologies include ObjectiveC, C# and Java, Oracle Spatial, Postgres/Postgis, Mapserver and Geoserver. Integration with Google, Bing Maps and deCarta (Java). Spatial analysis (i.e spatial intersections) and geometry transformation using FME."
  },
  {
    type: "Experience",
    date_to: "01/02/2009",
    date_from: "11/01/2006",
    location: "Beijing, China",
    title: "Team Lead / Tech Lead",
    company: "Cybersoft Beijing Information Technology",
    latitude: 39.90403,
    longitude: 116.40752599999996,
    description: "Cybersoft Beijing is involved in providing mobile travel and mapping systems to telecom providers in China during the Beijing 2008 Olympics."
  },
  {
    type: "Experience",
    date_to: "2006/10/01",
    date_from: "2004/05/01",
    location: "Manila, Philippines",
    title: "Systems Admin / Lead Developer",
    company: "Cybersoft Integrated Geoinformatics Inc",
    latitude: 14.639163,
    longitude: 121.03002500000002,
    description: "Cybersoft GeoInformatics is responsible in providing GIS data and mapping capabilities to DPC YellowPages, Mapcentral Philippines and Telecom Providers. It also has extensive experience in vehicle asset tracking and monitoring thru PLDT."
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
  for(var i in experiences) {
    var ex = experiences[i];
    var html;
    html  = "<div class='row'>";
    html += "  <div class='col-md-4'>";
    html += "    <strong>" + getDuration(ex.date_from, ex.date_to) + "</strong> <br/>";
    html += "    <small>" + getFormattedDate(ex.date_from, ex.date_to) + "</small> <br/>";
    html += "    <small>" + ex.location + "</small>";
    html += "  </div>";
    html += "  <div class='col-md-8 experience'>";
    html += "    <div class='title'>" + ex.title + "</div>";
    html += "    <div class='company'>" + ex.company + "</div>";
    html += "  </div>";
    html += "</div>";

    $("#experiences").append(html);
  }
}

function initMap() {
  var mapOptions = {
    center: new google.maps.LatLng(-34.397, 150.644),
    zoom: 8
  };

  markers_bounds = new google.maps.LatLngBounds();

  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

  for(var i in experiences) {
    var data = experiences[i];
    createMarker(data);
  }
}

function createMarker(data){
  var myLatlng = new google.maps.LatLng(data.latitude, data.longitude);

  var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: map.title + ' - ' + map.company
  });

  var contentString;
  contentString =  "<div>";
  contentString += "  <strong>" + data.title +"</strong> <br/>";
  contentString += "  <strong>" + data.company +"</strong> <br/>";
  contentString += "  <p>" + data.description +"</p>";
  contentString += "</div>";

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });

  markers_bounds.extend(myLatlng);
  map.fitBounds(markers_bounds);
}

$( document ).ready(function() {
  createExperiences();
  initMap();
});
