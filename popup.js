document.addEventListener('DOMContentLoaded', documentEvents, false);

function documentEvents() {
    chrome.storage.local.get('button', function(result) {
        if (!(result.button)) {
            document.getElementById('text').innerHTML = 
            "The blocker is disabled, go the options menu to active it.";
        }
        else {
            chrome.storage.local.get('time', function(result) {
                text = "The specified site will be blocked until: " + result.time;
                document.getElementById('text').innerHTML = text;
            })
        }
    })

}