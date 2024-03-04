import {
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList,
} from 'graphql';
import { UUIDScalarType } from './scalars/UUIDScalarType.js';

export const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'Represents a post of user',
  fields: () => ({
    id: { type: UUIDScalarType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: GraphQLString },
  }),
});

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Represents a user',
  fields: () => ({
    id: { type: UUIDScalarType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    posts: {
      type: new GraphQLList(PostType),
      async resolve(src, _, context) {
        return context.prisma.posts.findMany({ where: { authorId: src.id } });
      },
    },
    profile: {
      type: ProfileType,
      async resolve(src, _, context) {
        return context.prisma.profile.findUnique({ where: { userId: src.id } });
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      async resolve(src, _, context) {
        const result = await context.prisma.subscribersOnAuthors.findMany({
          where: {
            subscriberId: src.id,
          },
          select: {
            author: true,
          },
        });
        return result.map((res) => res.author);
      },
    },
  }),
});

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  description: 'Represents a profile of user',
  fields: () => ({
    id: { type: UUIDScalarType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberType: {
      type: MemberType,
      async resolve(src, _, context) {
        return context.prisma.memberType.findUnique({ where: { id: src.memberTypeId } });
      },
      userId: { type: UUIDScalarType },
    },
    user: {
      type: UserType,
      async resolve(src, _, context) {
        return context.prisma.user.findUnique({ where: { id: src.userId } });
      },
    },
  }),
});

export const MemberType = new GraphQLObjectType({
  name: 'Member',
  description: 'Represents a member',
  fields: () => ({
    id: { type: GraphQLString },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
  }),
});

// export const PostType = `
// type Post {
//   id: UUID!
//   title: String!
//   content: String!
//   authorId: UUID!
// }
// `;

// export const UserType = `
// type User {
//   id: UUID!
//   name: String!
//   balance: Float!
//   profile: Profile
//   posts: [Post]
// }
// `;

// export const ProfileType = `
// type Profile {
//   id: UUID!
//   isMale: Boolean!
//   yearOfBirth: Int!
//   memberType: Member
//   userId: UUID!
// }
// `;

// export const MemberType = `
// type Member {
//   id: MemberTypeId!
//   discount: Float!
//   postsLimitPerMonth: Int!
// }
// `;
