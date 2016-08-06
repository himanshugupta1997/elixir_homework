/**
 * Created by himanshu on 6/8/16.
 */

var myMap, gMap;

var DirectionService;
var DirectionDisplay;


$(initMap);



function initMap() {
    var obj1 = {lat : 28.750008527141393 , lng: 77.1179170342972};
    var obj2 = {lat : 28.684770750566155, lng: 77.12686749483427};
    var obj3 = {lat : 28.69761634874712, lng: 77.14051673977433};
    myMap = document.getElementById('map');
     gMap = new google.maps.Map(myMap, {
        center: {lat: 28.8, lng : 77.1},
        zoom: 15
    });
    gMap.addListener('center_changed', function () {

        document.getElementById('test').innerHTML = "Lat: " + gMap.getCenter().lat() + "  Lng : " + gMap.getCenter().lng();

    });
    var college = document.getElementById('college');
    document.getElementById('College');
    college.addEventListener('click', function () {

        var marker = new google.maps.Marker({
            position : obj1,
            map : gMap,
            title : "Dtu College"
        });
        gMap.panTo(marker.getPosition());
    });
    var home = document.getElementById('home');
    document.getElementById('College');
    home.addEventListener('click', function () {
        var marker = new google.maps.Marker({
            position : obj2,
            map : gMap,
            title : "Home"
        });

        gMap.panTo(marker.getPosition());
    });
    var CodingBlocks = document.getElementById('Coding-Blocks');
    document.getElementById('College');
    CodingBlocks.addEventListener('click', function () {
        var marker = new google.maps.Marker({
            position : obj3,
            map : gMap,
            title : "Coding-Blocks"
        });

        gMap.panTo(marker.getPosition());
    });
    document.getElementById('location').addEventListener('click', currentLocation);
  document.getElementById('get_directions').addEventListener('click',GetDirections);

}


function  currentLocation() {

    navigator.geolocation.getCurrentPosition(function (position) {

        var heremarker = new google.maps.Marker({
            position: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            },
            map: gMap,
            title: "Current Location"
        });

        gMap.panTo(heremarker.getPosition());

    });
}

var service;



function GetDirections() {


    console.log("get directions called");
    DirectionDisplay = new google.maps.DirectionsRenderer();
    DirectionDisplay.setMap(gMap);

    service = new google.maps.DistanceMatrixService();




   // DirectionDisplay.setPanel(document.getElementById('panel'));
    DirectionService = new google.maps.DirectionsService();
    var home = new google.maps.LatLng(28.684770750566155, 77.12686749483427);
    var coding_blocks = new google.maps.LatLng(28.69761634874712,77.14051673977433);
    var college =  new google.maps.LatLng(28.750008527141393,77.1179170342972);

    var origin, des;
    var source = $('#source').val();
    var destination = $('#destination').val();
    console.log("value of destination " + " " + destination);
    if(source == "Coding_Blocks")
    {
        origin = coding_blocks;
    }
    else if(source == "College")
    {
        console.log("setting origin collegeg");
        origin = college;
    }



    if(destination == "Coding_Blocks")
    {
        des = coding_blocks;
    }
    else if(destination == "College")
    {
        des = college;
    }
    else
    {
        console.log("Nothing");
    }

    console.log("origin is" );
    console.log(origin);
    console.log("destination is");
    console.log(des);
        
        
    var request = {

        origin : origin,
        destination : des,
        travelMode : 'DRIVING'

    };
    DirectionService.route(request , function (result, status) {

        if (status == 'OK')
        {
            DirectionDisplay.setDirections(result);
        }

    });

    service.getDistanceMatrix({

        origins : [origin],
        destinations : [des],
        travelMode: 'DRIVING'
    }, function (response , status) {

        console.log("call back distance matrix");

        if (status!='OK')
        {
            return;
        }


        console.log("Response object");
        console.log(response);
        CalcFare(response.rows[0].elements[0].distance.value);


    });
}

function CalcFare(distance) {

    distance = Number(distance);
    var A ,B, C;

    distance = distance/1000;

    if (distance>2)
    {
        A = (distance-2)*8 + 25;
    }
    else
    {
        A = 25;
    }

    B = Math.max(60, 40 + distance*6);
    C = Math.max(70, 40 + distance*6);

    $('#panel').html("<br> Auto fare : " + A + '<br>' + "Ola Fare: " + B + '<br>Uber Fare: ' + C + '');

}
