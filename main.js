$(document).ready(() => {
	$(".name").hide(0).delay(500).fadeIn(1000);
	$(".more-about").hide(0).delay(1200).fadeIn(500);

	$(".moving-nav").hide();
   $(window).scroll(() =>{  //Listen for the window's scroll event
		if (isScrolledAfterElement('#about')) { //if it has scrolled beyond the #content elment
			$('.moving-nav').fadeIn(500);  //Show the navigation bar
		} else {
		  $('.moving-nav').fadeOut(500); //Else hide it
		}
  	});
});


function isScrolledAfterElement(elem) {
	var $elem = $(elem);
	var $window = $(window);

	var docViewTop = $window.scrollTop();
	var docViewBottom = docViewTop + $window.height();

	var elemTop = $elem.offset().top + 850;
	//console.log($elem.offset());
	return elemTop <= docViewBottom;
}