function myFunction() {
  alert("I am an alert box!");

  document.getElementById("runnerpopup").style.visibility = "visible";
}
$(document).mouseup(function(e) {
  var container = $("Rmarker");

  // If the target of the click isn't the container
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    $("#runnerpopup").css("visibility", "hidden");
  }
});
