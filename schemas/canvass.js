const canvass = `
  type Canvass {
    id: String!
    title: String!
    category_id: String!
    creator_id: String!
    options: [CanvassOption!]
    comment_ids: [String!]
  }
  
  type CanvassOption {
    id: String!
    text: String!
    voter_ids: [String!]
  }
  
  type Query {
    getCanvasses: [Canvass!]
    getCanvassesByCategory(category: String!): [Canvass!]
    getCanvassById(canvassId: String!): CanvassResponse!
  }
  
  type CanvassPreview {
    id: String!
    title: String!
    category_id: String!
    creator: User!
    options: [Option!]
    comment_ids: [String!]
  }
  
  type CanvassResponse {
    id: String!
    title: String!
    category: Category!
    creator: User!
    options: [OptionResponse!]
    comments: [CommentResponse!]
  }
  
  type CreateCanvassResponse {
    ok: Boolean!
    canvass: Canvass
    errors: [Error!]
  }
  
  type Mutation {
    createCanvass(
      title: String!, 
      categoryId: String!, 
      creatorId: String!
      canvassOptions: [String!]
    ): CreateCanvassResponse!
    
    changeTitle(text: String!, canvassTitle: String!): Boolean!
  }
`;

export default canvass