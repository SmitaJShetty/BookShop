import React from 'react';
import BookList from './booklist';
import Search from './search';
import NavBar from './navbar';
import Header from './header';
import AddBook from './addbook';

import './mainbody.css';

class MainBody extends React.Component<{}, {}>{
    constructor(props:any){
        super(props);
        this.state = {
            DbClient: null
        }
    }

    render(){
        return( <div className="body">
                    <div className="container"> 
                        <div className="navbar-container">
                            <NavBar />
                        </div>
                        <div className="content-container">
                            <div className="header">
                                <Header />
                            </div>
                            <div className="search">
                                <Search /> 
                            </div>
                            <div className="booklist">
                                <BookList />
                            </div>
                            <div>
                                <AddBook />
                            </div>
                        </div>
                    </div>
                </div>);
        }
}

export default MainBody;