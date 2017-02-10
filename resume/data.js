var map, featureLayer;

var geojson = [
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [145.228883,-37.926672]
    },
    "properties": {
      "id": 0,
      "marker-color": "#D73C50",
      "marker-size": "large",
      "marker-symbol": "car",
      "icon": "pin-l-car+D73C50@2x.png",
      "category": "Experience",
      "date_to": "now",
      "date_from": "03/01/2015",
      "location": "Melbourne, Australia",
      "title": "Technical Lead",
      "company": "Datalink Technologies Pty Ltd",
      "description": "Datalink delivers nation-wide fleet management and GPS tracking to the transport industry.",
      "full_description": "<ul><li>Manage the delivery of multiple simultaneous development projects from design through to release.</li><li>Provide in-depth, well researched technology recommendations to support the ongoing growth and operations</li><li>Ruby on Rails + API + ReactJS + ReactNative</li></ul>",
      "technology": ["android","apache","freebsd","javascript","jenkins","jira","jquery","git","google maps","postgres","postgis","python","reactjs","react-native","rspec","ruby","ruby on rails","ubuntu"]
    }
  },
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
      "date_to": "03/01/2015",
      "date_from": "07/25/2011",
      "location": "Melbourne, Australia",
      "title": "Senior Developer",
      "company": "Datalink Technologies Pty Ltd",
      "description": "Datalink delivers nation-wide fleet management and GPS tracking to the transport industry.",
      "full_description": "<p>Redesign and redevelop existing web and backend systems.</p> <ul><li>Convert web based mapping and tracking system, Datalink Fleet Management System (DFMS), from PHP + MySQL + OpenLayers into Ruby On Rails + Postgres + Postgis + Google Maps.</li><li>Postgres streaming replication. Server monitoring using munin.</li><li>Integrate C++ backend system, Network Control Management(NCM), with Postgres (NCMPG)</li><li>Implement continuous integration thru Jenkins. TDD using Rspec + Capybara.</li><li>Introduce bug and issue tracking and management thru Jira.</li><li>Wiki documentation using Confluence.</li><li>Created job management and dispatch application in Android, interfacing to BasePlan Enterprise.  Testing using calabash-android.</li></ul>",
      "technology": ["android","apache","freebsd","java","javascript","jenkins","jira","jquery","geoserver","git","google maps","postgres","postgis","rspec","ruby","ruby on rails","ubuntu"]
    }
  },
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [144.987975, -37.806503]
    },
    "properties": {
      "id": 2,
      "marker-color": "#0A2628",
      "marker-size": "large",
      "marker-symbol": "city",
      "icon": "pin-l-city+0A2628@2x.png",
      "category": "Experience",
      "date_to": "05/01/2011",
      "date_from": "05/01/2009",
      "location": "Melbourne, Australia",
      "title": "Mobile Developer",
      "company": "PelicanCorp Pty Ltd",
      "description": "PelicanCorp support underground asset management for Dial Before You Dig and utility companies.",
      "full_description": "<p>Develop proof of concept mobile applications to support underground asset management for Dial Before You Dig.  Sole developer for beforeUDig Mobile (iOS) prototype.</p> <p>Technologies include ObjectiveC, C# and Java, Oracle Spatial, Postgres/Postgis, Mapserver and Geoserver. Integration with Google, Bing Maps and deCarta (Java).</p> <p>The prototype won two (2) awards:</p> <p>1. <em>First (1st) Runner up</em> in <b>Navteq LBS Challenge for APAC</b><br>2. Finalist in the 6th Annual Victorian Spatial Excellence (VSEA) Awards.</p><img width='500' height='231' src='images/pelican_navteq.jpg'>",
      "technology": ["c#","geoserver","google maps","objective-c","openlayers","oracle spatial","postgres","postgis","svn"]
    }
  },
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [116.40752599999996, 39.90403]
    },
    "properties": {
      "id": 3,
      "marker-color": "#6EB4A4",
      "marker-size": "large",
      "marker-symbol": "suitcase",
      "icon": "pin-l-suitcase+6EB4A4@2x.png",
      "category": "Experience",
      "date_to": "01/02/2009",
      "date_from": "11/01/2006",
      "location": "Beijing, China",
      "title": "Technical Lead",
      "company": "Cybersoft Beijing Information Technology",
      "description": "Cybersoft Beijing was involved in providing mobile travel and mapping systems to telecom providers in China during the Beijing 2008 Olympics.",
      "full_description": "<ul><li>Reports directly to the CEO</li><li>Hands on technical role in managing seven (7) developers and directly involved in systems architecture, development, integration and deployment.</li><li>DevOps management includes network diagrams, server provisioning, installation and management.</li><li>China Travel Project.  Call center interface empowers the multilingual Call Center Agents with integrated Points of Interest and spatial information to assist tourists.  Technologies include Ruby On Rails, ColdFusion, Oracle Spatial, OpenLayers and ExtJS.<br><img width='263' height='173' src='images/beijing_call_center.jpg'/></li><li>POI Manager PDA runs on GPS sirf star 3 based Windows PocketPC devices (Mio and HP). POI Data from Postgis was exported as XML using ColdFusion.  XML was imported to PDA then binded and presented in a .NET Grid Control.  Used .Net Framework to communicate with GPS communication port and parse GPS NMEA readings.<br><img width='119' height='182' src='images/beijing_pda.jpg'></li></ul>",
      "technology": ["apache","centos","coldfusion","c#","extjs","javascript","gps","lbs","mapinfo","mapserver","mapnik","mysql","openlayers","oracle spatial","postgres","postgis","ruby","ruby on rails","sms","svn"]
    }
  },
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [121.03002500000002, 14.639163]
    },
    "properties": {
      "id": 4,
      "marker-color": "#98CAB7",
      "marker-size": "large",
      "marker-symbol": "mobilephone",
      "icon": "pin-l-mobilephone+98CAB7@2x.png",
      "category": "Experience",
      "date_to": "10/01/2006",
      "date_from": "05/01/2004",
      "location": "Manila, Philippines",
      "title": "Systems Admin / Lead Developer",
      "company": "Cybersoft Integrated Geoinformatics Inc - CIGI",
      "description": "Cybersoft GeoInformatics provides GIS data and mapping capabilities to Telecom Providers in the Philippines",
      "full_description": "<p>Key Responsibilities includes the following:</p><ul><li>Leads three (3) programmers, mentor and assist other junior staff. Reports directly to COO.</li><li>Responsible for managing the overall technical aspects of the development and maintenance of GIS applications and systems, web based mapping sites and mobile applications.</li><li>Systems Architectures and Construction. From installation, configuration to actual production deployment of GIS application and systems.</li></ul><p>Major Projects:</p><ul><li><b>Vehicle Tracking and Web Mapping.</b> Implemented web mapping using Mapserver, kaMap then OpenLayers.  Created a web-based vehicle tracking and reporting system, which can send and receive SMS requests to vehicles using Kannel, an opensource SMS Gateway.   Technologies include ColdFusion, Java, C, MySQL, MS SQL 2000, XML, and Kannel.</li><li><b>Person Finder</b>. Developed location based mobile value added services for telecom providers in the Philippines (Globe Telecoms and Smart Communications). Technologies used includes: GMLC/LBS, CIMD/SMS, Clustering, ColdFusion, Java, MySQL and Web Services.<br><img width='263' height='173' src='images/cigi_globe.jpg'/></li></ul>",
      "technology": ["apache","centos","coldfusion","java","javascript","gps","kannel","lbs","mapserver","mapinfo","mysql","openlayers","redhat","sms","svn"]
    }
  },
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [121.033972, 14.642308]
    },
    "properties": {
      "id": 5,
      "marker-color": "#98CAB7",
      "marker-size": "large",
      "marker-symbol": "mobilephone",
      "icon": "pin-l-mobilephone+98CAB7@2x.png",
      "category": "Experience",
      "date_to": "10/30/2003",
      "date_from": "06/01/2002",
      "location": "Manila, Philippines",
      "title": "Web Developer",
      "company": "KSDI Knowledge Systems Developers Inc - KSDI",
      "description": "KSDI is a five-man travel startup deriving its projects from the Cybersoft Group.",
      "full_description": "<p>Since the group has a strong background in GIS, good relationships with the telecom providers, they decided to setup a travel portal website.</p> <ul><li>Sole developer of Travel website focusing both on web and mobile (WAP).</li><li>Web development using ColdFusion 4.7 (Allaire/Macromedia at that time).  Technologies include Apache, MySQL and RedHat.</li></ul>",
      "technology": ["apache","coldfusion","mysql","redhat"]
    }
  }
];

