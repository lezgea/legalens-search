import React from "react";
import Icon from '@ant-design/icons';
import { LegalensIcon } from '../../../assets/icons'


const Loader = () => {
    return (
        <div className="loader-page-wrapper">
            <div className="loader-wrapper">
                <Icon component={LegalensIcon} className='loader' />
            </div>
        </div>
    )
}

export default Loader;
