const createResolver = (resolver) => {
  const baseResolver = resolver;
  baseResolver.createResolver = (childResolver) => {
    const newResolver = async (parent, args, context, info) => {
      await resolver(parent, args, context, info);
      return childResolver(parent, args, context, info);
    };
    return createResolver(newResolver);
  };
  return baseResolver;
};

// Wrap resolvers that require the user to be signed in
export const requiresAuth = createResolver((parent, args, { user }) => {
  if (!user || !user.id) {
    throw new Error('Not authenticated');
  }
});

// Wrap resolvers that require the user to have admin rights
// export const requiresAdmin = requiresAuth.createResolver((parent, args, { user }) => {
//   if(!user.isAdmin){
//     throw new Error("User is not an admin")
//   }
// });