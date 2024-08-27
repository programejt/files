var $doc = $(document);
var $input_file, $upload_btn, $cancel_btn, $progress;
var $progress_bar_container, $upload_response_container;

function uploadImage($form) {
	var form = $form[0];

	var files = form[0].files;
	var flen = files.length;

  if (flen == 0) {
    return;
  }

	var info_container = $upload_response_container.find('.upload-response');

	var formdata = new FormData(form); //formelement

	for (var i = 0; i < flen; ++i) {
		formdata.append('files[]', files[i]);
	}

  $progress_bar_container.removeClass('hidden');
  $upload_response_container.removeClass('hidden');

	var request = new XMLHttpRequest();

	//progress event...
	request.upload.addEventListener('progress', function (e) {
		var percent = Math.round(e.loaded / e.total * 100);
		$progress.width(percent + '%');
		info_container.html(percent + '%');
	});

	//progress completed load event
	request.addEventListener('load', function (e) {
    let target = e.target;
    let res;
    let success = true;
    let failures_count = 0;

    try {
      res = JSON.parse(target.response);
		  console.log(res);
    } catch (e) {}

    if (target.status === 200) {
      if (! Array.isArray(res)) {
        info_container.html('Invalid server response');
        return;
      }

      res.forEach(function (item) {
        if (! item.status) {
          success = false;
          failures_count++;
        }
      });

      if (success) {
        info_container.html('Upload completed');
      } else {
        if (flen == failures_count) {
          info_container.html('Upload failure (all files weren\'t uploaded)');
        } else {
          info_container.html('Upload completed (' + failures_count + ' files weren\'t uploaded)');
        }
      }
    } else {
      info_container.html('Upload error (' + target.status + ' ' + target.statusText + ')');
    }
	});

	//progress completed load event
	request.addEventListener('error', function (e) {
		info_container.html('Upload error');
	});

  request.addEventListener('loadend', function (e) {
    $cancel_btn.off('click');
    $cancel_btn.addClass('hidden');

    $cancel_btn.prop('disabled', true);
    $upload_btn.prop('disabled', false);

    $progress_bar_container.addClass('hidden');
  });

  // request.addEventListener('readystatechange', function (e) {
  //   if (e.target.readyState === 4) {
  //     $cancel_btn.off('click');
  //     $cancel_btn.addClass('hidden');

  //     $cancel_btn.prop('disabled', true);
  //     $upload_btn.prop('disabled', false);

  //     $progress_bar_container.addClass('hidden');
  //   }
  // });

  $cancel_btn.prop('disabled', false);
  $cancel_btn.removeClass('hidden');
	$upload_btn.prop('disabled', true);

	request.open('post', 'upload.php');
	request.send(formdata);

	$cancel_btn.on('click', function () {
		request.abort();
    $progress.width(0);
		info_container.html('Upload aborted');
	});
}

// window.addEventListener('DOMContentLoaded', init, false);

$doc.ready(function () {
  $input_file = $('input[type="file"]').eq(0);
  $upload_btn = $('.btn.upload');
  $cancel_btn = $('.btn.cancel');
  $progress = $('.progress');
  $progress_bar_container = $('.progress-bar-container');
  $upload_response_container = $('.upload-response-container');

  $input_file.on('change', function () {
    $upload_btn.prop('disabled', this.files == 0);
    $progress.width(0);
  });
});

$doc.on('submit', '.upload-form', function (e) {
	e.preventDefault();

	uploadImage($(this));
});