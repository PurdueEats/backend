FROM python:3.7-slim
ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./
RUN pip install -r requirements.txt
CMD ["gunicorn", "--bind", ":8080", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "backend.API.routes.api:router"]
