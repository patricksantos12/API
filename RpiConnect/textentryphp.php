<?php

	$res = "res1";
	$command = escapeshellcmd("python3 testtextentry.py $res");
	$output = shell_exec($command);
	echo $output;

?>
