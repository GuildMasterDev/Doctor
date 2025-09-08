const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

let mainWindow = null;

// Handle certificate errors
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  event.preventDefault();
  callback(true);
});

// Prevent multiple instances
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    // Someone tried to run a second instance, focus our window instead
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  function createWindow() {
    // Create the browser window
    mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      minWidth: 800,
      minHeight: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
        nodeIntegration: false,
        webSecurity: true
      },
      title: 'Medical Resources Guide',
      show: false // Don't show until ready
    });

    // Load the index.html file
    mainWindow.loadFile('index.html').catch(err => {
      console.error('Failed to load index.html:', err);
    });

    // Show window when ready
    mainWindow.once('ready-to-show', () => {
      mainWindow.show();
    });

    // Handle external links
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
      shell.openExternal(url);
      return { action: 'deny' };
    });

    // Prevent navigation away from the app
    mainWindow.webContents.on('will-navigate', (event, url) => {
      if (url !== mainWindow.webContents.getURL()) {
        event.preventDefault();
        shell.openExternal(url);
      }
    });

    // Handle window closed
    mainWindow.on('closed', () => {
      mainWindow = null;
    });

    // Handle unresponsive
    mainWindow.on('unresponsive', () => {
      console.log('Window became unresponsive');
    });

    mainWindow.webContents.on('render-process-gone', (event, details) => {
      console.log('Render process gone:', details);
    });
  }

  // This method will be called when Electron has finished initialization
  app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
      // On macOS, re-create window when dock icon is clicked
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  });

  // Quit when all windows are closed
  app.on('window-all-closed', () => {
    // On macOS, keep app running even when all windows are closed
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  // Handle app errors
  app.on('render-process-gone', (event, webContents, details) => {
    console.error('Render process gone:', details);
  });

  app.on('child-process-gone', (event, details) => {
    console.error('Child process gone:', details);
  });
}