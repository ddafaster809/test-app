const { gql } = require('apollo-server');
const typeDefs = gql`
  

  type AuthInfo{
    userName: String!    
    token: String    
  }

  type FileType{
    base64: String
    extension: String
  }

  type QueryUser{
    user: User
    logout: Boolean!

  }

  type User{

    authInfo: AuthInfo
    email: String!
    name: String!    
    profilePicture: FileType

  }  

  type Message{
    success: Boolean!
    messages: [String]!

  }

  type UserMutation{
    user: User
    message: Message!    
  }

  input File{
    base64: String
    extension: String
  }

  input RegistrationInput {
    userName: String!
    password: String!
    confirmPassword: String!    
    email: String!
    name: String!    
    profilePicture: File    
  }

  input LoginInput{
    userName: String!
    password: String!

  }


  type Query {
    queryUser: QueryUser!
  }

  type Mutation{
    registerUser(registrationInput: RegistrationInput!): UserMutation!
    loginUser(loginInput: LoginInput): UserMutation!

  }
`;

module.exports = typeDefs;