<?php
  require 'config.php';

  $response = [];

  if (isset($_FILES['files'])) {
    $files = &$_FILES['files'];

    if (is_array($files['name'])) {
      $filesAmount = count($files['name']);

      for ($i = 0; $i < $filesAmount; ++$i) {
        $status = move_uploaded_file(
          $files['tmp_name'][$i],
          'upload/'.$files['name'][$i]
        );

        $response[] = [
          'file'   => $files['name'][$i],
          'status' => $status
        ];
      }
    }
  }

  header('Content-Type: application/json; charset=utf-8');

  echo json_encode($response);
?>
