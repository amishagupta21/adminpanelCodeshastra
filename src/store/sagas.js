import { all, fork } from "redux-saga/effects"

//public
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./auth/login/saga"
import ForgetSaga from "./auth/forgetpwd/saga"
import ProfileSaga from "./auth/profile/saga"
import LayoutSaga from "./layout/saga"
import ecommerceSaga from "./e-commerce/saga"
import calendarSaga from "./calendar/saga"
import chatSaga from "./chat/saga"
import cryptoSaga from "./crypto/saga"
import invoiceSaga from "./invoices/saga"
import projectsSaga from "./projects/saga"
import tasksSaga from "./tasks/saga"
import mailsSaga from "./mails/saga"
import contactsSaga from "./contacts/saga"
import dashboardSaga from "./dashboard/saga"
import dashboardSaasSaga from "./dashboard-saas/saga"
import learner from "./Learner/saga"
import learnerDetails from "./LearnerDetail/saga"
import applicationListing from "./ApplicationListing/saga"
import EducationDetails from "./EducationDetail/saga"
import WorkDetail from "./WorkDetail/saga"
import DocumentKyc from "./DocumentKyc/saga"
import Courses from "./Courses/saga"
import CourseInformation from "./CourseInformation/saga"
import GetVariant from "./Variant/saga"
import GetCurriculum from "./Curriculum/saga"
import GetFaqs from "./FaqConfiguration/saga"
import GetGradeBook from "./Batches/saga"

export default function* rootSaga() {
  yield all([
    //public
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    fork(ecommerceSaga),
    fork(calendarSaga),
    fork(chatSaga),
    fork(mailsSaga),
    fork(cryptoSaga),
    fork(invoiceSaga),
    fork(projectsSaga),
    fork(tasksSaga),
    fork(contactsSaga),
    fork(dashboardSaga),
    fork(dashboardSaasSaga),
    fork(learner),
    fork(applicationListing),
    fork(learnerDetails),
    fork(WorkDetail),
    fork(EducationDetails),
    fork(DocumentKyc),
    fork(Courses),
    fork(CourseInformation),
    fork(GetVariant),
    fork(GetCurriculum),
    fork(GetFaqs),
    fork(GetGradeBook),
  ])
}
