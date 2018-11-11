// fullPage code and HTML element init

var template0 = `
<nav class="navbar navbar-inverse" style='display: none;'>
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
      </button>
      <a class="navbar-brand" href="#"><b>{0}</b></a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <!--
      <ul class="nav navbar-nav">
        <li class="active"><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Projects</a></li>
        <li><a href="#">Contact</a></li>
      </ul> 
      -->
      <ul class="nav navbar-nav navbar-right">
        {4}
        <!-- <li><a href="#">By Gender - By Education - By Rurality</a></li> -->
      </ul>
    </div>
  </div>
</nav>
  
<div class="container-fluid text-center">    
  <div class="row content">
<!--
    <div class="col-sm-2 sidenav">
      <p><a href="#">Link</a></p>
      <p><a href="#">Link</a></p>
      <p><a href="#">Link</a></p>
    </div>
-->
    <div class="col-sm-6 text-left">
      <div class="navbar navbar-inverse">{0}</div>
	    <svg id='{1}'></svg>
	    
    </div>
    <div class="col-sm-6 sidenav">

      <div class="col-sm-11 sidenav well-container">
      <div class="well">
        <p>{2}</p>
        <hr>
      <!--  </div>
      <div class="well"> 1-->
        <p>{3}</p>
      </div>
			</div>	
      <div class="col-sm-1 sidenav">
			</div>	
    </div>
    
  </div>
</div>
`

template1 = `<li><a class="menuOpts" data-sect={1} data-slide={2}>{0}</a></li>`;  // menu option

// a pythonesque format method
if (!String.prototype.format) {
    String.prototype.format = function() {
        var args;
        args = arguments;
        if (args.length === 1 && args[0] !== null && typeof args[0] === 'object') {
            args = args[0];
        }
        return this.replace(/{([^}]*)}/g, function(match, key) {
            return (typeof args[key] !== "undefined" ? args[key] : match);
        });
    };
}

function mkMenu(names, sect) {
	var html = '';
	
	names.forEach((e, i) => {
		html += template1.format(e, sect, i);
		});
	return (html);
}

var copy00 = 'This series derives from World Bank\'s <b>Living Standards Measurement Study</b> (LSMS).  The data here is from the 2015-2016 third wave panel of the LSMS and covers location, education, and consuming habits of the respondents';

function initHtml () {
	var d = data.nigeriaF;
	
	// var m = mkMenu(['By Gender', 'By Education', 'By Rurality'], 2);
	var m = mkMenu([], 2);
	
	$('#vis0').html(template0.format("Infrastructure Choices: Grid Electricity &mdash; Gender", "eConn", copy00, data.nigeriaF.eConnCopy, m));
	$('#vis1').html(template0.format("Infrastructure Choices: Lighting &mdash; Parental Education", "lightEdu", copy00, data.nigeriaF.hhFEeduMOLightCopy, m));
	$('#vis2').html(template0.format("Infrastructure Choices: Men's Cooking Fuel - Mothers Education", "cookEduMo", copy00, data.nigeriaF.hhMAeduCookCopy, m));
	$('#vis3').html(template0.format("Infrastructure Choices: Lighting &mdash; Gender & Road Access", "lightDistRoad", copy00, data.nigeriaF.hhBoDistRoadCopy, m));
	$('#vis4').html(template0.format("Infrastructure Choices: Kerosene &mdash; Gender & Urban Access", "cookDistPop", copy00, data.nigeriaF.hhBoDistPopCopy, m));

	$('#vis5').html(template0.format("Burden of Disease", "disease0", data.gbd.mainCopy, data.gbd.asthmaCopy, []));

	// set up handlers
	$('.menuOpts').on('click', (e) => {
		var sect = $(e.target).attr('data-sect');
		var slide = $(e.target).attr('data-slide');
		$.fn.fullpage.moveTo(sect,slide);
		
		$('.menuOpts').removeAttr('data-active');
		$(`.menuOpts[data-sect=${sect}][data-slide=${slide}]`).attr('data-active', '1');
		});
	
}

//~ function aaddSlidesNavigation(section, numSlides){
        //~ section.append('<div class="fp-slidesNav"><ul></ul></div>');
        //~ var nav = section.find('.fp-slidesNav');

        //~ //top or bottom
        //~ //nav.addClass(options.slidesNavPosition);

        //~ for(var i=0; i< numSlides; i++){
            //~ //nav.find('ul').append('<li><a href="#" title="'+ tooltip[i] +'"><span></span></a></li>');

            //~ // Only add tooltip if needed (defined by user)
            //~ var tooltip = ['1','2','3','4','5'][i]; //options.horizontalNavigationToolTip[i];

            //~ // var li = '<li><a class="tooltips" href="#"><span></span><div><img src="images/tooltip/'+ tooltip +'.png" /></span></div></a>';
            //~ var li = '<li><a class="tooltips" href="#"><span></span><div>'+ tooltip +'"</span></div></a>';
            //~ li += '</li>';

            //~ nav.find('ul').append(li);
        //~ }

        //~ //centering it
        //~ nav.css('margin-left', '-' + (nav.width()/2) + 'px');

        //~ nav.find('li').first().find('a').addClass('active');
    //~ }

function initFullPage() {
	//initialising fullpage.js in the jQuery way
	$('#fullpage').fullpage({
			sectionsColor: '#333333', // ['#ff5f45', '#0798ec', '#fc6c7c', '#fec401'],
			navigation: true,
			slidesNavigation: true,
			licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
			controlArrows: false,
			navigationTooltips: ['Title','Context','Fuel','Disease','Summary','Sources'],
			horizontalNavigationToolTip: ['tooltip1','tooltip2','Fuel','Disease','e','Sources'],
	});

	// calling fullpage.js methods using jQuery
	$('#moveSectionUp').click(function(e){
			e.preventDefault();
			$.fn.fullpage.moveSectionUp();
	});

	$('#moveSectionDown').click(function(e){
			e.preventDefault();
			$.fn.fullpage.moveSectionDown();
	});
}
