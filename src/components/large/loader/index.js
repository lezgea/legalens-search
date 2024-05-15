import React from "react";
import Icon from '@ant-design/icons';
import { LegalensLogo } from '../../../assets/icons'


const Loader = () => {
    return (
        <div className="loader-page-wrapper">
            <div className="loader-wrapper">
                <div className="overflow-box"></div>
                <Icon component={LegalensLogo} className='loader' />
            </div>
        </div>
    )
}

export default Loader;
