// todo
// read data
// delete countries for whom data does not exist?
// create region array / color
// make square matrix for data in
// color per intensity
// process
//  organize data by year/country
//	title fade in, title move up, blocks come down, blocks alias into gray l->r, text fades in, text rotates

// from https://gist.github.com/rosszurowski/67f04465c424a9bc0dae
function lerpColor(a, b, amount) { 

    var ah = parseInt(a.replace(/#/g, ''), 16),
        ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
        bh = parseInt(b.replace(/#/g, ''), 16),
        br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);

		var rv = '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
		console.log(rv);
    return (rv);
}

var regions = [{
    'name': 'North America',
    'members': ['Pakistan', 'United States', 'Canada']
}]
const dataPromised = d3.csv("SE4ALLData.csv");
var data = [];

dataPromised.then((d)=>{  // resolve the promises
    data = d
    regionGroup();
    gridPopulate(0);
}
);

function regionGroup() {
    regions.forEach((d,i)=>{
        memberData = [];
        d["members"].forEach((member)=>{
            var line = _.filter(data, (d)=>{
                return d['Country Name'] == member && d['Indicator Name'] == "Access to electricity (% of rural population with access)";
            }
            )
            memberData.push(line[0]);
        }
        )
        regions[i]['member_data'] = memberData;

        var obj = {};
        // order the array by key
        memberData.forEach(c=>Object.keys(c).forEach(function(v) {
            (obj[v] || (obj[v] = [])).push(c[v]);
        }));
        regions[i]['md_by_year'] = obj;
    }
    );
}

var blockSize = 20;
var spaceSize = blockSize + 1;

function gridPopulate(r) {
    var ydata = []; // year data

    for (var idx = 1990; idx <= 2016; idx++)
        // array by year
        ydata.push(regions[r].md_by_year[idx]);

    var svg = d3.select("body").append("svg").attr("width", '100%').attr("height", '100%');

    d3.select("body")
			.data(ydata)
			.enter()
			.append("div").text('asdf')
			.attr('transform', (d,i)=>{
					return 'translate(0,' + spaceSize * i + ')'
			})

    svg.append("g").selectAll("g")
			.data(ydata)
			.enter()
			.append("g")//removing
			.attr('transform', (d,i)=>{
					return 'translate(' + spaceSize * i + ',0)'
			})// Begin setting attributes
    .selectAll("rect")// these
    .data(function(d) {
        return d;
    })//lines
    .enter()//text displays normally

    .append('rect')// Add a rectangles for each 'new' data point

    .transition().duration(1000).attr('fill', (d,i)=>{
        return lerpColor("#FFFFFF", "#FF0000", d*.01);
    }
    )// .attr('x', (d,i) => {return 0 + (i + 10)}) // Begin setting attributes
    .attr('y', function(d, i) {
        // i is an index, 0, 1, 2, 3
        return i * spaceSize;
        // this spaces them out evenly
    }).attr('height', blockSize).attr('width', blockSize)
}
