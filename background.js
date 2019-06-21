'use strict';

chrome.runtime.onInstalled.addListener(function() {
   chrome.storage.sync.set({sites: 'empty'}, function() {
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