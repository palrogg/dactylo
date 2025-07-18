# User API

## Étapes

~~Utiliser / s'inspirer d'un boilerplate? https://github.com/specialtactics/laravel-api-boilerplate?tab=readme-ov-file~~
~~Ou un package comme https://github.com/Lomkit/laravel-rest-api?~~

* Utiliser api-platform.com
* Tester à SQLite, viser MariaDB
* ~~LoginRadius, auth0, WorkOS?~~ Plutôt Sanctum
* colonnes table `user`: id, pseudo, e-mail, progression (compléter api-platform / sanctum)
* colonnes table `text`: id, name, description, text, length, private, user_id

- [ ] Login anonyme

## Tester en local

(Écrit de tête, à tester)

1. `composer install`

1. Besoin de Vite pour browser SwaggerUI? `npm install`

1. Recréer .env à partir de .env.example (`cp ...`)

1. Générer une clé: `php artisan key:generate`

1. Exécuter les scripts de migration pour refaire la db?

1. `php artisan serve`