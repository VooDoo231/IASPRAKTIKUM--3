var Datenverwaltung={};
var test=0;
Datenverwaltung.index_cl = new Class.create({
	initialize: function(){
		this.render_px(this);
		this.navhandler_px();
		Datenverwaltung.es_o.subscribe_px(this, 'app');
	},
	
	render_px:function(self_opl){
		alert("halllo");
		test=groesse_px("F:");
		alert(test);
	},
	notify_px:function(self_opl,message_spl,data_apl){
		switch(message_spl){
			case 'app':
				switch(data_apl[0]){
					case 'init':
						Datenverwaltung.tm_o = new APPLIB.TemplateManager_cl();
						var fs = require("fs");
						var path_s="F:"
						var fils = fs.readdirSync(path_s);
						var tt=groessearray_px(path_s);
						tt.sort();
						d3.select("#anzeigendiv").selectAll("div").data(fils).enter().append("div").style("width", function(d){
							var gross=groesse_px(path_s+d);
							var t=this;
							if(gross==0){
								
							}
							return (100/test)*gross + "%"; })
							.text(function(d) { return d; });
						$("#anzeigendiv div").addClass("hirachielist");
						break;
				}
		}
	},
	
	navhandler_px:function(){
		$("#idnavlist").on("click","li",function(event_opl){
			$("li").removeClass("uk-active");
			$(event_opl.target.parentElement).addClass("uk-active");
		});
	},
	
});
	var groesse_px=function(path){
			path+="/";
	var fs =require("fs");
	var size=0;
	try{
		if(!fs.statSync(path).isDirectory()){
			size+=fs.statSync(path)["size"];
		}
		else{
	var fils = fs.readdirSync(path);
	
	fils.forEach(function(file){

		if(fs.statSync(path+file).isDirectory()){
			size+=groesse_px(path+file);
		}
		size+=fs.statSync(path+file)["size"];
		});
		}
	}catch(err){
		console.error(err);
	}
	return size;
	}
	var groessearray_px=function(path){
			path+="/";
	var fs =require("fs");
	var size=[];
	try{
		if(!fs.statSync(path).isDirectory()){
			size.push(fs.statSync(path)["size"]);
		}
		else{
	var fils = fs.readdirSync(path);
	
	fils.forEach(function(file){

		if(fs.statSync(path+file).isDirectory()){
			size.push(groessearray_px(path+file));
		}
		size.push(fs.statSync(path+file)["size"]);
		});
		}
	}catch(err){
		console.error(err);
	}
	return size;
	}
$(document).ready(function () {

	Datenverwaltung.es_o = new EventService_cl();
	Datenverwaltung.app_o = new Datenverwaltung.index_cl();

	Datenverwaltung.es_o.publish_px('app', ['init', null]);
});