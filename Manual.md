Docker használata

1. Lépés: Dockerfile-ok létrehozása

Már megtalálhatók a szükséges Dockerfile-ok a backend és a frontend mappákban.

2. Lépés: Docker Compose használata

A docker-compose.yml fájl definiálja az alkalmazás szolgáltatásait.

Futtasd az alábbi parancsot a konténerek elindításához:

docker-compose up --build

Kubernetes használata

1. Docker Images feltöltése a Docker Hub-ra

docker tag tasklify-backend <your-dockerhub-username>/tasklify-backend:latest
docker tag tasklify-frontend <your-dockerhub-username>/tasklify-frontend:latest

docker push <your-dockerhub-username>/tasklify-backend:latest
docker push <your-dockerhub-username>/tasklify-frontend:latest

2. A k8s/namespace.yaml fájlban definiáltam a tasklify namespace-t.

kubectl apply -f k8s/namespace.yaml

3. MongoDB Deployment és Service létrehozása

kubectl apply -f k8s/mongo-deployment.yaml
kubectl apply -f k8s/mongo-service.yaml

4. Backend Deployment és Service létrehozása

kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml

5. Frontend Deployment és Service létrehozása

kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml

6. Alkalmazás elérése

kubectl get services -n tasklify

kubectl port-forward svc/frontend 8080:80 -n tasklify

Ezután az alkalmazást a következő címen érheted el: http://localhost:8080.
