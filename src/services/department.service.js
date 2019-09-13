import model from '../database/models';

const { Department } = model;

/**
 * Queries the database to get a department
 * @method getDepartment
 * Route: GET department/:department_id
 * @param {string} department_id
 * @returns {object|boolean} response object or false if no user is found
 */

export const getDepartment = async departmentId => {
  const department = await Department.findByPk(departmentId);
  if (department) {
    const response = {
      department_id: department.department_id,
      name: department.name,
      description: department.description,
    };
    return response;
  }
  return false;
};

/**
 * @method getDepartmentList
 * @description fetches all departments
 * Route: GET: /departments
 *
 * @returns {Object} department list
 */

export const getDepartmentList = async () => {
  const departments = await Department.findAll();
  return departments;
};
