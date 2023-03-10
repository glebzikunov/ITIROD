# Сервис регистрации и учёта на СТО

## Описание

**Сервис регистрации и учёта на СТО** — сервис, позволяющий пользователям бронировать посещение на СТО, а так же просматривать историю их посещений.

## Функциональные возможности

  * **Регистрация и авторизация** 
  * **Редактирование профиля** — Пользователи имеют возможность изменить изображение своего профиля, адрес электронной почты(username), пароль для входа в аккаунт.
  * **История бронирования** — На странице учета отображаются вся история бронирования.
  * **Отправление E-mail c информацией о предстоящем сервисе** — После заполнения формы для бронирования посещения, на странице учета, отправляется E-mail владельцу СТО.
  * **Изменение статуса бронирования** — После того как E-mail о бронировании доходит до владелца СТО, администратор связывается с клиентом с помощью контактных данных, указанных в форме, и либо подтверждает бронирование, либо отменяет его.
  * **Сортировка истории бронирования** — На странице учета история бронирования может быть отсортирована по статусу бронирования, по дате бронирования.
  
# Описание сущностей (таблиц)
## Users (Пользователи)
|имя поля | тип | ограничения | описание |
|:---:|:---:|:---:|:---:|
| id | pk | not null; unique | первичный ключ |
| email | VARCHAR(50) | not null | почта пользователя |
| password | VARCHAR(255) | not null | пароль пользователя |
| role_id | fk(INT) | not null | роль пользователя |

## Roles (Роли пользователей)
|имя поля | тип | ограничения | описание |
|:---:|:---:|:---:|:---:|
| id | pk | not null; unique | первичный ключ |
| name | VARCHAR(50) | not null | название роли |

## Services (Обслуживания)
|имя поля | тип | ограничения | описание |
|:---:|:---:|:---:|:---:|
| id | pk | not null; unique | первичный ключ |
| service_type_id | fk(INT) | not null | тип обслуживания |

## Services_Type (Типы обслуживания)
|имя поля | тип | ограничения | описание |
|:---:|:---:|:---:|:---:|
| id | pk | not null; unique | первичный ключ |
| name | VARCHAR(50) | not null | название типа обслуживания |

## Макет
https://www.figma.com/file/txo7nQ9jJROl1ZG3885G8N/ServiceStation?node-id=0%3A1&t=E8DsfH80mGfbLB7N-1
