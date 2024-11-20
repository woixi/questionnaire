Инструкции по развертыванию Questionnaire
Этот документ содержит пошаговые инструкции по настройке и развертыванию приложения Questionnaire в кластере Kubernetes. Также включены сведения об изменениях в проекте, а также как собрать и развернуть приложение.

Изменения в проекте
Backend:

В /src/environments изменен URI для подключения к MongoDB.
Frontend:

В /src/environments изменены свойства server и url, чтобы приложение подключалось к локально работающему бэкенду.

1. Применение манифестов Kubernetes

Выполните команды последовательно:

kubectl apply -f /questionnaire/mongodb
kubectl apply -f /questionnaire/nginx
kubectl apply -f /questionnaire/frontend
kubectl apply -f /questionnaire/backend

2. Сборка локальных Docker-образов
Проект состоит из двух основных компонентов: frontend и backend. Соберите их Docker-образы локально, выполнив команды ниже:

Сборка образа Frontend:
docker build -t frontend:prod .

Сборка образа Backend:
docker build -t backend:prod .
