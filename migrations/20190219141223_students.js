exports.up = function(knex, Promise) {
  return knex.schema.createTable("students", tbl => {
    tbl.increments("student_id");
    tbl.string("name", 255);
    tbl.timestamps(true, true);
    tbl
      .integer("cohort_id")
      .unsigned()
      .references()
      .inTable("cohorts");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("students");
};
