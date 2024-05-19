# GMadrid Nado BOT
The Bot feeds [GMadrid Nado app's](https://gmadridnatacion.bertamini.net) data coming from external bounded contexts in an automated way: 
- Any whatsapp message on GMadrid official group is transformed into an official message (notice) on the bulletin board.
- Training PDFs on google drive are periodically checked and uploaded on the backend
- Specific notifications are sent to the members, based on their preferences: new trainings, new notices etc.

## Installation

## Setup

## Development
The project follows DDD principles with its classic structure.

A makefile will help you with the most common tasks:
```bash
◼ gmadrid_natacion_bot / $ make list                                                                
build
build-docker-image
dev
lint
push-docker-image
```

The app is dockerized and you can develop with hot reload easily.
Apparently the app needs VirtioFS. If you experience some error about `fsstat` try to check that out.

You'll probably have to set some environment variable you can find in the `.env` file. That file won't be tracked by git.

## Dev Op
Just run the docker image with the following command:
```bash
docker run -d \
 --name "gmadrid-bot" \
 --env-file ./.env \
 --mount type=bind,source="$(pwd)/serviceAccountKey.json",target=/usr/src/app/data/serviceAccountKey.json \
 bertuz/gmadrid-natacion-bot
```
### Volumes and bind mounts
To make it work, the app uses:
- a volume to keep persistence of the whatsapp connection. This way, you won't have to rescan the QR code every time you restart the container.
- a bind mount to keep the google service account key. As you can see above, the `serviceAccountKey.json` file is mounted in the `/usr/src/app/data` folder.

```bash
$ docker inspect gmadrid-bot

...
        "Mounts": [
            {
                "Type": "bind",
                "Source": "/home/mbertamini/gmadrid-natacion-bot/serviceAccountKey.json",
                "Destination": "/usr/src/app/data/serviceAccountKey.json",
                "Mode": "",
                "RW": true,
                "Propagation": "rprivate"
            },
            {
                "Type": "volume",
                "Name": "0940912bc3aefbf85786b77dbd3bdb8686c5db1add580d0520470a65e423c6b9",
                "Source": "/var/lib/docker/volumes/0940912bc3aefbf85786b77dbd3bdb8686c5db1add580d0520470a65e423c6b9/_data",
                "Destination": "/usr/src/app/data",
                "Driver": "local",
                "Mode": "",
                "RW": true,
                "Propagation": ""
            }
        ],
```

### Configuration `.env` file
The image uses some configuration environment variables:
```
NODE_ENV=prod
SUPABASE_URL=<supabase-db-url>
SUPABASE_KEY=<supabase-JWT-amin-token>
WHATSAPP_CHANNEL_ID=<the-channel-you-wanna-read-the-notices>
```
Do not use double quotes on that file: they will be treated as part of the value.

### Whatsapp QR code
The first time you run the bot, you will need to scan the QR code with your phone. The QR code will be printed on the console. Just read the logs and scan it with your phone.

```bash
docker logs gmadrid-bot -f
```

### Volumes

## Author
[Matteo Bertamini](https://www.bertamini.net)
