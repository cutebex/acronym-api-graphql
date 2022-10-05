import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type Query {
      findDataByFilter(from: Int!, limit: Int!, search: String!): [Acronym]
    }
    type Mutation {
      createAcronym(acronym: String!, definition: String!): Boolean
      updateAcronym(acronym: String!, definition: String!): Boolean
      deleteAcronym(acronym: String!): Boolean
    }
    type Acronym {
      acronym: String!
      definition: String!
    }
    type AcronymGroup {
      acronyms: [Acronym]
      isOnly: Boolean!
    }
`);

export default schema;
