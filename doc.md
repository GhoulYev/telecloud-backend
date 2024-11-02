# Documentation for api

### Api access link

```
https://api.nishimara.com/lab/
```

### Register

creates an empty user in the database

Route: `/register`

Method: `POST`

JSON param

```
id: Integer
```

successfully:
return 200 status code

return 400 status code
on error:

### Set Path in DB

sets the subdomain name to user

Route: `/setpath`

Method: `POST`

JSON param

```
id: Integer
path: String
```

successfully:
return 200 status code

on error:
return 400 status code

### Retrieve All User Files

returns all user files from the database in the form

```
id: Integer
path: String
files: Array of Files
```

Route: `/getfiles`

Method: `POST`

JSON param

```
id: Integer
OR
path: String
```

successfully:
return 200 status code and files in json format

on error:
return 400 status code

### Retrieve User

return user from the database without files

```
id: Integer
path: String
files: Array of Files
```

Route: `/getuser`

Method: `POST`

JSON param

```
id: Integer
```

successfully:
return 200 status code and user in json format

on error:
return 400 status code

### Upload File

uploads the file via a link to the server

Route: `/upload`

Method: `POST`

JSON param

```
id: Integer //id from telegram
fileName: String
url: String //download url
```

successfully:
return 200 status code and file object in the following form

```
id: Integer //file id
fileName: String //real file name
filePath: String //file path on the server
ownerId: Integer //file owner ID
```

on error:
return 400 status code

### Download File

uploads the file via a link to the server

Route: `/download`

Method: `GET`

JSON param

```
fileId: Integer //file id
```

successfully:
download starts

on error:
return 400 status code
