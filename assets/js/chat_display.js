// (function($) {
//     $(document).ready(function() {
//         var $chatbox = $('.chatbox'),
//             $chatboxTitle = $('.chatbox__title'),
//             $chatboxTitleClose = $('.chatbox__title__close'),
//             $chatboxCredentials = $('.chatbox__credentials');
//         $chatboxTitle.on('click', function() {
//             $chatbox.toggleClass('chatbox--tray');
//         });
//         $chatboxTitleClose.on('click', function(e) {
//             e.stopPropagation();
//             $chatbox.addClass('chatbox--closed');
//         });
//         $chatbox.on('transitionend', function() {
//             if ($chatbox.hasClass('chatbox--closed')) $chatbox.remove();
//         });
//         $chatboxCredentials.on('submit', function(e) {
//             e.preventDefault();
//             $chatbox.removeClass('chatbox--empty');
//         });
//     });
// })(jQuery);
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
      document.getElementById("collapsible").style.bottom = "10px";
    } else {
      content.style.display = "block";
      document.getElementById("collapsible").style.bottom = "353px";
    }
  });
}