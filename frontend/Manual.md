Előfeltételek

Node.js
npm

1. A Repó Klónozása
   Klónozd a repót a helyi gépedre az alábbi parancs használatával:

git clone https://github.com/sz-attila/Tasklify.git
cd your-repository-folder/frontend

2. Telepítsd a szükséges npm csomagokat az alábbi parancs futtatásával:

npm install

3. A Fejlesztői Szerver Futtatása

npm run dev

Ez elindítja a fejlesztői szervert az alapértelmezett 3000-es porton.

Az Alkalmazás Felépítése
A frontend alkalmazás a következő fő részekből áll:

Oldalak (pages mappa): Ez a mappa tartalmazza az alkalmazás különböző oldalait.

Komponensek (components mappa): Itt találhatók az újrahasznosítható React komponensek.

API Hívások (api mappa): Ez a mappa tartalmazza a backend API-k hívásához szükséges kódot.

Stílusok (styles mappa): Itt találhatók a globális CSS stílusok és modulok.

Kontextusok és Hookok
A projekt kontextusokat használ az állapotok kezelésére, például az AuthContext és a ModalContext.
