document.addEventListener('DOMContentLoaded', documentEvents, false);

function myAction(input) {
    chrome.storage.local.get('sites', function(result) {
        if (input.value != '' && input.value != undefined && (!(result.sites.includes(input.value))))  {
            result.sites[result.sites.length] = input.value
            chrome.storage.local.set({sites:result.sites}, function() {
                current = document.getElementById('list').innerHTML;
                current += 'Element ' + result.sites.length + ': '
                + input.value + '<br>'
                document.getElementById('list').innerHTML = current;
            })
        }
    })
}

function blocker(input) {
    val = parseInt(input.value);
    if (Number.isInteger(val) && val > 0) {
        chrome.storage.local.set({button: true}, function() {
            alert('Button pressed, blocking stuff now');

            var newDate = new Date();
            newDate.setTime(Date.now() + val*1000*60);

            chrome.alarms.clear('timer', function(){
                alert(newDate.toLocaleString());
                chrome.alarms.create('timer', {when: newDate.getTime()});
            });
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
