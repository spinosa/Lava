(function($) { 

	// static constructs
	$.lava = $.lava || {version: '0.0.1'};
	
	// defaults & private methods
	$.lava.lavacrawl = {
	
		doCrawl: function(crawler, t, finalPosition, transZ) {
			crawler.css({'-webkit-transition': '-webkit-transform '+t+' linear',
									 '-webkit-transform': 'rotateX(45deg) translate3d(0,'+finalPosition+','+transZ+')'});
		},
	
		conf: {  
			load: true,
			auto_crawl: false,
			perspective_distance: '400px',
			trans_z: '300px',
			crawl_t: '60s'
		}
	};

	function LavaCrawl(container, conf){

		//private variables
		var self = this,
			stage = container,
			crawler = stage.children().first();
			
		//API methods
		$.extend(self, {
			load: function() {
				
				//TODO: perspective_distance and trans_z should be based on height on stage
				
				//Setup stage perspective
				stage.css({'overflow': 'hidden',
									 '-webkit-transform-origin': '50% 50%', 
									 '-webkit-perspective': conf.perspective_distance});
				
				//stage needs to be >= 2x crawler width or crawler may get cut off
				stage.width(Math.max(stage.width(), 2*crawler.width()));

				//initiate crawler
				initialY = stage.height()+'px';
				crawler.css({ 'margin-left' : 'auto', 
											'margin-right': 'auto',
											'-webkit-transform': 'rotateX(45deg) translate3d(0,'+initialY+','+conf.trans_z+')'});
									
				return self;
			},
			
			crawl: function(){
				//setTime to make sure crawler is in starting position before animating
				setTimeout( function(){ $.lava.lavacrawl.doCrawl(crawler, conf.crawl_t, '-100%', conf.trans_z) }, 1);
			}
			
		});
			
		// autoload
		if (conf.load) { self.load(); }
		
		// autocrawl
		if (conf.auto_crawl) { self.crawl(); }
		
	}

	
	// jQuery plugin initialization
	$.fn.lavacrawl = function(conf) {   
		
		// already constructed a lavacrawl on this guy? Just return the API!
		var el = this.data("lavacrawl");
		if (el) { return el; }	  		 
		
		conf = $.extend(true, {}, $.lava.lavacrawl.conf, conf);
		
		//For each element called on, create a new LavaCrawl (with this config)
		//and store it with the element (so we can grab the API later, see above)
		// [NB this refers to the element(s) .lavacrawl was called on...]
		this.each(function() {		
			el = new LavaCrawl($(this), conf);
			$(this).data("lavacrawl", el);	
		});
		
		return el;		
	}; 
	
})(jQuery);
