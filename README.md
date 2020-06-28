# block-dem-chains-frontend

<p align="center">
  <img src="https://github.com/KahanMajmudar/block-dem-chains-frontend/blob/master/bdc-logo.jpg"/>
</p>

Devfolio's ETHIndia Online: Chain Runner

## Team Members
- Kahan Majmudar
- Harshil Darji
- Nisarg Sheth
- Kairav Pithadia

## Description

The purpose of the project is to make a decentralized resource sharing platform aimed for college :school: /students :student:  who can share/use those resources :books: for acedamic purposes. The users need to register an account to use the services and can upload/view/download the resources. The resouces are stored on IPFS and are accessible to everyone based on the post's CID :postbox:. The users need to follow other users in order to view the content(to get post CIDs). Various metadata such as user data and CIDs are stored in smart contract and the main data is stored in mongodb. :smile:

## Getting Started

### Prerequisites
  
- Install [MetaMask Plugin](https://metamask.io/download.html)  :fox_face: for your Browser/Device.
  
- Well thats it! :smile: Just Kidding there's more to it.. :unamused:

### How to get frontend started

- Install dependencies `npm i`
  - It will take some time to install dependencies :timer_clock:. Have patience :smile:.
- Start the server `npm start`.
- Voila! the frontend server's up and running. Check the running status by going to localhost. Eg. `http://127.0.0.1:4200` :+1:.

## Functionalities

### Register/Login

User will be allowed to login after registering using an email address, which further needs to be verified by a trailing mail. :e-mail:

### Dashboard

User will be greeted a dashboard on login, which can be used to glance through posts :postbox: of other users that they followed.

### User Profile

User can add appropriate bio :receipt: for their user-profile by going in to `Profile`option.

### Post

User has the option to create a new Post :postbox: which contains Title, Tag and an attachment, which can be any popular filetype :file_folder: , which are accessible to other users, this file is stored on IPFS.

### Follow/Unfollow Users

User has the ability to Follow/Unfollow users :people_holding_hands: according to the interests, all the follower posts will be available in the Dashboard.

### Metamask Integration

The frontent is seamlessly connected with the Metamask Plugin :fox_face: present in the Browser/Device. Metamask acts like a Wallet for individual users in order manage their corresponding Ether. Complete guide to setup the Metamask plugin is mentioned in our Backend Repo's [README.md](https://github.com/KahanMajmudar/block-dem-chains/blob/master/README.md).

### Transactions

Each and every event from Account Creation to Creating Post is happening via Transactions :currency_exchange:. User can monitor the Transactions in `View Transactions` tab below `Profile`.

### Search by Ethereum Address

Currently our searching :mag: is based on the User's Metamask Ethereum Hash, if a User wants to search someone, they should know the Metamask hash of the corresponding User.




