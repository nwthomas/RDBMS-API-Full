exports.up = function(knex, Promise) {
  return knex.schema.createTable("cohorts", tbl => {
    tbl.increments("id");
    tbl.string("name", 128);
    tbl.timestamps(true, true);
    tbl.unique("name", "uq_cohorts_name");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("cohorts");
};
