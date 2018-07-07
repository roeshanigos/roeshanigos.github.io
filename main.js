$(document).ready(() => {
	$(".name").hide(0).delay(500).fadeIn(1000);
	$(".more-about").hide(0).delay(1200).fadeIn(500);

	$(".topnav").hide();
   $(window).scroll(() =>{  //Listen for the window's scroll event
		if (isScrolledAfterElement('#about')) { //if it has scrolled beyond the #content elment
			$('.topnav').fadeIn(500);  //Show the navigation bar
		} else {
		  $('.topnav').fadeOut(500); //Else hide it
		}
  	});
});


function isScrolledAfterElement(elem) {
	var $elem = $(elem);
	var $window = $(window);

	var docViewTop = $window.scrollTop();
	var docViewBottom = docViewTop + $window.height();

	var elemTop = $elem.offset().top + 800;
	//console.log($elem.offset());
	return elemTop <= docViewBottom;
}


function myFunction() {
		var x = document.getElementById("myTopnav");
		if (x.className === "topnav") {
				x.className += " responsive";
		} else {
				x.className = "topnav";
		}
}
function myFunction() {
		var x = document.getElementById("staticNav");
		if (x.className === "static-nav") {
				x.className += " responsive";
		} else {
				x.className = "static-nav";
		}
}