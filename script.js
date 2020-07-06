$(function() {
  $('html').addClass("govuk-template");
  $('body').addClass("govuk-template__body");
});

document.addEventListener('DOMContentLoaded', function() {
  
  $(document.body).addClass('js-enabled');
  
  /* cookie banner starts */  
    //to delete cookie banner cookies ...
  	//document.cookie = "seen_cookie_message_help=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  	//document.cookie = "AnalyticsConsent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  
    function writeCookie (key, value, days) {
        var date = new Date();
        days = days || 365;// Default at 365 days
        date.setTime(+ date + (days * 86400000)); //24 * 60 * 60 * 1000
        window.document.cookie = key + "=" + value + "; expires=" + date.toGMTString() + "; path=/";
        return value;
    }  
    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
  
    var $cookieBanner = $('#global-cookie-message-help');
    var cookieHelp = readCookie('seen_cookie_message_help');
		
  	if (cookieHelp == null) {//cookie does not exist
      var href = $cookieBanner.find('.gem-c-cookie-banner__button-settings').find('.gem-c-button').attr('href');
      var url = window.location.href; 
    }

  	if(href == url){
     	$cookieBanner.find('.gem-c-cookie-banner__wrapper').hide();   
    }else if (cookieHelp == null) {//cookie doesn't exist
      $cookieBanner.find('.gem-c-cookie-banner__wrapper').show(); 
    }
  
    $cookieBanner.find('button.gem-c-button').click(function(){
      writeCookie('seen_cookie_message_help','cookie_policy',365); 
      writeCookie('AnalyticsConsent','true',365); 

      $cookieBanner.find('.gem-c-cookie-banner__wrapper').hide(); 
      var $cookieConfirm = $cookieBanner.find('.gem-c-cookie-banner__confirmation');
      
      $cookieConfirm.show().find('.gem-c-cookie-banner__hide-button').click(function(){
        $cookieConfirm.hide();
      });
    });
  /* cookie banner ends */  
  
	
  
  
/* *** requests ticket list page start *** */
  var requests = $('#requests-pagination');
  if(requests){
			 var li = requests.find('li').not('.pagination-current, .pagination-next, .pagination-prev, .pagination-first, .pagination-last').length;
       if(li == 1){
         requests.find('.pagination-last').add('.pagination-first').addClass('hide');
       }
  }
  
  /* request page start */
  var request = $('#request-page');
  if(request){
  	var requestForm = request.find('form.comment-form');   
    var requestTextArea = $('#request_comment_body');
    var submitBtn = $('#request-submit-btn');
    var solvedBtn = $('#request-solved-btn'); 
    
    function addRequestErrors(){
      $('#conversation-error').removeClass('hide').attr('aria-hidden','false');
      $('#conversation-form').addClass('govuk-form-group--error').find('fieldset').attr('aria-describedby','conversation-error');
      $('#request_comment_body').focus();
    }
    
    function clearRequestErrors(){
      $('#conversation-error').addClass('hide').attr('aria-hidden','true');
      $('#conversation-form').removeClass('govuk-form-group--error').find('fieldset').removeAttr('aria-describedby');
    }
    
    requestTextArea.on('change keyup paste', function() {
      solvedBtn.text('Mark as solved & Submit');
      if (!$.trim(requestTextArea.val())) {//has no values/content
        solvedBtn.text('Mark as solved');
      }else{
        clearRequestErrors();
      }
    }).blur(function(){
      if ( !$.trim(requestTextArea.val()) ) {//has no values/content
      	clearRequestErrors();
      }
    });
    
    submitBtn.on('click', function(e){
      	e.preventDefault();
        if(	!$.trim(requestTextArea.val()) ){//textarea empty and no files selected for upload
          addRequestErrors();
        }else{
          requestForm.submit();
        }
    });
    
    solvedBtn.on('click',function(e){
      e.preventDefault();
      $('#mark_as_solved').prop('checked', true);   
    	requestForm.submit();
    });
    
  }
  
  var mytix = $('#mytix');/* tickets sub menu active underline state */
  if(mytix){
	  var thisURL = window.location.href;
    var strSlash = thisURL.substring(thisURL.lastIndexOf('/') + 1); 
    if(strSlash.startsWith('requests')){
       mytix.addClass('active');
    }else if(strSlash.startsWith('ccd')){
       $('#mytxtCC').addClass('active');
    }
  }
  var requestSelect = $('#request-status-select');
  if(requestSelect){
     requestSelect.find('option:first-child').text('View all');
     var filterForm = $('body').children('main').find('form.requests-table-toolbar')
     requestSelect.change(function(){
       filterForm.submit();
       return false;
     });
  }

//var signinIframe = $('body').children('div');
  /*function makeSignInChanges(){
  var theContent = signinIframe.children('iframe[scrolling="no"]:not([id])').contents();
  theContent.find('#signin-styles').remove().end().find('head').prepend('<style id="signin-styles">'+
        'div.modal * {font-family: "GDS Transport",Arial,sans-serif !important;}'+ 
        'div.modal{border:4px solid #ccc !important;padding:40px !important;width:600px !important;box-shadow:0 4px 17px 0 rgba(0,0,0,0.4) !important;}'+ 
        'div.modal div.flash.flash-notice{display:block;position:absolute;left:-3000px;top:-3000px;}'+ 
	'div.flash.flash-error{padding: 0;margin: 0 0 20px 0;background: none;font-weight: bold;color:#d4351c !important;}'+
	'div.flash.flash-error a,div.modal.password-reset-success-modal .controls.center_link a{text-decoration: underline !important;}'+
        '#login-form input#user_email,#login-form input#user_password,#login-form input#remember_me,#registration-form #user_name{margin-bottom:30px !important;}'+ 
        'div.interface.outer h2#signin_title, div.modal > h2.title{font-weight:bold;text-align:left;font-size:23px !important;font-size:1.65rem !important;}'+
        'div.services.internal, #password-reset-form > p,#registration-form > p{width:100% !important;}'+
        'div.credentials label,div.remember label,#password-reset-form > fieldset label,#registration-form fieldset label{font-weight:400 !important;color:#0b0c0c;display:inline-block;margin-bottom:5px;font-size:19px !important;font-size:1.35rem !important;}'+
        'div.credentials input,#password-reset-form input#email,#registration-form fieldset input{height:45px !important;margin-top:0;padding:5px;border:2px solid #0b0c0c;width:100%;border-radius:0;}'+
        'div.remember{margin:30px 0 0 0 !important;}'+
        '#login-form > input.button.primary,#password-reset-form .controls .button.primary,#registration-form .controls .button.primary{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-weight:400;font-size:19px;line-height:1.1875;-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;position:relative;width:auto;margin-top:0;margin-bottom:22px;padding:8px 10px 7px;border:2px solid transparent;border-radius:0;color:#fff;background-color:#00703c;box-shadow:0 2px 0 #002d18;text-align:center;vertical-align:top;cursor:pointer;-webkit-appearance:none;float:left;}'+
        '#zendesk-js-forgot-password, #password-reset-form > p,#registration-form > p,div.flash.flash-error,div.modal.password-reset-success-modal p,div.modal.password-reset-success-modal .controls.center_link a {text-align:left;font-size:19px !important;font-size:1.35rem !important;line-height:1.4 !important;}'+
        'div.footnotes p.get_password.question,div.footnotes p.get_password.question + p,div.footnotes div.sign_up.question{display:none;}'+    
        '@media only screen and (min-width:768px){div.modal{width:auto; }}'+   
	'div.credentials input:focus,#login-form #remember_me:focus,#password-reset-form input#email:focus,#registration-form #user_name:focus,#registration-form #user_email:focus{outline:3px solid #fd0;outline-offset:0;box-shadow: inset 0 0 0 2px;}'+
	'form#login-form input.button.primary:focus,#password-reset-form input.button.primary:focus,#registration-form input.button.primary:focus{border-color:#fd0;color:#0b0c0c;background-color:#fd0;box-shadow:0 2px 0 #0b0c0c;outline: 3px solid transparent;}'+
	'#zendesk-js-forgot-password{margin:0;}'+
	'div.modal.password-reset-success-modal .controls.center_link{text-align:right !important;}'+
	'div.modal.password-reset-success-modal .controls.center_link a{color:#1d70b8 !important;}'+
	'div.modal.password-reset-success-modal > p + p{display:none;}'+
	'#password-reset-form > p{position: relative;text-indent:-3000px;height:60px;display:block;font-size:19px !important;}'+
  '#password-reset-form > p:before{content: "Enter your email address and we’ll send you a link to reset your password.";position:absolute;height:inherit;width:inherit;left:0;top:0;z-index:100;text-indent:0;}'+
	'div.modal:not(.password-reset-success-modal):not(.signin) > h2.title{height: 30px;position:relative;text-indent:-3000px !important;display:block;font-size:19px !important;}'+
	'div.modal:not(.password-reset-success-modal):not(.signin) > h2.title:before{content:"Reset your password";position:absolute;height:inherit;width:inherit;left:0;top:0;z-index:100;text-indent:0;font-size:23px;}'+
	'#login-form .credentials label[for="user_email"]{height:30px;position:relative;width:100%;margin-bottom:50px;}'+
	'#login-form .credentials label[for="user_email"]:before{display:inline-block;position:absolute;width:100%;color:#626a6e;font-size:14px;height:45px;top:30px;content:"Your sign in details are not linked to your apprenticeship service account. Select ‘reset your password’ if you need to create sign in details.";}'+
      '</style>');
    var fgp = theContent.find('#zendesk-js-forgot-password');
    fgp.find('a').text('Reset your password');
}*/
  
/*if(signinIframe.children('iframe:not([id])').length){
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    var observer = new MutationObserver(function(mutations, observer){// fired when a mutation occurs //console.log(mutations, observer);
      makeSignInChanges();
      //replaceSignInContent();
    });
    observer.observe(document, {subtree: true, attributes: true });//this level needed for <style> injection: observer.observe(document, {subtree: true, attributes: true, childList: true });
}*/
/* *** request(s) page(s) ends *** */  
  
 
/* *** maintain list state on back-button, starts *** */      
var requestSubject = $('#request_subject');
 
if(requestSubject.length){//if the contact form with subject search articles options
  var mySearchDiv = $('.suggestion-list');

  $(window).on('beforeunload', function(){//when refreshing the page
      $('#tempList').remove();
  });

  if(localStorage.getItem("thisURL") == window.location.href){//back-button used?
    //$(window).on('load', function(){
        requestSubject.val(localStorage.getItem("theInputVal"));
    //}); 
    mySearchDiv.html('<div id="tempList">'+ localStorage.getItem("theListHTML") +'</div>');
  }else{
    requestSubject.val('');
    requestSubject.attr("autocomplete", "off");
  }
  $('body').on('click',mySearchDiv.find('a'), function(){
    var theList = mySearchDiv.html();
    var theVal = requestSubject.val();
    localStorage.setItem("theListHTML", theList);
    localStorage.setItem("theInputVal", theVal); 
  });
  requestSubject.keyup(function(){
    $('#tempList').remove();
  });

  localStorage.setItem("thisURL", window.location.href);        
}else{//all other pages
  $('.submit-a-request').add('.govuk-link').click(function(){//.govuk-link = feedback button
    localStorage.setItem("theInputVal", "");//not removeItem
    localStorage.setItem("theListHTML", "");//not removeItem
  });
}
/* *** maintain list state on back-button, ends *** */    

/* <start> New Ticket Request page */
  if($('#new_request').length){//= we're on a ticket form page
      //var $das_feedback_form = $('#das-feedback-form');
      var ticketForm = $('#request_issue_type_select').find('option:selected').val();
    	var $new_request = $('#new_request');
    
      if(ticketForm != undefined ) {
        var $request_anonymous_requester_email = $('#request_anonymous_requester_email');
        var $request_description_hint = $('#request_description_hint');
        var $request_description_label = $('#request_description_label');	

        /* Remove attachments due to virus concerns */
         $new_request.find('label[for=request-attachments]').parent().remove();//addClass('hide');
        
        // function restyleAttachments(){//keep for future use
        //   $new_request.find('label[for=request-attachments]').html('Add a file');
        //   $('<p class="govuk-hint govuk-body-s">You can add up to 5 photos or files.</p>').insertBefore($('#upload-dropzone')); 
        // }        
        
        /* Feedback page */
        if(ticketForm == esfa_variables.form_id_feedback) {
          $('#ticket-heading').html('Give feedback');
          $request_description_label.html('Your feedback');
					$request_description_hint.hide();
          $('<p class="govuk-hint govuk-body-s">We’ll send you an email to confirm we received your feedback.</p>').insertBefore($request_anonymous_requester_email);
          $('#request_subject').val('Feedback').parent().hide();
          $new_request.find('label[for=request_anonymous_requester_email]').html('Your email address (optional)');

          // If we submit a form without email then supply an "anonymous" email to satisfy backend validation
          $new_request.submit(function(){
            if( !($request_anonymous_requester_email.val().trim()) )  {
               $request_anonymous_requester_email.val("anonymous@example.com").css('color', '#fff'); // so there isn't a jarring email appear on screen;
            }
          });      

          // If we've reloaded an anonymous submission (due to other validation failures) then hide the anonymous email again
          if($request_anonymous_requester_email.val() == 'anonymous@example.com'){
            $request_anonymous_requester_email.val('');
          }

        /* "Send a message" page */
      }else if(ticketForm = esfa_variables.form_id_default) { 
          $request_description_label.html('Your message');
          $request_description_hint.hide(); 
          $('<p class="govuk-hint govuk-body-s">We’ll send you an email to confirm we received your message. During our opening times, we’ll reply within 4 hours.</p>').insertBefore($request_anonymous_requester_email); 
        }
        
        $new_request.find('input[name="commit"]').val('Send');
      }

      $('#request_subject_label').after('<span id="subject-hint" class="govuk-hint govuk-body-s">We may suggest articles based on what you enter.</span>');
      $new_request.find('.suggestion-list').attr('aria-describedby', 'subject-hint');
    
    
      //************************************ error msgs start...
      var emailError = $('#request_anonymous_requester_email_error');
      if(emailError.length){//this only appears if email is required! Ignore aria-required values as zendesk sets them incorrectly/inconsistently
        if(!$('#request_anonymous_requester_email').val()){//input element is empty
          emailError.text('Enter your email address'); 
        }else{//input must be invalid and as sendAMsgPg is present
          emailError.text('Enter an email address in the correct format, like name@example.com'); 
        }
      } 

      $('#request_subject_error').text('Enter a subject');

      var descError = $('#request_description_error');
      if(descError.length){
        var myLab = $('#request_description_label').text().toLowerCase();   

        if(myLab.includes('feedback') === true){//gracefull fail in ie11
          descError.text('Enter your feedback');
        }else if(myLab.includes('message') === true){
          descError.text('Enter your message');
        }
      }    
      //******************************* error msgs ends.
  }
  /* <end> New Ticket Request page */  
  
  if($('#full_width_pg').length){//if this id is used once in an article all pg layout is changed to full width
    $('#main-content').find('> .govuk-grid-row > .govuk-grid-column-two-thirds').addClass('govuk-grid-column-full').removeClass('govuk-grid-column-two-thirds');   
  }

  /* Cookie Article, with consent starts */
    var cookieConsent = $('#select-measure-analytics'); 
  
    if(cookieConsent.length ) {
      		$('#select-measure-analytics-btn').append('<button id="saveCookieChanges" class="govuk-button" data-module="govuk-button">Save changes</button>');
          
      		cookieConsent.append('<div class="govuk-form-group"><fieldset class="govuk-fieldset"><div class="govuk-radios"><div class="govuk-radios__item"><input class="govuk-radios__input" id="cookie-consent-Yes" name="allow-analytics" type="radio"><label class="govuk-label govuk-radios__label" for="cookie-consent-Yes">Use cookies that measure my service use</label></div><div class="govuk-radios__item"><input class="govuk-radios__input" id="cookie-consent-No" name="allow-analytics" type="radio"><label class="govuk-label govuk-radios__label" for="cookie-consent-No">Do not use cookies that measure my service use</label></div></div></fieldset></div>');

          var cookieGoogle = readCookie('AnalyticsConsent');

          if((cookieGoogle == 'false') || (cookieGoogle == null)){
						$('#cookie-consent-Yes').prop("checked", false);
            $('#cookie-consent-No').prop("checked", true);
          }else{//not false (unset or true)
            $('#cookie-consent-Yes').prop("checked", true);
            $('#cookie-consent-No').prop("checked", false);
          }   
      
      		$('#saveCookieChanges').on('click',function(){
            if($('#cookie-consent-Yes').is(':checked')){
              writeCookie('AnalyticsConsent','true',365); 
            	writeCookie('seen_cookie_message_help','cookie_policy',365); //also turn off cookie banner
            }
            if($('#cookie-consent-No').is(':checked')){
              writeCookie('AnalyticsConsent','false',365); //document.cookie = "AnalyticsConsent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; //delete cookie
            	writeCookie('seen_cookie_message_help','cookie_policy',365); //also turn off cookie banner
            }
          });

          /*$('#cookie-consent-Yes').change(function() { writeCookie('AnalyticsConsent','true',365); writeCookie('seen_cookie_message_help','cookie_policy',365); });
          $('#cookie-consent-No').change(function() {writeCookie('AnalyticsConsent','false',365); writeCookie('seen_cookie_message_help','cookie_policy',365); });*/
  }
/* Cookie Article, with consent ends */
  
   window.zESettings = {
    webWidget: {
      helpCenter: {
        suppress: true
      },
      contactForm: {
        suppress: true,
        attachments: false
      },
      chat: {
        menuOptions: {
          emailTranscript: false
        }
      },
       answerBot: {
        suppress: true
       }
    }
  };

  zE('webWidget:on', 'chat:status', function(status) {
    console.log('This chat session is now', status);
    $(status == 'offline' ? '#chat-available' : '#chat-unavailable').hide();
    $(status == 'offline' ? '#chat-unavailable' : '#chat-available').show();
  });  

  
  if(!$('.hide-for-apprentices').is(':visible')) {
    window.zESettings = {
      webWidget: {
        helpCenter: { suppress: true },
        chat: { suppress: true },
        contactForm: { suppress: true },
        answerBot: { suppress: true },
        talk: { suppress: true },
      }
    };
    
    $('.govuk-header__link').attr("href", "#");
  }

});


