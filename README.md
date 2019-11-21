[![Build Status](https://travis-ci.org/ruhimbazabertin/BroadCaster.svg?branch=develop)](https://travis-ci.org/ruhimbazabertin/BroadCaster) [![Coverage Status](https://coveralls.io/repos/github/ruhimbazabertin/BroadCaster/badge.svg?branch=develop)](https://coveralls.io/github/ruhimbazabertin/BroadCaster?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/2efb97233c4d49a89d42/maintainability)](https://codeclimate.com/github/ruhimbazabertin/BroadCaster/maintainability)
## BroadCaster

Corruption is a huge bane to Africa’s development. African countries must develop novel and  localized solutions that will curb this menace, hence the birth of Broadcaster. Broadcaster  enables any/every citizen to bring any form of corruption to the notice of appropriate authorities  and the general public. Users can also report on things that need government intervention. 

# User Interface (UI)

* HTML
* CSS
* JAVASCRIPT

# API ENDPOINTS

| Method      | Path                                                           | Description                                    |
|-------------|----------------------------------------------------------------|------------------------------------------------|
| POST        | /api/v1/signUp                                                 | Create User Account                            |
| POST        | /api/v1/signIn                                                 | User login                                     |
| POST        | /api/v1/redFlags                                               | Create a red-flag record                       |
| GET         | /api/v1/red-flags                                              | Get all red-flag records                       |
| GET         | /api/v1/red-flags/:id                                          | Get a specific red-flag record                 |
| PATCH       | /api/v1/red-flags/:id/comment                                  | Update a comment of a specific red-flag record |
| PATCH       | /api/v1/red-flags/:id/location                                 | Update location of a specific red-flag record  |
| DELETE      | /api/v1/red-flags/:id                                          | Delete a specific red-flag record              |



## TOOLS USED

## LANGUAGE

 JAVASCRIPT 
 
 ## SERVER ENVIRONMENT
 
 *NodeJS* (run time Environment for running JS codes)
 
 ## FRAMEWORK
 
 *Express* (used for building fast APIs)
 
 ## TESTING FRAMEWORK
 
 *Mocha* and *Chai*
 
  ## STYLE GUIDE
 
 *Airbnb*
 
 ## CONTINUOUS INTEGRATION
 
 travis ci
 
 ## TEST COVERAGE
 
 nyc
 
 ## GIT BADGE
 
 coveralls
 
 ## DEPLOYMENT
 
 heroku
 
 
 # Getting started
 
 These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.
 
 # prerequisites
 
 To install the software on your local machine, you need first to clone the repository or download the zip file and once this is set up you are going to need this packages. [NodeJS]
 
   [Node Package Installer - NPM] this usually comes with Node or YARN in case NPM doesn't work.
  
  # Installing
  
  The installation of this application is fairly straightforward, After cloning this repository to your local machine,CD into the package folder using your terminal and run the following
  
  > npm install
  
  It will install the node_modules which will help you run the project on your local machine.
  
  # Run the server
  
  > npm run dev
  
  # Run the test
  
  > npm test
  
   version 1.0.0
   
   # Contributor
   
   Ruhimbaza Bertin ruhimbazab@gmail.com
   
   # License & copyright
   
   copyright (c) Ruhimbaza Bertin, Software developer
