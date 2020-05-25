const graphql = require('graphql');
const models = require('./models');
const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt,GraphQLList, GraphQLNonNull} = graphql;

const BookType = new GraphQLObjectType(
    {
        name: 'BookType',
        fields: ()=>({
            id: {type: GraphQLID},
            name: {type: GraphQLString},
            genre: {type: GraphQLString},
            authorId: {type: GraphQLID},
            author: {
                type: AuthorType,
                resolve(parent, args){
                    return models.book.findById(parent.authorId)
                }
            }
        }),
    }
);

const AuthorType = new GraphQLObjectType(
    {
        name: 'AuthorType',
        fields: ()=> ({
            id: {type: GraphQLID},
            name: {type: GraphQLString}, 
            age: {type: GraphQLInt},
            books: {
                type: new GraphQLList(BookType),
                resolve(parent, args){
                    return models.book.find({authorId: parent.id});
                }
            }
        })

    }
)

const RecommendationType = new GraphQLObjectType({
    name: 'RecommendationType', 
    fields: ()=> ({
        bookId: {type: GraphQLID},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return models.book.find({id: parent.bookId});
            }
        }
    })
});

const EmailType = new GraphQLObjectType({
    name: 'EmailType', 
    fields: ()=>({
        id: GraphQLID, 
        recipientEmailAddress: GraphQLString,
        recipientName: GraphQLString, 
        subject: GraphQLString, 
        body: GraphQLString,
        from: GraphQLString,
    }),
});

const NotificationType = new GraphQLObjectType({
    name: 'NotificationType', 
    fields: ()=> ({
        id: GraphQLID, 
        name: GraphQLString, 
        email: EmailType,
    }),
});

const Query = new GraphQLObjectType({
    name: 'query', 
    fields: {
        book: {
            type: BookType, 
            args: {id:{type: GraphQLID} }, 
            resolve(parent, args){
                return models.book.findById(args.id);
            }
        },
        author: {
            type: AuthorType, 
            args: {id: {type: GraphQLID}}, 
            resolve(parent, args){
                return models.author.findById(args.id)
            }
        },
        recommendation: {
            type: RecommendationType, 
            args: {bookId: {type: GraphQLID}}, 
            resolve(parent, args){
                return models.recommendation.find({bookId: args.bookId})
            }
        },
        books: {
            type: new GraphQLList(BookType),  
            resolve(parent, args){
                return models.book.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation', 
    fields: {
        addBook:{
            type: BookType, 
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                console.log('args:', args);
                let newBook = new models.book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.AuthorId,
                });
                return newBook.save();
            }
        },
        addAuthor: {
            type: AuthorType, 
            args:{
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args) {
                let newAuthor = new models.author({
                    name: args.name,
                    age: args.age,
                });
                return newAuthor.save();
            }
        },
        addRecommendation: {
            type: RecommendationType, 
            args: {
                bookId: {type:GraphQLID},
            },
            resolve(parent, args){
                let addRecommendation = new models.recommendation({
                    bookId: args.bookId,
                });
                return addRecommendation.save();
            }
        }
    }
});

module.exports= new GraphQLSchema({
    query: Query,
    mutation: Mutation
});