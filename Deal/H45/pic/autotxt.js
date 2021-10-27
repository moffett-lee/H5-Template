var tickspeed=4000
var enablesubject=1 ///

if (document.getElementById){
document.write('<style type="text/css">\n')
document.write('.dropmrc{display:none;}\n')
document.write('</style>\n')
}

var selectedDiv=0
var totalDivs=0
function contractall(){
var inc=0
while (document.getElementById("dropmsg"+inc)){
document.getElementById("dropmsg"+inc).style.display="none"
inc++
}
}
function expandone(){
var selectedDivObj=document.getElementById("dropmsg"+selectedDiv)
contractall()
document.getElementById("dropmrcsubject").innerHTML=selectedDivObj.getAttribute("subject")
selectedDivObj.style.display="block"
selectedDiv=(selectedDiv<totalDivs-1)? selectedDiv+1 : 0
setTimeout("expandone()",tickspeed)
}
function startscroller(){
while (document.getElementById("dropmsg"+totalDivs)!=null)
totalDivs++
expandone()
if (!enablesubject)
document.getElementById("dropmrcsubject").style.display="none"
}
if (window.addEventListener)
window.addEventListener("load", startscroller, false)
else if (window.attachEvent)
window.attachEvent("onload", startscroller)