import { gql } from 'apollo-boost';

export const getAllBooksQuery = gql`
    {
        books{
            name
            genre
            author{
                name
            }
        }
    }
`;

export const getAllAuthorsQuery = gql`
    {
        authors{
            id
            name
            age
        }
    }
`;

export const addBookMutation = gql `
    mutation AddBook( $name: String!, $authorId: String!, $genre: String!) {
        addBook(name: $name, authorId: $authorId, genre: $genre){
            id
            name, 
            genre
        }
    }`;