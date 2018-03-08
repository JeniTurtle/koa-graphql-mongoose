import Model from '../../models'

const resolvers = {
    Query: {
        async hellos(root, params) {
            const hello = await Model.helloModel.find({})
            return hello
        }
    },
    Mutation: {
        async create(root, params) {
            const helloModel = new Model.helloModel(params.info)
            const newHello = await helloModel.save()

            if (!newHello) {
                return null;
            }
            return newHello
        },

        async delete(root, params) {
            let removedList = [];

            for (var i = 0; i < params.ids.length; i++) {
                const _id = params.ids[i];
                const removed = await Model.helloModel.findOneAndRemove({
                    _id
                })

                if(removed) {
                    removedList.push(removed)
                }
            }

            return removedList
        },

        async update(root, params) {
            const updated = await Model.helloModel.findOneAndUpdate({
                _id: params.options._id
            }, params.options);

            return updated;
        }
    }
};

export default resolvers