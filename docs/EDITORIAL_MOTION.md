# Direction éditoriale et motion — /test/

Cette version implémente la direction 01 validée : papier ivoire, typographie Libre Caslon Display, texte DM Sans, filets et accent vermillon. Elle est accessible à `https://elmariniapp.github.io/test/` sans remplacer la page d’accueil actuelle.

## Parcours

- Accueil avec entrée séquencée des trois lignes du titre, dévoilement du visuel et apparition des appels à l’action.
- Galerie éditoriale : Muslim App, Scaneris, AlarmBolt et fiche StampSight. BlueNine Sudoku reste annoncé comme prochain projet.
- Fiches en dialogue natif, fermeture par bouton et Échap, restauration du défilement et du focus. Les liens des cartes restent utilisables sans JavaScript.
- Continuité de l’image entre carte et fiche : View Transitions lorsque disponibles, animation FLIP avec Web Animations en secours.
- Parcours de quatre étapes avec panneau fixe et changement coordonné du visuel selon la position du texte. Le défilement reste natif.
- Offre existante de 390 € HT, FAQ et contact par e-mail avec copie de l’adresse.
- Version FR/EN complète, choix partagé avec l’accueil via la clé `lang` de localStorage. Stockage bloqué : fonctionnement conservé.

## Assets et exécution

Les visuels Muslim App, Scaneris et StampSight proviennent de leurs fiches officielles Google Play. Les sources sont consignées dans `test/assets/sources.json`. Le visuel AlarmBolt utilise le fichier existant `assets/alarmbolt-feature.webp`, qui contient une capture du projet. Les interfaces illustratives des maquettes ne sont pas publiées comme captures des applications.

Les cinq images sont optimisées en WebP. Les fontes sont servies localement avec leurs licences SIL OFL, dans `test/fonts/`. Aucun framework, CDN, script distant, traqueur ou service de collecte n’est ajouté.

Le JavaScript utilise IntersectionObserver, ResizeObserver, requestAnimationFrame et les animations natives. Le travail lié au défilement est regroupé dans une seule frame, sans boucle permanente à l’arrêt.

## Accessibilité et adaptations

- Menu mobile avec état annoncé et fermeture à Échap.
- Dialogue natif pour isoler le focus et rendre le document extérieur inerte.
- Texte alternatif, dimensions explicites des images, focus visible et lien d’évitement.
- Le contenu n’est pas masqué par défaut : il reste lisible si JavaScript échoue.
- `prefers-reduced-motion` désactive les animations, les transitions et le panneau fixe.
- Mise en page adaptée aux écrans étroits, aux faibles hauteurs et à l’impression.
- Sur mobile, l’image de la fiche devient son en-tête ; son texte et sa galerie suivent.

## Vérification

Contrôles effectués avant publication : syntaxe JavaScript, chemins des assets, ancres, identifiants, traductions, comportement des fiches et du menu, retour du focus, copie d’e-mail, stockage indisponible, View Transitions et préférence de réduction des mouvements.

Les tests DOM et statiques comportent 30 contrôles. Ils ne prétendent pas émuler la mise en page ni mesurer les performances d’un navigateur ou d’un téléphone réel.

Reproduction :

```sh
npm ci --prefix tooling/editorial
npm test --prefix tooling/editorial
node --check test/editorial.js
git diff --check
```

Les dépendances jsdom servent uniquement aux vérifications et ne sont jamais chargées par le site.

## Périmètre et retour arrière

Les ajouts concernent `test/`, `tooling/editorial/` et ce document. La page d’accueil, les politiques, les pages d’assistance et `app-ads.txt` sont conservés. Le retour arrière consiste à révoquer le commit de cette refonte ; aucune donnée utilisateur ni infrastructure n’a été créée ou migrée.
