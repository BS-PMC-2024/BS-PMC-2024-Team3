import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

export function PaginationPage({
  questionAmount,
  currentPage,
  setCurrentPage,
  SendQuestion,
}: {
  questionAmount: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  SendQuestion: () => void;
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(questionAmount / 1); i++) {
    pageNumbers.push(i);
  }

  const maxPageNum = 5;
  const pageNumLimit = Math.floor(maxPageNum / 2);
  let activePages = pageNumbers.slice(
    Math.max(0, currentPage - 1 - pageNumLimit),
    Math.min(currentPage - 1 + pageNumLimit + 1, pageNumbers.length)
  );

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPages = () => {
    const renderedPages = activePages.map((page, idx) => (
      <PaginationItem
        key={idx}
        className={
          currentPage === page
            ? "border border-darkRed bg-mediumBeige rounded-md cursor-pointer"
            : ""
        }
      >
        <PaginationLink
          onClick={() => setCurrentPage(page)}
          className="hover:bg-grayish/50 hover:text-black cursor-pointer"
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    ));

    if (activePages[0] > 1) {
      renderedPages.unshift(
        <PaginationEllipsis
          key="ellipsis-start"
          onClick={() => setCurrentPage(activePages[0] - 1)}
        />
      );
    }
    if (activePages[activePages.length - 1] < pageNumbers.length) {
      renderedPages.push(
        <PaginationEllipsis
          key="ellipsis-end"
          onClick={() =>
            setCurrentPage(activePages[activePages.length - 1] + 1)
          }
        />
      );
    }
    return renderedPages;
  };

  return (
    <>
      <Separator className="my-2 bg-lightRed" />
      <div className="flex justify-between w-full p-4">
        <div className="text-lightRed">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={handlePrevPage}
                  className="hover:bg-grayish/50 hover:text-black cursor-pointer"
                />
              </PaginationItem>
              {renderPages()}
              <PaginationItem>
                <PaginationNext
                  onClick={handleNextPage}
                  className="hover:bg-grayish/50 hover:text-black cursor-pointer"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        <div>
          <Button
            variant={"outline"}
            className="bg-lightBeige hover:bg-grayish/50 border border-lightRed rounded-md text-lightRed"
            onClick={() => SendQuestion()}
            dir="rtl"
          >
            שלח משימה
            <span>
              <PaperAirplaneIcon className="h-6 w-6 rotate-180 mr-2" />
            </span>
          </Button>
        </div>
      </div>
    </>
  );
}
