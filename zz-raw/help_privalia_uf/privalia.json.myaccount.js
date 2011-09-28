/**
 * common/privalia.json.myaccount.js
 * =========================================
 * @requieres: 	00-protoaculous.1.8.3.min.js, privalia.json.js
 * @revision: 	1.0		
 * @modified: 	Marcos	(26-04-10)
 */
var PrivaliaJsonMyaccount = Class.create(PrivaliaJson, {
	initialize: function($super) {
		$super();
		
		this.errId =				'23';
		this.statusVouchers =		[];
		this.statusTitle =			[];
		this.statusText =			[];
		this.returnStatusTitle =	[];
		this.returnStatusText =		[];
		
		/**
		 * TODO: hace falta controlar mejor el num. de estado de pedido en el que se encuentra
		 * para ocultar/mostrar determinados botones segun el numero del status_PK 
		 */
		this.status_PK =		'';
		
		this.statusReturn 		= 	'80'; // devuelto
		this.statusCancel		=	'95'; // cancelado
		this.statusDelivered 	= 	'90'; // entregado
		this.statusLost 		=	'70/75'; // perdido
		this.statusInSharing 	= 	'30'; // en reparto
		this.statusOutStock 	= 	'50'; // sin existencias
		this.statusInStock 		= 	'28'; // en almacen
		this.statusOutSupplier	= 	'20'; // pendiente de proveedor
		
	},
	
	/**
	 * Construye la pagina con los datos pasados por json previamente
	 */
	buildPage: function(generate) {
		switch(generate) {
			case 'ejemplo':			
				this._generateEjemplo(); 
				break;
				
			case 'vouchers':
				this._generateTableVouchers(); 
				break;
				
			case 'order_status':	
				this._generateTrackingList();
				var order_PK = this.getOrderPK();
				$('order').value = order_PK;
				var status_PK = this.getStatusPK();
				this.setStatusOrder(status_PK); 	/*Dependiendo del estado en el que se encuentre el pedido se oculta/muestra btn */
				
				Cufon.replace('.track'); 
				break;
			
			case 'view':
				this.generateHtml({
					pushData: this.pushViewReturn
				});
				break;
				
			default: 				this.generateBasic();
		}
	},

	/** mostrar boton cambiar talla en la modal */
	enableBtnChangeSize: function (){
		$('btnCambiar').removeClassName('hidden');
	},
	
	/** mostrar combo cambiar talla en la modal */
	enableComboChangeSize: function (item){
		console.log(item.className);
		var combo = "combo_" + item.className;
		$().removeClassName('hidden');
	},
	
	/** deshabilitar editar direccion   */
	disableAddressEdit: function (){
		$('address-edit').addClassName('disableButton');
	},
	
	/** deshabilitar cambiar talla	 */
	disableChangeSize: function (){
		$('change-size').addClassName('disableButton');
	},
	
	/** deshabilitar anyadir productos	 */
	disableOrderExpand: function (){
		$('order-expand').addClassName('disableButton');
	},

	getOrderPK: function () {
		return this.getResData().order_data.order_PK;
	},
	
	/**
	 * Obtener numero de estado del tracking de pedido
	 */
	getStatusPK: function () {
		return this.getResData().order_status.ordstatus_PK;
	},
	
	/**
	 * Obtener detalles de pedido en modal de cambiar talla (volcado recuperando datos ya cargados)
	 */
	getSizeChangeInfo: function () {
		var built = '';
		var html = '';
		var obj = '';
		
		//Obtengo los datos de las variables
		obj = this.getResData().order_products;
console.log(obj);
		
		//recupero el html a rellenar y creo el template
		html = $('order_products2').innerHTML;
		var tpl = new Template(html);


		//vamos sustituyendo las variables dentro del template
		obj.each(function(item){
options = this.feedSelectSize(item.prodf_availables, item.ordline_FK_stockp_PK);
item.select_ordline_sizes = '<select id="combo_' + item.ordline_PK + '" name="ordline_size" onchange="Data.changeSize(' + item.ordline_PK + ', this)">' + options + '</select>';
			built += tpl.evaluate(item);
		}, this);
		
		// Nos guardamos el stock (talla) y su cantidad. Lo necesitaremos despues para controlar y generar los combos de cantidades.
		//this.setSizesOrderLines(dataJson.ordline_FK_stockp_PK, dataJson.ordline_quantityOrdered);
		
		
		//actualizamos el aspecto del bloque en la web
		$('order_products2').update(built);
		
	},
	
	
	/** oculta botones cancelar pedido */
	hideButtonInvoice: function (){
		$('btnInvoiceOrder').hide();
	},
	
	/** oculta botones cancelar pedido */
	hideButtonOrder: function (){
		$('btnCancelOrder').hide();
	},
	
	
	/**
	 * Personalización del volcado para eliminar líneas punteadas en viewreturn
	 */
	pushViewReturn: function (dataJson, index) {
		var target = this.getTarget();
		
		if(target == "waybill_lines") {
			/*	
			 * To do: Eliminar última línea de la enumeración de los productos
			console.log(this);
			if(dataJson.length() == index){
				dataJson.stripes = "no-stripe";
			}*/
		}
		
		if(target == "waybill_delivery"){
			dataJson.waydel_preferred_collection_time = this.getCollectionTime(dataJson.waydel_preferred_collection_time);
		}
		if(target == "order_status") {	
			//asignamos valores por defecto a los estados de devolucion
			this.vDataJson[i].cancelled-open-title	= this.returnStatusTitle[0];
			this.vDataJson[i].tracking_text  		= this.returnStatusText[0];
										
			// asignamos un estado de pedido según el tracking recibido por json							
			if(this.vDataJson[i].ordstatus_tracking == "1"){
				this.vDataJson[i].opencampaign_text = this.returnStatusTitle[1];
				this.vDataJson[i].tracking_text  	 = this.returnStatusText[3];
			}	
			if(this.vDataJson[i].ordstatus_tracking == "2"){
				this.vDataJson[i].tracking_text  	= this.returnStatusText[1];
			}
			if(this.vDataJson[i].ordstatus_tracking == "3"){
				this.vDataJson[i].tracking_text  	= this.returnStatusText[2];
			}							
		}
		// sumo datos a volcar
		this.addBuilt(dataJson);
	},

	
	/**
	 * TODO: falta mejorar el proceso (cambiar if, por swich y case)
	 * dependiendo del estado en el que se encuentre el pedido hará una cosa u otra
	 */
	setStatusOrder: function (status_PK){
		var statusCancel = this.statusCancel;
		if(status_PK==statusCancel) {
			this.disableAddressEdit();
			this.disableChangeSize();
			this.disableOrderExpand();
			this.hideButtonInvoice();
			this.hideButtonOrder();
		}
		/* solo si el estatus pk es mayor o igual a 16 se muestra el btn de cancelar pedido */
		if(status_PK>=16) {
			this.hideButtonOrder();
		}
	},
	
	setStatusVouchersTxt: function(idState, txt) {
		this.statusVouchers[idState] = txt;
	},

	//recogemos el array de copys correspondientes a los textos de los estados de pedido
	setStatusText: function (LT) {
		this.statusText = LT;
	},
	
	/**
	 * Obtiene los textos correspondientes a los estados de las devoluciones
	 */
	setReturnStatusText: function (LT) {
		this.returnStatusText = LT;
	},
	
	//recogemos el array de copys correspondientes a los titulos de los estados de pedido
	setStatusTitle: function (T) {
		this.statusTitle = T;
	},
	
	/**
	 * Obtiene los titulos correspondientes a los estados de las devoluciones
	 */
	setReturnStatusTitle: function (T) {
		this.returnStatusTitle = T;
	},
		
	_generateEjemplo: function() {
		// metodo que genera el html, y es aqui donde aplicaremos la personalizacion del getData()
	},
	
	/**
	 * Obtiene el fragmento de tpl a replicar y vuelca los datos en JSON
	 */
	_generateTableVouchers: function() {
		var built = '';
		var html = '';
		var i = 	0;
		var othis = this;
		
		this.vTargets.each(function(target) {
			try {
				html = ($(target).innerHTML).toString();
			}
			catch(e) {
				if(this.debug) console.log(e);
			}
			
			if(!html.empty()) {
				this._setAsJsoned(target);
				var tpl = new Template(html);
				
				// compruebo si los datos esta en un array de objetos
				if(Object.isArray(this.vDataJson[i])) {
					// Para cada objeto de datos, asigno valores a las variables JS
					this.vDataJson[i].each(function(dataJson) {
						dataJson.voucher_status_txt = this.statusVouchers[dataJson.voucher_status] ;
											
						built += tpl.evaluate(dataJson);
						
						if(this.debug) {
							console.log(target);
							console.log(dataJson);
						}
					}, this);
				}
				// no es un array, es un objeto, lo vuelco directamente a la tpl
				else {
					built = tpl.evaluate(this.vDataJson[i]);
					
					if(this.debug) {
						console.log(target);
						console.log(this.vDataJson[i]);
					}
				}
				
				i++;
				// vuelco al div los datos montados
				$(target).update(built);
				built = '';
			}
			
			html = '';
			
		}, this);
	},
				
	_generateTrackingList: function() {
		var built = '';
		var html = '';
		var i = 	0;
		var othis = this;
					
		if(this.vTargets.length > 0) {
			this.vTargets.each(function(target) {
				try {
					html = ($(target).innerHTML).toString();
				}
				catch(e) {
					if(this.debug) console.log(e);
				}
				
				if(!html.empty()) {
					this._setAsJsoned(target);
					var tpl = new Template(html);
					
					// compruebo si los datos esta en un array de objetos
					if(Object.isArray(this.vDataJson[i])) {
											
						
						// Para cada objeto de datos, asigno valores a las variables JS
						this.vDataJson[i].each(function(dataJson) {
							
							built += tpl.evaluate(dataJson);
							
							if(this.debug) {
								console.log(target);
								console.log(dataJson);
							}
						}, this);
					}
					// no es un array, es un objeto, lo vuelco directamente a la tpl
					else {
																	
						if(target == "order_status") {	
							
							//segun el numero correspondiente al proveedor logistico ocultamos una seccion si se cumple la condicion
							if (this.vDataJson[i].ordstatus_carrier != 3)
							{								
								$$(".pickuppoint")[0].hide();
							}														
							
							//asignamos valores por defecto a los estados de pedido
							this.vDataJson[i].opencampaign_text = this.statusTitle[0];
							this.vDataJson[i].inwarehouse_text  = this.statusTitle[2];
							this.vDataJson[i].ondelivery_text   = this.statusTitle[4];
							this.vDataJson[i].pickuppoint_text  = this.statusTitle[7];
							this.vDataJson[i].tracking_text  	= this.statusText[0];
														
							// asignamos un estado de pedido según el tracking recibido por json							
							if(this.vDataJson[i].ordstatus_tracking == "1-1"){
								this.vDataJson[i].opencampaign_text = this.statusTitle[1];
								this.vDataJson[i].tracking_text  	 = this.statusText[1];
							}	
							if(this.vDataJson[i].ordstatus_tracking == "2"){
								this.vDataJson[i].tracking_text  	= this.statusText[2];
							}
							if(this.vDataJson[i].ordstatus_tracking == "3"){
								this.vDataJson[i].tracking_text  	= this.statusText[3];
							}							
							if(this.vDataJson[i].ordstatus_tracking == "3-1"){
								this.vDataJson[i].inwarehouse_text = this.statusTitle[3];
								this.vDataJson[i].tracking_text  	= this.statusText[4];
							}
							if(this.vDataJson[i].ordstatus_tracking == "4"){
								this.vDataJson[i].tracking_text  	= this.statusText[5];
							}							
							if(this.vDataJson[i].ordstatus_tracking == "4-1"){
								this.vDataJson[i].ondelivery_text = this.statusTitle[5];
								this.vDataJson[i].tracking_text    = this.statusText[6];
							}
							if(this.vDataJson[i].ordstatus_tracking == "4-2"){
								this.vDataJson[i].ondelivery_text = this.statusTitle[6];
								this.vDataJson[i].tracking_text    = this.statusText[7];
							}
							if(this.vDataJson[i].ordstatus_tracking == "6"){
								this.vDataJson[i].tracking_text  	= this.statusText[8];
							}
							if(this.vDataJson[i].ordstatus_tracking == "5-1"){
								this.vDataJson[i].pickuppoint_text = this.statusTitle[8];
								this.vDataJson[i].tracking_text  	= this.statusText[0];
							}
							if(this.vDataJson[i].ordstatus_tracking == "5-2"){
								this.vDataJson[i].pickuppoint_text = this.statusTitle[9];
								this.vDataJson[i].tracking_text  	= this.statusText[0];
							}
							
						}
						
						built = tpl.evaluate(this.vDataJson[i]);
						
						
						if(this.debug) {
							console.log(target);
							console.log(this.vDataJson[i]);
						}
					}
					
					i++;
					// vuelco al div los datos montados
					$(target).update(built);
					built = '';
				}
				
				html = '';
				
			}, this);
		}
	
	}
		
	
	
});