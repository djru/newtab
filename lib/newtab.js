function on(){
    $("a").on("click", function(link){ 
        link.preventDefault(); 
        link.stopPropagation();
        chrome.runtime.sendMessage({ url: this.href }); 
        return false;
    });
};

function off(){
    $("a").off();
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if(msg.enabled){on();}
    else if(!msg.enabled){off();}
    sendResponse();
});