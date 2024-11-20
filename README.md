Инструкции по развертыванию Questionnaire Этот документ содержит пошаговые инструкции по настройке и развертыванию приложения Questionnaire в кластере Kubernetes. Также включены сведения об изменениях в проекте, а также как собрать и развернуть приложение.

Изменения в проекте Backend:

В /src/environments изменен URI для подключения к MongoDB.

Образы содержатся в открытом репозитории Docker Hub
https://hub.docker.com/repository/docker/woixi/questionnaire

Так же нужно добавить 127.0.0.1 questionnaire.local в /etc/hosts

Инструкции по деплою:
1. Устанавливаем nginx-ingress
```
helm install ingress-nginx ingress-nginx/ingress-nginx --namespace ingress-nginx --create-namespace
```
2. Применяем манифесты последовательно
```
kubectl apply -f your-reposetory/mongodb.yaml
kubectl apply -f your-reposetory/ingress.yaml
kubectl apply -f your-reposetory/frontend-srv-deployment.yaml
kubectl apply -f your-reposetory/backend-srv-deployment.yaml
```
3. Проверяем что все контейнеры запущены и находятся в статусе running kubectl get pods, так же проверям srv kubectl get srv
4. В случае если все плохо и статусы показывают иной вариант событий рекомендуется сделать kubectl rollout restart deployment
```
kubectl rollout restart deployment frontend-deployment
kubectl rollout restart deployment backend-deployment
```
