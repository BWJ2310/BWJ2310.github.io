# Installation Guide

## Prerequisites

Before installing GooseLang-Dev, ensure you have the following prerequisites installed on your system:

## System Updates

First, update your system packages:

```bash
sudo apt-get update
sudo apt-get upgrade
```

## Install Node.js and npm

Install npm:

```bash
sudo apt-get install npm -y
```

## Install MongoDB

Follow the official MongoDB installation guide at: https://www.mongodb.com/docs/manual/administration/install-community/

## Project Setup

1. Navigate to the GooseLang-Dev directory:
```bash
cd /GooseLang-Dev
```

2. Install dependencies using yarn:
```bash
yarn
```

3. Install the default UI addon (optional, for frontend development):
```bash
yarn gooselang addon add @gooselang/ui-default
```

4. Install the language settings addon (optional):
```bash
yarn gooselang addon add @gooselang/language-settings
```

## Running the Application

### Start the Backend
```bash
yarn debug --port=2333 --watch
```

### Start the Frontend
(Ensure the default UI addon is installed first, see Project Setup step 3)
```bash
yarn build:ui:dev
```
## Post-Installation Steps

### Make User Super Admin

After registering a user, you can make them a super admin using their User ID (e.g., 2 for the second registered user):

```bash
yarn gooselang cli user setSuperAdmin 2
```


## Troubleshooting

If you encounter errors when running the backend for the first time, try the following:

1. Install dos2unix:
```bash
sudo apt-get install dos2unix
```

2. Convert line endings in the gooselang script:
```bash
dos2unix /GooseLang-Dev/packages/gooselang/bin/gooselang.js
```

3. Try running the backend again after these steps.
