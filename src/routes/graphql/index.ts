import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql } from 'graphql';
import { schema } from '../../graphql-shcemas/schema.js';
import { UUIDScalarType } from '../../graphql-shcemas/scalars/UUIDScalarType.js';
import { MemberTypeId } from '../../graphql-shcemas/scalars/MemberTypeId.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const source = req.body.query;
      const resolvers = {
        memberTypes: async () => {
          return await prisma.memberType.findMany();
        },
        posts: async () => {
          return await prisma.post.findMany();
        },
        users: async () => {
          const res = await prisma.user.findMany();
          return res;
        },
        profiles: async () => {
          return await prisma.profile.findMany();
        },

        memberType: async (parent) => {
          return await prisma.memberType.findUnique({
            where: {
              id: parent.id,
            },
          });
        },
        user: async (parent, ...args) => {
          const res = await prisma.user.findUnique({
            where: {
              id: parent.id,
            },
          });
          return res;
        },
        post: async (parent, args) => {
          return await prisma.post.findUnique({
            where: {
              id: parent.id,
            },
          });
        },
        profile: async (parent, args) => {
          const res = await prisma.profile.findUnique({
            where: {
              id: parent.id,
            },
          });
          return res;
        },
        UUID: UUIDScalarType,
        MemberTypeId: MemberTypeId,
      };

      const graphqlRes = await graphql({
        source,
        variableValues: req.body.variables,
        schema,
        rootValue: resolvers,
      });
      return graphqlRes;
    },
  });
};

export default plugin;
