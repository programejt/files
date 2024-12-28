<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Files</title>
	<link rel="icon" type="image/png" href="favicon.png">
	<link rel="stylesheet" href="assets/css/all.min.css">
	<!-- <link rel="stylesheet" href="fontello/css/fontello.min.css"> -->
	<link rel="stylesheet" href="assets/css/style.css">

	<script src="assets/js/inputfile.js"></script>
	<script src="assets/js/main.js"></script>
</head>
<body>
	<div class="container">
		<h1 class="section-title">Upload</h1>
		<form action="" method="post" class="upload-form" enctype="multipart/form-data">
			<div class="form-section">
				<div class="input-file-container long">
					<label class="label-with-input">
						<input type="file" name="files" multiple>
						<span class="btn">Select...</span>
					</label><button type="button" class="input-file-list-btn toggle-selected-files-dropdown" title="Show selected files"><span class="files-amount">0</span> files <i class="icon fa fa-caret-down"></i></button>
					<ul class="files-list" data-empty-text="No files selected"></ul>
				</div>
			</div>
			<div class="form-section">
        <button type="submit" class="btn btn-primary long upload" type="submit" disabled>Upload</button>
      </div>
			<div class="form-section progress-bar-container hidden">
				<div class="progress-bar">
					<div class="progress" style="width: 0"></div>
				</div>
			</div>
			<div class="form-section upload-response-container hidden">
				<div class="upload-response"></div>
				<button type="button" class="btn cancel hidden" disabled>Cancel</button>
			</div>
		</form>
  </div>
	<div class="container">
		<h1 class="section-title">Download</h1>
		<div class="links-container">
		<?php
			$dirname = 'download';
			$scan = scandir($dirname);

			if ($scan) {
				foreach ($scan as $filename) {
					$filePath = $dirname.'/'.$filename;

					if (is_file($filePath)) {
						echo '<a href="'.$filePath.'" class="download-link" download><!--- <i class="icon fa fa-arrow-alt-circle-down"></i> --><span>'.$filename.'</span></a>';
					}
				}
			} else {
				echo 'Błąd skanowania folderu';
			}
		?>
		</div>
  </div>
</body>
</html>