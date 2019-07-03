document.addEventListener('DOMContentLoaded', documentEvents, false);

function add(input) {
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

            var newDate = new Date();
            newDate.setTime(Date.now() + val*1000*60);
            chrome.storage.local.set({time: newDate.toLocaleString()}, function() {
                console.log('Time has been stored');
            })

            chrome.alarms.clear('timer', function(){
                chrome.alarms.create('timer', {when: newDate.getTime()});
            });
        })
    }
    else 
        alert('Please enter a valid integer');
}

function removeWord(input) {
    if (input.value != undefined) {
        chrome.storage.local.get('sites', function(result) {
            x = 0;
            list = "";
            while (x < result.sites.length) {  
                if (result.sites[0].includes(input.value))
                    result.sites.shift();
                else {
                    list += 'Element ' + (x+1) + ': '
                    + result.sites[0] + '<br>';
                    x+=1; 
                    element = result.sites.shift();
                    result.sites.push(element);
                } 
            }
        
            chrome.storage.local.set({sites: result.sites}, function() {
                console.log('Website list has been modified');
            })
            document.getElementById('list').innerHTML = list;
        })
    }
}

function reset() {
    document.getElementById('list').innerHTML = "";
    chrome.storage.local.set({sites: []}, function() {
        console.log('Website list has been reset');
    })
}

function documentEvents() {
    document.getElementById('add').addEventListener('click', function() {
        add(document.getElementById('site'));
    });
    document.getElementById('block').addEventListener('click', function() {
        blocker(document.getElementById('time'));
    })
    document.getElementById('delete').addEventListener('click', function() {
        removeWord(document.getElementById('remove'));
    })
    document.getElementById('clear').addEventListener('click', function() {
        reset();
    })


}
