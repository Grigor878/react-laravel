import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
// import user from '../../assets/imgs/user.png'
import { NavLink } from 'react-router-dom'
// import { API_BASE_URL } from '../../apis/config'
import Button from '../inputs/Button'
import { routes } from './data'
import './Header.scss'

const Header = () => {
    const dispatch = useDispatch()

    return (
        <header className='header'>
            <div className="container">
                <nav className='header__nav'>
                    {/* <img src={userInfo?.photo !== null
                        ? API_BASE_URL + '/images/' + userImg?.img
                        : API_BASE_URL + '/images/' + userInfo?.photo
                            ? userInfo?.photo === null || userImg?.img === null : user
                    } alt="User"
                    /> */}
                    <p>Blog App</p>
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
                    <Button color="red" text="Log-Out" onClick={() => dispatch(logout())} />
                </nav>
            </div>
        </header>
    )
}

export default Header
