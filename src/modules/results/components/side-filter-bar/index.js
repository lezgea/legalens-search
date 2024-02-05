import React from 'react'
import { SIDEBAR_INITIAL } from '@/constants/initial-states';
import { Checkbox } from 'antd';
import { ArrowDownIcon } from '../../../../assets/icons'
import Icon from '@ant-design/icons';


export const SideFilterBar = () => {
    const [sideBar, setSideBar] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        SIDEBAR_INITIAL
    )


    function onOpenItem(index) {
        let data = sideBar.data
        data[index].opened = !data[index].opened
        setSideBar(data)
    }


    return (
        <div className='side-filter-bar'>
            {
                sideBar.data?.map((item, i) =>
                    <FilterItem
                        key={i}
                        parentIndex={i}
                        sideBar={sideBar}
                        setSideBar={setSideBar}
                        onOpenItem={() => onOpenItem(i)}
                        {...item}
                    />
                )
            }
        </div>
    )
}


const FilterItem = (props) => {
    let { label, opened, count, children, parentIndex, sideBar, setSideBar, onOpenItem } = props

    let openedLabelStyles = opened ? { transform: 'scale(1.05)', fontWeight: '600' } : {}
    let data = sideBar.data
    let parent = data[parentIndex]


    function onCheck(id, val) {
        let child = parent?.children?.find(item => item.id === id)
        child.checked = val
        parent.count = val ? parent.count + 1 : parent.count - 1
        setSideBar(data)
    }


    return (
        <div className='filter-item' onClick={onOpenItem}>
            <div className='header'>
                <div className='label' style={openedLabelStyles}>{label}</div>
                <Icon component={ArrowDownIcon} className='icon' style={{ transform: opened && 'rotate(0.5turn)' }} />
                {
                    !!count &&
                    <div className='count-circle'>
                        <div className='text'>{count}</div>
                    </div>
                }
            </div>
            {
                opened && !!children.length &&
                <div className='children-wrapper' onClick={(e) => e.stopPropagation()}>
                    {/* <div className='line'></div> */}
                    <div className='children'>
                        {
                            children.map((item, i) =>
                                <ChildItem
                                    key={item.id}
                                    onCheck={onCheck}
                                    {...item}
                                />
                            )
                        }
                    </div>

                </div>
            }
        </div>
    )
}



const ChildItem = (props) => {
    let { type } = props

    const CHILD_ITEMS = {
        checkbox: <CheckBoxItem {...props} />,
    }

    return CHILD_ITEMS[type]
}





const CheckBoxItem = (props) => {
    let { id, label, checked, onCheck } = props


    return (
        <div className='checkbox-wrapper' onClick={() => onCheck(id, !checked)}>
            <Checkbox checked={checked} onChange={() => onCheck(id, !checked)} />
            <div className='label'>{label}</div>
        </div>
    )
}

