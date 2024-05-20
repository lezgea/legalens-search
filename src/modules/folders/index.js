import React from 'react'
import Icon from '@ant-design/icons';
import { useRouter } from 'next/router'
import { CloseIcon, FacebookIcon, FolderLargeAddIcon, FolderLargeIcon, InstagramIcon, LinkedinIcon, PlusBoldIcon, ThinSearchIcon } from '../../assets/icons';
import { useSearchContext } from '@/context/search-context';
import { Button, Divider, Form, Modal } from 'antd';
import { useResultsContext } from '@/context/results-context';
import { Image } from 'antd'
import { useSearch } from '@/hooks/use-search';
import { MainHeader } from '@/components/large';
import { v4 as uuidv4 } from 'uuid';
import { useSearchHistoryMutation } from '@/hooks/use-search-history';
import Loader from '@/components/large/loader';
import { useFoldersData, useFoldersMutation } from '@/hooks/use-folders';
import { FloatInput } from '@/components/small';
import useNotification from 'antd/es/notification/useNotification';
import moment from 'moment/moment';



export default function FoldersModule() {
    const [state, setState] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        {
            folderContent: [],
            docsLoading: false,
            loading: false,
            showAddFolderForm: false,
            showEditFolderModal: false,
            showAddFileModal: false,
            deleteId: false,
            folderId: '',
            fileFormData: {
                name: null,
                file: null,
            },
        }
    )

    const { showNotification } = useNotification()
    const { searchState, setSearchState } = useSearchContext()
    const { setResultsState, setColors } = useResultsContext()
    const router = useRouter()

    const { data = [], refetch, isFetching } = useSearch({ query: searchState.searchValue, offset: searchState.offset }, () => { })
    const { mutate: postSearchHistory, isSuccess, isLoading: postSearchHistoryLoading } = useSearchHistoryMutation()
    const { data: foldersData = [], refetch: refetchFolders, isFetching: isFetchingFolders } = useFoldersData()


    const getDeviceID = () => {
        let deviceID = localStorage.getItem('deviceID')
        if (!deviceID) {
            deviceID = uuidv4()
            localStorage.setItem('deviceID', deviceID)
        }
        return deviceID
    }


    const getSourceID = () => {
        let legalSourceID = localStorage.getItem('legalSourceID')
        if (!legalSourceID) {
            legalSourceID = router?.query?.s
            localStorage.setItem('legalSourceID', legalSourceID)
        }
        return legalSourceID
    }


    const getCompanyID = () => {
        let legalCompanyID = localStorage.getItem('legalCompanyID')
        if (!legalCompanyID) {
            legalCompanyID = router?.query?.c
            localStorage.setItem('legalCompanyID', legalCompanyID)
        }
        return legalCompanyID
    }


    const deviceID = getDeviceID()
    const legalSourceID = getSourceID()
    const legalCompanyID = getCompanyID()


    function updateResultsState() {
        setResultsState({ loading: isFetching })
        if (!!data?.length) {
            setResultsState({ list: data[0], searchKeys: data[1] })
            setColors([...Object.values(data[2])])
        } else {
            setResultsState({ list: [], searchKeys: [] })
            setColors([])
        }
    }

    async function getSearchDataAndKeys() {
        postSearchHistory({
            search: searchState.searchValue,
            uniqueId: deviceID,
            source: legalSourceID,
            campaignId: legalCompanyID,
        })
        refetch()
        router.push('/results')
    }


    function onClickAddFolder() {
        setState({ showAddFolderModal: true })
    }


    function onOpenFolder(id) {
        setState({ folderId: id })
    }


    function onDeleteFolder(id) {
        setState({ deleteId: id })
    }


    function onEditFolder(item) {
        setState({
            folderId: item.id,
            folderName: item.name,
            showEditFolderModal: true,
        })
    }


    const mutationOptions = {
        onSuccess: () => {
            showNotification({ title: 'Uğurlu əməliyyat!', variant: 'success' });
            refetchFolders();
        },
        onError: (res) => {
            showNotification({ title: res?.response?.data?.message || 'Uğursuz əməliyyat!', variant: 'error' });
        },
    }


    React.useEffect(() => {
        updateResultsState()
    }, [data[1]])


    return (
        <div className='folders-page-wrapper'>
            <MainHeader />
            {
                isFetchingFolders && <Loader />
            }
            <div className='content-wrapper'>
                <div className='folders-wrapper'>
                    <div className='folder-add-button' onClick={onClickAddFolder}>
                        <FolderLargeAddIcon style={{ width: 170 }} />
                        <div className='label-wrapper'>
                            <PlusBoldIcon />
                            <div className='label'>Qovluq yarat</div>
                        </div>
                    </div>
                    {
                        foldersData?.data?.map((item, i) =>
                            <div
                                key={i}
                                className={`folder-wrapper${(state.folderId === item.id) ? '-selected' : ''}`}
                                onClick={() => onOpenFolder(item.id)}
                            >
                                <FolderLargeIcon index={i} style={{ width: 170 }} />
                                <div className='folder-content-wrapper'>
                                    {/* <div className='icons-wrapper'>
                                        {
                                            item.editable &&
                                            <>
                                                <div className='delete-button-wrapper' onClick={() => onDeleteFolder(item.id)}>
                                                    <CloseIcon className='delete-icon' />
                                                </div>
                                                <div className='edit-button-wrapper' onClick={() => onEditFolder(item)}>
                                                    <EditIcon className='edit-icon' />
                                                </div>
                                            </>
                                        }
                                    </div> */}
                                    <div className='label-wrapper'>
                                        <div className='label'>{item.name}</div>
                                    </div>
                                    <div className='folder-bottom'>
                                        <div className='folder-articles-count'>
                                            {!!item.count ? `${item.count} Fayl` : null}
                                        </div>
                                        <div className='folder-creation-date'>{moment(item.createdAt).format('LL')}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                <Divider />
                {
                    // (isLoadingDocs || addFileLoading || fileLoading) &&
                    // <Loader />
                }
                {
                    // !!state.folderId &&
                    // <div className='documents-content-wrapper'>
                    //     <div className='buttons-wrapper'>
                    //         {
                    //             state.folderId !== folders[0]?.id &&
                    //             <div className='attach-button-wrapper'>
                    //                 <div className='attach-button'>
                    //                     <input type="file" className='attach-file-input' onChange={onAddFile} />
                    //                     <FileAddIcon className='icon' />
                    //                     <div className='label'>Sənəd əlavə et</div>
                    //                 </div>
                    //             </div>
                    //         }
                    //         {
                    //             docsData.map((item, i) =>
                    //                 <AttachButton key={item.id} reloadDocs={refetchDocs} {...item} />
                    //             )
                    //         }
                    //     </div>
                    // </div>
                }

                <FolderAddModal
                    reloadFolders={refetchFolders}
                    visible={state.showAddFolderModal}
                    mutationOptions={mutationOptions}
                    setState={setState}
                    setVisible={() => setState({ showAddFolderModal: false })}
                    onClose={() => setState({ showAddFolderModal: false })}
                />
            </div>

            {/* FOOTER */}
            <div className='footer-bottom'>
                <div className='footer-icons-wrapper'>
                    <a href='https://www.linkedin.com/company/legalens/' target='_blank'>
                        <Icon component={LinkedinIcon} className='footer-icon' />
                    </a>
                    <a href='https://www.facebook.com/profile.php?id=61555927896263&is_tour_dismissed=true' target='_blank'>
                        <Icon component={FacebookIcon} className='footer-icon' />
                    </a>
                    <a href='https://www.instagram.com/legalens.ai/' target='_blank'>
                        <Icon component={InstagramIcon} className='footer-icon' />
                    </a>
                </div>
                <div className='footer-ai-wrapper'>
                    <div className='footer-ai-text'>Product of</div>
                    <Image
                        src='/assets/SVG/ai-logo.svg'
                        className='footer-ai-logo'
                        preview={false}
                        onClick={() => router.push('/')}
                    />
                </div>
            </div>
        </div>
    )
}



const FolderAddModal = (props) => {
    let { visible, setVisible, setState, reloadFolders, mutationOptions, onClose } = props

    const [folderParams, setFolderParams] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        {
            name: '',
        },
    )

    const { mutate: createFolder, isLoading: createFolderLoading } = useFoldersMutation()


    async function onAddNewFolder() {
        createFolder(folderParams, mutationOptions)
        await reloadFolders()
        onCloseFolder()
    }

    function onCloseFolder() {
        setFolderParams({ name: '' })
        onClose()
    }


    return (
        <Modal
            visible={visible}
            setVisible={setVisible}
            width="500px"
            view={true}
            title='Yeni Qovluq'
            onCancel={onCloseFolder}
            onClose={onCloseFolder}
            onOk={onAddNewFolder}
        >
            <div className='sign-in-wrapper'>
                <Form
                    className='sign-in-card'
                    style={{ marginTop: 30 }}
                    name="basic"
                    initialValues={{
                        remember: true
                    }}
                    onFinish={onAddNewFolder}
                    onFinishFailed={() => { }}
                >
                    {createFolderLoading && <Loader />}
                    <FloatInput
                        label='Qovluq adı'
                        value={folderParams.name}
                        onChange={(e) => { e.stopPropagation(); setFolderParams({ name: e.target.value }) }}
                        onKeyDown={(e) => e.key === 'Enter' && onAddNewFolder()}
                    />
                    {/* <Button
                        loading={createFolderLoading}
                        disabled={!folderParams.name}
                        className={!folderParams.name ? 'sign-in-button-disabled' : 'sign-in-button'}
                        onClick={onAddNewFolder}
                    >
                        Əlavə et
                    </Button> */}
                </Form>
            </div>
        </Modal>
    )
}
