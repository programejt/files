<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Files</title>
	<link rel="icon" type="image/png" href="favicon.png"/>
	<link rel="stylesheet" href="css/all.min.css">
	<!-- <link rel="stylesheet" href="fontello/css/fontello.min.css"> -->
	<link rel="stylesheet" href="css/style.css">
	<script src="js/jquery.min.js"></script>
	<script src="js/inputfile.js"></script>
	<script src="js/main.js"></script>
</head>
<body>

	<div class="container">
		
		<h1 class="section-title">Upload</h1>

		<form action="#" method="post">
			<div class="form-section buttons-container">
				<div class="input-file-container">
					<label class="label-with-input">
						<input type="file" name="files" multiple>
						<span class="label-button">Select...</span>
					
					</label><button type="button" class="dark-btn toggle-selected-files-dropdown" title="Show selected files"><span class="files-amount">0</span> files selected <i class="icon fa fa-caret-down"></i></button>
					<ul class="files-list" data-empty-text="No files selected"></ul>
				</div>
				<div class="flex-fill"></div>
				<button type="submit" class="btn blue-btn btn-sm btn-info upload" type="submit">Upload</button>
				<button type="button" class="btn btn-sm btn-danger cancel">Cancel</button>
			</div>
			<div class="form-section">
				<div class="progress-bar">
					<div class="progress" style="width: 0"></div>
				</div>
			</div>
			<div class="form-section">
				<div class="upload-response"></div>
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
					$file_path = $dirname.'/'.$filename;

					if (is_file($file_path)) {
						echo '<a href="'.$file_path.'" class="download-link" download><i class="icon fa fa-arrow-alt-circle-down"></i><span>'.$filename.'</span></a>';
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