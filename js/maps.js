function initMap() {
    // navigator.geolocation.getCurrentPosition(function(position) {
    //   window.localStorage.setItem('latitude', position.coords.latitude)
    //   window.localStorage.setItem('longitude', position.coords.longitude)
    // })

    var customer_lat = parseFloat(window.localStorage.getItem('customer_lat'))
    var customer_long = parseFloat(window.localStorage.getItem('customer_long'))

    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: {
        lat: customer_lat,
        lng: customer_long
      },
      draggable: false,
    });
    directionsRenderer.setMap(map);
    
    calculateAndDisplayRoute(directionsService, directionsRenderer);

    //setInterval(calculateAndDisplayRoute, 100000)

    //app.dialog.preloader("Getting directions...")
 
  }

  function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    
   
    var values = {}
    var customer_lat = parseFloat(window.localStorage.getItem('customer_lat'))
    var customer_long = parseFloat(window.localStorage.getItem('customer_long'))

    var merchant_lat = parseFloat(window.localStorage.getItem('merchant_lat'))
    var merchant_lng = parseFloat(window.localStorage.getItem('merchant_lng'))
    //navigator.geolocation.getCurrentPosition(function(position) {
        values = {
            lat: merchant_lat,
            lng: merchant_lng
        };
        console.log("values",values)
        const selectedMode = 'DRIVING';
        directionsService.route(
          {
            origin: values,
            destination: {
              lat: customer_lat,
              lng: customer_long
            },
            travelMode: google.maps.TravelMode[selectedMode]
          },
          (response, status) => {
            if (status == "OK") {
              console.log('direction response', response)
              directionsRenderer.setDirections(response);
              
            } else {
              $(".error").html("Directions request failed due to " + status);
            }
          }
        );
       

        //Distance 
        var request = {
            origin:values, 
            destination:{
              lat: customer_lat,
              lng: customer_long
            },
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };

        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                $(".distanceKm").html("Distance: "+ response.routes[0].legs[0].distance.value / 1000+"km"); 
                console.log(response.routes[0].legs[0].distance.value * 0.000621371)
                //price.value = distanceMl.value * 2.50;

            }
        });     
        app.dialog.close()

    //})
    
  }
