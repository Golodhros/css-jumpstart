
	/**
	 * Para comprobar si un objeto existe
	 */
	var patata = (typeof(patatin) != 'undefined');
	if(patata){
		//Do something
	}

	/**
	 * Elimina los espacios en blanco que puedan existir
	 * @param {Object} str
	 */
	trim: function(str){ return str.replace(/^\s+|\s+$/g,'') },

	/**
	 * Metodo de cambia extensiones de texto por ... cuando convenga
	 */
	setTruncate: function (numberCharacters){
		var v_textToTruncate = $$('.truncateMe');
		if (v_textToTruncate.length > 0 ){
			v_textToTruncate.each(function(item) {
				var text = item.innerHTML;
				if (text.length > numberCharacters){
					text = text.substring(0, numberCharacters);
					text = text.replace(/\w+$/, '');
					
					text += '<a href="#" ' + 'onclick="this.parentNode.innerHTML=' +
					      'unescape(\''+escape(item.innerHTML)+'\');return false;">' +
					      '...<\/a>';
					
					$(item).update(text);
				}
			});	
		}
	},