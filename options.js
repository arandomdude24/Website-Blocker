document.addEventListener('DOMContentLoaded', documentEvents, false);

function printList(list) {
    if (list) {
        var i; 
        output = "";
        for (i=0; i<list.length; i++)
            output += 'Element ' + (i+1) + ': ' + list[i] + '<br>';
        document.getElementById('list').innerHTML = output;
    }
    else
        document.getElementById('list').innerHTML = "";
}

function add(input) {
    chrome.storage.sync.get('sites', function(result) {
        if (input.value != '' && input.value != undefined && (!(result.sites.includes(input.value))))  {
            result.sites[result.sites.length] = input.value
            chrome.storage.sync.set({sites:result.sites}, function() {
                printList(result.sites);
                input.value = '';
            })
        }
    })
}

function blocker(input) {
    val = parseInt(input.value);
    if (Number.isInteger(val) && val > 0) {
        chrome.storage.sync.set({button: true}, function() {

            var newDate = new Date();
            newDate.setTime(Date.now() + val*1000*60);
            chrome.storage.sync.set({time: newDate.toLocaleString()}, function() {
                console.log('Time has been stored');
                input.value = '';
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
        chrome.storage.sync.get('sites', function(result) {
            x = 0;
            while (x < result.sites.length) {  
                if (result.sites[0] == input.value)
                    result.sites.shift();
                else {
                    x+=1; 
                    element = result.sites.shift();
                    result.sites.push(element);
                } 
            }
        
            chrome.storage.sync.set({sites: result.sites}, function() {
                console.log('Website list has been modified');
                printList(result.sites);
                input.value = '';
            })
        })
    }
}

function reset() {
    document.getElementById('list').innerHTML = "";
    chrome.storage.sync.set({sites: []}, function() {
        console.log('Website list has been reset');
    })
}

function getList() {
    chrome.storage.sync.get('sites', function(result) {
        printList(result.sites);
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
    document.getElementById('refresh').addEventListener('click', function() {
        getList();
    })
}
