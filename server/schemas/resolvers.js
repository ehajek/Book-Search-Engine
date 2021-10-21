// const { AuthenticationError } = require('apollo-server-express');
// const { User } = require('../models');
// const { signToken } = require('../utils/auth');

// const resolvers = {
//   Query: {
//     me: async (parent, args, context) => {
//       console.log(context.user);
//       if (context.user) {
//         try {
//           const userData = await User.findOne({ _id: context.user._id })
//             .select('-__v -password')
//           console.log("userData:", userData);
//           return userData
//         } catch (err) {
//           console.log(err);
//         }
//       }
//       throw new AuthenticationError('Not logged in');
//     }
//   },
//   Mutation: {
//     login: async (parent, { email, password }) => {
//       const user = await User.findOne({ email });

//       if (!user) {
//         throw new AuthenticationError('Incorrect credentials');
//       }

//       const correctPW = await user.isCorrectPassword(password);

//       if (!correctPW) {
//         throw new AuthenticationError('Incorrect credentials');
//       }
//       const token = signToken(user);
//       return { token, user };
//     },
//     // users: async () => {
//     //     return User.find()
//     //       .select('-__v -password')
//     //       .populate('thoughts')
//     //       .populate('friends');
//     //   },
//     //   users: async () => {
//     //     return User.find()
//     //       .select('-__v -password')
//     //       .populate('thoughts')
//     //       .populate('friends');
//     //   },
//     //   user: async (parent, { username }) => {
//     //     return User.findOne({ username })
//     //       .select('-__v -password')
//     //       .populate('friends')
//     //       .populate('thoughts');
//     //   },
//     //   thoughts: async (parent, { username }) => {
//     //     const params = username ? { username } : {};
//     //     return Thought.find(params).sort({ createdAt: -1 });
//     //   },
//     //   thought: async (parent, { _id }) => {
//     //     return Thought.findOne({ _id });
//     //   }
//   },
//   addUser: async (parent, args) => {
//     const user = await User.create(args);
//     const token = signToken(user);
//     return { token, user };
//   },
//   saveBook: async (parent, { book }, context) => {
//     if (context.user) {
//       const updateUser = await User.findOneAndUpdate(
//         { _id: context.user._id },
//         { $addToSet: { savedBooks: book } },
//         { new: true }
//       )
//       return updateUser;
//     }
//     throw new AuthenticationError('You need to be logged in');
//   },
//   removeBook: async (parent, { bookId }, context) => {
//     if (context.user) {
//       const updateUser = await User.findOneAndUpdate(
//         { _id: context.user._id },
//         { $pull: { savedBooks: { bookId: bookId } } },
//         { new: true }
//       )
//       return updateUser;
//     }
//     throw new AuthenticationError('You need to be logged in')
//   }
// };

// module.exports = resolvers;

const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            console.log(context.user);
            if (context.user) {
                try {
                    const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    console.log("userData:", userData);
                    return userData
                } catch(err) {
                    console.log(err);
                }
                
                
            }
            throw new AuthenticationError('Not logged in');
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPW = await user.isCorrectPassword(password);

            if (!correctPW) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { book }, context) => {
            if (context.user) {
                const updateUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: book } },
                    { new: true }
                )
                return updateUser;
            }
            throw new AuthenticationError('You need to be logged in');
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updateUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                )
                return updateUser;
            }
            throw new AuthenticationError('You need to be logged in')
        }
    }
};

module.exports = resolvers;