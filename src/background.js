var pageData; // Global var used by popup

function setTemplateData(data) {
  console.log('### data: ', data);
  pageData = data;
  chrome.tabs.getSelected(function(tab) {
    chrome.pageAction.setPopup({
      tabId: tab.id,
      popup: 'popup.html'
    });
  });

}

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostSuffix: 'anthropologie.com' }
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

chrome.pageAction.onClicked.addListener(function() {
  chrome.tabs.getSelected(function(tab) {
    chrome.tabs.sendMessage(tab.id, 'generateTemplate', setTemplateData);
  });
});
