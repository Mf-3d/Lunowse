// モジュール読み込み
const electron = require('electron');

// ウィンドウの変数
let win;

// ウィンドウサイズの変数
let winSize;

// ビューの変数
let menu_bv;
let main_bv;

// メニューの高さ
let viewY = 60;

// メインウィンドウを生成
function nw() {
  // 消さないでね
  electron.app.commandLine.appendSwitch('--autoplay-policy','no-user-gesture-required');
  win = new electron.BrowserWindow({
      resizable: true,
      hasShadow:  true,
      width: 500,
      height: 400,
      frame: false,
      toolbar: false,
      alwaysOnTop: false,
      // icon: `${__dirname}/src/icon.png`,
      // webPreferences: {
      //   preload: `${__dirname}/src/preload/preload.js`
      // }
  });

  winSize = win.getSize();

  // ビューを生成
  n_menu();
  n_bv();

  menu_bv.webContents.loadFile(`${__dirname}/src/index.html`);
  win.addBrowserView(menu_bv);
  main_bv.webContents.loadFile(`${__dirname}/src/resource/index.html`);
  win.addBrowserView(main_bv);
  menu_bv.setBounds({ x: 0, y: 0, width: winSize[0], height: viewY });
  main_bv.setBounds({ x: 0, y: viewY, width: winSize[0], height: winSize[1] - viewY });

  win.on('closed', function() {
    win = null;
  });

  win.on('resize', () => {
    winSize = win.getSize();
    menu_bv.setBounds({ x: 0, y: 0, width: winSize[0], height: viewY });
    main_bv.setBounds({ x: 0, y: viewY, width: winSize[0], height: winSize[1] - viewY });
  });
}

// メニューバーを生成
function n_menu() {
  menu_bv = new electron.BrowserView({      
    width: `${winSize[0]}`,
    webPreferences: {
      preload: `${__dirname}/src/preload.js`
    }
  });

  menu_bv.setBounds({ x: 0, y: 0, width: winSize[0], height: viewY });
}

function n_bv() {
  main_bv = new electron.BrowserView({      
    width: `${winSize[0]}`,
    webPreferences: {
      preload: `${__dirname}/src/preload.js`
    }
  });

  menu_bv.setBounds({ x: 0, y: viewY, width: winSize[0], height: winSize[1] - viewY });
}

// macOS以外はウィンドウをすべて閉じたらアプリを終了するように
electron.app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    electron.app.quit();
  }
});

// アプリを起動するための関数
// よくわからんけど「()」を付けちゃいかんらしい
electron.app.on('ready',nw);