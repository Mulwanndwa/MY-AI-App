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
        get_response: function(){
            console.log("getting response")
           cordova.plugins.emiOpenAiPlugin.chat(   
                apiKey = "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",  // apiKey https://platform.openai.com/
                timeOut = 60, //set this to 60, If error Failed to load response due to timeout
                role = "user", // The role of the author of this message. One of system, user, or assistant.
                content = myApp.ai_input,
                function(result){
                    console.log(result) 
                    myApp.response = result
                },
               function(error){ 
                    console.log(error)
                     myApp.response = error

                
            });
           app.dialog.preloader("wait...")
           setTimeout(function(){
            app.dialog.close()
            myApp.ai_input = ""
           },2000)
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
  
 