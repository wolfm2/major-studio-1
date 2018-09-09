// img src name, title, text

imgSdPath = 'assets/sd/'
jobsData = [
{pic:'buildout.jpg',title:'Buildout'},
{pic:'education.jpg',title:'Education'},
{pic:'entrepreneurship.jpg',title:'Entrepreneurship'},
{pic:'fabrication.jpg',title:'Fabrication'},
{pic:'installation.jpg',title:'Installation'},
{pic:'maintenance.jpg',title:'Maintenance'},
{pic:'sales.jpg',title:'Sales'},
];

var jobsIdx = 0;
function imgChange() {
	$("#jobs-title").html(jobsData[jobsIdx].title);
	$("#jobs-img > img").css('opacity', '0'); //.animate({opacity: 0}, 200);
	$("#jobs-img > img:eq(" + jobsIdx + ")").css('opacity', '1'); //animate({opacity: 1}, 200);
	if (++jobsIdx >= jobsData.length) jobsIdx = 0;
}

for (idx in jobsData) {
	jobImgHtml = `<image id='job-img' src='${imgSdPath}${jobsData[idx].pic}'></image>`
	$('#jobs-img').append(jobImgHtml);
}

//$('#jobs-img > img').css('border-radius', '4px');
imgChange();
setInterval(imgChange, 4000);

//~ $(".panel-text").animate({
			//~ opacity: 0,
			//~ fontSize: '80%'

		//~ }, ani_duration);

imgSqPath = 'assets/squared/'
initData = [
{pic:'irrigation.jpg',title:'Solar Irrigation',text:'Praesent vulputate tempus feugiat. Phasel quis aliquam neque, molestie ultrices purus. Donec imperdiet, arcu eu vulputate hendrerit, nibh orci sed.'},
{pic:'lamps.jpg',title:'Personal Solar Lamps',text:'Quisque elementum, magna a sollicitudin consequat, libero ante condimentum augue, venenatis tempor mi turpis eu elit. Ut pulvinar at ex auctor.'},
{pic:'kits.jpg',title:'Solar Jumpstart Kits',text:'Phasellus faucibus elit vel vehicula lacinia. Cras a tellus eleifend massa elementum suscipit. Donec condimentum neque eu tortor commodo orci.'},
{pic:'pumping.jpg',title:'Solar Groundwater Pumps',text:'Quisque euismod tellus orci, quis auctor felis malesuada eu. Vestibulum consectetur, odio ut cursus dapibus, libero velit iaculis lectus, sit posuere.'},
{pic:'streetlights.jpg',title:'Solar Streetlights',text:'Nulla id mattis libero, et consequat urna. Donec sagittis ante in sodales ultricies. Integer eu quam mauris. Duis elementum sodales convallis posuere.'},
{pic:'centres.jpg',title:'Power Plants',text:'Felis mel libero, tincidunt at turpis non, pulvinar blandit purus. Sed at bibendum mi, et euismod leo. Etiam sed ligula eget enim suscipit metus.'},
{pic:'funds1.jpg',title:'UNDP Funding Partners',text:'Mauris molestie tempor diam, ac lobortis lorem interdum in. Aenean finibus nunc ornare arcu efficitur vehicula. Aenean venenatis ornare blandit metus.'},
{pic:'grants.jpg',title:'Secured GEF Grants',text:'Mauris tempus mi sed erat commodo, eget facilisis felis gravida. Suspendisse eu tempus nulla, id finibus leo. Mauris dapibus vestibulum pretium.'}
];

// other sources:
// https://guardian.ng/energy/infographic-moving-africa-forward-with-solar/
// 3 mil employed in 2016
// https://media.nationalgeographic.org/assets/photos/000/306/30633.jpg
// 745000 TWh == world capacity
// Africa has 40% of this == 298000 TWh

// https://yearbook.enerdata.net/renewables/renewable-in-electricity-production-share.html
// 2016 world electricity consumption 21000 TWh

// https://rael.berkeley.edu/wp-content/uploads/2015/04/WeiPatadiaKammen_CleanEnergyJobs_EPolicy2010.pdf
// job hrs creation
