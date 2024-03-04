import { GraphQLSchema, GraphQLList, GraphQLObjectType } from 'graphql';
import { MemberType, PostType, ProfileType, UserType } from './querySchema.js';
import { UUIDScalarType } from './scalars/UUIDScalarType.js';

const MemperQuery = {
  memberType: {
    type: MemberType,
    args: { id: { type: UUIDScalarType } },
    resolve: async (src, _, context) =>
      await context.prisma.memberType.findUnique({ where: { id: src.id } }),
  },
  memberTypes: {
    type: new GraphQLList(MemberType),
    resolve: async (_obj, _args, { db }) => {
      return await db.memberType.findMany();
    },
  },
};

const PostQuery = {
  post: {
    type: PostType,
    args: { id: { type: UUIDScalarType } },
    resolve: async (src, _, context) =>
      await context.prisma.post.findUnique({ where: { id: src.id } }),
  },

  posts: {
    type: new GraphQLList(PostType),
    resolve: async (src, _, context) => {
      return await context.prisma.post.findMany();
    },
  },
};

const ProfileQuery = {
  profile: {
    type: ProfileType,
    args: { id: { type: UUIDScalarType } },
    resolve: async (src, _, context) =>
      // await context.prisma.profile.findUnique({ where: { id: src.id } }),
      await src.profile({ id: _.id }),
  },

  profiles: {
    type: new GraphQLList(ProfileType),
    resolve: async (src, _, context) => {
      return await context.prisma.profile.findMany();
    },
  },
};

const UserQuery = {
  user: {
    type: UserType,
    args: { id: { type: UUIDScalarType } },
    resolve: async (src, _, context) =>
      await context.prisma.user.findUnique({ where: { id: src.id } }),
  },

  users: {
    type: new GraphQLList(UserType),
    resolve: async (src, _, context) => {
      return await context.prisma.user.findMany();
    },
  },
};
const Root = new GraphQLObjectType({
  name: 'Root',
  fields: {
    ...MemperQuery,
    ...PostQuery,
    ...ProfileQuery,
    ...UserQuery,
  },
});

export const schema = new GraphQLSchema({
  query: Root,
});
