import { Avatar } from '@mui/material';
import '../../scss/Header.scss'
import {MenuListComposition} from './MenuListComposition';


export const Header = () => {

    return (
        <header>
            <Avatar style={{marginLeft: '1.25em', width: 56, height: 56}} src="/linkedin1.jpg" />
            <h1 style={{justifySelf: 'center'}}>My Expense Tracker</h1>
            <div className='menu-container'>
                <MenuListComposition className='menu'></MenuListComposition>
            </div>
        </header>
      );
}
