import {Service} from 'react-services-injector';


class GameService extends Service {
    
    get matrix(){
        const matrix =[
            {number:'1'},
            {number:'1'},
            {number:'1'},
            {number:'1'},
            {number:'1'},
            {number:'1'},
            {number:'1'},
            {number:'1'},
            {number:'1'},
            {number:'1'},
            {number:'1'},
            {number:'1'},
            {number:'1'},
            {number:'1'},
            {number:'1'},
            {number:'1'},
            {number:'1'},
            {number:'1'},
            {number:'1'},
            {number:'1'},
            {number:'1'},
            {number:'1'},
            {number:'1'},
            {number:'1'},
            {number:'1'}, 
        ];
        return matrix;
    }

    /*get sizeBox(size){
        switch (size) {
            case 16:
                
                return 8;
            case 36:
                return 8;
            default:
                break;
        }
    }

    get sizeElement(){

    }*/
}

GameService.publicName = 'GameService';
 
export default GameService;