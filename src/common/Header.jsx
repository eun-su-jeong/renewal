import './Header.scss';
import logo from '../assets/logo_kbank.png';
import {NavLink} from "react-router-dom";

export default function Header() {
    return (
        <header>
            <div className={'gnb'}>
                <h1>
                    <NavLink to={'/'}>
                        <img src={logo} alt={'logo'}/>
                    </NavLink>
                </h1>
                <ul>
                    <li><NavLink to={'/'}>은행소개</NavLink></li>
                    <li><NavLink to={'/'}>상품안내</NavLink></li>
                    <li><NavLink to={'/'}>고객센터</NavLink></li>
                    <li><NavLink to={'/'}>혜택</NavLink></li>
                </ul>
            </div>
        </header>
    );
}