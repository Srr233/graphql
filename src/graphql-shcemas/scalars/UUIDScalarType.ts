import { GraphQLScalarType, Kind } from 'graphql';
import { uuidToString } from '../utils/uuid-to-string.js';
import { stringToUUID } from '../utils/string-to-uuid.js';

export const UUIDScalarType = new GraphQLScalarType({
  name: 'UUID',
  description: 'Scalar UUID for types',
  serialize: (value) => {
    return value;
  },

  parseValue: (value) => {
    return value;
  },

  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING) {
    }
    return '';
  },
});
