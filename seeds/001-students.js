exports.seed = function(knex, Promise) {
  return knex("students")
    .truncate()
    .then(function() {
      return knex("students").insert([
        { name: "Nathan", cohort_id: 16 },
        { name: "Alexandra", cohort_id: 13 },
        { name: "Ben", cohort_id: 15 },
        { name: "Michael", cohort_id: 16 }
      ]);
    });
};
