var myInterval;
var myTimer;
var myPGTimer;
var logout_cnt = 0
var logoutInterval;
var hid_str = ""
var myApp = new Vue({
    el: '#myApp',
    data: config,
    mounted: function () {
        var that = this
       
    },
    watch: {
     
    },
    methods:{
        donate: function(){
            const popupSwipe = app.popup.create({
                el: '.paypal-popup',
                swipeToClose: true,
            });
            popupSwipe.open()
            paypal.Buttons().render('#paypal-button-container');
        },
        scanForResult: function(){
            cordova.plugins.email.open({
                to:      '',
                cc:      '',
                subject: 'Open Ai',
                body:    myApp.response,
                isHtml: true
            });
        },
        scanForResult: function(){
            cordova.plugins.barcodeScanner.scan(
              function (result) {
                  // alert("We got a barcode\n" +
                  //       "Result: " + result.text + "\n" +
                  //       "Format: " + result.format + "\n" +
                  //       "Cancelled: " + result.cancelled);
                  myApp.ai_input = result.text
                  myApp.get_response()
              },
              function (error) {
                  app.dialog.alert("Scanning failed: " + error);
              },
              {
                  preferFrontCamera : true, // iOS and Android
                  showFlipCameraButton : true, // iOS and Android
                  showTorchButton : true, // iOS and Android
                  torchOn: true, // Android, launch with the torch switched on (if available)
                  saveHistory: true, // Android, save scan history (default false)
                  prompt : "Place a barcode inside the scan area", // Android
                  resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                  formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                  orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
                  disableAnimations : true, // iOS
                  disableSuccessBeep: false // iOS and Android
              }
           );
        },
        downloadResponse: function(){
            const element = $('.response').html();
            cordova.plugins.html2pdf.create(
              element,
              "mulwaAi.pdf",
              function (success) {
                console.log("PDF created successfully:", success);
              },
              function (error) {
                console.error("Error creating PDF:", error);
              }
            );
        },
        get_response: function(){
            console.log("getting response")
             myApp.question = myApp.ai_input
             myApp.response = ""
             myApp.loading = true
           cordova.plugins.emiOpenAiPlugin.chat(   
                apiKey = "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",  // apiKey https://platform.openai.com/
                timeOut = 60, //set this to 60, If error Failed to load response due to timeout
                role = "user", // The role of the author of this message. One of system, user, or assistant.
                content = myApp.ai_input+". Response in html",
                function(result){
                    console.log(result) 
                    myApp.response = result
                   myApp.loading = false
                   myApp.ai_input = ""
                },
               function(error){ 
                    console.log(error)
                     myApp.response = error
                    myApp.loading = false
                    myApp.ai_input = ""
                
            });
           // app.dialog.preloader("wait...")
           setTimeout(function(){
            //myApp.loading = false
            //myApp.ai_input = ""
           },5000)
            //  cordova.plugins.emiOpenAiPlugin.completions(  
            //     apiKey = "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",
            //     timeOut = 60, //set this to 60, If error Failed to load response due to timeout
            //     prompt = myApp.ai_input, // string
            //     max_tokens = 4000,
            //     temperature = 0,
            //     (result) => {
            //         myApp.response += result
            //         //alert(result) 
            //     },
            //     (error) => { 
            //          myApp.response += error
            //         ///alert(error)

                
            // });
        }
    }
})
  
 