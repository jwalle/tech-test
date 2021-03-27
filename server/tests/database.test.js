// const db = require('../db');


// beforeAll(async () => {
//     await db.sequelize.sync();
// });

// test('create score', async () => {
//     expect.assertions(1);
//     const score = await db.Score.create({
//         username: 'lucas',
//         kills: 12,
//         date: new Date(),
//     });
//     expect(score.id).toEqual(1);
// });

// test('get score', async () => {
//     expect.assertions(2);
//     const score = await db.Score.findByPk(1);
//     expect(score.username).toEqual('lucas');
//     expect(score.kills).toEqual(12);
// });

// test('delete score', async () => {
//     expect.assertions(1);
//     await db.Score.destroy({
//         where: {
//             id: 1,
//         },
//     });
//     const score = await db.Score.findByPk(1);
//     expect(score).toBeNull();
// });

// afterAll(async () => {
//     await db.sequelize.close();
// });
