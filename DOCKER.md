# Docker setup

This project is a Vite React app, so the Docker flow is:

1. Build the app with Node.
2. Serve the production `dist` folder with Nginx.
3. Open the container on a local port.

## Build the image

```bash
docker build -t portfolio-app .
```

## Run the container

```bash
docker run --rm -p 8080:80 portfolio-app
```

Then open:

```text
http://localhost:8080
```

## Test in Docker Desktop

1. Open Docker Desktop.
2. Make sure Docker Engine is running.
3. Build the image from the project folder.
4. Start the container with port mapping `8080:80`.
5. Visit `http://localhost:8080`.

## Rebuild after changes

If you change the app, rebuild the image before testing again:

```bash
docker build -t portfolio-app .
docker run --rm -p 8080:80 portfolio-app
```
