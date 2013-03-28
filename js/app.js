/* app.js */
$(function() {

  patientTabs();
  reminders();
  note();
  newulcerPane();
  assessUlcerPane();
  newbradenPane();
  historyUlcer();  
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

  showUlcers();
  //showReminders();
  //showNotes();
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

    var checkbox = $('<div class="checkbox" />').html('<img src="img/check.png"/>')

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
  var $addUlcerPaneBtn = $('#addUlcerPaneBtn');

  var $addUlcerPane = $('#addUlcerPane');

  $addUlcerBtn.bind('touchstart', function(){
    $addUlcerPane.removeClass('hidden');
  }); 

  $cancelUlcerPaneBtn.bind('touchstart', function(){
    $addUlcerPane.addClass('hidden');
  }); 
  $addUlcerPaneBtn.bind('touchstart', function(){
    $addUlcerPane.addClass('hidden');
  })

  myScroll = new iScroll('addUlcerWrapper');

  function protectInputs(){
    $('#addUlcerPane input').on('touchstart', function(e){
      //e.preventDefault();
      console.log('hi')
      $(this).click();
      $(this).focus();
    });

    $('#addUlcerPhoto img').on('touchstart', function(e){
      $('#addUlcerPhotoInput').click();
    });
  }
  setTimeout(protectInputs, 500);

};


function assessUlcerPane(){

  var $assessUlcerBtn = $('.assessUlcerBtn');
  var $cancelAssessUlcerPaneBtn = $('#cancelAssessUlcerPaneBtn');
  var $saveAssessUlcerPaneBtn = $('#saveAssessUlcerPaneBtn');

  var $assessUlcerPane = $('#assessUlcerPane');

  $assessUlcerBtn.bind('touchstart', function(){
    $assessUlcerPane.removeClass('hidden');
  }); 

  $cancelAssessUlcerPaneBtn.bind('touchstart', function(){
    $assessUlcerPane.addClass('hidden');
  }); 
  $saveAssessUlcerPaneBtn.bind('touchstart', function(){
    $assessUlcerPane.addClass('hidden');
  })

  myScroll = new iScroll('assessUlcerWrapper');

  function protectInputs(){
    $('#assessUlcerPane input').on('touchstart', function(e){
      //e.preventDefault();
      console.log('hi')
      $(this).click();
      $(this).focus();
    });

    $('#assessUlcerPhoto img').on('touchstart', function(e){
      $('#assessUlcerPhotoInput').click();
    });
  }
  setTimeout(protectInputs, 500);

};

function historyUlcer() {
  var $historyUlcerBtn = $('.historyUlcerBtn');
  var $cancelHistoryUlcerPaneBtn = $('#cancelHistoryUlcerPaneBtn');
  var $saveHistoryUlcerPaneBtn = $('#saveHistoryUlcerPaneBtn');

  var $historyUlcerPane = $('#historyUlcerPane');
  $historyUlcerBtn.bind('touchstart', function(){
    $historyUlcerPane.removeClass('hidden');
  }); 
  $cancelHistoryUlcerPaneBtn.bind('touchstart', function(){
    console.log('hi');
    $historyUlcerPane.addClass('hidden');
  }); 
  $saveHistoryUlcerPaneBtn.bind('touchstart', function(){
    console.log('hi');
    $historyUlcerPane.addClass('hidden');
  })

}


function newbradenPane(){

  // toggle Braden panel
  var $bradenBtn = $('#bradenBtn');
  var $testRiskBtn = $('#testRiskBtn');
  var $cancelBradenBtn = $('#cancelBradenBtn');
  var $saveBradenBtn = $('#saveBradenBtn');

  var $bradenScalePane = $('#bradenScalePane');

  $bradenBtn.bind('touchstart', function(){
    $bradenScalePane.removeClass('hidden');
  });
  $testRiskBtn.bind('touchstart', function(){
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

  var bradenScore = 0;
  var risk;

  $bradenSteps = $('#bradenScalePane ul.steps > li');
  $bradenOptions = $('#bradenScalePane ul.stepOptions > li');
  $bradenOptions.on('click', function(e){  
    var $bradenSelected = '#' + $(this).attr('id');
    if ($bradenSelected.indexOf('One') >= 0) bradenScore += 1;
    if ($bradenSelected.indexOf('Two') >= 0) bradenScore += 2;
    if ($bradenSelected.indexOf('Three') >= 0) bradenScore += 3;
    if ($bradenSelected.indexOf('Four') >= 0) bradenScore += 4;
 
    console.log(bradenScore);
    console.log($bradenSelected);
    $($bradenSelected).toggleClass('selected');

    if (bradenScore <= 9) risk = 'Very High Risk';
    if (bradenScore > 9 && bradenScore <= 12) risk = 'High Risk';
    if (bradenScore > 12 && bradenScore <= 14) risk = 'Medium Risk';
    if (bradenScore > 14 && bradenScore <= 18) risk = 'Low Risk';
    if (bradenScore > 19) risk = 'No Risk';

    var $finalScore = $('#finalScore');
    $finalScore.text(bradenScore + ' - ' + risk);
  });

  $bradenSteps.on('click', function(e){
    $(this).toggleClass('collapsed');
    myScroll.refresh();
  });
};
