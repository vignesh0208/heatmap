var getMouseInnerClientPosition, getMousePagePosition, mouseClick, i = 0, isPaused = true, mouseMove = false;
var userBehaviourFromOnload = [];
var timeDuration = []

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
document.body.addEventListener('touchmove', mouseMoveEvent, false) //for mobile device

//Mouse click position
$('#mouseMove').on('click', function (e) {
    mouseClick = {
        x: e.pageX,
        y: e.pageY
    };
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
                "mouseClickLocation": mouseClick,
            }
            userBehaviourFromOnload.push(userBehaviour);
            // console.log(userBehaviourFromOnload)
        }
    }, 100);
    if (!mouseMove) {
        
    }
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
        i++;
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