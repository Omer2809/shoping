import _ from "lodash";
import { paginate } from ".";

export default function getPagedData(state, arrays) {
  const {
    pageSize,
    currentPage,
    sortColumn,
    searchQuery,
    dateSearchQuery,
  } = state;

  let filtered = arrays;

  console.log(dateSearchQuery);

  if (dateSearchQuery) {
    const date = dateSearchQuery.split("/");
    filtered = filtered.filter(
      (m) =>
        new Date(new Date(m.createdAt).toDateString()).getTime() ===
        new Date(`${date[1]}/${date[0]}/${date[2]}`).getTime()
    );
  }

  if (searchQuery)
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().startsWith(searchQuery.trim().toLowerCase())
    );

  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  const dataProducts = paginate(sorted, currentPage, pageSize);

  return { totalCount: filtered.length, data: dataProducts };
}
