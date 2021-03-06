import {
  approveFeedbackFailure,
  approveFeedbackRequest,
  approveFeedbackSuccess,
  getFeedbackFailure,
  getFeedbackRequest,
  getFeedbackSuccess,
  removeFeedbackFailure,
  removeFeedbackRequest,
  removeFeedbackSuccess,
  updateFeedbackFailure,
  updateFeedbackRequest,
  updateFeedbackSuccess,
} from './actions';

import { feedbackService } from '../../services';

export const getFeedback = () => async (dispatch) => {
  dispatch(getFeedbackRequest());

  try {
    const { data } = await feedbackService.getFeedback();

    dispatch(getFeedbackSuccess(data));
  } catch (error) {
    console.error(error);

    dispatch(getFeedbackFailure(error));
  }
};

export const updateFeedback = feedback => async (dispatch) => {
  dispatch(updateFeedbackRequest());

  try {
    const { data } = await feedbackService.updateFeedback(feedback);

    dispatch(updateFeedbackSuccess(data));
  } catch (error) {
    console.error(error);

    dispatch(updateFeedbackFailure(error));
  }
};

export const removeFeedback = ids => async (dispatch) => {
  dispatch(removeFeedbackRequest());

  try {
    await feedbackService.removeFeedback(ids);

    dispatch(removeFeedbackSuccess(ids));
  } catch (error) {
    console.error(error);

    dispatch(removeFeedbackFailure(error));
  }
};

export const approveFeedback = feedback => async (dispatch) => {
  dispatch(approveFeedbackRequest());

  try {
    if (typeof feedback.type === 'number') {
      feedback.type = [feedback.type.toString()];
    }
    await feedbackService.approveFeedback(feedback);

    dispatch(approveFeedbackSuccess(feedback));
  } catch (error) {
    console.error(error);

    dispatch(approveFeedbackFailure(error));
  }
};
