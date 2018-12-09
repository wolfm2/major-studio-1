// TABLES
// hhid(int pk)
// sect1_plantingw3.csv:	s1q2(Sex) s1q3(HHH) s1q22(max edu father) s1q27(max edu mother)
// sect1_harvestw3.csv:		s1q2(Sex) s1q3(HHH)
// sect11_plantingw3.csv:	s11q10(lightingfuel) s11q11(cooking fuel) s11q17b(electricity connected) 
//												s11q19b(electricity src) s11q28f(have generator) s11q28f(have solar panel) 
//												s11q7(roof) s11q8(floor) s11q12(collect firewood)
// sectc1_plantingw3.csv:	c1q6(max edu you)
// sectc1_harvestw3.csv:	c1q6(max edu you)
// nga_householdgeovars_y3.csv: dist_road2(km) dist_popcenter2(km) dist_market(km)

// ENUMERATIONS
// HHH:												1=True
// Sex: 											1=M,2=F

// max edu father|mother|you:	
//~ 0. NONE
//~ 1. N1  
//~ 2. N2  
//~ 11. P1 
//~ 12. P2 
//~ 13. P3 
//~ 14. P4 
//~ 15. P5 
//~ 16. P6 
//~ 21. JS1
//~ 22. JS2
//~ 23. JS3
//~ 24. SS1
//~ 25. SS2
//~ 26. SS3
//~ 27. LOWER 6    
//~ 28. UPPER 6    
//~ 31. TEACHER TRAINING   
//~ 32. VOCATIONAL/TECHNICAL       
//~ 33. MODERN SCHOOL      
//~ 34. NCE
//~ 41. POLY/PROF  
//~ 42. 1ST DEGREE 
//~ 43. HIGHER DEGREE      
//~ 51. QUARANIC   
//~ 52. QUARANIC INTEGRATED
//~ 61. ADULT EDUCATION   

// collect firewood:								1=y,2=n
// electricity connection|solar:		1=y,2=n
// electricity src			
//~ 1. PHCN (NEPA) ONLY    
//~ 2. RURAL ELECTRICITY/GENERATOR 
	
// lighting fuel    
//~ 1. COLLECTED FIREWOOD  
//~ 2. PURCHASED FIREWOOD  
//~ 3. GRASS       
//~ 4. KEROSENE    
//~ 5. ELECTRICITY/PHCN    
//~ 6. GENERATOR   
//~ 7. GAS 
//~ 8. BATTERY/DRY CELL (TORCH)    
//~ 9. CANDLES     
//~ 10. OTHER (SPECIFY)  
							
// cooking fuel  
//~ 1. COLLECTED FIREWOOD  
//~ 2. PURCHASED FIREWOOD  
//~ 3. COAL
//~ 4. GRASS       
//~ 5. KEROSENE    
//~ 6. ELECTRICITY/PHCN    
//~ 7. GENERATOR   
//~ 8. GAS 
//~ 9. OTHER (SPECIFY)    

// ceiling|floor:
//~ 1. GRASS       
//~ 2. MUD 
//~ 3. COMPACTED EARTH     
//~ 4. MUD BRICK (UNFIRED) 
//~ 5. BURNT BRICKS
//~ 6. CONCRETE    
//~ 7. WOOD
//~ 8. IRON SHEETS 
//~ 9. CONCRETE OR CEMENT BLOCKS   
//~ 10. STONE      
//~ 11. OTHER (SPECIFY)

data.nigeria = [];
data.nigeriaF = {}; // nigeria filtered

// volatile data repository
// for researching - not storing
var vDataRepo = {};
// take a 2d int array and convert to percent
function insVDR(name, insData) {
	total = _.sum(_.flatten(insData)) // total respondents
	insData.forEach ((d,i) => {
		d.forEach ((d,j) => {
			insData[i][j] = parseFloat((d/total).toFixed(2));
		});
	});
	vDataRepo[name] = insData;
}

