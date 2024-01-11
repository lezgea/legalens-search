import React from 'react'
import { Avatar, Image } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import Icon from '@ant-design/icons';
import { ForumIcon, HammerIcon, NotificationIcon, SearchIcon, SpellCheckIcon } from '@/assets/icons';


export const Header = (props) => {
    let { } = props

    const [state, setState] = React.useReducer(
        (prevState, newState) => ({ ...prevState, ...newState }),
        {
            loading: false,
            activeFilter: 'h',
        }
    )


    const filtersRow = [
        { value: 'h', label: 'Hüquqi araşdırma', icon: SearchIcon, size: 14 },
        { value: 'm', label: 'Məhkəmə qərarları', icon: HammerIcon, size: 15 },
        { value: 's', label: 'Spell check', icon: SpellCheckIcon, size: 14 },
        { value: 'f', label: 'Forum', icon: ForumIcon, size: 14 },
    ]


    return (
        <div className='header-wrapper'>
            <Image src='/assets/SVG/legalens-logo.svg' className='logo'/>
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
                <Icon component={NotificationIcon} />
                <Avatar src={'/assets/PNG/wow-cat.png'} size={45} />
            </div>
        </div>
    )
}


const Searcher = () => {
    return (
        <div className='searcher'>
            <div className='button'>
                <Icon component={SearchIcon} className='icon' />
                <div className='label'>Axtar</div>
            </div>
        </div>
    )
}



const FilterButton = (props) => {
    let { label, value, icon, size, selected, setSelected } = props
    let isSelected = selected === value

    return (
        <div className={`filter-button${isSelected ? '-selected' : ''}`} onClick={() => setSelected(value)}>
            <Icon component={icon} className='icon' style={{ fontSize: size }} />
            <div className='label'>{label}</div>
        </div>
    )
}