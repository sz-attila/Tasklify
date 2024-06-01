Backend Beállítási Útmutató
Ez az útmutató lépésről lépésre bemutatja, hogyan állítsuk be és futtassuk a backend szervert az alkalmazáshoz.

Előfeltételek

Node.js
npm
MongoDB

1. A Repó Klónozása
   Klónozd a repót a helyi gépedre az alábbi parancs használatával:

git clone https://github.com/sz-attila/Tasklify.git
cd your-repository-folder/backend

2. Környezeti Változók
   Hozz létre egy .env fájlt a projekt gyökérkönyvtárában, és add hozzá a következő környezeti változókat:

PORT=5000
MONGO_URI=""

3. Függőségek Telepítése
   Telepítsd a szükséges npm csomagokat az alábbi parancs futtatásával:

npm install bcrypt
npm install mongodb
npm install mongoose
npm install next-auth
npm install cors

4. A Szerver Futtatása
   Futtathatod a szervert az alábbi parancs segítségével:

npm run dev

Ez elindítja a szervert a .env fájlban megadott porton (alapértelmezés szerint 5000).

Az Endpointok Tesztelése

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
