import React from 'react'
import { CirclesIcon, EditIcon, FilledNotificationIcon, FolderIcon, HalfListIcon, ListIcon, SearchIcon, StatisticsIcon } from '@/assets/icons'
import { ActionButton } from '@/components/small';


export const ListFiltersFixed = (props) => {
    let { } = props

    let filterItems = [
        { id: 1, label: 'AR Qanunları', color: '#7F6DF0' },
        { id: 2, label: 'Mülkü məcəllə', color: '#77D4CF' },
        { id: 3, label: 'Artım', color: '#FCBB6E' },
    ]

    let actionButtons = [
        { id: 1, label: 'Düzəliş et', icon: EditIcon, size: 16 },
        { id: 2, label: 'Xəbərdar et', icon: FilledNotificationIcon, size: 16 },
        { id: 3, label: 'Qovluğa əlvə et', icon: FolderIcon, size: 16 },
        { id: 4, label: '', icon: StatisticsIcon, size: 18 },
        { id: 5, label: '', icon: ListIcon, size: 18 },
        { id: 6, label: '', icon: HalfListIcon, size: 18 },
        { id: 7, label: '', icon: CirclesIcon, size: 18 },
    ]


    return (
        <div className='list-filters-fixed'>
            <div className='filter-items-wrapper'>
                {filterItems.map(item => <FilterItem key={item.id} {...item} />)}
            </div>
            <div className='action-buttons-wrapper'>
                {actionButtons.map(item => <ActionButton key={item.id} color='gray' {...item} />)}
            </div>
        </div>
    )
}


const FilterItem = (props) => {
    let { id, label, color } = props

    return (
        <div className='filter-item' style={{ color: '#fff', backgroundColor: color || '#dedede' }}>
            <div className='label'>{label}</div>
        </div>
    )
}