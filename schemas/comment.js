const comment = `
  type Comment {
    id: String!
    text: String!
    creator_id: String!
    created_at: Int!
    reply_ids: [String!]
  }
  
  type Query {
    getComments(canvassId: String!): [CommentResponse!]
    getReplies(commentId: String!): [CommentResponse!]
  }
  
  type CommentResponse {
    id: String!
    text: String!
    created_at: Int!
    creator: User!
    replies: [CommentResponse!]
  }
  
  type CreateCommentResponse {
    ok: Boolean!
    comment: Comment
    errors: [Error!]
  }
  
  type Mutation {
    createComment(text: String!, canvassId: String!, userId: String!): Boolean!
    createReply(text: String!, commentId: String!, creatorUsername: String!): Boolean!
  }
`;

export default comment