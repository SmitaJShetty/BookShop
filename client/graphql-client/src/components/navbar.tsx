import React from 'react';

interface NavBarProps{

}

interface NavBarState{

}

class NavBar extends React.Component<NavBarProps, NavBarState>{
    render(){
        return ( 
          <div>{NavBarItem("Home")} 
          {NavBarItem("Upload")}
          {NavBarItem("About")}
          </div>)
        
    }
}

const NavBarItem = (item:string)=>{
    return (<div className="navbar-item"><a href="#">{item}</a></div>);
}

export default NavBar;