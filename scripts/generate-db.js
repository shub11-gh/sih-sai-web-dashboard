const { faker } = require('@faker-js/faker');
const fs = require('fs');

const sports = ['Football','Basketball','Athletics','Swimming','Cricket','Tennis'];
const athletes = [];
const metrics = [];
const evaluations = [];

for (let i=1;i<=220;i++){
  const id = i;
  const sport = faker.helpers.arrayElement(sports);
  const flagged = faker.datatype.boolean(0.15);
  const overall = faker.number.int({ min: 50, max: 99 });
  athletes.push({
    id,
    name: faker.person.fullName(),
    age: faker.number.int({ min: 14, max: 25 }),
    sport,
    team: faker.company.name(),
    position: faker.person.jobTitle(),
    height: faker.number.int({ min: 150, max: 210 }),
    weight: faker.number.int({ min: 45, max: 110 }),
    flagged,
    flagReason: flagged ? faker.helpers.arrayElement(['Improbable improvement','Inconsistent metrics','Sensor anomaly']) : '',
    overall
  });

  const sessions = faker.number.int({ min: 6, max: 14 });
  const start = faker.date.past({ years: 0.5 });
  for (let s=0;s<sessions;s++){
    const date = faker.date.between({ from: start, to: new Date() }).toISOString().slice(0,10);
    const speed = faker.number.int({ min: 60, max: 100 });
    const agility = faker.number.int({ min: 60, max: 100 });
    const endurance = faker.number.int({ min: 60, max: 100 });
    const reaction = faker.number.int({ min: 60, max: 100 });
    const o = Math.round((speed+agility+endurance+reaction)/4);
    metrics.push({ id: `${id}-${s}`, athleteId: id, date, speed, agility, endurance, reaction, overall: o });
  }

  const evCount = faker.number.int({ min: 1, max: 4 });
  for (let e=0;e<evCount;e++){
    evaluations.push({
      id: `${id}-e-${e}`, athleteId: id,
      evaluator: faker.person.fullName(),
      comment: faker.helpers.arrayElement([
        'Strong agility and reaction times.',
        'Endurance needs improvement before next tournament.',
        'Outstanding performance; keep training load steady.',
      ]),
      date: faker.date.recent({ days: 60 }).toISOString().slice(0,10)
    });
  }
}

fs.writeFileSync('db.json', JSON.stringify({ athletes, metrics, evaluations }, null, 2));
console.log('db.json generated');
