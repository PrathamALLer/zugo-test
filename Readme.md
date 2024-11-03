## DB setup

Start database
```docker run --name my-postgres-db -e POSTGRES_USER=zugo-user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=mydatabase -v my_pgdata:/var/lib/postgresql/data -p 5432:5432 -d postgres```
Start the phppgadmin container
```docker run --name my-phppgadmin -e PHPPGADMIN_SERVER_HOST=my-postgres-db -p 8080:80 -d dockage/phppgadmin
