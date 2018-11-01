// fullPage code and HTML element init

var template0 = `
<nav class="navbar navbar-inverse">
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
      
	    <svg id='{1}'></svg>
	    
    </div>
    <div class="col-sm-6 sidenav">

      <div class="col-sm-11 sidenav">
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

var copy00 = 'This series derives from World Bank\'s <b>Living Standards Measurement Study</b> (LSMS).  The data here is from the third wave of the LSMS and covers location, education, and consuming habits of the respondents';
var copyTemp01 = 'Of the total head of household respondents, <b>{0}</b> were female and <b>{1}</b> were male. <b>{2}</b> of female reported using a solar panel for their power needs whereas <b>{3}</b> of men did. This means that female heads of households were <b>{4}%</b> more likely to invest in solar than their male counterparts.';
var copy01;

function initHtml () {
	var d = data.nigeriaF;
	copy01 = copyTemp01.format(d.HeadW, d.HeadM, d.solarW , d.solarM, parseInt((100/d.solarPcM)*d.solarPcW-100));
	
	var m = mkMenu(['By Gender', 'By Education', 'By Rurality'], 2);
	$('#vis0').html(template0.format("Infrastructure Choices: Grid Electricity", "eConn", copy00, copy01, m));
	$('#vis1').html(template0.format("Infrastructure Choices: Lighting by Parental Education", "lightEdu", "one", data.nigeriaF.hhFEeduMOLightCopy, m));
	$('#vis2').html(template0.format("Infrastructure Choices", "test", "one", "two!", m));
	$('#vis3').html(template0.format("Burden of Disease", "test", "one", "two!", []));

	// set up handlers
	$('.menuOpts').on('click', (e) => {
		var sect = $(e.target).attr('data-sect');
		var slide = $(e.target).attr('data-slide');
		$.fn.fullpage.moveTo(sect,slide);
		
		$('.menuOpts').removeAttr('data-active');
		$(`.menuOpts[data-sect=${sect}][data-slide=${slide}]`).attr('data-active', '1');
		});
	
}

function initFullPage() {
	//initialising fullpage.js in the jQuery way
	$('#fullpage').fullpage({
			sectionsColor: '#333333', // ['#ff5f45', '#0798ec', '#fc6c7c', '#fec401'],
			navigation: true,
			slidesNavigation: true,
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
