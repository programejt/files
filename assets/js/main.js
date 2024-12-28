var inputFile,
    uploadButton,
    cancelButton,
    progress,
    progressBarContainer,
    uploadResponseContainer;

function uploadImage(form) {
	var files = form[0].files;

  if (files.length == 0) {
    return;
  }

	var messageContainer = uploadResponseContainer.querySelector('.upload-response');

	var formdata = new FormData(form);

	for (const file of files) {
		formdata.append('files[]', file);
	}

  progressBarContainer.classList.remove('hidden');
  uploadResponseContainer.classList.remove('hidden');

	var request = new XMLHttpRequest();

	request.upload.addEventListener('progress', function (e) {
		var percent = Math.round(e.loaded / e.total * 100);
		progress.style.width = percent + '%';
		messageContainer.innerHTML = percent + '%';
	});

	request.addEventListener('load', function (e) {
    let target = e.target;
    let response;
    let success = true;
    let failuresAmount = 0;

    try {
      response = JSON.parse(target.response);
		  console.log(response);
    } catch (e) {}

    if (target.status === 200) {
      if (! Array.isArray(response)) {
        messageContainer.textContent = 'Invalid server response';
        return;
      }

      response.forEach(function (item) {
        if (! item.status) {
          success = false;
          failuresAmount++;
        }
      });

      if (success) {
        messageContainer.textContent = 'Upload completed';
      } else {
        if (flen == failuresAmount) {
          messageContainer.textContent ='Upload failure (all files weren\'t uploaded)';
        } else {
          messageContainer.textContent ='Upload completed (' + failuresAmount + ' files weren\'t uploaded)';
        }
      }
    } else {
      messageContainer.textContent ='Upload error (' + target.status + ' ' + target.statusText + ')';
    }
	});

	//progress completed load event
	request.addEventListener('error', function () {
		messageContainer.textContent = 'Upload error';
	});

  request.addEventListener('loadend', function () {
    cancelButton.classList.add('hidden');

    cancelButton.disabled = true;
    uploadButton.disabled = false;

    progressBarContainer.classList.add('hidden');
  });

  // request.addEventListener('readystatechange', function (e) {
  //   if (e.target.readyState === 4) {
  //     cancelButton.off('click');
  //     cancelButton.addClass('hidden');

  //     cancelButton.prop('disabled', true);
  //     uploadButton.prop('disabled', false);

  //     progressBarContainer.addClass('hidden');
  //   }
  // });

  cancelButton.disabled = false;
  cancelButton.classList.remove('hidden');
	uploadButton.disabled = true;

	request.open('post', 'upload.php');
	request.send(formdata);

	cancelButton.addEventListener('click', function () {
		request.abort();
    progress.style.width = 0;
		messageContainer.textContent = 'Upload aborted';
	});
}

document.addEventListener('DOMContentLoaded', function () {
  inputFile = document.querySelector('input[type="file"]');
  uploadButton = document.querySelector('.btn.upload');
  cancelButton = document.querySelector('.btn.cancel');
  progress = document.querySelector('.progress');
  progressBarContainer = document.querySelector('.progress-bar-container');
  uploadResponseContainer = document.querySelector('.upload-response-container');

  inputFile.addEventListener('change', function () {
    uploadButton.disabled = this.files == 0;
    progress.style.width = 0;
  }, false);
}, false);

document.addEventListener('submit', function (e) {
  if (e.target.matches('.upload-form')) {
    e.preventDefault();
    uploadImage(e.target);
  }
}, false);