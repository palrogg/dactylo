# Dactylo

Projet d’outil d’entraînement à la dactylographie sur clavier romand.

## Affichage principal

* stats de performances: vitesse (lettres/minute), précision (%), nombre d’erreurs
* texte à entrer, curseur indiquant la progression, erreurs en rouge
* clavier suisse-romand, highlight de la lettre à entrer

## Étapes du projet


### Prototype
- [x] L’utilisatrice ou utilisateur peut s’entraîner avec un texte prédéfini

### MVP
- [ ] Mesurer des paramètres permettant de classer les utilisateurs dans trois catégories
    - [ ] Catégories quantitatives (niveau) ou qualitatives (erreurs de frappe, lenteur pour certains groupes de lettres, etc.?)
    - [ ] Mesures:
        - [x] lettres entrées par erreur en contexte (à l’intérieur du mot / de la phrase)
        - [ ] lenteur en contexte (à l’intérieur du mot / de la phrase)
        - [ ] vitesse moyenne
        - [ ] taux d’erreur moyen
- [ ] Back-end
    - [ ] API PHP/Symphony: gestion des utilisateurs
        - [ ] Textes persoonnalisés
        - [ ] Sauvegarde de la progression
    - [ ] API Python: machine learning, génération des exercices

### Extensions possibles
- [ ] Mode multijoueur avec Colyseus ou sockets
- [ ] Adaptation aux claviers français, belge, français canadien, bépo
