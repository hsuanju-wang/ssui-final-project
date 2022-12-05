import {Link}  from "react-router-dom";
export default function Header(props){

  

    return(

        
       

    <div className="header">
            <h1>Perspective AI</h1>

    
            <div className="navigation">
                <Link className='navLink' to="/"><div className=''> Editor </div></Link>
                <Link className='navLink' to="/preview/"> Preview </Link>
                <Link className='navLink' to="/login/"> Login </Link> 

            </div>
    </div>
    
    );
}