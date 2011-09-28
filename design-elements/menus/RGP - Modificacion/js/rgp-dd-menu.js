function mainmenu(){
	//Para estilizar los primeros elementos
	$("#navmenu-h li a").not("#navmenu-h li ul li a").addClass("main-element");
}
 
$(document).ready(function(){					
	mainmenu();
});