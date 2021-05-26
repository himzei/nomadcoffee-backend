import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    name: String
    location: String
    avatarURL: String
    githubUsername: String
    createdAt: String!
    updatedAt: String!
  }
  type Mutation {
    createAccount(
      username: String!
      name: String
      email: String!
      location: String
      avatarURL: String
      githubUsername: String
      password: String!
    ): User
  }
  type Query {
    seeProfile(username: String): User
  }
`;
