 
import { fetcher } from '../utils/fetcher';

class AppointmentsService {

  queryKeys = {
    getUpcomingAppointments: 'getUpcomingAppointments',
    getCompletedAppointments: 'getCompletedAppointments',
    getReportByAppointmentId : 'getReportByAppointmentId',
    getAppointmentDetail : 'getAppointmentDetail',
    rescheduleConsultation : 'rescheduleConsultation',
    deleteReportById : 'deleteReportById',
    getTodayAppointments : 'getTodayAppointments',
    cancelAppointment : 'cancelAppointment' ,
    ratingAndReviewCompletedAppointment : 'ratingAndReviewCompletedAppointment',

    
  };

  getTodayAppointments = async (data:{userid:number}) => {

    const {userid} = data

    return fetcher({
      url: `/video/todayconsultation?userId=${userid}`,
      method: 'GET',
    });
  }

  getUpcomingAppointments = async (data:{userid:number}) => {

    const {userid} = data

    return fetcher({
      url: `booking/upcomingappointmentbyuserid?userId=${userid}`,
      method: 'GET',
    });
  }

  getCompletedAppointments = async (data:{userid:number}) => {

    const {userid} = data

    return fetcher({
      url: `/booking/completedappointmentbyuserid?userId=${userid}`,
      method: 'GET',
    });
  }

  ratingAndReviewCompletedAppointment = async (data:any) => {

    return fetcher({
      url: '/booking/ratingandreview',
      method: 'POST',
      data
    });

  }

  getReportByAppointmentId = async (data:any) => {

    return fetcher({
      url: `/video/reportview?appId=${data}`,
      method: 'GET',
    });
  }


  deleteReportById = async (data:any) => {
    return fetcher({
      url: `/video/report/${data}`,
      method: 'DELETE',
    });
  }

  getAppointmentDetail = async (data:{type:string,appId:string}) => {

    const {type,appId} = data

    return fetcher({
      url: `video/consultationdetail?type=${type}&appId=${appId}`,
      method: 'GET',
    });
  }

  rescheduleConsultation = async (data) => {


    return fetcher({
      url: `video/rescheduleconsultation`,
      method: 'POST',
      data
    });
  }

  cancelAppointment = async (data:any) => {

    return fetcher({
      url: `video/cancelconsultation`,
      method: 'POST',
      data
    });
  }

 
 






}

export default new AppointmentsService();