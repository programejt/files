<?php

const URI_PREFIX          = '';
const UPLOAD_DIR          = 'upload';
const UPLOAD_MAX_FILESIZE = '100G';
const MAX_FILE_UPLOADS    = '100';
const POST_MAX_SIZE       = '100G';

error_reporting(E_ALL);
date_default_timezone_set('Europe/Warsaw');

ini_set('display_errors', 0);
ini_set('error_log', __DIR__.'/logs/errors-'.date('Y-m-d').'.log');
ini_set('post_max_size', POST_MAX_SIZE);
ini_set('upload_max_filesize', UPLOAD_MAX_FILESIZE);
ini_set('max_file_uploads', UPLOAD_MAX_FILESIZE);