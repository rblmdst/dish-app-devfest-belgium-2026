# Workshop - Signal et monde asynchrone  (Français)

## Signal et monde asynchrone :
  Depuis `Angular 16`, les signaux ont été introduits comme une nouvelle primitive pour créer des applications réactives. Par nature, ils sont synchrones, alors que la majorité des applications nécessitent de gérer des opérations asynchrones, souvent déclenchées par des interactions utilisateurs.

  Un temps, nous avons cru que les effects proposés par l’API des signaux pouvaient répondre à ce besoin. Mais *Alex Rickabaugh*, de l’équipe Angular, a montré qu’ils ne sont pas conçus pour cela — et qu’il est même déconseillé de les utiliser dans la plupart des cas.
  
  Pour répondre à ce besoin, Angular 19 introduit les resources (`resource`/`rxResource`, `httpResource`), de nouvelles APIs qui font le lien entre le monde synchrone des signaux et l’asynchrone, offrant une solution plus adaptée.

##  État dépendant :

  Parmi les primitives disponibles, on retrouve aussi les `computed`, qui permettent de dériver un état à partir d’un ou plusieurs signaux. Leur limitation ? Ils sont en lecture seule. Mais que faire si l’on souhaite dériver une valeur tout en pouvant la modifier ? C’est là qu’interviennent les `LinkedSignal`, sortes de `computed` modifiables.

  Malgré leur simplicité apparente, leur usage n’est pas toujours intuitif : quand les utiliser ? Quels problèmes permettent-ils de résoudre ?

##  Objectif du workshop :
  Ce workshop a pour but de clarifier l’intérêt de ces nouvelles APIs, notamment `resource/rxResource`, `httpResource` et `LinkedSignal`, à travers des cas concrets et des exemples pratiques.
  
##  Instructions :  
Pour chaque composant/page de l'application, vous trouverez des mentions **TODO** pour vous indiquer les implémentations attendues.
Vous serez guidés par les formateurs qui vous indiqueront l'ordre d'implémentation.

L'idée est de réaliser les implémentations en utilisant les nouvelles API disponibles (`httpResource`, `rxResource`, `linkedSignal`, `computed`, etc.) selon le besoin.


  ### 1. \[rxResource] : Implémentation de la fonctionnalité de recherche

* Gérer le chargement initial de la liste des plats et la recherche.
* Gérer l’affichage des états de chargement (loading, error) de la liste.
Suppression d’un repas depuis la liste

* A la suppression d'un repas, rafraîchir la liste des repas en prenant en compte la recherche déjà en cours. S'assurer que la gestion des états de chargement continue de fonctionner comme avant.
---

### 2. \[httpResource] : Implémentation de la fonctionnalité d’édition d’un repas

Lors du clic sur le bouton **Éditer** d’un repas; À l’arrivée sur la page, les données du repas sont récupérées en utilisant l’ID du repas récupéré via la route (`/dishes/edit/<dishID>`), puis utiliser pour préremplir le formulaire.

L’implémentation actuelle est réaliser en utilisant `rxResource`. Veuillez refaire l’implémentation  en utilisant `httpResource` à la place.

---

### 3. \[LinkedSignal] : Implémentation du calcul du prix total avec réductions

* À la sélection d’un repas dans la liste, afficher son prix unitaire.
* À la modification de la quantité d’un repas, calculer et afficher la réduction si elle est applicable (seuil atteint).
* Calculer et afficher le prix total en tenant compte de la réduction.
* À chaque changement de repas, réinitialiser la quantité à **1**.

