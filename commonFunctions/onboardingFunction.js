import {setSecurityQn} from '../netcalls/requestsSecurityQn';

const submitSecurityQn = async (qn1, ans1, qn2, ans2, qn3, ans3, submit3) => {
  let obj = [
    {
      question_id: qn1._id,
      answer: ans1,
    },
    {
      question_id: qn2._id,
      answer: ans2,
    },
    {
      question_id: qn3._id,
      answer: ans3,
    },
  ];

  if (!submit3) {
    obj.pop();
  }

  let rsp = await setSecurityQn(obj);
  if (rsp === 200) {
    return true;
  } else {
    return false;
  }
};

export {submitSecurityQn};
