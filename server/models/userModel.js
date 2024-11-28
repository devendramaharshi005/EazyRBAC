// #################################### SAMPLE USER MODEL ###################################
// const users = [
//   { id: 1, username: "admin@example.com", password: "hashed_password_for_the_admin ", role: "admin" },
//   { id: 2, username: "user@example.com", password: "hashed_password_for_the_user ", role: "user" },
// ];
//############################################################################################

// *****DETAILS*****
// id : userid of a user
// password : hashed password of a user
// username : username of a perticular user
// role : role of a user can be ['user', 'admin' or 'moderator']

// Example username credentials for testing purposes

// | **Username**          | **Password** | **Role**      |
// |------------------------|--------------|---------------|
// | aditya@gmail.com       | 123456       | user          |
// | testuser3@gmail.com    | hello$123    | user          |
// | testuser4@gmail.com    | hello$123    | moderator     |
// | testuser5@gmail.com    | hello$123    | admin         |

const users = [
  {
    id: 1,
    username: "testuser5@gmail.com",
    password: "$2a$10$4233OYje45JlTNFac1vguuqaBJA44R990/5Akmum29OiH7fbu2hYe",
    role: "admin",
  },
  {
    id: 2,
    username: "testuser3@gmail.com",
    password: "$2a$10$FN6o9n5KUnOJk/n59/yJHOf.SmtKYXrcF7/ZobWKeXPeFSFnupO5W",
    role: "user",
  },
  {
    id: 3,
    username: "aditya@gmail.com",
    password: "$2a$10$IKeYeNfD3bsESx8B0kKyR.icCVRJtqfmwKiIbMaslrLNEP8WTzxRy",
    role: "user",
  },
  {
    id: 4,
    username: "testuser4@gmail.com",
    password: "$2a$10$w7j8EMUDh9wzsUGTDVehq.G2FOQIDmHkh9gm.ASjT35jeZFH7DFKm",
    role: "moderator",
  },
];
module.exports = users;
