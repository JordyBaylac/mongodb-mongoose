
let express = require('express');
let debug = require('debug')('routers');
 

function init(expressApp) {

    expressApp.use((req, res, next) => {
        debug("request url: %s", req.url);
        if (req.body) {
            debug("request body: %j", req.body);
        }
        next();
    });

    let studentsRouter = express.Router();

    studentsRouter.get('/', function (req, res) {
        res.send(students);
    });

    expressApp.use('/Students', studentsRouter);

}

module.exports = init;

const students = [
    {
      fullname: 'Diana Fagundo',
      average: 97,
      grades: [
        {
          description: '1er grado',
          average: 99,
          courses: [
            {
              description: 'Mathematic',
              mark: 96
            },
            {
              description: 'Science',
              mark: 98
            },
            {
              description: 'Civic History',
              mark: 99.5
            }
          ]
        },
        {
          description: '2er grado',
          average: 95,
          courses: [
            {
              description: 'Mathematic',
              mark: 96
            },
            {
              description: 'Science',
              mark: 94
            },
            {
              description: 'Civic History',
              mark: 95
            }
          ]
        }
      ]
    }
  ];