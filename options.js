document.addEventListener('DOMContentLoaded', documentEvents, false);

function myAction(input) {
    console.log('Input entered: ' + input.value);
    chrome.storage.local.get('sites', function(result) {
        console.log('Stored value is ' + result.sites);
        result.sites += input.value + '\n';
        chrome.storage.local.set({sites:result.sites}, function() {
            alert('New stored value is \n' + result.sites);
        })
    })
    
}

function documentEvents() {
    document.getElementById('add').addEventListener('click', 
    function() {
        myAction(document.getElementById('site'));
    });
}
