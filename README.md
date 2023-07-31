# J4J Interview Simulation

### Heads up

* Feel free to use any outside dependency you'd like, but please provide a good reason for and against using said dependency.
* Just like during work itself, you are free to browse the internet to read docs and get help, just don't use any AI assistance.
* In order to check your answers there are premade unit tests. use the `test` script followed up by `p` and either `parser` or `aggragate` regex to check only your current assigment.
## Exercise 1: Warm up
Write a function that takes an xml formatted string as input and returns an object that holds each tag as a key, and it's number of occurrences as a value.

It can be assumed that every opening tag has a closing tag.

## Exercise 2: Data Aggregation

Located in `src/data/response.ts` is a mock response from one of our api endpoints, the data looks like this:
```javascript
[
  {
    name: 'Daniel',
    group: 'Management',
    date: '01/01/2023',
    totalHours: 3,
  },
  {
    name: 'Daniel',
    group: 'Management',
    date: '01/01/2023',
    totalHours: 4,
  },
  {
    name: 'Daniel',
    group: 'Management',
    date: '12/01/2023',
    totalHours: 2.5,
  },
  {
    name: 'Daniel',
    group: 'Management',
    date: '13/01/2023',
    totalHours: 6,
  }
  //.....
]
```
##### Field Details 

| Field       | Type    | Description                                           |
| ----------- | ------- |------------------------------------------------------ |
| name        | string  | Name of the employee                                  |
| group       | string  | Assigned role for the employee for current instance   |
| date        | string  | A formatted date string following DD/MM/YYYY format   |
| totalHours  | number  | Total hours worked for specific date as specific role |


Write a function using TypeScript that takes the following parameters:

| Parameter | Description                                                                         |
| ----------| ----------------------------------------------------------------------------------- |
| data      | An array of  entities from our api response to act on                               |
| group     | Name of the field to group data by, can only be `name` or `group`                   |
| period    | The time period to group the data by, can only be `day` or `month`                  |
| start     | A date filter marking the beginning of a range of dates to act upon, of type `Date` |
| end       | A date filter marking the end of a range of dates to act upon, of type `Date`       |

The function will group the data according to the selected field and create an object containing the key of the `group` field and an array of values as an object containing the date range based on `period` with `DD/MM/YYYY` format if period is `day` or `MM` if period is `month` and the `total` hours of worked per `date` for the group.


Please consult the following output examples for reference:

###### group by `name` and `day` output
```javascript
{
  "daniel": {
    "key": "daniel",
    "values": [
      { "date": "01/01/2023", "total": 7 },
      { "date": "02/01/2023", "total": 3 },
      // ....
      { "date": "02/03/2023", "total": 0 },
      { "date": "03/03/2023", "total": 0 }
    ]
  },
  "israel": {
    "key": "israel",
    "values": [
      { "date": "01/01/2023", "total": 0 },
      { "date": "02/01/2023", "total": 0 },
      // ....

      { "date": "02/03/2023", "total": 0 },
      { "date": "03/03/2023", "total": 0 }
    ]
  },
  "orad": {
    "key": "orad",
    "values": [
      { "date": "01/01/2023", "total": 0 },
      { "date": "02/01/2023", "total": 0 },
      { "date": "03/01/2023", "total": 0 },
      { "date": "04/01/2023", "total": 1 },
     // ......
    ]
  }
}

```
###### group by `group` and `month` output
```javascript
{
  "management": {
    "key": "management",
    "values": [
      { "date": "01", "total": 44 },
      { "date": "02", "total": 13 },
      { "date": "03", "total": 0 }
    ]
  },
  "dev": {
    "key": "dev",
    "values": [
      { "date": "01", "total": 66 },
      { "date": "02", "total": 18 },
      { "date": "03", "total": 5 }
    ]
  }
}
```

###### Please make sure that all dates of the range are given, even if their total hour value is 0

## Exercise 3: React

1. fire up an instance of our server from docker using `docker run -p 4500:4500 -e PORT=4500  danirdd92/api:v1`
2. create a components that holds controls to set the parameters of our function from (2). Feel free to implement however you want.
3. create a seperate components that displays the aggragated data in a table form. Feel free to use any ui library you are most comfortable with.

###### group by `name` and `day` table example

| name    | 01/01 | 02/01 | 03/01 |...  |                                                                       
| ------- | ----- | ----- | ----- |---- |
| daniel  | 7     | 3     | 0     | ... |
| israel  | 19    | 2     | 10    | ... |
| orad    | 25    | 49    | 0     | ... |



###### group by `group` and `month` table example

| group       | 01  | 02   | 03  |...  |                                                                       
| ----------- | --- | ---  | --- | --- |
| development | 59  | 58.5 | 120 | ... |
| managment   | 192 | 41   | 18  | ... |

###### BONUS - Can you make the dates more human readable? (i.e 01 - January etc...)