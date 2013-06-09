var newTabEnabled = false;

var load_js = function(tabId){
    chrome.tabs.sendMessage(tabId, {enabled: newTabEnabled}, function(){});
}

chrome.browserAction.onClicked.addListener(function() {
    newTabEnabled = !newTabEnabled;
    newTabEnabled ? chrome.browserAction.setIcon({'path':'assets/on.png'}) : chrome.browserAction.setIcon({'path':'assets/off.png'});
    chrome.tabs.query({}, function(tabs){
        for (var tab = 0; tab < tabs.length; tab++){
            load_js(tabs[tab].id);
        }
    });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){load_js(tabId)});
chrome.tabs.onCreated.addListener(function(tabId, changeInfo, tab){load_js(tabId)});

chrome.runtime.onMessage.addListener(
    function(msg, sender, sendResponse) {
        if (msg.url){
            chrome.tabs.create({url: msg.url, active:false});
        }
        sendResponse();
    }
);