document.addEventListener('DOMContentLoaded', documentEvents, false);

function myAction(input) {
    chrome.storage.local.get('sites', function(result) {
        result.sites += input.value + '\n';
        chrome.storage.local.set({sites:result.sites}, function() {
            alert('New stored value is \n' + result.sites);
        })
    })
}

function blocker(input) {
    val = parseInt(input.value);
    if (Number.isInteger(val) && val > 0) {
        chrome.storage.local.set({button: true}, function() {
            alert('Button pressed, blocking stuff now');
        })
    }
    else {
        alert(input.value);
        alert('Please enter a valid integer');
    }
}

function documentEvents() {
    document.getElementById('add').addEventListener('click', 
    function() {
        myAction(document.getElementById('site'));
    });
    document.getElementById('block').addEventListener('click',
    function() {
        blocker(document.getElementById('time'));
    })
}
