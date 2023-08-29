'use client'

import React, {FC} from 'react';
import {cacheFn} from '@/utils/memoization';
import {IArcane, IPreparedDate, positionsCounter, settlementDateParser} from '@/utils/arcan';
import Menu from '@/components/menu/menu';
import Header from '@/components/header/header';
import PersonalPortrait from '@/components/personal-portrait/personal-portrait';
import {useParams} from "next/navigation";
import DateForm from "@/components/date-form/date-form";

const BirthdayCalculationPage: FC = () => {
    const params = useParams();
    const {birthday} = params;
    const firstDate = birthday?.toString().split('_')[0] ?? '';
    const secondDate = birthday?.toString().split('_')[1] ?? '';
    const preparedDate = !!firstDate && cacheFn<IPreparedDate>(settlementDateParser)(firstDate);
    const preparedDateCompare = !!secondDate && cacheFn<IPreparedDate>(settlementDateParser)(secondDate);
    const isDate = !!preparedDate && preparedDate.date && preparedDate.month && !!preparedDate.year;
    const isCompareDate = !!preparedDateCompare && preparedDateCompare.date && preparedDateCompare.month &&
        !!preparedDateCompare.year;
    const date: IArcane = positionsCounter(firstDate);
    const dateCompare: IArcane = positionsCounter(secondDate);
    const WrongDate = <div className='settlement-date'>Wrong date</div>;
    const metaTitle = `Расчет психологического портрета личности на основе арканов ${isDate ? `для ${firstDate}` : ''}`;
    const metaDescription = metaTitle;

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <div
                    className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    <DateForm date={birthday.toString()}/>
                </div>
                <div
                    className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                    <Menu/>
                </div>
            </div>

            <div
                className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
                {isDate ?
                    <>
                        <Header
                            title={metaTitle}
                            metaDescription={metaDescription}
                        />
                        <div className={'settlement-date'}>
                            <div className={'date'}>{firstDate}</div>
                            <PersonalPortrait calculation={date}/>
                        </div>
                    </>
                    :
                    WrongDate
                }

                {isCompareDate ?
                    <div className={'settlement-date'}>
                        <div>{secondDate}</div>
                        <div>
                            {Object.keys(dateCompare).map((key) => {
                                return <div key={key}>
                                    <div>{JSON.stringify(dateCompare[key])}</div>
                                    <br/></div>;
                            })
                            }
                        </div>
                    </div> :
                    <></>
                }
            </div>
        </main>
    );
}

export default BirthdayCalculationPage;
