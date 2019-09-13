/**
 * @description - pagination query metadata
 *
 * @param {number} page the page number
 * @param {number} limit number of items on a page
 *
 * @returns {object} limit and offset to query the database
 */

export const paginationQueryMetadata = (page = 1, limit = 10) => {
  const pageNumber = page <= 0 ? 1 : page;
  const pageLimit = limit <= 0 ? 10 : limit;
  return { limit: Number(pageLimit), offset: Number(pageLimit * (pageNumber - 1)) };
};

/**
 * @description - page metadata
 *
 * @param {number} page the page number
 * @param {number} limit number of items on a page
 * @param {number} totalRecords total number of items in the database
 * @param {string} entity the entity to query
 *
 * @returns {object} totalRecords, previousPage, currentPage, nextPage, totalPages
 */

export const pageMetadata = (page = 1, currentPageSize = 10, totalRecords, entity = '') => {
  let pageNumber = page <= 0 ? 1 : page;
  const pageLimit = currentPageSize <= 0 ? 10 : currentPageSize;
  const totalPages = Math.ceil(totalRecords / pageLimit);
  pageNumber = parseInt(pageNumber, 10);
  const previousPage =
    pageNumber > 1 ? `${entity}?page=${pageNumber - 1}&limit=${pageLimit}` : null;
  const currentPage = pageNumber;
  const nextPage =
    pageNumber < totalPages ? `${entity}?page=${pageNumber + 1}&limit=${pageLimit}` : null;
  if (page > totalPages) {
    return 'No content on this page';
  }
  return {
    totalRecords,
    previousPage,
    currentPage,
    currentPageSize: Number(currentPageSize),
    nextPage,
    totalPages,
  };
};

/**
 * @description - search page metadata
 *
 * @param {number} page the page number
 * @param {number} limit number of items on a page
 * @param {number} totalRecords total number of items in the database
 * @param {string} entity the entity to query
 *
 * @returns {object} totalRecords, previousPage, currentPage, nextPage, totalPages
 */

export const searchPageMetadata = (page = 1, currentPageSize = 10, totalRecords, entity = '') => {
  let pageNumber = page <= 0 ? 1 : page;
  const pageLimit = currentPageSize <= 0 ? 10 : currentPageSize;
  const totalPages = Math.ceil(totalRecords / pageLimit);
  pageNumber = parseInt(pageNumber, 10);
  const previousPage =
    pageNumber > 1 ? `${entity}&page=${pageNumber - 1}&limit=${pageLimit}` : null;
  const currentPage = pageNumber;
  const nextPage =
    pageNumber < totalPages ? `${entity}&page=${pageNumber + 1}&limit=${pageLimit}` : null;
  if (page > totalPages) {
    return 'No content on this page';
  }
  return {
    totalRecords,
    previousPage,
    currentPage,
    currentPageSize: Number(currentPageSize),
    nextPage,
    totalPages,
  };
};
