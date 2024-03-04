import { buildSchema } from 'graphql';
import { RootType } from './root.js';

export const schema = buildSchema(`
  scalar UUID
  scalar MemberTypeId
  type Query {
    memberTypes: [Member!]
    posts: [Post!]
    users: [User!]
    profiles: [Profile]
    user(id: UUID!): User
    post(id: UUID!): Post
    memberType(id: MemberTypeId!): Member!
    profile(id: UUID!): Profile
  }

  ${RootType}
`);
