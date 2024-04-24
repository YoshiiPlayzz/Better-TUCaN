/*

    window.onload = function() {
    var src = "$('#field_user').attr('placeholder', 'TU-ID');"+ "$('#field_pass').attr('placeholder', 'Passwort');"+
            "document.getElementById('field_pass').type = 'password';"+
            "$('#inhalt p[style*=\"color: darkred\"]').css('color', 'red');";

    var jq = document.createElement('script');
    jq.append(src);
    document.head.appendChild(jq);
    const navigation = document.getElementById("pageTopNavi");
    navigation.style.backgroundImage = 'url("' + chrome.runtime.getURL("img/Fucan_dark.png") + '")';
    const body = document.body
    body.innerHTML = '<link rel="stylesheet" href="' + chrome.runtime.getURL("fontawesome/css/all.css") + '"/>' + '<script src="' + chrome.runtime.getURL("fontawesome/js/all.js") + '"></script>'  + document.body.innerHTML
    
    }
*/
$(() =>{

const logged_in = $('#field_user').length <= 0;  
if(!logged_in){
        console.log("Not logged in!!!")
$('#field_user').attr('placeholder', 'TU-ID');

$('#field_pass').attr('placeholder', 'Passwort');
$('#field_pass').attr("autocomplete", "on");    
$('#inhalt p[style*=\"color: darkred\"]').css('color', 'red');
}
navigation.style.backgroundImage = 'url("' + chrome.runtime.getURL("img/Fucan_dark.png") + '")';

})
