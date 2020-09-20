months = {
  "Jan" : "01",
  "Feb" : "02",
  "Mar" : "03",
  "Apr" : "04",
  "May" : "05",
  "Jun" : "06",
  "Jul" : "07",
  "Aug" : "08",
  "Sep" : "09",
  "Oct" : "10",
  "Nov" : "11",
  "Dec" : "12"
}
values = Array.from(document.getElementsByClassName('ticket-details__item__header'))
// console.log(created_info)
  values.forEach(e =>{
    time_string = e.children[2].firstElementChild.innerText.match(/\((.*)\)/g)
    time_string = time_string[0].split(/\s(?=P|A)/)
    // console.log(time_string)
    var converted_date = extract_date_format(time_string[0])
    if(time_string[1] == "PM)") 
    {
      pm_time = time_string[0].split(" ")[5]
      // console.log(pm_time)
      converted_pm_time = convert_pm(pm_time)
      // console.log(converted_pm_time)
      // console.log(convert_date_string(converted_date,converted_pm_time))
      changed_value = e.children[2].firstElementChild.innerText.replace(/\((.*)\)/g,convert_date_string(converted_date,converted_pm_time))
      e.children[2].firstElementChild.innerText = changed_value
    }
    else
    {
      am_time = time_string[0].split(" ")[5]
      // console.log(am_time)
      am_time = convert_hours_to_two_digits(am_time)
      // console.log(convert_date_string(converted_date,am_time))
      changed_value = e.children[2].firstElementChild.innerText.replace(/\((.*)\)/g,convert_date_string(converted_date,converted_pm_time))
      e.children[2].firstElementChild.innerText = changed_value


    }
  })


function convert_pm(time)
{
  time = time.split(":")
  console.log(time)
  if(parseInt(time[0]) != 12)
  {
    time[0] = parseInt(time[0])+12
    return time[0] + ":" + time[1]
  } 
  else
  {
    return time[0] + ":" + time[1]

  }
}

function extract_date_format(value)
{
  value = value.split(" ")
  extracted_date = value[3] + "-" + months[value[2]] + "-" + value[1]
  return extracted_date
}

function convert_date_string(date, time)
{
  format = date+"T"+time+':'+"00"+time_value
  console.log(format)
  local_date = new Date(format)
  return local_date
}

function convert_hours_to_two_digits(hour_value)
{
 if(parseInt(hour_value) < 10) return "0"+hour_value
 else return hour_value
}
// values.forEach(e =>{
    
//     console.log(e.children[2].firstElementChild.innerText)  
//   })
// time_value.forEach(element => {
//      var converted_time = new Date(element)
//     console.log(element)
//     values = Array.from(document.getElementsByClassName('ticket-details__item__header'))
// });

