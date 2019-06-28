'use strict';

chrome.runtime.onInstalled.addListener(function() {
   chrome.storage.local.set({sites: ""}, function() {
      console.log('List of websits has been initalized');
   }); 

   chrome.storage.local.set({button: false}, function() {
      console.log('Block function has been set to false');
   })

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
   chrome.storage.local.get('button', function(result){ 
      if (result.button) {
         chrome.storage.local.get('sites', function(result) {
            let lst = result.sites.split('\n');
            let block = false;
            var x;
            for (x=0; x<lst.length; x++) {
               if (lst[x] != '' && changeInfo.url.includes(lst[x]) ) {
                  block = true;
                  break;
               }
            }
      
            if (block) {
               chrome.tabs.update(tabId, {url: 'https://www.google.com/'});
            }
         })
      }
   })
})

