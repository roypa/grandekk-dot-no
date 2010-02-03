/**************************************************************************
 * The following ID's in div elements are defined by a Google Page template:
 *  1. g_title: The first box where the title is
 *  2. g_description: The second box where the menu is
 *  3. g_body: The third box where the main content/body is
 *  4. g_footer: The forth box where the footer is
 *  5. extraDiv1: Div element nederst på siden (kanskje for ref til Royp IT)
 *
 * The following are defined by me:
 *  1. my_menubar: Where the menu bar should be placed
 *  2. my_google_map: Where the google map should be placed, normally only used in "omoss" pages
 **************************************************************************/

/*
 * Define the menu bar.
 * Every item has same id as the page name, as this is used to assign a class to the link that is currently selected.
 */
var my_menubar_content = ' \
<div id="navcontainer"> \
<ul id="navlist"> \
<li><a href="index.html"          id="index"          >Forsiden</a></li> \
<li><a href="dekk.html"          id="dekk"          >Sommerdekk</a></li> \
<li><a href="dekk-vinter.html"   id="dekk-vinter"   >Vinterdekk</a></li> \
<li><a href="landbruksdekk.html" id="landbruksdekk" >Landbruksdekk</a></li> \
<li><a href="felger.html"        id="felger"        >Felger</a></li> \
<li><a href="oljeskift.html"     id="oljeskift"     >Oljeskift</a></li> \
<li><a href="selvvask.html"      id="selvvask"      >Selvvask</a></li> \
<li><a href="kart.html"          id="kart"          >Kart</a></li> \
<li><a href="omoss.html"         id="omoss"         >Om oss</a></li> \
</ul> \
</div>';

function assignDivElements() {
    /* Set the page's title */
    document.getElementById("g_title").innerHTML =
        '<p align="center"><img src="Logo-og-tekst-GranDekk.gif" width="540" height="95" alt="Gran Dekk og Servicesenter AS" title="Gran Dekk og Servicesenter AS"></p>';
    /* Set the page's menu where we have defined div-element with ID=menubar */
    document.getElementById("g_description").innerHTML = my_menubar_content;
    /*  Set the page's footer */
    document.getElementById("my_footer").innerHTML = '<p align="center"><a href="kart.html">Midtre Morstadgutua 1, 2750 Gran</a>. Tlf: 613 29300, Fax: 613 29301, Email: <a href="mailto:post@grandekk.no">post@grandekk.no</a></p>';
}

function setCurrentMenuItem() {
    /* location.pathname is the path after domain name, including the leading slash - therefore we calls substring(1).
       Any parameters in the URL are excluded. */
    var pName = "";
    if (location.pathname=="" || location.pathname=="/") {
        pName="index";
    } else {
        pName = location.pathname.substring(1);
    }
    var menuSelected = document.getElementById(pName);
    if (menuSelected != null) {
        menuSelected.className = "current";
    } else {
        //If not found, keep the one that is currently the current one
    }
}

/*
 * The function for loading the map must be assigned to the windows.onload event handler.
 * Otherwise it will not work.
 * Also include unloading the map.
 * The global even handler requires that it call a function and not execute code directly.
 * Example:
 *  window.onload = function() { loadGoogleMap(); }
 *  window.onunload=GUnload();
 */
function loadGoogleMap() {
    if (GBrowserIsCompatible()) {
        var pointGranDekk = new GLatLng(60.35192, 10.57464);
        var map = new GMap2(document.getElementById("my_google_map"));
        map.setCenter(pointGranDekk, 13);
        //Add controls
        map.addControl(new GLargeMapControl());
        map.addControl(new GScaleControl());
        //map.addControl(new GMapTypeControl());
        map.addControl(new GOverviewMapControl());
        //Add a marker
        var marker = new GMarker(pointGranDekk);
        map.addOverlay(marker);
        //Open a info window at the marker after page loads
        var markerHtml = "<img src='Logo-GranDekkAS.gif' width='260' height='30'/><br clear='left'/><img src='Verkstedet-fra-RV4.jpg' width='260' height='195'/>";
        marker.openInfoWindowHtml(markerHtml);

        // Make user clicks on the marker open the info window
        GEvent.addListener(marker, "click", function() {
            marker.openInfoWindowHtml(markerHtml);
        });

    } else {
        document.getElementById("my_google_map").innerHTML =
            '<b><em>Dessverre støtter ikke din browser visning av kart vha Google Maps</em></b>';
    }
}

