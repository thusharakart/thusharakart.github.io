$(document).ready(function () {
	// MODAL
	var modalText = {
		discover: {
			title: "ChowNow Discover",
			tag: "FOOD ORDERING PLATFORM.",
			detail:
				"ChowNow Discover is a platform that lets customers discover new local restaurants and provides business owners with tools to convert first time orders into lifelong diners.",
			link: "https://github.com/thusharakart/e16-3yp-obstacle-bots-for-swarm-robots#readme",
		},
		swarm: {
			title: "SWARM ROBOTS PLATFORM",
			tag: "OBSTACLE BOTS / OPERATOR GUI / ALGORITHMS DEPLOYABLE WEBSITE WITH 3D UI",
			detail:
				"Obstacal bot system for the existing swarm project of University of Peradeniya. This system mainly contains overhead camera setup to localize the obstacle bots. By using this system the users can place the obstacle bots in disired positions or the disired repititive paths. Then the system positions the bots in relavant places without coliding with other robots. For this we are using Partical Repulsion Theory and model the Obstacal bots as charged particals in a Electric Field. ",
			link: "https://github.com/thusharakart/e16-3yp-obstacle-bots-for-swarm-robots#readme",
		},
		newrelic: {
			title: "NewRelic.com",
			tag: "APPLICATION PERFORMANCE MONITORING.",
			detail:
				"Roambi provides analytics, reporting, and business intelligence for companies to use on the go. A Wordpress hosted site written in PHP and Javascript with Hubspot Integration.",
			link: "http://www.newrelic.com",
		},
		roambi: {
			title: "Roambi.com",
			tag: "BUSINESS ANALYTICS.",
			detail:
				"Roambi provides analytics, reporting, and business intelligence for companies to use on the go. A Wordpress hosted site written in PHP and Javascript with Hubspot Integration.",
			link: "http://www.roambi.com",
		},
		walker: {
			title: "WalkerTracker",
			tag: "PERFORMANCE METRICS.",
			detail:
				"Walker Tracker offers goal management, fitness tracking, and team competitions to companies for internal use. A Ruby on Rails and Javascript companion site for the Walker Tracker App. Features visual metrics and gamified progression system.",
		},
		powur: {
			title: "Fractal Implementation",
			tag: "JULIA SET AND MANDELBROT IMPLEMENTATION",
			detail:
				"Fractals are infinity many, self-similar shapes formed by some simple mathematical computations. The computation varies from fractal set to set but are generally based on complex numbers. ",
			link: "https://github.com/thusharakart/Fractal-Implementation",
		},
		mystand: {
			title: "MyStand",
			tag: "CROWD-FUNDED CHARITY.",
			detail:
				"MyStand is a crowd-funding, media sharing website, that has you donating actions instead of money out of your pocket. Single page App built with Node.js on Sails and Angular 2.0. Features social media sharing and large scale crowd-funding.",
		},
		never: {
			title: "Crossword Game",
			tag: "REACT JS GAME FOR FACEBOOK",
			detail:
				"A instant game developed for facebook using React.js. Mainly targeted Children. Users can choose a puzzle and play.",
			link: "https://crossword-sigma.vercel.app/",
		},
		themall: {
			title: "The Mall",
			tag: "PEER GUIDED SHOPPING.",
			detail:
				"The Mall is a place to follow the latest fashion purchases of your friends and favorite celebrities. Built with Node.js and Handlebars. Features the ability to import thousands of top brands products into one shopping site.",
		},
	};

	$("#gallery .button").on("click", function () {
		fillModal(this.id);
		$(".modal-wrap").addClass("visible");
	});

	$(".close").on("click", function () {
		$(".modal-wrap, #modal .button").removeClass("visible");
	});

	$(".mask").on("click", function () {
		$(".modal-wrap, #modal .button").removeClass("visible");
	});

	var carousel = $("#carousel"),
		slideWidth = 800,
		threshold = slideWidth / 3,
		dragStart,
		dragEnd;

	setDimensions();

	$("#next").click(function () {
		shiftSlide(-1);
	});
	$("#prev").click(function () {
		shiftSlide(1);
	});

	carousel.on("mousedown", function () {
		if (carousel.hasClass("transition")) return;
		dragStart = event.pageX;
		$(this).on("mousemove", function () {
			dragEnd = event.pageX;
			$(this).css("transform", "translateX(" + dragPos() + "px)");
		});
		$(document).on("mouseup", function () {
			if (dragPos() > threshold) {
				return shiftSlide(1);
			}
			if (dragPos() < -threshold) {
				return shiftSlide(-1);
			}
			shiftSlide(0);
		});
	});

	function setDimensions() {
		if (
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent,
			)
		) {
			slideWidth = $(window).innerWidth();
		}
		$(".carousel-wrap, .slide").css("width", slideWidth);
		$(".modal").css("max-width", slideWidth);
		$("#carousel").css("left", slideWidth * -1);
	}

	function dragPos() {
		return dragEnd - dragStart;
	}

	function shiftSlide(direction) {
		if (carousel.hasClass("transition")) return;
		dragEnd = dragStart;
		$(document).off("mouseup");
		carousel
			.off("mousemove")
			.addClass("transition")
			.css("transform", "translateX(" + direction * slideWidth + "px)");
		setTimeout(function () {
			if (direction === 1) {
				$(".slide:first").before($(".slide:last"));
			} else if (direction === -1) {
				$(".slide:last").after($(".slide:first"));
			}
			carousel.removeClass("transition");
			carousel.css("transform", "translateX(0px)");
		}, 800);
	}

	function fillModal(id) {
		$("#modal .title").text(modalText[id].title);
		$("#modal .detail").text(modalText[id].detail);
		$("#modal .tag").text(modalText[id].tag);
		if (modalText[id].link)
			$("#modal .button")
				.addClass("visible")
				.parent()
				.attr("href", modalText[id].link);

		$.each($("#modal li"), function (index, value) {
			$(this).text(modalText[id].bullets[index]);
		});
		$.each($("#modal .slide"), function (index, value) {
			$(this).css({
				background:
					"url('img/slides/" + id + "-" + index + ".jpg') center center/cover",
				backgroundSize: "cover",
			});
		});
	}
});
