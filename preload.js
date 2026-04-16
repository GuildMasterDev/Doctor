const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('doctor', {
  isElectron: true,
  platform: process.platform,
});
