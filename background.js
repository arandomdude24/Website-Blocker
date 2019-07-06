'use strict';

chrome.runtime.onInstalled.addListener(function() {
   chrome.storage.sync.set({sites: []}, function() {
      console.log('List of websits has been initalized');
   }); 

   chrome.storage.sync.set({button: false}, function() {
      console.log('Block function has been set to false');
   });

   chrome.alarms.create('timer', {delayInMinutes: 100});

   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
         conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'developer.chrome.com'},
         })],
         actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
   }); 
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
   chrome.storage.sync.get('button', function(result){ 
      if (result.button) {
         chrome.storage.sync.get('sites', function(result) {
            let block = false;
            var x;
            for (x=0; x<result.sites.length; x++) {
               if (changeInfo.url != undefined && changeInfo.url.includes(result.sites[x]) ) {
                  block = true;
                  break;
               }
            }
      
            if (block) 
               chrome.tabs.update(tabId, {url: 'https://www.google.com/'});
         })
      }
   });   
});

chrome.alarms.onAlarm.addListener(function(alarm) {
   console.log('Ok the event fired');
   chrome.storage.sync.set({button: false}, function() {
       console.log('Sites are unblocked now');
       chrome.alarms.clear('timer', function() {
          console.log('Reset the alarm');
       });
   });
});

