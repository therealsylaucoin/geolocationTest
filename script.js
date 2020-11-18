
        const app = {};
        app.chosenSportId;
        app.userLongitude;
        app.userLatitude;
        //Toronto coordinates
        //this would be a function, that can take in the city as a parameter
        app.torontoCoordinatesLong = $('#toronto').data('long');
        app.torontoCoordinatesLat = $('#toronto').data('lat');
        console.log(app.torontoCoordinatesLong, app.torontoCoordinatesLat);

        //GEOLOCATION STUFF
        //create even listener on button to get location
        $('.sport').on('click', function(){
            app.getLocation();
        })
        //create a function that gets the coordinates of the location
        app.getLocation = () => {
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(function(place){ 
                    app.userLongitude = (place.coords.latitude);
                    app.userLatitude = (place.coords.longitude);
                    console.log(app.userLongitude, app.userLatitude);
                })
            } 
        }


        //SPORTS STUFF
        //Step 1
        //ajax call to get the chosen sport ID
        app.getSports = (sportName) => {
            $.ajax({
                url: `https://sports.api.decathlon.com/sports/${sportName}`,
                method: 'GET',
                dataType: 'json',
            })
            .then(function(successPromise){
                app.chosenSportId = (successPromise.data.id);
                console.log(app.chosenSportId)

                //SPORTS LOCATION STUFF
                // Step 2
                //Ajax call to get locations for a specific sport based on sports id- SUCCESS
                app.getSportsLocations = (id) => {
                    $.ajax({
                        url: `https://sportplaces.api.decathlon.com/api/v1/places`,
                        method: 'GET',
                        dataType: 'json',
                        data: {
                            sports: id,
                            origin: `${app.torontoCoordinatesLong},${app.torontoCoordinatesLat}`,
                            radius: 99,
                            limit: 20,
                        }
                    }).then(function(sports){
                        console.log(sports.data)
                    }).fail(function(){
                        console.log("ERROR");
                    })
                }
            //call the function with the chosenSportsID 
            app.getSportsLocations(app.chosenSportId);
            })
            .fail(function(failedPromise){
                console.log('Error');
            })
        }

        //call the function with a sports name - this will be the value of our event listener!!! on the button!
        app.getSports('ice-hockey');
        app.getSports('basketball');
        app.getSports('soccer');
        app.getSports('tennis');
        app.getSports('boxing');


        $(function(){
            console.log('ready!');
        });