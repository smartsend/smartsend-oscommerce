jQuery.cookie = function (key, value, options) {

    // key and at least value given, set cookie...
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);

        if (value === null || value === undefined) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        value = String(value);

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};

function SetFocus() {
  if (document.forms.length > 0) {
    isNotAdminLanguage:
    for (f=0; f<document.forms.length; f++) {
      if (document.forms[f].name != "adminlanguage") {
        var field = document.forms[f];
        for (i=0; i<field.length; i++) {
          if ( (field.elements[i].type != "image") &&
               (field.elements[i].type != "hidden") &&
               (field.elements[i].type != "reset") &&
               (field.elements[i].type != "button") &&
               (field.elements[i].type != "submit") ) {

            document.forms[f].elements[i].focus();

            if ( (field.elements[i].type == "text") ||
                 (field.elements[i].type == "password") )
              document.forms[f].elements[i].select();

            break isNotAdminLanguage;
          }
        }
      }
    }
  }
}

function rowOverEffect(object) {
  if (object.className == 'dataTableRow') object.className = 'dataTableRowOver';
}

function rowOutEffect(object) {
  if (object.className == 'dataTableRowOver') object.className = 'dataTableRow';
}

function toggleDivBlock(id) {
  if (document.getElementById) {
    itm = document.getElementById(id);
  } else if (document.all){
    itm = document.all[id];
  } else if (document.layers){
    itm = document.layers[id];
  }

  if (itm) {
    if (itm.style.display != "none") {
      itm.style.display = "none";
    } else {
      itm.style.display = "block";
    }
  }
}

/*Smartsend Code Start*/
$.fn.outer = function(val){
    if(val){
        $(val).insertBefore(this);
        $(this).remove();
    }
    else{ return $("<div>").append($(this).clone()).html(); }
}

function insertProd(a){
	newDataElement.append('<tr><td class="main">Products '+a+':<br><small><small>(in centimeter)</small></small></td><td class="main"><img src="images/pixel_trans.gif" border="0" alt="" width="24" height="15"> <input type="text" name="products_'+a.toLowerCase()+'" /></td></tr>')	
}

function chkWeight(){
				
					if($("input[name='products_weight']").val() > $(".descriptionselect option:selected").attr("maxweight")){
						var msg;
						if(!$(".descriptionselect option:selected").attr("maxweight_msg"))
							msg = "Maximum weight for '"+$(".descriptionselect option:selected").html()+"' is "+$(".descriptionselect option:selected").attr("maxweight")+" kgs."
						else
							msg = $(".descriptionselect option:selected").attr("maxweight_msg");
						
						$("input[name='products_weight']").validationEngine('showPrompt',msg,false);
	
						$("input[name='products_weight']").focus().select();
						
						return false;
					}
					else{
						return true
					}
			}

function validateIt(height, length, depth){
	weight = $("input[name='products_weight']");
	description = $("select[name='description']")
	var TailLift = $("select[name='TailLift']").val();
	
	if (!description.val() || description.val().length==0){
		description.validationEngine('showPrompt','please select a package description','error','topRight',true);
		return false;
	}
	else if (!weight.val() || weight.val()==0 || !height.val() || height.val()==0 || !depth.val() || depth.val()==0 || !length.val() || length.val()==0)
	{
		if (!weight.val() || weight.val()==0)
			weight.validationEngine('showPrompt','please enter a weight','error','topRight',true);
		if (!height.val() || height.val()==0)
			height.validationEngine('showPrompt','please enter a height','error','topRight',true);
		if (!depth.val() || depth.val()==0)
			depth.validationEngine('showPrompt','please enter a depth','error','topRight',true);
		if (!length.val() || length.val()==0)
			length.validationEngine('showPrompt','please enter a length','error','topRight',true);
		return false;
	}
	
	else if (weight.val()>80 && !(TailLift == 2 || TailLift == 3)){
		weight.validationEngine('showPrompt',"Individual items over 80kgs require a 'Tail-Lift Truck' service to be added at the pickup and/or delivery address, otherwise drivers may refuse to pickup and/or deliver the goods, resulting in additional charges to you. A 'Tail-Lift Truck' pickup is optionable if you have a forklift available to help load the goods. However a 'Tail-Lift Truck' delivery service is mandatory and can be added to the quoting process from the options listed here",'error','topRight',true);
		return false;
	}
	
	else
		return true
}

