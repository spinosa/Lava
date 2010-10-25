
function lavaInit(c) {

	var container = $j(c);
	var elements = container.children();
	var width = elements.width();
	
	
	//Required styles
	container.css({'width': width, 
								 '-webkit-transform-origin': '50% 50%', 
								 '-webkit-perspective': '700px'});
	
	//TODO: Is there a more efficient way to set this via CSS selector, maybe written to the document?
	//currently, this adds it to each element individually, which won't persist if an element is added dynamically
	elements.css({'position': 'absolute', 
								'left' : '0px', 
								'bottom': '-100px'});
	
	//initialize each element
	var centerElementIndex = Math.floor(elements.length / 2);
	var n, signOfN, transX, rotY;
	
	elements.each( function(index, el){ 
		n = index - centerElementIndex;
		
		if( n == 0 ){
			$j(el).css('-webkit-transform', 'none');
		} else {
			signOfN = Math.abs(n)/n;
			transX = (signOfN * (width * .75)) + (n * width * .3);
			rotY = -signOfN * 55;
			
			trans = 'translate3d('+transX+'px, 10%, -450px) rotateY('+rotY+'deg)';
			$j(el).css('-webkit-transform', trans);
		}
		
	});
	
}

$j(function(){
	lavaInit( $j("#stage") );
});