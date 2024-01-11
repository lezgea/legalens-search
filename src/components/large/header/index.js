import React from 'react'
import { Avatar, Image, Input } from 'antd'
import Icon from '@ant-design/icons';
import { ForumIcon, HammerIcon, NotificationIcon, SearchIcon, SpellCheckIcon } from '@/assets/icons';
import { useSearchContext } from '@/context/search-context';


const filtersRow = [
    { value: 'h', label: 'Hüquqi araşdırma', icon: SearchIcon, size: 14 },
    { value: 'm', label: 'Məhkəmə qərarları', icon: HammerIcon, size: 15 },
    { value: 's', label: 'Spell check', icon: SpellCheckIcon, size: 14 },
    { value: 'f', label: 'Forum', icon: ForumIcon, size: 14 },
]


export const Header = (props) => {
    let { onSearch } = props

    const { searchState, setSearchState } = useSearchContext()


    // filters the searching value, splits it by existing search keys 
    // and sets them to the searchKeys state like:
    // [{ id: 3, label: 'Artım', color: '#FCBB6E' }}]
    // function getSearchKeys() {
    //     // searchState.searValue.
    // }


    // React.useEffect(() => {
    //     getSearchKeys()
    // }, [searchState.value])


    return (
        <div className='header-wrapper'>
            <Image src='/assets/SVG/legalens-logo.svg' className='logo' />
            <div className='search-wrapper'>
                {
                    filtersRow.map(item =>
                        <FilterButton
                            key={item.value}
                            selected={searchState.activeFilter}
                            setSelected={(v) => setSearchState({ activeFilter: v })}
                            {...item}
                        />
                    )
                }
                <div className='searcher'>
                    <Input
                        value={searchState.searchValue}
                        onChange={(e) => setSearchState({ searchValue: e.target.value })}
                        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                    />
                    <div className='button' onClick={onSearch}>
                        <Icon component={SearchIcon} className='icon' />
                        <div className='label'>Axtar</div>
                    </div>
                </div>
            </div>
            <div className='profile-wrapper'>
                <Icon component={NotificationIcon} className='icon' />
                <Avatar src={'/assets/PNG/wow-cat.png'} size={45} />
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