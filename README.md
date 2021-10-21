# Genepix-bot
> Créé pour le serveur discord de Genepix

[Lien Discord](https://discord.gg/dw3eNPmyWm)

🙍️ Info : Bot de modération qui enregistre le nombre d'aides de chaque personne présente sur le serveur

✏️ Commandes disponibles : /lb, /rank, /tiktok, /vote, /help, /botinfo, /stats; /serverinfo, /links, /ping

Pour les informations sur les commandes : /help + nom de la commande

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

Ajouter le token depuis https://discord.com/developers/applications pour votre bot dans le fichier : config.js

```js
module.exports = {
    root: ["ID 1 DROITS ADMIN", "ETC"],
    bot: {
        clientId: "ID DU BOT",
        guildId: "ID DE LA GUILD POUR LES /COMMANDS",
        token: "TOKEN DU BOT",
        prefix: "g!"
    },
    opts: {
        color: 0x2f6e93
    },
};
```

```bash
npm install
```

Si vous utilisez yarn :
```bash
yarn install
```

#### Déployer les slashs commands

```yaml
node deploy-commands
```

#### Start

```yaml
node index
```

## Bug

Si vous rencontrez un soucis ou quoi que ce soit vous pouvez ouvrir un ticket ici : https://github.com/Semanteo/Genepix-bot/issues
