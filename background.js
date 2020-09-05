chrome.runtime.onMessage.addListener(
     function(request,sender,sendResponse)
    {
      //Regular Expression 
      var regexp = /https:\/\/.*.freshdesk.com\/a\/tickets\/*/
      var match = regexp.exec(request.url)
      console.log(match)
       console.log(request.url)
      if(match != null)
      {
  var backend_id = 0;
    //Once background script gets the message construct the xml URL to be used in the API call later
   var  modified_url = request.url.split("/");
    //console.log(modified_url);
    var xml_url = modified_url[0] + "//" + modified_url[2] + "/helpdesk/" + modified_url[4] + "/" +modified_url[5] + ".xml";
    //console.log(xml_url)
    var obj = {"url": request.url}
   // console.log(obj)
    //Once the URL is successfully constructed get all cookies using the chrome.* APIs, please note these can run only on the background script:
       
      chrome.cookies.getAll(obj , function (cookies)
        {
            var cookie = "";
       for(i=0 ; i < cookies.length ; i++)
       {
        
        cookie = cookie+ " " + cookies[i].name + "=" + cookies[i].value + ";"
       
       }  
       console.log("This is inside cookie loop")
       console.log(cookie)
      var api_call = new XMLHttpRequest();
      api_call.onreadystatechange=function(){
        if(this.readyState == 4 && this.status == 200)
        {
            // console.log(api_call.responseXML)
            // console.log(typeof(api_call.responseXML)) // The return type here is an object. We need to serialize it to a string to have it parsed by the XML parser
            //Serialize the xml response
            // console.log('Its a success')
            var xml_serialiser = new XMLSerializer();
            var serialzed_xml = xml_serialiser.serializeToString(api_call.responseXML)
            var xml_parser = new DOMParser();
       var xml_response = api_call.responseXML
       var parsed_value = xml_parser.parseFromString(serialzed_xml,"text/xml");
           var  backend_id = parsed_value.getElementsByTagName("id")[0].childNodes[0].nodeValue
          console.log(backend_id)
          sendResponse({id: backend_id, display_id: modified_url[5]})

        }

    };
    api_call.open("GET",xml_url)
    api_call.setRequestHeader('cookie',cookie)
    api_call.send()
     })
    }
    else
    {
      sendResponse({id: 'There is no Valid Backend Ticket ID to fetch', display_id: 'The Current URL is not a Valid Freshdesk URL'})
    }
return true
//This is required to sendResponse asynchronously after we use Chrome.getall cookies call else its going to be synchronous and send an empty value
 })
 


