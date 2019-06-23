document.addEventListener('DOMContentLoaded', documentEvents, false);

function myAction(input) {
    console.log("input value is : " + input.value);
    var lst = chrome.storage.sync.get('sites', function(){});
    lst += input.value;
    chrome.storage.sync.set({sites: lst}, function() {
        console.log(lst);
    });
}

function documentEvents() {
    document.getElementById('add').addEventListener('click', 
    function() {
        myAction(document.getElementById('site'));
    });
}