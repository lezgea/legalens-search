import React from 'react'
import { SIDEBAR_INITIAL } from '@/constants/initial-states';
import { Checkbox } from 'antd';
import { ArrowDownIcon } from '../../../../assets/icons'
import Icon from '@ant-design/icons';
import { useSearchFilters } from '@/api/filters';
import { useSearchContext } from '@/context/search-context';
import { useResultsContext } from '@/context/results-context';


export const SideFilterBar = () => {
    const [sideBar, setSideBar] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        SIDEBAR_INITIAL
    )
    const { searchState, setSearchState } = useSearchContext()
    const { resultsState, setResultsState, setColors } = useResultsContext()

    // const { mutate: mutateFilters, isSuccess: filtersSuccess, isLoading: filtersLoading } = useSearchFilters()


    function onOpenItem(index) {
        // let data = sideBar.data
        // data[index].opened = !data[index].opened
        // setSideBar(data)
    }


    React.useEffect(() => {
        if (!!searchState.searchValue) {
            // mutateFilters({
            //     query_string: 'qanun',
            //     offset: 1,
            // },
            //     {
            //         onSuccess: (res) => {
            //             console.log('SUCCESS')
            //             // showNotification({ title: 'Uğurlu əməliyyat!', variant: 'success' });
            //             // refetchDocs()
            //         },
            //         onError: () => {
            //             console.log('ERROR')
            //         },
            //     }
            // )
        }
    }, [searchState.searchValue])

    console.log('####', resultsState.filters)

    return (
        <div className='side-filter-bar'>
            {
                !!resultsState.filters?.mecelles?.length &&
                <FilterItem
                    key={0}
                    label="Məcəllələr"
                    parentIndex={0}
                    sideBar={sideBar}
                    setSideBar={setSideBar}
                    data={resultsState.filters?.mecelles}
                // onOpenItem={() => onOpenItem(i)}
                />
            }

        </div>
    )
}


const FilterItem = (props) => {
    let { label, count, data, parentIndex, sideBar, setSideBar } = props

    const [opened, setOpened] = React.useState(false)
    let openedLabelStyles = opened ? { transform: 'scale(1.05)', fontWeight: '600' } : {}
    // let data = sideBar.data
    let parent = data[parentIndex]


    function onCheck(id, val) {
        let child = parent?.children?.find(item => item.id === id)
        child.checked = val
        parent.count = val ? parent.count + 1 : parent.count - 1
        setSideBar(data)
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

