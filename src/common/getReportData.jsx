import _ from "lodash";
import { paginate } from "../common/pagination";

export default function getReportData(state, arrays) {
  const {
    pageSize,
    currentPage,
    sortColumn,
    nameSearch,
    numberSearch,
    userSearch,
    planSearch,
    addedOnSearch,
    fromDateSearch,
    toDateSearch,
  } = state;

  let filtered = arrays;

  if (nameSearch)
    filtered = filtered.filter((m) =>
      m.member.name.toLowerCase().startsWith(nameSearch.trim().toLowerCase())
    );

  if (numberSearch)
    filtered = filtered.filter((m) =>
      m.member.phone.toLowerCase().startsWith(numberSearch.trim().toLowerCase())
    );

  if (userSearch)
    filtered = filtered.filter((m) =>
      m.member.updated_by.name
        .toLowerCase()
        .startsWith(userSearch.trim().toLowerCase())
    );

  if (fromDateSearch) {
    const datefrom = fromDateSearch.split("/");
    filtered = filtered.filter(
      (m) =>
        new Date(new Date(m.createdAt).toDateString()).getTime() >=
        new Date(`${datefrom[1]}/${datefrom[0]}/${datefrom[2]}`).getTime()
    );
  }

  if (toDateSearch) {
    const dateto = toDateSearch.split("/");
    filtered = filtered.filter(
      (m) =>
        new Date(new Date(m.createdAt).toDateString()).getTime() <=
        new Date(`${dateto[1]}/${dateto[0]}/${dateto[2]}`).getTime()
    );
  }

  if (addedOnSearch) {
    const date = addedOnSearch.split("/");
    filtered = filtered.filter(
      // (m) =>
      // new Date(m.createdAt).toLocaleDateString() ===
      // new Date(`${date[1]}/${date[0]}/${date[2]}`).toLocaleDateString()
      (m) =>
        new Date(new Date(m.createdAt).toDateString()).getTime() ===
        new Date(`${date[1]}/${date[0]}/${date[2]}`).getTime()
    );
  }

  if (planSearch)
    filtered = filtered.filter((m) =>
      m.member.plan.name.toLowerCase().startsWith(planSearch.toLowerCase())
    );

  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  const datamembers = paginate(sorted, currentPage, pageSize);

  return {
    totalCount: filtered.length,
    data: datamembers,
    csvReport: filtered,
  };
}
