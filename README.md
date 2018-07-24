# Unganisha 911

A facebook messenger bot. It enables one to request /summon ambulances in times on medical emergencies through messenger.
 
## Video Example

A video of the code running

<!-- <a href="http://www.youtube.com/watch?feature=player_embedded&v=o3bxxVc30N8" target="_blank"><p align="center"></p></a> -->

## Getting Started

Install the necessary packages by running

```
npm install
```

In the config folder, create a default.json file and fill it with the following code

```
{
  "access_token": "",
  "verify_token": "",
  "app_secret": ""
}

```

The following information is obtained from the facebook developers site. for the app you will create using the following [steps](https://developers.facebook.com/docs/messenger-platform/guides/quick-start)

### Prerequisites

Npm should be running on your computer since it is a node js project


## Deployment

Get a free heroku account [here](http://www.heroku.com)

From your terminal, login to Heroku and create an application

```
$ heroku login
$ heroku create
$ git push heroku master
$ heroku open
```

If you are using Zeit, get an account [here](https://zeit.co)

Run
```
$ npm install -g now
```

To deploy, head to your project directory and run
```
$ now
```

## Acknowledgments

Bootbot, created by [Victor Abedi](https://github.com/iamvictorabedi/)
