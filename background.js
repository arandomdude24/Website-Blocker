'use strict';

chrome.runtime.onInstalled.addListener(function() {
   
   var list = "";
   chrome.storage.local.set({sites: list}, function() {
      console.log('List of websits has been initalized');
   }); 

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
   chrome.storage.local.get('sites', function(result) {
      let lst = result.sites.split('\n');
      let block = false;
      var s = '';
      var x;
      for (x=0; x<lst.length; x++) {
         s += 'Element ' + x + ' ' + lst[x] + '\n';
         if (lst[x] != '' && changeInfo.url.includes(lst[x]) ) {
            block = true;
            break;
         }
      }

      if (block) {
         alert('Blocking Website');
         chrome.tabs.update(tabId, {url: 'google.com'});
      }
   })
})

