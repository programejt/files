function setupInputFile(input) {
	var files = input.files;
	var fl = files.length;
	var files_amount_container = input.parentElement.nextElementSibling;
	var files_list_container = files_amount_container.nextElementSibling;

	files_amount_container.children[0].textContent = fl;

	files_list_container.innerHTML = '';

	if (fl > 0) {
		for (var i = 0; i < fl; ++i) {
			let li = document.createElement('li');
			li.className = 'file';
			li.textContent = files[i].name;
			files_list_container.appendChild(li);
		}
	} else {
		files_list_container.textContent = files_list_container.getAttribute('data-empty-text');
	}
}

function setupAllInputFile() {
	var inputs = document.body.querySelectorAll('input[type="file"]');

	for (var i = 0; i < inputs.length; ++i) {
		setupInputFile(inputs[i]);
	}
}

function inputFileOnChange(e) {
	setupInputFile(e.target);
}

function toggle_input_files_dropdowns(e) {
	var target = $(e.target);
	var button = target.closest('.toggle-selected-files-dropdown');
	var files_dropdown = null;

	if (button.length) {
		files_dropdown = button.next();
		files_dropdown.toggleClass('visible');
	} else {
		var tmp = target.closest('.files-list');
		if (tmp.length) {
			files_dropdown = tmp;
		}
	}

	$('.files-list').not(files_dropdown).removeClass('visible');
}

function initInputFile() {
	setupAllInputFile();
}

window.addEventListener('DOMContentLoaded', initInputFile, false);
document.addEventListener('change', inputFileOnChange, false);
document.addEventListener('click', toggle_input_files_dropdowns, false);