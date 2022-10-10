from fastapi import FastAPI, Depends
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import src.config as app_config
from src.ui import router as ui_router


def get_static_paths():
    return ({"path": "/css", "app": StaticFiles(directory="static/site"), "name": "site"},
            {"path": "/dist/tabler/css", "app": StaticFiles(directory="static/tabler"), "name": "tabler"})


def get_routers():
    return (ui_router.router, )


app = FastAPI()

for item in get_static_paths():
    app.mount(**item)

for item in get_routers():
    app.include_router(item)

