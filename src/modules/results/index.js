import { Header } from '@/components/header';
import { SideFilterBar } from './components';
import { Checkbox } from 'antd';


const results = [
    {
        id: 1,
        label: 'Azərbaycan Respublikası Mülki Məcəlləsi',
        description: 'Mülki hüquq sahəsində qanunvericilik. (1-ci fəsil)',
        text: 'Azərbaycan Respublikasının qanunvericiliyi Azərbaycan Respublikasının Konstitusiyasına əsaslanır və bu, digər qanunlardan və onların əsasında qəbul edilən,                  hüquq normalarını müəyyənləşdirən başqa normativ hüquqi aktlardan ibarətdir.                  qanunvericiliklə müəyyənləşdirilmiş qaydalar, əgər qanunda ayrı hal nəzərdə tutulmayıbsa, əcnəbilərin, vətəndaşlığı olmayan şəxslərin və xarici hüquqi şəxslərin iştirak etdiyi münasibətlərə də tətbiq olunur.',
        date: 'Yan 26, 2021',
        checked: false,
    },
    {
        id: 2,
        label: 'Mülki qanunvericilik və beynəlxalq hüquq aktları',
        description: 'Mülki hüquq sahəsində qanunvericilik. (3-cü fəsil)',
        text: 'Azərbaycan Respublikasının tərəfdar çıxdığı dövlətlərarası müqavilələr bu ilə tənzimlənən hüquq münasibətlərinə (beynəlxalq müqavilədən onun tətbiqi üçün dövlətdaxili normativ hüquqi aktın qəbul edilməsi tələbinin irəli gəldiyi hallar istisna edilməklə) birbaşa tətbiq edilir.',
        date: 'Yan 26, 2021',
        checked: false,
    },
    {
        id: 3,
        label: 'Mülki hüquq münasibətlərinin subyektləri',
        description: 'Mülki hüquq sahəsində qanunvericilik. (2-ci fəsil)',
        text: 'Mulki qanunvericilik mülki hüquq münasibətləri subyektlərinin hüquqi vəziyyətini, mülkiyyət hüququnun və başqa əmlak hüquqlarının əmələ gəlməsi əsaslarını və həyata keçirilməsi qaydasını müəyyənləşdirir,                         və digər öhdəlik münasibətlərini, habelə sair əmlak münasibətlərini və onlarla bağlı olan şəxsi qeyri-əmlak münasibətlərini tənzimləyir.',
        date: 'Yan 26, 2021',
        checked: false,
    },
    {
        id: 4,
        label: 'Azərbaycan Respublikası Mülki Məcəlləsi',
        description: 'Mülki hüquq sahəsində qanunvericilik. (1-ci fəsil)',
        text: 'Azərbaycan Respublikasının qanunvericiliyi Azərbaycan Respublikasının Konstitusiyasına əsaslanır və bu, digər qanunlardan və onların əsasında qəbul edilən,                  hüquq normalarını müəyyənləşdirən başqa normativ hüquqi aktlardan ibarətdir.                  qanunvericiliklə müəyyənləşdirilmiş qaydalar, əgər qanunda ayrı hal nəzərdə tutulmayıbsa, əcnəbilərin, vətəndaşlığı olmayan şəxslərin və xarici hüquqi şəxslərin iştirak etdiyi münasibətlərə də tətbiq olunur.',
        date: 'Yan 26, 2021',
        checked: false,
    },
    {
        id: 5,
        label: 'Mülki qanunvericilik və beynəlxalq hüquq aktları',
        description: 'Mülki hüquq sahəsində qanunvericilik. (3-cü fəsil)',
        text: 'Azərbaycan Respublikasının tərəfdar çıxdığı dövlətlərarası müqavilələr bu ilə tənzimlənən hüquq münasibətlərinə (beynəlxalq müqavilədən onun tətbiqi üçün dövlətdaxili normativ hüquqi aktın qəbul edilməsi tələbinin irəli gəldiyi hallar istisna edilməklə) birbaşa tətbiq edilir.',
        date: 'Yan 26, 2021',
        checked: false,
    },
    {
        id: 6,
        label: 'Mülki hüquq münasibətlərinin subyektləri',
        description: 'Mülki hüquq sahəsində qanunvericilik. (2-ci fəsil)',
        text: 'Mulki qanunvericilik mülki hüquq münasibətləri subyektlərinin hüquqi vəziyyətini, mülkiyyət hüququnun və başqa əmlak hüquqlarının əmələ gəlməsi əsaslarını və həyata keçirilməsi qaydasını müəyyənləşdirir,                         və digər öhdəlik münasibətlərini, habelə sair əmlak münasibətlərini və onlarla bağlı olan şəxsi qeyri-əmlak münasibətlərini tənzimləyir.',
        date: 'Yan 26, 2021',
        checked: false,
    },
    {
        id: 7,
        label: 'Azərbaycan Respublikası Mülki Məcəlləsi',
        description: 'Mülki hüquq sahəsində qanunvericilik. (1-ci fəsil)',
        text: 'Azərbaycan Respublikasının qanunvericiliyi Azərbaycan Respublikasının Konstitusiyasına əsaslanır və bu, digər qanunlardan və onların əsasında qəbul edilən,                  hüquq normalarını müəyyənləşdirən başqa normativ hüquqi aktlardan ibarətdir.                  qanunvericiliklə müəyyənləşdirilmiş qaydalar, əgər qanunda ayrı hal nəzərdə tutulmayıbsa, əcnəbilərin, vətəndaşlığı olmayan şəxslərin və xarici hüquqi şəxslərin iştirak etdiyi münasibətlərə də tətbiq olunur.',
        date: 'Yan 26, 2021',
        checked: false,
    },
    {
        id: 8,
        label: 'Mülki qanunvericilik və beynəlxalq hüquq aktları',
        description: 'Mülki hüquq sahəsində qanunvericilik. (3-cü fəsil)',
        text: 'Azərbaycan Respublikasının tərəfdar çıxdığı dövlətlərarası müqavilələr bu ilə tənzimlənən hüquq münasibətlərinə (beynəlxalq müqavilədən onun tətbiqi üçün dövlətdaxili normativ hüquqi aktın qəbul edilməsi tələbinin irəli gəldiyi hallar istisna edilməklə) birbaşa tətbiq edilir.',
        date: 'Yan 26, 2021',
        checked: false,
    },
    {
        id: 9,
        label: 'Mülki hüquq münasibətlərinin subyektləri',
        description: 'Mülki hüquq sahəsində qanunvericilik. (2-ci fəsil)',
        text: 'Mulki qanunvericilik mülki hüquq münasibətləri subyektlərinin hüquqi vəziyyətini, mülkiyyət hüququnun və başqa əmlak hüquqlarının əmələ gəlməsi əsaslarını və həyata keçirilməsi qaydasını müəyyənləşdirir,                         və digər öhdəlik münasibətlərini, habelə sair əmlak münasibətlərini və onlarla bağlı olan şəxsi qeyri-əmlak münasibətlərini tənzimləyir.',
        date: 'Yan 26, 2021',
        checked: false,
    },
]



export default function ResultsModule() {
    return (
        <div className='results-wrapper'>
            <Header />
            <div className='results-inner-wrapper'>
                <SideFilterBar />
                <div className='results-content-wrapper'>
                    {
                        results.map(item =>
                            <ResultCard
                                key={item.id}
                                {...item}
                            />
                        )
                    }
                </div>

            </div>
        </div>
    )
}



const ResultCard = (props) => {
    let { label, description, text, checked } = props

    return (
        <div className='result-card-wrapper'>
            <Checkbox checked={checked} onChange={() => { }} />
            <div className='result-card'>
                <div className='label'>{label}</div>
                <div className='description'>{description}</div>
                <div className='text'>{text}</div>
            </div>
        </div >
    )
}
