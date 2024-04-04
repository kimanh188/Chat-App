# Chat-App

This Chat App project is a full-stack app built using the **MERN** (MongoDB, Express.js, React, Node.js) stack, complemented with **Tailwind CSS** for streamlined styling, providing users with a platform for real-time communication. With JWT authentication, users can register, log in, and access features including profile management and password modification. Leveraging Socket.IO, the app delivers instantaneous chat functionality.

https://github.com/kimanh188/Chat-App/assets/125377158/e715876f-5633-4a33-904e-edbc2da057b8

## Features

- **Real-time Chat:** Utilizing Socket.IO, the app offers real-time chat functionality, enabling users to engage in conversations with others seamlessly.
- **User Authentication:** Users can register and login securely, with passwords hashed and stored safely in the database. JWT tokens are utilized for authentication.
- **Profile Management:** Users can customize their profiles by uploading images and changing passwords in the settings section. (Click on the profile image to access settings.)
- **User Search:** Users can search for other users within the app, facilitating connections and initiating chats.

## Development Stack:

- **Frontend:** React.js, Socket.IO Client
- **Backend:** Node.js, Express.js, MongoDB, Socket.IO

## Instructions:

1. Clone the project repository to your local machine.
2. Navigate to both the client directory (cd client) and the server directory (cd server) to install respective dependencies at each folder by running _npm install_.
3. Start the server by running _npm run dev_ in the server folder.
4. Start the client by running _npm run start_ in the client folder.
5. Click the link or open your web browser and go to http://localhost:3023/.
6. You can log in using the provided test account credentials if you prefer not to register:
   - Email: _testuser@mail.com_
   - Password: _Test123456_
     (Please remember to change the password after testing the password change feature.)
7. Besides, you can login with another account to explore the real-time chat functionality:
   - Email: _marina@mail.com_
    - Password: _Test123456_
     (Please remember to change the password after testing the password change feature.)
