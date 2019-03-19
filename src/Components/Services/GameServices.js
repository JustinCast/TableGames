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
        ];
         
        return matrix;
    }
}

GameService.publicName = 'GameService';
 
export default GameService;