(function($) { 

	// static constructs
	$.lava = $.lava || {version: '0.0.1'};
	
	// defaults & private methods
	$.lava.lavaflow = {
	
		somePrivateMethod: function(str) {
			//do things
		},
	
		conf: {  
			load: true,
			perspective_distance: '700px',
			bezier_x1: 0,
			bezier_y1: 0.7,
			bezier_x2: 0.5,
			bezier_y2: 1.0
		}
	};
	
	//init w/ our funciton...
	$.lava.lavaflow.somePrivateMethod('hey man!');

	function LavaFlow(container, conf){

		//private variables
		var self = this,
			elements = container.children(),
			width = elements.width();	
			
		//API methods
		$.extend(self, {
			load: function() {
				
				//Required styles
				container.css({'width': width, 
											 '-webkit-transform-origin': '50% 50%', 
											 '-webkit-perspective': conf.perspective_distance});

				//TODO: Is there a more efficient way to set this via CSS selector, maybe written to the document?
				//currently, this adds it to each element individually, which won't persist if an element is added dynamically
				elements.css({'position': 'absolute', 
											'left' : '0px', 
											'bottom': '-100px',
											'-webkit-transition': '-webkit-transform 1s cubic-bezier('+conf.bezier_x1+', '+conf.bezier_y1+', '+conf.bezier_x2+', '+conf.bezier_y2+')'});

				//initialize each element
				centerElementIndex = Math.floor(elements.length / 2);
				var n, signOfN, transX, rotY;

				elements.each( function(index, el){ 
					n = index - centerElementIndex;

					if( n == 0 ){
						$(el).css('-webkit-transform', 'none');
					} else {
						signOfN = Math.abs(n)/n;
						transX = (signOfN * (width * .75)) + (n * width * .3);
						rotY = -signOfN * 55;

						trans = 'translate3d('+transX+'px, 10%, -450px) rotateY('+rotY+'deg)';
						$(el).css('-webkit-transform', trans);
					}

				});
									
				return self;
			},
			
			move: function(x){
				//move this sucker!
			},
			
			moveLeft: function(){ self.move(-1); },
			
			moveRight: function(){ self.move(1); }
			
		});
			
		// autoload
		if (conf.load) { self.load(); }
		
	}

	
	// jQuery plugin initialization
	$.fn.lavaflow = function(conf) {   
		
		// already constructed a lavaflow on this guy? Just return the API!
		var el = this.data("lavaflow");
		if (el) { return el; }	  		 
		
		conf = $.extend(true, {}, $.lava.lavaflow.conf, conf);
		
		//For each element called on, create a new LavaFlow (with this config)
		//and store it with the element (so we can grab the API later, see above)
		// [NB this refers to the element(s) .lavaflow was called on...]
		this.each(function() {		
			el = new LavaFlow($(this), conf);
			$(this).data("lavaflow", el);	
		});
		
		return conf.api ? el: this;		
	}; 
	
})(jQuery);
