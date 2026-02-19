# Simple JSON Formatter (Chrome Extension)

A lightweight, developer-focused Chrome extension to prettify, minify, and syntax-highlight JSON instantly. Features a "Magic Wand" tool to grab raw JSON directly from your active browser tab.

## Features

* **Syntax Highlighting:** VS Code-inspired dark theme for strings, numbers, booleans, and keys.
* **One-Click Formatting:** Turn messy JSON strings into readable, indented structures.
* **Minification:** Compress JSON into a single line for API testing or storage.
* **Magic Wand (🪄):** Automatically extracts text from your current tab—perfect for viewing raw API responses.
* **Copy to Clipboard:** Quickly grab your formatted results with a single click.
* **Privacy-First:** Processes everything locally in your browser. No data is ever sent to a server.

## Installation

Since this is a developer tool, you can load it directly into Chrome:

1.  **Download** this repository as a ZIP file and extract it.
2.  Open Chrome and navigate to `chrome://extensions/`.
3.  Enable **"Developer mode"** using the toggle in the top right corner.
4.  Click **"Load unpacked"**.
5.  Select the folder containing the extracted files (ensure `manifest.json` is in the root of that folder).

## How to Use the Magic Wand

1.  Navigate to a URL that returns raw JSON.
2.  Click the **Simple JSON Formatter** icon in your extension toolbar.
3.  Click the **🪄 (Magic Wand)** button.
4.  The extension will pull the text from the page and format it automatically.

## Permissions Used

* **activeTab:** To read the content of the page you are currently viewing.
* **scripting:** To execute the extraction script for the Magic Wand.
* **clipboardWrite:** To allow the "Copy" button functionality.

## License

This project is licensed under the MIT License.
