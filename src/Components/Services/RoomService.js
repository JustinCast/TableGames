import {Service} from 'react-services-injector';


class RoomService extends Service {
    
    get userName(){
        return 'Luis Carlos González Calderón';
    }

    get sessions(){
        return {name:'luis', game:'damas',size:'2*7'}
    }
}

RoomService.publicName = 'RoomService';
 
export default RoomService;