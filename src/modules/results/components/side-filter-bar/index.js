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
import { AdditionalFilters } from '../additional-filters';


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
                resultsState.filtersLoading &&
                <FilterBoxSkeleton />
            }
            {
                !!filteredItems.mecelles?.length &&
                <AdditionalFilters
                    filteredItems={filteredItems}
                    setFilteredItems={setFilteredItems}
                />
            }
            {
                !!filteredItems.mecelles?.length &&
                <MecelleFilter
                    filteredItems={filteredItems}
                    setFilteredItems={setFilteredItems}
                />
            }
            {/* {console.log('@@@', filteredItems.bolmes)} */}
            {
                !!filteredItems.bolmes?.length &&
                <BolmeFilter
                    filteredItems={filteredItems}
                    setFilteredItems={setFilteredItems}
                />
            }
            {/* {console.log('@@@', filteredItems.fesils)} */}
            {
                !!filteredItems.fesils?.length &&
                <FesilFilter
                    filteredItems={filteredItems}
                    setFilteredItems={setFilteredItems}
                />
            }
        </div>
    )
}