// get a couple tables. return % sum of electric rows within col. 
function getColPcnt (tabs, col, light) {
	var electricSrcs = light?[4,5,7]:[5,6]; // [[grid, generator], battery]
  // c0 = vDataRepo['hhm-DistMark-Light'].map((d) => {return d[col]})
  var col0 = tabs[0].map((d) => {return d[col]});
  var col1 = tabs[1].map((d) => {return d[col]});
	var tot0 = _.sum(col0);
	var tot1 = _.sum(col1);
	var sum0 = 0, sum1 = 0; // sum pcnt of electric srces
	col0.forEach((d,i) => {
		if (electricSrcs.includes(i))
		  sum0 += d;
		});
	col1.forEach((d,i) => {
		if (electricSrcs.includes(i))
		  sum1 += d;
		});
	return ([sum0/tot0, sum1/tot1])
}

// use each time you need new filtered data
// then turn off
function initData() {
	// if (true) {
	if (false) {
		d3.queue()
			.defer(d3.csv, 'data/sect1_plantingw3.csv')
			.defer(d3.csv, 'data/sectc1_plantingw3.csv')
			.defer(d3.csv, 'data/sect11_plantingw3.csv')
			.defer(d3.csv, 'data/nga_householdgeovars_y3.csv')
			.await(processData);
	} else {
			data.nigeriaF = 
{"HeadW":917,"HeadM":3694,"eConnData":[0.6194111232279171,0.5043313481321061],"hhFEeduMOLightData":[0.5700000000000001,0.28,0.13,0.17],"hhMAeduCookData":[0.11,0.07],"hhBo30kPopData":[0.09,0.21],"hhBo45kPopData":[0.03,0.06],"hhBo10kRoadData":[0.23,0.16],"hhBo30kRoadData":[0.09,0.04],"hhBoDistPopData":[0.07,0.06,0.13,0.13,0.11,0.03],"distPopCook1":[0.13636363636363635,0.3333333333333333],"distRoadCook0":[0.2857142857142857,0.3333333333333333],"distRoadCook1":[0.40909090909090906,0.21874999999999997],"distRoadLight0":[0.7674418604651162,0.6551724137931034],"distRoadLight1":[0.9545454545454546,0.7187500000000001]};

			//~ staticData.hhFEeduMOLightName = ['Mothers/Women hh', 'Fathers/Women hh', 'Mothers/Men hh', 'Fathers/Men hh'];
			//~ staticData.hhFEeduMOLightCopy = "Parents education can also effect children's decisions.  Most promisingly, <b><span class='highlight0'>female heads</span> of household with p6 educated mothers are at least <span class='highlight0'>29% more likely to choose grid electricity</span></b> than all other combinations.  <span class='highlight3'>A similar but deminished effect can be seen for males with educated fathers.</span>";
			//~ staticData.hhMAeduCookName = ['No education', 'P6 educated'];
			//~ staticData.hhMAeduCookCopy = "When choosing cooking fuels, <span class='highlight1'>male</span> head of households show a <b><span class='highlight1'>5% reduced preference</span> for kerosene when their mothers have finished a P6 level</b> versus mothers with no education.";
			//~ staticData.hhBo10kRoadName = ['Women', 'Men'];
			//~ staticData.hhBo10kRoadCopy = "<h2>What is the state of electricity access by gender 10km from the nearest road?</h2><br>At <b><span class='highlight0 highlight2'>0-10km</span> from the nearest road, <span class='highlight0 highlight2'>women show 7% greater access</span>  to electric lighting</b> versus men.";
			
			//~ staticData.hhBo30kRoadName = ['Women', 'Men'];
			//~ staticData.hhBo30kRoadCopy = "<h2>What is the state of electricity access by gender 30km from the nearest road?</h2><br>At <b><span class='highlight0 highlight2'>20-30km</span> from the nearest road, <span class='highlight0 highlight2'>women show 5% greater access</span>  to electric lighting</b> versus men.";
			
			//~ staticData.hhBoDistRoadName = ['10km/Women hh', '20km/Women hh', '30km/Women hh ', '10km/Men hh', '20km/Men hh', '30Km/Men hh '];
			//~ staticData.hhBoDistRoadCopy = "<h2>What does access to electricity look like 10km from the nearest road?</h2><br>At <b><span class='highlight0 highlight2'>0-10km and 20-30km</span> from the nearest road, <span class='highlight0 highlight2'>women show a 7% and 5% greater preference</span> respectively for electric lighting</b> versus men. That said, between <span class='highlight1 highlight4'>10-20km the genders are in rough parity</span>.";
			
			//~ staticData.hhBoDistPopName = [
															//~ 'Wood/Men hh', 
															//~ 'Wood/Women hh',
														  //~ 'Coal/Men hh', 
															//~ 'Coal/Women hh', 
															//~ 'Kerosene/Men hh', 
															//~ 'Kerosene/Women hh'];
			//~ staticData.hhBoDistPopCopy = "<h2>What does kerosene usage look like 25km outside of a population center?</h2><br>When greater than <b>25km from a population center </b><span class='highlight0 highlight1 highlight2 highlight3'>coal and purchased wood usage remain in parity</span> between genders, <b class='highlight5'>kerosene however, is 8% less frequently chosen by women</b> than men."

			//~ staticData.hhBo30kPopName = ['Women', 'Men'];
			//~ staticData.hhBo30kPopCopy = "<h2>What is the state of electricity access by gender 30km from a population center?</h2><br>At <b><span class='highlight0 highlight2'>20-30km</span> from the nearest road, <span class='highlight0 highlight2'>women show 5% greater access</span>  to electric lighting</b> versus men.";

			//~ staticData.hhBo45kPopName = ['Women', 'Men'];
			//~ staticData.hhBo45kPopCopy = "<h2>What is the state of electricity access by gender 45km from a population center?</h2><br>At <b><span class='highlight0 highlight2'>20-30km</span> from the nearest road, <span class='highlight0 highlight2'>women show 5% greater access</span>  to electric lighting</b> versus men.";
			
			staticData.mapCopy = "<h2>Across the country what does electricity access look like?</h2><br>According to the Nigerian Demographic and Health Survey (2013) the <b>percentage of electrified homes varies widely by state</b>. By gender, the World Bank\'s LSMS (2016) reports an average of <b>61% of the female headed households</b> and <b>50% of male headed households</b> being electrified.";
			
			staticData.eConnCopy = "<h2>Across the country what does electricity access look like?</h2><br>Of the total head of household respondents to the World Bank\'s 2016 <b>Living Standards Measurement Study</b> (LSMS), <b>917 were female</b> and <b>3694 were male</b>. Of the respondents <b class='highlight0'>61% of the women</b> versus <b class='highlight1'>50% of men</b>  <b class='highlight0 highlight1'>reported having a grid electrical connection</b>. <br><span class='highlight0 highlight1 summation'>The residual</span><span class='highlight0 summation'> 39%</span> and <span class='highlight1 summation'> 50%</span> <span class='highlight0 highlight1 summation'>of women</span> in female and male headed households respectively <span class='highlight0 highlight1 summation'>remain at risk</span>.";
			staticData.distPopCook1Copy = "<h2>Who uses electricity for cooking 15-30km from a population center?</h2><br>At this distance, <b><span class='highlight0'>13% of women</span> head of household respondents vs. <span class='highlight1'>33% of men</span> <span class='highlight0 highlight1'>use electric cooking units</span></b>.<br><span class='highlight0 highlight1 summation'>The residual</span><span class='highlight0 summation'> 87%</span> and <span class='highlight1 summation'> 67%</span> <span class='highlight0 highlight1 summation'>of women</span> in female and male headed households respectively <span class='highlight0 highlight1 summation'>remain at risk</span>.";
			staticData.distRoadCook0Copy = "<h2>Who uses electricity for cooking within 10km from the nearest road?</h2><br>At this distance, <b><span class='highlight0'>28% of women</span> head of household respondents vs. <span class='highlight1'>33% of men</span> <span class='highlight0 highlight1'>use electric cooking units</span></b>.<br><span class='highlight0 highlight1 summation'>The residual</span><span class='highlight0 summation'> 72%</span> and <span class='highlight1 summation'> 67%</span> <span class='highlight0 highlight1 summation'>of women</span> in female and male headed households respectively <span class='highlight0 highlight1 summation'>remain at risk</span>.";
			staticData.distRoadCook1Copy = "<h2>Who uses electricity for cooking 10-20km from the nearest road?</h2><br>At this distance, <b><span class='highlight0'>40% of women</span> head of household respondents vs. <span class='highlight1'>21% of men</span> <span class='highlight0 highlight1'>use electric cooking units</span></b>.<br><span class='highlight0 highlight1 summation'>The residual</span><span class='highlight0 summation'> 60%</span> and <span class='highlight1 summation'> 79%</span> <span class='highlight0 highlight1 summation'>of women</span> in female and male headed households respectively <span class='highlight0 highlight1 summation'>remain at risk</span>.";
			staticData.distRoadLight0Copy = "<h2>Who uses electricity for lighting within 10km from the nearest road?</h2><br>At this distance, <b><span class='highlight0'>76% of women</span> head of household respondents vs. <span class='highlight1'>65% of men</span> <span class='highlight0 highlight1'>use electric cooking units</span></b>.<br><span class='highlight0 highlight1 summation'>The residual</span><span class='highlight0 summation'> 24%</span> and <span class='highlight1 summation'> 35%</span> <span class='highlight0 highlight1 summation'>of women</span> in female and male headed households respectively <span class='highlight0 highlight1 summation'>remain at risk</span>.";
			staticData.distRoadLight1Copy = "<h2>Who uses electricity for lighting 10-20km from a the nearest road?</h2><br>At this distance, a near total complete uptake of <b><span class='highlight0'>95% of women</span> head of household respondents vs. 24% less, that is,<span class='highlight1'> 71% of men</span> <span class='highlight0 highlight1'>use electric lighting</span></b>.<br><span class='highlight0 highlight1 summation'>The residual</span><span class='highlight0 summation'> 5%</span> and <span class='highlight1 summation'> 29%</span> <span class='highlight0 highlight1 summation'>of women</span> in female and male headed households respectively <span class='highlight0 highlight1 summation'>remain at risk</span>.";

			staticData.dnutData = [
				// ["eConn", data.nigeriaF.eConnData, ["Women","Men"], [0,3], staticData.eConnCopy],
				//~ ["#lightEdu", data.nigeriaF.hhFEeduMOLightData, staticData.hhFEeduMOLightName, [0,1,3,2]],
				//~ ["#cookEduMo", data.nigeriaF.hhMAeduCookData, staticData.hhMAeduCookName, [2,0]],
				//~ ["light10kRoad", data.nigeriaF.hhBo10kRoadData, staticData.hhBo10kRoadName, [0,3], staticData.hhBo10kRoadCopy],
				//~ ["light30kRoad", data.nigeriaF.hhBo30kRoadData, staticData.hhBo30kRoadName, [0,3], staticData.hhBo30kRoadCopy],
				//~ ["light30kPop", data.nigeriaF.hhBo30kPopData, staticData.hhBo30kPopName, [3,0], staticData.hhBo30kPopCopy],
				//~ ["light45kPop", data.nigeriaF.hhBo45kPopData, staticData.hhBo45kPopName, [3,0], staticData.hhBo45kPopCopy],
				//~ ["cookDistPop", data.nigeriaF.hhBoDistPopData, staticData.hhBoDistPopName, [4,4,3,3,2,0], staticData.hhBoDistPopCopy]
				["distPopCook1", data.nigeriaF.distPopCook1, ["Women","Men"], [3,0], staticData.distPopCook1Copy],
				["distRoadCook0", data.nigeriaF.distRoadCook0, ["Women","Men"], [3,0], staticData.distRoadCook0Copy],
				["distRoadCook1", data.nigeriaF.distRoadCook1, ["Women","Men"], [0,3], staticData.distRoadCook1Copy],
				["distRoadLight0", data.nigeriaF.distRoadLight0, ["Women","Men"], [0,3], staticData.distRoadLight0Copy],
				["distRoadLight1", data.nigeriaF.distRoadLight1, ["Women","Men"], [0,3], staticData.distRoadLight1Copy]
			];
			
			staticData['dnutPearlNames'] = ['Overall', "Infrastructure 0", "Infrastructure 1", "Infrastructure 2", "Infrastructure 3", "Infrastructure 4"];

			staticData['electricityByState'] = {"North Central":"48.7","FCT-Abuja":"77.7", "Federal Capital Territory":"77.7","Benue":"22.1","Kogi":"62.9","Kwara":"90.6","Nassarawa":"33.2","Niger":"51.7","Plateau":"36.3","North East":"29.3","Adamawa":"37.6","Bauchi":"29.3","Borno":"33.0","Gombe":"48.1","Taraba":"10.9","Yobe":"18.1","North West":"42.2","Jigawa":"26.0","Kaduna":"53.5","Kano":"52.1","Katsina":"31.3","Kebbi":"44.4","Sokoto":"38.9","Zamfara":"29.1","South East":"66.4","Abia":"81.7","Anambra":"88.1","Ebonyi":"39.2","Enugu":"55.4","Imo":"69.9","South South":"68.3","Akwa Ibom":"68.0","Bayelsa":"52.5","Cross River":"57.4","Delta":"78.3","Edo":"82.4","Rivers":"65.1","South West":"81.1","Ekiti":"92.7","Lagos":"99.3","Ogun":"72.0","Ondo":"66.3","Osun":"89.4","Oyo":"66.6"};
	}
}

