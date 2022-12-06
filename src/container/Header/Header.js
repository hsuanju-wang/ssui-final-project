import {Link}  from "react-router-dom";
import './Header.css';

export default function Header(props){
    return (
        <div className="header">
            <h1>Perspective AI</h1>
            { props.currentUserStatus === 'teacher' &&
                <div className="navigation">
                    <Link className='navLink' to="/"><div className=''> Editor </div></Link>
                    <Link className='navLink' to="/preview/"> Preview </Link>
                    <Link className='navLink' to="/login/"> LogOut </Link> 
                </div>
            }
            { props.currentUserStatus === 'student' &&
                <div className="navigation">
                    <Link className='navLink' to="/"><div className=''> Editor </div></Link>
                    <Link className='navLink' to="/preview/"> Preview </Link>
                    <Link className='navLink' to="/login/"> LogOut </Link> 
                </div>
            }
            { props.currentUserStatus === undefined &&
                <div className="navigation">
                    <Link className='navLink' to="/login/"> Login </Link> 
                </div>
            }
        </div>
    );
}