# Feladatkezelő Alkalmazás

Ez a projekt egy feladatkezelő alkalmazás, amelynek backend része Node.js, Express és MongoDB segítségével készült, a frontend pedig Next.js és React segítségével. Az alkalmazás lehetővé teszi a felhasználók számára, hogy regisztráljanak, bejelentkezzenek, feladatokat hozzanak létre, frissítsenek és töröljenek. Emellett tartalmaz egy dashboardot is, amelyen a feladatok statisztikái tekinthetők meg.

## Tartalomjegyzék

- [Előfeltételek](#előfeltételek)
- [Backend Beállítása](#backend-beállítása)
- [Frontend Beállítása](#frontend-beállítása)
- [Használat](#használat)
- [API Endpointok Tesztelése](#api-endpointok-tesztelése)
- [Projekt Felépítése](#projekt-felépítése)

## Előfeltételek

Mielőtt elkezdenéd, győződj meg arról, hogy az alábbi szoftverek telepítve vannak a gépeden:

- Node.js
- npm
- MongoDB

## Backend Beállítása

### 1. Klónozás után navigálj a backend mappába

cd your-repository-folder/backend

### 2. Környezeti Változók

Hozz létre egy .env fájlt a backend mappába, és add hozzá a következő környezeti változókat:

PORT=5000
MONGO_URI="your-mongodb"

### 3. Függőségek Telepítése

Telepítsd a szükséges npm csomagokat az alábbi parancs futtatásával:

npm install bcrypt
npm install mongodb
npm install mongoose
npm install next-auth
npm install cors

### 4. A Szerver Futtatása

Futtathatod a szervert az alábbi parancs segítségével:

npm run dev

Ez elindítja a szervert a .env fájlban megadott porton (alapértelmezés szerint 5000).

## Frontend Beállítása

Előfeltételek

Node.js
npm

### 1. Klónozás után navigálj a frontend mappába

cd your-repository-folder/frontend

### 2. Telepítsd a szükséges npm csomagokat az alábbi parancs futtatásával:

npm install

### 3. A Fejlesztői Szerver Futtatása

npm run dev

Ez elindítja a fejlesztői szervert az alapértelmezett 3000-es porton.

## Használat

### 1. Új felhasználó regisztrálása: Navigálj a regisztrációs oldalra (/register) és töltsd ki a regisztrációs űrlapot.

### 2. Bejelentkezés: Navigálj a bejelentkezési oldalra (/) és töltsd ki a bejelentkezési űrlapot.

### 3. Feladatok kezelése (Bejelentkezés után kezelheted a feladataidat):

- Új feladat hozzáadása
- Feladatokra kattintva módosíthatod az adott feladatot
- Szűrj rá a feladataidra a feladat neve vagy állapota alapján
- Egy feladat végrehajtása után változtathatod a feladatod állapotát

### 4. Dashboard: Megtekintheted a feladatok statisztikáit a dashboard oldalon (/dashboard).

## API Endpointok Tesztelése

Példa Kérések
Új felhasználó regisztrálása

POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
"email": "test@example.com",
"password": "yourpassword"
}

Felhasználó bejelentkezése

POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
"email": "test@example.com",
"password": "yourpassword"
}

Feladat létrehozása

POST http://localhost:5000/api/tasks/createTask
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
"title": "Sample Task",
"description": "This is a sample task"
}

Összes feladat lekérése

GET http://localhost:5000/api/tasks/getTasks
Authorization: Bearer your_jwt_token

Feladat frissítése

PUT http://localhost:5000/api/tasks/{taskId}
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
"title": "Updated Task Title",
"description": "Updated task description",
"completed": true
}

Feladat törlése

DELETE http://localhost:5000/api/tasks/{taskId}
Authorization: Bearer your_jwt_token

## Projekt Felépítése

A frontend alkalmazás a következő fő részekből áll:

Oldalak: Ez a mappa tartalmazza az alkalmazás különböző oldalait.

Komponensek: Itt találhatók az újrahasznosítható React komponensek.

API Hívások: Ez a mappa tartalmazza a backend API-k hívásához szükséges kódot.

Stílusok: Itt találhatók a globális CSS stílusok és modulok.

Kontextusok és Hookok: A projekt kontextusokat használ az állapotok kezelésére, például az AuthContext és a ModalContext.
