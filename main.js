const { app, BrowserWindow } = require('electron');

// TEMPORARY: Ignore certificate errors for testing
app.commandLine.appendSwitch('ignore-certificate-errors'); 

function createWindow() {
  const win = new BrowserWindow({ width: 800, height: 600 });
  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
