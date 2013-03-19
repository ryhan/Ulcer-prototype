/* app.js */
$(function() {

  patientTabs();
  reminders();
  note();
  newulcerPane();
  newbradenPane();
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
};


// Manages Reminders Tab
function reminders(){

  // Manage toggling on/off reminders
  $('#reminderList').on('touchstart', '.checkbox', function(e){
    $(e.target.parentNode).toggleClass('complete');
    $(e.target.parentNode.parentNode).toggleClass('complete');
  });

  $reminderInput = $('#reminderText');
  $tabsection = $('.main .tabsection');

  $reminderForm = $('#reminderList li.newReminder');

  $navBtns = $('.main #mainNav .btn');
  $postNoteBtn = $('#postNoteBtn');
  $cancelNoteBtn = $('#cancelNoteBtn');

  $reminderInput.on('touchstart', function(){
    $('.tabsection').addClass('full');

    $navBtns.hide();
    $postNoteBtn.removeClass('hidden');
    $postNoteBtn.show();
    $cancelNoteBtn.removeClass('hidden');
    $cancelNoteBtn.show();

    window.scrollTo(0,0);
    setTimeout(function(){$reminderInput.focus();}, 500);
  });

  $cancelNoteBtn.on('touchstart', function(){
    $('.tabsection').removeClass('full');

    $navBtns.show();
    $postNoteBtn.addClass('hidden');
    $postNoteBtn.hide();
    $cancelNoteBtn.addClass('hidden');
    $cancelNoteBtn.hide();
  });

  $postNoteBtn.on('touchstart', function(){
    $('.tabsection').removeClass('full');

    message = $reminderInput.val();
    if (message.length > 0){
      postReminder(message, 'Today');
    }

    $reminderInput.val(' ')

    $navBtns.show();
    $postNoteBtn.addClass('hidden');
    $postNoteBtn.hide();
    $cancelNoteBtn.addClass('hidden');
    $cancelNoteBtn.hide();

  })

  var postReminder = function(message, time){
    var newli = $('<li />');

    var checkbox = $('<div class="checkbox" />');
    checkbox.innerHTML = '<img src="img/check.png"/>';

    var date = $('<div class="time" />').text(time);

    newli.append(checkbox);
    newli.append(message);
    newli.append(date);

    $reminderForm.after(newli);
  }



};

// Manages Notes Tab
function note(){

  $noteInput = $('#noteText');
  $postNoteBtn = $('#postNoteBtn');
  $cancelNoteBtn = $('#cancelNoteBtn');
  $noteForm = $('#noteList li.newNote');

  $navBtns = $('.main #mainNav .btn');
  //$captureBtn = $('#captureBtn');

  $tabsection = $('.main .tabsection');

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

    if ($noteInput.val().length > 0){
      postNote(message, tags, time);
    }

    $postNoteBtn.addClass('hidden');
    $noteInput.val('');

    $noteInput.blur();
  });



  // Selectively hide/show elements above the input so that 
  // everything fits in with the iPad keyboard.
  //$noteInput.focus(function(){
  $noteInput.on('touchstart', function(){
    $('.tabsection').addClass('full');

    $navBtns.hide();
    $postNoteBtn.removeClass('hidden');
    $postNoteBtn.show();
    $cancelNoteBtn.removeClass('hidden');
    $cancelNoteBtn.show();

    //$captureBtn.removeClass('btnBlue');
    window.scrollTo(0,0);
    setTimeout(function(){$noteInput.focus();}, 500);
  });

  $noteInput.blur(function(){
    $('.tabsection').removeClass('full');
    //$captureBtn.addClass('btnBlue');

    $navBtns.show();
    $postNoteBtn.addClass('hidden');
    $postNoteBtn.hide();
    $cancelNoteBtn.addClass('hidden');
    $cancelNoteBtn.hide();
  });

  // Show the 'post' button only when there's content.
  /*
  $noteInput.keypress(function(){
    console.log('hi');
    if ($noteInput.val().length > 0){
      $postNoteBtn.removeClass('hidden');
    }else{
      $postNoteBtn.addClass('hidden');
    }
  });*/

};

function newulcerPane(){

  var $addUlcerBtn = $('#addUlcerBtn');
  var $cancelUlcerPaneBtn = $('#cancelUlcerPaneBtn');

  var $addUlcerPane = $('#addUlcerPane');

  $addUlcerBtn.bind('touchstart', function(){
    $addUlcerPane.removeClass('hidden');
  }); 

  $cancelUlcerPaneBtn.bind('touchstart', function(){
    $addUlcerPane.addClass('hidden');
  }); 

};

function newbradenPane(){

  // toggle Braden panel
  var $bradenBtn = $('#bradenBtn');
  var $cancelBradenBtn = $('#cancelBradenBtn');
  var $saveBradenBtn = $('#saveBradenBtn');

  var $bradenScalePane = $('#bradenScalePane');

  $bradenBtn.bind('touchstart', function(){
    $bradenScalePane.removeClass('hidden');
  });

  $cancelBradenBtn.bind('touchstart', function(){
    $bradenScalePane.addClass('hidden');
  });
  $saveBradenBtn.bind('touchstart', function(){
    $bradenScalePane.addClass('hidden');
  });

  //$bradenScalePane.removeClass('hidden');

  // toggle step collapsed state
  
  myScroll = new iScroll('bradenWrapper');
  

  $bradenSteps = $('#bradenScalePane ul.steps > li');
  $bradenSteps.on('click', function(e){
    $(this).toggleClass('collapsed');
    myScroll.refresh();
  });


  

};
