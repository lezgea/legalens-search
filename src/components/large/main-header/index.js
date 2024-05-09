import React from 'react'
import { Avatar, Dropdown, Image, Popover } from 'antd'
import { useRouter } from 'next/router';
import Icon from '@ant-design/icons';
import { EditIcon, FolderIcon, HistoryIcon, NotificationIcon, StarIcon } from '@/assets/icons';
import { getAccessToken, removeAuthCookies } from '@/utils/cookies';
import Link from 'next/link';
import { getUserProfileInfo } from '@/api/auth';
import { useResultsContext } from '@/context/results-context';
import { ActionButton } from '@/components/small';


const ACTION_TABS = [
    { id: 1, label: 'Qovluqlarım', icon: FolderIcon, size: 18, route: '/folders' },
    { id: 2, label: 'Tarixçə', icon: HistoryIcon, size: 17, route: '/history' },
    { id: 3, label: 'Seçilmişlər', icon: StarIcon, size: 18, route: '/selected' },
]


export const MainHeader = (props) => {
    let { } = props
    const { userState, setUserState } = useResultsContext()
    const router = useRouter()
    const isLogged = !!getAccessToken()

    function onLogout() {
        removeAuthCookies()
        router.push('/sign-in')
    }

    async function getUserInfo() {
        let response = await getUserProfileInfo()
        if (response.data?.key === "success") {
            setUserState({ ...response.data?.data })
        }
    }


    const DropdownContent = () => (
        <div className='profile-dropdown-wrapper'>
            <div className='profile-name'>{userState.name} {userState.surname}</div>
            <div className='signout-button' onClick={onLogout}>Sign Out</div>
        </div>
    )


    React.useEffect(() => {
        if (isLogged) getUserInfo()
    }, [isLogged])


    return (
        <div className='header-wrapper'>
            <Image
                src='/assets/SVG/legalens-logo.svg'
                className='logo'
                preview={false}
                onClick={() => router.push('/')}
            />
            {
                isLogged &&
                <div className='action-buttons-wrapper'>
                    {
                        ACTION_TABS.map(item =>
                            <ActionButton
                                key={item.id}
                                color={router.pathname === item.route ? 'colored' : 'white'}
                                onClick={() => router.push(item.route)} {...item}
                            />)
                    }
                </div>
            }
            {
                isLogged
                    ?
                    <Popover content={DropdownContent} trigger="click" placement='bottomRight'>
                        <div className='profile-wrapper'>
                            {/* <div className='notification-wrapper'>
                            <Icon component={NotificationIcon} className='icon' />
                            <div className='count-circle'>
                                <div className='text'>3</div>
                            </div>
                        </div> */}
                            <div className='user-profile-info-wrapper'>
                                <div className='user-profile-name'>{userState.name}</div>
                                {/* <div className='user-profile-role'>{userState.role}</div> */}
                            </div>
                            <Avatar size={40} className="profile-avatar" style={{ backgroundColor: '#fde3cf', color: '#f56a00' }} >
                                {userState.name.substring(0, 1)}
                            </Avatar>

                        </div>
                    </Popover>
                    :
                    <div className='auth-buttons-wrapper'>
                        <Link className='registration-button' href="/sign-up">Qeydiyyat</Link>
                        <Link className='login-button' href="/sign-in">Giriş et</Link>
                    </div>
            }
        </div>
    )
}
