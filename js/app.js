/* app.js */
$(function() {

  patientTabs();
  reminders();
  note();
  newulcerPane();
  assessUlcerPane();
  newbradenPane();
  allTestsPane();
  historyUlcer();  
  historySlider();
  notes();

});

var iScroll;

// Manages Ulcer / Reminders / Notes Tabs
function patientTabs(){

  // Tap Targets
  var $tabs = $('.main .tabs li');
  var $ulcerTab = $('#ulcerTab');
  var $testTab = $('#testTab');
  var $reminderTab = $('#reminderTab');
  var $noteTab = $('#noteTab');

  var $lists = $('.main .tabcontent');
  var $ulcerList = $('#ulcerList');
  var $testList = $('#testList');
  var $reminderList = $('#reminderList');
  var $noteList = $('#noteList');

  var showUlcers = function(){
    $tabs.removeClass('selected');
    $ulcerTab.addClass('selected');
    $lists.addClass('hidden');
    $ulcerList.removeClass('hidden');
  }

  var showTests = function(){
    $tabs.removeClass('selected');
    $testTab.addClass('selected');
    $lists.addClass('hidden');
    $testList.removeClass('hidden');
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
  $testTab.bind('touchstart', showTests);
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


  /*
  var myScroll = new iScroll('reminders');
  */

  $reminderInput = $('#reminderText');
  $tagReminderInput = $('#tagReminderText');

  $tabsection = $('.main .tabsection');

  $reminderForm = $('#reminderList li.newReminder');

  $navBtns = $('.main #mainNav .btn');
  $reminderNoteBtn = $('#reminderNoteBtn');
  $postNoteBtn = $('#postNoteBtn');  
  $cancelNoteBtn = $('#cancelNoteBtn');

  $reminderInput.on('touchstart', function(){
    $('.tabsection').addClass('full');

    $navBtns.hide();
    $reminderNoteBtn.removeClass('hidden');
    $reminderNoteBtn.show();
    $cancelNoteBtn.removeClass('hidden');
    $cancelNoteBtn.show();

    window.scrollTo(0,0);
    setTimeout(function(){$reminderInput.focus();}, 500);
  });

  $cancelNoteBtn.on('touchstart', function(){
    $('.tabsection').removeClass('full');

    $navBtns.show();
    $reminderNoteBtn.addClass('hidden');
    $postNoteBtn.addClass('hidden');    
    //$reminderNoteBtn.hide();
    $cancelNoteBtn.addClass('hidden');
    $cancelNoteBtn.hide();
  });

  $reminderNoteBtn.on('touchstart', function(){
    $('.tabsection').removeClass('full');

    var tag = $tagReminderInput.val().split(',').join('<br>');

    message = $reminderInput.val();
    if (message.length > 0){
      postReminder(message, tag, 'Today');
    }

    $reminderInput.val(' ');
    $tagReminderInput.val(' ');

    $navBtns.show();
    $reminderNoteBtn.addClass('hidden');
    //$reminderNoteBtn.hide();
    $cancelNoteBtn.addClass('hidden');
    $cancelNoteBtn.hide();

  })

  var postReminder = function(message, tag, time){
    var newli = $('<li />');

    var checkbox = $('<div class="checkbox" />').html('<img src="img/check.png"/>')
    var tags = $('<div class="tags" />').html(tag);

    var date = $('<div class="time" />').text(time);

    newli.append(checkbox);
    newli.append(message);
    newli.append(tags);    
    newli.append(date);

    $reminderForm.after(newli);
  }



};

// Manages Notes Tab
function note(){

  $noteInput = $('#noteText');
  $tagInput = $('#tagText');  
  $postNoteBtn = $('#postNoteBtn');
  $cancelNoteBtn = $('#cancelNoteBtn');
  $noteForm = $('#noteList li.newNote');

  $navBtns = $('.main #mainNav .btn');
  //$captureBtn = $('#captureBtn');

  $tabsection = $('.main .tabsection');

  var postNote = function(message, tag, date){
    $('.tabsection').removeClass('full');
    var tags = $('<div class="tags" />').html(tag);
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
    var tags = $tagInput.val().split(',').join('<br>');
    //var tags = "Ulcer 3";
    var time = "Tuesday March 19, 2013 at 10:45am";

    if ($noteInput.val().length > 0){
      postNote(message, tags, time);
    }

    $postNoteBtn.addClass('hidden');
    $noteInput.val('');
    $tagInput.val('');

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

  $tagInput.on('touchstart', function(){
    $('.tabsection').addClass('full');

    $navBtns.hide();
    $postNoteBtn.removeClass('hidden');
    $postNoteBtn.show();
    $cancelNoteBtn.removeClass('hidden');
    $cancelNoteBtn.show();

    //$captureBtn.removeClass('btnBlue');
    window.scrollTo(0,0);
    setTimeout(function(){$tagInput.focus();}, 500);
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

  var myScroll = new iScroll('addUlcerWrapper');

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
  var $backHistoryUlcerPaneBtn = $('#backHistoryUlcerPaneBtn');
  var $exportHistoryUlcerPaneBtn = $('#exportHistoryUlcerPaneBtn');

  var $historyUlcerPane = $('#historyUlcerPane');
  $historyUlcerBtn.bind('touchstart', function(){
    $historyUlcerPane.removeClass('hidden');
  }); 
  $backHistoryUlcerPaneBtn.bind('touchstart', function(){
    console.log('hi');
    $historyUlcerPane.addClass('hidden');
  }); 

}

function allTestsPane() {
  var $testsBtn = $('#testsBtn');
  var $cancelTests = $('#cancelTests');
  
  var $testsPane = $('#allTestsPane');

  $testsBtn.bind('touchstart', function() {
    $testsPane.removeClass('hidden');
  });
  $cancelTests.bind('touchstart', function() {
    $testsPane.addClass('hidden');
  });
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
  // $bradenOptions.on('click', function(e){  
  //   var parent = $(this).parent();
  //   var selected = parent.find('.selected');
  //   if (selected) {
  //     selected
  //   }
  //   parent.children().index(this);
  //   // var $bradenSelected = '#' + $(this).attr('id');
  //   // if ($bradenSelected.indexOf('One') >= 0) bradenScore += 1;
  //   // if ($bradenSelected.indexOf('Two') >= 0) bradenScore += 2;
  //   // if ($bradenSelected.indexOf('Three') >= 0) bradenScore += 3;
  //   // if ($bradenSelected.indexOf('Four') >= 0) bradenScore += 4;
 
  //   // console.log(bradenScore);
  //   // console.log($bradenSelected);
  //   // $($bradenSelected).toggleClass('selected');

  //   if (bradenScore <= 9) risk = 'Very High Risk';
  //   if (bradenScore > 9 && bradenScore <= 12) risk = 'High Risk';
  //   if (bradenScore > 12 && bradenScore <= 14) risk = 'Medium Risk';
  //   if (bradenScore > 14 && bradenScore <= 18) risk = 'Low Risk';
  //   if (bradenScore > 19) risk = 'No Risk';

  //   var $finalScore = $('#finalScore');
  //   $finalScore.text(bradenScore + ' - ' + risk);
  // });

  var $finalScore = $('#finalScore');
  $bradenSteps.on('click', function(e){
    var $target = $(e.target);
    if ($target.hasClass('bradenOption')) {
      var options = $(this).find('.stepOptions > li');
      var selected = $(this).find('.stepOptions > li.selected');
      if (selected.length > 0) {
        selected.removeClass('selected');
        bradenScore -= options.index(selected[0]) + 1;
      }
      if (selected.length === 0 ||
          selected[0] !== e.target) {
        $target.addClass('selected');
        bradenScore += options.index(e.target) + 1;
      }

      if (bradenScore <= 9) risk = 'Very High Risk';
      if (bradenScore > 9 && bradenScore <= 12) risk = 'High Risk';
      if (bradenScore > 12 && bradenScore <= 14) risk = 'Medium Risk';
      if (bradenScore > 14 && bradenScore <= 18) risk = 'Low Risk';
      if (bradenScore > 19) risk = 'No Risk';

      $finalScore.text(bradenScore + ' - ' + risk);
      if ($(this).find('.stepOptions > li.selected').length === 0) {
        $(this).removeClass('collapsed');
        myScroll.refresh();
      }
    } else {
      if ($(this).find('.selected').length > 0) {
        $(this).toggleClass('collapsed');
      }
      myScroll.refresh();
    }
  });

};

function notes() {
  $('.addNotes').on('click', function(e) {
    $postNewNoteBtn = $(this).siblings('.postNote');
    $newNoteForm = $(this).siblings('.extraNotes');
    $newNoteInput = $(this).siblings('textarea');    
    $(this).siblings('.hidden').removeClass('hidden');    
    $(this).next("textarea").focus();    
    $postNewNoteBtn.bind('touchstart', function(){
      var message = $newNoteInput.val();
      console.log(message);
      var time = "Tuesday March 19, 2013 at 10:45am";

      if ($newNoteInput.val().length > 0){
        postNote(message, time);
      }
      $newNoteInput.addClass('hidden');
      $postNewNoteBtn.addClass('hidden');
      $newNoteInput.val('');

      $newNoteInput.blur();
    });      
  });

  var postNote = function(message, date){
    var date = $('<div class="time" />').text(date);
    var message = $('<p />').text(message);

    var newli = $('<li />');
    newli.append(date);
    newli.append(message);
    $newNoteForm.append(newli);
  };

  //console.log($postNewNoteBtn);

}

function historySlider() {
//  var height = $('#imageList li img').height();
  //console.log(height);
  //$('#historyWrapper').css('height', height);
  var myScrollHistory = new iScroll('historyWrapper', { hScrollbar: false, vScrollbar: false, vScroll: false });
  myScrollHistory.refresh();
}
