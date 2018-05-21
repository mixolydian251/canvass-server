const canvass = `
  type Canvass {
    id: String!
    title: String!
    category_id: String!
    creator_id: String!
    options: [Option!]
    comment_ids: [String!]
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
    createCanvass(title: String!, categoryName: String!, creatorUsername: String!): Boolean!
    changeTitle(text: String!, canvassTitle: String!): Boolean!
  }
`;

export default canvass