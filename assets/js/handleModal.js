var initJudulPemateri
var initDeskripsi
var initSyarat
var initWaktu

$(document).ready(function () {
  saveInitialTemplate();
  $(".modal").on("show.bs.modal", function (e) {
    var day = $(e.relatedTarget).attr("data-day");
    var room = $(e.relatedTarget).attr("data-ruang");
    var id = $(e.relatedTarget).attr("data-id");
    restoreTemplate();
    getData(day, room, id);

  })
})

function saveInitialTemplate(){
    initJudulPemateri = $("#pemateri-detail-heading").html()
    initDeskripsi = $("#pemateri-detail-deskripsi").html()
    initSyarat = $("#pemateri-detail-syarat").html()
    initWaktu = $("#pemateri-detail-waktu-ruang").html()
}

function restoreTemplate(){
    $("#pemateri-detail-heading").html(initJudulPemateri)
    $("#pemateri-detail-deskripsi").html(initDeskripsi)
    $("#pemateri-detail-syarat").html(initSyarat)
    $("#pemateri-detail-waktu-ruang").html(initWaktu)
}

function getData(day, room, id) {
  var thisDetails = null;
  $.ajax("/pemateri.json").done(function (data) {

    if (!data.hasOwnProperty(day)) return false;

    if (!data[day].hasOwnProperty(room)) return false;

    data[day][room].forEach((item, i) => {
      if (item.id == id) thisDetails = data[day][room][i];
    });

    // atur judul
    if (thisDetails.hasOwnProperty("agenda")) {
      if (thisDetails.agenda !== null) {
        $("#pemateri-detail-heading").html(thisDetails.agenda);
      }
    }
    // atur prasyarat
    if (thisDetails.hasOwnProperty("prereqs")) {
      var syarat = "<b>Class Requirements:</b>-";
      if (thisDetails.prereqs !== null) {
        syarat = "<b>Class Requirements:</b><br><ol>";
        thisDetails.prereqs.forEach((item, i) => {
          syarat += "<li>" + item + "</li>";
        });
        syarat += "</ol>";
      }
      $("#pemateri-detail-syarat").html(syarat);
    }
    // atur deskripsi
    if (thisDetails.hasOwnProperty("description")) {
      if (thisDetails.description !== null) {
        $("#pemateri-detail-deskripsi").html("<b>Description:</b><br>" + thisDetails.description);
      }
    }
    // atur waktu
    if (thisDetails.hasOwnProperty("time")) {
      if (thisDetails.time !== null) {
        // atur ruang
        $("#pemateri-detail-waktu-ruang").html("<b>Time / Room</b>:<br>" + thisDetails.time + " (" + day.toUpperCase() + ") / " + room.toUpperCase());
      }
    }

  });

}
