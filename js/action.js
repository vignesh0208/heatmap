var getMouseInnerClientPosition, getMousePagePosition, mouseClick, i = 0, isPaused = true, mouseMove = false;
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

$('#mouseMove').on('click', function (e) {
    mouseClick = {
        x: e.pageX,
        y: e.pageY
    };
});

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
            // console.log(userBehaviour);
            userBehaviourFromOnload.push(userBehaviour);
        }
    }, 100);
})

window.setInterval(function() {
    if(!isPaused) {
        $('#mouse-pointer').css({
            'top' : userBehaviourFromOnload[i].mousePageBehaviour.y + 'px',
            'left' : userBehaviourFromOnload[i].mousePageBehaviour.x + 'px',
            'border':'solid 1px #f4623a',
            'border-radius':'20px',
            'width':'17px',
            'height':'17px',
            'background-color': 'white',
            'cursor': 'pointer'
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