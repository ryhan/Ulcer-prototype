/* app.js */
$(function() {
  patientTabs();
  reminders();
  note();
});

// Manages Ulcer / Reminders / Notes Tabs
function patientTabs(){

  // Tap Targets
  var $tabs = $('.main .tabs li');
  var $ulcerTab = $('#ulcerTab');
  var $reminderTab = $('#reminderTab');
  var $noteTab = $('#noteTab');

  var $lists = $('.main .tabcontent');
  var $ulcerList = $('#ulcerList');
  var $reminderList = $('#reminderList');
  var $noteList = $('#noteList');

  var showUlcers = function(){
    $tabs.removeClass('selected');
    $ulcerTab.addClass('selected');
    $lists.addClass('hidden');
    $ulcerList.removeClass('hidden');
  }

  var showReminders = function(){
    $tabs.removeClass('selected');
    $reminderTab.addClass('selected');
    $lists.addClass('hidden');
    $reminderList.removeClass('hidden');
  }

  var showNotes = function(){
    $tabs.removeClass('selected');
    $noteTab.addClass('selected');
    $lists.addClass('hidden');
    $noteList.removeClass('hidden');
  }

  $ulcerTab.bind('touchstart', showUlcers);
  $reminderTab.bind('touchstart', showReminders);
  $noteTab.bind('touchstart', showNotes);

  //showUlcers();
  //showReminders();
  showNotes();
}


// Manages Reminders Tab
function reminders(){

  // Manage toggling on/off reminders
  $('#reminderList').on('touchstart', '.checkbox', function(e){
    $(e.target.parentNode).toggleClass('complete');
    $(e.target.parentNode.parentNode).toggleClass('complete');
  });

}

// Manages Notes Tab
function note(){

  $noteInput = $('#noteText');
  $postNoteBtn = $('#postNoteBtn');
  $noteForm = $('#noteList li.newNote');

  $header = $('.main header');
  $divider = $('.main .tabdivider');

  var postNote = function(message, tag, date){

    var tags = $('<div class="tags" />').text(tag);
    var date = $('<div class="time" />').text(date);
    var message = $('<p />').text(message);

    var newli = $('<li />');
    newli.append(tags);
    newli.append(date);
    newli.append(message);

    $noteForm.after(newli);
  }

  $postNoteBtn.bind('touchstart', function(){
    var message = $noteInput.val();
    var tags = "Ulcer 3";
    var time = "Tuesday March 19, 2013 at 10:45am";

    $postNoteBtn.addClass('hidden');
    $noteInput.val('');

    postNote(message, tags, time);
  });



  // Selectively hide/show elements above the input so that 
  // everything fits in with the iPad keyboard.
  $noteInput.focus(function(){
    $header.hide();
    $divider.hide();
  });

  $noteInput.blur(function(){
    $header.show();
    $divider.show();
  });

  // Show the 'post' button only when there's content.
  $noteInput.keypress(function(){
    console.log('hi');
    if ($noteInput.val().length > 0){
      $postNoteBtn.removeClass('hidden');
    }else{
      $postNoteBtn.addClass('hidden');
    }
  });

}