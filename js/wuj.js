/*jshint devel:true */

// create functions and define global variables
var queryWidth = 800;
var viewportHeight = $(window).height();
var viewportWidth = $(window).width();

// center arrow on home page
function centerArrow(){
	var $downArrow = $('.down-arrow');
	var arrowWidth = $downArrow.innerWidth();
	var sectionWidth = $('.home-page').innerWidth();
	$downArrow.css('left', ((sectionWidth - (arrowWidth+30))/2) + "px");
}

//collapse left column for mobile view
function collapseContent(){
	jQuery('.col-right').each(function(){
		$(this).slideUp(0);
	});
}

//vertically/horz align design elements on home page and left columns (sections)
function alignElements(){
	// home page
	var $relativeContent = $(".relative-placement");
	$relativeContent.each(function() { 
		var el=$(this);
		var parent = el.parents('.full-section');
		var id = parent.attr('id');

		if (id === 'home-section' && viewportWidth > queryWidth){
			parent.css('height',viewportHeight + 'px');
			el.css('height',viewportHeight + 'px');
		} else {
			parent.css('height',viewportHeight + 'px');
			el.css({
				'top': ( (viewportHeight - el.innerHeight() )/2) + 'px'
			});
		}
		// chapters & pages
		$('.col-left').each(function(key){
			var $img = $(this).find('img');
			var imgH = $img.innerHeight();
			var slideH= $(this).innerHeight();
			var slideHeight = viewportHeight - $('.col-middle').outerHeight();

			// adjust height for mobile
			if ( viewportWidth < queryWidth){

				$(this).css('height',slideHeight - 100 + "px");

				// adjust images (watercolor) for mobile
				if(key !== 4){
					$img.css('top',((slideH - imgH)/3) + "px");
				} else{
					$img.css('margin-top', "10px");
				}
			}

			// slider container
			if ( viewportWidth < queryWidth){
				$('.swiper-container').css('height', slideHeight + 'px');
			}
		});
	});
}

// replace <img src="image.svg"> to inline SVG
function replaceSVG(){
jQuery('img.svg').each(function(){
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find('svg');

        // Add replaced image's ID to the new SVG
        if(typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass+' replaced-svg');
        }
       // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');
        // Replace image with new SVG
        $img.replaceWith($svg);
    }, 'xml');
});
}

// scaling and adding video to the background
function scaleVideo(){
    //save window height and width
    var scale;
    var video = $('#bg-video');
    //save video height and width
    var videoNativeHeight = $(video)[0].videoHeight;
    var videoNativeWidth = $(video)[0].videoWidth;
    //make scale factors with height and width
    var heightScaleFactor = viewportHeight/videoNativeHeight;
    var widthScaleFactor = viewportWidth/videoNativeWidth;
    //which is higher?
    if(heightScaleFactor<widthScaleFactor){
    	scale = widthScaleFactor;
    }else{
    	scale= heightScaleFactor;
    }

    var scaledVideoHeight = scale*videoNativeHeight;
    var scaledVideoWidth = scale*videoNativeWidth;

    video.height(scaledVideoHeight);
    video.width(scaledVideoWidth);
}


function slideToggle(){
	$( '#solution-expanded' ).slideToggle(666);
}


