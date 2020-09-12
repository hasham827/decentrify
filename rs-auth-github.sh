#!/bin/bash

# Setup the Environment variables for the REST Server

#1. Set up the card to be used
export COMPOSER_CARD=admin@decentrify

#2. Set up the namespace usage    always |  never
export COMPOSER_NAMESPACES=never

#3. Set up the REST server Authhentcation    true | false
export COMPOSER_AUTHENTICATION=true

#1. Set up the REST server to multi user mode    true | false
export COMPOSER_MULTIUSER=true


#4. Set up the Passport strategy provider
export COMPOSER_PROVIDERS='{
  "github": {
    "provider": "github",
    "module": "passport-github",
    "clientID": "c190b421a0297d96baca",
    "clientSecret": "ddad51ab2151ed896c3fda1a28c6462ebc93d61a",
    "authPath": "/auth/github",
    "callbackURL": "/auth/github/callback",
    "successRedirect": "/",
    "failureRedirect": "/"
  }
}'

# This script sets up the environment property for 
# Mongo DB loopback connector. This property is used
# by REST server for connecting with the MongoDB 
# instance in the cloud | local
export COMPOSER_DATASOURCES='{
    "db": {
        "name": "db",
        
        "host": "3d7eaa49-9d3e-48f5-92ad-6fccf68bb0bd-bluemix.cloudantnosqldb.appdomain.cloud",
        "port": 443,
       
        "database": "composer-wallets",
        "user": "3d7eaa49-9d3e-48f5-92ad-6fccf68bb0bd-bluemix",
        "password": "87c94bf23d24340e156763086c31e6ea60891834737231da5a655b3feb438020",
	"url": "https://3d7eaa49-9d3e-48f5-92ad-6fccf68bb0bd-bluemix:87c94bf23d24340e156763086c31e6ea60891834737231da5a655b3feb438020@3d7eaa49-9d3e-48f5-92ad-6fccf68bb0bd-bluemix.cloudantnosqldb.appdomain.cloud",
        "connector": "cloudant"  
    }
}'






#5. Execute the REST server
composer-rest-server



