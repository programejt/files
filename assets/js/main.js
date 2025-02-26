var form,
    inputFile,
    uploadButton,
    cancelButton,
    progress,
    progressBarContainer,
    uploadResponseContainer,
    messageContainer,
    uploadResult,
    uploadedFilesList;

function uploadImage(form) {
	var inputFile = form[0],
      files = inputFile.files,
      filesAmount = files.length;

  if (!filesAmount) {
    return;
  }

	var formdata = new FormData(form);
  var requestSuccess = false;

	for (const file of files) {
		formdata.append('files[]', file);
	}

  progressBarContainer.classList.remove('hidden');
  uploadResponseContainer.classList.remove('hidden');

  cancelButton.disabled = false;
  cancelButton.classList.remove('hidden');
	uploadButton.disabled = true;

	var request = new XMLHttpRequest();

	request.upload.addEventListener('progress', function (e) {
		var percent = Math.round(e.loaded / e.total * 100);
		progress.style.width = percent + '%';
		messageContainer.textContent = percent + '%';
	});

	request.addEventListener('load', function (e) {
    let target = e.target;

    if (target.status === 200 || target.status === 422) {
      let response;
      let success = true;
      let failuresAmount = 0;

      try {
        response = JSON.parse(target.response);
      } catch (exception) {
        messageContainer.textContent = 'Invalid server response';
        return;
      }

      if (! Array.isArray(response)) {
        messageContainer.textContent = 'Invalid server response';
        return;
      }

      response.forEach(function (item) {
        if (! item.success) {
          success = false;
          failuresAmount++;
        }
      });

      if (success) {
        messageContainer.textContent = 'Upload completed';
        resetInputFile();
        requestSuccess = true;
      } else {
        if (filesAmount === failuresAmount) {
          messageContainer.textContent ='Upload failure (all files weren\'t uploaded)';
        } else {
          messageContainer.textContent ='Upload completed (' + failuresAmount + ' files weren\'t uploaded)';
        }
      }

      let li, fileNameSpan, fileMessageSpan;

      uploadedFilesList.innerHTML = '';

      for (const file of response) {
        li = document.createElement('li');
        fileNameSpan = document.createElement('span');
        fileMessageSpan = document.createElement('span');

        fileNameSpan.textContent = file.file;
        fileMessageSpan.textContent = file.message;

        fileNameSpan.className = 'file-name';
        fileMessageSpan.className = 'file-message';

        fileMessageSpan.classList.add(file.success ? 'success' : 'error');

        if (file.errorCode !== 0) {
          fileMessageSpan.textContent += ' (#' + file.errorCode + ')';
        }

        li.appendChild(fileNameSpan);
        li.appendChild(fileMessageSpan);

        li.className = 'dropdown-item';

        uploadedFilesList.appendChild(li);
      }

      uploadResult.classList.remove('hidden');
    } else {
      messageContainer.textContent = 'Upload error (' + target.status + ' ' + target.statusText + ')';
      uploadResult.classList.add('hidden');
    }
	});

	request.addEventListener('error', function (e) {
    messageContainer.textContent = 'Could not connect to server';
    uploadResult.classList.add('hidden');
	});

  request.addEventListener('loadend', function () {
    cancelButton.classList.add('hidden');

    cancelButton.disabled = true;
    uploadButton.disabled = requestSuccess;

    progressBarContainer.classList.add('hidden');
  });

	cancelButton.addEventListener('click', function () {
		request.abort();
    progress.style.width = 0;
		messageContainer.textContent = 'Upload aborted';
	});

	request.open(form.method, form.action);
	request.send(formdata);
}

function resetInputFile() {
  inputFile.value = '';
  uploadButton.disabled = true;
  setupInputFile(inputFile);
}

document.addEventListener('DOMContentLoaded', function () {
  form = document.querySelector('form');
  inputFile = form.querySelector('input[type="file"]');
  uploadButton = form.querySelector('.btn.upload');
  cancelButton = form.querySelector('.btn.cancel');
  progress = form.querySelector('.progress');
  progressBarContainer = form.querySelector('.progress-bar-container');
  uploadResponseContainer = form.querySelector('.upload-response-container');
  messageContainer = uploadResponseContainer.querySelector('.upload-response');
  uploadResult = uploadResponseContainer.querySelector('.upload-result');
  uploadedFilesList = uploadResponseContainer.querySelector('.uploaded-files-list');

  inputFile.addEventListener('change', function () {
    uploadButton.disabled = !this.files;
    progress.style.width = 0;

    uploadResponseContainer.classList.add('hidden');
  }, false);
}, false);

document.addEventListener('submit', function (e) {
  if (e.target.matches('.upload-form')) {
    e.preventDefault();
    uploadImage(e.target);
  }
}, false);
