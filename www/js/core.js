$(document).ready(function(){
	iframe.ontouchend = (e) => {
		e.preventDefault();
	};
	document.addEventListener("backbutton", function (e) {
            e.preventDefault();
    }, false );
	// document.addEventListener("backbutton", backKeyDown, true);
	var myShakeEvent = new Shake({
    threshold: 15 // optional shake strength threshold
	});
	myShakeEvent.start();
	window.addEventListener('shake', shakeEventDidOccur, false);
	function shakeEventDidOccur () {
		ipAddress = $('#ipAddress').val();
		document.getElementById('iframe').src = "http://" +ipAddress + "/data?dataPass=qwerty";
		setInterval(function(){document.getElementById('iframe').src += '';}, 5000);
		window.location = "#dashboard"; 
		navigator.vibrate(250);
		myShakeEvent.stop();
	}
	
	
	// fulljs
	
    $('#fullpage').fullpage({
        sectionsColor: ['#AB4747','#758C33','#F9AC3D', '#FE5F55', '#E63462'],
		anchors: [ 'connect','dashboard', 'temperature', 'clock', 'controlPage'],
        navigation: false,
        slidesNavigation: false,
		scrollBar: true
    });
		
	
	// temperature knob
	var vTmp, upTmp=0, downTmp=0, temperature=25,
    $tmpVal = $("span.tmpVal"),
    incrTmp = function() {temperature++; $tmpVal.html(temperature); },
    decrTmp = function() {temperature--; $tmpVal.html(temperature); };
    
	$("input.temperature").knob({ min : 0, max : 20, stopper : false, change : function (value) {
        if(vTmp > Math.ceil(value)){
            if(upTmp){ decrTmp(); upTmp=0;}
			else  { upTmp=1; downTmp=0;}

        } 
		else {
            if(vTmp < Math.ceil(value)){
                if(downTmp){incrTmp(); downTmp=0; }
				else	{downTmp=1; upTmp=0;	 }
            }
        }
        vTmp = Math.ceil(value);
    }
    });

	
	// clock knob
	var v = 0, up=0, down=0, clock=15,
    $clkVal = $("span.clockVal"),
    incr = function() {clock+= 5; $clkVal .html(clock); },
    decr = function() {clock-= 5; $clkVal .html(clock); };
    
	$("input.clock").knob({ min : 0, max : 20, stopper : false, change : function (value) {
        if(v > Math.ceil(value)){
            if(up){ decr(); up=0;}
			else  { up=1; down=0;}

        } 
		else {
            if(v < Math.ceil(value)){
                if(down){incr(); down=0; }
				else	{down=1; up=0;	 }
            }
        }
        v = Math.ceil(value);
    }
    });
	
	
	var ipAddress, inputPass = "qwerty";
    $("div#submit").click(function(){
		$.post("http://" + ipAddress + "/input",
        {
			inputPass : inputPass,
			inTemp    : temperature,
			inClck    : clock,
			mode	  : "heating"
        });
		// jsonp(ipAddress);
		window.location = "#controlPage";
	});
	
	$("div#connect").on('click', function(){
		ipAddress = $('#ipAddress').val();
		myShakeEvent.stop();
		window.location = "#dashboard";    
	});
	$("div#backButton").on('click', function(){
		window.location = "#dashboard";    
	});
	$("div#tempButton").on('click', function(){
		window.location = "#temperature";    
	});
	$("div#clckButton").on('click', function(){
		window.location = "#clock";    
	});
	$("div#stop").on('click', function(){
		$.post("http://" + ipAddress + "/command",
        {
			commandPass : inputPass
        });
		window.location = "#dashboard";    
	});
	
	var _originalSize = $(window).width() + $(window).height()
	$(window).resize(function(){
    if($(window).width() + $(window).height() != _originalSize){
      $("#connectPageChild").fadeToggle();
    }else{
      $("#connectPageChild").fadeToggle(); 
    }
  });
	
});
function backKeyDown(d) {
		navigator.app.exitApp(); // To exit the app!
        e.preventDefault(); // to disable the back
    }
function splash(param) {
		var time = param;
		setTimeout(function () {
			
			$("#loading").fadeOut(500);
		}, time);
	}

/* function jsonp(ip) {
  var s = document.createElement("script");
  s.src = "http://" +ip + "/data?dataPass=qwerty";
  document.body.appendChild(s);
}
function dataSend(object) {
  document.getElementById("num_clock").innerHTML = object.miliClck;
  document.getElementById("num_temperature").innerHTML = object.crntTemp;
} */





	
