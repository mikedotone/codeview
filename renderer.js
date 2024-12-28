const htmlInput = document.getElementById("htmlInput");
const cssInput = document.getElementById("cssInput");
const jsInput = document.getElementById("jsInput");
const previewButton = document.getElementById("previewButton");
const previewArea = document.getElementById("previewArea");
const openCodeFilesButton = document.getElementById("openCodeFilesButton");

openCodeFilesButton.addEventListener("click", () => {
    window.electronAPI.openFileDialog().then((result) => {
        if (!result.canceled && result.filePaths.length > 0) {
            result.filePaths.forEach((filePath) => {
                window.electronAPI
                    .readFile(filePath)
                    .then((data) => {
                        if (filePath.endsWith(".html") || filePath.endsWith(".htm")) {
                            htmlInput.value = data;
                        } else if (filePath.endsWith(".css")) {
                            cssInput.value = data;
                        } else if (filePath.endsWith(".js")) {
                            jsInput.value = data;
                        }
                    })
                    .catch((err) => {
                        console.error("Failed to read the file:", err);
                    });
            });
        }
    });
});

function generatePreview(html, css, js) {
    try {
        const combinedHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
      </html>
    `;

        const blob = new Blob([combinedHtml], { type: "text/html" });
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error("Error generating preview:", error);
        return "";
    }
}

previewButton.addEventListener("click", () => {
    const htmlCode = htmlInput.value;
    const cssCode = cssInput.value;
    const jsCode = jsInput.value;

    const previewUrl = generatePreview(htmlCode, cssCode, jsCode);
    previewArea.src = previewUrl;
});
