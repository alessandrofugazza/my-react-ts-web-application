import { Link } from 'react-router'

function Nav() {
  return (
    <nav className="main-nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/notepad">Notepad</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
