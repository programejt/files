<?php

require 'config.php';

const HTTP_BAD_REQUEST = 400;

if (!isset($_FILES['files'])) {
  http_response_code(HTTP_BAD_REQUEST);
  exit;
}

$files      = &$_FILES['files'];
$filesNames = &$files['name'];

if (!(is_array($filesNames) && count($filesNames))) {
  http_response_code(HTTP_BAD_REQUEST);
  exit;
}

const HTTP_UNPROCESSABLE_ENTITY = 422;

$response     = [];
$responseCode = 200;

foreach ($filesNames as $i => $fileName) {
  $errorCode = $files['error'][$i];
  $message   = match ($errorCode) {
    UPLOAD_ERR_OK         => 'Success',
    UPLOAD_ERR_INI_SIZE,
    UPLOAD_ERR_FORM_SIZE  => 'The uploaded file size exceeds allowed max size ('.round($files['size'][$i] / 1024 / 1024 / 1024, 2).'GB / '.UPLOAD_MAX_FILESIZE.'B)',
    UPLOAD_ERR_PARTIAL    => 'The uploaded file was only partially uploaded',
    UPLOAD_ERR_NO_FILE    => 'No file was uploaded',
    UPLOAD_ERR_NO_TMP_DIR => 'Missing a temporary folder',
    UPLOAD_ERR_CANT_WRITE => 'Failed to write file to disk',
    UPLOAD_ERR_EXTENSION  => 'Server stopped file upload because of internal error',
  };

  if ($errorCode === UPLOAD_ERR_OK) {
    $success = move_uploaded_file(
      $files['tmp_name'][$i],
      UPLOAD_DIR.'/'.$fileName,
    );

    if (!$success) {
      $errorCode    = 100;
      $responseCode = HTTP_UNPROCESSABLE_ENTITY;
      $message      = 'File was not uploaded because of internal error';
    }
  } else {
    $success      = false;
    $responseCode = HTTP_UNPROCESSABLE_ENTITY;
  }

  $response[] = [
    'file'      => $fileName,
    'message'   => $message,
    'errorCode' => $errorCode,
    'success'   => $success,
  ];
}

header('Content-Type: application/json; charset=utf-8');

http_response_code($responseCode);

echo json_encode($response);