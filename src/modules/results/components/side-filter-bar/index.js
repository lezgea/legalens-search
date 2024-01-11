import React from 'react'
import { ArrowDownIcon, ArrowUpIcon } from '@/assets/icons'
import Icon from '@ant-design/icons';


export const SideFilterBar = () => {

    const sideBarItems = [
        { label: 'Məhkəmə qərarları', opened: false },
        { label: 'Məhkəmə', opened: false },
        { label: 'Case type', opened: false },
        { label: 'Mənbələr', opened: false },
        { label: 'Tarix aralığı', opened: false },
        { label: 'Təsnifatlar', opened: false },
        { label: 'İstinadlar', opened: false },
        { label: 'Açar sözlər', opened: false },
        { label: 'Nəşrlər', opened: false },
    ]

    return (
        <div className='side-filter-bar'>
            {
                sideBarItems.map((item, i) => <FilterItem key={i} {...item} />)
            }
        </div>
    )
}


const FilterItem = (props) => {
    let { label, opened } = props

    return (
        <div className='filter-item'>
            <div className='label'>{label}</div>
            <Icon component={ArrowDownIcon} className='icon' />
        </div>
    )
}

