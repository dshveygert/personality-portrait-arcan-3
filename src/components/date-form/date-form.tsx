'use client'

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';

export default function DateForm({date = ''}: { date?: string }) {
    const router = useRouter();
    const [dateState, setDateState] = useState(date);
    const [disabledState, setDisabledState] = useState(true);

    const handleChange = (e: any) => {
        const val = e.target.value;
        const reg1 = /^\d+$/;
        const reg2 = /^(\d{1,2})-(\d{1,2})$/;
        const reg3 = /^(\d{1,2})-(\d{1,2})-(\d{1,4})$/;
        const shouldFilter = !reg1.test(val) && !reg2.test(val) && !reg3.test(val);
        let filteredValue = shouldFilter ? val.slice(0, -1) : val;
        const length = filteredValue.length;
        if (length === 2 || length === 5) {
            filteredValue += '-';
        }
        setDisabledState(length !== 10);
        setDateState(filteredValue);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        goToLink(dateState);
    };

    const goToLink = (path: string) => {
        router.push(`/date/${path}`);
    };

    return (
        <div className='date-form'>
            <form onSubmit={handleSubmit}>
                <div className="flex max-w-md gap-x-4 text-center">
                    <input id="birth_date"
                           name="birth_date" type="text" autoComplete="birth_date" value={dateState}
                           onChange={handleChange}
                           className="text-center min-w-0 flex-auto rounded-md border-0 bg-white px-3.5 py-2 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 lg:text-lg"
                           placeholder='дд-мм-гггг'/>
                    <button type="submit"
                            disabled={disabledState}
                            className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >Рассчитать
                    </button>
                </div>
            </form>
        </div>
    );
}
