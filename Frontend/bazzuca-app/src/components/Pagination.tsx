import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";

interface IPaginationProps {
    changePage: (pageNum: number) => void;
    pageNum: number;
    pageCount: number;
}

export default function Pagination(props: IPaginationProps) {
    return (
        <div className="flex justify-center mt-6">
            <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
                <button
                    className="px-3 py-2 text-sm font-medium text-white bg-brand-gray rounded-l-md hover:bg-brand-blue"
                    disabled={!(props.pageNum > 1)}
                    onClick={() => props.changePage(1)}
                >
                    <ChevronFirst className="h-4 w-4" />
                </button>
                <button
                    className="px-3 py-2 text-sm font-medium text-white bg-brand-dark hover:bg-brand-blue"
                    disabled={!(props.pageNum > 1)}
                    onClick={() => props.changePage(props.pageNum - 1)}
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>
                {props.pageNum - 2 > 1 &&
                    <button 
                        className="px-3 py-2 text-sm font-medium text-white bg-brand-dark hover:bg-brand-blue"
                        onClick={() => props.changePage(props.pageNum - 2)}
                    >
                        {props.pageNum - 2}
                    </button>
                }
                {props.pageNum - 1 > 1 &&
                    <button 
                        className="px-3 py-2 text-sm font-medium text-white bg-brand-dark hover:bg-brand-blue"
                        onClick={() => props.changePage(props.pageNum - 1)}
                    >
                        {props.pageNum - 1}
                    </button>
                }
                <span className="px-3 py-2 text-sm font-semibold text-white bg-brand-purple cursor-default">
                    {props.pageNum}
                </span>
                {props.pageNum + 1 <= props.pageCount &&
                    <button 
                        className="px-3 py-2 text-sm font-medium text-white bg-brand-dark hover:bg-brand-blue"
                        onClick={() => props.changePage(props.pageNum + 1)}
                    >
                        {props.pageNum + 1}
                    </button>
                }
                {props.pageNum + 2 <= props.pageCount &&
                    <button 
                        className="px-3 py-2 text-sm font-medium text-white bg-brand-dark hover:bg-brand-blue"
                        onClick={() => props.changePage(props.pageNum + 2)}
                    >
                        {props.pageNum + 2}
                    </button>
                }
                <button
                    className="px-3 py-2 text-sm font-medium text-white bg-brand-dark hover:bg-brand-blue"
                    disabled={!(props.pageNum < props.pageCount)}
                    onClick={() => props.changePage(props.pageNum + 1)}
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
                <button
                    className="px-3 py-2 text-sm font-medium text-white bg-brand-gray rounded-r-md hover:bg-brand-blue"
                    disabled={!(props.pageNum < props.pageCount)}
                    onClick={() => props.changePage(props.pageCount)}
                >
                    <ChevronLast className="h-4 w-4" />
                </button>
            </nav>
        </div>
    );
}