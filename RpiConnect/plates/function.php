<?php

require '/home/cisco/Desktop/PLATONIXSYSTEM/api.php';

function getCustomerList(){
	
	global $con;
	
	$query = "SELECT * FROM `Dummy Database` WHERE 1";
	$query_run = mysqli_query($con,$query);
	
	if ($query_run){
		
		if (mysqli_num_rows($query_run) > 0){
			
			$res = mysqli_fetch_all($query_run, MYSQLI_ASSOC);
			
			$data = [
			'status' => 200,
			'message' => 'Plate fetched successfully',
			'data' => $res
			];
			header("HTTP/1.0 200 OK");
			return json_encode($data);
			
		}else{
			$data = [
			'status' => 404,
			'message' => 'No Plate found',
			];
			header("HTTP/1.0 404 No Plate found");
			return json_encode($data);
		}
		
	}
	else
	{
		$data = [
			'status' => 500,
			'message' => 'Internal Server Error',
		];
		header("HTTP/1.0 500 Internal Server Error");
		return json_encode($data);
	}
}
?>
