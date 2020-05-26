import React from 'react';
import 'antd/dist/antd.css'
import {Card, Input, Button} from 'antd';
import {addBookMutation, getAllAuthorsQuery, getAllBooksQuery} from './queries';
import {graphql} from 'react-apollo';
import compose from 'lodash.flowright';
import { isNullOrUndefined } from '../util';
import {Author} from '../models';

interface AddBookState{
    Name: string
    ISBN: string
    AuthorId: any
    Genre: string
}

interface AddBookProps{
    data: any
    getAllAuthorsQuery: any
    addBookMutation: any
}

class AddBook extends React.Component<AddBookProps,AddBookState> {
    constructor(props: any) {
        super(props);
        this.state = {
            Name: "",
            ISBN: "",
            AuthorId: undefined,
            Genre: ""
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    private displayAuthors = () => {
        let data = this.props.getAllAuthorsQuery;
        
        if (data.loading){
            return <span>loading authors...</span>
        }

        if (isNullOrUndefined(data.authors)){
            return <div>author data not available</div>
        }

        return data.authors.map((a:Author) => {
            return <option key={a.id} value={a.id}>{a.name}</option>
        })
    }

    private onSubmit(e:any){
        e.preventDefault();
        console.log(this.state.AuthorId);
        this.props.addBookMutation({
            variables:{
                name: this.state.Name, 
                authorId: this.state.AuthorId,
                genre: this.state.Genre
            },
            refetchQueries:[{query: getAllBooksQuery}]
        })
    }

    private displayAddButton = () =>{
        return (
            <div>
                <Card title="Add book" className="cardcontent">
                    <p>
                        Book Name
                        <Input placeholder="name" onChange={e => this.setState({Name: e.target.value})}></Input>
                    </p>
                    <p>
                        ISBN    
                        <Input placeholder="isbn" onChange={e=> this.setState({ISBN: e.target.value})}></Input>
                    </p>
                    <p>
                        Author Name
                        <select placeholder="author name" onChange={(e:any)=> this.setState({AuthorId: e.target.value})}>
                                <option>Select Authors</option>
                                {this.displayAuthors()}
                            </select>
                    </p>
                    <p>
                        Genre
                        <Input  placeholder="genre" onChange={e=> this.setState({Genre: e.target.value})}></Input>
                    </p>
                    <p>
                        <button  value="Add" onClick={this.onSubmit}>Add</button>
                    </p>
                </Card>
            </div>
        );
    }

    render(){
        return this.displayAddButton();
    }
}

export default compose(
        graphql(getAllAuthorsQuery, {name:"getAllAuthorsQuery"}),
        graphql(addBookMutation, {name: "addBookMutation"})    
)(AddBook);