//PAGES
const START = "Start"
const VV = "Vorlesungsverzeichnis"
const GRADES = "Notenspiegel"

const PAGES = {
  START: "PRGNAME=MLSSTART",
  GRADES: "PRGNAME=GRADEOVERVIEW"
};
const SPECIAL_PAGES = {
  VV: ["PRGNAME=ACTION", ]

}
console.log(PAGES.GRADES)
function max(arr){
  return Math.max.apply(null, arr);
}

function sum(arr){
  return  arr.reduce((a, b) => a + b, 0);
}
/*
function gradeoverview(){
  labels = [];
  $('table.nb').children('tbody').children('tr').eq(0).children('td').each(function(){
    labels.push($(this).text());
  });
  labels.splice(0,1);

  students = [];
  $('table.nb').children('tbody').children('tr').eq(1).children('td').each(function(){
    if(isNaN(parseInt($(this).text())))
      students.push(0);
    else
       students.push(parseInt($(this).text()));
  });
  students.splice(0,1);
alert(max());
  var max = max(students);
  var sum = sum(students);
  var durchfallquote = Math.round(students[students.length-1]/sum*100*100)/100;
  var bestanden = 100-durchfallquote;

  if(isNaN(max) || isNaN(sum) || isNaN(durchfallquote))
    return;

  // Bestanden - Durchgefallen Progress Bar
  $('#pageContentPopUp > div.tb').prepend('<div class="bar-wrapper"><span class="green"><b>Bestanden</b> <br>'+bestanden+'%</span><strong class="bar-label"></strong><progress class="pbar" max="100" value="'+bestanden+'"> '+bestanden+'% / '+durchfallquote+'% </progress><span><b>Durchgefallen</b> <br> '+durchfallquote+'%</span></div>');

  // Notenverteilung Chart
  $('#pageContentPopUp > div.tb').prepend('<ul id="grade-chart" class="chart-grades"></ul>');

  for (var i = 0; i < students.length; i++){
    var height = students[i]/max*100;
    if(height == 0)
      height += 1;
    $('#grade-chart').append('<li><div style="height:'+  height +'%" title="'+labels[i]+'" value="'+students[i]+'"><span class="chart-value">'+students[i]+'</span></div></li>');
  }

}
*/

//$('#imagePageHeadLeft').attr('src', '');

//moz-extension://0058ebac-72f6-41e1-86b4-d3dba5cec76e/img/tu-logo.png

var url = window.location.href;

