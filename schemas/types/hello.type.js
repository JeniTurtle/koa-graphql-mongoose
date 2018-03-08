import helloResolver from '../resolvers/hello.resolver'

export const typeDef = `
    type Hello {
        _id: String
        email: String
        lastIP: String
    }
    input AddHello {
        email: String
        lastIP: String
    }
    input UpdateHello {
        _id: String
        email: String
        lastIP: String
    }
    type Query {
        hellos: [Hello]
    }
    type Mutation {
        create(info: AddHello): Hello
        delete(ids: [String]): [Hello]
        update(options: UpdateHello): Hello
    }
`

export const resolver = helloResolver