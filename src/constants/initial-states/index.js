
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


export const SEARCH_KEYS_INITIAL = [
    // { id: 1, label: 'AR Qanunları', color: '#7F6DF0' },
    // { id: 2, label: 'Mülkü məcəllə', color: '#77D4CF' },
    // { id: 3, label: 'Artım', color: '#FCBB6E' },
]


export const RESULTS_STATE_INITIAL = {
    loading: false,
    spinnerLoading: false,
    filtersLoading: false,
    searchKeys: [
        // { id: 1, label: 'AR Qanunları', color: '#7F6DF0' },
    ],
    list: [
        // {
        //     id: 1,
        //     label: 'Azərbaycan Respublikası Mülki Məcəlləsi',
        //     description: 'Mülki hüquq sahəsində qanunvericilik. (1-ci fəsil)',
        //     text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        //     date: 'Yan 26, 2021',
        //     checked: false,
        // },
    ],
    filters: {},
    activation_token: '',
    triggerSearch: false,
}


export const SIDEBAR_INITIAL = {
    data: [
        {
            opened: false,
            label: 'Məhkəmə qərarları',
            count: 0,
            children: [
                { id: 'a1', type: 'checkbox', label: 'Qüvvədə', checked: false },
                { id: 'a2', type: 'checkbox', label: 'Qüvvədən düşmüş', checked: false },
            ]
        },
        {
            opened: false,
            label: 'Məhkəmə',
            count: 0,
            children: [
                { id: 'c1', type: 'checkbox', label: 'AR Qanunları', checked: false },
                { id: 'c2', type: 'checkbox', label: 'Prezidentin Fərmanları', checked: false },
                { id: 'c3', type: 'checkbox', label: 'Prezidentin Sərəncamları', checked: false },
                { id: 'c4', type: 'checkbox', label: 'Milli Məclisin qərarları', checked: false },
                { id: 'c5', type: 'checkbox', label: 'NK qərarları', checked: false },
                { id: 'c6', type: 'checkbox', label: 'Beynəlxalq Müqavilələr', checked: false },
                { id: 'c7', type: 'checkbox', label: 'Məcəllələr', checked: false },
                { id: 'c8', type: 'checkbox', label: 'Maliyyə Nazirliyinin', checked: false },
                { id: 'c9', type: 'checkbox', label: 'Ali Məhkəmənin uzun descriiiiiiiptionnnnnnnnnnnnnnnn', checked: false },
            ]
        },
        {
            opened: false,
            label: 'Case type',
            count: 0,
            children: [
                { id: 'd1', type: 'checkbox', label: 'AR Qanunları', checked: false },
                { id: 'd2', type: 'checkbox', label: 'Prezidentin Fərmanları', checked: false },
                { id: 'd3', type: 'checkbox', label: 'Prezidentin Sərəncamları', checked: false },
                { id: 'd4', type: 'checkbox', label: 'Milli Məclisin qərarları', checked: false },
                { id: 'd5', type: 'checkbox', label: 'NK qərarları', checked: false },
                { id: 'd6', type: 'checkbox', label: 'Beynəlxalq Müqavilələr', checked: false },
                { id: 'd7', type: 'checkbox', label: 'Məcəllələr', checked: false },
                { id: 'd8', type: 'checkbox', label: 'Maliyyə Nazirliyinin', checked: false },
                { id: 'd9', type: 'checkbox', label: 'Ali Məhkəmənin uzun descriiiiiiiptionnnnnnnnnnnnnnnn', checked: false },
            ]
        },
        {
            opened: false,
            label: 'Mənbələr',
            count: 0,
            children: [
                { id: 'e1', type: 'checkbox', label: 'AR Qanunları', checked: false },
                { id: 'e2', type: 'checkbox', label: 'Prezidentin Fərmanları', checked: false },
                { id: 'e3', type: 'checkbox', label: 'Prezidentin Sərəncamları', checked: false },
                { id: 'e4', type: 'checkbox', label: 'Milli Məclisin qərarları', checked: false },
                { id: 'e5', type: 'checkbox', label: 'NK qərarları', checked: false },
                { id: 'e6', type: 'checkbox', label: 'Beynəlxalq Müqavilələr', checked: false },
                { id: 'e7', type: 'checkbox', label: 'Məcəllələr', checked: false },
                { id: 'e8', type: 'checkbox', label: 'Maliyyə Nazirliyinin', checked: false },
                { id: 'e9', type: 'checkbox', label: 'Ali Məhkəmənin uzun descriiiiiiiptionnnnnnnnnnnnnnnn', checked: false },
            ]
        },
        {
            opened: false,
            label: 'Tarix aralığı',
            count: 0,
            children: []
        },
        {
            opened: false,
            label: 'Təsnifatlar',
            count: 0,
            children: [
                { id: 'f1', type: 'checkbox', label: 'AR Qanunları', checked: false },
                { id: 'f2', type: 'checkbox', label: 'Prezidentin Fərmanları', checked: false },
                { id: 'f3', type: 'checkbox', label: 'Prezidentin Sərəncamları', checked: false },
                { id: 'f4', type: 'checkbox', label: 'Milli Məclisin qərarları', checked: false },
                { id: 'f5', type: 'checkbox', label: 'NK qərarları', checked: false },
                { id: 'f6', type: 'checkbox', label: 'Beynəlxalq Müqavilələr', checked: false },
                { id: 'f7', type: 'checkbox', label: 'Məcəllələr', checked: false },
                { id: 'f8', type: 'checkbox', label: 'Maliyyə Nazirliyinin', checked: false },
                { id: 'f9', type: 'checkbox', label: 'Ali Məhkəmənin uzun descriiiiiiiptionnnnnnnnnnnnnnnn', checked: false },
            ]
        },
        {
            opened: false,
            label: 'İstinadlar',
            count: 0,
            children: [
                { id: 'g1', type: 'checkbox', label: 'AR Qanunları', checked: false },
                { id: 'g2', type: 'checkbox', label: 'Prezidentin Fərmanları', checked: false },
                { id: 'g3', type: 'checkbox', label: 'Prezidentin Sərəncamları', checked: false },
                { id: 'g4', type: 'checkbox', label: 'Milli Məclisin qərarları', checked: false },
                { id: 'g5', type: 'checkbox', label: 'NK qərarları', checked: false },
                { id: 'g6', type: 'checkbox', label: 'Beynəlxalq Müqavilələr', checked: false },
                { id: 'g7', type: 'checkbox', label: 'Məcəllələr', checked: false },
                { id: 'g8', type: 'checkbox', label: 'Maliyyə Nazirliyinin', checked: false },
                { id: 'g9', type: 'checkbox', label: 'Ali Məhkəmənin uzun descriiiiiiiptionnnnnnnnnnnnnnnn', checked: false },
            ]
        },
        {
            opened: false,
            label: 'Açar sözlər',
            count: 0,
            children: []
        },
        {
            opened: false,
            label: 'Nəşrlər',
            count: 0,
            children: [
                { id: 'h1', type: 'checkbox', label: 'AR Qanunları', checked: false },
                { id: 'h2', type: 'checkbox', label: 'Prezidentin Fərmanları', checked: false },
                { id: 'h3', type: 'checkbox', label: 'Prezidentin Sərəncamları', checked: false },
                { id: 'h4', type: 'checkbox', label: 'Milli Məclisin qərarları', checked: false },
                { id: 'h5', type: 'checkbox', label: 'NK qərarları', checked: false },
                { id: 'h6', type: 'checkbox', label: 'Beynəlxalq Müqavilələr', checked: false },
                { id: 'h7', type: 'checkbox', label: 'Məcəllələr', checked: false },
                { id: 'h8', type: 'checkbox', label: 'Maliyyə Nazirliyinin', checked: false },
                { id: 'h9', type: 'checkbox', label: 'Ali Məhkəmənin uzun descriiiiiiiptionnnnnnnnnnnnnnnn', checked: false },
            ]
        },
    ],
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
