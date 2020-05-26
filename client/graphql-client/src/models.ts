
export interface Author{
    id: string,
    name: string,
    age: Int16Array,
}

export interface Book{
    id: string
    name: string,
    isbn: string,
    author: Author,
    publishedOn: Date,
    genre: string,
}