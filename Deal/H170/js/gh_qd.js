// JavaScript Document
var Ptr=document.getElementById("tab").getElementsByTagName("tr");
function bs$() {
      for (i=1;i<Ptr.length+1;i++) { 
      Ptr[i-1].className = (i%2>0)?"t1":"t2"; 
      }
}
window.onload=bs$;