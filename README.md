<!-- @format -->

# project overview

> attendence system has 2 users Admin who registers new users and employee who confirm user attendence.
> the system will set absent users who has not registered in the system today after particular time automatically.
> the system will automatically empty users who registered today arrays' object everyday at "23:59:00".

## Requirements

Install JSON Server
`npm install -g json-server`

Use JSON Server

`json-server --watch data/users.json -p 3000`

## run project

`index.html`

> For Admin user
- `admin.html`
- `adminreport.html`
- `adminmonthlyreport.html`
> For employee
- ` attendence.html`
- `employees.html`
