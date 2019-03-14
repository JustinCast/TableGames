import {Service} from 'react-services-injector';


class RoomService extends Service {
    
    get userName(){
        return 'Luis Carlos González Calderón';
    }

    get sessions(){
        const sessions =[
            {name:'luis', game:'memoria',size:'8*8'},
            {name:'pepe', game:'damas',size:'2*2'},
            {name:'juan', game:'memoria',size:'5*5'},
            {name:'coco', game:'damas',size:'2*9'},
            {name:'coco', game:'damas',size:'2*9'},
            {name:'coco', game:'damas',size:'2*9'},
            {name:'coco', game:'damas',size:'2*9'},
            {name:'coco', game:'damas',size:'2*9'},
            {name:'coco', game:'damas',size:'2*9'},
            {name:'coco', game:'damas',size:'2*9'}  
        ]
        return sessions;
    }
}

RoomService.publicName = 'RoomService';
 
export default RoomService;