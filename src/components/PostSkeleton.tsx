import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid"

export function PostSkeleton() {
    return (
        <section className="flex border border-blue-200 px-10 py-6 shadow-lg bg-white dark:bg-slate-800 shadow-slate-100 dark:shadow-none rounded-md">
            <div className="flex flex-col items-center mr-6">
                <div className="flex flex-col items-center">
                    <ArrowUpIcon className='h-6 w-6 text-slate-400'/>
                    <p className='text-slate-400'>
                        0
                    </p>
                    <ArrowDownIcon className='h-6 w-6 text-slate-400'/>
                </div>
            </div>
            <div className="w-full">
                <div className="h-5 mb-5 bg-slate-200 animate-pulse rounded-full"></div>
                <div className="h-4 mb-2 bg-slate-200 animate-pulse rounded-full"></div>
                <div className="h-4 mb-2 bg-slate-200 animate-pulse rounded-full"></div>
                <div className="h-4 mb-5 w-72  bg-slate-200 animate-pulse rounded-full"></div>
                <hr />
                <div className="pt-4">
                    <div className="flex items-center text-xs">
                        <div className="w-7 h-7 bg-slate-200 animate-pulse rounded-full"></div>
                        <div className="ml-3 w-48 h-4 bg-slate-200 animate-pulse rounded-full"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}