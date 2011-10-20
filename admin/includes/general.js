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
/*Smartsend Code End*/
