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
			data.nigeriaF = {"HeadW":917,"HeadM":3694,"eConnData":[0.6194111232279171,0.5043313481321061],"eConnName":["Women","Men"],"hhFEeduMOLightData":[0.5700000000000001,0.28,0.13,0.17],"hhFEeduMOLightName":["Women with educated Mothers","Women with educated Fathers","Men with educated Mothers","Men with educated Fathers"],"hhFEeduMOLightCopy":"Biological parents education also suggests opportunities when their children become head of their own households. In particular female heads of household choosing grid electricity are most affected by mothers when they have at least a grade XXX or higher. A similar but deminished effect can be seen for males."}
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
	dnf.eConnName = ['Women', 'Men'];

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
	dnf.hhFEeduMOLightName = ['Women with educated Mothers', 'Women with educated Fathers', 'Men with educated Mothers', 'Men with educated Fathers'];
	dnf.hhFEeduMOLightCopy = "Biological parents education also suggests opportunities when their children become head of their own households.  In particular female heads of household choosing grid electricity are most affected by mothers when they have at least a P6 or higher education.  A similar but deminished effect can be seen for males with educated fathers.";

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
	
	// NEAREST MARKET - Max: 214km
	quantaMark = 25; // km
	rangeMark = [...Array(10).keys()];
	
	tmpD = genFuelDistMap(lFuel, rangeMark, 'f', 'dMark', 'srcLight', quantaMark);
	insVDR('hhf-DistMark-Light', tmpD);
	
	tmpD = genFuelDistMap(lFuel, rangeMark, 'm', 'dMark', 'srcLight', quantaMark);
	insVDR('hhm-DistMark-Light', tmpD);
		
		
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
	
	// write data structure to window
	$('body').html(JSON.stringify(dnf));
	
}
