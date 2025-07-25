import {Link} from 'react-router-dom';

const Header = ()=>{
    return (
        <header style={{padding:'1rem' , backgroundColor:'#eee'}}> 
            <nav>
                <Link to="/" style={{marginRight:'1rem'}}>Home</Link>
                <Link to="/login" style={{marginRight:'1rem'}}>Login</Link>
                <Link to="/register">Register</Link>
            </nav>
        </header>
    );
}

export default Header;
