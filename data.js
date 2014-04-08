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
      "icon": "pin-l-car+D73C50@2x.png",
      "category": "Experience",
      "date_to": "now",
      "date_from": "07/25/2011",
      "location": "Melbourne, Australia",
      "title": "Software Developer",
      "company": "Datalink Technologies Pty Ltd",
      "description": "Datalink delivers nation-wide fleet management and GPS tracking to the transport industry.",
      "technology": ["android","apache","ci","freebsd","java","javascript","jenkins","jira","geoserver","google maps","mobile","postgres","postgis","rspec","ruby","ruby on rails","web mapping"]
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
      "marker-color": "#479C8C",
      "marker-size": "large",
      "marker-symbol": "america-football",
      "icon": "pin-l-america-football+479C8C@2x.png",
      "category": "Experience",
      "date_to": "07/01/2011",
      "date_from": "05/01/2011",
      "location": "Melbourne, Australia",
      "title": "iPhone Developer",
      "company": "PlayUp / Revo Pty Ltd",
      "description": "PlayUp is a mobile-based social network and commercial platform driven by sport.",
      "technology": ["mobile","objective-c"]
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
      "marker-color": "#0A2628",
      "marker-size": "large",
      "marker-symbol": "city",
      "icon": "pin-l-city+0A2628@2x.png",
      "category": "Experience",
      "date_to": "05/01/2011",
      "date_from": "05/01/2009",
      "location": "Melbourne, Australia",
      "title": "GIS and Mobile Developer",
      "company": "PelicanCorp Pty Ltd",
      "description": "PelicanCorp support underground asset management for Dial Before You Dig and utility companies.",
      "technology": ["c#","bing maps","geoserver","google maps","mobile","objective-c","openlayers","oracle spatial","postgres","postgis","web mapping"]
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
      "icon": "pin-l-suitcase+6EB4A4@2x.png",
      "category": "Experience",
      "date_to": "01/02/2009",
      "date_from": "11/01/2006",
      "location": "Beijing, China",
      "title": "Team Lead / Tech Lead",
      "company": "Cybersoft Beijing Information Technology",
      "description": "Cybersoft Beijing provides mobile travel and mapping systems to telecom providers in China during the Beijing 2008 Olympics.",
      "technology": ["apache","centos","coldfusion","c#","extjs","javascript","gps","lbs","linux","mapinfo","mapserver","mapnik","mobile","mysql","openlayers","oracle spatial","postgres","postgis","ruby","ruby on rails","sms","web mapping"]
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
      "icon": "pin-l-mobilephone+98CAB7@2x.png",
      "category": "Experience",
      "date_to": "2006/10/01",
      "date_from": "2004/05/01",
      "location": "Manila, Philippines",
      "title": "Systems Admin / Lead Developer",
      "company": "Cybersoft Integrated Geoinformatics Inc - CIGI",
      "description": "Cybersoft GeoInformatics provides GIS data and mapping capabilities to Telecom Providers in the Philippines",
      "technology": ["apache","centos","coldfusion","java","javascript","gps","kannel","lbs","linux","mapserver","mapinfo","mobile","mysql","openlayers","sms","web mapping"]
    }
  },
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [121.058451, 14.581169]
    },
    "properties": {
      "id": 7,
      "marker-color": "#98CAB7",
      "marker-size": "large",
      "marker-symbol": "mobilephone",
      "icon": "pin-l-mobilephone+98CAB7@2x.png",
      "category": "Experience",
      "date_to": "2003/06/01",
      "date_from": "2003/01/01",
      "location": "Manila, Philippines",
      "title": "Tech Support Engineer",
      "company": "Sykes Asia + Macromedia",
      "description": "Macromedia outsourced its technical support to a call center in the Philippines (Sykes Asia) ",
      "technology": ["apache","coldfusion","linux","mysql","redhat"]
    }
  },
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [121.033972, 14.642308]
    },
    "properties": {
      "id": 8,
      "marker-color": "#98CAB7",
      "marker-size": "large",
      "marker-symbol": "mobilephone",
      "icon": "pin-l-mobilephone+98CAB7@2x.png",
      "category": "Experience",
      "date_to": "2002/12/30",
      "date_from": "2002/06/01",
      "location": "Manila, Philippines",
      "title": "Coldfusion Developer",
      "company": "KSDI Knowledge Systems Developers Inc - KSDI",
      "description": "KSDI is a five-man travel startup deriving its projects from the Cybersoft Group.",
      "technology": ["apache","coldfusion","linux","mysql","redhat"]
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

function getDurationInMonths(dtStart, dtEnd){
  var dateStart = new Date(dtStart);
  var dateEnd = (dtEnd == 'now') ? new Date() : new Date(dtEnd);

  var diffInMilliseconds = Math.abs(dateStart - dateEnd);
  var one_day=1000*60*60*24;
  var days = diffInMilliseconds / one_day;
  var months = Math.floor(days / 30);
  return months;
}

function getDuration(dtStart, dtEnd){
  var months = getDurationInMonths(dtStart, dtEnd);
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
    html += "  <div class='col-md-4 text-right'>";
    html += "    <strong>" + getDuration(ex.date_from, ex.date_to) + "</strong> <br/>";
    html += "    <small>" + getFormattedDate(ex.date_from, ex.date_to) + "</small> <br/>";
    html += "    <small>" + ex.location + "</small>";
    html += "  </div>";
    html += "  <div class='col-md-1'>";
    html += "    <img class='img-circle' width='35' height='90' src='/images/" + ex.icon +"'/>";
    html += "  </div>";
    html += "  <div class='col-md-7 experience'>";
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
  map.setZoom(2);

  featureLayer.on('click', function(e) {
    map.panTo(e.layer.getLatLng());
  });
}

function openPopup(markerId) {
  featureLayer.eachLayer(function(marker) {
    if (marker.feature.properties.id === markerId) {
      marker.openPopup();
      //map.panTo(marker.getLatLng());
    }
  });
}

function getData(){
  var techHash = {};

  for(var i in geojson) {
    var dtStart = geojson[i].properties.date_from;
    var dtEnd = geojson[i].properties.date_to;
    var durationInMonths = getDurationInMonths(dtStart, dtEnd);
    var years = round((durationInMonths / 12), 2);
    var techArray = geojson[i].properties.technology;

    for(var j in techArray){
      var key = techArray[j];

      if(techHash.hasOwnProperty(key)){
        techHash[key] = techHash[key] + years;
      }
      else {
        techHash[key] = years;
      }
    }
  }

  //console.log(techHash);

  return techHash;
}

function round(value, places) {
    var multiplier = Math.pow(10, places);

    return (Math.round(value * multiplier) / multiplier);
}

function initChart(){
  var data = [];

  var hashObj = getData();
  for(var key in hashObj){
    var d = {};
    d.name = key;
    d.value = hashObj[key];
    data.push(d);
  }

  var width = 500,
      barHeight = 20;

  var chart = d3.select(".chart")
      .attr("width", width)
      .attr("height", barHeight * data.length);

  var x = d3.scale.linear()
      .domain([0, d3.max(data, function(d) { return d.value; })])
      .range([0, width]);

  var bar = chart.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

  bar.append("rect")
      .attr("width", function(d) { return x(d.value); })
      .attr("height", barHeight - 1);

  bar.append("text")
      .attr("x", function(d) { return x(d.value) - 3; })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text(function(d) { return d.name + " " + d.value; });
}

$( document ).ready(function() {
  createExperiences();
  initMap();
  initChart();
});
