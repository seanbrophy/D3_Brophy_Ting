//Javascript Document

(function(){
	"use strict";//make it impossible to accidentally create global variables
	console.log("Green sock SEAF fired");

	var logo = document.querySelector("#logo");
	var title = document.querySelector("#top5title");
	var gameLogo = document.querySelector("#gamelogo");

	TweenLite.from(logo, 2, {opacity:0});
	TweenLite.from(title, 2, {opacity:0});
	TweenLite.from(gameLogo, 2, {opacity:0, x:50});

})();