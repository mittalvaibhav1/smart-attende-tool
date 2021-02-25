import Landing from "./Landing";
import MarkAttendace from './MarkAttendance';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const Home = () => {
    const {user} = useContext(UserContext);
    return user ? (
        <MarkAttendace />
    ) : (
        <Landing />
    )
}
 
export default Home;