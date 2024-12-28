<?php
  error_reporting(E_ALL);
  ini_set('display_errors', 0);
  ini_set('error_log', __DIR__.'/logs/errors-'.date('Y-m-d').'.log');
  ini_set('post_max_size', '100G');
  ini_set('upload_max_filesize', '100G');
  ini_set('max_file_uploads', '200');
  date_default_timezone_set('Europe/Warsaw');
?>