var education = [
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [0,0]
    },
    "properties": {
      "id": 0,
      "marker-color": "#58ACFA",
      "marker-size": "large",
      "marker-symbol": "college",
      "icon": "pin-l-car+D73C50@2x.png",
      "category": "Education",
      "date_to": "05/01/2004",
      "date_from": "10/27/2003",
      "location": "Melbourne, Australia",
      "title": "Grad Diploma of Information Systems Mgmt",
      "company": "Central Queensland University (Melbourne Campus)",
      "description": "Central Queensland University (Melbourne Campus)"
    }
  },
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [0,0]
    },
    "properties": {
      "id": 0,
      "marker-color": "#58ACFA",
      "marker-size": "large",
      "marker-symbol": "college",
      "icon": "pin-l-car+D73C50@2x.png",
      "category": "Certificate",
      "date_to": "05/01/2004",
      "date_from": "05/01/2004",
      "location": "Melbourne, Australia",
      "title": "Advanced ColdFusion MX Developer",
      "company": "Macromedia (now Adobe)",
      "description": "Macromedia (now Adobe)"
    }
  },
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [0,0]
    },
    "properties": {
      "id": 0,
      "marker-color": "#58ACFA",
      "marker-size": "large",
      "marker-symbol": "college",
      "icon": "pin-l-car+D73C50@2x.png",
      "category": "Education",
      "date_to": "02/01/2004",
      "date_from": "02/01/2004",
      "location": "Melbourne, Australia",
      "title": "Institute of Surveyors, Australia (ISA)",
      "company": "Positive Assessment as relevant qualifications are being equivalent to an Australian Bachelor Degree Qualification",
      "description": "Relevant Qualifications are being equivalent to an Australian Bachelor Degree Qualification"
    }
  },
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [0,0]
    },
    "properties": {
      "id": 0,
      "marker-color": "#58ACFA",
      "marker-size": "large",
      "marker-symbol": "college",
      "icon": "pin-l-car+D73C50@2x.png",
      "category": "Education",
      "date_to": "06/01/2001",
      "date_from": "06/01/2000",
      "location": "Manila, Philippines",
      "title": "M.Sc. in Remote Sensing (Postgrad units only)",
      "company": "University of the Philippines, Diliman",
      "description": "College of Engineering, University of the Philippines, Diliman"
    }
  },
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [0,0]
    },
    "properties": {
      "id": 0,
      "marker-color": "#58ACFA",
      "marker-size": "large",
      "marker-symbol": "college",
      "icon": "pin-l-car+D73C50@2x.png",
      "category": "Education",
      "date_to": "03/01/2000",
      "date_from": "06/01/1994",
      "location": "Manila, Philippines",
      "title": "B. Sc. in Geodetic Engineering",
      "company": "University of the Philippines, Diliman",
      "description": "College of Engineering, University of the Philippines, Diliman"
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
  var finalString = "";

  if( getShortDate(dateStart) != getShortDate(dateEnd) )
    finalString = getShortDate(dateStart) + " - " + getShortDate(dateEnd);
  else
    finalString = "<strong>" + getShortDate(dateStart) + "</strong>";

  return finalString;
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
    html += "    <strong>" + getDuration(ex.date_from, ex.date_to) + "</strong><br/>";
    html += "    <small>" + getFormattedDate(ex.date_from, ex.date_to) + "</small><br/>";
    html += "    <small>" + ex.location + "</small>";
    html += "  </div>";
    html += "  <div class='col-md-1'>";
    html += "    <img class='img-circle' width='35' height='90' src='images/" + ex.icon +"'/>";
    html += "  </div>";
    html += "  <div class='col-md-7 experience'>";
    html += "    <div class='title'><a href='javascript:show(" + ex.id + ");'>" + ex.title + "</a></div>";
    html += "    <div class='company'>" + ex.company + "</div>";
    html += "  </div>";
    html += "</div>";

    $("#experiences").append(html);
  }
}

