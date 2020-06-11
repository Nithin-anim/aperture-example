const electron = require('electron');
const { app, BrowserWindow, ipcMain, Tray, nativeImage, Menu } = electron;
const path = require('path');
const isDev = require('electron-is-dev');
if (!app.isPackaged) {
  require('electron-reload');
  const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS,
  } = require('electron-devtools-installer');
}

let mainWindow;
let tray;
let result;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 450,
    show: false,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  // mainWindow.on('closed', () => {
  //   mainWindow = null;
  //   app.quit();
  // });

  mainWindow.on('blur', () => {
    mainWindow.hide();
  });

  const icon = process.platform === 'win32' ? 'icon-win.png' : 'icon-mac.png';
  // const iconPath = path.join('assets', icon);
  // console.log('ICON PATH', path.join('assets', icon));
  const iconPath =
    process.env.NODE_ENV !== 'production'
      ? path.join(`assets/${icon}`)
      : path.join(__dirname, `../app.asar/${icon}`);

  tray = new Tray(nativeImage.createFromPath(iconPath));
  tray.on('click', (event, bounds) => {
    const { x, y } = bounds;
    const { height, width } = mainWindow.getBounds();

    if (!mainWindow.isVisible()) {
      const yPosition = process.platform === 'darwin' ? y : y - height;
      mainWindow.setBounds({
        x: x - width / 2,
        y: yPosition,
        width,
        height,
      });
      mainWindow.show();
    } else {
      mainWindow.hide();
    }
  });
  tray.on('right-click', () => {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: 'Quit',
        click: () => app.quit(),
      },
    ]);
    tray.popUpContextMenu(menuConfig);
  });
}

app.on('ready', createWindow);
app.dock.hide();

if (!app.isPackaged) {
  app.whenReady().then(() => {
    installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS])
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err));
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('calculate', (event, operand1, operand2, operation) => {
  if (operation === '+') {
    result = operand1 + operand2;
  } else if (operation === '-') {
    result = operand1 - operand2;
  } else if (operation === '*') {
    result = operand1 * operand2;
  } else if (operation === '/') {
    result = Math.ceil(operand1 / operand2);
  }
  mainWindow.webContents.send('result', result);
});
