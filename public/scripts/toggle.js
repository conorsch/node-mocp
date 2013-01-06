console.log($('input'));

$(function() {
  $('input').click( function () {
    $.get('/' + $(this).data('control'));
  });
});
