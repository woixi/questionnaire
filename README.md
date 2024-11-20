Инструкции по развертыванию Questionnaire Этот документ содержит пошаговые инструкции по настройке и развертыванию приложения Questionnaire в кластере Kubernetes. Также включены сведения об изменениях в проекте, а также как собрать и развернуть приложение.

Изменения в проекте Backend:

В /src/environments изменен URI для подключения к MongoDB.

Образы содержатся в открытом репозитории Docker Hub
https://hub.docker.com/repository/docker/woixi/questionnaire

Так же нужно добавить 127.0.0.1 questionnaire.local в /etc/hosts

Инструкции по деплою в kubernetes:
1. Устанавливаем nginx-ingress
```
helm install ingress-nginx ingress-nginx/ingress-nginx --namespace ingress-nginx --create-namespace
```
2. Применяем манифесты последовательно
```
kubectl apply -f your-repository/mongodb.yaml
kubectl apply -f your-repository/ingress.yaml
kubectl apply -f your-repository/frontend-srv-deployment.yaml
kubectl apply -f your-repository/backend-srv-deployment.yaml
```
3. Проверяем что все контейнеры запущены и находятся в статусе running kubectl get pods, так же проверям srv kubectl get srv
4. В случае если все плохо и статусы показывают иной вариант событий рекомендуется сделать kubectl rollout restart deployment
```
kubectl rollout restart deployment frontend-deployment
kubectl rollout restart deployment backend-deployment
```
Так же была добавлена возможность все задеплоить одной командой, правда я сам не знаю сработает это или нет, если у вас конечно есть хелм, можно задеплоить все одной командой! :) 
```
helm install questionnaire-app your-repository/helm-chart
```

Инструкция по деплою в миникуб:

1. Запустите Миникуб и активируйте Ingress:
```
minikube start --driver=docker
minikube addons enable ingress
```
2. Проверка доступа к Миникубу
Убедитесь, что kubectl работает с кластером Minikube:
```
kubectl config use-context minikube
```
3. Настройка /etc/hosts
Добавьте в файл /etc/hosts IP-адрес Minikube и домен questionnaire.local:
```
echo "$(minikube ip) questionnaire.local" | sudo tee -a /etc/hosts
```
4. Применяем наши манифесты:
```
kubectl apply -f your-repository/mongodb.yaml
kubectl apply -f your-repository/frontend-srv-deployment.yaml
kubectl apply -f your-repository/backend-srv-deployment.yaml
kubectl apply -f your-repository/ingress.yaml
```
5. Если вы хотите развернуть приложение с помощью Helm, добавьте локальный путь к вашему чарту и выполните команду:
```
helm install questionnaire-app ./your-repository/helm-chart
```
