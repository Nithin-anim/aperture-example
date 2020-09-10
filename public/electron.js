const electron = require('electron');
const {
  app,
  BrowserWindow,
  ipcMain,
  Tray,
  nativeImage,
  Menu
} = electron;
const fs = require('fs');
const path = require('path');
const isDev = require('electron-is-dev');
const aperture = require('@nithin1712/aperture')();

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

  // const icon = process.platform === 'win32' ? 'icon-win.png' : 'icon-mac.png';
  // const iconPath =
  //   process.env.NODE_ENV !== 'production'
  //     ? path.join(`assets/${icon}`)
  //     : path.join(`build/assets/${icon}`);
  // tray = new Tray(nativeImage.createFromPath(iconPath));

  const base64Icon =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB6klEQVR42mNkoBAwgghdYzMBExuH6P///7OgK7h/9w7DfyBE0cTI+OfhrRtLH9y6/gFsgJNvUK6Tb/AkbDacOHqAgZGJFaQJRfzWxTN5N86enAwWtXb1KvIMje7FZQAICPALMvz6/Yfh77+/DL+B9NXTx4rvXj7fh2KAnIQog5ggP1jDlbsPGX78+g03wMXGikFDRZlh3qoNDD9+/sRuAD4XOFtbgr1x9soNho+fv5BuAHK4MzKxMFw7c5xIA84dY/jsos3wRVuK4R8HCwP70w8MgvtuMtxavRlowAWIAQY2TkU23kEYBvxlY2I44SbG8FWcF0Wc6R8wWmdtbbpRN7kerwG3zUQY7usKYk1ATP8ZPrxIaZXDMMDeSIfh4LkrDMBExXAkVIHhOz8bAz8DC0MgizhY481/XxmO//sAZr+unemPYoCqnBSDtb4Ww/2nLxgOnL3MsD9SgeEPN24DXhRNiMNwAciQ24+egV1w2lmc4YMiP1YvAOX/P7TPMAAboG/lkG/rGzIBXdErQSaGCwGKQA8zYRjwefPhrc+TW3zBBrBzckqo6pukMoEiGNkWIHyrLizCWRUdyyzAywuz+cvmIztf5PfE/P/64y0jAxGAkZtTgstK15mJh4v3x+W753/feXwGFMsgOQDKr+ZeSg5p3wAAAABJRU5ErkJggg==';
  const icon = nativeImage.createFromDataURL(base64Icon);
  tray = new Tray(icon);
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

// if (!app.isPackaged) {
//   app.whenReady().then(() => {
//     installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS])
//       .then((name) => console.log(`Added Extension:  ${name}`))
//       .catch((err) => console.log('An error occurred: ', err));
//   });
// }

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

ipcMain.on('START_RECORDING', async () => {
  await aperture.startRecording();
  console.log('Recording started')
  await aperture.isFileReady;
});

ipcMain.on('STOP_RECORDING', async () => {
  const fp = await aperture.stopRecording();
  console.log('Recording ended');
  fs.renameSync(fp, 'recording.mp4');
});

ipcMain.on('PAUSE_RECORDING', async () => {
  await aperture.pause().then(() => console.log('Paused'));
});

ipcMain.on('RESUME_RECORDING', async () => {
  await aperture.resume().then(() => console.log('Resumed'));
});
