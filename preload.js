const { contextBridge, dialog } = require("electron");
const fs = require("node:fs");

contextBridge.exposeInMainWorld("electronAPI", {
    openFileDialog: () =>
        dialog.showOpenDialog({
            properties: ["openFile", "multiSelections"],
            filters: [
                { name: "HTML Files", extensions: ["html", "htm"] },
                { name: "CSS Files", extensions: ["css"] },
                { name: "JavaScript Files", extensions: ["js"] }
            ]
        }),

    readFile: (filePath) => {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, "utf-8", (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
});
