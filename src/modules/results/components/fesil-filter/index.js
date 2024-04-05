import { useResultsContext } from '@/context/results-context'
import React from 'react'
import { Checkbox, Popover } from 'antd';
import { ArrowDownIcon } from '../../../../assets/icons'
import Icon from '@ant-design/icons';
import { useSearchFilters } from '@/api/filters';
import { useSearchContext } from '@/context/search-context';
import { CheckBoxItem } from '@/components/small';


export const FesilFilter = (props) => {
    let { label, count, filteredItems, setFilteredItems } = props

    const { selectedItems, setSelectedItems } = useResultsContext()
    const [opened, setOpened] = React.useState(true)
    let openedLabelStyles = opened ? { transform: 'scale(1.05)', fontWeight: '600' } : {}


    function onCheck(item) {
        let checked = !!selectedItems.fesils.filter(fes => (fes.id == item.id) && (fes.parent_id == item.parent_id))?.length

        if (!checked) {
            setSelectedItems({
                fesils: [...selectedItems.fesils, item]
            })
        } else {
            let filteredFesils = selectedItems.fesils?.filter(fes => (fes.id !== item.id) && (fes.parent_id !== item.parent_id))

            setSelectedItems({
                fesils: filteredFesils,
            })
        }
    }


    function onOpenItem() {
        setOpened(!opened)
    }


    return (
        <div className='filter-item' onClick={onOpenItem}>
            <div className='header'>
                <div className='label' style={openedLabelStyles}>{label}</div>
                <Icon component={ArrowDownIcon} className='icon' style={{ transform: opened && 'rotate(0.5turn)' }} />
                {
                    !!selectedItems.fesils.length &&
                    <div className='count-circle'>
                        <div className='text'>{selectedItems.fesils?.length}</div>
                    </div>
                }
            </div>
            {
                opened && !!filteredItems.fesils?.length &&
                <div className='children-wrapper' onClick={(e) => e.stopPropagation()}>
                    <div className='children'>
                        {
                            filteredItems.fesils?.filter(fes => !!fes.name).map((item, i) =>
                                <CheckBoxItem
                                    key={item.id}
                                    checked={!!selectedItems.fesils.filter(fes => (fes.id == item.id) && (fes.parent_id == item.parent_id))?.length}
                                    label={item.name}
                                    onCheck={() => onCheck(item)}
                                />
                            )
                        }
                    </div>
                </div>
            }
        </div>
    )
}

