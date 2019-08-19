var getMouseInnerClientPosition, getMousePagePosition, mouseClick, i = 0, isPaused = true, mouseMove = false, j= 0, counter= 0, timingValue;
var userBehaviourFromOnload = [];
var mouseClickLocation = [];

// Get scroll position
function getScrollPosition() {
    return {
        x: window.pageXOffset,
        y: window.pageYOffset
    }
}

// Mouse move event
function mouseMoveEvent(e) {
    getMouseInnerClientPosition = {
        x: e.clientX,
        y: e.clientY
    }
    getMousePagePosition = {
        x: e.pageX,
        y: e.pageY
    }
}
addEventListener('mousemove', mouseMoveEvent, false)
addEventListener('wheel', mouseMoveEvent, false)
addEventListener('touchmove', mouseMoveEvent, false) //for mobile device

//Mouse click position
$('#mouseMove').on('click', function (e) {
    mouseClick = {
        x: e.pageX,
        y: e.pageY
    };
    mouseClickLocation.push(mouseClick);
});

//Device screen size
function getScreenSize() {
    return {
        x : screen.width,
        y : screen.height
    } 
}

//Port screen size
function getViewPortSize() {
    return {
        x : window.innerWidth,
        y : window.innerHeight
    }
}

$('#mouseMove').mouseleave(function(e){
    e.preventDefault();
    mouseMove = true;
})

$(document).mouseenter(function() {
    mouseMove = false;
    setInterval(function() {
        if(!mouseMove) {
            var userBehaviour = {
                "Timing": counter,
                "mouseInnerBehaviour": getMouseInnerClientPosition,
                "mousePageBehaviour": getMousePagePosition,
                "screenSize": getScreenSize(),
                "scrollPosition": getScrollPosition(),
                "viewPortSize": getViewPortSize(),
            }
            counter++
            userBehaviourFromOnload.push(userBehaviour);
        }
    }, 100);
})

window.setInterval(function() {
    if(!isPaused && (userBehaviourFromOnload.length >= (i+1))) {
        $('#mouse-pointer').css({
            'top' : userBehaviourFromOnload[i].mousePageBehaviour.y + 'px',
            'left' : userBehaviourFromOnload[i].mousePageBehaviour.x + 'px',
            'border':'solid 1px #f4623a',
            'border-radius':'20px',
            'width':'17px',
            'height':'17px',
            'background-color': 'white',
            'cursor': 'pointer',
            'position': 'absolute'
        });
        window.scrollTo(userBehaviourFromOnload[i].scrollPosition.x, userBehaviourFromOnload[i].scrollPosition.y);
        // console.log(userBehaviourFromOnload[i].mousePageBehaviour);
        i++;
    }
}, 100);

$('#play').on('click', function(e) {
    e.preventDefault();
    isPaused = false;
    var fun = userBehaviourFromOnload.length * 100;
    var milliseconds = fun;
    var day, hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    timingValue = {
        day: day,
        hour: hour,
        minute: minute,
        seconds: seconds,
    };
    console.log(timingValue)
});

$('#pause').on('click', function(e) {
    e.preventDefault();
    isPaused = true;
});

// Google map
var geo = navigator.geolocation;
geo.getCurrentPosition(success);
function success(position) {
    var myLat = position.coords.latitude;
    var myLong = position.coords.longitude;
    var coords = new google.maps.LatLng(myLat, myLong);
    var mapOption = {
        center: coords,
        zoom: 15,
        panControl:false,
        zoomControl:false,
        mapTypeControl:false,
        scaleControl:false,
        streetViewControl:false,
        overviewMapControl:false,
        rotateControl:false,
        draggable: false,
        fullscreenControl: false,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById('map'), mapOption);
    var marker = new google.maps.Marker({map: map, position:coords});
}