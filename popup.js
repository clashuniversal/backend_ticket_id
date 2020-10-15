var tab_obj = {"url": ""};

document.addEventListener("DOMContentLoaded", function(event){
    var url_flag = true
    var ticket_timezone = "Empty"
   var obj = {"active": true, "currentWindow": true}
    chrome.tabs.query(obj, function(tab){
        tab_obj.url = tab[0].url
        var element_1 = document.getElementById("display_id")
        var element_2 = document.getElementById("id")
        chrome.runtime.sendMessage({url: tab_obj.url, action: "id_load",id: tab[0].id},function(response)
        {
                element_1.innerHTML = response.display_id
                element_2.innerHTML = response.id
                navigator.clipboard.writeText(element_2.innerText)
                 url_flag = response.url_flag
                // console.log(ticket_timezone)
                // console.log(url_flag)
                 if(!url_flag) document.getElementById("change_timezone").disabled = true
                 ticket_timezone = response.time.match(/\+.*/)
                 console.log(ticket_timezone)
         })

    })

    var timezone = document.getElementById("change_timezone")
    timezone.addEventListener('click',change_timezone_function)
    function change_timezone_function()
    {
        console.log(ticket_timezone)
        // console.log('Its just that alert does not work')    
        chrome.tabs.executeScript({
                code: 'var time_value = '+ JSON.stringify(ticket_timezone)},function(){
                    chrome.tabs.executeScript({
                        file: 'timezone.js'
                    })
                }
            )
       
      
    }
    
   
    
    
})
