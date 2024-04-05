import React from 'react'
import { Checkbox, Popover } from 'antd';
import { ArrowDownIcon } from '../../../../assets/icons'
import Icon from '@ant-design/icons';
import { useSearchFilters } from '@/api/filters';
import { useSearchContext } from '@/context/search-context';
import { useResultsContext } from '@/context/results-context';
import { MecelleFilter } from '../mecelle-filter';
import { BolmeFilter } from '../bolme-filter';
import { FesilFilter } from '../fesil-filter';


export const SideFilterBar = () => {
    const [filteredItems, setFilteredItems] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        {
            mecelles: [],
            bolmes: [],
            fesils: [],
        }
    )

    const { searchState, setSearchState } = useSearchContext()
    const { resultsState, setResultsState, setColors, selectedItems, setSelectedItems } = useResultsContext()

    const { mutate: filterData, isSuccess: filtersSuccess, isLoading: filteredDataLoading } = useSearchFilters(searchState.searchValue)


    function onFilterData() {
        filterData(
            {
                mecelle_ids: !!selectedItems.mecelles?.length ? [...selectedItems.mecelles.map(item => item.id)] : [],
                bolme_ids: !!selectedItems.bolmes?.length ? [...selectedItems.bolmes.map(item => item.bolme_id)] : [],
                fesil_ids: !!selectedItems.fesils?.length ? [...selectedItems.fesils.map(item => item.fesil_id)] : [],
            },
            {
                onSuccess: (res) => {
                    // showNotification({ title: 'Uğurlu əməliyyat!', variant: 'success' });
                    // refetchDocs()
                    // console.log('REEEEEEEES', res)

                    setResultsState({ loading: filteredDataLoading })
                    if (!!res.data.length) {
                        setResultsState({
                            list: res.data[0],
                            searchKeys: res.data[1],
                            // filters: filtersData,
                        })
                        setColors([...Object.values(res.data[2])])
                    } else {
                        setResultsState({
                            list: [], searchKeys: [],
                            // filters: []
                        })
                        setColors([])
                    }
                },
                onError: (res) => {
                    console.log('ERROOOOOOOOR', res)
                    // showNotification({ title: 'Fayl yüklənən zaman xəta baş verdi.', variant: 'error' });
                },
            }
        )
    }

    React.useEffect(() => {
        if (!!Object.keys(resultsState.filters)?.length) {
            setFilteredItems(resultsState.filters)
        }
    }, [resultsState.filters])


    React.useEffect(() => {
        onFilterData()
    }, [selectedItems])


    return (
        <div className='side-filter-bar'>
            {
                // resultsState.filtersLoading &&
                // <FilterBoxSkeleton />
            }
            {
                !!filteredItems.mecelles?.length &&
                <MecelleFilter
                    label="Məcəllələr"
                    filteredItems={filteredItems}
                    setFilteredItems={setFilteredItems}
                />
            }
            {
                !!filteredItems.bolmes?.length &&
                <BolmeFilter
                    label="Bölmələr"
                    filteredItems={filteredItems}
                    setFilteredItems={setFilteredItems}
                />
            }
            {
                !!filteredItems.fesils?.length &&
                <FesilFilter
                    label="Fəsillər"
                    filteredItems={filteredItems}
                    setFilteredItems={setFilteredItems}
                />
            }
        </div>
    )
}


// FILTERS

// const MecelleFilter = (props) => {
//     let { label, count, filteredItems, setFilteredItems } = props

//     const [opened, setOpened] = React.useState(true)
//     const { resultsState, selectedItems, setSelectedItems } = useResultsContext()

//     let openedLabelStyles = opened ? { transform: 'scale(1.05)', fontWeight: '600' } : {}


//     function onCheck(item) {
//         let checked = !!selectedItems.mecelles.filter(mec => mec.id == item.id)?.length
//         setSelectedItems({ bolmes: [], fesils: [] })

//         if (!checked) {
//             let filteredBolmes = resultsState?.filters?.bolmes?.filter(bol => bol.parrent_id == item.id)
//             let checkIfBolmesExists = filteredItems.bolmes.filter(bol => bol.parrent_id == item.id)?.length

//             if (!checkIfBolmesExists) {
//                 setFilteredItems({
//                     ...filteredItems,
//                     bolmes: [...filteredItems.bolmes, ...filteredBolmes],
//                 })
//             } else {
//                 setFilteredItems({
//                     ...filteredItems,
//                     bolmes: filteredBolmes,
//                 })
//             }
//             setSelectedItems({
//                 mecelles: [...selectedItems.mecelles, item]
//             })
//         } else {
//             let filteredBolmes = filteredItems?.bolmes?.filter(bol => bol.parrent_id !== item.id)
//             let filteredMecelles = selectedItems.mecelles?.filter(mec => mec.id !== item.id)

//             setSelectedItems({
//                 mecelles: filteredMecelles,
//             })
//             if (!!filteredMecelles?.length) {
//                 setFilteredItems({
//                     ...filteredItems,
//                     bolmes: filteredBolmes,
//                 })
//             } else {
//                 setFilteredItems({
//                     ...filteredItems,
//                     bolmes: [...resultsState?.filters?.bolmes],
//                 })

//             }
//         }
//     }


//     function onOpenItem() {
//         setOpened(!opened)
//     }

//     console.log('@@@', selectedItems)


//     return (
//         <div className='filter-item' onClick={onOpenItem}>
//             <div className='header'>
//                 <div className='label' style={openedLabelStyles}>{label}</div>
//                 <Icon component={ArrowDownIcon} className='icon' style={{ transform: opened && 'rotate(0.5turn)' }} />
//                 {
//                     !!selectedItems.mecelles.length &&
//                     <div className='count-circle'>
//                         <div className='text'>{selectedItems.mecelles?.length}</div>
//                     </div>
//                 }
//             </div>
//             {
//                 opened && !!filteredItems.mecelles?.length &&
//                 <div className='children-wrapper' onClick={(e) => e.stopPropagation()}>
//                     <div className='children'>
//                         {
//                             filteredItems.mecelles?.filter(mec => !!mec.name).map((item, i) =>
//                                 <CheckBoxItem
//                                     key={item.id}
//                                     checked={!!selectedItems.mecelles.filter(mec => mec.id == item.id)?.length}
//                                     label={item.name}
//                                     onCheck={() => onCheck(item)}
//                                 />
//                             )
//                         }
//                     </div>
//                 </div>
//             }
//         </div>
//     )
// }







