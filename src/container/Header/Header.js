import {Link}  from "react-router-dom";
import './Header.css';

export default function Header(props){
    return (
        <div className="header">
            <h2>Perspective</h2>
            { props.currentUserStatus === 'teacher' && props.currentUser !== undefined &&
                <div className="navigation">
                    <Link className='navLink' to="/">Dashboard</Link>
                    {/* <Link className='navLink' to="/preview/"> Preview </Link> */}
                    <Link className='navLink' to="/login/"> LogOut </Link> 
                </div>
            }
            { props.currentUserStatus === 'student' && props.currentUser !== undefined &&
                <div className="navigation">
                    <Link className='navLink' to="/">Dashboard</Link>
                    <Link className='navLink' to="/Result/"> Record</Link>
                    <Link className='navLink' to="/login/"> LogOut </Link> 
                </div>
            }
            { props.currentUser === undefined &&
                <div className="navigation">
                    <Link className='navLink' to="/login/"> Login </Link> 
                </div>
            }
        </div>
    );
}