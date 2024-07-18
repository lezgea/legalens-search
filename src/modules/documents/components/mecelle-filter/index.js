import { useResultsContext } from '@/context/results-context'
import React from 'react'
import { ArrowDownIcon } from '@/assets/icons'
import Icon from '@ant-design/icons';
import { CheckBoxItem } from '@/components/small';


export const MecelleFilter = (props) => {
    let { count, filteredItems, setFilteredItems } = props

    const [opened, setOpened] = React.useState(true)
    const { resultsState, selectedItems, setSelectedItems } = useResultsContext()

    let openedLabelStyles = opened ? { transform: 'scale(1.05)', fontWeight: '600' } : {}


    function onCheck(item) {
        let checked = !!selectedItems.mecelles.filter(mec => mec.id == item.id)?.length
        setSelectedItems({ bolmes: [], fesils: [] })

        if (!checked) {
            let filteredBolmes = resultsState?.filters?.bolmes?.filter(bol => bol.parrent_id == item.id)
            let checkIfBolmesExists = filteredItems.bolmes.filter(bol => bol.parrent_id == item.id)?.length

            if (!checkIfBolmesExists) {
                setFilteredItems({
                    ...filteredItems,
                    bolmes: [...filteredItems.bolmes, ...filteredBolmes],
                })
            } else {
                setFilteredItems({
                    ...filteredItems,
                    bolmes: filteredBolmes,
                })
            }
            setSelectedItems({
                mecelles: [...selectedItems.mecelles, item]
            })
        } else {
            let filteredBolmes = filteredItems?.bolmes?.filter(bol => bol.parrent_id !== item.id)
            let filteredMecelles = selectedItems.mecelles?.filter(mec => mec.id !== item.id)

            setSelectedItems({
                mecelles: filteredMecelles,
            })
            if (!!filteredMecelles?.length) {
                setFilteredItems({
                    ...filteredItems,
                    bolmes: filteredBolmes,
                })
            } else {
                setFilteredItems({
                    ...filteredItems,
                    bolmes: [...resultsState?.filters?.bolmes],
                })

            }
        }
    }


    function onOpenItem() {
        setOpened(!opened)
    }



    return (
        <div className='filter-item' onClick={onOpenItem}>
            <div className='header'>
                <div className='label' style={openedLabelStyles}>Məcəllələr</div>
                <Icon component={ArrowDownIcon} className='icon' style={{ transform: opened && 'rotate(0.5turn)' }} />
                {
                    !!selectedItems.mecelles.length &&
                    <div className='count-circle'>
                        <div className='text'>{selectedItems.mecelles?.length}</div>
                    </div>
                }
            </div>
            {
                opened && !!filteredItems.mecelles?.length &&
                <div className='children-wrapper' onClick={(e) => e.stopPropagation()}>
                    <div className='children'>
                        {
                            filteredItems.mecelles?.filter(mec => !!mec.name).map((item, i) =>
                                <CheckBoxItem
                                    key={item.id}
                                    checked={!!selectedItems.mecelles.filter(mec => mec.id == item.id)?.length}
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