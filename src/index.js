import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});



app.get('/task2b', (req, res) => {
  let regABC = /^[а-яА-ЯёЁa-zA-Zó\' ]+$/;
  let regNum = /\d/;

  let capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  let cutName = (name) => `${name.charAt(0)}.`.toUpperCase();

  let getShortName = (fullname) => {
    let shortName = 'Invalid fullname';

    fullname = fullname.replace(/^\s+|\s+$/g, '');
    fullname = fullname.replace(/[ \t]{2,}/g, ' ');
    fullname = fullname.toLowerCase();
    
    if (fullname.length && regABC.test(fullname) && !regNum.test(fullname)) {
      let names = fullname.split(' ');
      let lastName = capitalizeFirstLetter(`${names[names.length-1]}`);

      switch(names.length) {
        case 3:
          shortName = `${lastName} ${cutName(names[0])} ${cutName(names[1])}`;
        break;
        case 2:
          shortName = `${lastName} ${cutName(names[0])}`;
        break;
        case 1:
          shortName = `${lastName}`;
        break;
      }
    }
    return shortName;
  }

  res.send(getShortName(req.query.fullname));
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});