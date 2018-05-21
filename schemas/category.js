const category = `
  type Category {
    id: String!
    name: String!
    canvass_ids: [String!]
  }
  
  type CategoryResponse {
    id: String!
    name: String!
    canvasses: [CanvassPreview!]
  }
  
  type Query {
    allCategories: [Category!]
  }
  
  type CreateCategoryResponse {
    ok: Boolean!
    category: Category
    errors: [Error!]
  }
  
  type Mutation {
    createCategory(name: String!): Boolean!
  }
`;

export default category