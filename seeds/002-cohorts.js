exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("cohorts")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cohorts").insert([
        { name: "Web 1" },
        { name: "Web 2" },
        { name: "Web 3" },
        { name: "Web 4" },
        { name: "Web 5" },
        { name: "Web 6" },
        { name: "Web 7" },
        { name: "Web 8" },
        { name: "Web 9" },
        { name: "Web 10" },
        { name: "Web 11" },
        { name: "Web 12" },
        { name: "Web 13" },
        { name: "Web 14" },
        { name: "Web 15" },
        { name: "Web 16" }
      ]);
    });
};
