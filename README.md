# Bodycam Overlay
BodyCam overlay para jogar vendo o overlay da bodycam enquanto grava

# parar instalar as dependencias utilize (precisa ter o node instalado)
npm i 

# mude o que quiser no index.html

# para buildar utilize

npx electron-packager . DashCamOverlayElMinatone --platform=win32 --arch=x64 --out=release-builds --icon=icone.png

# o build ficará dentro da pasta release, só abrir o .exe e ser feliz, F11 oculta o overlay, e caso ele não apareça de Alt+Tab e clique no icone amarelo do app na barra do windows