if(window.location.href.indexOf("categories.php")!=-1 && window.location.href.indexOf("action=new_product")==-1){
	var sItems = new Array();
	var msgTitle = "";
	$(document).ready(function() {
		$.getScript("addcustomfields.php?action=alertscr", function(data){
			if(sItems.length!=0){
				$("#adminAppMenu").after("<div id='popscr'><table width='100%' border='0' cellspacing='0' cellpadding='2'><tbody id='tAppend'><tr class='dataTableHeadingRow'><td class='dataTableHeadingContent' width='25%' align='center'> Product ID </td><td class='dataTableHeadingContent'> Product Name </td><td class='dataTableHeadingContent'> Action </td></tr></tbody></table></div>")
	
				var oddEven;
				var tOddEven;
				for(i=0;i<sItems.length;i++){
					if(i<20){
						oddEven=i%2;
						if(oddEven==1) tOddEven = "attributes-even";
						else tOddEven = "attributes-odd";
						$("#tAppend").append("<tr class='"+tOddEven+"'><td width='25%' align='center'>"+sItems[i][0]+"</td><td>"+sItems[i][1]+"</td><td><a href='categories.php?cPath=&pID="+sItems[i][0]+"&action=new_product' class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary ui-priority-secondary ui-state-focus' role='button'><span class='ui-button-icon-primary ui-icon ui-icon-document'></span><span class='ui-button-text'>Edit</span></a></td></tr>")
					}
				}
				
				$( "#popscr" ).dialog({ title: msgTitle, width: 550, maxWidth: 550, resizable: false });
			}
		});
	});
}

