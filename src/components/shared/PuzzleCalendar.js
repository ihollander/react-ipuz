import React from "react";
import { Header } from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import * as moment from "moment";

const PuzzleCalendar = ({ header, onDateCalendarSubmit }) => {
  const onDatePicked = (e, { name, value }) => {
    const formattedDate = moment(value, "DD-MM-YYYY").format("YYMMDD");
    onDateCalendarSubmit(formattedDate);
  };

  return (
    <>
      <Header as="h3">{header}</Header>
      <DateInput maxDate={moment()} inline value="" onChange={onDatePicked} />
    </>
  );
};

export default PuzzleCalendar;
