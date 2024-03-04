import { GraphQLScalarType, Kind } from 'graphql';
import { uuidToString } from '../utils/uuid-to-string.js';
import { stringToUUID } from '../utils/string-to-uuid.js';

export const MemberTypeId = new GraphQLScalarType({
  name: 'MemberTypeId',
  description: 'Scalar UUID for types',
  serialize: (value) => {
    return uuidToString(value);
  },

  parseValue: (value) => {
    return stringToUUID(value);
  },

  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING) {
    }
    return '';
  },
});
