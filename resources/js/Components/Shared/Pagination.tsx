interface PaginationProps {
    currentPage: number;
    lastPage: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({
    currentPage,
    lastPage,
    onPageChange,
}: PaginationProps) => {
    const getVisiblePageNumbers = () => {
        const delta = 2;
        let start = Math.max(currentPage - delta, 1);
        let end = Math.min(currentPage + delta, lastPage);

        const displayLength = end - start + 1;
        if (displayLength < 5) {
            if (currentPage < lastPage / 2) {
                end = Math.min(start + 4, lastPage);
            } else {
                start = Math.max(end - 4, 1);
            }
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    return (
        <div className="mt-12 flex justify-center gap-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex h-11 w-11 items-center justify-center rounded-full border border-dark-blue ${
                    currentPage === 1
                        ? 'cursor-not-allowed opacity-50'
                        : 'text-dark-blue hover:bg-gray-100'
                }`}
            >
                &lt;
            </button>

            {getVisiblePageNumbers().map((pageNum) => (
                <button
                    key={pageNum}
                    onClick={() => onPageChange(pageNum)}
                    className={`flex h-11 w-11 items-center justify-center rounded-full border ${
                        pageNum === currentPage
                            ? 'border-dark-blue bg-dark-blue text-white'
                            : 'border-dark-blue text-dark-blue hover:bg-gray-100'
                    }`}
                >
                    {pageNum}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === lastPage}
                className={`flex h-11 w-11 items-center justify-center rounded-full border border-dark-blue ${
                    currentPage === lastPage
                        ? 'cursor-not-allowed opacity-50'
                        : 'text-dark-blue hover:bg-gray-100'
                }`}
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination;
