import * as auth from "./auth";
import * as search from "./search";
import * as filter from "./filter";
import * as reload from "./reload";

export default {
  ...auth,
  ...search,
  ...filter,
  ...reload,
};
