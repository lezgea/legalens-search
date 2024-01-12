import React from 'react'
import { ArrowDownIcon, ArrowUpIcon } from '@/assets/icons'
import Icon from '@ant-design/icons';
import { SIDEBAR_INITIAL } from '@/constants/initial-states';
import { Checkbox } from 'antd';


export const SideFilterBar = () => {
    const [sideBar, setSideBar] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        SIDEBAR_INITIAL
    )


    function onOpenItem(index) {
        let data = sideBar.data
        console.log('@@@@', data)
        data[index].opened = !data[index].opened
        setSideBar(data)
    }


    return (
        <div className='side-filter-bar'>
            {
                sideBar.data?.map((item, i) =>
                    <FilterItem
                        key={i}
                        onOpenItem={() => onOpenItem(i)}
                        {...item}
                    />
                )
            }
        </div>
    )
}


const FilterItem = (props) => {
    let { label, opened, children, onOpenItem } = props

    let openedLabelStyles = opened ? { transform: 'scale(1.05)', fontWeight: '600' } : {}

    // const ChildItem = ()


    const ChildItem = (props) => {
        let { type } = props

        const CHILD_ITEMS = {
            checkbox: <CheckBoxItem {...props} />,
        }

        return CHILD_ITEMS[type]

        return (
            <div>
                <Checkbox checked={false} onChange={() => { }} />

            </div>
        )
    }



    return (
        <div className='filter-item' onClick={onOpenItem}>
            <div className={'header'}>
                <div className='label' style={openedLabelStyles}>{label}</div>
                <Icon component={ArrowDownIcon} className='icon' style={{ transform: opened && 'rotate(0.5turn)' }} />
            </div>
            {
                opened && !!children.length &&
                <div className='children-wrapper' onClick={(e) => e.stopPropagation()}>
                    <div className='line'></div>
                    {
                        children.map((item, i) => <ChildItem key={i} {...item} />
                            // <div key={i} className='child'>
                            //     {CHILD_ITEMS[item.type]}
                            // </div>
                        )
                    }
                </div>
            }
        </div>
    )
}






const CheckBoxItem = (props) => {
    let { label, checked } = props

    return (
        <div className='checkbox-wrapper'>
            <Checkbox checked={checked} onChange={() => { }} />
            <div className='label'>{label}</div>
        </div>
    )
}

