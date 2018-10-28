// TABLES
// hhid(int pk)
// sect1_plantingw3.csv:	s1q2(Sex) s1q3(HHH) s1q22(max edu father) s1q26(max edu mother)
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

d3.queue()
	.defer(d3.csv, 'data/sect1_plantingw3.csv')
	.defer(d3.csv, 'data/sect11_plantingw3.csv')
	// .defer(d3.csv, 'data/sectc1_plantingw3.csv')
	.defer(d3.csv, 'data/nga_householdgeovars_y3.csv')
	.await(processData);

function processData(e,data1, data2, data3) {
	// console.log(data1, data2, data3);
	
	var data1f = data1.filter((e) => { // head of households==Y
		return e.s1q3 == 1;
	});
		
	data1f.forEach(function(d) {
		row = {};
		
		pk = d.hhid;
		
	  var data2f = data2.find(function(e) {
	    return e.hhid === pk;
		  });
		  
		var data3f = data3.find(function(e) {
	    return e.hhid === pk;
		  });  
		  
		row.gender 		= d.s1q2=="1"?'m':'f';
		row.maxEduFa 	= d.s1q21;
		row.maxEduMo 	= d.s1q26;
		
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
	
	// console.log(data);
	w = data.nigeria.filter((e) => {return e.gender=='f'}).length
	m = data.nigeria.filter((e) => {return e.gender=='m'}).length
	
	ws = data.nigeria.filter((e) => {return e.gender=='f' && e.eConn}).length
	ms = data.nigeria.filter((e) => {return e.gender=='m' && e.eConn}).length
	
	we = data.nigeria.filter((e) => {return e.gender=='f' && e.sPanel}).length
	me = data.nigeria.filter((e) => {return e.gender=='m' && e.sPanel}).length
	
	wl = data.nigeria.filter((e) => {return e.gender=='f' && (e.srcLight == 5 || e.srcLight == 6 || e.srcLight == 8)}).length
	ml = data.nigeria.filter((e) => {return e.gender=='m' && (e.srcLight == 5 || e.srcLight == 6 || e.srcLight == 8)}).length
	
	wc = data.nigeria.filter((e) => {return e.gender=='f' && (e.srcCook == 6 || e.srcCook == 7)}).length
	mc = data.nigeria.filter((e) => {return e.gender=='m' && (e.srcCook == 6 || e.srcCook == 7)}).length

	console.log("percent elect w vs m", we/w, me/m);
	console.log("percent solar w vs m", ws/w, ms/m);
	console.log("e lighting src w vs m", wl/w, ml/m);
	console.log("e cooking src  w vs m", wc/w, mc/m);

}
