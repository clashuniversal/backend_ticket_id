var tab_obj = {"url": ""};

document.addEventListener("DOMContentLoaded", function(event){
   var obj = {"active": true, "currentWindow": true}
    chrome.tabs.query(obj, function(tab){
      //  console.log(tab);
        tab_obj.url = tab[0].url
        var element_1 = document.getElementById("display_id")
        var element_2 = document.getElementById("id")
        var display_id_error = "The Current tab does not contain a valid Freshdesk URL"
        var id_error = "There is no Backend ticket ID to fetch"
        chrome.runtime.sendMessage({url: tab_obj.url},function(response)
        {
                element_1.innerHTML = response.display_id
                element_2.innerHTML = response.id
                navigator.clipboard.writeText(element_2.innerText)
            .then(() => {
                console.log("Success")
            })
           
        })
    })
  
    
})