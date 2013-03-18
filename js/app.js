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

  $noteInput.keypress(function(){
    console.log('hi');
    if ($noteInput.val().length > 0){
      $postNoteBtn.removeClass('hidden');
    }else{
      $postNoteBtn.addClass('hidden');
    }
  });

}