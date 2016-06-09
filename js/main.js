$(document).ready(function () {
	SizeTree.main = new SizeTree.mainProgramm_cl();
});

var SizeTree = {};

SizeTree.mainProgramm_cl = new Class.create({
	initialize: function () {
		this.pieChart();
		this.clickManager();
		
	},
	render_px: function () {

	},
	notify_px: function (self_opl, message_spl, data_apl) {
		switch (message_spl) {
			case 'app':
				switch (data_apl[0]) {
					case 'init':
						SizeTree.tm_o = new APPLIB.TemplateManger_cl();
						var fs = require("fs");
				}
		}
	},
	clickManager: function () {
		$("#menuBar").on("click", ".menuButton", function (event_opl) {
			var action_s = $(event_opl.target).attr("data-action");
			switch (action_s) {
				case 'showTree':
					break;
				case 'showHierachy':
					break;
				case 'exitProgramm':
					var gui = require("nw.gui");
					var win = gui.Window.get();
					win.close(true);
					break;
				case 'startSearch':
					alert("startSearch");
					//var patt_regexp = 
					//var path_s = $("#pathInputText").val();
					//if (patt_regexp.test(path_s)) {
					//	alert("ok");
					//}
					break;
				case 'reloadTree':
					alert("refresh");
					break;
			}
		});
		$("#contentDiv").on("click", "svg", function (event_opl) {
			var action_s = "";
			action_s = $(event_opl.target).attr("data-action");
			if (action_s == undefined) {
				action_s = $(event_opl.target).parent().parent().parent().attr("data-action");
			}
			alert(action_s);
			switch (action_s) {
				case 'resisePieChart':
					alert("PIECHART!");
					break;
			}
		});
	},
	pieChart: function () {
		var width = 300,
			height = 300,
			radius = Math.min(width, height) / 2;

		var color = d3.scale.ordinal()
		.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

		var arc = d3.svg.arc()
			.outerRadius(radius - 10)
			.innerRadius(0);

		var labelArc = d3.svg.arc()
			.outerRadius(radius - 40)
			.innerRadius(radius - 40);

		var pie = d3.layout.pie()
			.sort(null)
			.value(function (d) { return d.population; });

		var svg = d3.select("#pieChart").append("svg")
			.attr("width", width)
			.attr("height", height)
			.attr("data-action", "resisePieChart")
			.attr("id", "pie")
			.style("float", "right")
			.style("background-color", "#c0c0c0")
			.classed("uk-block-secondary", true)
			.append("g")
			.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

		d3.select("#pieChart").append("a")
			.classed("uk-button", true)
			.style("float", "right")
			.append("i")
			.classed("uk-icon-expand", true);

		d3.csv("../data/data.csv", type, function (error, data) {
			if (error) throw error;

			var g = svg.selectAll(".arc")
				.data(pie(data))
				.enter().append("g")
				.attr("class", "arc");

			g.append("path")
				.attr("d", arc)
				.style("fill", function (d) { return color(d.data.age); });

			g.append("text")
				.attr("transform", function (d) { return "translate(" + labelArc.centroid(d) + ")"; })
				.attr("dy", ".35em")
				.text(function (d) { return d.data.age; });
		});

		function type(d) {
			d.population = +d.population;
			return d;
		}
	}
})