function createEducation(){
  for(var i in education) {
    var ex = education[i].properties;
    var html;
    html  = "<div class='row'>";
    html += "  <div class='col-md-3 text-right'>";

    if(getDuration(ex.date_from, ex.date_to) != ""){
      html += "    <strong>" + getDuration(ex.date_from, ex.date_to) + "</strong><br/>";
    }

    html += "    <small>" + getFormattedDate(ex.date_from, ex.date_to) + "</small><br/>";
    html += "    <small>" + ex.location + "</small>";
    html += "  </div>";
    html += "  <div class='col-md-9 experience'>";
    html += "    <div class='title'>" + ex.title + "</div>";
    html += "    <div class='company'>" + ex.company + "</div>";
    html += "  </div>";
    html += "</div>";
    html += "<br/>";

    $("#education_history").append(html);
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

function show(markerId){
  showPopup(markerId);
  showDescription(markerId);
}

function showPopup(markerId) {
  featureLayer.eachLayer(function(marker) {
    if (marker.feature.properties.id === markerId) {
      marker.openPopup();
      //map.panTo(marker.getLatLng());
    }
  });
}

function showDescription(markerId) {
  $("#description").html(geojson[markerId].properties.full_description);
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

  return techHash;
}

function getSortedData(){
  var data = [];
  var hashObj = getData();

  var keys = [];
  for (var key in hashObj) {
    if (hashObj.hasOwnProperty(key)) {
      keys.push(key);
    }
  }

  keys.sort();

  for(var i in keys){
    var key = keys[i];
    var value = hashObj[key];

    var d = {};
    d.name = key;
    d.value = value;
    data.push(d);
  }

  return data;
}

function round(value, places) {
    var multiplier = Math.pow(10, places);
    return (Math.round(value * multiplier) / multiplier);
}

function initChart(){
  var data = getSortedData();

  var width = 500,
      barHeight = 30;

  var chart = d3.select(".chart")
      .attr("width", width)
      .attr("height", barHeight * data.length);

  var x = d3.scale.linear()
      .domain([0, d3.max(data, function(d) { return d.value; })])
      .range([0, width]);

  var y = d3.scale.linear()
      .range([barHeight * data.length, 0]);

  var bar = chart.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

  bar.append("rect")
      .attr("width", function(d) { return x(d.value); })
      .attr("height", barHeight - 1);

  bar.append("text")
      .attr("x", 10)
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text(function(d) { return d.name + " " + d.value + " yrs"; });
}

$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
      || location.hostname == this.hostname) {

      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});


$( document ).ready(function() {
  createExperiences();
  createEducation();
  initMap();
  initChart();
  show(0);
});