$(document).ready(function(){
	// slide solution section
	var heightDiff;
	var navHeight;
	// center arrow animation on home page
	centerArrow();
	
	// lightbox
	$.featherlight.defaults.artistName = "We Became Owls";
	$.featherlight.defaults.artistInfo = "We Became Owls is an Alternative Americana band from Oakland, CA. Songwriter Andrew Blair and multi-instrumentalist Ross Warner began creating, writing, and composing music together in middle school. Influenced by the sound of Greenwich Village in the 60's, the Texas of Van Zandt and Earl, and more contemporary acts like Wilco, Damien Jurado, Drive by Truckers, and Jeff Buckley, We Became Owls recalls a sound heard in the jukes, front porches, barns, and hillsides of a long forgotten era.";
	jQuery('img.svg').each(function(){
		var configuration = $.featherlight.defaults;
		$('.lightbox-targetlink').featherlight($('#video'), configuration);
	});

	// click to expand / collapse solution list...music licensing, tech, biz models, diff
	$( '#solution-expanded' ).slideUp( 0 );
	// get heighdiff for scrolling?
	// considering canning this *********
	setTimeout(function(){
		heightDiff = $('#technology-section').offset().top;
		console.log("heightDiff: " + heightDiff);
		return heightDiff;
	},100);

	var $expandSection = $('#solution-expanded');
	$( 'a.slide-toggle-btn').click(function(e) {
		e.preventDefault();
		navHeight = $('.solution-list').innerHeight();
		heightDiff -=navHeight;

		$('html,body').animate({
			scrollTop: heightDiff,
			duration: 800,
			complete: slideToggle(1000)
		});

		$expandSection.toggleClass('section-active');
	});

		$('.solution-list a').click(function(e){
			e.preventDefault();
			var redirect = $(this).attr('href');

			if ($expandSection.hasClass('section-active')){
				 //$( '#solution-expanded' ).slideToggle( 300 );
				 // console.log('go up');
				 //$expandSection.toggleClass('section-active');
				 // $('html,body').animate({
					// 	scrollTop: $(redirect).offset().top
					// }, 1000);
			} else{
				$( '#solution-expanded' ).slideToggle( 800 );
				console.log('go down');
				$('html,body').animate({
						scrollTop: heightDiff
					}, 1000);
				$expandSection.toggleClass('section-active');
			}
		});

		$('div.hidden-solution').click(function(){
			 $( '#solution-expanded' ).slideToggle( 'slow' );
			 $expandSection.toggleClass('section-active');
		});


// 	// swiper calls

	

// new swiper with Slick
	$('.swiper-container').each(function(key){
		console.log(key);
		$( this ).slick({
			arrows: false,
			dots: true,
			infinite: false
			// mobileFirst: true
			// centerMode: true
		});
		// $(this).click(function(){
		// 	$(this).slick('slickNext');
		// });
	});
	$('a.library-genre-link').click(function(e) {
		e.preventDefault();
		var linkTarget = $(this).attr('index');
		console.log(linkTarget);
		$('#library-section').find('.swiper-container').slick('slickGoTo', linkTarget);
	});

	// adjustments: replace img.svg w inline SVG && align section witdth/heights
	replaceSVG();
	alignElements();


	// hover effect for SVG elements in footer
		$('.social-links li').hover(function() {
			var el = $(this);
			var svg = el.find('svg path, .svg polygon');
			svg.attr('fill', '#CCC');
		}, function() {
			var el = $(this);
			var svg = el.find('svg path, .svg polygon');
			svg.attr('fill', '#3A3A3A');
		});

	//video
		var $videoLayer = $('#video-placement');

		if(viewportWidth>queryWidth){
			$videoLayer.prepend('<video id="bg-video" loop src="http://f.cl.ly/items/0o0s2Y340a221x2g3q2z/intro.mp4" autoplay muted></video>');
		}



		
		var video = $('#bg-video');
		var bg = $('#video-placement');

		if(viewportHeight>queryWidth){

			video.on('loadedmetadata', scaleVideo);
			$(window).on('resize', scaleVideo);

		} else {
			video.attr({
				src: "",
				alt: "jQuery"
			});
			bg.addClass('background-image');
		}


	// problem animation

	var xPos = 0;
	var $item =$('#animation');
	var rules = {
		startingXpos: 0,
		resetAt: 0,
		stopAt: -2000,
		vertical: 'top'
	};
	var start;




	setInterval(function() {

		if(start){
			xPos = rules.startingXpos;
			start = false;
	    //console.log("START");
	}
	xPos -= 500;

	if(xPos === rules.stopAt){
		xPos = rules.resetAt;
	}
	$item.css({
		'background-position':xPos+'px ' +rules.vertical
	});
	  //console.log(xPos + " " + rules.vertical);
	}, 100);


	var problemText = [
		{
		title : "The Vision",
		description: "You have an idea of how to enhance your services and build stronger customer relationships through music. It should be easy to find perfectly reasonable business partners that are interested in making a deal, but it's not."},
		{
		title : "The Obstacles",
		description: "The problem is sytematic. Barriers are in every step of the process. Traditional licensing and technology solutions are time consuming and expensive. You are competing with free music content. Differentiation and sound business models seem elusive at best when it comes to music licesning and content delivery."},
		{
		title : "Our Solution",
		description: "Instead of searching for ways around the old barriers, BAMM.tv built a new road (I hate this line, btw). All of our content is under a license that makes sense to both the artist and brand. We build content delivery solutions that reflect how and where music is consumed. Finally, by producing all of the content, we've curated a library of one-of-a kind content."}
		];

		function changeProblemContent(name){
			var $title = $('.problem-title');
			var $description = $('.problem-description');
			var index;
			if (name === "Vision"){index = 0;}
			if (name === "Obstacles"){index = 1;}
			if (name === "Solution"){index = 2;}
			$title.css('opacity',0);
			$description.css('opacity',0);
			setTimeout(function(){
				$title.text(problemText[index].title);
				$description.text(problemText[index].description);
			},500);
			setTimeout(function(){
				$title.css('opacity',1);
				$description.css('opacity',1);
			},800);
		}

	$('a.flash-btn').hover(function() {
		$(this).removeClass('flash-btn');
	});

	// problem-list (animation)
	$('.problem-list a').click(function(e) {
		e.preventDefault();
		$(this).parent().find('.flash-btn').removeClass('flash-btn');
	});

		var $first = $('.first'),
		$second= $('.second'),
		$third = $('.third');


		$('.problem-list a').on('click',function(){
			var $el = $(this);
			if ($el.hasClass('active-problem-link')){
				console.log('already active');
			} else{
				$el.parents('.problem-list').find('.active-problem-link').removeClass('active-problem-link');
				$el.addClass('active-problem-link');
				var name = $el.text();
				changeProblemContent(name);
			}
			start=true;
			return start;
		});

		$first.on('click',function(){
			rules = {
				startingXpos: 0,
				resetAt: 0,
				stopAt: -2000,
				vertical: 'top'
			};
		  //changeProblemContent();
		  return rules;

		});
		$second.on('click',function(){
			rules = {
				startingXpos: -2000,
				resetAt: -4000,
				stopAt: -5500,
				vertical: 'top'
			};

			return rules;
		});

		$third.on('click',function(){

			rules = {
				startingXpos: 0,
				resetAt: -9000,
				stopAt: -12500,
				vertical: 'bottom'
			};

			return rules;

		});



	// slide toggle for mobile sections
	if(viewportWidth < queryWidth){
		console.log('collapse');
		collapseContent();
		console.log('collapse');
	}
	var textArray= [];
	$('.col-middle').each(function(key){
		var $link = $(this).find('a');
		textArray.push( $(this).text() );
			$link.click(function() {
				var originalText = ( textArray[key] );
				var collapseText = originalText + " (tap again to collaspe)";
				var $content = $(this).parents('.row').find('.col-right');

				$content.toggleClass('mobile-expanded');

				if ( $content.hasClass('mobile-expanded') ){
					$content.slideToggle(1200);
					$(this).text(collapseText);
				} else {
					$content.slideToggle(300);
					$(this).text(originalText);
				}
			});
});



}); // end of ready function


// window resize
$( window ).resize(function() {
	 viewportHeight = $(window).height();
     viewportWidth = $(window).width();

	if (viewportWidth< queryWidth){
		console.log('collapse');
		collapseContent();
	}
	alignElements();
	centerArrow();
});



//smooth scrolling or instant scrolling

	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') || location.hostname === this.hostname) {

			

			

			if ($(this).attr('href') === '#footer'){
				console.log('yeah');
			} else {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top
					}, 1000);
					return false;
				}
			}
		}
			
	});