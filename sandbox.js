$(document).ready(function(){
	if (typeof console  != "undefined") {
		if (typeof console.log != 'undefined') {
			console.olog = console.log;	
		} else {
			console.olog = function() {};			
		}
	} 
		 
	console.log = function(message) {
	  console.olog(message);
	  $('#debugDiv').append('<p>' + message + '</p>');
	};
	console.error = console.debug = console.info =  console.log

	var GunModel = Backbone.Model.extend({
		defaults: {
			"max-clip-size": 0, 
		 	"name": "Gun Name", 
		 	"empty": true 
		},
		initialize: function(){
			this.on("all", function(eventName, arg1, arg2, arg3, arg4, arg5){
			    console.log('GunModel: ' + eventName + ' was triggered!');
			}, this);
		},
		toString: function(){					
			return ["This ", this.getName(), " has a maximum of ", this.getMaxClipSize(), " rounds and is currently ", (this.isEmpty() ? "empty." : "loaded.")].join("");
		}			 	
	});

	var GunList = Backbone.Collection.extend({
		model: GunModel,
		initialize: function() {
			this.on("all", function(eventName, arg1, arg2, arg3, arg4, arg5){
			    console.log('GunList: ' + eventName + ' was triggered!');
			}, this);
		},
		toString: function(){					
			_.each( this.models, function( model ){
				console.log(model.toString());
			});
		}
	});

	var GunSafe = Backbone.Model.extend({
		defaults: {
			"contains": "Guns"
		},
		initialize: function() {
			this.guns = new GunList;
		},
		toString: function(){
			console.log("Gun safe containing " + this.getContains());
			this.guns.toString();
		}
	});

	var ppk = new GunModel({
	 	"max-clip-size": 9,
	 	"name": "Walther PPK", 
	 	"empty": false
	});

	var battleRifle = new GunModel({
	 	"max-clip-size": 15,
	 	"name": "Halo Battle Rifle", 
	 	"empty": true
	});

	var colt1911 = new GunModel({
	 	"max-clip-size": 15,
	 	"name": "Colt 1911 .45 ACP", 
	 	"empty": true
	});

	var MyGuns = new GunSafe({"contians":"all my guns"});
	var Pistols = new GunSafe({"contains":"my pistols"});

	MyGuns.guns.add([ ppk, battleRifle, colt1911]);
	Pistols.guns.add([ ppk, colt1911 ]);

	MyGuns.toString();
	Pistols.toString();

	ppk.setEmpty( true );

	MyGuns.guns.add({
	 	"max-clip-size": 11,
	 	"name": "Glock", 
	 	"empty": true
	});
	Pistols.guns.add({},{"virtual_proxy": MyGuns.guns.get("c4")});


	MyGuns.toString();
	Pistols.toString();	
});