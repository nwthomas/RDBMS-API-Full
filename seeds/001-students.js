exports.seed = function(knex, Promise) {
  return knex("students")
    .truncate()
    .then(function() {
      return knex("students").insert([
        { name: "Nathan", cohort_id: 4 },
        { name: "Alexandra", cohort_id: 1 },
        { name: "Ben", cohort_id: 3 }
      ]);
    });
};
