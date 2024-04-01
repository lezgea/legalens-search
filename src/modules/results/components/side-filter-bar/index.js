import React from 'react'
import { Checkbox, Popover } from 'antd';
import { ArrowDownIcon } from '../../../../assets/icons'
import Icon from '@ant-design/icons';
import { useSearchFilters } from '@/api/filters';
import { useSearchContext } from '@/context/search-context';
import { useResultsContext } from '@/context/results-context';
import { FilterBoxSkeleton } from '@/components/medium';


export const SideFilterBar = () => {
    const [selectedItems, setSelectedItems] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        {
            mecelles: [],
            bolmes: [],
            fesils: [],
        }
    )

    const { searchState, setSearchState } = useSearchContext()
    const { resultsState, setResultsState, setColors } = useResultsContext()

    // const { mutate: mutateFilters, isSuccess: filtersSuccess, isLoading: filtersLoading } = useSearchFilters()

    console.log('=====', resultsState.filtersLoading)


    return (
        <div className='side-filter-bar'>
            {
                // resultsState.filtersLoading &&
                // <FilterBoxSkeleton />
            }
            {
                !!resultsState.filters?.mecelles?.length &&
                <FilterItem
                    label="Məcəllələr"
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                    data={resultsState.filters?.mecelles}
                />
            }
            {
                !!resultsState.filters?.bolmes?.length &&
                <FilterItem
                    label="Bölmələr"
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                    data={resultsState.filters?.bolmes}
                />
            }
            {
                !!resultsState.filters?.fesils?.length &&
                <FilterItem
                    label="Fəsillər"
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                    data={resultsState.filters?.fesils}
                />
            }
        </div>
    )
}


const FilterItem = (props) => {
    let { label, count, data, sideBar, setSideBar } = props

    const [opened, setOpened] = React.useState(true)
    let openedLabelStyles = opened ? { transform: 'scale(1.05)', fontWeight: '600' } : {}
    // let parent = data[parentIndex]


    function onCheck(id, val) {

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
                    // !!count &&
                    // <div className='count-circle'>
                    //     <div className='text'>{count}</div>
                    // </div>
                }
            </div>
            {
                opened && !!data.length &&
                <div className='children-wrapper' onClick={(e) => e.stopPropagation()}>
                    <div className='children'>
                        {
                            data.filter(filter => !!filter.name).map((item, i) =>
                                <CheckBoxItem
                                    key={item.id}
                                    checked={true}
                                    label={item.name}
                                    onCheck={onCheck}
                                />
                            )
                        }
                    </div>
                </div>
            }
        </div>
    )
}



const CheckBoxItem = (props) => {
    let { id, label, checked, onCheck } = props


    return (
        <div className='checkbox-wrapper' onClick={() => onCheck(id, !checked)}>
            <Checkbox checked={checked} onChange={() => onCheck(id, !checked)} />
            <Popover
                placement="right"
                content={label}
                overlayStyle={{ maxWidth: '600px' }}
            >
                <div className='label'>{label}</div>
            </Popover>
        </div>
    )
}

