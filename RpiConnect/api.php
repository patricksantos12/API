<?php
$con = mysqli_connect("localhost","admin","password","RegistrationDatabase");
$response = array();
if($con){
	$sql = "SELECT * FROM `Dummy Database`";
	$result = mysqli_query($con,$sql);
	if ($result){
		header("Content-Type: JSON");
		$i = 0;
		while($row = mysqli_fetch_assoc($result)){
			$response[$i]['PlateN'] = $row ['PlateN'];
			$response[$i]['Make'] = $row ['Make'];
			$response[$i]['Model'] = $row ['Model'];
			$response[$i]['Color'] = $row ['Color'];
			$response[$i]['RegStatus'] = $row ['RegStatus'];
			$response[$i]['AgencyLoc'] = $row ['AgencyLoc'];
			$i++;
		}
		echo json_encode($response,JSON_PRETTY_PRINT);
	}
}
else{
	echo "Database Connection failed";
}

?>

