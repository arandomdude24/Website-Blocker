document.addEventListener('DOMContentLoaded', documentEvents, false);

function myAction(input) {
    console.log("input value is : " + input.value);
    alert("The entered data is : " + input.value);
}

function documentEvents() {
    document.getElementById('block').addEventListener('click', 
    function() {
        pressed = true;
        chrome.storage.local.set({button:pressed}, function() {
            alert('Button pressed, blocking stuff now');
            myAction(document.getElementById('time'));
        })
    })
}