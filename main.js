const { app, BrowserWindow, screen, globalShortcut } = require('electron');
const path = require('path');
const electronLocalshortcut = require('electron-localshortcut'); // Importa o pacote para atalhos globais

let win; // Definindo a variável global da janela

function createWindow() {
  // Obtendo a resolução da tela
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize; // Resolução da tela sem a barra de tarefas

  win = new BrowserWindow({
    width: 800,               // Defina o tamanho desejado
    height: 600,              // Defina o tamanho desejado
    frame: false,             // Remove as bordas da janela
    show: true,
    transparent: true,        // Torna o fundo da janela transparente
    alwaysOnTop: true,        // A janela ficará sempre por cima
    resizable: false,         // Não permite redimensionamento da janela
    movable: false,           // A janela não pode ser movida com o mouse
    icon: path.join(__dirname, 'icone.png'), // Define o ícone do aplicativo
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: false,
      nodeIntegration: true
    }
  });

  win.loadFile('index.html');
  win.setIgnoreMouseEvents(true, { forward: true });

  // Ajuste a posição da janela na tela, 20px de distância das bordas superior e direita
  const xPos = width - 820; // 20px do lado direito da tela
  const yPos = 20;          // 20px do topo

  win.setBounds({
    x: xPos,                 // Posição X
    y: yPos,                 // Posição Y
    width: 800,              // Largura
    height: 600              // Altura
  });

  // Atalho global para F11 - envia evento para o renderer
  globalShortcut.register('F11', () => {
    if (win && win.webContents) {
      win.webContents.send('toggle-ui');
    }
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit(); // Apenas encerra o app se não for no macOS
});

// Garante que os atalhos sejam limpos ao fechar
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
