## W1 – Spécialisation

# My_events

## Gérer vos events

## Introduction

Vous vous dites parfois que vous ne faites pas assez de sorties culturelles (concert, expo, etc.) et vous aimeriez bien avoir un service qui liste les événements près de chez vous. Mais vous êtes un développeur, un service qui n’existe pas, c’est un service que vous pouvez créer. Sans plus attendre vous vous lancez dans la création d’une « web app » qui vous permettra d’organiser vos sorties.

## Restrictions

Toutes les technologies sont autorisées sauf les framework CSS, toutefois, nous vous recommandons AngularJS ou ReactJS pour le front et PHP (Symfony, Laravel, ou autre) ou NodeJS pour le backend.

## Projet

### Première partie, lister les événements

Dans un premier temps il faudrait lister les événements autour de moi. Pour ce faire, vous utiliserez l’API du site OpenAgenda (https://public.opendatasoft.com/explore/dataset/evenements-publics-cibul/api).
La « home page » listera les événements (cf mockup « home page ») à venir et qui auront lieu dans les environs (de là ou je me trouve actuellement). Mais il faudra également pouvoir filtrer cette liste par lieu (possibilité de saisir une ville, une adresse, etc.) et par type d’événement (concerts, expositions au musée, conférences, etc.). Par ailleurs, chaque événement sera détaillé sur une page dédiée (cf mockup « Fiche événement »)
Note : comme vous êtes un développeur soucieux de l’expérience utilisateur, une « single page application »
s’impose, vous ferez en sorte qu’il n’y ait pas besoin de rafraîchir la page pour que les filtres s’actualisent (ni d’ailleurs pour aucune autre action sur le site)
Vous pouvez désormais vous tenir au courant des événements près de chez vous, mais vous vous dite également que ça serait intéressant d’avoir ce même service en mobilité.
Vous ferez donc en sorte que votre « web app » soit responsive et implémenterez 3 « breakpoints » :

— Écran d’ordinateur large (plus de 1 024 px de largeur)
— Tablette (moins de 1 024 px de largeur)
— Smartphone (moins de 320 px de large)
À vous de concevoir la meilleure façon de réorganiser les blocs pour les vues tablette et mobile.

### Seconde partie : soyons sociaux

Après quelque temps vous vous rendez compte que ce n’est pas très drôle de faire toutes ces sorties tout seul, et que vous pourriez faire profiter vos amis de votre super application.

### Gestion des utilisateurs

Comme en plus vous en avez un peu marre d’implémenter procédure de connexion / inscription classique,
et en plus aujourd’hui qui dit « amis » dit « Réseaux sociaux » ; vous décider donc de mettre en place une authentification par service
En se connectant via un ou plusieurs services (une fois la connexion effectuée), vous déterminerez si c’est un utilisateur ayant déjà un compte sur votre plateforme, ou si c’est un nouvel utilisateur. Dans ce dernier cas, un compte (sur votre service) lui sera automatiquement créé à partir des informations récupérées via ce service.
Chaque utilisateur devra avoir au minimum :

— Un pseudo (unique sur votre plateforme).
— Un mail (qui restera confidentiel).
— Un avatar (on suggérera en priorité la photo du profile Facebook, qu’il pourra changer, et s’il décide de
ne pas en uploader tout de suite, une image par défaut lui sera affectée).
— Un petit texte de présentation qu’il pourra écrire lors de la création de son compte (mais il n’est pas
obligé de le faire à ce moment-là, il faudra lui donner la possibilité de le faire plus tard).
Chaque utilisateur enregistré sur le site, aura une page de « profil publique » qui devra permettre à tout
autre utilisateur de consulter les informations publiques du membre (pseudo, avatar, texte de présentation – cf mockup « profil membre »).

### Création de sorties

Une fois le compte créé, l’utilisateur pourra créer des « sorties » à partir des événements récupérés sur l’api
d’OpenAgenda, puis il pourra inviter des amis (d’autres utilisateurs, en indiquant leur pseudo) à cette « sortie ».
Une sortie se caractérise par :

— Un « événement OpenAgenda ».
— Un organisateur (un utilisateur de votre service).
— Une visibilité (publique / privé, définie par l’organisateur).
— Des participants (d’autres utilisateurs de votre service).

Chaque « sortie » aura une page spéciale (cf mockup « fiche sortie ») permettant aux participants d’échanger.
Cette page devra comporter une carte indiquant le lieu de la sortie, ainsi qu’un mur de message sur lequel
chaque participant à ladite sortie pourra écrire.
Par ailleurs veuillez noter que :

— Plusieurs sorties se rapportant à un même « événement OpenAgenda » mais organisées par différents utilisateurs devront pouvoir être créées (quelle que soit la visibilité de chacune des sorties).
— Pour une « sortie privée » les participants devront être ajoutés exclusivement par l’organisateur, pour une sortie publique, tout le monde pourra s’y ajouter librement.
— Tous les utilisateurs doivent pouvoir se retirer d’une sortie (quelle que soit la visibilité de la sortie), si cet utilisateur est l’organisateur, alors la sortie est annulée.
Sur le profil des utilisateurs on retrouvera une liste des sorties publiques auxquelles ils participent, si l’on visite son propre profile, toutes les sorties auxquelles on participe seront listées.

### Troisième partie : organisation enrichie des « sorties »

On ne vous arrête plus, votre service prend de l’ampleur, vous souhaitez alors proposer de nouveaux services à vos utilisateurs.
Sur une page « sortie », en plus des informations sur la sortie elle-même, vous proposerez, en utilisant une API adéquate :

— D’autres points d’intérêts proches du lieu de la sortie (par exemple les bars à proximité pour aller boire un coup après l’expo).
— Les prévisions météo pour le lieu et à la date de la sortie (si la date de la sortie est dans moins de 7 jours).

## Annexes : Mockup

### Home page

### Fiche événement

### Profil de membre

### Fiche sortie
