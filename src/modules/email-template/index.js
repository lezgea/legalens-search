import React from 'react'
import Icon from '@ant-design/icons';
import { FacebookIcon, InstagramIcon, LinkedinIcon, TiktokIcon, YoutubeIcon } from '@/assets/icons';



export default function EmailTemplateModule() {


    return (
        <div className="template-page-wrapper">
            <div className='template-card'>
                <div className='template-title'>
                    Welcome to Legalens Your AI Adventure Awaits!
                </div>
                <div className='template-description'>
                    Hi there!
                </div>
                <div className='template-description2'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </div>
                <div className='template-button'>
                    Button
                </div>
                <div className='template-icons-wrapper'>
                    <a href='https://www.linkedin.com/company/legalens/' target='_blank'>
                        <Icon component={TiktokIcon} className='footer-icon' />
                    </a>
                    <a href='https://www.facebook.com/profile.php?id=61555927896263&is_tour_dismissed=true' target='_blank'>
                        <Icon component={FacebookIcon} className='footer-icon' />
                    </a>
                    <a href='https://www.instagram.com/legalens.ai/' target='_blank'>
                        <Icon component={InstagramIcon} className='footer-icon' />
                    </a>
                    <a href='https://www.linkedin.com/company/legalens/' target='_blank'>
                        <Icon component={LinkedinIcon} className='footer-icon' />
                    </a>
                    <a href='https://www.facebook.com/profile.php?id=61555927896263&is_tour_dismissed=true' target='_blank'>
                        <Icon component={YoutubeIcon} className='footer-icon' />
                    </a>
                </div>
                <div className='template-footer-description'>2023 | Legalens | All rights reserved</div>
            </div>
        </div>
    )
}