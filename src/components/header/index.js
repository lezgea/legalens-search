import React from 'react'
import { Avatar, Image } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import Icon from '@ant-design/icons';
import { SearchIcon } from '@/assets/icons';


export const Header = (props) => {
    let { } = props

    const [state, setState] = React.useReducer(
        (prevState, newState) => ({ ...prevState, ...newState }),
        {
            loading: false,
            activeFilter: 'h',
        }
    )

    console.log('@@@@', state)

    const filtersRow = [
        { value: 'h', label: 'Hüquqi araşdırma', icon: SearchIcon },
        { value: 'm', label: 'Məhkəmə qərarları', icon: SearchIcon },
        { value: 's', label: 'Spell check', icon: SearchIcon },
        { value: 'f', label: 'Forum', icon: SearchIcon },
    ]


    return (
        <div className='header-wrapper'>
            <div className='logo'>
                <Avatar size={45}>L</Avatar>
                <div className='label'>Legalens</div>
            </div>
            <div className='search-wrapper'>
                {
                    filtersRow.map(item =>
                        <FilterButton
                            key={item.value}
                            selected={state.activeFilter}
                            setSelected={(v) => setState({ activeFilter: v })}
                            {...item}
                        />
                    )
                }
                <Searcher />
            </div>
            <div className='user'>
                <Avatar icon={<UserOutlined />} size={45} />
            </div>
        </div>
    )
}


const Searcher = () => {
    return (
        <div className='searcher'>
            <div className='button'>
                <Icon component={UserOutlined} className='icon' />
                <div className='label'>Axtar</div>
            </div>
        </div>
    )
}



const FilterButton = (props) => {
    let { label, value, icon, selected, setSelected } = props
    let isSelected = selected === value

    return (
        <div className={`filter-button${isSelected ? '-selected' : ''}`} onClick={() => setSelected(value)}>
            {/* <Icon component={SearchIcon} className='icon' /> */}
            {/* <Image src={SearchIcon} className='icon' /> */}
            {/* <SearchIcon className='icon' /> */}
            <div className='label'>{label}</div>
        </div>
    )
}