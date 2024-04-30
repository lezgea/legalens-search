import { Modal } from 'antd'
import React from 'react'


export const PrivacyPolicyModal = (props) => {
    let { showModal, handleOk, handleCancel } = props

    return (
        <Modal
            width={800}
            title="Privacy Policy"
            open={showModal}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <div style={{ height: "70vh", overflow: "hidden" }}>
                <section className="privacy-page">
                    <div className="container">
                        <div className='label'>Privacy Policy</div>
                        <div className='date'>Effective Date: February 12, 2024</div>
                        <div className='description'>
                            Welcome to Neyron.ai (the "Website"), owned and operated by Neyron.ai ("we", "us", or "our"). We are committed to protecting the privacy and security of our users and customers. This Privacy Policy outlines the types of information we may collect from you or that you may provide when you visit our website and our practices for collecting, using, maintaining, protecting, and disclosing that information.
                        </div>
                        <div className='description'>
                            This policy applies to information we collect:
                            <ul className='list'>
                                <li>On this Website.</li>
                                <li>In email, text, and other electronic messages between you and this Website.</li>
                                <li>Through mobile and desktop applications you download from this Website, which provide dedicated non-browser-based interaction between you and this Website.</li>
                                <li>When you interact with our advertising and applications on third-party websites and services, if those applications or advertising include links to this policy.</li>
                            </ul>
                        </div>
                        <div className='description'>
                            It does not apply to information collected by:
                            <ul className='list'>
                                <li>us offline or through any other means, including on any other website operated by any third party; </li>
                            </ul>
                            <div className='or'>or</div>
                            <ul className='list'>
                                <li>any third party, including through any application or content (including advertising) that may link to or be accessible from or on the Website.</li>
                            </ul>
                        </div>

                        <div className='section-label'>1. Information We Collect About You and How We Collect It</div>
                        <div className='description'>
                            We collect several types of information from and about users of our Website, including information:
                            <ul className='list'>
                                <li>by which you may be personally identified, such as name, postal address, e-mail address, telephone number, or any other identifier by which you may be contacted online or offline ("personal information");</li>
                                <li>that is about you but individually does not identify you; and/or</li>
                                <li>about your internet connection, the equipment you use to access our Website, and usage details.</li>
                            </ul>
                        </div>
                        <div className='description'>
                            We collect this information:
                            <ul className='list'>
                                <li>Directly from you when you provide it to us.</li>
                                <li>Automatically as you navigate through the site. Information collected automatically may include usage details, IP addresses, and information collected through cookies, web beacons, and other tracking technologies.</li>
                                <li>From third parties, for example, our business partners.</li>
                            </ul>
                        </div>

                        <div className='section-label'>2. How We Use Your Information</div>
                        <div className='description'>
                            We use information that we collect about you or that you provide to us, including any personal information:
                            <ul className='list'>
                                <li>To present our Website and its contents to you.</li>
                                <li>To provide you with information, products, or services that you request from us.</li>
                                <li>To fulfill any other purpose for which you provide it.</li>
                                <li>To provide you with notices about your account/subscription, including expiration and renewal notices.</li>
                                <li>To carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection.</li>
                                <li>To notify you about changes to our Website or any products or services we offer or provide through it.</li>
                                <li>For any other purpose with your consent.</li>
                            </ul>
                        </div>

                        <div className='section-label'>3. Disclosure of Your Information</div>
                        <div className='description'>
                            We may disclose aggregated information about our users, and information that does not identify any individual, without restriction. We may disclose personal information that we collect or you provide as described in this privacy policy:
                            <ul className='list'>
                                <li>To our subsidiaries and affiliates.</li>
                                <li>To contractors, service providers, and other third parties we use to support our business.</li>
                                <li>To fulfill the purpose for which you provide it.</li>
                                <li>For any other purpose disclosed by us when you provide the information.</li>
                                <li>With your consent.</li>
                            </ul>
                        </div>
                        <div className='description'>
                            We may also disclose your personal information:
                            <ul className='list'>
                                <li>To comply with any court order, law, or legal process, including to respond to any government or regulatory request.</li>
                                <li>To enforce or apply our terms of use and other agreements, including for billing and collection purposes.</li>
                                <li>If we believe disclosure is necessary or appropriate to protect the rights, property, or safety of Neyron.ai, our customers, or others.</li>
                            </ul>
                        </div>

                        <div className='section-label'>4. Data Security</div>
                        <div className='description'>
                            We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. The safety and security of your information also depend on you. Where we have given you (or where you have chosen) a password for access to certain parts of our Website, you are responsible for keeping this password confidential. We ask you not to share your password with anyone.
                        </div>

                        <div className='section-label'>5. Data Retention</div>
                        <div className='description'>
                            We will only retain your personal information for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
                        </div>

                        <div className='section-label'>6. Your Rights</div>
                        <div className='description'>
                            Under certain circumstances, you have rights under data protection laws in relation to your personal information. These include the right to:
                            <ul className='list'>
                                <li>Request access to your personal information.</li>
                                <li>Request correction of your personal information.</li>
                                <li>Request erasure of your personal information.</li>
                                <li>Object to processing of your personal information.</li>
                                <li>Request restriction of processing your personal information.</li>
                                <li>Request transfer of your personal information.</li>
                                <li>Right to withdraw consent.</li>
                            </ul>
                            If you wish to exercise any of the rights set out above, please contact us at info@neyron.ai.
                        </div>

                        <div className='section-label'>7. Changes to Our Privacy Policy</div>
                        <div className='description'>
                            It is our policy to post any changes we make to our privacy policy on this page. If we make material changes to how we treat our users' personal information, we will notify you through a notice on the Website home page. The date the privacy policy was last revised is identified at the top of the page.
                        </div>

                        <div className='section-label'>8. Contact Information</div>
                        <div className='description'>
                            To ask questions or comment about this privacy policy and our privacy practices, contact us at:
                            <div className='email'>Email: <a>info@neyron.ai</a></div>
                        </div>
                    </div>
                </section>
            </div>
        </Modal>
    )
}