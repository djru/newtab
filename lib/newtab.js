function on(){
    console.log("on");
    $("a").on("click", function(link){ 
        link.preventDefault(); 
        link.stopPropagation();
        chrome.runtime.sendMessage({ url: this.href }); 
        return false;
    });
};

function off(){
    console.log("off");
    $("a").off();
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    console.log("fired");
    if(msg.enabled){on();}
    else if(!msg.enabled){off();}
    sendResponse();
});