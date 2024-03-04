import { MemberType, PostType, ProfileType, UserType } from './querySchema.js';

export const RootType = `
  ${MemberType}

  ${PostType}

  ${UserType}

  ${ProfileType}
`;
