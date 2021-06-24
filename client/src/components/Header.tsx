import '../css/Header.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Header = () => {
	const [menuActive, setMenuActive] = useState(false)

	return (
		<header className="cabecalho">
			<div className="title">
				<h2>Loja</h2>
			</div>
			<nav className="navegacao">
				<input
					type="checkbox"
					id="trigger"
					checked={menuActive}
					onChange={() => setMenuActive(isActive => !isActive)}
				/>

				<label className="trigger" htmlFor="trigger">
					<div className="line"></div>
					<div className="line middle"></div>
					<div className="line"></div>
				</label>

				<ul className="nav-links" role="menu">
					<li className="nav-item">
						<Link to="/" onClick={() => setMenuActive(false)}>
							Home
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/cart" onClick={() => setMenuActive(false)}>
							Carrinho
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header
