<?php
  $files = &$_FILES['files'];
	$flen = count($files['name']);
	$res = [];

	for ($i = 0; $i < $flen; ++$i) {
		$status = move_uploaded_file(
			$files['tmp_name'][$i],
			'upload/'.$files['name'][$i]
		);

		$res[] = [
			'file' => $files['name'][$i],
			'status' => $status
		];
	}

	echo json_encode($res);
?>