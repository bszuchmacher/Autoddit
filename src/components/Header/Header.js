import { Link } from "react-router-dom";
import logo from "../../logo.svg";
import { Icon } from "semantic-ui-react";
import './Header.css';

function Header() {
	return (
		<header className="header">
			<Link to="/homepage">
				<img className="header__logo" src={logo} alt="logo" />
			</Link>
			<div className="header__right">
				<div style={{ paddingRight:300,width:1200}}>
				<input placeholder="search" type="text" class="ant-input" value=""></input>
				</div>
				<div className="header__right__auth">
					<Link to="/auth" className="header__right__login">
						Log In
					</Link>
					{/* <Link to="/feed" className="header__right__signup">
						See Your Feed
					</Link> */}
				</div>
			</div>
		</header>
	);
}

export default Header;