if(window.location.href.indexOf("action=new_product")!=-1){
	$.getScript("https://smartsend.com.au/js/jquery.validationEngine.js");
	$.getScript("https://smartsend.com.au/js/jquery.validationEngine-en.js");
	$('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'http://smartsend.com.au/css/validationEngine.jquery.css') );
	
	$(document).ready(function() {
		
		
		newDataElement=$("input[name='products_weight']").closest("tbody");
		if(newDataElement.length){
			insertProd("Height");
			insertProd("Length");
			insertProd("Depth");
			$("input[name='products_weight']").closest("tr").before('<tr><td class="main">Packaging Method:</td><td class="main"><img src="images/pixel_trans.gif" border="0" alt="" width="24" height="15"> <select name="description" id="description_1" class="descriptionselect validate[funcCall[checkFurniture]]" maxweight="17" maxlength="400" maxheight="400" maxwidth="400"><option value=""></option><option selected="selected" value="0" maxweight="1">Envelope</option><option value="2" secondperson="35" maxweight="80" maxweight_msg="Please strap the carton/box to a SKID or PALLET and choose the correct description from the drop down list. You should also consider adding a \'Tail-Lift Truck\' service to your booking to ensure there are no issues with pickup or delivery.">Carton</option><option value="3" maxweight="17" maxweight_msg="Please select Heavy Carton.">Satchel/Bag</option><option maxweight="17" value="4">Tube</option><option value="5" maxweight="1000" secondperson="35" forklift="80">Skid</option><option value="6" maxweight="1000" secondperson="35" forklift="80">Pallet</option><option value="7" maxweight="1000" secondperson="35" forklift="80">Crate</option><option value="8" maxweight="80" secondperson="35" forklift="80" maxweight_msg="Please strap the Pack to a SKID or PALLET and choose the correct description from the drop down list. You should also consider adding a \'Tail-Lift Truck\' service to your booking to ensure there are no issues with pickup or delivery.">Flat Pack</option><option value="9" maxweight="80" secondperson="35" maxweight_msg="Rolls over 35kgs require a 2nd person to help the driver load and unload the goods. Pickup will be refused by driver otherwise">Roll</option><option value="10" maxweight="80" secondperson="35" forklift="80" maxweight_msg="Please strap the LENGTH to a SKID or PALLET and choose the correct description from the drop down list. You should also consider adding a \'Tail-Lift Truck\' service to your booking to ensure there are no issues with pickup or delivery.">Length</option><option value="12" maxweight="80" secondperson="35" maxweight_msg="TYRES/WHEELS over 80kgs should be strapped to a SKID or PALLET and then choose the correct description from the drop down list. You should also consider adding a \'Tail-Lift Truck\' service to your booking to ensure there are no issues with pickup or delivery.">Tyre/Wheel</option><option value="13">Furniture/Bedding</option></select></td></tr>')	
			
			newDataElement.append('<tr><td class="main">Do you require a "Tail-Lift Truck"<br>to help load or unload the goods? </td><td class="main"><img src="images/pixel_trans.gif" border="0" alt="" width="24" height="15"> <select id="TailLift" name="TailLift"><option value="0">No</option><option value="1">Yes - At Pickup</option><option value="2">Yes - At Delivery</option><option value="3">Yes - At Pickup and Delivery</option></select></td></tr>')	
			
			buttonContainer=$("button#tdb1").parent();
			buttonElement=buttonContainer.html();
			$("button#tdb1").remove();
			buttonContainer.html(buttonElement.replace("submit","button"))
			if(window.location.href.indexOf("pID") != -1){
				var apID = /pID=(.+?)&/gim.exec(window.location.href)[1];
				$.get("addcustomfields.php?action=attr&pID="+apID, function(data){
				});
			}
			
			
			$("button#tdb1").click(function() {
				//edit
				if(window.location.href.indexOf("pID") != -1){
					$.post($("form[name='new_product']").attr("action"), $("form[name='new_product']").serialize(),function(data){
						aHeight=$("input[name='products_height']");
						aLength=$("input[name='products_length']");
						aDepth=$("input[name='products_depth']");
						desc=$("select[name='description']").val();
						tailLift=$("select[name='TailLift']").val();
						
						var ItemTypeMap = {
							0 : "envelope",
							2 : "carton", 
							3 : "satchel",
							3 : "bag",
							4 : "tube",
							5 : "skid", 
							6 : "pallet", 
							7 : "crate", 
							8 : "flatpack", 
							9 : "roll", 
							10 : "length", 
							12 : "tyree",
							12 : "wheel", 
							13 : "furniture", 
							13 : "bedding"
						}[desc];
						
						var TailLiftTypeID = { 
							0 : "none", 
							1 : "atpickup", 
							2 : "atdestination", 
							3 : "both"}[tailLift.toLowerCase()];
						
						if(validateIt(aHeight,aLength,aDepth) && chkWeight()){
							$.post("addcustomfields.php", { height: aHeight.val(), length: aLength.val(), depth: aDepth.val(), action: "edit", pID: apID, description : ItemTypeMap, taillift: TailLiftTypeID},
							function(data) {
								window.location.href="categories.php";
							});
						}
					});
				}
				//add
				else{
					$.post($("form[name='new_product']").attr("action"), $("form[name='new_product']").serialize(),function(data){
						aHeight = $("input[name='products_height']");
						aLength = $("input[name='products_length']");
						aDepth = $("input[name='products_depth']");
						desc=$("select[name='description']").val();
						tailLift=$("select[name='TailLift']").val();
						
						var ItemTypeMap = {
							0 : "envelope",
							2 : "carton", 
							3 : "satchel",
							3 : "bag",
							4 : "tube",
							5 : "skid", 
							6 : "pallet", 
							7 : "crate", 
							8 : "flatpack", 
							9 : "roll", 
							10 : "length", 
							12 : "tyree",
							12 : "wheel", 
							13 : "furniture", 
							13 : "bedding"
						}[desc];
						
						var TailLiftTypeID = { 
							0 : "none", 
							1 : "atpickup", 
							2 : "atdestination", 
							3 : "both"}[tailLift.toLowerCase()];
						
						if(validateIt(aHeight,aLength,aDepth) && chkWeight()){
							$.post("addcustomfields.php", { height: aHeight.val(), length: aLength.val(), depth: aDepth.val(), action: "add", description : ItemTypeMap },
							function(data) {
								window.location.href = "categories.php";
							});
						}
					});
				}
				
			});
			
			$("form").keypress(function(event) {
				if ( event.which == 13 ) {
					$("button#tdb1").click()
				}
			});
			
			$("input[name='products_weight']").blur(function() {
				chkWeight()
			});
				
			
			
			$(".descriptionselect").change(function() {

				if($(this).val()==12)
				{
					$(this).validationEngine('showPrompt', 'Tyres/Wheels should preferably be packaged in sturdy cartons/boxes to provide protection and security during transport. If you do not have suitable boxes available, layers of shrinkwrap (pallet plastic wrapping) or bubblewrap around the individual items should be sufficient but ensure they are tightly wrapped with no loose wrapping.', 'load');
				}
				else
					$(this).validationEngine('hidePrompt');
		
			});
		}
		
	});
}

//orders
function makeBooking(){
	var selectedItems = new Array();
	$("input[@name='itemSelect[]']:checked").each(function() {selectedItems.push($(this).val());});
	if (selectedItems.length == 0) 
		alert("Please select item(s) to book");
	else
   $.ajax({
		type: "POST",
		url: "addcustomfields.php",
		data: "action=getorder&url="+window.location.href.slice(0,window.location.href.indexOf("?"))+"&items=" + selectedItems.join('|'),
		dataType: "text",
		success: function (request) {
			alert(request)
			request=request.split("&");
			var ERROR = new Array();
			for(l=0;l<request.length;l++){
				if(request[l].slice(0,request[l].indexOf("=")).search(/\(/)!=-1){
					request[l]=request[l].replace(/\(/,"[").replace(/\)/,"]")
				}
				request[l]=request[l].replace("=","=\"");
				request[l]=request[l]+"\"";
				eval(request[l])
			}
			if(ACK=="SUCCESS"){
				$.cookie('token', TOKEN);
				$.cookie('items', items);
				$.cookie('dobookingURL', post_url+"?METHOD=DOBOOKING&TOKEN="+TOKEN);
				window.location.href=BOOKINGURL;
			}
			else{
				var theError="";
				for(o=0;o<ERROR.length;o++){
					theError+="<div style='background: #CADEFF; border:1px solid #AECBFF; margin-bottom: 2px; padding: 2px; color: #333; font-weight:bold'>"+unescape(ERROR[o])+"</div>";
				}
				$("body").append("<div id='smartsendErrors' style='display:none'>"+theError+"</div>");
				$("#smartsendErrors").dialog({ title: "there are "+ERROR.length+" error/s regarding your booking/s", width: 400, maxWidth: 200, resizable: false });
			}
			
	  	},
		error: function(request,error){
				
		}
	})

}

if(window.location.href.indexOf("orders.php")!=-1 && window.location.href.indexOf("action=edit")==-1){
	$(document).ready(function() {
		var orderTable=$("td[valign='top'][width!='100%'] table:eq(0)")
		orderTable.attr("id","orderTable");
		orderTable.attr("width","97%");
		orderTable.before('<table id="chb" border="0" width="3%" cellspacing="0" cellpadding="2" style="float:left"><tbody><tr class="dataTableHeadingRow"><td class="dataTableHeadingContent" align="center" style="height:16px"></td></tr></tbody></table>');
		var dCheckBox="";
		
		$("#orderTable tbody tr:last-child td table tbody tr").prepend('<td valign="top"><input type="button" value="Make Booking With Selected Orders" id="makeBooking"/></td>');
		
		$('#orderTable tbody tr:not(:first-child):not(:last-child)').each(function(index) {
			theID=$(this).attr("onclick");
			theID=/oID=(.+?)[&']/gim.exec(theID)[1];
			dCheckBox+='<tr class="dataTableHeadingRow"><td class="dataTableContent" align="center" style="height:14px"><input type="checkbox" name="itemSelect[]" value="'+theID+'"></td></tr>'
		});
		
		$("#chb tbody").append(dCheckBox)
		
		$('#makeBooking').click(function() {
			makeBooking()
		});
	
	});
}

function SAF(a){
	if($('.saf'+a).html()=="")
		$('.saf'+a).load('orders.php?page=1&oID='+a+'&action=edit table:eq(4), table:eq(8)', function() {});
	else
		$('.saf'+a).html("")
}

function doBooking(){
	
}

//return url
if(window.location.href.indexOf("orders.php?returnurl=1")!=-1){
	$(document).ready(function() {
		$("body").append("<div id='returnurl' style='display:none'></div>");
		var theItems = $.cookie('items').split("|");

		for(i=0;i<theItems.length;i++){

			//$('#returnurl #sAccordion').load('orders.php?page=1&oID='+theItems[i]+'&action=edit table:eq(8)', function() {});
			$("#returnurl").append("<h3 style='background: #b3bac5; padding: 2px; cursor: pointer' onClick='SAF("+theItems[i]+");return false;'><a href='#'>Order #"+theItems[i]+"</a></h3><div class='saf"+theItems[i]+"' style='padding-left: 5px; padding-right: 5px'></div>")
		}
		
		$("#returnurl").append("<hr /><div align='right'><img src='http://ppcalc.com/buttons/x-click-but6.gif' onClick='doBooking()' style='cursor: pointer'/></div>")
		
		$("#returnurl").dialog({ title: "Receipt", width: 700, maxWidth: 700, resizable: false, open: function(event, ui) {}});
	});
}

//cencel url
if(window.location.href.indexOf("orders.php?cancel=1")!=-1){
	$('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'includes/ui-lightness/jquery-ui-1.8.16.custom.css') );
	$(document).ready(function() {
		$.cookie('the_cookie', 'the_value');
		$("body").append("<div id='cancelurl' style='display:none'>weee</div>");
		$("#cancelurl").dialog({ title: "cencelurl", width: 200, maxWidth: 200, resizable: false });
	});
}

//notify url
if(window.location.href.indexOf("orders.php?notify=1")!=-1){
	$('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'includes/ui-lightness/jquery-ui-1.8.16.custom.css') );
	$(document).ready(function() {
		$.cookie('the_cookie', 'the_value');
		$("body").append("<div id='returnurl' style='display:none'>weee</div>");
		$("#notifyurl").dialog({ title: "cencelurl", width: 200, maxWidth: 200, resizable: false });
	});
}

//settings screen validation
$.fn.textNodes = function() {
  var ret = [];
  this.each( function() {
    var fn = arguments.callee;
    $(this).contents().each( function() {
      if ( this.nodeType == 3 || $.nodeName(this, "br") ) 
        ret.push( this );
      else fn.apply( $(this) );
    });
  });
  return $(ret);
}

function usertype(a){
	if(a){
		$(".infoBoxContent strong:eq(2)").nextUntil("strong").show();
		$(".infoBoxContent strong:eq(2)").show();
	}
	
	else{
		$(".infoBoxContent strong:eq(2)").nextUntil("strong").hide();
		$(".infoBoxContent strong:eq(2)").hide();
	}
}

if(window.location.href.indexOf("modules.php?set=shipping&module=smartsend&action=edit")!=-1){
	$(document).ready(function() {
		$("input[type='text']:eq(2)").addClass("validate[required,maxSize[2]]").attr("id","sCountrycode");
		$("input[type='text']:eq(3)").addClass("validate[required,custom[onlyNumberSp]]").attr("id","sPostcode");
		$("input[type='text']:eq(4)").addClass("validate[required,custom[onlyLetterSp]]").attr("id","sSuburban");
		$("input[type='text']:eq(7)").addClass("validate[required,custom[phone],maxSize[10]]").attr("id","sContactphone");
		$("input[type='text']:eq(8)").addClass("validate[required,custom[email]]").attr("id","sEmail");
		$("input[type='text']:eq(9)").addClass("validate[required]").attr("id","sPickupcontact");
		$("input[type='text']:eq(11)").addClass("validate[required]").attr("id","sAddress");
		$("input[type='text']:eq(13)").addClass("validate[required,custom[phone],maxSize[10]]").attr("id","sPickupphone");
		$("input[type='text']:eq(14)").addClass("validate[required]").attr("id","sPickupsuburb");
		$("input[type='text']:eq(15)").addClass("validate[required,,custom[onlyNumberSp]]").attr("id","sPickuppostcode");
		$("input[type='text']:eq(16)").addClass("validate[required,custom[onlyLetterSp]]").attr("id","sPickupstate");
		$.getScript("https://smartsend.com.au/js/jquery.validationEngine.js",function(){
			$.getScript("https://smartsend.com.au/js/jquery.validationEngine-en.js",function(){
				$("form[name='modules']").validationEngine({
					inlineValidation: false,
					success :  false,
					failure : function() { }
				})
			});
		})
		$('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'http://smartsend.com.au/css/validationEngine.jquery.css'));
		
		$(".infoBoxContent").textNodes().wrap("<span/>");
		usertype(0)
		
		$("input[name='configuration[MODULE_SHIPPING_SMARTSEND_USERCODE]']").keyup(function() {
			if($(this).val()=="")
				usertype(0);
			else
				usertype(1);
		});
		
	});
}

/*Smartsend Code End*/
