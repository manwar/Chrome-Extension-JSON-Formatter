document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const input        = document.getElementById('jsonInput');
    const output       = document.getElementById('jsonOutput');
    const errorElement = document.getElementById('errorMessage');
    
    // 1. Format Logic
    document.getElementById('formatBtn').addEventListener('click', () => {
        processJSON((obj) => JSON.stringify(obj, null, 2));
    });

    // 2. Minify Logic
    document.getElementById('minifyBtn').addEventListener('click', () => {
        processJSON((obj) => JSON.stringify(obj));
    });

    // 3. Copy Logic
    document.getElementById('copyBtn').addEventListener('click', () => {
        const textToCopy = output.classList.contains('hidden') ? input.value : output.innerText;
        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy);
            const btn = document.getElementById('copyBtn');
            btn.innerText = 'Copied!';
            setTimeout(() => btn.innerText = 'Copy', 2000);
        }
    });

    // 4. Magic Wand (Grab JSON from Page)
	document.getElementById('magicBtn').addEventListener('click', async () => {
		try {
			// Attempt to get the current tab
			const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
			const tab = tabs[0];

			if (!tab) {
				showError("Chrome cannot find the active tab. Try clicking the page first.");
				return;
			}

			// Execute the injection
			const injection = await chrome.scripting.executeScript({
				target: { tabId: tab.id },
				func: () => document.documentElement.innerText
			});

			if (injection && injection[0].result) {
				input.value = injection[0].result;
				document.getElementById('formatBtn').click();
			}
		} catch (err) {
			console.error("Magic Wand Error:", err);
			showError("Error: " + err.message);
		}
	});

    // Helper: Core Processing Function
    function processJSON(formatFn) {
        try {
            const rawValue = input.value.trim();
            if (!rawValue) return;

            const obj = JSON.parse(rawValue);
            const processed = formatFn(obj);
            
            output.innerHTML = syntaxHighlight(processed);
            output.classList.remove('hidden');
            errorElement.classList.add('hidden');
        } catch (e) {
            showError("Invalid JSON: " + e.message);
        }
    }

    function showError(msg) {
        errorElement.innerText = msg;
        errorElement.classList.remove('hidden');
        output.classList.add('hidden');
    }
});

/**
 * Syntax Highlighting Logic
 */
function syntaxHighlight(json) {
    if (!json) return "";
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls = 'json-number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'json-key';
            } else {
                cls = 'json-string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'json-boolean';
        } else if (/null/.test(match)) {
            cls = 'json-null';
        }
        return `<span class="${cls}">${match}</span>`;
    });
}