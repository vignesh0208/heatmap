var getMouseInnerClientPosition, getMousePagePosition, i = 0, isPaused = false;
var userBehaviourFromOnload = [];
function getScrollPosition() {
    return {
        x: window.pageXOffset,
        y: window.pageYOffset
    }
}

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
document.body.addEventListener('touchmove', mouseMoveEvent, false)

function getScreenSize() {
    return {
        x : screen.width,
        y : screen.height
    } 
}

function getViewPortSize() {
    return {
        x : window.innerWidth,
        y : window.innerHeight
    }
}


$(document).mouseenter(function() {
    setInterval(function() {
        var userBehaviour = {
            "mouseInnerBehaviour": getMouseInnerClientPosition,
            "mousePageBehaviour": getMousePagePosition,
            "screenSize": getScreenSize(),
            "scrollPosition": getScrollPosition(),
            "viewPortSize": getViewPortSize()
        }
        console.log(userBehaviour)
        userBehaviourFromOnload.push(userBehaviour)
    }, 100);
})

window.setInterval(function() {
    if(!isPaused) {
        $('#mouse-pointer').css({
            'top' : userBehaviourFromOnload[i].mousePageBehaviour.y + 'px',
            'left' : userBehaviourFromOnload[i].mousePageBehaviour.x + 'px'
        });
        window.scrollTo(userBehaviourFromOnload[i].scrollPosition.x, userBehaviourFromOnload[i].scrollPosition.y);
        i++;
    }
}, 100);

$('#pause').on('click', function(e) {
    e.preventDefault();
    isPaused = true;
});

$('#play').on('click', function(e) {
    e.preventDefault();
    isPaused = false;
});