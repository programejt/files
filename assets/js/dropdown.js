const dropdownCSSSelector = '.dropdown';

function toggleDropdowns(e) {
	var target = e.target;
	var button = target.closest('.dropdown-toggle');
	var activeDropdown = null;

	if (button) {
		activeDropdown = button.parentElement.querySelector(dropdownCSSSelector);
    if (activeDropdown) {
		  activeDropdown.classList.toggle('visible');
    }
	} else {
		activeDropdown = target.closest(dropdownCSSSelector);
	}

  let allDropdowns = document.querySelectorAll(dropdownCSSSelector);

  for (const dropdown of allDropdowns) {
    if (dropdown !== activeDropdown) {
      dropdown.classList.remove('visible');
    }
  }
}

document.addEventListener(
  'click',
  toggleDropdowns,
  false
);