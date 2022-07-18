const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('lunowse_api', {
    hideWin: async (data) => await ipcRenderer.invoke('hideWin', data),
    maxMin: async (data) => await ipcRenderer.invoke('maxMin', data),
    close: async (data) => await ipcRenderer.invoke('close', data),

    on: (channel, callback) => ipcRenderer.on(channel, (event, argv) => callback(event, argv))
});