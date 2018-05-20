const user = `
  type User {
    id: String!
    username: String!
    email: String!
    password: String!
    category_ids: [String!]
  }
  
  type UserResponse {
    id: String!
    username: String!
    email: String!
    categories: [Category!]
  }
  
  type Query {
    me: UserResponse!
    getUserByUsername(userName: String!): User!
  }
  
  type RegisterResponse {
    ok: Boolean!
    user: User
    errors: [Error!]
  }
  
  type LoginResponse {
    ok: Boolean!
    token: String
    refreshToken: String
    errors: [Error!]
  }
     
  type Mutation {
    register(username: String!, email: String!, password: String!): RegisterResponse!
    login(email: String!, password: String!): LoginResponse!
    subscribe(categoryName: String!, username: String!): Boolean! 
  }
`;

export default user