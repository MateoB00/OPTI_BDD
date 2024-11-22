![MCD](https://github.com/user-attachments/assets/1d05bc2e-076e-4252-a56d-f46578880145)
# Projet NestJS - Gestion des Soirées 
## Installation
### Prérequis
Node.js (version 18 ou supérieure)
PostgreSQL (ou une base compatible SQL prise en charge par TypeORM)
#### Étapes d'installation
Clonez ce dépôt :
```
git clone git@github.com:MateoB00/OPTI_BDD.git
cd OPTI_BDD
cd back/
```
Installez les dépendances :
```
npm install
```
Configurez vos variables d'environnement :
Créez un fichier .env à la racine du projet et ajoutez-y les lignes suivantes :
```
DB_TYPE='postgres'
DB_HOST='test'
DB_PORT='9999'
DB_USERNAME='username'
DB_PASSWORD='password'
DB_DATABASE='database'
JWT_SECRET='your_jwt_secret_key'
```

Démarrez le projet en mode développement :

```
npm run start:dev
```
Pour démarrer en production :

```
npm run build
npm run start:prod
```

# Concepts et bonnes pratiques de développement
## 1. Gestion des requêtes SQL et optimisation des performances
### Problème des requêtes N+1
Le problème des requêtes N+1 survient lorsque votre code déclenche plusieurs requêtes inutiles pour récupérer des relations, ce qui peut fortement dégrader les performances.
Exemple problématique avec une entité Party et ses Participants :

```
const parties = await this.partyRepository.find();
for (const party of parties) {
  const participants = await this.participantRepository.find({
    where: { partyId: party.id },
  });
  console.log(participants);
}
```

Ici, une requête est exécutée pour chaque party, ce qui crée un problème de surcharge si les données sont nombreuses.
Solution : Écrire des relations avec des Join explicites
Utilisez TypeORM avec QueryBuilder pour récupérer toutes les données nécessaires en une seule requête SQL :

```
const partiesWithParticipants = await this.partyRepository
  .createQueryBuilder('party')
  .leftJoinAndSelect('party.participants', 'participant')
  .getMany();
console.log(partiesWithParticipants);
```

Ou pour le manager de l'entité avec pagination, car il vallait mieux écrire une requête SQL en dur, car TypeOrm déclenche deux requêtes pour la pagination
```
await this.partyRepository.manager.query(
      `
        SELECT DISTINCT 
                *
        FROM party 
        LEFT JOIN type_party 
        ON party."typePartyId" = type_party.id
        LEFT JOIN place
        ON party."placeId" = place.id
        LEFT JOIN "user"
        ON party."organizerId" = "user".id
        ORDER BY party."startedAt" ASC
        LIMIT $1 OFFSET $2;
      `,
      [pageSize, (page - 1) * pageSize],
    );
```
Ces méthodes regroupe les données via une jointure SQL optimisée.
Exemple : back/src/modules/party/party.service.ts
## 2. Vue matérialisée : party_participant_summary
Une vue matérialisée permet de créer une table stockant le résultat d'une requête SQL complexe, ce qui améliore considérablement les performances des lectures. Voici un exemple d'implémentation pour la vue party_participant_summary :

Création de la vue
La requête SQL pour créer la vue :

``` 
CREATE MATERIALIZED VIEW party_participant_summary AS
SELECT 
    p.id AS party_id,
    p.name AS party_name,
    COUNT(pa.id) AS total_participants,
    SUM(CASE WHEN pa.status = 'Accepted' THEN 1 ELSE 0 END) AS accepted_participants,
    SUM(CASE WHEN pa.status = 'Pending' THEN 1 ELSE 0 END) AS pending_participants
FROM 
    party p
LEFT JOIN 
    participant pa ON pa.partyId = p.id
GROUP BY 
    p.id;
``` 
Entité pour la vue matérialisée
Déclarez une entité TypeORM pour interagir avec cette vue :
```
@ViewEntity('party_participant_summary', { synchronize: false })
export class PartyParticipantSummary {
  @PrimaryColumn()
  partyId: number;

  @ViewColumn()
  partyName: string;

  @ViewColumn()
  totalParticipants: number;

  @ViewColumn()
  acceptedParticipants: number;

  @ViewColumn()
  pendingParticipants: number;
}
```
La vue matérialisée peut être rafraîchie via une commande SQL :
```
REFRESH MATERIALIZED VIEW party_participant_summary;
```
Exemple : back/src/models/party_participant_summary.entity.ts
## 3. Analyse des requêtes avec un logger
Configurer TypeORM pour capturer les requêtes exécutées et les erreurs dans un fichier de logs :

Configuration dans app.module.ts
Ajoutez les options de logging dans la configuration de TypeORM :
```
TypeOrmModule.forRoot({
  ...,
  logging: ['query', 'error', 'schema'], // Enregistre les requêtes SQL, les erreurs et les schémas.
  logger: 'file', // Sauvegarde dans un fichier
});
```
Fichier de log généré
Un fichier `ormlogs.log` sera automatiquement créé à la racine du projet, contenant toutes les requêtes exécutées et les éventuelles erreurs.

## 4. Utilisation des index
Pourquoi utiliser des index ?
Les index accélèrent les recherches dans les tables, mais augmentent légèrement le temps d'écriture (INSERT/UPDATE).
Exemple : back/src/models/party.entity.ts
Exemple : Ajouter un index sur une colonne souvent utilisée dans les requêtes SQL 
```
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
@Index('idx_party_status', ['status']) // Index sur la colonne "status"
export class Party {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['Publish', 'In Progress', 'Closed', 'Deleted'],
  })
  status: string;
}
```

## 5. Mise en Cache du Module Party

Dans le module **Party**, nous utilisons la fonctionnalité de mise en cache de **NestJS** pour optimiser les performances des requêtes fréquemment utilisées. Cela permet de réduire le temps de réponse en évitant des calculs ou des accès à la base de données répétitifs pour les mêmes données.

### Installation et Configuration du Cache

Le cache est configuré dans le module `PartyModule` avec la bibliothèque **cache-manager**. Voici les principales configurations utilisées pour gérer le cache dans ce module :

```
CacheModule.register({
  ttl: 5, // Durée de vie par défaut du cache en secondes
  max: 100, // Taille maximale du cache
})
```

Le cache est mis en place pour deux routes, notamment les getAll des parties, mais aussi celle avec pagination.
back/src/modules/party/party.controller.ts
