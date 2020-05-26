import React from 'react';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import {isNullOrUndefined} from 'util';
import {Book} from '../models';
import {getAllBooksQuery} from './queries';
import {Table} from 'antd';

interface BookListProps{
    data: any;
}

interface BookListState{
    loading: boolean
}

class BookList extends React.Component<BookListProps, BookListState>{
    constructor(props:any){
        super(props);
        this.state={
            loading: false,
        }

        this.renderbook = this.renderbook.bind(this);
        this.renderheader = this.renderheader.bind(this);
    }

    private getColumns= ()=>{
        return [{title:'Name', dataIndex:'name', key:'name', render: (text:string) => <a>{text}</a>}, 
        {title:'Author Name', dataIndex:['author','name'], key:'author.name', render: (text:string) => <a>{text}</a>},
        {title:'Genre', dataIndex:'genre', key:'genre', render: (text:string) => <a>{text}</a>}]
    }

    private renderTable = (data:Book[]) =>{
        return <Table columns={this.getColumns()} dataSource={data} />
    }

    private renderbook = (book: Book) =>{
        return <tr>
            <td>
                {book.name}
            </td>
            <td>
                {isNullOrUndefined(book.author)?"" :book.isbn}
            </td>
            <td>
                {!isNullOrUndefined(book.author) ? book.author.name: ""}
            </td>
            <td>
                {!isNullOrUndefined(book.author) ? "": book.publishedOn}
            </td>
        </tr>
    }   

    private renderheader = () =>{
      return(  <tr>
            <td>
                Title
            </td>
            <td>
                ISBN
            </td>
            <td>
                Author Name
            </td>
            <td>
                Published On
            </td>
        </tr>)
    }

    render(){
        let data = this.props.data;

        if (isNullOrUndefined(data)|| (isNullOrUndefined(data.books))){
            return <div> data unavailable</div>
        }

        if (data.loading){
            return <div>loading books...</div>;
        }

    //     return data.books.map((b:Book) => {
    //      return  this.renderTable(b)
    //    });

        return this.renderTable(data.books);
    }
}

export default graphql(getAllBooksQuery)(BookList);