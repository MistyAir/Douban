from fastapi import APIRouter
from app.douban.music import Music

router = APIRouter()

@router.get('/total')
async def music_total():
    """
    music total
    """
    music = Music()
    return music.totalCount()

@router.get('/distribution_by_style')
async def music_distribution_by_style():
    """
    music distribution by style
    """
    music = Music()
    return music.distribution_by_style()
