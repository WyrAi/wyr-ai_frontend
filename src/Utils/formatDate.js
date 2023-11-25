/** @format */

import moment from "moment";

// moment(inspectionDate).isValid() ? moment(inspectionDate).format("")

export const formatDate = (date, format) => {
  try {
    if (!date || !moment(date).isValid()) return "N/A";
    return moment(date).format(format ? format : "DD MMM, YYYY");
  } catch (error) {
    console.log(error);
  }
};
