import React from 'react'
import Icon from '@ant-design/icons';
import { ArrowRightIcon, ForumIcon, HammerIcon, SearchIcon, SpellCheckIcon } from '../../../../assets/icons';


const BUTTONS = [
    { label: 'Hüquqi araşdırma', icon: SearchIcon },
    { label: 'Məhkəmə araşdırması', icon: HammerIcon },
    { label: 'Detexter', icon: SpellCheckIcon },
    { label: 'Forum', icon: ForumIcon },
]


export const LeftFixedBar = () => {
    return (
        <div className='left-fixed-bar-toggler'>
            <Icon component={ArrowRightIcon} className='arrow-icon' />
            <div className='left-fixed-bar'>
                {
                    BUTTONS.map((item, i) =>
                        <div className='bar-button' key={i}>
                            <Icon component={item.icon} className='icon' />
                        </div>
                    )
                }
            </div>
        </div>
    )
}