const db = require("../data/config");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  remove,
  update
};

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes").where({ id: Number(id) });
}

function findSteps(id) {
  return db("schemes")
    .join("steps", "steps.scheme_id", "schemes.id")
    .where("schemes.id", id)
    .select(
      "steps.id",
      "schemes.scheme_name",
      "steps.step_number",
      "steps.instructions"
    )
    .orderBy("steps.step_number");
}

function add(scheme) {
  return db("schemes")
    .insert(scheme, "id")
    .then(ids => ({ id: ids[0] }));
}

function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("schemes")
    .where("id", Number(id))
    .del();
}

// SELECT "steps"."Id", "schemes"."scheme_name", "steps"."step_number", "steps"."instructions" FROM "steps"
// JOIN "schemes" ON "steps"."scheme_id" = "schemes"."id"
