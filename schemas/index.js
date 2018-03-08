import {
    addErrorLoggingToSchema,
    makeExecutableSchema
} from 'graphql-tools'

const types = [
    require('./types/hello.type')
];

const typeDefs = types.map(mod => mod.typeDef).filter(res => !!res)

const resolvers = Object.assign(
    {},
    ...types.map(mod => mod.resolver).filter(res => !!res)
)

const Schema = makeExecutableSchema({
    logger: console,
    allowUndefinedInResolve: true,
    resolvers,
    typeDefs
})

addErrorLoggingToSchema(Schema, {
    log: (err) => {
        if (typeof err === 'string') {
            console.error(err)
        } else {
            console.error(err.stack)
        }
    }
})

export { Schema }

