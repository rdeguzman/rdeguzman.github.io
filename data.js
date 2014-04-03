var experiences = [
  {
    type: "Experience",
    date_to: "05/01/2011",
    date_from: "05/01/2009",
    title: "Mobile Developer",
    company: "PelicanCorp Pty Ltd",
    description: "Develop proof of concept mobile applications to support underground asset management for Dial Before You Dig. Technologies include ObjectiveC, C# and Java, Oracle Spatial, Postgres/Postgis, Mapserver and Geoserver. Integration with Google, Bing Maps and deCarta (Java). Spatial analysis (i.e spatial intersections) and geometry transformation using FME."
  },
  {
    type: "Experience",
    date_to: "01/02/2009",
    date_from: "11/01/2006",
    title: "Team Lead",
    company: "Cybersoft Beijing Information Technology",
    description: "Cybersoft Beijing is involved in providing mobile travel and mapping systems to telecom providers in China during the Beijing 2008 Olympics."
  },
  {
    type: "Experience",
    date_to: "2006/10/01",
    date_from: "2004/05/01",
    title: "Systems Administrator/Lead Developer",
    company: "Cybersoft Integrated Geoinformatics Inc",
    description: "Cybersoft GeoInformatics is responsible in providing GIS data and mapping capabilities to DPC YellowPages, Mapcentral Philippines and Telecom Providers. It also has extensive experience in vehicle asset tracking and monitoring thru PLDT."
  }
];

function getShortDate(dt){
  var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];
  return monthNames[dt.getMonth()] + " " + dt.getFullYear();
}

function getFormattedDate(dtStart, dtEnd){
  var dateStart = new Date(dtStart);
  var dateEnd = new Date(dtEnd);
  var formattedString = getShortDate(dateStart) + " - " + getShortDate(dateEnd);
  return formattedString;
}

function createExperiences(){
  for(var i in experiences) {
    var ex = experiences[i];
    var html;
    html  = "<div class='row'>";
    html += "  <div class='col-md-4 text-center'>";
    html += "    <small>" + getFormattedDate(ex.date_from, ex.date_to) + "</small>";
    html += "  </div>";
    html += "  <div class='col-md-8 experience'>";
    html += "    <div class='title'>" + ex.title + "</div>";
    html += "    <div class='company'>" + ex.company + "</div>";
    html += "  </div>";
    html += "</div>";

    $("#experiences").append(html);
  }
}

$( document ).ready(function() {
  createExperiences();
});
