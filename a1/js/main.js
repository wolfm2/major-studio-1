// TODO

ani_duration = 200;
$().ready(function() {
	$('.kwicks').kwicks({
		maxSize: 600,
		behavior: 'menu'
	});
});

$("ul").on('expand.kwicks', function(e, data) {
	if (data.expanded != null) {
		$(".panel-text").animate({
			opacity: 0,
			fontSize: '80%'

		}, ani_duration);
	} else {
		$(".panel-text").animate({
			opacity: 1.0,
			fontSize: '100%'
		}, ani_duration);
	}

	$(data.collapsed).find(".panel-chop").css('z-index', '1');

	$(data.expanded).find(".panel-chop").animate({
		opacity: 0
	}, ani_duration, "swing", function() {
		$(this).css('z-index', '-1')
	});
	$(data.expanded).find(".panel-info").animate({
		opacity: 1.0
	}, ani_duration);
	$(data.collapsed).find(".panel-chop").animate({
		opacity: 1.0
	}, ani_duration, "swing", function() {
		$(this).css('z-index', '1')
	});
	$(data.collapsed).find(".panel-info").animate({
		opacity: 0
	}, ani_duration);
	//~ if (data.collapsed.length < 3) {
	//~ $(data.collapsed).find(".panel-chop").animate({
	//~ width: '45px',
	//~ fontSize: '100%'
	//~ },500);
	//~ $(data.collapsed).find(".panel-text").animate({
	//~ opacity: 0,
	//~ },500);
	//~ } else {

	//~ $(data.collapsed).find(".panel-chop").animate({
	//~ width: '230px',
	//~ fontSize: '200%'
	//~ },500);
	//~ $(data.collapsed).find(".panel-text").animate({
	//~ opacity: 1.0,
	//~ },500);

	//~ }
	//~ if (data.expanded == null) {
	//~ //$('.panel-text').fadeIn(700);
	//~ $('.panel-text').animate({
	//~ fontSize: "200%",
	//~ opacity: 1.0
	//~ }, 500);
	//~ $(".panel-chop").show(500);
	//~ } else {
	//~ //$('.panel-text').fadeOut(100);
	//~ $('.panel-text').animate({
	//~ fontSize: "15%",
	//~ opacity: 0.01
	//~ }, 100);
	//~ $(data.expanded).find(".panel-chop").hide(100);
	//~ }
	console.log(data);
});

var g_config = liquidFillGaugeDefaultSettings();
g_config.circleColor = "#0";
g_config.textColor = "#0";
g_config.waveTextColor = "#73da83";
g_config.waveColor = '#407949'; // '#bfff46'; //"#bee523";
g_config.circleThickness = 0.14;
// g_config.textVertPosition = 0.3;
g_config.waveHeight = 0.05;
g_config.waveAnimateTime = 1500;
var gauge1 = loadLiquidFillGauge("home_gauge", 80, g_config);
var gauge2 = loadLiquidFillGauge("indu_gauge", 52, g_config);
var gauge3 = loadLiquidFillGauge("hosp_gauge", 90, g_config);

function NewValue() {
	if (Math.random() > .5) {
		return Math.round(Math.random() * 100);
	} else {
		return (Math.random() * 100).toFixed(1);
	}
}

// populate initiatives bar
for (i in initData) {
	imgHtml = `
		<div class=init-img data-idx=${i}>
			<image src="${imgSqPath}${initData[i].pic}" title='${initData[i].title}'></image>
		</div>`
	console.log(imgHtml);
	$('#init-bar').append(imgHtml);
}

function initContent(e){
	if (e == null)
	  idx = 0;
	else
	  idx = parseInt($(e.currentTarget).attr('data-idx'));
	$('#init-title').html('<b>' + initData[idx].title + '</b>');
	mainImgHtml = `<image id='init-main-img' src='${imgSqPath}${initData[idx].pic}'></image>`
    $('#init-main-text').html(mainImgHtml + initData[idx].text);
	}

// add button event
$('.init-img').on('click', initContent);

initContent(null);
