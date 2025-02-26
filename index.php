<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">

	<title>Files</title>

	<link rel="icon" type="image/png" href="favicon.png">
	<link rel="stylesheet" href="assets/font-awesome/css/all.min.css">
	<link rel="stylesheet" href="assets/css/style.css">

	<script src="assets/js/dropdown.js"></script>
	<script src="assets/js/inputfile.js"></script>
	<script src="assets/js/main.js"></script>
</head>
<body>
	<section class="container">
		<h1 class="section-title">Upload</h1>
		<form action="upload.php" method="post" class="upload-form" enctype="multipart/form-data">
			<div class="form-section">
				<div class="input-file-container dropdown-container long">
					<label class="label-with-input">
						<input type="file" name="files" multiple>
						<span class="btn">Select...</span>
					</label><button type="button" class="dropdown-toggle input-file-list-btn toggle-selected-files-dropdown" title="Show selected files"><span class="files-amount">0</span> files <i class="icon fa fa-caret-down"></i></button>
					<ul class="dropdown files-list" data-empty-text="No files selected"></ul>
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
				<div class="upload-response form-section"></div>
        <div class="upload-result dropdown-container">
          <button type="button" class="dropdown-toggle toggle-upload-result">Summary</button>
          <ul class="dropdown uploaded-files-list"></ul>
        </div>
				<button type="button" class="btn cancel hidden" disabled>Cancel</button>
			</div>
		</form>
  </section>
	<section class="container">
		<h1 class="section-title">Download</h1>
		<div class="links-container">
		<?php
			$dirname = 'download';
			$scan = scandir($dirname);

			if ($scan) {
				foreach ($scan as $filename) {
					$filePath = $dirname.'/'.$filename;

					if ($filename[0] !== '.' && is_file($filePath)) {
    ?>
						<a href="<?= $filePath ?>" class="download-link" download><span><?= $filename ?></span></a>
    <?php
					}
				}
			} else {
    ?>
			<p class="text-center">Scanning folder failed</p>
    <?php } ?>
		</div>
  </section>
</body>
</html>
