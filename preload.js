const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  openExternal: (url) => {
    window.open(url, '_blank');
  }
});