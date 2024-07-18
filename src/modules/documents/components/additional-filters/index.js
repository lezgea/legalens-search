import { useResultsContext } from '@/context/results-context'
import React from 'react'
import { Checkbox, Popover, Slider } from 'antd';
import { ArrowDownIcon } from '../../../../assets/icons'
import Icon from '@ant-design/icons';
import { useSearchFilters } from '@/api/filters';
import { useSearchContext } from '@/context/search-context';
import { CheckBoxItem } from '@/components/small';


export const AdditionalFilters = (props) => {
    let { label, count, filteredItems, setFilteredItems } = props

    const [opened, setOpened] = React.useState(true)
    const { resultsState, setResultsState, setSelectedItems } = useResultsContext()
    let openedLabelStyles = opened ? { transform: 'scale(1.05)', fontWeight: '600' } : {}


    function onOpenItem() {
        setOpened(!opened)
    }


    return (
        <div className='filter-item' onClick={onOpenItem}>
            <div className='header'>
                <div className='label' style={openedLabelStyles}>Ətraflı Axtarış</div>
                <Icon component={ArrowDownIcon} className='icon' style={{ transform: opened && 'rotate(0.5turn)' }} />
            </div>
            {
                opened &&
                <div className='children-wrapper' onClick={(e) => e.stopPropagation()}>
                    <div className='children'>
                        <CheckBoxItem
                            checked={resultsState.search_as_phrase}
                            label="Söz və ya söz birləşməsi"
                            onCheck={() => setResultsState({ search_as_phrase: !resultsState.search_as_phrase })}
                        />
                        {/* <Slider
                            min={1}
                            max={20}
                            onChange={() => { }}
                            value={typeof inputValue === 'number' ? inputValue : 0}
                        />
                        <div className='checkbox-wrapper'>

                        </div> */}
                    </div>
                </div>
            }
        </div>
    )
}