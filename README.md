
Documentation de l'API File Server
==================================

Cette documentation décrit les endpoints de l'API de gestion des fichiers. Elle inclut les informations sur les autorisations, les corps de requêtes JSON à fournir, et les exemples d'utilisation pour chaque endpoint.

* * * * *

Table des Matières
------------------

1.  [Endpoints d'Authentification](#endpoints-dauthentification)
    -   [Inscription (`/auth/register`)](#inscription-authregister)
    -   [Connexion (`/auth/login`)](#connexion-authlogin)
2.  [Endpoints de Gestion des Fichiers](#endpoints-de-gestion-des-fichiers)
    -   [Upload de Fichier (`/files/upload`)](#upload-de-fichier-filesupload)
    -   [Téléchargement de Fichier (`/files/download/:fileId`)](#t%C3%A9l%C3%A9chargement-de-fichier-filesdownloadfileid)
3.  [Endpoints de Partage de Fichier](#endpoints-de-partage-de-fichier)
    -   [Créer un Lien de Partage (`/share/create`)](#cr%C3%A9er-un-lien-de-partage-sharecreate)

* * * * *

Endpoints d'Authentification
----------------------------

### Inscription (`/auth/register`)

-   **URL** : `http://localhost:3000/auth/register`

-   **Méthode** : `POST`

-   **Description** : Crée un nouvel utilisateur dans le système.

-   **Corps de la Requête (JSON)** :

    json

    `{
      "username": "testuser",
      "password": "password123"
    }`

-   **Réponse de Succès** :

    json

    `{
      "message": "User registered successfully"
    }`

### Connexion (`/auth/login`)

-   **URL** : `http://localhost:3000/auth/login`

-   **Méthode** : `POST`

-   **Description** : Connecte un utilisateur et retourne un token JWT.

-   **Corps de la Requête (JSON)** :

    json

    `{
      "username": "testuser",
      "password": "password123"
    }`

-   **Réponse de Succès** :

    json

    `{
      "token": "<JWT_TOKEN>"
    }`

**Note** : Conserve le token JWT retourné, car il sera requis dans le header `Authorization` pour les requêtes suivantes.

* * * * *

Endpoints de Gestion des Fichiers
---------------------------------

### Upload de Fichier (`/files/upload`)

-   **URL** : `http://localhost:3000/files/upload`

-   **Méthode** : `POST`

-   **Description** : Permet à l'utilisateur d'uploader un fichier.

-   **Autorisation** : Token JWT requis

-   **Headers** :

    -   `Authorization: Bearer <JWT_TOKEN>`
-   **Corps de la Requête (Form-data)** :

    -   **Key** : `file` (sélectionnez un fichier depuis votre système local)
-   **Réponse de Succès** :

    json

    Copier le code

    `{
      "message": "File uploaded successfully",
      "file": {
        "userId": "5f8d04e2b5f4d458e1fa734c",
        "filename": "Docker.pdf",
        "path": "uploads/1638394838477-Docker.pdf",
        "size": 1048576,
        "uploadDate": "2023-10-29T18:15:00.000Z"
      }
    }`

### Téléchargement de Fichier (`/files/download/:fileId`)

-   **URL** : `http://localhost:3000/files/download/:fileId`

-   **Méthode** : `GET`

-   **Description** : Télécharge un fichier existant par son `fileId`.

-   **Autorisation** : Token JWT requis

-   **Headers** :

    -   `Authorization: Bearer <JWT_TOKEN>`
-   **Réponse de Succès** : Télécharge le fichier spécifié.

* * * * *

Endpoints de Partage de Fichier
-------------------------------

### Créer un Lien de Partage (`/share/create`)

-   **URL** : `http://localhost:3000/share/create`

-   **Méthode** : `POST`

-   **Description** : Crée un lien de partage temporaire pour un fichier.

-   **Autorisation** : Token JWT requis

-   **Headers** :

    -   `Authorization: Bearer <JWT_TOKEN>`


-   **Corps de la Requête (JSON)** :


    {
      "fileId": "<fileId>",
      "expiresInHours": 1
    }


-   **Réponse de Succès** :


    {
      "link": "/share/unique_share_link"
    }

* * * * *

Notes sur les Autorisations
---------------------------

-   Les endpoints `/files/upload`, `/files/download/:fileId`, et `/share/create` nécessitent un token JWT valide. Ce token doit être fourni dans le header `Authorization` sous le format suivant :

    makefile

    `Authorization: Bearer <JWT_TOKEN>`

-   Le token JWT peut être obtenu en utilisant l'endpoint de connexion `/auth/login`.

* * * * *

Exemple d'Utilisation des Headers dans Postman
----------------------------------------------

Dans chaque requête qui nécessite un token JWT, ajoute le header suivant dans Postman :

-   **Key** : `Authorization`
-   **Value** : `Bearer <JWT_TOKEN>`

Remplace `<JWT_TOKEN>` par le token obtenu lors de la connexion.
