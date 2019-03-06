import {Service} from 'react-services-injector';
 
class RoomService extends Service {
    
    get userName(){
        return 'Luis Carlos González Calderón';
    }
}

RoomService.publicName = 'RoomService';
 
export default RoomService;