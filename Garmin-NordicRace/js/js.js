$(document).ready(function() {
  $(".lober-oversigt").hide();
  $("#lober").click(function() {
    $(".lober-oversigt").slideToggle("slow");
  });

  $(".lob-track").click(function() {
    $(".lober-oversigt").slideToggle("slow");
  });
});

////////counter bpm////

var count1 = 140;
countdown1 = function() {
  count1++;
  if (count1 > 150) {
    count1 = 140;
  }
  document.getElementById("bpm").innerHTML = count1;
};
doCountdown = setInterval(countdown1, 500);

////////counter Km/T////

var count = 10;
countdown = function() {
  count++;
  if (count > 15) {
    count = 10;
  }
  document.getElementById("km").innerHTML = count;
};
doCountdown = setInterval(countdown, 1500);
