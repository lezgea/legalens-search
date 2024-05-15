
export const SEARCH_STATE_INITIAL = {
    searchValue: '',
    activeFilter: 'h',
    offset: 0,
    activateSearch: false,
}


export const SELECTED_STATE_INITIAL = {
    mecelles: [],
    bolmes: [],
    fesils: [],
}


export const SEARCH_KEYS_INITIAL = []


export const USER_STATE_INITIAL = {
    email: "",
    id: null,
    name: "",
    surname: "",
    role: "",
    status: "",
}

export const RESULTS_STATE_INITIAL = {
    loading: false,
    spinnerLoading: false,
    filtersLoading: false,
    search_as_phrase: false,
    searchKeys: [],
    list: [],
    filters: {},
    activation_token: '',
    triggerSearch: false,
}



export const MAIN_PAGE_FILTER_BUTTONS = [
    {
        label: 'Praktika sahəsi',
        children: [
            { key: 1, id: '11', label: 'İnformasiya təhlükəsizliyi' },
            { key: 2, id: '12', label: 'Kommersiya əməliyyatları' },
            { key: 3, id: '13', label: 'Kapital bazarına nəzarət' },
            { key: 4, id: '14', label: 'Energetika və kommunal xidmətlər' },
            { key: 5, id: '15', label: 'Sosial təminat' },
            { key: 6, id: '16', label: 'Əmək və məşğulluq' },
            { key: 7, id: '17', label: 'Sığorta' },
            { key: 8, id: '18', label: 'Daşınmaz əmlak' },
            { key: 9, id: '19', label: 'Şəxsi kapital və investisiyaların idarə edilməsi' },
            { key: 10, id: '191', label: 'Lisenziyalar və icazələr haqqında' },
        ],
    },
    {
        label: 'Sərəncamlar',
        children: [
            { key: '1', id: '21', label: 'İnformasiya təhlükəsizliyi', },
            { key: '2', id: '22', label: 'İnformasiya təhlükəsizliyi', },
            { key: '3', id: '23', label: 'İnformasiya təhlükəsizliyi', },
        ],
    },
    {
        label: 'Müraciətlər',
        children: [
            { key: 1, id: '21', label: 'İnformasiya təhlükəsizliyi' },
            { key: 2, id: '22', label: 'Kommersiya əməliyyatları' },
            { key: 3, id: '23', label: 'Kapital bazarına nəzarət' },
        ],
    },
    {
        label: 'Fərmanlar',
        children: [
            { key: 1, id: '21', label: 'İnformasiya təhlükəsizliyi' },
            { key: 2, id: '22', label: 'Kommersiya əməliyyatları' },
            { key: 3, id: '23', label: 'Kapital bazarına nəzarət' },
        ],
    },
    {
        label: 'Bəyənatlar',
        children: [
            { key: 1, id: '21', label: 'İnformasiya təhlükəsizliyi' },
            { key: 2, id: '22', label: 'Kommersiya əməliyyatları' },
            { key: 3, id: '23', label: 'Kapital bazarına nəzarət' },
        ],
    },
    {
        label: 'Məktublar',
        children: [
            { key: 1, id: '21', label: 'İnformasiya təhlükəsizliyi' },
            { key: 2, id: '22', label: 'Kommersiya əməliyyatları' },
            { key: 3, id: '23', label: 'Kapital bazarına nəzarət' },
        ],
    },
]
