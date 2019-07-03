document.addEventListener('DOMContentLoaded', documentEvents, false);

function documentEvents() {
    chrome.storage.local.get('button', function(result) {
        if (!(result.button)) {
            document.getElementById('text').innerHTML = 
            "The blocker is disabled, go the options menu to active it.";
        }
        else {
            document.getElementById('text').innerHTML=
            "Well stuff is being blocked, don't know how long"
        }
    })

    /*
    document.getElementById('block').addEventListener('click', 
    function() {
        pressed = true;
        chrome.storage.local.set({button:pressed}, function() {
            alert('Button pressed, blocking stuff now');
            myAction(document.getElementById('time'));
        })
    }) */
}