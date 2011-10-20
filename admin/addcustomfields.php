<?php
	require('includes/application_top.php');
	require('includes/configure.php');
	if(tep_session_is_registered('admin')){
		// Make a MySQL Connection
		mysql_connect(DB_SERVER, DB_SERVER_USERNAME, DB_SERVER_PASSWORD) or die(mysql_error());
		mysql_select_db(DB_DATABASE) or die(mysql_error());
		
		if($_POST["action"]=="add"){
		$sql = "SHOW TABLE STATUS LIKE 'products'";
		$result = mysql_query($sql);

		$row = mysql_fetch_array($result);
		$next_id = $row['Auto_increment']-1;
		
		$depth=$_POST["depth"];
		$length=$_POST["length"];
		$height=$_POST["height"];
		$desc=$_POST["description"];
		$taillift=$_POST["taillift"];
		
		mysql_query("INSERT INTO smartsend_products (description, id, depth, length, height, taillift) VALUES('$desc', '$next_id', '$depth', '$length', '$height','$taillift') ") or die(mysql_error());
		}

		if($_POST["action"]=="edit"){
			$depth=$_POST["depth"];
			$length=$_POST["length"];
			$height=$_POST["height"];
			$desc=$_POST["description"];
			$taillift=$_POST["taillift"];
			$pID=$_POST["pID"];
			$update = mysql_query("UPDATE smartsend_products SET depth = '$depth', length = '$length', height='$height', description='$desc', taillift='$taillift' WHERE id='$pID'") 
			or die(mysql_error()); 
			echo mysql_affected_rows();
			if(mysql_affected_rows()==0){
				mysql_query("INSERT INTO smartsend_products (description, id, depth, length, height, taillift) VALUES('$desc', '$pID', '$depth', '$length', '$height', '$taillift') ") or die(mysql_error());
			}
		}
		
		if($_GET["action"]=="attr"){
			header("Content-type: text/javascript");
			$pID=$_GET["pID"];
			$result = mysql_query("SELECT * FROM smartsend_products WHERE id='$pID'") 
			or die(mysql_error());
			
			$row = mysql_fetch_array( $result );
			$height = $row["height"];
			$length = $row["length"];
			$depth = $row["depth"];
			$desc = $row["description"];
			$taillift = $row["taillift"];
			
			echo '$("input[name=\'products_height\']").val("'.$height.'");';
			echo '$("input[name=\'products_length\']").val("'.$length.'");';
			echo '$("input[name=\'products_depth\']").val("'.$depth.'");';
			echo '
			desc="'.$desc.'";
			var ItemTypeMap = {
					"envelope" : 0,
					"carton" : 2, 
					"satchel" : 3,
					"bag" : 3,
					"tube" : 4,
					"skid" : 5, 
					"pallet" : 6, 
					"crate" : 7, 
					"flatpack" : 8, 
					"roll" : 9, 
					"length" : 10, 
					"tyre" : 12,
					"wheel" : 12, 
					"furniture" : 13, 
					"bedding" : 13
				}[desc];
				$("select[name=\'description\'] option[value=\'"+ItemTypeMap+"\']").attr("selected", true);
				var tl="'.$taillift.'";
				var TailLiftTypeID = { 
				"none" : 0, 
				"atpickup" : 1, 
				"atdestination" : 2, 
				"both" : 3}[tl.toLowerCase()];
				$("select[name=\'TailLift\'] option[value=\'"+TailLiftTypeID+"\']").attr("selected", true);
			';
			
		}
		
		if($_GET["action"]=="alertscr"){
			header("Content-type: text/javascript");
			$i=0;
			$result = mysql_query("SELECT DISTINCT products_description.products_id AS id, products_description.products_name AS name FROM products_description WHERE products_description.products_id NOT IN (SELECT smartsend_products.id FROM smartsend_products)");
			while($row = mysql_fetch_array($result)){
				$id=$row["id"];
				$name=addslashes($row["name"]);
				echo "msgTitle='Please update the depth, length, height and best packing method for the following products';";
				echo "sItems[$i]=[$id,'$name'];";
				$i++;
			}
			
			if($i==0){
				$result = mysql_query("SELECT products_description.products_id AS id, products_description.products_name AS name FROM products_description WHERE products_description.products_id IN (SELECT products.products_id FROM products WHERE products.products_weight='0.00')");
				while($row = mysql_fetch_array($result)){
					$id=$row["id"];
					$name=addslashes($row["name"]);
					echo "msgTitle='Please update the weight for following products';";
					echo "sItems[$i]=[$id,'$name'];";
					$i++;
				}
			}
			
			if($i==0){
				$result = mysql_query("SELECT products_description.products_id AS id, products_description.products_name AS name FROM products_description WHERE products_description.products_id IN (SELECT smartsend_products.id FROM smartsend_products WHERE smartsend.description='' OR smartsend.depth='' OR smartsend.length='' OR smartsend.height='')");
				while($row = mysql_fetch_array($result)){
					$id=$row["id"];
					$name=addslashes($row["name"]);
					echo "msgTitle='Please update the packaging method, depth, length and height for the following products'";
					echo "sItems[$i]=[$id,'$name'];";
					$i++;
				}
			}
		}
	}
?>