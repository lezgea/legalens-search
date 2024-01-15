
export const SEARCH_STATE_INITIAL = {
    searchValue: '',
    activeFilter: 'h',
}


export const SEARCH_KEYS_INITIAL = [
    // { id: 1, label: 'AR Qanunları', color: '#7F6DF0' },
    // { id: 2, label: 'Mülkü məcəllə', color: '#77D4CF' },
    // { id: 3, label: 'Artım', color: '#FCBB6E' },
]


export const RESULTS_STATE_INITIAL = {
    loading: false,
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
            label: 'Mənbələr',
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
            label: 'Tarix aralığı',
            count: 0,
            children: []
        },
        {
            opened: false,
            label: 'Təsnifatlar',
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
            label: 'İstinadlar',
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
            label: 'Açar sözlər',
            count: 0,
            children: []
        },
        {
            opened: false,
            label: 'Nəşrlər',
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
    ],
}