function processData(e, data0, data1, data2, data3) {
	// console.log(data1, data2, data3);
	
	var data0f = data0.filter((e) => { // head of households==Y
		return e.s1q3 == 1;
	});
		
	data0f.forEach(function(d) {
		row = {};
		
		pk = d.hhid;
		
		// No hhid key in this file
	  //~ var data1f = data1.find(function(e) {
	    //~ return e.hhid === pk;
		  //~ });		
		
	  var data2f = data2.find(function(e) {
	    return e.hhid === pk;
		  });
		  
		var data3f = data3.find(function(e) {
	    return e.hhid === pk;
		  });  
		  
		row.gender 		= d.s1q2=="1"?'m':'f';
		row.maxEduFa 	= d.s1q22;
		row.maxEduMo 	= d.s1q27;
		
		// row.maxEduYou	= data1f.c1q6;
		
		row.srcLight 	= data2f.s11q10
		row.srcCook 	= data2f.s11q11
		row.colFireW 	= data2f.s11q12 =="1"?true:false;
		row.eConn 		= data2f.s11q17b=="1"?true:false;
		row.generator = data2f.s11q28b=="1"?true:false;
		row.sPanel 		= data2f.s11q28f=="1"?true:false;
		
		row.dRoad = data3f.dist_road2
		row.dPopc = data3f.dist_popcenter2
		row.dMark = data3f.dist_market
		
		data.nigeria.push(row);
	});
	
	dn  = data.nigeria;		// 'raw'
	dnf = data.nigeriaF;  // Filtered Results
	
	// GENERAL
	dnf.HeadW = dn.filter((e) => {return e.gender=='f'}).length;
	dnf.HeadM = dn.filter((e) => {return e.gender=='m'}).length;
	
	// VIS 1
		
	// clean lighting
	//~ wl = dn.filter((e) => {return e.gender=='f' && (e.srcLight == 5 || e.srcLight == 6 || e.srcLight == 8)}).length
	//~ ml = dn.filter((e) => {return e.gender=='m' && (e.srcLight == 5 || e.srcLight == 6 || e.srcLight == 8)}).length
	
	// clean fuel
	//~ wc = dn.filter((e) => {return e.gender=='f' && (e.srcCook == 6 || e.srcCook == 7)}).length
	//~ mc = dn.filter((e) => {return e.gender=='m' && (e.srcCook == 6 || e.srcCook == 7)}).length
	
	// Solar - USELESS
	//~ dnf.solarW = dn.filter((e) => {return e.gender=='f' && e.sPanel}).length;		// raw women having solar
	//~ dnf.solarM = dn.filter((e) => {return e.gender=='m' && e.sPanel}).length;
	
	// Solar Percent - USELESS
	//~ dnf.solarPcW = dnf.solarW/dnf.HeadW;	// percent women having solar
	//~ dnf.solarPcM = dnf.solarM/dnf.HeadM;
	
	// Connection to grid - WOMEN HAVE MORE UPTAKE Percentwise
	we = dn.filter((e) => {return e.gender=='f' && e.eConn}).length
	me = dn.filter((e) => {return e.gender=='m' && e.eConn}).length
	
	// Connection to grid Percent
	dnf.eConnData = [we/dnf.HeadW, me/dnf.HeadM];
	
	// TAKEAWAY = public grid uptake tracks w gender
	console.log("percent elect w vs m", dnf.eConnW, dnf.eConnM);
	//~ console.log("percent solar w vs m", ws/w, ms/m);
	//~ console.log("e lighting src w vs m", wl/w, ml/m);
	//~ console.log("e cooking src  w vs m", wc/w, mc/m);

	// VIS 2
	transEdu = [0,1,2,-1,-1,-1,-1,-1,-1,-1,-1, // translation table for sparse edu #s
							3,4,5,6,7,8,-1,-1,-1,-1,
							9,10,11,12,13,14,15,16,-1,-1,
							17,18,19,20,-1,-1,-1,-1,-1,-1,
							21,22,23,-1,-1,-1,-1,-1,-1,-1,
							24,25,-1,-1,-1,-1,-1,-1,-1,-1,
							26];
	edu = {"0": "NONE", "1": "N1", "2": "N2", 
				"11": "P1", "12": "P2", "13": "P3", "14": "P4", "15": "P5", "16": "P6", 
				"21": "JS1", "22": "JS2", "23": "JS3", "24": "SS1", "25": "SS2", "26": "SS3", "27": "LOWER 6", "28": "UPPER 6", 
				"31": "TEACHER TRAINING", "32": "VOCATIONAL/TECHNICAL ", "33": "MODERN SCHOOL", "34": "NCE", 
				"41": "POLY/PROF", "42": "1ST DEGREE", "43": "HIGHER DEGREE", 
				"51": "QUARANIC", "51": "INTEGRATED QUARANIC",
				"61": "ADULT EDUCATION"};
	lFuel = ['COLLECTED FIREWOOD', 'PURCHASED FIREWOOD' , 'GRASS ', 'KEROSENE', 'ELECTRICITY/PHCN', 'GENERATOR', 'GAS', 'BATTERY', 'CANDLES', 'OTHER'];
	cFuel = ['COLLECTED FIREWOOD', 'PURCHASED FIREWOOD' , 'Coal', 'GRASS ', 'KEROSENE', 'ELECTRICITY/PHCN', 'GENERATOR', 'GAS', 'OTHER'];

	// gender fuel-use / edu map
	function genFuelEduMap(obj0, obj1, gen, person, purpose) {
		var fuel = [];
		obj0.forEach((d,i) => { // gender fuel-light education
			fuel[i] = [];
			Object.keys(obj1).forEach((d,j) => {  // get keys from edu 
				if (transEdu[d] == -1) console.log(d);
				fuel[i][transEdu[d]] = dn.filter((e) => {return e.gender==gen && e[purpose] == i && e[person] == d}).length;
				});
			});
		return fuel;
	}
	
	var tmpD;
	
	// LIGHTING - Ex thhFEduMC == total respondents for female head of household - fathers edu / lighting fuel
	tmpD = genFuelEduMap(lFuel, edu, 'f', 'maxEduMo', 'srcLight'); 
	insVDR('hhf-eduMo-Light', tmpD);
	
	tmpD = genFuelEduMap(lFuel, edu, 'm', 'maxEduMo', 'srcLight')
	insVDR('hhm-eduMo-Light', tmpD);
	
	tmpD = genFuelEduMap(lFuel, edu, 'f', 'maxEduFa', 'srcLight');
	insVDR('hhf-eduFa-Light', tmpD);
	
	tmpD = genFuelEduMap(lFuel, edu, 'm', 'maxEduFa', 'srcLight');
	insVDR('hhm-eduFa-Light', tmpD);
	
	dnf.hhFEeduMOLightData = [
		_.sum(vDataRepo['hhf-eduMo-Light'][5].slice(8)),
		_.sum(vDataRepo['hhf-eduFa-Light'][5].slice(8)),
		_.sum(vDataRepo['hhm-eduMo-Light'][5].slice(8)),
		_.sum(vDataRepo['hhm-eduFa-Light'][5].slice(8))
		];

	// TAKEAWAY = Mothers edu tracks with grid uptake for lighting, no story w Dad Edu
	//~ console.log(dnf.genEdu.thhFeduML, dnf.genEdu.hhFeduML, dnf.genEdu.thhMeduML, dnf.genEdu.hhMeduML, 
							//~ dnf.genEdu.thhFeduFL, dnf.genEdu.hhFeduFL, dnf.genEdu.thhMeduFL, dnf.genEdu.hhMeduFL);
	
	// COOKING - Ex thhFEduMC == total respondents for female head of household - fathers edu / cooking fuel
	tmpD = genFuelEduMap(lFuel, edu, 'f', 'maxEduMo', 'srcCook'); 
	insVDR('hhf-eduMo-Cook', tmpD);

	tmpD = genFuelEduMap(lFuel, edu, 'm', 'maxEduMo', 'srcCook');
	insVDR('hhm-eduMo-Cook', tmpD);

	tmpD = genFuelEduMap(lFuel, edu, 'f', 'maxEduFa', 'srcCook');
	insVDR('hhf-eduFa-Cook', tmpD);

	tmpD = genFuelEduMap(lFuel, edu, 'm', 'maxEduFa', 'srcCook');
	insVDR('hhm-eduFa-Cook', tmpD);
	
	// Dad and mom data
	//~ dnf.hhMAeduCookData = [
		//~ vDataRepo['hhm-eduMo-Cook'][5][0],
		//~ vDataRepo['hhm-eduMo-Cook'][5][8],
		//~ vDataRepo['hhm-eduFa-Cook'][5][0],
		//~ vDataRepo['hhm-eduFa-Cook'][5][8]
		//~ ];
	//~ dnf.hhMAeduCookName = ['Men with less educated Mothers', 'Men with more educated Mothers', 'Men with less educated Fathers', 'Men with more educated Fathers'];
	//~ dnf.hhMAeduCookCopy = "When choosing cooking fuels, male head of households in particular show a preference for kerosene when their mothers have no formal education fathers having no formal education.  A smaller reverse effect exists when parents are educated at the P6 level";
	
	// only mom
	dnf.hhMAeduCookData = [
		vDataRepo['hhm-eduMo-Cook'][5][0],
		vDataRepo['hhm-eduMo-Cook'][5][8]
		];

	// Takeaway = Women hh are especially negatively affected by low dad edu when chosing cooking fuel
	//~ console.log(dnf.genEdu.thhFeduMC, dnf.genEdu.hhFeduMC, dnf.genEdu.thhMeduMC, dnf.genEdu.hhMeduMC, 
							//~ dnf.genEdu.thhFeduFC, dnf.genEdu.hhFeduFC, dnf.genEdu.thhMeduFC, dnf.genEdu.hhMeduFC);
			
	// VIS 3
	// gender fuel-use / distance  map
	function genFuelDistMap(obj0, obj1, gen, dist, purpose, quanta) {
		var fuel = [];
		obj0.forEach((d,i) => { // gender fuel-light education
			fuel[i] = [];
			obj1.forEach((d,j) => {  
				fuel[i][d] = dn.filter((e) => {return e.gender==gen && e[purpose] == i && e[dist] == (d%quanta)}).length;
				});
			});
		return fuel;
	}	
	
	// LIGHTING USAGE
	// NEAREST ROAD - Max: 68km
	quantaRoad = 10; // km
	rangeRoad = [...Array(10).keys()];
	
	tmpD = genFuelDistMap(lFuel, rangeRoad, 'f', 'dRoad', 'srcLight', quantaRoad);
	insVDR('hhf-DistRoad-Light', tmpD);
	
	tmpD = genFuelDistMap(lFuel, rangeRoad, 'm', 'dRoad', 'srcLight', quantaRoad);
	insVDR('hhm-DistRoad-Light', tmpD);
	
	// NEAREST POPCENTER - Max: 131km
	quantaPopc = 15; // km
	rangePopc = [...Array(10).keys()];
	
	tmpD = genFuelDistMap(lFuel, rangePopc, 'f', 'dPopc', 'srcLight', quantaPopc);
	insVDR('hhf-DistPop-Light', tmpD);
	
	tmpD = genFuelDistMap(lFuel, rangePopc, 'm', 'dPopc', 'srcLight', quantaPopc);
	insVDR('hhm-DistPop-Light', tmpD);
	
	dnf.hhBo30kPopData = [
	  vDataRepo['hhf-DistPop-Light'][5][1],
	  vDataRepo['hhm-DistPop-Light'][5][1]
	];
	
	dnf.hhBo45kPopData = [
	  vDataRepo['hhf-DistPop-Light'][5][2],
	  vDataRepo['hhm-DistPop-Light'][5][2]
	];
	
	// NEAREST MARKET - Max: 214km
	quantaMark = 25; // km
	rangeMark = [...Array(10).keys()];
	
	tmpD = genFuelDistMap(lFuel, rangeMark, 'f', 'dMark', 'srcLight', quantaMark);
	insVDR('hhf-DistMark-Light', tmpD);
	
	tmpD = genFuelDistMap(lFuel, rangeMark, 'm', 'dMark', 'srcLight', quantaMark);
	insVDR('hhm-DistMark-Light', tmpD);
	
	//~ dnf.hhBoDistRoadData = [
		//~ vDataRepo['hhf-DistRoad-Light'][5][0],
		//~ vDataRepo['hhf-DistRoad-Light'][5][1],
		//~ vDataRepo['hhf-DistRoad-Light'][5][2],
		//~ vDataRepo['hhm-DistRoad-Light'][5][0],
		//~ vDataRepo['hhm-DistRoad-Light'][5][1],
		//~ vDataRepo['hhm-DistRoad-Light'][5][2]
		//~ ];
		
	dnf.hhBo10kRoadData = [
		vDataRepo['hhf-DistRoad-Light'][5][0],
		vDataRepo['hhm-DistRoad-Light'][5][0]
		];	
		
	dnf.hhBo30kRoadData = [
		vDataRepo['hhf-DistRoad-Light'][5][2],
		vDataRepo['hhm-DistRoad-Light'][5][2]
		];
				
	// COOKING USAGE
	// NEAREST ROAD - Max: 68km
	tmpD = genFuelDistMap(lFuel, rangeRoad, 'f', 'dRoad', 'srcCook', quantaRoad);
	insVDR('hhf-DistRoad-Cook', tmpD);

	tmpD = genFuelDistMap(lFuel, rangeRoad, 'm', 'dRoad', 'srcCook', quantaRoad);
	insVDR('hhm-DistRoad-Cook', tmpD);

	// NEAREST POPCENTER - Max: 131km
	tmpD = genFuelDistMap(lFuel, rangePopc, 'f', 'dPopc', 'srcCook', quantaPopc);
	insVDR('hhf-DistPop-Cook', tmpD);

	tmpD = genFuelDistMap(lFuel, rangePopc, 'm', 'dPopc', 'srcCook', quantaPopc);
	insVDR('hhm-DistPop-Cook', tmpD);

	// NEAREST MARKET - Max: 214km
	tmpD = genFuelDistMap(lFuel, rangeMark, 'f', 'dMark', 'srcCook', quantaMark);
	insVDR('hhm-DistMark-Light', tmpD);
	
	tmpD = genFuelDistMap(lFuel, rangeMark, 'm', 'dMark', 'srcCook', quantaMark);	
	insVDR('hhm-DistMark-Light', tmpD);
	

	
	dnf.hhBoDistPopData = [
		vDataRepo['hhm-DistPop-Cook'][1][1],
		vDataRepo['hhf-DistPop-Cook'][1][1],
		vDataRepo['hhm-DistPop-Cook'][2][1],
		vDataRepo['hhf-DistPop-Cook'][2][1],
		vDataRepo['hhm-DistPop-Cook'][5][1],
		vDataRepo['hhf-DistPop-Cook'][5][1]
		];
	
	// rev 2 metrics
	dnf.distPopCook1 = getColPcnt([vDataRepo['hhf-DistPop-Cook'], vDataRepo['hhm-DistPop-Cook']], 1, false);
	dnf.distRoadCook0 = getColPcnt([vDataRepo['hhf-DistRoad-Cook'], vDataRepo['hhm-DistRoad-Cook']], 0, false);
	dnf.distRoadCook1 = getColPcnt([vDataRepo['hhf-DistRoad-Cook'], vDataRepo['hhm-DistRoad-Cook']], 1, false);
	dnf.distRoadLight0 = getColPcnt([vDataRepo['hhf-DistRoad-Light'], vDataRepo['hhm-DistRoad-Light']], 0, true);
	dnf.distRoadLight1 = getColPcnt([vDataRepo['hhf-DistRoad-Light'], vDataRepo['hhm-DistRoad-Light']], 1, true);
	
	// write data structure to window
	$('body').html('<xmp>' + JSON.stringify(dnf) + '</xmp>');
	
}
