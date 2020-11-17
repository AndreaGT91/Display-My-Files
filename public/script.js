$(document).ready(function(){
  getFiles()
  // .then(function(data) {
  //   console.log(data);
  // });
});

const getFiles = function() {
  $.get("/api/files", function(data, status) {
    console.log(data);
  });
  // return $.ajax({
  //   url: "/api/files",
  //   method: "GET"
  // });
};