import { Checkbox } from 'antd'
import React from 'react'


export const FilterBoxSkeleton = () => {
    return (
        <div className='filter-item'>
            <div className='header'>
                <div className='label-skeleton' />
                <div className='label-skeleton' />
                <div className='label-skeleton' />
                <div className='label-skeleton' />
                {/* <Icon component={ArrowDownIcon} className='icon' style={{ transform: opened && 'rotate(0.5turn)' }} /> */}
                {
                    // !!count &&
                    // <div className='count-circle'>
                    //     <div className='text'>{count}</div>
                    // </div>
                }
            </div>
            {
                // opened && !!data.length &&
                <div className='children-wrapper' onClick={(e) => e.stopPropagation()}>
                    <div className='children'>
                        {
                            // data.map((item, i) =>
                            //     <CheckBoxItem
                            //         key={item.id}
                            //         checked={true}
                            //         label={item.name}
                            //         onCheck={onCheck}
                            //     />
                            // )
                        }
                    </div>
                </div>
            }
        </div>

        // <div className='result-card-wrapper'>
        //     {/* <Checkbox checked={false} onChange={() => { }} /> */}
        //     <div className='result-card'>
        //         <div className='date-skeleton' />
        //         <div className='label-skeleton' />
        //         <div className='description-skeleton' />
        //         <div className='linear-filter-wrapper'>
        //             <div className='linear-filter-skeleton' />
        //         </div>
        //         <div className='text-container'>
        //             <div className='text-skeleton' />
        //             <div className='text-skeleton' />
        //             <div className='text-skeleton' />
        //         </div>
        //     </div>
        // </div>
    )
}
