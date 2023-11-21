from fastapi import APIRouter
from app.douban.movie import Movie

router = APIRouter()

@router.get('/total')
async def movie_total():
    """
    movie total
    """
    movie = Movie()
    return movie.totalCount()

@router.get('/distribution_by_country')
async def movie_distribution_by_country():
    """
    movie distribution by country
    """
    movie = Movie()
    return movie.distribution_by_country()

@router.get('/distribution_by_type')
async def movie_distribution_by_type():
    """
    movie distribution by type
    """
    movie = Movie()
    return movie.distribution_by_type()