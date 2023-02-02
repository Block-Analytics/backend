import { GraphQLClient, gql } from 'graphql-request'

const gqlClient = new GraphQLClient('http://localhost:8080/graphql')

export {
    gqlClient
}