 
import { fetcher } from '../utils/fetcher';

class AppointmentsService {

  queryKeys = {
    getUpcomingAppointments: 'getUpcomingAppointments',
    getCompletedAppointments: 'getCompletedAppointments',
    getReportByAppointmentId : 'getReportByAppointmentId',
    

    
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

 
 






}

export default new AppointmentsService();