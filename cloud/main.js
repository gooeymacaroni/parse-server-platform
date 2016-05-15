/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
Parse.Cloud.define("sendPushNotif", function(request, response) {
      
  var targetSerials = request.params.targetCitizenSerials;
  var messageStr = request.params.pushMessage;
  var pushTypeStr = request.params.pushType;
  var refSerialStr = request.params.refSerial;
  var payloadOne = request.params.addtlPayloadOne;
  var payloadTwo = request.params.addtlPayloadTwo;
  var payloadThree = request.params.addtlPayloadThree;
  var badgeAction = "";
  
  if (pushTypeStr != "freshPulsePush") {
	  badgeAction = "Increment";
  }

  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.containedIn('phoneHome', targetSerials);
    
  Parse.Push.send({
    where: pushQuery,
    data: {
        alert: messageStr,
        pushType: pushTypeStr,
		refSerial: refSerialStr,
		addtlOne: payloadOne,
		addtlTwo: payloadTwo,
		addtlThree: payloadThree,
        badge: badgeAction,
		sound: "default"
    }
  }, {
    success: function() {
      // Push was successful
        response.success("Successfully psuhed to " + targetSerials);
    },
    error: function(error) {
      throw "Got an error " + error.code + " : " + error.message;
        response.error(err.message);
    }
  });
});
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
Parse.Cloud.job("resetHotspotCheckIns", function(request, response) {

  var fixedSpotsQuery = new Parse.Query("FixedSpots");
  fixedSpotsQuery.equalTo("agoraComplex", "Hotspot");
  fixedSpotsQuery.first({
  			success: function(object) {
			object.set("checkedIn", []);
			object.save();
  		},
  			error: function(error) {
    		alert("Error: " + error.code + " " + error.message);
  		}
	}).then(function() {
    	// Set the job's success status
		response.success("Hotspot resetted successfully.");
    	//status.success("Hotspot resetted successfully.");
  }, function(error) {
    	// Set the job's error status
	  	response.success("Uh oh, something went wrong.");
    	//status.error("Uh oh, something went wrong.");
	});
});
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
Parse.Cloud.define("functionalityTest", function(request, response) {
	///Foo();
	function Foo() {
	    response.success('1337');
	}
});
