(function () {
	const root = document.documentElement;
	const STORAGE_KEY = 'theme';

	function getSavedTheme() {
		try {
			return localStorage.getItem(STORAGE_KEY);
		} catch {
			return null;
		}
	}

	function getSystemTheme() {
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	function applyTheme(theme) {
		if (theme === 'dark') {
			root.classList.add('dark');
			root.setAttribute('data-theme', 'dark');
		} else {
			root.classList.remove('dark');
			root.setAttribute('data-theme', 'light');
		}
	}

	function setTheme(theme) {
		applyTheme(theme);
		try {
			localStorage.setItem(STORAGE_KEY, theme);
		} catch {}
	}

	function initTheme() {
		const saved = getSavedTheme();
		const theme = saved === 'dark' || saved === 'light' ? saved : getSystemTheme();
		applyTheme(theme);
	}

	// Initialize before first paint to prevent flash
	initTheme();

	// Expose for UI toggles
	window.toggleTheme = function () {
		const current = root.classList.contains('dark') ? 'dark' : 'light';
		const next = current === 'dark' ? 'light' : 'dark';
		console.log("toggleTheme called", next);
		setTheme(next);
	};

	window.getTheme = function () {
		return root.classList.contains('dark') ? 'dark' : 'light';
	};

	// Keep in sync if system preference changes and no explicit preference is saved
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
		if (getSavedTheme() === null) {
			applyTheme(e.matches ? 'dark' : 'light');
		}
	});
})();
