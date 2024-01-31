import react from "react";
import './Appbar.css'
import { Link, useLocation } from "react-router-dom";
function Appbar(){
  const location=useLocation()
    return(<ul className="nav nav-tabs nav-justified lead small navbar-dark">
    <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
      <Link to="/">create</Link>
    </li>
    <li className={`nav-item ${location.pathname === '/existing' ? 'active' : ''}`}>
      <Link to="/existing">existing</Link>
    </li>
    <li className={`nav-item ${location.pathname === '/issued' ? 'active' : ''}`}>
      <Link to="/issued">issued</Link>
    </li>
    <li className={`nav-item ${location.pathname === '/pending' ? 'active' : ''}`}>
      <Link to="/pending">pending</Link>
    </li>
    <li className={`nav-item ${location.pathname === '/review' ? 'active' : ''}`}>
      <Link to="/review">review</Link>
    </li>
    <div className="divsetter"></div>
  </ul>)

}
export default Appbar