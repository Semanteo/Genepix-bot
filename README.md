# Genepix-bot
> Créé pour le serveur discord de Genepix

[Lien Discord](https://discord.gg/genepix)

🙍️ Info : Bot de modération qui enregistre le nombre d'aides de chaque personne présente sur le serveur

✏️ Commandes disponibles : g!lb, g!rank/g!level/g!lvl, g!tiktok, g!vote, g!help/g!infos, g!botinfo, g!stats; g!serverinfo, g!links, g!ping

Pour les informations sur les commandes : g! + help/infos + nom de la commande

❓ A quoi il sert ? :  Genepix sert à comptabiliser le nombre d'aides apportées par les utilisateurs du serveur

❓ Pour quoi faire ? : Ce système permet aux personnes sur le serveur de connaître le "référent" pour chaque langage de programmation. Cela permet aux personnes qui ont besoin d'aide d'avoir une personne à qui se référer en cas de problème

❓ Comment ça marche ? : Les personnes qui se sont faites aider réagissent au message de la personne qui a aidé afin de lui faire augmenter son nombre d'aides apportées dans le langage concerné

## Setup

#### Installation

Avoir sur son ordi NodeJS 12.x.x, PM2 et NPM latest ou Yarn latest

Cloner le projet sur votre ordi :
```bash
git clone https://github.com/Semanteo/Genepix-bot.git
```

Ajouter le token depuis https://discord.com/developers/applications pour votre bot dans le fichier : auth.json

```yaml
{
    "token":"tonToken",
    "prefix":"g!"
}
```

```bash
npm install
```

Si vous utilisez yarn :
```bash
yarn install
```

#### Start

```yaml
npm start
```

Si vous utilisez yarn :
```bash
yarn start
```

## Bug

Si vous rencontrez un soucis ou quoi que ce soit vous pouvez ouvrir un ticket ici : https://github.com/Semanteo/Genepix-bot/issues
