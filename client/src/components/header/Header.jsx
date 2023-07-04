import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
import { NavLink } from 'react-router-dom'
import { API_BASE_URL } from '../../apis/config'
import Button from '../inputs/Button'
import { routes } from './data'
import './Header.scss'

const Header = () => {
    const { userInfo, userImg } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    return (
        <header className='header'>
            <div className="container">
                <nav className='header__nav'>
                    <img src={userInfo?.photo ? API_BASE_URL + '/images/' + userImg?.img : API_BASE_URL + '/images/' + userInfo?.photo} alt="User" />
                    <ul className='header__list'>
                        {routes.map(({ id, name, to }) => {
                            return (
                                <li key={id}>
                                    <NavLink className='header__navlink' to={to}>{name}</NavLink>
                                </li>
                            )
                        })
                        }
                    </ul>
                    <Button text="Log-Out" onClick={() => dispatch(logout())} />
                </nav>
            </div>
        </header>
    )
}

export default Header
