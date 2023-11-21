from fastapi import APIRouter
from app.douban.book import Book

router = APIRouter()

@router.get('/total')
async def book_total():
    """
    book total
    """
    book = Book()
    return book.totalCount()
