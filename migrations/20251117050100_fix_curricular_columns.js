/**
 * The 20251106034442_reName migration already renames these columns.
 * Only rename here if the old names are still there, so a fresh
 * `knex migrate:latest` works and older databases are fixed too.
 *
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const hasOldName = await knex.schema.hasColumn("curricular", "name of extra-curricular");
  const hasOldCount = await knex.schema.hasColumn("curricular", "number of student");
  if (!hasOldName && !hasOldCount) return;

  await knex.schema.table("curricular", function (table) {
    if (hasOldName) table.renameColumn("name of extra-curricular", "name");
    if (hasOldCount) table.renameColumn("number of student", "noOfStudent");
  });
};

/**
 * Nothing to undo: the rename is undone by 20251106034442_reName.
 *
 * @returns { Promise<void> }
 */
exports.down = async function () {};
