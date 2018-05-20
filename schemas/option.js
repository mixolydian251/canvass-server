const option = `
  type Option {
    id: String!
    text: String!
    voter_ids: [String!]
  }
  
  type OptionResponse {
    id: String!
    text: String!
    voters: [User!]
  }
   
  type Query {
    allOptions: [Option!]
  }
  
  type Mutation {
    addOption(text: String!, canvassId: String!): Boolean!
    vote(canvassId: String!, optionId: String!, username: String!): Boolean!
  }
`;

export default option