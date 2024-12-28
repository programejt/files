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
			li.className = 'file';
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

function toggleInputactiveDropdowns(e) {
	var target = e.target;
	var button = target.closest('.toggle-selected-files-dropdown');
	var activeDropdown = null;

	if (button) {
		activeDropdown = button.nextElementSibling;
		activeDropdown.classList.toggle('visible');
	} else {
		var tmp = target.closest('.files-list');
		if (tmp) {
			activeDropdown = tmp;
		}
	}

  let allDropdowns = document.querySelectorAll('.files-list');

  for (const dropdown of allDropdowns) {
    if (dropdown != activeDropdown) {
      dropdown.classList.remove('visible')
    }
  }
}

function initInputFile() {
	setupAllInputFile();
}

document.addEventListener(
  'DOMContentLoaded',
  initInputFile,
  false
);

document.addEventListener(
  'change',
  inputFileOnChange,
  false
);

document.addEventListener(
  'click',
  toggleInputactiveDropdowns,
  false
);