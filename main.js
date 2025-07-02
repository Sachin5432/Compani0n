const { app, BrowserWindow } = require('electron')

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 100,
    frame: false,
    transparent: true,
    alwaysOnTop: true,    // Keep above all other windows
    movable: true,        // Allow window to be moved
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  win.loadFile('index.html')
  win.setMenuBarVisibility(false)
  // Redundant but explicit:
  win.setAlwaysOnTop(true, 'screen')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  // Quit when all windows are closed (default behavior)
  app.quit()
})
