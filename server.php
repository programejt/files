<?php
	$flen = count($_FILES['files']['name']);
	$res = [];

	for ($i = 0; $i < $flen; ++$i) {
		$status = move_uploaded_file(
			$_FILES['files']['tmp_name'][$i],
			'upload/'.$_FILES['files']['name'][$i]
		);

		$res[] = [
			'file' => $_FILES['files']['name'][$i],
			'status' => $status
		];
	}

	echo json_encode($res);
?>