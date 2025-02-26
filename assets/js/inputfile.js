function setupInputFile(input) {
	var files = input.files;
	var filesAmount = files.length;
	var filesAmountContainer = input.parentElement.nextElementSibling;
	var filesListContainer = filesAmountContainer.nextElementSibling;

	filesAmountContainer.children[0].textContent = filesAmount;

	filesListContainer.innerHTML = '';

	if (filesAmount > 0) {
		for (const file of files) {
			let li = document.createElement('li');
			li.className = 'dropdown-item file';
			li.textContent = file.name;
			filesListContainer.appendChild(li);
		}
	} else {
		filesListContainer.textContent = filesListContainer.getAttribute('data-empty-text');
	}
}

function setupAllInputFile() {
	var inputs = document.body.querySelectorAll('input[type="file"]');

	for (const input of inputs) {
		setupInputFile(input);
	}
}

function inputFileOnChange(e) {
	setupInputFile(e.target);
}

document.addEventListener(
  'DOMContentLoaded',
  setupAllInputFile,
  false
);

document.addEventListener(
  'change',
  inputFileOnChange,
  false
);