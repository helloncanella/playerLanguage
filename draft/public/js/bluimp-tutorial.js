$(function() {
  $('#fileupload').fileupload({
    dataType: 'json',
    done: function(e, data) {
      console.log(data);
      console.log(data.result.files)
      $.each(data.result.files, function(index, file) {
        console.log(file.name);
        $('<p/>').text(file.name).appendTo(document.body);
      });
    }

  });
});