if(url.includes(PAGES.START)){

  
const header = document.getElementById("contentSpacer_IE").getElementsByTagName("h2")[1];


//Aktuelles

//TODO: Testen ob Seite Aktuelles ist
const tableDiv = document.getElementsByClassName("tb rw-table")[0]
const messageDiv = document.getElementsByClassName("tb rw-table")[1]

const subheadSchedule = tableDiv.getElementsByClassName("tbsubhead");
const subheadMessage = messageDiv.getElementsByClassName("tbsubhead");

const scheduler = tableDiv.getElementsByClassName("tbcontrol")[0].getElementsByTagName("a")[0]
const archive = messageDiv.getElementsByClassName("tbcontrol")[0].getElementsByTagName("a")[0]

  let aktivitaeten = []
  let nachrichtenList = []
  
  //Wenn table existiert
  if (tableDiv.getElementsByTagName("table").length > 0) {
     const veranstaltungen = tableDiv.getElementsByTagName("table")[0]
     if (veranstaltungen.getElementsByTagName("tr").length > 1) {
        for (i = 1; i < veranstaltungen.getElementsByTagName("tr").length; i++) {
           let v = veranstaltungen.getElementsByTagName("tr")[i].cells[0].innerText
           let name = veranstaltungen.getElementsByTagName("tr")[i].cells[1].innerText
           let von_bis = "von " + veranstaltungen.getElementsByTagName("tr")[i].cells[2].innerText + " bis " + veranstaltungen.getElementsByTagName("tr")[i].cells[3].innerText
           aktivitaeten.push(v + ";" + name + ";" + von_bis)
        }
     }
  } else {
     let text = "Es sind keine Aktivitäten für den Tag vorhanden!"
     if (subheadMessage.length > 0) {
        text = subheadSchedule[0].textContent
     }
     aktivitaeten.push(text + ";" + "" + ";" + "")
  }
  
  aktivitaeten.push(scheduler.textContent + ";" + "<a href='" + scheduler.href + "' style='color: white'><span style='color: white'>" + '<i style="color: white;" class="fa-solid fa-clock"></i> ' + scheduler.textContent + "</a></span>" + ";" + "")
  tableDiv.innerHTML = `<div class='parent'></div>`
  const grid = document.getElementsByClassName("parent")[0];
  const firstRow = document.createElement("div")
  firstRow.classList = "elements"
  firstRow.appendChild(header)
  grid.appendChild(firstRow);
  for (i = 0; i < aktivitaeten.length; i++) {
     let sp = aktivitaeten[i].split(";");
     let el = document.createElement("div")
     el.classList = "elements"
     el.innerHTML = "<h3>" + sp[0] + "</h3><h4>" + sp[1] + "</h4><h5>" + sp[2] + "</h5>"
     grid.appendChild(el)
  
  }
  
  //Wenn message existiert
  const msgHeader = messageDiv.getElementsByClassName("tbhead")[0]
  if (messageDiv.getElementsByTagName("table").length > 0) {
     const nachrichten = messageDiv.getElementsByTagName("table")[0]
     if (nachrichten.getElementsByTagName("tr").length > 1) {
        for (i = 1; i < nachrichten.getElementsByTagName("tr").length; i++) {
           let datum = nachrichten.getElementsByTagName("tr")[i].cells[0].innerText
           let uhrzeit = nachrichten.getElementsByTagName("tr")[i].cells[1].innerText
           let vonan = nachrichten.getElementsByTagName("tr")[i].cells[2].innerText
           let betreff = nachrichten.getElementsByTagName("tr")[i].cells[3].innerText
           nachrichtenList.push(datum + ";" + uhrzeit + ";" + vonan + ";" + betreff)
        }
     }
  } else {
     let text = "Es sind keine Nachrichten vorhanden!"
     if (subheadMessage.length > 0) {
        text = subheadMessage[0].textContent
     }
     nachrichtenList.push(text + ";" + "" + ";" + "" + ";" + "")
  }
  
  messageDiv.innerHTML = "<div class='parent'></div>"
  nachrichtenList.push(archive.textContent + ";" + "<a href='" + archive.href + "' ><span style='color: white'>" + '<i style="color: white;" class="fa-solid fa-message"></i> ' + archive.textContent + "</a></span>" + ";" + "" + ";" + "")
  
  
  
  const grid2 = document.getElementsByClassName("parent")[1];
  const firstRow2 = document.createElement("div")
  firstRow2.classList = "elements"
  const msgHeaderText = document.createElement("h2")
  msgHeaderText.textContent = msgHeader.textContent
  firstRow2.appendChild(msgHeaderText)
  grid2.appendChild(firstRow2);
  
  for (i = 0; i < nachrichtenList.length; i++) {
     let sp = nachrichtenList[i].split(";");
     let el = document.createElement("div")
     el.classList = "elements"
     el.innerHTML = "<h3>" + sp[0] + "</h3><h4>" + sp[1] + "</h4><h5>" + sp[2] + "</h5><h5>" + sp[3] + "</h5>"
     grid2.appendChild(el)
  
  }
  //Remove

}
else if(url.includes(PAGES.GRADES)){
  //$('#pageContentPopUp > h2').eq(1).replaceWith('<h3>'+$('#pageContentPopUp > h2').eq(1).html()+'</h3>');

  labels = [];
  $('table.nb').children('tbody').children('tr').eq(0).children('td').each(function(){
    labels.push($(this).text());
  });
  labels.splice(0,1);

  students = [];
  $('table.nb').children('tbody').children('tr').eq(1).children('td').each(function(){
    if(isNaN(parseInt($(this).text())))
      students.push(0);
    else
       students.push(parseInt($(this).text()));
  });
  students.splice(0,1);

  var max = max(students);
  var sum = sum(students);
  var durchfallquote = Math.round(students[students.length-1]/sum*100*100)/100;
  var bestanden = Math.round((100-durchfallquote)*100)/100;

  if(!(isNaN(max) || isNaN(sum) || isNaN(durchfallquote))){

      $('div.tbhead').html("Made with BetterTUCaN Add-On by Jonas Emrich");
      $('div.tbhead').addClass("credit");

      // Bestanden - Durchgefallen Progress Bar
      $('#pageContentPopUp > div.tb').prepend('<div class="bar-wrapper"><span class="green"><b>Bestanden</b> <br>'+bestanden+'%</span><strong class="bar-label"></strong><progress class="pbar" max="100" value="'+bestanden+'"> '+bestanden+'% / '+durchfallquote+'% </progress><span><b>Durchgefallen</b> <br> '+durchfallquote+'%</span></div>');

      // Notenverteilung Chart
      $('#pageContentPopUp > div.tb').prepend('<ul id="grade-chart" class="chart-grades"></ul>');

      for (var i = 0; i < students.length; i++){
        var height = students[i]/max*100;
        var percentage = Math.round(students[i]/sum*100*10)/10;
        if(height == 0)
          height += 1;
        $('#grade-chart').append('<li><div style="height:'+  height +'%" title="'+labels[i]+'" value="'+percentage+'"><span class="chart-value">'+percentage+'%</span></div></li>');
      }
  }

}