window.dataLayer = window.dataLayer || [];
        window.onload = function() {
              setTimeout(function() {

                var widgetLauncher = $('#launcher'),
                    widgetHelpButton = widgetLauncher.contents().find('button');

                if (widgetLauncher.length > 0 && widgetHelpButton.length > 0) {
                    widgetHelpButton.on('click', function() {
                        gtmEventPush({'action' : 'Help button clicked'});
                        widgetOpened(widgetLauncher);
                    })
                }
              }, 1500);
        }

        var widgetOpened = function() {
            var container = $('#webWidget');
            setTimeout(function() {
                var page = whichView(container);
                interactionEvents(container);
            }, 200);
        }

        var interactionEvents = function(container) {
          var contents = container.contents();
          var links = contents.find('a');
          var buttons = contents.find('button');
          var form = contents.find('form');

          links.unbind('click')
          links.on('click', function() {
            setTimeout(function() {
                  var page = whichView(container);
                  setTimeout(function() {
                    interactionEvents(container);
                    }, 200);
                }, 200);
          })

          buttons.unbind('click')
                buttons.on('click', function() {
                  setTimeout(function() {
                        var page = whichView(container);
                        setTimeout(function() {
                          interactionEvents(container);
                          }, 200);
                      }, 200);
                })

          form.unbind('submit')
          form.on('submit', function() {
            setTimeout(function() {
                var page = whichView(container);
                interactionEvents(container);
              }, 800);
          })
        }

        var gtmEventPush = function(eventObj) {
          eventObj.event = 'widget'
          window.dataLayer.push(eventObj)
          console.log(eventObj)
        }

        var whichView = function(container) {
            var contents = container.contents();
            var searchField = contents.find('input[type="search"]');
            var firstH1 = contents.find('h1').eq(0);
            var firstH2 = contents.find('h2').eq(0);
            var secondP = contents.find('p').eq(1);
            var originalArticleButton = contents.find('div[class^="originalArticleButton"]');
            var chatIcon = contents.find('.Icon--channelChoice-chat');

            if (searchField.length === 1) {

              var searchTerm = searchField.val();

              if (secondP.text() === "Try searching for something else.") {
                // View 2: Search form and zero results
                gtmEventPush({'action' : 'Search form submitted', 'term' : searchTerm, 'noOfResults' : 0})
                return(2);
              }

              if (firstH2.text() === "Top results") {
                // View 3: Search form and some results
                var listResults = contents.find('ol').eq(0).find('li');
                gtmEventPush({'action' : 'Search form submitted', 'term' : searchTerm, 'noOfResults' : listResults.length})
                return(3);
              }

              // View 1: Just search form'
              return(1);
            }

            if (originalArticleButton.length === 1) {
              // View 4: Article page
              gtmEventPush({'action' : 'Article clicked', 'title' : firstH2.text()})
              return (4);
            }

            if (chatIcon.length > 0) {
              // View 5: Contact page
              gtmEventPush({'action' : 'Contact button clicked'})
              return (5);
            }

            if (firstH1.text() === 'Request a callback') {
              // View 6: Request call back page
              gtmEventPush({'action' : 'Request call back button clicked'})
              return (6);
            }

            if (firstH1.text() === 'Request sent') {
              // View 7: Request call back confirmation
               gtmEventPush({'action' : 'Request call back button submitted'})
               return (7);
            }

            if (firstH1.text() === 'Apprenticeship service') {
              // View 8: Live chat page
                gtmEventPush({'action' : 'Live chat button clicked'})
               return (8);
            }

            if (firstH1.text() === 'Contact us') {
              // View 9: Leave message page
              gtmEventPush({'action' : 'Leave message button clicked'})
               return (9);
            }

            if (firstH1.text() === 'Message sent') {
              // View 7: Request call back confirmation
               gtmEventPush({'action' : 'Leave message submitted'})
               return (10);
            }

            // Cannot determine the view or closed the widget
            return(0);
        }