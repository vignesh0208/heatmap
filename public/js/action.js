var getMouseInnerClientPosition, getMousePagePosition, mouseClick, i = 0, isPaused = true, mouseMove = false, j= 0;
var userBehaviourFromOnload = [];
var mouseClickLocation = [];
var heatmap = h337.create({
    container: document.getElementById('mouseMove'),
    maxOpacity: .6,
    radius: 50,
    blur: .90,
});

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
    console.log(mouseClick)
    console.log(mouseClickLocation)
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
                "mouseInnerBehaviour": getMouseInnerClientPosition,
                "mousePageBehaviour": getMousePagePosition,
                "screenSize": getScreenSize(),
                "scrollPosition": getScrollPosition(),
                "viewPortSize": getViewPortSize(),
                // "mouseClickLocation": mouseClick,
            }
            userBehaviourFromOnload.push(userBehaviour);
            console.log(userBehaviourFromOnload)
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
        // console.log(mouseClickLocation[i].x, mouseClickLocation[i].y)
        i++;
    }
}, 100);

window.setInterval(function() {
    if(!mouseMove && (mouseClickLocation.length >= (j+1))) {
        heatmap.addData({ 
            x: mouseClickLocation[j].x,
            y: mouseClickLocation[j].y,
            value: 1
        });
        j++;
    }
}, 100);

$('#play').on('click', function(e) {
    e.preventDefault();
    isPaused = false;
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