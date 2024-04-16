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
    const { resultsState, selectedItems, setSelectedItems } = useResultsContext()
    let openedLabelStyles = opened ? { transform: 'scale(1.05)', fontWeight: '600' } : {}


    function onCheck(item) {
        let checked = !!selectedItems.bolmes.filter(bol => bol.id == item.id)?.length
        setSelectedItems({ fesils: [] })

        if (!checked) {
            let filteredFesils = resultsState?.filters?.fesils?.filter(fes => fes.parent_id == item.id)
            let checkIfFesilsExists = filteredItems.fesils.filter(fes => fes.parent_id == item.id)?.length

            if (!checkIfFesilsExists) {
                setFilteredItems({
                    ...filteredItems,
                    fesils: [...filteredItems.fesils, ...filteredFesils],
                })
            } else {
                setFilteredItems({
                    ...filteredItems,
                    fesils: filteredFesils,
                })
            }
            setSelectedItems({
                bolmes: [...selectedItems.bolmes, item]
            })
        } else {
            let filteredFesils = filteredItems?.fesils?.filter(fes => fes.parent_id !== item.id)
            let filteredBolmes = selectedItems.bolmes?.filter(bol => bol.id !== item.id)

            setSelectedItems({
                bolmes: filteredBolmes,
            })
            if (!!filteredBolmes?.length) {
                setFilteredItems({
                    ...filteredItems,
                    fesils: filteredFesils,
                })
            } else {
                setFilteredItems({
                    ...filteredItems,
                    fesils: [...resultsState?.filters?.fesils],
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
                <div className='label' style={openedLabelStyles}>Ətraflı Axtarış</div>
                <Icon component={ArrowDownIcon} className='icon' style={{ transform: opened && 'rotate(0.5turn)' }} />
            </div>
            {
                opened &&
                <div className='children-wrapper' onClick={(e) => e.stopPropagation()}>
                    <div className='children'>
                        <CheckBoxItem
                            checked={true}
                            label="Söz və ya söz birləşməsi"
                            onCheck={() => { }}
                        />
                        <Slider
                            min={1}
                            max={20}
                            onChange={() => { }}
                            value={typeof inputValue === 'number' ? inputValue : 0}
                        />
                        <div className='checkbox-wrapper'>

                        </div>

                        {
                            // filteredItems.bolmes?.filter(bol => !!bol.name).map((item, i) =>
                            //     <CheckBoxItem
                            //         key={item.id}
                            //         checked={!!selectedItems.bolmes.filter(bol => bol.id == item.id)?.length}
                            //         label={item.name}
                            //         onCheck={() => onCheck(item)}
                            //     />
                            // )
                        }
                    </div>
                </div>
            }
        </div>
    )
}