 
import { fetcher } from '../utils/fetcher';

class AppointmentsService {

  queryKeys = {
    getUpcomingAppointments: 'getUpcomingAppointments',
    getCompletedAppointments: 'getCompletedAppointments',
    getReportByAppointmentId : 'getReportByAppointmentId',
    getAppointmentDetail : 'getAppointmentDetail',
    rescheduleConsultation : 'rescheduleConsultation',
    deleteReportById : 'deleteReportById',

    
  };

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
    });
  }

 
 






}

export default new AppointmentsService();