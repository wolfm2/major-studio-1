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
      <a class="navbar-brand" href="#">Infrastructure</a>
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
        <li><a href="#">By Gender - By Education - By Rurality</a></li>
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
    <div class="col-sm-8 text-left">
      
	    <svg id='main'></svg>
	    
    </div>
    <div class="col-sm-4 sidenav">

      <div class="col-sm-8 sidenav">
      <div class="well">
        <p>LSMS</p>
      </div>
      <div class="well">
        <p>Deeper info re what you just clicked on</p>
      </div>
			</div>	
      <div class="col-sm-4 sidenav">
			</div>	
    </div>
    
  </div>
</div>
`
function initHtml () {
	$('#vis0').html(template0);
	$('#vis1').html(template0);
}

function initFullPage() {
	//initialising fullpage.js in the jQuery way
	$('#fullpage').fullpage({
			sectionsColor: ['#ff5f45', '#0798ec', '#fc6c7c', '#fec401'],
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
