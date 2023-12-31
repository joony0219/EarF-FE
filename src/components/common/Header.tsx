import styles from './Header.module.scss';
import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken, clearLocalStorage } from '../../api/token';
import { updateBadge } from 'api/fetcher';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { logout } from 'store/loginSlice';

import SideNav from './SideNav';

import MainLogo from 'assets/images/logo.png';
import Menu from 'assets/icons/Menu.svg';

function Header(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [isSideNavVisible, setIsSideNavVisible] = useState(false);

  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);

  const handleLogout = () => {
    clearLocalStorage();
    navigate('/login');
    dispatch(logout());
    alert('다음에 또 만나요! :D');
    window.location.reload();
  };

  useEffect(() => {
    if (isLoggedIn) {
      const fetchUserData = async () => {
        const token = getToken();

        if (token) {
          try {
            const response = await axios.get('https://www.eco-earf.com/api/user', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            const { name, profileImage } = response.data;
            setUserName(name);
            setProfileImage(profileImage);
            setShowSideMenu(false);
          } catch (error) {
            console.error('Failed to fetch user information:', error);
          }
        }
      };

      fetchUserData();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isSideNavVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isSideNavVisible]);

  const handleMouseOver = () => {
    setShowSideMenu(true);
  };

  const handleMouseLeave = () => {
    setShowSideMenu(false);
  };

  const handleMyPageClick = () => {
    navigate('/mypage/info');
  };

  const handleUpdateBadge = (): void => {
    updateBadge();
    setIsSideNavVisible(!isSideNavVisible);
  };

  const handleSideNavToggle = () => {
    setIsSideNavVisible(!isSideNavVisible);
  };

  return (
    <header>
      <div className={styles.inner}>
        <div>
          <Link to='/' className={styles.logo}>
            <img src={MainLogo} alt='메인로고' />
          </Link>
          <ul className={styles.menu}>
            <li>
              <NavLink
                to='/calender'
                className={({ isActive, isPending }) => (isPending ? styles.inactive : isActive ? styles.active : '')}
              >
                기록하기
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/community'
                className={({ isActive, isPending }) => (isPending ? styles.inactive : isActive ? styles.active : '')}
              >
                커뮤니티
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          {isLoggedIn ? (
            <>
              <div className={styles.login} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                <div className={styles.infoBox} onClick={handleMyPageClick}>
                  <span>안녕하세요, {userName}님</span>
                </div>
                <div className={styles.imgBox}>
                  {profileImage !== 'https://www.eco-earf.com/images/undefined' && (
                    <img src={profileImage} alt='profile' />
                  )}
                </div>
                {showSideMenu && (
                  <div className={styles.sideMenu}>
                    <NavLink to='/mypage/info'>내 정보</NavLink>
                    <NavLink to='/mypage/mycommunity'>내 게시글</NavLink>
                    <NavLink to='/mypage/badge' onClick={handleUpdateBadge}>
                      뱃지
                    </NavLink>
                    <button onClick={handleLogout}>로그아웃</button>
                  </div>
                )}
              </div>
              <div className={styles.hamburgerMenu} onClick={handleSideNavToggle}>
                <img src={Menu} alt='사이드메뉴' />
              </div>
            </>
          ) : (
            <>
              <Link to='/login' className={styles.loginButton}>
                시작하기
              </Link>
              <div className={styles.hamburgerMenu} onClick={handleSideNavToggle}>
                <img src={Menu} alt='사이드메뉴' />
              </div>
            </>
          )}
        </div>
      </div>

      <SideNav
        isSideNavVisible={isSideNavVisible}
        handleSideNavToggle={handleSideNavToggle}
        userName={userName}
        profileImage={profileImage}
        isLoggedIn={isLoggedIn}
        handleUpdateBadge={handleUpdateBadge}
        handleLogout={handleLogout}
      />
    </header>
  );
}

export default Header;
