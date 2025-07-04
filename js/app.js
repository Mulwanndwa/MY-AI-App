// Dom7
var $ = Dom7;

// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
    theme = document.location.search.split('theme=')[1].split('&')[0];
}

// Init App
var app = new Framework7({
    id: 'io.framework7.testapp',
    root: '#app',
    theme: 'md',
    data: function () {
        return {
            user: {
                firstName: 'John',
                lastName: 'Doe',
            },
        };
    },
    methods: {
        helloWorld: function () {
            app.dialog.alert('Hello World!');
        },
    },
    routes: routes,
    popup: {
        closeOnEscape: true,
    },
    sheet: {
        closeOnEscape: true,
    },
    popover: {
        closeOnEscape: true,
    },
    actions: {
        closeOnEscape: true,
    },
    calendar: {
        url: 'calendar/',
        dateFormat: 'yyyy-m-d'
    }
});

var swiper = app.swiper.create('.swiper-container', {
    speed: 400,
    spaceBetween: 100
});
var calendarInline = {}
var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December'];

// create searchbar
var searchbar = app.searchbar.create({
    el: '.searchbar',
    searchContainer: '.list',
    searchIn: '.menu_item',
    on: {
      search(sb, query, previousQuery) {
        console.log(query, previousQuery);
      }
    }
  });
var mainView = app.views.create('.view-main', {
    url: '/'
});

var version = '6.6.2'
var deviceId = ""

$(".version").html('Version : '+version)

document.addEventListener("DOMContentLoaded", function(event) { 
   
    app.dialog.close()
    
});
document.addEventListener("deviceready", onAppReady , false);
function onAppReady(){
  
}


