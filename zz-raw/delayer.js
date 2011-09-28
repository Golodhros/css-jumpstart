	wait: function(msecs){
		var start = new Date().getTime();
		var cur = start
		while(cur - start < msecs){
			cur = new Date().getTime();
		}
	}, 