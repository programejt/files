function uploadImage($form) {
	var form = $form[0];
	var upload_btn = $form.find('.btn.upload');
	var progress = $form.find('.progress');
	var info_container = $form.find('.upload-response');
	
	$form.find('.progress').removeClass('progress-success')
								.removeClass('progress-danger');

	var formdata = new FormData(form); //formelement
	var request = new XMLHttpRequest();

	//progress event...
	request.upload.addEventListener('progress',function (e) {
		var percent = Math.round(e.loaded / e.total * 100);
		progress.width(percent + '%');
		info_container.html(percent + '%');
		upload_btn.prop('disabled', false);
	});

	//progress completed load event
	request.addEventListener('load',function (e) {
		console.log(JSON.parse(e.target.response));
		progress.addClass('progress-success');
		info_container.html('Upload completed');
	});

	var files = form[0].files;
	var flen = files.length;

	for (var i = 0; i < flen; ++i) {
		formdata.append('files[]', files[i]);
	}

	request.open('post', 'server.php');
	upload_btn.prop('disabled', true);
	request.send(formdata);

	$form.on('click','.cancel',function () {
		request.abort();

		progress
			.addClass('progress-danger')
			.removeClass('progress-success');
			
		info_container.html('Upload aborted');

		upload_btn.prop('disabled', false);
	});
}

// window.addEventListener('DOMContentLoaded', init, false);

$(document).on('submit','form',function (e) {
	e.preventDefault();

	uploadImage($(this));
});