from fastapi import FastAPI
from app.routers import movie, music, book
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

app.include_router(movie.router, prefix='/movie', tags=['movie'])
app.include_router(music.router, prefix='/music', tags=['music'])
app.include_router(book.router, prefix='/book', tags=['book'])

@app.get('/')
async def index():
    return 'Hello FastAPI'