import {
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLBoolean,
} from 'graphql';

// export const PostType = new GraphQLObjectType({
//   name: 'Post',
//   description: 'Represents a post of user',
//   fields: () => ({
//     id: { type: GraphQLString },
//     title: { type: GraphQLString },
//     content: { type: GraphQLString },
//     authorId: { type: GraphQLString },
//   }),
// });

// export const UserType = new GraphQLObjectType({
//   name: 'User',
//   description: 'Represents a user',
//   fields: () => ({
//     id: { type: GraphQLString },
//     name: { type: GraphQLString },
//     balance: { type: GraphQLFloat },
//   }),
// });

// export const ProfileType = new GraphQLObjectType({
//   name: 'Profile',
//   description: 'Represents a profile of user',
//   fields: () => ({
//     id: { type: GraphQLString },
//     isMale: { type: GraphQLBoolean },
//     yearOfBirth: { type: GraphQLInt },
//   }),
// });

// export const MemberType = new GraphQLObjectType({
//   name: 'Member',
//   description: 'Represents a member',
//   fields: () => ({
//     id: { type: GraphQLString },
//     discount: { type: GraphQLFloat },
//     postsLimitPerMonth: { type: GraphQLInt },
//   }),
// });

export const PostType = `
type Post {
  id: UUID!
  title: String!
  content: String!
  authorId: UUID!
}
`;

export const UserType = `
type User {
  id: UUID!
  name: String!
  balance: Float!
  profile: Profile
  posts: [Post]
}
`;

export const ProfileType = `
type Profile {
  id: UUID!
  isMale: Boolean!
  yearOfBirth: Int!
  memberType: Member
  userId: UUID!
}
`;

export const MemberType = `
type Member {
  id: MemberTypeId!
  discount: Float!
  postsLimitPerMonth: Int!
}
`;
