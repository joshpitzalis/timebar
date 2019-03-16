// @ts-check
import { format } from 'date-fns';
import firebase from 'firebase/app';
import { firestore } from '../../utils/firebase';

/** @params {number}  timestamp */
export const inPast = timestamp => Date.now() / 1000 - timestamp > 0;
export const convertSecondsToDaysFrom = (seconds, startDate) =>
  Math.floor(seconds / 86400) - Math.floor(startDate / 86400);

/** @param {number} numberOfDays */
/** @param {number} startDateInSecondsFromEpoch */
/** @return{string} */
export const convertNumberToDate = (
  numberOfDays,
  startDateInSecondsFromEpoch
) => {
  const startDate = startDateInSecondsFromEpoch * 1000;
  const additionalSeconds = numberOfDays * 86400 * 1000;
  const date = format(new Date(startDate + additionalSeconds), 'd MMM yyyy');
  return date;
};

/** @param {number} startDateInSecondsFromEpoch */
/** @return{number} */
export const calculateTodayDateinDaysFromStartDate = startDateInSecondsFromEpoch => {
  const startDate = startDateInSecondsFromEpoch * 1000;
  const todaysDate = Date.now();
  const today = (todaysDate - startDate) / (86400 * 1000);
  return today - 1;
};

export const convertDaysToDate = (days, startDateInSecondsFromEpoch) => {
  const startDate = startDateInSecondsFromEpoch * 1000;
  const extraDays = days * 86400 * 1000;
  return new Date(extraDays + startDate);
};

export const createNewGoal = async (details, deadline, color) => {
  try {
    const newObjective = await firestore.collection(`objectives`).doc();
    await firestore.doc(`objectives/${newObjective.id}`).set({
      id: newObjective.id,
      createdBy: 'JOsh',
      assignedTo: 'Josh',
      color,
      createdOn: new Date(),
      deadline,
      details,
      size: '24px',
      team: 'dev123',
    });
    firestore
      .doc(`teams/devteam123test`)
      .update({
        activeGoalColours: firebase.firestore.FieldValue.arrayUnion(color),
      })
      .catch(error => console.error('Error submitting vote:', error));
  } catch (error) {
    console.error('error adding goal: ', error);
  }
};
