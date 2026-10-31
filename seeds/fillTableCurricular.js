/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('curricular').del()
  await knex('curricular').insert([
    { name: 'Democracy', coordinator: "Mr.Dorji", noOfStudent: 30, activity: "coordinating election, advocacy on election, camping, " }
  ]);
};
